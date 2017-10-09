from collections import deque
from termcolor import colored

from textblob import TextBlob

def pos_tag(words):
    def generate(t):
        tags = TextBlob(t).tags
        if len(tags) == 0:
            return None
        return tags[0]

    blobs = [generate(t) for t in words]
    return [b for b in blobs if b is not None]

def tag_with_color(words):
    pos = pos_tag(words)
    tokens = ' | '.join([colored(tag, 'yellow') + ':' t for t, tag in pos])
    print(tokens)