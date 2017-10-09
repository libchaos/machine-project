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

arguments.add_argument('--verbose', dest='verbose', action='store_true', help='Trun verbose output on')
arguments.add_argument('--start', type=int, default=0, help='Starting index of the crawling record to annotate')
arguments.add_argument('--root', type=str, default=None, help='Supply the OrientDB password for root account')
arguments.add_argument('--limit', type=int, default=100, help='Maximum number of topics we want to import')


def init_crawl_collection():
    crawl_collection = MineDB('localhost', 'care', 'crawl')
    return crawl_collection

# def iter_topic(crawl_collection):
#     pst = 