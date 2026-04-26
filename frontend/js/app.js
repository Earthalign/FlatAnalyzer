/**
 * FlatAnalyzer – Main Application Logic
 * Handles search, filters, rendering of stats/table/compare.
 */

/* ============================================================
   STATE
============================================================ */
const state = {
  cities: [],
  currentCity: null,
  currentRecords: [],
  currentSummary: null,
  filters: {
    market: 'secondary',
    price_type: '',
    year_from: '',
    year_to: '',
  },
};

/* ============================================================
   BOOT
============================================================ */
document.addEventListener('DOMContentLoaded', async () => {
  populateYearSelects();
  await loadCities();
  setupInputListeners();
});

async function loadCities() {
  try {
    state.cities = await Api.getCities();
    renderCityGrid();
    populateCompareSelects();
  } catch (e) {
    console.warn('Could not load cities:', e.message);
  }
}

function populateYearSelects() {
  const years = [];
  for (let y = 2015; y <= 2025; y++) years.push(y);

  const fromEl = document.getElementById('yearFrom');
  const toEl   = document.getElementById('yearTo');
  fromEl.innerHTML = `<option value="">All</option>` +
    years.map(y => `<option value="${y}">${y}</option>`).join('');
  toEl.innerHTML   = `<option value="">All</option>` +
    years.map(y => `<option value="${y}">${y}</option>`).join('');

  fromEl.addEventListener('change', () => { state.filters.year_from = fromEl.value; if (state.currentCity) doSearch(); });
  toEl.addEventListener('change',   () => { state.filters.year_to   = toEl.value;   if (state.currentCity) doSearch(); });
}

function renderCityGrid() {
  const grid = document.getElementById('cityGrid');
  if (!grid || !state.cities.length) return;

  grid.innerHTML = state.cities.map(c => `
    <button class="city-pill" onclick="searchCity('${c.slug}', '${c.display}')">
      <i class="fas fa-city" style="font-size:0.75rem; opacity:0.6"></i>
      ${c.display}
    </button>
  `).join('');
}

function populateCompareSelects() {
  const sel1 = document.getElementById('compareCity1');
  const sel2 = document.getElementById('compareCity2');
  if (!sel1 || !sel2) return;

  const opts = state.cities.map(c => `<option value="${c.slug}">${c.display}</option>`).join('');
  sel1.innerHTML = opts;
  sel2.innerHTML = opts;
  // Default: first vs second
  if (state.cities.length >= 2) sel2.selectedIndex = 1;
}

/* ============================================================
   INPUT / AUTOCOMPLETE
============================================================ */
function setupInputListeners() {
  const input = document.getElementById('cityInput');
  const list  = document.getElementById('autocompleteList');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { list.classList.remove('open'); return; }

    const matches = state.cities.filter(c =>
      c.display.toLowerCase().includes(q) || c.slug.includes(q)
    );

    if (!matches.length) { list.classList.remove('open'); return; }

    list.innerHTML = matches.slice(0, 8).map(c => `
      <div class="autocomplete-item" onclick="selectCity('${c.slug}', '${c.display}')">
        <i class="fas fa-map-marker-alt city-icon"></i>
        ${c.display}
      </div>
    `).join('');
    list.classList.add('open');
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { list.classList.remove('open'); doSearch(); }
    if (e.key === 'Escape') list.classList.remove('open');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#searchPanel')) list.classList.remove('open');
  });
}

function selectCity(slug, display) {
  document.getElementById('cityInput').value = display;
  document.getElementById('autocompleteList').classList.remove('open');
  state.currentCity = slug;
  doSearch();
}

function searchCity(slug, display) {
  document.getElementById('cityInput').value = display;
  state.currentCity = slug;
  doSearch();
}

/* ============================================================
   FILTERS
============================================================ */
function setFilter(filterName, value, btn) {
  state.filters[filterName] = value;

  // Update button active state
  document.querySelectorAll(`[data-filter="${filterName}"]`).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  if (state.currentCity) doSearch();
}

