import re

with open('.pipeline/source_samples/script.js', 'r', encoding='utf-8', errors='replace') as f:
    js = f.read()

# search all occurrences of url:
lines = js.split('\n')
for i, l in enumerate(lines):
    if 'url:' in l or 'url :' in l or '.ajax' in l:
        print(f"L{i+1}: {l.strip()}")
        # print next few lines
        for j in range(1, 8):
            if i+j < len(lines):
                print(f"  + {lines[i+j].strip()}")
        print("-" * 40)
