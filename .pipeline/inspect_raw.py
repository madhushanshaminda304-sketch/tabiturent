import urllib.request
import re

url = "https://tabiturient.ru/"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        print(f"Status: {resp.status}, Content Length: {len(content)}")
        # Look for hrefs
        all_hrefs = re.findall(r'href=[\'"]([^\'"]+)[\'"]', content)
        print(f"Total hrefs found: {len(all_hrefs)}")
        internal = [h for h in all_hrefs if h.startswith('/') or 'tabiturient.ru' in h]
        print(f"Internal hrefs: {len(internal)}")
        for h in sorted(set(internal))[:40]:
            print("  ", h)
except Exception as e:
    print("Fetch error:", e)
