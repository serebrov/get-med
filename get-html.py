#!/usr/bin/env python

import sys
import urllib

# http://www.crummy.com/software/BeautifulSoup/#Download
# sudo pip install beautifulsoup4

# Handle command line options.
if len(sys.argv) < 3:
    print "Usage: python get.py list.csv outdir"
    sys.exit(1)

f = open(sys.argv[1], 'r')
d = sys.argv[2]
for url in f:
    resp = urllib.urlopen(url)
    fname = url.replace('http://','').replace('/','_').replace('\n', '.html')
    out = open(d + '/' + fname, 'w')
    out.write(resp.read())
    print fname
