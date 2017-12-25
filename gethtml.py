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

# http://www.crummy.com/software/BeautifulSoup/#Download
# sudo pip install beautifulsoup4
# http://wwwsearch.sourceforge.net/mechanize/
# sudo easy_install mechanize

def init_browser():
    # http://stockrt.github.com/p/emulating-a-browser-in-python-with-mechanize/
    # Browser
    br = mechanize.Browser(factory=mechanize.RobustFactory())

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
    r = br.open(url)
    return r.read()

def get_file(br, url):
    try:
        f = br.retrieve(url)[0]
        return f
    except:
        return False

def get_file_name(url, ending='.html'):
    return url.replace('https://','').replace('http://','').replace('/','_').replace('\n', ending).replace(';','_').replace('?','_')

def write_to_file(out_dir, data, file_name):
    out = open(os.path.join(out_dir, file_name), 'w')
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

def process_file_link(br, url, tag, attr, files):
    val = tag.get(attr)
    if not val:
        return
    val = absurl(url, val)
    f = get_file(br, val)
    if f:
        files.append((f, tag, attr))
    else:
        print 'Fail: ' + val + ' (' + tag.get(attr) + ')'
        return (None, tag, attr)

def download_page(br, url, base_url=None):
    if not base_url:
        base_url = url
    resp = get_page(br, url)
    soup = BeautifulSoup(resp)
    files = []
    for img in soup.find_all('img'):
        process_file_link(br, base_url, img, 'src', files)
        process_file_link(br, base_url, img, 'src-large', files)
    for script in soup.find_all('script'):
        process_file_link(br, base_url, script, 'src', files)
    for link in soup.find_all('link'):
        if link.get('type') == 'text/css':
            process_file_link(br, base_url, link, 'href', files)
    return (soup, files)

def save_page(out_dir, soup, files, page_name=None):
    if not page_name:
        page_name = get_file_name(url)
    files_dir = page_name+'_files'
    if not os.path.exists(os.path.join(out_dir, files_dir)):
        os.makedirs(os.path.join(out_dir, files_dir))
    for (f, tag, attr) in files:
        if f:
            shutil.copy(f, os.path.join(out_dir, files_dir, os.path.basename(f)))
            tag[attr] = os.path.join('.', files_dir, os.path.basename(f))
    write_to_file(out_dir, soup.prettify(formatter="html"), page_name)
    return page_name

def translate_page(br, url):
    t_url = 'http://translate.google.com/translate?hl=en&sl=auto&tl=ru&u=' + urllib.quote(url)
    r = br.open(t_url)
    soup = BeautifulSoup(r.read())
    t_url = soup.find_all('iframe')[0].get('src')
    if t_url[0:4] != 'http':
        t_url = 'http://translate.google.com' + t_url
    try:
        return download_page(br, t_url, url)
    except Exception as e:
        print 'Can not translate page: ' + url + 't_url: ' + t_url + ' error: ' + str(e)

def translate_text(br, txt):
    br.open('http://translate.google.com?sl=en&tl=ru')
    br.select_form(name='text_form')
    br['text'] = txt
    resp = br.submit()
    return resp.get_data()

if __name__ == "__main__":
    links = open(sys.argv[1], 'r')
    # in_dir = sys.argv[1]
    out_dir = sys.argv[2]

    br = init_browser()
    for url in links:
        name = save_page(out_dir, *download_page(br, url))
        print name
        name = name + '_ru'
        (soup, files) = translate_page(br, url)
        soup.base.decompose()
        name = save_page(out_dir, soup, files, name)
        print name
