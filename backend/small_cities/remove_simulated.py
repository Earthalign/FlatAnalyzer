import json

with open('backend/data/nbp_prices_dataset.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Filter out oborniki-slaskie
data['records'] = [r for r in data['records'] if r['city'] != 'oborniki-slaskie']

with open('backend/data/nbp_prices_dataset.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Removed oborniki-slaskie. Remaining records: {len(data['records'])}")
