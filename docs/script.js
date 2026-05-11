// ====================================================
// EMBEDDED STATIC DATA (NBP dataset subset for demo)
// ====================================================
const STATIC_CITIES = [
  { slug: 'warszawa', display: 'Warszawa' }, { slug: 'krakow', display: 'Krakow' },
  { slug: 'wroclaw', display: 'Wroclaw' }, { slug: 'gdansk', display: 'Gdansk' },
  { slug: 'poznan', display: 'Poznan' }, { slug: 'lodz', display: 'Lodz' },
  { slug: 'katowice', display: 'Katowice' }, { slug: 'lublin', display: 'Lublin' },
  { slug: 'szczecin', display: 'Szczecin' }, { slug: 'bialystok', display: 'Bialystok' },
  { slug: 'rzeszow', display: 'Rzeszow' }, { slug: 'bydgoszcz', display: 'Bydgoszcz' },
  { slug: 'gdynia', display: 'Gdynia' }, { slug: 'olsztyn', display: 'Olsztyn' },
  { slug: 'oborniki-slaskie', display: 'Oborniki Slaskie' }
];

// Compact dataset: [city, city_display, year, quarter, market, price_type, price_per_sqm]
const RAW = [
  ['warszawa', 'Warszawa', 2015, 1, 'secondary', 'transaction', 7200], ['warszawa', 'Warszawa', 2016, 1, 'secondary', 'transaction', 7450],
  ['warszawa', 'Warszawa', 2017, 1, 'secondary', 'transaction', 7620], ['warszawa', 'Warszawa', 2018, 1, 'secondary', 'transaction', 8050],
  ['warszawa', 'Warszawa', 2018, 2, 'secondary', 'transaction', 8300], ['warszawa', 'Warszawa', 2018, 3, 'secondary', 'transaction', 8550],
  ['warszawa', 'Warszawa', 2018, 4, 'secondary', 'transaction', 8700], ['warszawa', 'Warszawa', 2019, 1, 'secondary', 'transaction', 8900],
  ['warszawa', 'Warszawa', 2019, 2, 'secondary', 'transaction', 9050], ['warszawa', 'Warszawa', 2019, 3, 'secondary', 'transaction', 9200],
  ['warszawa', 'Warszawa', 2019, 4, 'secondary', 'transaction', 9380], ['warszawa', 'Warszawa', 2020, 1, 'secondary', 'transaction', 9500],
  ['warszawa', 'Warszawa', 2020, 2, 'secondary', 'transaction', 9450], ['warszawa', 'Warszawa', 2020, 3, 'secondary', 'transaction', 9600],
  ['warszawa', 'Warszawa', 2020, 4, 'secondary', 'transaction', 9850], ['warszawa', 'Warszawa', 2021, 1, 'secondary', 'transaction', 10200],
  ['warszawa', 'Warszawa', 2021, 2, 'secondary', 'transaction', 10600], ['warszawa', 'Warszawa', 2021, 3, 'secondary', 'transaction', 11000],
  ['warszawa', 'Warszawa', 2021, 4, 'secondary', 'transaction', 11400], ['warszawa', 'Warszawa', 2022, 1, 'secondary', 'transaction', 11900],
  ['warszawa', 'Warszawa', 2022, 2, 'secondary', 'transaction', 12200], ['warszawa', 'Warszawa', 2022, 3, 'secondary', 'transaction', 12400],
  ['warszawa', 'Warszawa', 2022, 4, 'secondary', 'transaction', 12500], ['warszawa', 'Warszawa', 2023, 1, 'secondary', 'transaction', 12800],
  ['warszawa', 'Warszawa', 2023, 2, 'secondary', 'transaction', 13200], ['warszawa', 'Warszawa', 2023, 3, 'secondary', 'transaction', 13900],
  ['warszawa', 'Warszawa', 2023, 4, 'secondary', 'transaction', 14600], ['warszawa', 'Warszawa', 2024, 1, 'secondary', 'transaction', 15200],
  ['warszawa', 'Warszawa', 2024, 2, 'secondary', 'transaction', 15500], ['warszawa', 'Warszawa', 2024, 3, 'secondary', 'transaction', 15700],
  ['warszawa', 'Warszawa', 2024, 4, 'secondary', 'transaction', 15900], ['warszawa', 'Warszawa', 2025, 1, 'secondary', 'transaction', 16100],
  ['warszawa', 'Warszawa', 2015, 1, 'primary', 'transaction', 7250], ['warszawa', 'Warszawa', 2018, 1, 'primary', 'transaction', 8050],
  ['warszawa', 'Warszawa', 2020, 1, 'primary', 'transaction', 9400], ['warszawa', 'Warszawa', 2021, 1, 'primary', 'transaction', 10100],
  ['warszawa', 'Warszawa', 2022, 1, 'primary', 'transaction', 11800], ['warszawa', 'Warszawa', 2023, 1, 'primary', 'transaction', 12700],
  ['warszawa', 'Warszawa', 2024, 1, 'primary', 'transaction', 15000], ['warszawa', 'Warszawa', 2025, 1, 'primary', 'transaction', 15900],
  ['warszawa', 'Warszawa', 2015, 1, 'secondary', 'offer', 7900], ['warszawa', 'Warszawa', 2018, 1, 'secondary', 'offer', 8800],
  ['warszawa', 'Warszawa', 2020, 1, 'secondary', 'offer', 10350], ['warszawa', 'Warszawa', 2021, 1, 'secondary', 'offer', 11100],
  ['warszawa', 'Warszawa', 2022, 1, 'secondary', 'offer', 12900], ['warszawa', 'Warszawa', 2023, 1, 'secondary', 'offer', 13800],
  ['warszawa', 'Warszawa', 2024, 1, 'secondary', 'offer', 16200], ['warszawa', 'Warszawa', 2025, 1, 'secondary', 'offer', 17100],

  ['krakow', 'Krakow', 2015, 1, 'secondary', 'transaction', 6500], ['krakow', 'Krakow', 2016, 1, 'secondary', 'transaction', 6680],
  ['krakow', 'Krakow', 2017, 1, 'secondary', 'transaction', 6900], ['krakow', 'Krakow', 2018, 1, 'secondary', 'transaction', 7450],
  ['krakow', 'Krakow', 2019, 1, 'secondary', 'transaction', 7950], ['krakow', 'Krakow', 2020, 1, 'secondary', 'transaction', 8350],
  ['krakow', 'Krakow', 2021, 1, 'secondary', 'transaction', 9050], ['krakow', 'Krakow', 2022, 1, 'secondary', 'transaction', 10200],
  ['krakow', 'Krakow', 2023, 1, 'secondary', 'transaction', 11900], ['krakow', 'Krakow', 2024, 1, 'secondary', 'transaction', 13900],
  ['krakow', 'Krakow', 2025, 1, 'secondary', 'transaction', 14800],
  ['krakow', 'Krakow', 2015, 1, 'primary', 'transaction', 6400], ['krakow', 'Krakow', 2018, 1, 'primary', 'transaction', 7350],
  ['krakow', 'Krakow', 2021, 1, 'primary', 'transaction', 8950], ['krakow', 'Krakow', 2023, 1, 'primary', 'transaction', 11800],
  ['krakow', 'Krakow', 2024, 1, 'primary', 'transaction', 13700], ['krakow', 'Krakow', 2025, 1, 'primary', 'transaction', 14600],
  ['krakow', 'Krakow', 2015, 1, 'secondary', 'offer', 7200], ['krakow', 'Krakow', 2018, 1, 'secondary', 'offer', 8200],
  ['krakow', 'Krakow', 2021, 1, 'secondary', 'offer', 9800], ['krakow', 'Krakow', 2023, 1, 'secondary', 'offer', 12800],
  ['krakow', 'Krakow', 2024, 1, 'secondary', 'offer', 14900], ['krakow', 'Krakow', 2025, 1, 'secondary', 'offer', 15700],

  ['wroclaw', 'Wroclaw', 2015, 1, 'secondary', 'transaction', 5650], ['wroclaw', 'Wroclaw', 2018, 1, 'secondary', 'transaction', 6900],
  ['wroclaw', 'Wroclaw', 2020, 1, 'secondary', 'transaction', 7700], ['wroclaw', 'Wroclaw', 2021, 1, 'secondary', 'transaction', 8600],
  ['wroclaw', 'Wroclaw', 2022, 1, 'secondary', 'transaction', 9800], ['wroclaw', 'Wroclaw', 2023, 1, 'secondary', 'transaction', 11300],
  ['wroclaw', 'Wroclaw', 2024, 1, 'secondary', 'transaction', 12900], ['wroclaw', 'Wroclaw', 2025, 1, 'secondary', 'transaction', 13600],
  ['wroclaw', 'Wroclaw', 2015, 1, 'primary', 'transaction', 5600], ['wroclaw', 'Wroclaw', 2018, 1, 'primary', 'transaction', 6800],
  ['wroclaw', 'Wroclaw', 2021, 1, 'primary', 'transaction', 8500], ['wroclaw', 'Wroclaw', 2023, 1, 'primary', 'transaction', 11200],
  ['wroclaw', 'Wroclaw', 2024, 1, 'primary', 'transaction', 12700], ['wroclaw', 'Wroclaw', 2025, 1, 'primary', 'transaction', 13400],

  ['gdansk', 'Gdansk', 2015, 1, 'secondary', 'transaction', 5550], ['gdansk', 'Gdansk', 2018, 1, 'secondary', 'transaction', 7000],
  ['gdansk', 'Gdansk', 2020, 1, 'secondary', 'transaction', 8300], ['gdansk', 'Gdansk', 2021, 1, 'secondary', 'transaction', 9300],
  ['gdansk', 'Gdansk', 2022, 1, 'secondary', 'transaction', 10600], ['gdansk', 'Gdansk', 2023, 1, 'secondary', 'transaction', 12100],
  ['gdansk', 'Gdansk', 2024, 1, 'secondary', 'transaction', 13800], ['gdansk', 'Gdansk', 2025, 1, 'secondary', 'transaction', 14500],
  ['gdansk', 'Gdansk', 2015, 1, 'primary', 'transaction', 5500], ['gdansk', 'Gdansk', 2018, 1, 'primary', 'transaction', 6900],
  ['gdansk', 'Gdansk', 2021, 1, 'primary', 'transaction', 9200], ['gdansk', 'Gdansk', 2023, 1, 'primary', 'transaction', 12000],
  ['gdansk', 'Gdansk', 2024, 1, 'primary', 'transaction', 13600], ['gdansk', 'Gdansk', 2025, 1, 'primary', 'transaction', 14300],

  ['poznan', 'Poznan', 2015, 1, 'secondary', 'transaction', 5400], ['poznan', 'Poznan', 2018, 1, 'secondary', 'transaction', 6400],
  ['poznan', 'Poznan', 2021, 1, 'secondary', 'transaction', 8300], ['poznan', 'Poznan', 2022, 1, 'secondary', 'transaction', 9300],
  ['poznan', 'Poznan', 2023, 1, 'secondary', 'transaction', 10600], ['poznan', 'Poznan', 2024, 1, 'secondary', 'transaction', 11900],
  ['poznan', 'Poznan', 2025, 1, 'secondary', 'transaction', 12500],
  ['poznan', 'Poznan', 2021, 1, 'primary', 'transaction', 8200], ['poznan', 'Poznan', 2023, 1, 'primary', 'transaction', 10500],
  ['poznan', 'Poznan', 2024, 1, 'primary', 'transaction', 11700], ['poznan', 'Poznan', 2025, 1, 'primary', 'transaction', 12300],

  ['lodz', 'Lodz', 2015, 1, 'secondary', 'transaction', 3300], ['lodz', 'Lodz', 2018, 1, 'secondary', 'transaction', 3900],
  ['lodz', 'Lodz', 2021, 1, 'secondary', 'transaction', 5500], ['lodz', 'Lodz', 2022, 1, 'secondary', 'transaction', 6500],
  ['lodz', 'Lodz', 2023, 1, 'secondary', 'transaction', 7600], ['lodz', 'Lodz', 2024, 1, 'secondary', 'transaction', 8400],
  ['lodz', 'Lodz', 2025, 1, 'secondary', 'transaction', 8800],
  ['lodz', 'Lodz', 2021, 1, 'primary', 'transaction', 6500], ['lodz', 'Lodz', 2023, 1, 'primary', 'transaction', 9100],
  ['lodz', 'Lodz', 2024, 1, 'primary', 'transaction', 9900], ['lodz', 'Lodz', 2025, 1, 'primary', 'transaction', 10400],

  ['katowice', 'Katowice', 2015, 1, 'secondary', 'transaction', 3500], ['katowice', 'Katowice', 2018, 1, 'secondary', 'transaction', 4300],
  ['katowice', 'Katowice', 2021, 1, 'secondary', 'transaction', 5700], ['katowice', 'Katowice', 2022, 1, 'secondary', 'transaction', 6600],
  ['katowice', 'Katowice', 2023, 1, 'secondary', 'transaction', 7800], ['katowice', 'Katowice', 2024, 1, 'secondary', 'transaction', 9000],
  ['katowice', 'Katowice', 2025, 1, 'secondary', 'transaction', 9500],
  ['katowice', 'Katowice', 2021, 1, 'primary', 'transaction', 7200], ['katowice', 'Katowice', 2023, 1, 'primary', 'transaction', 9600],
  ['katowice', 'Katowice', 2024, 1, 'primary', 'transaction', 10900], ['katowice', 'Katowice', 2025, 1, 'primary', 'transaction', 11500],

  ['lublin', 'Lublin', 2015, 1, 'secondary', 'transaction', 3900], ['lublin', 'Lublin', 2020, 1, 'secondary', 'transaction', 5200],
  ['lublin', 'Lublin', 2022, 1, 'secondary', 'transaction', 6700], ['lublin', 'Lublin', 2024, 1, 'secondary', 'transaction', 8900],
  ['lublin', 'Lublin', 2025, 1, 'secondary', 'transaction', 9400],
  ['lublin', 'Lublin', 2020, 1, 'primary', 'transaction', 6100], ['lublin', 'Lublin', 2022, 1, 'primary', 'transaction', 8000],
  ['lublin', 'Lublin', 2024, 1, 'primary', 'transaction', 10500], ['lublin', 'Lublin', 2025, 1, 'primary', 'transaction', 11000],

  ['szczecin', 'Szczecin', 2015, 1, 'secondary', 'transaction', 3400], ['szczecin', 'Szczecin', 2020, 1, 'secondary', 'transaction', 4800],
  ['szczecin', 'Szczecin', 2022, 1, 'secondary', 'transaction', 6400], ['szczecin', 'Szczecin', 2024, 1, 'secondary', 'transaction', 8500],
  ['szczecin', 'Szczecin', 2025, 1, 'secondary', 'transaction', 8900],
  ['szczecin', 'Szczecin', 2020, 1, 'primary', 'transaction', 5900], ['szczecin', 'Szczecin', 2022, 1, 'primary', 'transaction', 7800],
  ['szczecin', 'Szczecin', 2024, 1, 'primary', 'transaction', 10200], ['szczecin', 'Szczecin', 2025, 1, 'primary', 'transaction', 10700],

  ['bialystok', 'Bialystok', 2015, 1, 'secondary', 'transaction', 3300], ['bialystok', 'Bialystok', 2020, 1, 'secondary', 'transaction', 4500],
  ['bialystok', 'Bialystok', 2022, 1, 'secondary', 'transaction', 6100], ['bialystok', 'Bialystok', 2024, 1, 'secondary', 'transaction', 8000],
  ['bialystok', 'Bialystok', 2025, 1, 'secondary', 'transaction', 8400],
  ['bialystok', 'Bialystok', 2020, 1, 'primary', 'transaction', 5650], ['bialystok', 'Bialystok', 2022, 1, 'primary', 'transaction', 7600],
  ['bialystok', 'Bialystok', 2024, 1, 'primary', 'transaction', 9900], ['bialystok', 'Bialystok', 2025, 1, 'primary', 'transaction', 10400],

  ['rzeszow', 'Rzeszow', 2015, 1, 'secondary', 'transaction', 3800], ['rzeszow', 'Rzeszow', 2020, 1, 'secondary', 'transaction', 4900],
  ['rzeszow', 'Rzeszow', 2022, 1, 'secondary', 'transaction', 6500], ['rzeszow', 'Rzeszow', 2024, 1, 'secondary', 'transaction', 8400],
  ['rzeszow', 'Rzeszow', 2025, 1, 'secondary', 'transaction', 8800],
  ['rzeszow', 'Rzeszow', 2020, 1, 'primary', 'transaction', 5800], ['rzeszow', 'Rzeszow', 2022, 1, 'primary', 'transaction', 7700],
  ['rzeszow', 'Rzeszow', 2024, 1, 'primary', 'transaction', 10000], ['rzeszow', 'Rzeszow', 2025, 1, 'primary', 'transaction', 10500],

  ['bydgoszcz', 'Bydgoszcz', 2015, 1, 'secondary', 'transaction', 3300], ['bydgoszcz', 'Bydgoszcz', 2020, 1, 'secondary', 'transaction', 4400],
  ['bydgoszcz', 'Bydgoszcz', 2022, 1, 'secondary', 'transaction', 5900], ['bydgoszcz', 'Bydgoszcz', 2024, 1, 'secondary', 'transaction', 7600],
  ['bydgoszcz', 'Bydgoszcz', 2025, 1, 'secondary', 'transaction', 8000],
  ['bydgoszcz', 'Bydgoszcz', 2020, 1, 'primary', 'transaction', 5650], ['bydgoszcz', 'Bydgoszcz', 2022, 1, 'primary', 'transaction', 7400],
  ['bydgoszcz', 'Bydgoszcz', 2024, 1, 'primary', 'transaction', 9400], ['bydgoszcz', 'Bydgoszcz', 2025, 1, 'primary', 'transaction', 9900],

  ['gdynia', 'Gdynia', 2015, 1, 'secondary', 'transaction', 5600], ['gdynia', 'Gdynia', 2020, 1, 'secondary', 'transaction', 7700],
  ['gdynia', 'Gdynia', 2022, 1, 'secondary', 'transaction', 9800], ['gdynia', 'Gdynia', 2024, 1, 'secondary', 'transaction', 12200],
  ['gdynia', 'Gdynia', 2025, 1, 'secondary', 'transaction', 12800],
  ['gdynia', 'Gdynia', 2020, 1, 'primary', 'transaction', 7900], ['gdynia', 'Gdynia', 2022, 1, 'primary', 'transaction', 10100],
  ['gdynia', 'Gdynia', 2024, 1, 'primary', 'transaction', 12800], ['gdynia', 'Gdynia', 2025, 1, 'primary', 'transaction', 13400],

  ['olsztyn', 'Olsztyn', 2015, 1, 'primary', 'transaction', 3950], ['olsztyn', 'Olsztyn', 2020, 1, 'primary', 'transaction', 5550],
  ['olsztyn', 'Olsztyn', 2022, 1, 'primary', 'transaction', 7300], ['olsztyn', 'Olsztyn', 2024, 1, 'primary', 'transaction', 9500],
  ['olsztyn', 'Olsztyn', 2025, 1, 'primary', 'transaction', 10000],

  ['oborniki-slaskie', 'Oborniki Slaskie', 2024, 1, 'secondary', 'offer', 9800],
  ['oborniki-slaskie', 'Oborniki Slaskie', 2024, 2, 'secondary', 'offer', 9950],
  ['oborniki-slaskie', 'Oborniki Slaskie', 2024, 3, 'secondary', 'offer', 10050],
  ['oborniki-slaskie', 'Oborniki Slaskie', 2024, 4, 'secondary', 'offer', 10120],
  ['oborniki-slaskie', 'Oborniki Slaskie', 2025, 1, 'secondary', 'offer', 10170.0],

  ['oborniki-slaskie', 'Oborniki Slaskie', 2024, 4, 'secondary', 'transaction', 9700],
  ['oborniki-slaskie', 'Oborniki Slaskie', 2025, 1, 'secondary', 'transaction', 9850],

  ['oborniki-slaskie', 'Oborniki Slaskie', 2024, 4, 'primary', 'transaction', 10500],
  ['oborniki-slaskie', 'Oborniki Slaskie', 2025, 1, 'primary', 'transaction', 10800]
];

