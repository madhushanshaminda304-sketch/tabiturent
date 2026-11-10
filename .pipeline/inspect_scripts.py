import re
from bs4 import BeautifulSoup

with open('.pipeline/homepage.html', 'r', encoding='utf-8') as f:
    text = f.read()

soup = BeautifulSoup(text, 'html.parser')
scripts = soup.find_all('script')
for s in scripts:
    if s.get('src'):
        print('External script:', s.get('src'))
    else:
        content = s.get_text()
        if 'showmoreinfof4' in content or 'ajax' in content:
            print('Inline script containing ajax/showmoreinfof4:')
            print(content[:500])
