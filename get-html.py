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

# Handle command line options.
if len(sys.argv) < 3:
    print "Usage: python get.py list.csv outdir"
    sys.exit(1)

links = open(sys.argv[1], 'r')
base_dir = sys.argv[2]

# http://www.crummy.com/software/BeautifulSoup/#Download
# sudo pip install beautifulsoup4
# http://wwwsearch.sourceforge.net/mechanize/
# sudo easy_install mechanize

def init_browser():
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
    return br

def get_page(br, url):
    # Open some site, let's pick a random one, the first that pops in mind:
    r = br.open(url)
    return r.read()

def get_file(br, url):
    # Open some site, let's pick a random one, the first that pops in mind:
    try:
        f = br.retrieve(url)[0]
        return f
    except:
        return False

def get_file_name(url):
    return url.replace('http://','').replace('/','_').replace('\n', '.html')

def write_to_file(data, file_name):
    out = open(os.path.join(base_dir, file_name), 'w')
    #out.write(data.read())
    out.write(data.encode('utf-8'))

def absurl(base_url, url):
    if url[:2] == '//':
        return 'http:' + url
    o = urlparse.urlparse(base_url)
    base = o.scheme + '://' + o.netloc
    val = url
    if not 'http' in url:
        if url[0] == '.':
            val = base + os.path.realpath(os.path.dirname(o.path) + '/' + url)
        else:
            if base[-1] != '/':
                base = base + '/'
            if url[0] == '/':
                url = url[1:]
            val = base + url
    return val

def process_file_link(url, tag, attr, save_dir):
    val = tag.get(attr)
    if not val:
        return
    val = absurl(url, val)
    f = get_file(br, val)
    if f:
        shutil.copy(f, os.path.join(base_dir, save_dir, os.path.basename(f)))
        tag[attr] = os.path.join('.', save_dir, os.path.basename(f))
    else:
        print 'Fail: ' + val + ' (' + tag.get(attr) + ')'

br = init_browser()
for url in links:
    resp = get_page(br, url)
    file_name = get_file_name(url)
    soup = BeautifulSoup(resp)
    num = 1
    img_dir = file_name+'_files'
    if not os.path.exists(os.path.join(base_dir, img_dir)):
        os.makedirs(os.path.join(base_dir, img_dir))
    for img in soup.find_all('img'):
        process_file_link(url, img, 'src', img_dir)
        process_file_link(url, img, 'src-large', img_dir)
    for script in soup.find_all('script'):
        process_file_link(url, script, 'src', img_dir)
    for link in soup.find_all('link'):
        if link.get('type') == 'text/css':
            process_file_link(url, link, 'href', img_dir)
    write_to_file(soup.prettify(formatter="html"), file_name)
    print file_name
