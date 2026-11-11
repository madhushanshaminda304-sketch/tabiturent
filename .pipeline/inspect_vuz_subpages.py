import urllib.request
from bs4 import BeautifulSoup

headers = {"User-Agent": "Mozilla/5.0"}
urls = [
    "https://tabiturient.ru/article/work",
    "https://tabiturient.ru/vuzu/hse/proxodnoi",
    "https://tabiturient.ru/vuzu/hse/obsh",
    "https://tabiturient.ru/vuzu/hse/dod",
    "https://tabiturient.ru/vuzu/hse/about"
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            soup = BeautifulSoup(html, 'html.parser')
            print(f"=== {u} ===")
            print("Title:", soup.title.string if soup.title else 'None')
            h1 = soup.find('h1')
            print("H1:", h1.get_text(strip=True) if h1 else 'None')
            # find subnavigation inside university page
            subnav = soup.find_all('a', href=lambda x: x and '/vuzu/hse' in x)
            print("Subnav links:", [a.get_text(strip=True) for a in subnav][:10])
            print("Snippet:", soup.get_text(' ', strip=True)[:400])
            print("-" * 50)
    except Exception as e:
        print(f"Error {u}: {e}")
