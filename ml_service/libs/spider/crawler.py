import urllib.request
from htmldom import htmldom
from termcolor import colored

def download_page(url, selectors, verbose=False):
    print(colored('Fetching: ', 'green') + colored(url, 'cyan'))
    page = htmldom.HtmlDom(url).createDom()

    content = {}
    for tup in selectors:
        field, selector = tup
        if verbose:
            print(colored(' Mapping: ', 'green'), field)
        content[field] = selector(page)

    return content