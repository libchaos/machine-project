import re
import sys
import argparse
from termcolor import colored
from nltk.tokenize.punkt import PunktSentenceTokenizer
from libs.knowledge.graph import knowledge
from libs.text import structure as TextStructure
from libs.text.pos_tree import PatternCapture
from libs.knowledge.datasource import MineDB
from pybloom_live import ScalableBloomFilter

arguments = argparse.ArgumentParser()

arguments.add_argument('--verbose', dest='verbose',
                       action='store_true', help='Trun verbose output on')
arguments.add_argument('--start', type=int, default=0,
                       help='Starting index of the crawling record to annotate')
arguments.add_argument('--root', type=str, default=None,
                       help='Supply the OrientDB password for root account')
arguments.add_argument('--limit', type=int, default=100,
                       help='Maximum number of topics we want to import')


def init_crawl_collection():
    crawl_collection = MineDB('localhost', 'turing', 'ChatLog')
    return crawl_collection


def iter_topic(crawl_collection, start):
    pst = PunktSentenceTokenizer()

    n = 0

    for wiki in crawl_collection.query({}, field=None, skip=start):
        if wiki['logs'] is None:
            continue
        m = 0

        content = wiki['content']

        if args['verbose']:
            print(colored('[Extracting wiki]: ', 'cyan'), content['title'])

        for c in content['content']:
            sentences = pst.sentences_from_text(c)

            for s in sentences:
                m += 1
                yield (content['title'], s.split(' '))

        crit = {'_id': wiki['_id']}
        crawl_collection.update(crit, {'$set': {'add_to_graph': True}})

        n += 1

        if args['verbose']:
            print(content['title'] + " processed with {0} nodes.".format(m))
            print(
                colored("{0} wiki documents processed so far ...".format(n), 'blue'))


def ensure_viable(ns, stopwords):
    def clean(a):
        # Strip non-alphanumeric symbols (unicode symbols reserved)
        a = re.sub("[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\x7F\(\)]+", "", a)
        for s in stopwords:
            a.replace(s, '')
        return a.strip()
    ns = set(clean(n) for n in ns)
    ns = [n for n in ns if len(n) > 2]
    return list(ns)


if __name__ == '__main__':

    # Initialise a knowledge database
    print(colored('Initialising knowledge graph database...', 'cyan'))
    kb = Knowledge('localhost', 'vor', 'root', args['root'])
    kb.clear()

    # Load existing pos patterns
    print(colored('Loading POS patterns...', 'cyan'))
    patterns = PatternCapture()
    patterns.load('./pos-patterns')

    # Load list of stopwords
    print(colored('Loading stopwords...', 'cyan'))
    stopwords = []
    with open('./pos-stopwords') as f:
        stopwords = list(f.readlines())

    # Initialise a crawling dataset connection
    print(colored('Initialising wikipedia crawling collection...', 'cyan'))
    crawl_collection = init_crawl_collection()

    # Iterate through the crawling database
    n = 0
    print(colored('Iterating over crawling database...', 'cyan'))
    bf = ScalableBloomFilter(mode=ScalableBloomFilter.SMALL_SET_GROWTH)
    for topic, sentence in iter_topic(crawl_collection, args['start']):

        # Clean topic string
        topic = topic.replace("'", '').replace('\n', '')

        # Check if the number of processed topic exceed the limit?
        if topic not in bf:
            bf.add(topic)
            if len(bf) > args['limit']:
                print(colored('[Topics limit reached] ... BYE', 'cyan'))
                sys.exit(0)

        # Break the sentence into knowledge nodes
        pos = TextStructure.pos_tag(sentence)
        kb_nodes = patterns.capture(pos)

        # Clean up each of the nodes
        # a) Remove stopwords
        # b) Remove duplicates
        # c) Ensure supported encoding
        kb_nodes = ensure_viable(kb_nodes, stopwords)

        if args['verbose']:
            print(kb_nodes)

        # Create a set of knowledge links
        kb.add(topic, kb_nodes, None, args['verbose'])

        n += 1
        if n % 100 == 0 and n > 0:
            print('... {} topics done so far.'.format(n))
