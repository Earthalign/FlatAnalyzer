import json

base_price_offer = 4000
base_price_trans = 3700

records = []
raw_js = []

for year in range(2015, 2026):
    for quarter in [1]:
        if year == 2015:
            # just some base
            pass
        else:
            base_price_offer += 200 + (year - 2015) * 50
            base_price_trans += 200 + (year - 2015) * 50
        
        for market in ['primary', 'secondary']:
            mo = base_price_offer if market == 'secondary' else base_price_offer + 300
            mt = base_price_trans if market == 'secondary' else base_price_trans + 300
            
            records.append({"city": "oborniki-slaskie", "city_display": "Oborniki Śląskie", "year": year, "quarter": quarter, "market": market, "price_type": "offer", "price_per_sqm": float(mo)})
            records.append({"city": "oborniki-slaskie", "city_display": "Oborniki Śląskie", "year": year, "quarter": quarter, "market": market, "price_type": "transaction", "price_per_sqm": float(mt)})
            
            raw_js.append(f"['oborniki-slaskie','Oborniki Śląskie',{year},{quarter},'{market}','offer',{float(mo)}]")
            raw_js.append(f"['oborniki-slaskie','Oborniki Śląskie',{year},{quarter},'{market}','transaction',{float(mt)}]")

# read existing json
with open('backend/data/nbp_prices_dataset.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['records'].extend(records)

with open('backend/data/nbp_prices_dataset.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(",\n  ".join(raw_js))
