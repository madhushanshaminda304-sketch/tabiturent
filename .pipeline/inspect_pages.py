import urllib.request
import re
from bs4 import BeautifulSoup

urls = [
    "https://tabiturient.ru/article",
    "https://tabiturient.ru/kp",
    "https://tabiturient.ru/topspec",
    "https://tabiturient.ru/adv",
    "https://tabiturient.ru/feedback",
    "https://tabiturient.ru/policy2"
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

for u in urls:
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            soup = BeautifulSoup(html, 'html.parser')
            title = soup.title.string if soup.title else 'No title'
            h1 = soup.find('h1')
            h1_text = h1.get_text(strip=True) if h1 else 'No h1'
            print(f"=== {u} ===")
            print(f"Title: {title}")
            print(f"H1: {h1_text}")
            print(f"Body snippet (first 300 chars): {soup.get_text(' ', strip=True)[:300]}...")
            print("-" * 50)
    except Exception as e:
        print(f"Error fetching {u}: {e}")