// ====================================================
// STATIC API (mirrors FastAPI responses)
// ====================================================
const StaticApi = {
  getCities() { return STATIC_CITIES; },
  getPrices(city, opts = {}) {
    let recs = RAW.filter(r => r[0] === city);
    if (opts.market) recs = recs.filter(r => r[4] === opts.market);
    if (opts.price_type) recs = recs.filter(r => r[5] === opts.price_type);
    if (opts.year_from) recs = recs.filter(r => r[2] >= +opts.year_from);
    if (opts.year_to) recs = recs.filter(r => r[2] <= +opts.year_to);
    const records = recs.sort((a, b) => a[2] - b[2] || a[3] - b[3]).map(r => ({
      city: r[0], city_display: r[1], year: r[2], quarter: r[3], market: r[4], price_type: r[5], price_per_sqm: r[6]
    }));
    if (!records.length) throw { notFound: true, message: `No data for city '${city}' with given filters.` };
    return { records };
  },
  getSummary(city, market = 'secondary', priceType = 'transaction') {
    let recs = RAW.filter(r => r[0] === city && r[4] === market);
    // If specific priceType requested but not found, try to find ANY for that city/market
    if (priceType && !recs.find(r => r[5] === priceType)) {
      const availableTypes = [...new Set(recs.map(r => r[5]))];
      if (availableTypes.length > 0) priceType = availableTypes[0];
    }
    recs = recs.filter(r => r[5] === priceType);

    if (!recs.length) return null;
    recs = recs.sort((a, b) => a[2] - b[2] || a[3] - b[3]);
    const prices = recs.map(r => r[6]);
    const latest = recs[recs.length - 1];
    const prev = recs.filter(r => r[2] === latest[2] - 1);
    const curr = recs.filter(r => r[2] === latest[2]);
    let yoy = null;
    if (curr.length && prev.length) {
      const avgC = curr.reduce((s, r) => s + r[6], 0) / curr.length;
      const avgP = prev.reduce((s, r) => s + r[6], 0) / prev.length;
      yoy = Math.round((avgC - avgP) / avgP * 1000) / 10;
    }
    return {
      city, city_display: latest[1], market, price_type: priceType,
      latest_price: latest[6], latest_year: latest[2], latest_quarter: latest[3],
      min_price: Math.min(...prices), max_price: Math.max(...prices),
      price_change_yoy: yoy, records_count: recs.length,
      available_years: [...new Set(recs.map(r => r[2]))].sort()
    };
  }
};

