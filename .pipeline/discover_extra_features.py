import urllib.request
import re
from bs4 import BeautifulSoup

def discover():
    url = "https://tabiturient.ru/"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        
        # Find all navigation elements, links, and footer links
        links = set(re.findall(r'href=[\'"](/[a-zA-Z0-9_\-\./]+)[\'"]', html))
        print("--- Discovered routes from homepage ---")
        filtered_links = sorted([l for l in links if not any(l.endswith(ext) for ext in ['.css', '.js', '.png', '.jpg', '.svg', '.ico']) and not l.startswith('/ajax')])
        for fl in filtered_links:
            print(fl)
            
        # Also let's inspect the menu items and categories
        menu_items = re.findall(r'<a[^>]*class=[\'"][^\'"]*menu[^\'"]*[\'"][^>]*href=[\'"]([^\'"]+)[\'"][^>]*>(.*?)</a>', html, re.I)
        print("\n--- Menu Items ---")
        for href, text in menu_items:
            clean_text = re.sub(r'<[^>]+>', '', text).strip()
            print(f"{clean_text}: {href}")
            
    except Exception as e:
        print("Error fetching:", e)

if __name__ == "__main__":
    discover()
