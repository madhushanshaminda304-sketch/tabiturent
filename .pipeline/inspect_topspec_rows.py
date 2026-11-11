import urllib.request
from bs4 import BeautifulSoup

req = urllib.request.Request("https://tabiturient.ru/topspec", headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
soup = BeautifulSoup(html, 'html.parser')

tables = soup.find_all('table')
for idx, t in enumerate(tables):
    text = t.get_text(' ', strip=True)
    if "#1" in text and "Бакалавриат" in text:
        rows = t.find_all('tr')
        print(f"Table {idx} has {len(rows)} rows:")
        for r in rows[:25]:
            cols = [c.get_text(' ', strip=True) for c in r.find_all(['td', 'th'])]
            if cols:
                print(" | ".join(cols))