/* ============================================================
   SEARCH
============================================================ */
async function doSearch() {
  const input = document.getElementById('cityInput').value.trim();
  if (!input) { showToast('Enter city name!', 'error'); return; }

  // Try to resolve the city slug from the input
  let citySlug = state.currentCity;
  if (!citySlug) {
    const match = state.cities.find(c =>
      c.display.toLowerCase() === input.toLowerCase() ||
      c.slug === input.toLowerCase()
    );
    if (match) {
      citySlug = match.slug;
    } else {
      // Partial match fallback
      const partial = state.cities.find(c =>
        c.display.toLowerCase().includes(input.toLowerCase()) ||
        c.slug.includes(input.toLowerCase())
      );
      if (partial) {
        citySlug = partial.slug;
        document.getElementById('cityInput').value = partial.display;
      } else {
        citySlug = input.toLowerCase().replace(/\s+/g, '-');
      }
    }
  }
  state.currentCity = citySlug;

  showLoading(input);

  try {
    const [priceData, summary] = await Promise.all([
      Api.getPrices(citySlug, {
        market:     state.filters.market     || undefined,
        price_type: state.filters.price_type || undefined,
        year_from:  state.filters.year_from  || undefined,
        year_to:    state.filters.year_to    || undefined,
      }),
      Api.getSummary(citySlug, state.filters.market || 'secondary', state.filters.price_type || 'transaction'),
    ]);

    state.currentRecords = priceData.records;
    state.currentSummary = summary;

    renderResults(priceData.records, summary, input);
    showToast(`Loaded dane: ${priceData.records.length} records`, 'success');
  } catch (e) {
    if (e instanceof NotFoundError) {
      showError('No data for this city', e.message);
    } else {
      showError('Connection Error', `${e.message}. Check if the server is running.`);
    }
  }
}

/* ============================================================
   RENDER RESULTS
============================================================ */
function renderResults(records, summary, cityDisplay) {
  showState('results');

  // Section label
  const city = summary ? summary.city_display : cityDisplay;
  document.getElementById('resultsCityLabel').textContent =
    `📍 ${city} — ${records.length} records kwartalnych`;

  // Stats
  renderStats(summary);

  // Chart
  renderChart(records, city);

  // Table
  renderTable(records);

  // Animate in
  setTimeout(() => {
    document.getElementById('statsGrid').classList.add('visible');
    document.getElementById('chartSection').classList.add('visible');
    document.getElementById('tableSection').classList.add('visible');
    document.getElementById('compareSection').classList.add('visible');
  }, 50);
}

function renderStats(summary) {
  if (!summary) {
    ['statLatest', 'statYoy', 'statMin', 'statMax'].forEach(id => {
      document.getElementById(id).textContent = '–';
    });
    return;
  }

  document.getElementById('statLatest').textContent =
    `${formatPLN(summary.latest_price)} PLN`;
  document.getElementById('statLatestPeriod').textContent =
    `${summary.latest_year} Q${summary.latest_quarter} · ${summary.market === 'primary' ? 'primary' : 'secondary'}`;

  const yoy = summary.price_change_yoy;
  document.getElementById('statYoy').textContent = yoy != null ? `${yoy > 0 ? '+' : ''}${yoy}%` : '–';

  const badgeEl = document.getElementById('statYoyBadge');
  if (yoy != null) {
    const cls   = yoy > 0 ? 'up' : yoy < 0 ? 'down' : 'flat';
    const icon  = yoy > 0 ? '▲' : yoy < 0 ? '▼' : '→';
    const label = yoy > 0 ? 'YoY increase' : yoy < 0 ? 'YoY decrease' : 'no change';
    badgeEl.innerHTML = `<span class="stat-badge ${cls}">${icon} ${label}</span>`;
  } else {
    badgeEl.innerHTML = '';
  }

  document.getElementById('statMin').textContent = `${formatPLN(summary.min_price)} PLN`;
  document.getElementById('statMax').textContent = `${formatPLN(summary.max_price)} PLN`;
}

