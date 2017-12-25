Initialization:

- clone this repository
- run `git submodule update --init --recursive`

The set of scripts was used to automate manual work (download some html articles, translate them via google translate; download some pdf articles, convert to text, translate them via google translate).
The purpose was to get the rough translation to be later reviewed and improved manually.

Note: google translate UI has changed since the scripts were written, so now the text translation function doesn't work.
Also, the similar approach may still be used, it may happen that now it is neccessary to use some more complex code to emulate the browser/server interaction or the headless browser with JavaScript support instead of mechanize, see aslo [mechanize docs](https://mechanize.readthedocs.io/en/latest/faq.html#jsfaq) or tricker handlin

Also note that such google translate usage probably violates the terms of service.
There is a translation API (payed) to solve such tasks: https://cloud.google.com/translate/docs/.

Usage:

- The [gethtml.py](./gethtml.py) downloads a bunch of HTML files and (tries) to translate them
- The [getpdf.py](./getpdf.py) downloads PDFs, converts them to html and (tries) to translate them
- The [indexhtml.py](./indexhtml.py) and [indexpdf.py](./indexpdf.py) can be used to build index HTMLs with links to the downloaded/translated documents.
