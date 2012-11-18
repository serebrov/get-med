#!/usr/bin/env python
# -*- coding: utf8 -*-
import os
import sys
import glob
from bs4 import BeautifulSoup

def get_title(f):
    return BeautifulSoup(open(f)).title.string

# Handle command line options.
if len(sys.argv) < 2:
    print "Usage: python indexhtml.py htmldir"
    sys.exit(1)

base_dir = sys.argv[1]
base_last = os.path.split(base_dir)[-1]
index_name = os.path.join(base_dir+'/../', 'index.html')
if os.path.exists(index_name):
    os.remove(index_name)
files = glob.glob(os.path.join(base_dir, '*.html'))
#ru_files = glob.glob(os.path.join(base_dir, '*.html_ru'))

html_doc = """
<html><head><title>Index</title></head>
<body>
</body>
</html>
"""
soup = BeautifulSoup(html_doc)
for f in files:
    fname = os.path.basename(f)
    tag = soup.new_tag('p')
    soup.body.append(tag)
    a = soup.new_tag('a', href='./'+base_last+'/'+fname, target='_blank')
    a.append(soup.new_string(get_title(f)))
    tag.append(a)
    tag.append(soup.new_tag('br'))
    a = soup.new_tag('a', href='./'+base_last+'/'+fname+'_ru', target='_blank')
    a.append(soup.new_string(get_title(f+'_ru')))
    tag.append(a)
    tag.append(soup.new_tag('br'))
    tag.append(soup.new_tag('br'))

index = open(index_name, 'w+')
index.write(soup.prettify(formatter="html").encode('utf-8'))
