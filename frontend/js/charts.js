/**
 * FlatAnalyzer – Chart Manager
 * Handles all Chart.js visualizations.
 */

const Charts = (() => {
  let _instance = null;
  let _currentType = 'line';

  const COLORS = {
    primary:         'rgba(99, 102, 241, 1)',
    primaryFill:     'rgba(99, 102, 241, 0.12)',
    secondary:       'rgba(34, 211, 238, 1)',
    secondaryFill:   'rgba(34, 211, 238, 0.08)',
    offer:           'rgba(245, 158, 11, 1)',
    offerFill:       'rgba(245, 158, 11, 0.08)',
    transaction:     'rgba(16, 185, 129, 1)',
    transactionFill: 'rgba(16, 185, 129, 0.08)',
  };

  const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        borderColor: 'rgba(99,102,241,0.3)',
        borderWidth: 1,
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => {
            const val = ctx.parsed.y;
            return `  ${ctx.dataset.label}: ${formatPLN(val)} PLN/m²`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
        ticks: { color: '#4b5563', font: { size: 11, family: 'Inter' } },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
        ticks: {
          color: '#4b5563',
          font: { size: 11, family: 'JetBrains Mono' },
          callback: (v) => formatPLN(v),
        },
      },
    },
    elements: {
      point: { radius: 3, hoverRadius: 6, borderWidth: 2 },
      line: { tension: 0.35, borderWidth: 2.5 },
    },
  };

  /**
   * Build datasets from records, grouped by market+price_type.
   */
  function buildDatasets(records) {
    const groups = {};
    records.forEach((r) => {
      const key = `${r.market}__${r.price_type}`;
      if (!groups[key]) groups[key] = { market: r.market, type: r.price_type, points: {} };
      const label = `${r.year} Q${r.quarter}`;
      groups[key].points[label] = r.price_per_sqm;
    });

    // Collect all unique period labels sorted
    const allPeriods = [...new Set(
      records.map((r) => `${r.year} Q${r.quarter}`)
    )].sort((a, b) => {
      const [ya, qa] = a.split(' Q').map(Number);
      const [yb, qb] = b.split(' Q').map(Number);
      return ya !== yb ? ya - yb : qa - qb;
    });

    const datasets = Object.values(groups).map((g) => {
      const colorKey = g.type === 'offer' ? 'offer' : g.market === 'primary' ? 'primary' : 'secondary';
      const labelParts = [
        g.market === 'primary' ? 'Primary' : 'Secondary',
        g.type === 'offer' ? 'offer' : 'transaction',
      ];
      return {
        label: labelParts.join(' · '),
        data: allPeriods.map((p) => g.points[p] ?? null),
        borderColor: COLORS[colorKey],
        backgroundColor: COLORS[colorKey + 'Fill'],
        fill: _currentType === 'line',
        spanGaps: true,
        borderRadius: 4,
      };
    });

    return { labels: allPeriods, datasets };
  }

  /** Render or update the chart. */
  function render(records, type = 'line') {
    _currentType = type;
    const ctx = document.getElementById('priceChart').getContext('2d');
    const { labels, datasets } = buildDatasets(records);

    if (_instance) {
      _instance.destroy();
      _instance = null;
    }

    _instance = new Chart(ctx, {
      type,
      data: { labels, datasets },
      options: {
        ...chartDefaults,
        elements: {
          ...chartDefaults.elements,
          line: { ...chartDefaults.elements.line, fill: type === 'line' },
        },
      },
    });

    // Update legend
    const legendEl = document.getElementById('chartLegend');
    const legColors = [
      COLORS.primary, COLORS.secondary, COLORS.offer, COLORS.transaction
    ];
    legendEl.innerHTML = datasets.map((ds, i) => `
      <div class="legend-item">
        <div class="legend-dot" style="background:${ds.borderColor}"></div>
        ${ds.label}
      </div>
    `).join('');
  }

  function switchType(type) {
    if (!_instance) return;
    const labels = _instance.data.labels;
    const datasets = _instance.data.datasets.map((ds) => ({
      ...ds,
      fill: type === 'line',
    }));
    _instance.destroy();
    _currentType = type;
    const ctx = document.getElementById('priceChart').getContext('2d');
    _instance = new Chart(ctx, {
      type,
      data: { labels, datasets },
      options: {
        ...chartDefaults,
        elements: {
          ...chartDefaults.elements,
          line: { ...chartDefaults.elements.line, fill: type === 'line' },
        },
      },
    });
  }

  return { render, switchType };
})();

/** Format as PLN integer. */
function formatPLN(val) {
  if (val == null) return '–';
  return Math.round(val).toLocaleString('pl-PL');
}
