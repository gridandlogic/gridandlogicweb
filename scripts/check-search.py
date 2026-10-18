"""Audit rendered search signals, sitemap coverage and internal content links."""
import argparse
import json
import re
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from urllib.parse import urlparse, urljoin

parser = argparse.ArgumentParser()
parser.add_argument('--base', default='http://localhost:4180')
args = parser.parse_args()
base = args.base.rstrip('/')
canonical_origin = 'https://www.gridandlogic.com'

def get(path):
    with urllib.request.urlopen(base + path, timeout=30) as r:
        return r.read().decode('utf-8'), dict(r.headers)

class Document(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.h1 = 0
        self.canonical = []
        self.meta = {}
        self.links = []
        self.schemas = []
        self.text = []
        self.script = None
        self.script_text = ''
        self.in_title = False
        self.title = ''
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'h1': self.h1 += 1
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a['href'])
        if tag == 'meta': self.meta[a.get('name', a.get('property', ''))] = a.get('content', '')
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag == 'img': assert 'alt' in a, 'Missing image alt'
        if tag == 'script': self.script = a.get('type', 'other'); self.script_text = ''
        if tag == 'title': self.in_title = True
    def handle_endtag(self, tag):
        if tag == 'script':
            if self.script == 'application/ld+json': self.schemas.append(json.loads(self.script_text))
            self.script = None
        if tag == 'title': self.in_title = False
    def handle_data(self, data):
        if self.script: self.script_text += data
        else: self.text.append(data)
        if self.in_title: self.title += data

xml, _ = get('/sitemap.xml')
urls = [e.text for e in ET.fromstring(xml).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert len(urls) == len(set(urls)) == 13, 'Expected 13 distinct sitemap pages'
paths = {urlparse(u).path.rstrip('/') or '/' for u in urls}
titles, canonicals, internal = set(), set(), set()
for url in urls:
    assert urlparse(url).netloc == 'www.gridandlogic.com'
    path = urlparse(url).path
    html, headers = get(path)
    d = Document(); d.feed(html)
    assert d.h1 == 1, (path, 'Expected one h1', d.h1)
    assert d.title and d.title not in titles, (path, 'Missing/duplicate title')
    titles.add(d.title)
    assert d.meta.get('description'), (path, 'Missing description')
    assert 'noindex' not in d.meta.get('robots', '')
    assert 'noindex' not in headers.get('X-Robots-Tag', '')
    assert len(d.canonical) == 1, (path, 'Expected one canonical')
    canonical = d.canonical[0].rstrip('/')
    assert canonical == (canonical_origin + path).rstrip('/'), (path, canonical)
    assert canonical not in canonicals
    canonicals.add(canonical)
    text = ' '.join(' '.join(d.text).split())
    for schema in d.schemas:
        for item in schema.get('@graph', [schema]):
            if item.get('@type') == 'FAQPage':
                for q in item['mainEntity']:
                    assert q['name'] in text, (path, 'Schema question missing from content')
                    assert q['acceptedAnswer']['text'] in text, (path, 'Schema answer missing from content')
    if '/services/' in path and path.rstrip('/') != '/services':
        assert any(x.get('@type') == 'Service' for s in d.schemas for x in s.get('@graph', []))
    for href in d.links:
        resolved = urljoin(url, href)
        parsed = urlparse(resolved)
        assert parsed.netloc != 'container.gridandlogic.com', 'Container must remain image-only'
        if parsed.netloc == 'www.gridandlogic.com':
            linked = parsed.path.rstrip('/') or '/'
            if not re.search(r'\.[a-z0-9]+$', linked): internal.add(linked)
    print('PASS', path, '|', d.title)
assert paths <= internal | {'/'}, 'Sitemap page is orphaned'
assert internal <= paths, ('Unknown internal content links', internal - paths)
robots, _ = get('/robots.txt')
assert 'Allow: /' in robots and canonical_origin + '/sitemap.xml' in robots
llms, _ = get('/llms.txt')
assert 'info@gridandlogic.com' in llms and '/work/pixel-nest/' in llms
try:
    get('/not-a-real-grid-and-logic-page')
    raise AssertionError('Missing page must return HTTP 404')
except urllib.error.HTTPError as e:
    assert e.code == 404
print('PASS sitemap, metadata, FAQ parity, internal links, crawl access, llms summary and real 404')
