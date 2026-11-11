import urllib.request
from bs4 import BeautifulSoup

req = urllib.request.Request("https://tabiturient.ru/topspec", headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
soup = BeautifulSoup(html, 'html.parser')

# Find the main table with specialties
tables = soup.find_all('table')
for idx, t in enumerate(tables):
    text = t.get_text(' ', strip=True)
    if "09.03." in text or "Информатика" in text or "Экономика" in text or "Юриспруденция" in text:
        print(f"Table index: {idx}")
        rows = t.find_all('tr')
        for r in rows[:15]:
            cols = [c.get_text(' ', strip=True) for c in r.find_all(['td', 'th'])]
            print(" | ".join(cols))
        break
