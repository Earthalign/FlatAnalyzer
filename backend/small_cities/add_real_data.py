import json

real_data = [
    {
      "city": "oborniki-slaskie",
      "city_display": "Oborniki Śląskie",
      "year": 2025,
      "quarter": 1,
      "market": "secondary",
      "price_type": "offer",
      "price_per_sqm": 10170.0
    }
]

with open('backend/data/nbp_prices_dataset.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Ensure no duplicates
data['records'] = [r for r in data['records'] if r['city'] != 'oborniki-slaskie']
data['records'].extend(real_data)

with open('backend/data/nbp_prices_dataset.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Added real OLX data for Oborniki Slaskie.")
