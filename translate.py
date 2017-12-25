#!/usr/bin/env python

import os
import sys
import urllib
import re

from httplib import HTTPConnection

# Handle command line options.
if len(sys.argv) < 2:
    print "Usage: python translate.py dir"
    sys.exit(1)

for dirname, dirnames, filenames in os.walk(sys.argv[1]):
    for filename in filenames:
        f = open(os.path.join(dirname, filename), 'r')
        txt = f.read()

        # Construct the message body.
        print txt
        body = "sl=%s&tl=%s&text=%s" % ('en', 'ru', urllib.quote(txt))

        # Connect to translate.google.com and request result.
        conn = HTTPConnection("translate.google.com")
        conn.request("GET", "/translate_a" + body)

        resp = conn.getresponse()
        if resp.status != 200:
            print "Server responded with error code %d." % (resp.status)
            sys.exit(1)

        ## Parse the result.
        #match = re.search("<div id=result_box[^>]*>([^<]*)</div>", resp.read())
        conn.close()
        print resp.read()
        #if not match: sys.exit(1)
        #print match.group(1)

