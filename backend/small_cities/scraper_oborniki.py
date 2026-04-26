import urllib.request
import re
from bs4 import BeautifulSoup
import json

url = "https://www.olx.pl/nieruchomosci/mieszkania/sprzedaz/oborniki-slaskie/?search%5Border%5D=created_at:desc"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    
    # In OLX, price per m2 is often shown in the span or div next to the price
    # Let's search for "zł/m²"
    matches = re.findall(r'([\d\s]+)\s*zł/m', html)
    prices = []
    for m in matches:
        val = m.replace(' ', '').replace('\xa0', '')
        try:
            prices.append(float(val))
        except:
            pass
            
    print(f"OLX: Znalaziono {len(prices)} ofert. Ceny: {prices}")
    if prices:
        print(f"Średnia OLX: {sum(prices)/len(prices)}")
except Exception as e:
    print(f"Error OLX: {e}")

url2 = "https://nieruchomosci-online.pl/szukaj.html?3,mieszkanie,sprzedaz,,Oborniki+Śląskie"
# URL encode the town name properly
import urllib.parse
url2 = "https://nieruchomosci-online.pl/szukaj.html?3,mieszkanie,sprzedaz,," + urllib.parse.quote("Oborniki Śląskie")

req2 = urllib.request.Request(url2, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    html2 = urllib.request.urlopen(req2).read().decode('utf-8')
    matches2 = re.findall(r'([\d\s,]+)\s*zł/m', html2)
    prices2 = []
    for m in matches2:
        val = m.replace(' ', '').replace(',', '.').replace('\xa0', '')
        try:
            prices2.append(float(val))
        except:
            pass
    print(f"Nieruchomosci-online: Znalaziono {len(prices2)} ofert. Ceny: {prices2}")
    if prices2:
        print(f"Średnia N-O: {sum(prices2)/len(prices2)}")
except Exception as e:
    print(f"Error N-O: {e}")
