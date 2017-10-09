import re
from termcolor import colored
from . import crawler

def download_wiki(url, verbose=False):
    selector = [
        ('title', wiki_title),
        ('content', wiki_contents),
        ('rels', wiki_rels)
    ]

    content = crawler.download_page(url, selector, verbose)

    if verbose:
        print(colored('[Downloaded: {0}]'.format(url), 'cyan'))
        print(colored('  title: ', 'cyan'), content['title'])
        print(colored('  rels:  ', 'cyan'), len(content['rels']))
    
    return content

def wiki_title(page):
    return page.find('h1#firstHeading').text()

def wiki_contents(page):
    contents = []
    paragraphs = page.find('#bodyContent p')
    for p in paragraphs:
        contents.append(p.text())
    return contents

def wiki_rels(page):
    links = []
    for li in page.find('ul li a'):
        href = li.attr('href')
        if href[0] == '#' or \
            ':' in href or \
            '//' in href or \
            'index.php' in href or \
            'Main_Page' in href or \
            re.search('\/+\w{2, 5}.wiki[m|p]eida.org\/*.*', href):
            continue
        links.append(href)
    return links
