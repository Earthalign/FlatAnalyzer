# FlatAnalyzer 🏠

**An interactive application for analyzing real estate prices in Poland.**

Browse historical and current apartment prices across major Polish cities.  
Data Source: **National Bank of Poland (NBP)** – quarterly real estate price reports.

![Stack](https://img.shields.io/badge/Python-FastAPI-green)
![Stack](https://img.shields.io/badge/Frontend-Vanilla%20JS-blue)
![Stack](https://img.shields.io/badge/Data-NBP-red)
![Tests](https://img.shields.io/badge/Tests-pytest-yellow)

---

## 🚀 Local Setup

### 1. Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the server

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

### 3. Open your browser

Navigate to:
```text
http://localhost:8000
```

API Documentation (Swagger UI) is available at: `http://localhost:8000/api/docs`

---

## 🧪 Running Tests

To run the unit and integration tests:

```bash
cd backend
pytest tests/ -v
```

With coverage report:

```bash
pytest tests/ -v --cov=app --cov-report=term-missing
```

---

## 📁 Project Structure

```text
FlatAnalyzer/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── config.py            # Configuration (pydantic-settings)
│   │   ├── models/              # Pydantic models (PriceRecord, PriceSummary, etc.)
│   │   ├── services/            # Data parsing & cache service (SQLite async)
│   │   └── routers/             # API Endpoints (/api/prices, /api/cities)
│   ├── data/
│   │   └── nbp_prices_dataset.json  # NBP Dataset 2015–2025 (16 cities)
│   ├── small_cities/            # Scraping and insertion scripts for small cities
│   └── tests/                   # Pytest fixtures and test suites
├── frontend/
│   ├── index.html               # Main application frontend
│   ├── css/style.css
│   └── js/
│       ├── api.js               # REST API Client
│       ├── charts.js            # Chart.js visualization logic
│       └── app.js               # Core frontend application logic
└── docs/
    ├── index.html               # Standalone demo for GitHub Pages
    ├── style.css
    └── script.js
```

---

## 🔌 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/cities/` | List all available cities |
| `GET /api/prices/?city=warszawa` | Get price data for a specific city |
| `GET /api/prices/?city=krakow&market=secondary&price_type=transaction` | Get prices with filters |
| `GET /api/prices/summary?city=warszawa` | Get statistical summary (min/max/YoY change) |
| `GET /api/prices/compare?city_a=warszawa&city_b=krakow` | Compare two cities |
| `GET /api/docs` | Swagger Interactive UI |

---

## 🌐 Portfolio Demo (GitHub Pages)

The `docs/` folder contains a fully standalone demo version (without the Python backend, using an embedded dataset) designed to be published directly via GitHub Pages.

**To deploy:**
1. Push the `docs/` folder to your GitHub repository.
2. Go to Repository Settings -> Pages.
3. Select "Deploy from a branch", choose `main` branch and folder `/docs`.
4. Your demo will be available at `https://your-username.github.io/FlatAnalyzer/`.

---

## 📊 Data Source

**NBP – National Bank of Poland**  
[Real Estate Market and Price Information](https://www.nbp.pl/statystyka-i-sprawozdawczosc/ceny-nieruchomosci/)

- Quarterly data: primary and secondary markets
- Offer and transaction prices (PLN/m²)
- Covered cities: Warsaw, Krakow, Wroclaw, Gdansk, Poznan, Lodz, Katowice, Lublin, Szczecin, Bialystok, Rzeszow, Bydgoszcz, Gdynia, Olsztyn.

---

## 🛠 Tech Stack

**Backend:**
- Python 3.11+
- FastAPI + Uvicorn (ASGI)
- Pydantic v2 (Data validation)
- SQLite + aiosqlite (Cache)
- pytest + pytest-asyncio (Testing)

**Frontend:**
- Vanilla HTML/CSS/JavaScript
- Chart.js (Data visualization)
- Google Fonts (Inter, JetBrains Mono)

---

*Portfolio Project – Witold Wluczkowski*
