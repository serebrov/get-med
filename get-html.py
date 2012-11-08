#!/usr/bin/env python

import sys
import urllib
from bs4 import BeautifulSoup
import mechanize
import cookielib

# http://www.crummy.com/software/BeautifulSoup/#Download
# sudo pip install beautifulsoup4
# http://wwwsearch.sourceforge.net/mechanize/
# sudo easy_install mechanize

def get_url(url):
    # http://stockrt.github.com/p/emulating-a-browser-in-python-with-mechanize/

    #return urllib.urlopen(url)
    # Browser
    br = mechanize.Browser()

    # Cookie Jar
    cj = cookielib.LWPCookieJar()
    br.set_cookiejar(cj)

    # Browser options
    br.set_handle_equiv(True)
    br.set_handle_gzip(True)
    br.set_handle_redirect(True)
    br.set_handle_referer(True)
    br.set_handle_robots(False)

    # Follows refresh 0 but not hangs on refresh > 0
    br.set_handle_refresh(mechanize._http.HTTPRefreshProcessor(), max_time=1)

    # Want debugging messages?
    #br.set_debug_http(True)
    #br.set_debug_redirects(True)
    #br.set_debug_responses(True)

    # User-Agent (this is cheating, ok?)
    br.addheaders = [('User-agent', 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008071615 Fedora/3.0.1-1.fc9 Firefox/3.0.1')]
    # Open some site, let's pick a random one, the first that pops in mind:
    r = br.open(url)
    return r.read()

def get_file_name(url):
    return url.replace('http://','').replace('/','_').replace('\n', '.html')

def write_to_file(response, file_name):
    d = sys.argv[2]
    out = open(d + '/' + file_name, 'w')
    out.write(resp.read())

# Handle command line options.
if len(sys.argv) < 3:
    print "Usage: python get.py list.csv outdir"
    sys.exit(1)

f = open(sys.argv[1], 'r')
d = sys.argv[2]
for url in f:
    resp = get_url(url)
    file_name = get_file_name(url)
    soup = BeautifulSoup(resp)
    #write_to_file(resp, file_name)
    print(soup.prettify())
    print file_name



