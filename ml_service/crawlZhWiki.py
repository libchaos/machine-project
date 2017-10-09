import sys
import asyncio
import argparse
from functools import reduce
from termcolor import colored
from libs.spider import wiki as Wiki
from libs.knowledge.datasource import MineDB
import urllib.parse


arguments = argparse.ArgumentParser()
arguments.add_argument('--verbose', dest='verbose', action='store_true', help='Turn verbose output on')
arguments.add_argument('--depth', type=int, default=4, help='Indicate maximum depth of crawling level')
args = vars(arguments.parse_args(sys.argv[1:]))


def init_crawl_collection():
    crawl_collection = MineDB('localhost', 'care', 'crawl')
    return crawl_collection


def save_content(crawl_collection, title, content):
    if crawl_collection.count({'title': title}) > 0:
        crawl_collection.update(
            {'title': title},
            {'$set': {'downloaded': True, 'content': content}}
        )
    else:
        crawl_collection.insert({'title': title, 'downloaded': True, 'content': content})
    

def is_downloaded(crawl_collection, title):
    return crawl_collection.count({'title': title, 'downloaded': True}) > 0



def mark_as_downloaded(crawl_collection, title):
    if crawl_collection.count({'title': title}) > 0:
        crawl_collection.update({'title': title}, {'$set': {'downloaded': True}})
    else:
        crawl_collection.insert({'title': title, 'downloaded': True, 'content': None})
    
def list_crawl_pending(crawl_collection, max_samples):
    n = 0

    majors = [t['title'] for t in crawl_collection.query({'downloaded': False})]
    if len(majors) == 0:
        print(colored('Fresh new crawling....', 'yellow'))
        yield urllib.parse.quote('/wiki/医学')
    
    for m in majors:
        n += 1
        yield m
    for t in crawl_collection.query({'downloaded': True}):
        content = t['content']
        rels = content['rels']

        for r in rels:
            if not is_downloaded(crawl_collection, r):
                if n > max_samples:
                    return
                n += 1
                yield r

def add_pending(crawl_collection, title):
    if crawl_collection.count({'title': title}) == 0:
        crawl_collection.insert({'title': title, 'downloaded': False, 'content': None})


@asyncio.coroutine
def crawl(crawl_collection, title, depth, verbose):
    loop = asyncio.get_event_loop()

    add_pending(crawl_collection, title)
    
    if depth > 0 and not is_downloaded(crawl_collection, title):
        content = Wiki.download_wiki('https://zh.wikipedia.org' + title, verbose)

        save_content(crawl_collection, title, content)

        subtasks = []
        for rel in content['rels']:
            subtasks.append(asyncio.async(
                crawl(crawl_collection, rel, depth-1, verbose)
            ))

        loop.run_until_complete(asyncio.wait(subtasks))



if __name__ == '__main__':
    depth = args['depth']
    print(colored('#Max depth to run: ', 'cyan'), depth)
    loop = asyncio.get_event_loop()

    crawl_collection = init_crawl_collection()

    pendings = list_crawl_pending(crawl_collection, max_samples=32)

    tasks = []
    for title in pendings:
        print(colored('Pending for crawling: ', 'green'), title)
        tasks.append(asyncio.async(
            crawl(crawl_collection, title, depth, args['verbose'])
        ))

    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()

