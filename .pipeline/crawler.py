import urllib.request
import re
import json
from bs4 import BeautifulSoup
import os

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'ru,en;q=0.9',
}

def fetch_url(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read()
            # check charset
            charset = 'utf-8'
            content_type = resp.headers.get('Content-Type', '')
            if 'charset=' in content_type:
                charset = content_type.split('charset=')[-1].split(';')[0].strip()
            return content.decode(charset, errors='replace')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def analyze_homepage():
    html = fetch_url('https://tabiturient.ru/')
    if not html:
        return
    with open('.pipeline/homepage.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Saved homepage.html ({len(html)} bytes)")

    # Find navigation links
    links = re.findall(r'href=[\'"]([^\'"]+)[\'"]', html)
    unique_links = sorted(set(links))
    
    internal_sections = []
    for l in unique_links:
        if l.startswith('javascript:') or l.startswith('#') or l.startswith('mailto:'):
            continue
        if l.startswith('http') and 'tabiturient.ru' not in l:
            continue
        clean = l.replace('https://tabiturient.ru', '')
        if clean and clean not in internal_sections:
            internal_sections.append(clean)
            
    print(f"Discovered {len(internal_sections)} internal links. Top 35:")
    for s in internal_sections[:35]:
        print("  ", s)

    # Search for menu / navigation items text
    pattern = r'<a[^>]+href=[\'"]([^\'"]+)[\'"][^>]*>(.*?)</a>'
    nav_items = []
    for href, text in re.findall(pattern, html, re.S):
        clean_text = re.sub(r'<[^>]+>', '', text).strip()
        if clean_text and len(clean_text) < 40 and not href.startswith('#'):
            nav_items.append({'href': href, 'text': clean_text})

    print(f"\nExtracted {len(nav_items)} anchor tags with text. Sample:")
    for item in nav_items[:25]:
        print(f"  [{item['text']}] -> {item['href']}")

if __name__ == '__main__':
    analyze_homepage()
