#!/usr/bin/env python
# -*- coding: utf8 -*-

import os
import sys
import shutil
import glob
from subprocess import call
from bs4 import BeautifulSoup

sys.path.append(os.path.dirname(os.path.realpath(__file__)) + '/pdfminer-lib')
import pdfminer
from pdfminer.pdfinterp import PDFResourceManager, process_pdf
from pdfminer.converter import HTMLConverter, TextConverter
from pdfminer.layout import LAParams

from browser import (
    init_browser,
    translate_page,
    translate_text,
    save_page,
)


def convert_pdfminer(inp, outp, codec='utf-8', maxpages=0, pagenos=None, html=True):
    try:
        rsrcmgr = PDFResourceManager()
        laparams = LAParams()
        if html:
            device = HTMLConverter(rsrcmgr, outp, codec=codec, laparams=laparams)
        else:
            device = TextConverter(rsrcmgr, outp, codec=codec, laparams=laparams)
        process_pdf(rsrcmgr, device, inp, pagenos, maxpages=maxpages)
        return True
    except Exception as e:
        print 'Failed to convert: ' + str(e)
        return False


def convert_pdftohtml(in_name, out_name):
    call(['pdf2htmlEX', in_name, out_name])
    return os.path.exists(out_name)


def download_files(browser, links, out_dir):
    for url in links:
        f = browser.get_file(browser, url)
        if f:
            name = browser.get_file_name(url, '.pdf')
            path = os.path.join(out_dir, name)
            shutil.copy(f, path)
        try:
            (soup, files) = browser.translate_page(browser, url)
            browser.save_page(soup, files, path+'_convert_gt.html')
        except Exception as e:
            print 'Can not google translate: ' + url + ' error: ' + str(e)

if __name__ == "__main__":
    # Handle command line options.
    if len(sys.argv) < 3:
        # print "Usage: python getpdf.py list.csv outdir"
        print "Usage: python getpdf.py indir outdir"
        sys.exit(1)

    # links = open(sys.argv[1], 'r')
    in_dir = sys.argv[1]
    out_dir = sys.argv[2]

    browser = init_browser()
    #download_files(browser, links, out_dir)
    files = glob.glob(os.path.join(in_dir, '*.pdf'))
    for path in files:
        f = open(path, 'rb')
        f_out = open(path+'_convert_pdfminer.html', 'wb')
        if convert_pdfminer(f, f_out):
            f_out = open(path+'_convert_pdfminer.html', 'r')
            soup = BeautifulSoup(f_out.read())
            resp = translate_text(browser, soup.get_text().encode('utf-8'))
            soup = BeautifulSoup(resp)
            f_out = open(path+'_convert_pdfminer_ru.html', 'wb')
            f_out.write(soup.select('#result_box')[0].prettify(formatter="html").encode('utf-8'))
        else:
            os.remove(f_out.name)

        f_out = path+'_convert_pdftohtml.html'
        if convert_pdftohtml(path, f_out):
            f_out = open(path+'_convert_pdftohtml.html', 'r')
            soup = BeautifulSoup(f_out.read())
            resp = translate_text(browser, soup.body.get_text().encode('utf-8'))
            soup = BeautifulSoup(resp)
            f_out = open(path+'_convert_pdftohtml_ru.html', 'wb')
            f_out.write(soup.select('#result_box')[0].prettify(formatter="html").encode('utf-8'))
        print path
