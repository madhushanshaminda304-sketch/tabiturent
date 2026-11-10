import os
import re
import json
from bs4 import BeautifulSoup

def extract_universities():
    path = '.pipeline/source_samples/rating.html'
    if not os.path.exists(path):
        return []
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()
    
    soup = BeautifulSoup(html, 'html.parser')
    vuzes = []
    
    # In tabiturient.ru rating, find rows/cards
    # Look for table or div cards
    cards = soup.find_all('div', class_=re.compile(r'vuz|rating|block|item', re.I))
    print(f"Candidate divs in rating.html: {len(cards)}")
    
    # Let's inspect links with /vuz/ or names
    links = soup.find_all('a', href=re.compile(r'/vuz/|vuz\.php|\?vuz='))
    print(f"Vuz links in rating.html: {len(links)}")
    
    # Let's also check homepage
    with open('.pipeline/homepage.html', 'r', encoding='utf-8', errors='replace') as f:
        hp_html = f.read()
    hp_soup = BeautifulSoup(hp_html, 'html.parser')
    hp_links = hp_soup.find_all('a', href=re.compile(r'/vuz/|vuz\.php|\?vuz='))
    print(f"Vuz links in homepage.html: {len(hp_links)}")
    
    return [l.get_text().strip() for l in links[:20] if l.get_text().strip()]

if __name__ == '__main__':
    vuz_sample = extract_universities()
    print("Sample universities found:", vuz_sample[:10])
