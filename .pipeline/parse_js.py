import re

with open('.pipeline/source_samples/script.js', 'r', encoding='utf-8', errors='replace') as f:
    js = f.read()

print("Script size:", len(js))

# find all functions
funcs = re.findall(r'function\s+([a-zA-Z0-9_]+)\s*\(', js)
print("Functions count:", len(funcs))
print("Sample functions:", funcs[:30])

# find ajax endpoints
ajax_urls = re.findall(r'url\s*:\s*[\'"]([^\'"]+)[\'"]', js)
print("AJAX URLs:", set(ajax_urls))

# search showmoreinfof4
if 'showmoreinfof4' in js:
    idx = js.find('showmoreinfof4')
    print("showmoreinfof4 found at index", idx)
    print(js[idx:idx+800])
