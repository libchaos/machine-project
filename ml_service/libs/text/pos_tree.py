from collections import deque

class PatternCapture:
    def __init__(self):
        self.__patterns = []

    def load(self, path):
        with open(path, 'r') as f:
            self.__patterns = set([p.replace('\n', '') for p in f.readlines()])

    def save(self, path):

        with open(path, 'w') as f:
            for p in self.__patterns:
                f.write(p+"\n")
    
    def append(self, p):
        self.__patterns.append(p)

    def join(self, delim):
        return delim.join(self.__patterns)

    def capture(self, pos_sentence):
        pos_deq = deque(pos_sentence)
        tree = []
        bichain, bichain_tag = deque(), deque()
        trichain, trichain_tag = deque(), deque()

        while len(pos_deq) > 0:
            t, tag = pos_deq.popleft()

            bichain.append(t)
            bichain_tag.append(tag)
            trichain.append(t)
            trichain_tag.append(tag)

            if tag in self.__patterns:
                tree.append(t)
            
            if len(bichain) == 2:
                if '-'.join(trichain_tag) in self.__patterns:
                    tree.append(' '.join(trichain))
                trichain.popleft()
                trichain_tag.popleft()
        return tree

    