function renderChart(records, cityDisplay) {
  if (!records.length) return;

  const mFilter = state.filters.market;
  const ptFilter = state.filters.price_type;

  const mLabel  = mFilter  === 'primary' ? 'primary market' : mFilter === 'secondary' ? 'secondary market' : 'both markets';
  const ptLabel = ptFilter === 'offer' ? 'ceny ofertowe' : 'ceny transakcyjne';

  document.getElementById('chartTitle').textContent    = `Price trend – ${cityDisplay}`;
  document.getElementById('chartSubtitle').textContent = `${mLabel} · ${ptLabel} · PLN/m²`;

  Charts.render(records, _currentChartType || 'line');
}

function renderTable(records) {
  const tbody = document.getElementById('tableBody');
  const sub   = document.getElementById('tableSubtitle');
  sub.textContent = `${records.length} records kwartalnych · PLN/m²`;

  if (!records.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:30px">Brak danych</td></tr>`;
    return;
  }

  // Calculate q/q change
  const withChange = records.map((r, i) => {
    const prev = records.slice(0, i).reverse().find(
      p => p.market === r.market && p.price_type === r.price_type && (
        (r.year === p.year && r.quarter === p.quarter + 1) ||
        (r.year === p.year + 1 && r.quarter === 1 && p.quarter === 4)
      )
    );
    const change = prev ? ((r.price_per_sqm - prev.price_per_sqm) / prev.price_per_sqm * 100) : null;
    return { ...r, qoq: change };
  });

  tbody.innerHTML = withChange.map(r => {
    const changeHtml = r.qoq != null
      ? `<span style="color:${r.qoq >= 0 ? 'var(--success)' : 'var(--danger)'}; font-weight:600">
           ${r.qoq >= 0 ? '▲' : '▼'} ${Math.abs(r.qoq).toFixed(1)}%
         </span>`
      : `<span style="color:var(--text-muted)">–</span>`;

    return `
      <tr>
        <td>${r.year}</td>
        <td>Q${r.quarter}</td>
        <td><span class="badge-market ${r.market}">${r.market === 'primary' ? 'Primary' : 'Secondary'}</span></td>
        <td><span class="badge-market badge-type ${r.price_type}">${r.price_type === 'offer' ? 'Offer' : 'Transaction'}</span></td>
        <td class="mono">${formatPLN(r.price_per_sqm)}</td>
        <td>${changeHtml}</td>
      </tr>
    `;
  }).reverse().join('');  // newest first
}

