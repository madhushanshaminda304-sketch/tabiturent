import json

try:
    with open('.pipeline/lh.json', 'r', encoding='utf-8') as f:
        d = json.load(f)
    print("=== Categories ===")
    cats = d.get('categories', {})
    for k, v in cats.items():
        score = v.get('score')
        score_val = int(score * 100) if score is not None else 'N/A'
        print(f"  {k}: {score_val}")
    print("=== Core Web Vitals ===")
    audits = d.get('audits', {})
    for m in ['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'first-contentful-paint']:
        if m in audits:
            print(f"  {m}: {audits[m].get('displayValue')}")
except Exception as e:
    print('Error:', e)
