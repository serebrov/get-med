#!/usr/bin/env python
# -*- coding: utf8 -*-

import os
import sys
import shutil
import urllib
from bs4 import BeautifulSoup
import mechanize
import cookielib
import urlparse

from browser import (
    init_browser,
    download_page,
    translate_page,
    save_page,
)


# Handle command line options.
if len(sys.argv) < 3:
    print "Usage: python get.py list.csv outdir"
    sys.exit(1)

if __name__ == "__main__":
    links = open(sys.argv[1], 'r')
    # in_dir = sys.argv[1]
    out_dir = sys.argv[2]

    browser = init_browser()
    for url in links:
        name = save_page(out_dir, *download_page(browser, url), url=url)
        print name
        name = name + '_ru'
        (soup, files) = translate_page(browser, url)
        soup.base.decompose()
        name = save_page(out_dir, soup, files, name)
        print name
