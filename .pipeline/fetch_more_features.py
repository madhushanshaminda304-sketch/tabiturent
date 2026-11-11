import urllib.request
import re
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}

urls = [
    'https://tabiturient.ru/podbor',
    'https://tabiturient.ru/calculator/pay',
    'https://tabiturient.ru/100program',
    'https://tabiturient.ru/map',
    'https://tabiturient.ru/vuzam',
    'https://tabiturient.ru/premium',
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='replace')
            soup = BeautifulSoup(html, 'html.parser')
            title = soup.title.string.strip() if soup.title and soup.title.string else 'No title'
            h1s = [h.get_text().strip() for h in soup.find_all('h1')]
            print(f"=== {url} ===")
            print(f"Title: {title}")
            print(f"H1s: {h1s}")
            body_text = ' '.join(soup.get_text().split())
            print(f"Snippet: {body_text[:250]}\n")
    except Exception as e:
        print(f"Error {url}: {e}")