// ====================================================
// CHART.JS
// ====================================================
const CHART_COLORS = {
  primary: 'rgba(99,102,241,1)', primaryFill: 'rgba(99,102,241,0.12)',
  secondary: 'rgba(34,211,238,1)', secondaryFill: 'rgba(34,211,238,0.08)',
  offer: 'rgba(245,158,11,1)', offerFill: 'rgba(245,158,11,0.08)',
  transaction: 'rgba(16,185,129,1)', transactionFill: 'rgba(16,185,129,0.08)',
};
let _chart = null, _chartType = 'line';
const chartOpts = {
  responsive: true, maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: {
    legend: { display: false }, tooltip: {
      backgroundColor: 'rgba(17,24,39,0.95)', borderColor: 'rgba(99,102,241,0.3)', borderWidth: 1,
      titleColor: '#f1f5f9', bodyColor: '#94a3b8', padding: 12, cornerRadius: 8,
      callbacks: { label: ctx => `  ${ctx.dataset.label}: ${fmtPLN(ctx.parsed.y)} PLN/m²` }
    }
  },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4b5563', font: { size: 11, family: 'Inter' } } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#4b5563', font: { size: 11, family: 'JetBrains Mono' }, callback: v => fmtPLN(v) } }
  },
  elements: { point: { radius: 3, hoverRadius: 6, borderWidth: 2 }, line: { tension: 0.35, borderWidth: 2.5 } }
};
function buildChart(records, type) {
  const groups = {};
  records.forEach(r => {
    const k = `${r.market}__${r.price_type}`;
    if (!groups[k]) groups[k] = { market: r.market, type: r.price_type, pts: {} };
    groups[k].pts[`${r.year} Q${r.quarter}`] = r.price_per_sqm;
  });
  const allP = [...new Set(records.map(r => `${r.year} Q${r.quarter}`))].sort((a, b) => {
    const [ya, qa] = a.split(' Q').map(Number); const [yb, qb] = b.split(' Q').map(Number);
    return ya !== yb ? ya - yb : qa - qb;
  });
  const datasets = Object.values(groups).map(g => {
    const ck = g.type === 'offer' ? 'offer' : g.market === 'primary' ? 'primary' : 'secondary';
    return {
      label: `${g.market === 'primary' ? 'Primary' : 'Secondary'} · ${g.type === 'offer' ? 'offer' : 'transaction'}`,
      data: allP.map(p => g.pts[p] ?? null),
      borderColor: CHART_COLORS[ck], backgroundColor: CHART_COLORS[ck + 'Fill'],
      fill: type === 'line', spanGaps: true, borderRadius: 4
    };
  });
  return { labels: allP, datasets };
}
function renderChart(records, city) {
  if (_chart) { _chart.destroy(); _chart = null; }
  const { labels, datasets } = buildChart(records, _chartType);

  // Safe check for empty or single-point datasets for bar/line charts
  const hasData = datasets.some(ds => ds.data.some(v => v !== null));
  if (!hasData) {
    document.getElementById('priceChart').style.display = 'none';
    return;
  }
  document.getElementById('priceChart').style.display = 'block';

  const ctx = document.getElementById('priceChart').getContext('2d');
  _chart = new Chart(ctx, { type: _chartType, data: { labels, datasets }, options: chartOpts });
  document.getElementById('chartLegend').innerHTML = datasets.map(ds =>
    `<div class="legend-item"><div class="legend-dot" style="background:${ds.borderColor}"></div>${ds.label}</div>`
  ).join('');
}
function switchChartType(type, btn) {
  _chartType = type;
  document.querySelectorAll('.chart-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (currentRecords.length) renderChart(currentRecords, currentCity);
}

// ====================================================
// APP STATE
// ====================================================
const state = { market: 'secondary', price_type: '', year_from: '', year_to: '' };
let currentCity = null, currentRecords = [], currentSummary = null;

document.addEventListener('DOMContentLoaded', () => {
  populateYears();
  renderCityGrid();
  setupInput();
});

function goHome() {
  currentCity = null;
  currentRecords = [];
  currentSummary = null;
  document.getElementById('cityInput').value = '';
  setState('initial');
  // Reset filters
  state.market = 'secondary';
  state.price_type = '';
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === 'market' && btn.dataset.value === 'secondary') btn.classList.add('active');
    if (btn.dataset.filter === 'price_type' && btn.dataset.value === '') btn.classList.add('active');
  });
}

