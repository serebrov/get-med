#!/bin/sh

SCRIPT_PATH=`dirname $0`

wget  \
     -erobots=off \
     --adjust-extension \
     --span-hosts \
     --page-requisites \
     --html-extension \
     --convert-links \
     --restrict-file-names=windows \
     --no-parent \
     --user-agent 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.6) Gecko/20070802 SeaMonkey/1.1.4' \
     -P $SCRIPT_PATH/build \
     -i $SCRIPT_PATH/data/list-html.csv
