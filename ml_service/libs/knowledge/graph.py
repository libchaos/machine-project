import pyorient
from pyorient.exception import PyOrientSchemaException
import numpy as np
import os.path
import json
from termcolor import colored

class Knowledge:

    def __init__(self, host, dbname, username, psw):
        self.orient = pyorient.OrientDB(host, 2424)
        self.__session = self.orient.connect(username, psw)
        if self.orient.db_exists(dbname):
            print(colored('Connecting OrientDB: {0}'.format(dbname), 'green'))
            self.orient.db_open(dbname, username, psw)
        else:
            print(colored('Creating OrientDB: {0}'.format(dbname), 'magenta')) 
            self.orient.db_create(
                dbname,
                pyorient.DB_TYPE_GRAPH
            )
            self.orient.db_open(dbname, username, psw)

    
    def __prepare_classes(self):
        try:
            self.orient.command('create class TOPIC extends V')
            self.orient.command('create class KEYWORD extends V')
            self.orient.command('create class REL extends E')
            self.orient.command('create class HAS extends E')
        except PyOrientSchemaException as e:
            print(colored('[WARNING] Preparing graph schema', 'yellow'))
            print(colored(e, 'yellow'))

    def clear(self):
        self.orient.command('delete vertex TOPIC')
        self.orient.command('delete vertex KEYWORD')
        self.orient.command('delete edge')
        print(colored('[Graph clearance done', 'yellow'))
    
    def add(self, topic, words, weights, verbose):
        if verbose: print(colored('Adding: ', 'green'), topic, ' ==> ', words)
        unwanted = "'"
        topic = topic.replace(unwanted, " ")
        words = map(lambda w: w.replace(unwanted, " "), words)
        weights = iter(weights) if weights is not None else None

        queryTopic = "select from TOPIC where title='{0}'".format(topic)
        if len(self.orient.command(queryTopic)) == 0:
            if verbose: print(colored('New topic added: ', 'green'), topic)
            self.orient.command("create vertex TOPIC set title='{0}'".format(topic))

        for w in words:
            queryWord = "select from KEYWORD where w='{0}'".format(w)
            if len(self.orient.command(queryWord)) == 0:
                if verbose: print(colored('New word added: ', 'green'), w)
                self.orient.command("create vertex KEYWORD set w='{0}'".format(w))
            if verbose: print(colored('New link [{0}] HAS => {1}'.format(topic, w), 'green')) 

            if weights is None:
                self.orient.command("create edge HAS from ({0}) to ({1})".format(queryTopic, queryWord))
            else:
                weight = next(weights)
                self.orient.command("create edge INDEX FROM ({0}) to ({1}) set weight={2}".format(queryWord, queryTopic, weight))
            
        for w in words:
            siblings = (u for u in words if not w == u)
            for s in siblings:
                querySib = "select from KEYWORD where w='{0}'".format(s) 
                self.orient.command("create edge REL from ({0}) to ({1})".format(queryWord, querySib))

            
    
    def top_keyword(self):
        query = "select w, in().size() as cnt from keyword order by cnt desc"
        for k in self.orient.query(query):
            yield k

    def __iter__(self):
        query = "select from topic"
        for k in self.orient.query(query):
            yield k
    

    def keywords_in_topic(self, topic, with_edge_count=False):
        subquery = "select expand(out()) from topic where title='{0}'".format(topic)
        query = "select w from ({0})".format(subquery) \
            if not with_edge_count \
            else "select w, in().size() as freq from (select expand(out()) from topic where title = '{}')".format(topic)
        for k in self.orient.query(query):
            yield k
        
    
    def topics_which_have(self, w):
        query = "select in().title from KEYWORD where w='{}'".format(w)
        for k in self.orient.query(query):
            yield k
        