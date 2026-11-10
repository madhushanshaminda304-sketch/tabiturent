import json

with open('.pipeline/lh-after.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

a11y = d['categories']['accessibility']['auditRefs']
audits = d['audits']

for ref in a11y:
    audit_id = ref['id']
    item = audits.get(audit_id, {})
    if item.get('score') is not None and item.get('score') < 1:
        print(f"FAILED: {audit_id} (score {item.get('score')}) - {item.get('title')}")
        if 'details' in item and 'items' in item['details']:
            for node in item['details']['items'][:3]:
                print(f"   Node: {node.get('node', {}).get('snippet')}")