function populateYears() {
  const opts = `<option value="">All</option>` +
    Array.from({ length: 11 }, (_, i) => 2015 + i).map(y => `<option value="${y}">${y}</option>`).join('');
  document.getElementById('yearFrom').innerHTML = opts;
  document.getElementById('yearTo').innerHTML = opts;
  document.getElementById('yearFrom').addEventListener('change', e => { state.year_from = e.target.value; if (currentCity) doSearch(); });
  document.getElementById('yearTo').addEventListener('change', e => { state.year_to = e.target.value; if (currentCity) doSearch(); });
}
function renderCityGrid() {
  document.getElementById('cityGrid').innerHTML =
    STATIC_CITIES.map(c => `<button class="city-pill" onclick="quickSearch('${c.slug}','${c.display}')"><i class="fas fa-city" style="font-size:0.7rem;opacity:0.5"></i>${c.display}</button>`).join('');
}
function setupInput() {
  const inp = document.getElementById('cityInput');
  const list = document.getElementById('autocompleteList');
  inp.addEventListener('input', () => {
    const q = inp.value.trim().toLowerCase();
    if (!q) { list.classList.remove('open'); return; }
    const m = STATIC_CITIES.filter(c => c.display.toLowerCase().includes(q) || c.slug.includes(q));
    if (!m.length) { list.classList.remove('open'); return; }
    list.innerHTML = m.slice(0, 7).map(c => `<div class="autocomplete-item" onclick="quickSearch('${c.slug}','${c.display}')"><i class="fas fa-map-marker-alt" style="color:var(--accent-light);font-size:0.75rem"></i>${c.display}</div>`).join('');
    list.classList.add('open');
  });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { list.classList.remove('open'); doSearch(); } if (e.key === 'Escape') list.classList.remove('open'); });
  document.addEventListener('click', e => { if (!e.target.closest('.search-input-wrap')) list.classList.remove('open'); });
}
function quickSearch(slug, display) {
  document.getElementById('cityInput').value = display;
  document.getElementById('autocompleteList').classList.remove('open');
  currentCity = slug; doSearch();
}
function setFilter(name, val, btn) {
  state[name] = val;
  document.querySelectorAll(`[data-filter="${name}"]`).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (currentCity) doSearch();
}
function doSearch() {
  const inp = document.getElementById('cityInput').value.trim();
  if (!inp && !currentCity) { showToast('Enter city name!', 'error'); return; }
  if (!currentCity) {
    const m = STATIC_CITIES.find(c => c.display.toLowerCase() === inp.toLowerCase() || c.slug === inp.toLowerCase())
      || STATIC_CITIES.find(c => c.display.toLowerCase().includes(inp.toLowerCase()) || c.slug.includes(inp.toLowerCase()));
    if (m) { currentCity = m.slug; document.getElementById('cityInput').value = m.display; }
    else { currentCity = inp.toLowerCase().replace(/\s+/g, '-'); }
  }
  showLoading(inp || currentCity);
  setTimeout(() => {
    try {
      const priceData = StaticApi.getPrices(currentCity, { market: state.market || undefined, price_type: state.price_type || undefined, year_from: state.year_from || undefined, year_to: state.year_to || undefined });
      const summary = StaticApi.getSummary(currentCity, state.market || 'secondary', state.price_type || 'transaction');
      currentRecords = priceData.records; currentSummary = summary;
      renderResults(priceData.records, summary, inp || currentCity);
      showToast(`Loaded ${priceData.records.length} records`, 'success');
    } catch (e) {
      if (e.notFound) showError('No data for this city', e.message);
      else showError('Error', 'Unexpected error: ' + e.message);
    }
  }, 300);
}
function renderResults(records, summary, cityDisplay) {
  setState('results');
  const city = summary ? summary.city_display : cityDisplay;
  document.getElementById('resultsCityLabel').textContent = `📍 ${city} — ${records.length} records`;
  renderStats(summary);
  document.getElementById('chartTitle').textContent = `Price trend – ${city}`;
  document.getElementById('chartSubtitle').textContent = `${state.market === 'primary' ? 'Primary market' : state.market === 'secondary' ? 'Secondary market' : 'Both markets'} · PLN/m²`;
  renderChart(records, city);
  renderTable(records);
  document.getElementById('tableSubtitle').textContent = `${records.length} records · PLN/m²`;
  setTimeout(() => {
    ['statsGrid', 'chartSection', 'tableSection'].forEach(id => document.getElementById(id).classList.add('visible'));
  }, 50);
}
function renderStats(s) {
  if (!s) { ['statLatest', 'statYoy', 'statMin', 'statMax'].forEach(id => { document.getElementById(id).textContent = '–'; }); return; }
  document.getElementById('statLatest').textContent = `${fmtPLN(s.latest_price)} PLN`;
  document.getElementById('statLatestPeriod').textContent = `${s.latest_year} Q${s.latest_quarter} · ${s.market === 'primary' ? 'primary' : 'secondary'}`;
  const yoy = s.price_change_yoy;
  document.getElementById('statYoy').textContent = yoy != null ? `${yoy > 0 ? '+' : ''}${yoy}%` : '–';
  const badgeEl = document.getElementById('statYoyBadge');
  if (yoy != null) { const cls = yoy > 0 ? 'up' : yoy < 0 ? 'down' : 'flat'; badgeEl.innerHTML = `<span class="stat-badge ${cls}">${yoy > 0 ? '▲' : '▼'} ${yoy > 0 ? 'increase' : 'decrease'} YoY</span>`; }
  else badgeEl.innerHTML = '';
  document.getElementById('statMin').textContent = `${fmtPLN(s.min_price)} PLN`;
  document.getElementById('statMax').textContent = `${fmtPLN(s.max_price)} PLN`;
}
function renderTable(records) {
  const withChange = records.map((r, i) => {
    const prev = records.slice(0, i).reverse().find(p => p.market === r.market && p.price_type === r.price_type && ((r.year === p.year && r.quarter === p.quarter + 1) || (r.year === p.year + 1 && r.quarter === 1 && p.quarter === 4)));
    const chg = prev ? ((r.price_per_sqm - prev.price_per_sqm) / prev.price_per_sqm * 100) : null;
    return { ...r, qoq: chg };
  });
  document.getElementById('tableBody').innerHTML = [...withChange].reverse().map(r => {
    const chgHtml = r.qoq != null ? `<span style="color:${r.qoq >= 0 ? 'var(--success)' : 'var(--danger)'};font-weight:600">${r.qoq >= 0 ? '▲' : '▼'} ${Math.abs(r.qoq).toFixed(1)}%</span>` : `<span style="color:var(--text-muted)">–</span>`;
    return `<tr><td>${r.year}</td><td>Q${r.quarter}</td><td><span class="badge-market ${r.market}">${r.market === 'primary' ? 'Primary' : 'Secondary'}</span></td><td><span class="badge-market badge-type ${r.price_type}">${r.price_type === 'offer' ? 'Offer' : 'Transaction'}</span></td><td class="mono">${fmtPLN(r.price_per_sqm)}</td><td>${chgHtml}</td></tr>`;
  }).join('');
}
function fmtPLN(v) { if (v == null) return '–'; return Math.round(v).toLocaleString('pl-PL'); }
function setState(s) {
  ['initialState', 'loadingState', 'errorState', 'resultsState'].forEach(id => {
    const el = document.getElementById(id); if (el) el.style.display = 'none';
    if (el) el instanceof HTMLElement && ['statsGrid', 'chartSection', 'tableSection'].includes(id) && el.classList.remove('visible');
  });
  document.getElementById({ initial: 'initialState', loading: 'loadingState', error: 'errorState', results: 'resultsState' }[s]).style.display = 'block';
  if (s === 'results') ['statsGrid', 'chartSection', 'tableSection'].forEach(id => document.getElementById(id).classList.remove('visible'));
}
function showLoading(c) { setState('loading'); document.getElementById('loadingCity').textContent = `Analyzing data for: ${c}`; }
function showError(t, m) { setState('error'); document.getElementById('errorTitle').textContent = t; document.getElementById('errorMsg').textContent = m; }
let _tt = null;
function showToast(msg, type = 'info') {
  const el = document.getElementById('toast');
  el.className = `${type} show`; el.innerHTML = `<span>${{ success: '✓', error: '✕', info: 'ℹ' }[type] || 'ℹ'}</span> ${msg}`;
  if (_tt) clearTimeout(_tt); _tt = setTimeout(() => el.classList.remove('show'), 3200);
}
