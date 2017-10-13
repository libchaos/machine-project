import sys
import argparse
from termcolor import colored
from libs.text import structure as TextStructure
from libs.text.pos_tree import PatternCapture
from libs.knowledge.datasource import MineDB
from nltk.tokenize.punkt import PunktSentenceTokenizer

arguments = argparse.ArgumentParser()
arguments.add_argument('--verbose', dest='verbose', action='store_true', help='Turn verbose output on ')
arguments.add_argument('--start', type=int, default=0, help='Starting index of the crawling record to annotate')
args = vars(arguments.parse_args(sys.argv[1:]))

def init_crawl_collection():
    crawl_collection = MineDB('localhost', 'care', 'crawl')
    return crawl_collection


def raw_records(crawl_collection, start):

    pst = PunktSentenceTokenizer()
    for rec in crawl_collection.query({'downloaded': True}, field=None, skip=start):

        _id = rec['_id']
        if rec['content'] is None:
            continue
        content = rec['content']['content']

        for c in content:
            sentences = pst.sentences_from_text(c)
            for s in sentences:
                yield (_id, s)


def cli_annotate(crawl_collection):
    patterns = PatternCapture()
    patterns.load('./pos_patterns')

    print(colored('Existing patterns: ', 'green'))
    

    