import urllib.request
from bs4 import BeautifulSoup

headers = {"User-Agent": "Mozilla/5.0"}
for url in ["https://tabiturient.ru/topspec", "https://tabiturient.ru/article"]:
    req = urllib.request.Request(url, headers=headers)
    html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
    soup = BeautifulSoup(html, 'html.parser')
    print(f"*** {url} ***")
    if "topspec" in url:
        tables = soup.find_all('table')
        print(f"Found {len(tables)} tables")
        for t in tables[:2]:
            rows = t.find_all('tr')
            for r in rows[:10]:
                cols = [c.get_text(' ', strip=True) for c in r.find_all(['td', 'th'])]
                print(" | ".join(cols))
    else:
        # article
        articles = soup.find_all(['div', 'a'], class_=lambda x: x and ('art' in x.lower() or 'post' in x.lower() or 'item' in x.lower()))
        print(f"Found items: {len(articles)}")
        # print some text snippets
        print(soup.get_text(' ', strip=True)[300:1500])
