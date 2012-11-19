#!/usr/bin/env python
# -*- coding: utf8 -*-
import os
import sys
import glob
from bs4 import BeautifulSoup

#sys.path.append(os.path.dirname(os.path.realpath(__file__)) + '/pdfminer-lib')
#from pdfminer.pdfparser import PDFParser, PDFDocument
sys.path.append(os.path.dirname(os.path.realpath(__file__)) + '/pyPdf-lib')
from pyPdf import PdfFileReader

def get_title(f):
    return BeautifulSoup(open(f)).title.string

# Handle command line options.
if len(sys.argv) < 2:
    print "Usage: python indexpdf.py pdfdir"
    sys.exit(1)

base_dir = sys.argv[1]
base_last = os.path.split(base_dir)[-1]
index_name = os.path.join(base_dir+'/../', 'indexpdf.html')
if os.path.exists(index_name):
    os.remove(index_name)
files = glob.glob(os.path.join(base_dir, '*.pdf'))

html_doc = """
<html><head><title>Index</title></head>
<body>
</body>
</html>
"""
soup = BeautifulSoup(html_doc)
for f in files:
    fname = os.path.basename(f)
    fp = open(f, 'rb')
    inputpdf = PdfFileReader(fp)
    tag = soup.new_tag('p')
    soup.body.append(tag)
    a = soup.new_tag('a', href='./'+base_last+'/'+fname, target='_blank')
    try:
        title = inputpdf.getDocumentInfo().title
        if title:
            a.append(soup.new_string(title))
            print 'Can not find title: ' + fname
        else:
            a.append(soup.new_string(fname))
    except Exception as e:
        a.append(soup.new_string(fname))
        print 'Error getting title: ' + fname

    tag.append(a)
    tag.append(soup.new_tag('br'))

    converted = glob.glob(os.path.join(base_dir, fname+'_convert*'))
    for ff in converted:
        fname = os.path.basename(ff)
        a = soup.new_tag('a', href='./'+base_last+'/'+fname, target='_blank')
        a.append(soup.new_string(fname))
        tag.append(a)
        tag.append(soup.new_tag('br'))
    tag.append(soup.new_tag('br'))
    tag.append(soup.new_tag('br'))

index = open(index_name, 'w+')
index.write(soup.prettify(formatter="html").encode('utf-8'))
