from __future__ import unicode_literals
from whoosh.analysis import RegexAnalyzer, LowercaseFilter, StopFilter, StemFilter
from whoosh.analysis import Tokenizer, Token
from whoosh.lang.porter import stem
import codecs
import jieba
import re
import os

module_path = os.path.dirname(__file__)
dataPath = os.path.join(module_path, 'stop_words.txt')

STOP_WORDS = frozenset((line.rstrip() for line in codecs.open(dataPath,'r','utf-8')))

accepted_chars = re.compile(r"[\u4e00-\u9fa5]+")


class ChineseTokenizer(Tokenizer):
    def __call__(self,text,**kargs):
        words = jieba.tokenize(text,mode="search")
        token  = Token()
        for (w,start_pos,stop_pos) in words:
            if not accepted_chars.match(w):
                if len(w)>1:
                    pass
                else:
                    continue
            token.original = token.text = w
            token.pos = start_pos
            token.startchar = start_pos
            token.endchar = stop_pos
            yield token

def ChineseAnalyzer(stoplist=STOP_WORDS,minsize=1,stemfn=stem,cachesize=50000):
    return ChineseTokenizer() | LowercaseFilter() | StopFilter(stoplist=stoplist,minsize=minsize)\
                                        |StemFilter(stemfn=stemfn, ignore=None,cachesize=cachesize)



