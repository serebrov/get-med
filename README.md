Initialization:

- clone this repository
- run `git submodule update --init --recursive`

The set of scripts was used to automate manual work (download some html articles, translate them via google translate; download some pdf articles, convert to text, translate them via google translate).
The purpose was to get the rough translation to be later reviewed and improved manually.

Note: google translate now is much stricter to scraping attempts than before (when the scripts were written), so now the translation function doesn't work.
It may still be possible to fix it, but probably such usage violates google terms of service.
Also now there is a translation API (payed) to solve such tasks: https://cloud.google.com/translate/docs/.

Usage:

- The [gethtml.py](./gethtml.py) downloads a bunch of HTML files and (tries) to translate them
- The [getpdf.py](./getpdf.py) downloads PDFs, converts them to html and (tries) to translate them
- The [indexhtml.py](./indexhtml.py) and [indexpdf.py](./indexpdf.py) can be used to build index HTMLs with links to the downloaded/translated documents.


