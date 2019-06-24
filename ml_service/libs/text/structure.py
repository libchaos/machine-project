from collections import deque
from termcolor import colored

from textblob import TextBlob

import jieba.posseg as pseg

# def pos_tag(words):
#     def generate(t):
#         tags = TextBlob(t).tags
#         if len(tags) == 0:
#             return None
#         return tags[0]

#     blobs = [generate(t) for t in words]
#     return [b for b in blobs if b is not None]

def pos_tag(words):
    def generate(t):
        tags = list(pseg.cut(t))
        if len(tags) == 0:
            return None
        return tags[0]
    blobs = [generate(t) for t in words]
    return [tuple(b) for b in blobs if b is not None]

def tag_with_color(words):
    pos = pos_tag(words)
    tokens = ' | '.join([colored(tag, 'yellow') + ':' + t for t, tag in pos])
    print(tokens)


if __name__ == '__main__':

    print(pos_tag(['我', '是', '主席']))
    print(tag_with_color(['我', '是', '主席']))