import json

with open('.pipeline/lh-expanded.json', 'r', encoding='utf-8') as f:
    d = json.load(f)
print("=== Final Expanded Lighthouse Scores ===")
for k, v in d.get('categories', {}).items():
    score = v.get('score')
    print(f"  {k}: {int(score * 100) if score is not None else 0}")

print("=== Core Web Vitals ===")
audits = d.get('audits', {})
for m in ['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'first-contentful-paint']:
    if m in audits:
        print(f"  {m}: {audits[m].get('displayValue')}")
