import os
import re
import json
from bs4 import BeautifulSoup

def analyze_css():
    css_path = '.pipeline/source_samples/style.css'
    if not os.path.exists(css_path):
        return {}
    with open(css_path, 'r', encoding='utf-8', errors='replace') as f:
        css = f.read()
    
    # Extract colors
    hex_colors = set(re.findall(r'#[0-9a-fA-F]{3,6}\b', css))
    rgb_colors = set(re.findall(r'rgba?\([^\)]+\)', css))
    
    # Extract font families
    fonts = set(re.findall(r'font-family:\s*([^;]+);', css, re.I))
    
    return {
        'hex_colors': sorted(list(hex_colors))[:25],
        'fonts': sorted(list(fonts))[:10]
    }

def analyze_pages():
    results = {}
    sample_dir = '.pipeline/source_samples'
    for fname in os.listdir(sample_dir):
        if not fname.endswith('.html'):
            continue
        path = os.path.join(sample_dir, fname)
        with open(path, 'r', encoding='utf-8', errors='replace') as f:
            html = f.read()
        
        soup = BeautifulSoup(html, 'html.parser')
        title = soup.title.string.strip() if soup.title and soup.title.string else 'No title'
        h1s = [h.get_text().strip() for h in soup.find_all('h1')]
        forms = len(soup.find_all('form'))
        inputs = len(soup.find_all('input'))
        selects = len(soup.find_all('select'))
        buttons = len(soup.find_all('button'))
        
        results[fname] = {
            'title': title,
            'h1': h1s,
            'forms': forms,
            'inputs': inputs,
            'selects': selects,
            'buttons': buttons,
            'size_kb': round(len(html) / 1024, 1)
        }
    return results

if __name__ == '__main__':
    css_info = analyze_css()
    page_info = analyze_pages()
    summary = {
        'css': css_info,
        'pages': page_info
    }
    with open('.pipeline/audit_data.json', 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    print("Audit data generated successfully.")
