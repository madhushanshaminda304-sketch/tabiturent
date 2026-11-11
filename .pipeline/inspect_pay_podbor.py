import urllib.request
from bs4 import BeautifulSoup
import re

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for url in ['https://tabiturient.ru/calculator/pay', 'https://tabiturient.ru/podbor', 'https://tabiturient.ru/100program']:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15) as resp:
        html = resp.read().decode('utf-8', errors='replace')
        soup = BeautifulSoup(html, 'html.parser')
        print(f"***** URL: {url} *****")
        forms = soup.find_all('form')
        print("Forms count:", len(forms))
        inputs = [i.get('name') or i.get('id') for i in soup.find_all(['input', 'select'])]
        print("Input names:", inputs[:20])
        # Find key content blocks
        text_samples = [p.get_text().strip() for p in soup.find_all(['div', 'p', 'span']) if len(p.get_text().strip()) > 50][:5]
        for t in text_samples:
            print(" -", t[:120])
        print("\n")
