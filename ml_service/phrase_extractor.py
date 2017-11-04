#!/usr/bin/env python

from analyse.analyzer import ChineseAnalyzer
import re
import nltk

analyzer = ChineseAnalyzer()
mycut = lambda s: [(t.text, t.flag) for t in analyzer(s)]


grammer = """
    NP:   {<n>?}
"""


def generate_tree(text):
    chunker = nltk.RegexpParser(grammer)
    postoks = mycut(text)
 
    tree = chunker.parse(postoks)
    return tree

def leaves(text):
     for subtree in generate_tree(text).subtrees(filter = lambda t: t.label()=='NP'):
        yield subtree.leaves()

def get_terms(text):
    for leaf in leaves(text):
        term = [w for w, t in leaf]
        
        yield term


def get_phrases(text):
    terms = get_terms(text)
    
    phrases = []

    for term in terms:
        phrases.append(''.join(term).strip())
    return phrases



if __name__ == '__main__':
    
    text = "<李磊>家长您好，感谢咨询，仔细看了您的描述后给您提供以下参考信息 1： 血常规 有病毒感染 无症状（鼻塞流涕发热） 一般是不要紧 无贫血 后期在复查一下就行    2：关于吃奶的情况考虑还是厌奶的可能性比较大的   一方面 宝宝的体内乳糖酵素开始减少，舌头的味觉也开始产生变化，胃口开始改变。另一方面，他的听觉视觉有了突破性的进展，使得他对外界更感兴趣，往往一有风吹草动就去“管闲事”，心思不在吃奶上了。 那么建议就要在喂奶的时候保证周围环境的安静 在宝宝饿了的时候在喂养。不要强喂 ，平时多给宝宝做抚触按摩促进能量消耗增加食欲 3：关于体重增长的情况   这个月份体重在4.3-6.0kg就是正常的<李磊>"   
    
    print(get_phrases(text))

    # print(generate_tree(text))

    