/* ============================================================
   COMPARE
============================================================ */
async function doCompare() {
  const cityA = document.getElementById('compareCity1').value;
  const cityB = document.getElementById('compareCity2').value;

  if (cityA === cityB) {
    showToast('Select two different cities!', 'error');
    return;
  }

  const resultEl = document.getElementById('compareResult');
  resultEl.innerHTML = '<div class="spinner" style="margin:20px auto"></div>';
  resultEl.style.display = 'block';

  try {
    const data = await Api.compare(
      cityA, cityB,
      state.filters.market || 'secondary',
      state.filters.price_type || 'transaction',
    );

    const diff     = data.difference_pln;
    const diffPct  = data.difference_pct;
    const diffSign = diff > 0 ? 'pos' : 'neg';
    const diffIcon = diff > 0 ? '▲' : '▼';

    const cityADisplay = state.cities.find(c => c.slug === cityA)?.display || cityA;
    const cityBDisplay = state.cities.find(c => c.slug === cityB)?.display || cityB;

    resultEl.innerHTML = `
      <div class="compare-result">
        <div class="compare-city-card">
          <div class="compare-city-name">${data.city_a.city_display}</div>
          <div class="compare-city-price">${formatPLN(data.city_a.latest_price)} <span style="font-size:1rem;font-weight:500">PLN/m²</span></div>
          <div class="compare-city-sub">${data.city_a.latest_year} Q${data.city_a.latest_quarter}</div>
          ${data.city_a.price_change_yoy != null ? `
            <div class="stat-badge ${data.city_a.price_change_yoy >= 0 ? 'up' : 'down'}" style="margin-top:8px; display:inline-flex">
              ${data.city_a.price_change_yoy >= 0 ? '▲' : '▼'} ${Math.abs(data.city_a.price_change_yoy)}% r/r
            </div>` : ''}
        </div>
        <div class="compare-diff">
          <div class="compare-diff-icon">⇄</div>
          <div class="compare-diff-value ${diffSign}">
            ${diff != null ? `${diffIcon} ${formatPLN(Math.abs(diff))} PLN` : '–'}
          </div>
          <div style="font-size:0.75rem; color:var(--text-muted)">
            ${diffPct != null ? `${Math.abs(diffPct).toFixed(1)}%` : ''}
          </div>
        </div>
        <div class="compare-city-card">
          <div class="compare-city-name">${data.city_b.city_display}</div>
          <div class="compare-city-price">${formatPLN(data.city_b.latest_price)} <span style="font-size:1rem;font-weight:500">PLN/m²</span></div>
          <div class="compare-city-sub">${data.city_b.latest_year} Q${data.city_b.latest_quarter}</div>
          ${data.city_b.price_change_yoy != null ? `
            <div class="stat-badge ${data.city_b.price_change_yoy >= 0 ? 'up' : 'down'}" style="margin-top:8px; display:inline-flex">
              ${data.city_b.price_change_yoy >= 0 ? '▲' : '▼'} ${Math.abs(data.city_b.price_change_yoy)}% r/r
            </div>` : ''}
        </div>
      </div>
    `;
  } catch (e) {
    resultEl.innerHTML = `<p style="color:var(--danger);text-align:center;padding:16px">${e.message}</p>`;
  }
}

/* ============================================================
   CHART TYPE SWITCH
============================================================ */
let _currentChartType = 'line';
function switchChartType(type, btn) {
  _currentChartType = type;
  document.querySelectorAll('.chart-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  Charts.switchType(type);
}

/* ============================================================
   UI STATE HELPERS
============================================================ */
function showState(state) {
  ['initialState', 'loadingState', 'errorState', 'resultsState'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const target = {
    initial:  'initialState',
    loading:  'loadingState',
    error:    'errorState',
    results:  'resultsState',
  }[state];
  if (target) document.getElementById(target).style.display = 'block';

  // Reset visibility animations for results
  if (state === 'results') {
    ['statsGrid','chartSection','tableSection','compareSection'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('visible');
    });
  }
}

function showLoading(city) {
  showState('loading');
  document.getElementById('loadingCity').textContent = `Analyzing data for: ${city}`;
  document.getElementById('searchBtn').disabled = true;
}

function showError(title, msg) {
  showState('error');
  document.getElementById('errorTitle').textContent = title;
  document.getElementById('errorMsg').textContent   = msg;
  document.getElementById('searchBtn').disabled = false;
}

function showResults() {
  showState('results');
  document.getElementById('searchBtn').disabled = false;
}

function renderResults(records, summary, cityDisplay) {
  showState('results');
  document.getElementById('searchBtn').disabled = false;

  const city = summary ? summary.city_display : cityDisplay;
  document.getElementById('resultsCityLabel').textContent =
    `📍 ${city} — ${records.length} records kwartalnych`;

  renderStats(summary);
  renderChart(records, city);
  renderTable(records);

  setTimeout(() => {
    document.getElementById('statsGrid').classList.add('visible');
    document.getElementById('chartSection').classList.add('visible');
    document.getElementById('tableSection').classList.add('visible');
    document.getElementById('compareSection').classList.add('visible');
  }, 50);
}

/* ============================================================
   TOAST
============================================================ */
let _toastTimer = null;
function showToast(msg, type = 'info') {
  const el = document.getElementById('toast');
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  el.className = `${type} show`;
  el.innerHTML = `<span>${icons[type] || '✓'}</span> ${msg}`;
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 3500);
}
