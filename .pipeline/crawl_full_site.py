import urllib.request
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

visited = set()
to_visit = ["https://tabiturient.ru/"]
domain = "tabiturient.ru"
routes = set()
forms = []
interactive_endpoints = set()

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

print("Starting deep crawl...")
count = 0
while to_visit and count < 40:
    url = to_visit.pop(0)
    if url in visited:
        continue
    visited.add(url)
    count += 1
    
    parsed = urlparse(url)
    clean_path = parsed.path
    routes.add(clean_path)
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as resp:
            content_type = resp.headers.get('Content-Type', '')
            if 'text/html' not in content_type:
                continue
            html = resp.read().decode('utf-8', errors='ignore')
            soup = BeautifulSoup(html, 'html.parser')
            
            # Find all links
            for a in soup.find_all('a', href=True):
                href = a['href'].strip()
                full_url = urljoin(url, href)
                u_parsed = urlparse(full_url)
                if domain in u_parsed.netloc:
                    p = u_parsed.path
                    if not any(p.endswith(ext) for ext in ['.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.pdf']):
                        routes.add(p)
                        if full_url not in visited and full_url not in to_visit and len(to_visit) < 100:
                            to_visit.append(full_url)
            
            # Find forms
            for f in soup.find_all('form'):
                action = f.get('action', '')
                method = f.get('method', 'get').upper()
                inputs = [inp.get('name') for inp in f.find_all(['input', 'select', 'textarea']) if inp.get('name')]
                forms.append({'url': url, 'action': action, 'method': method, 'inputs': inputs})
                
            # Find script references to ajax or endpoints
            scripts = soup.find_all('script')
            for s in scripts:
                txt = s.string or ''
                matches = re.findall(r'[\'"](/ajax/[^\'"]+)[\'"]', txt)
                for m in matches:
                    interactive_endpoints.add(m)
                matches_url = re.findall(r'[\'"](/[a-zA-Z0-9_\-]+(\.php)?)[\'"]', txt)
                for m, _ in matches_url:
                    if not m.startswith('//') and not m.endswith('.js') and not m.endswith('.css'):
                        interactive_endpoints.add(m)
                        
    except Exception as e:
        print(f"Error crawling {url}: {e}")

print("\n=== ALL DISCOVERED ROUTES ===")
for r in sorted(routes):
    print("  ", r)

print("\n=== INTERACTIVE / AJAX ENDPOINTS ===")
for ep in sorted(interactive_endpoints):
    print("  ", ep)

print(f"\nTotal forms found: {len(forms)}")
for f in forms[:15]:
    print(f"  Form on {f['url']}: action={f['action']}, method={f['method']}, inputs={f['inputs']}")
