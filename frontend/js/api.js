/**
 * FlatAnalyzer – API Client
 * Handles all communication with the FastAPI backend.
 */

const BASE_URL = 'https://flatanalyzer.onrender.com';

const Api = {
  /**
   * Fetch all available cities.
   */
  async getCities() {
    // Usunięto końcowy slash, aby pasował do standardu FastAPI routera
    const res = await fetch(`${BASE_URL}/api/cities`);
    if (!res.ok) throw new Error(`Cities fetch failed: ${res.status}`);
    const data = await res.json();
    return data.cities || [];
  },

  /**
   * Get price records for a city with optional filters.
   */
  async getPrices(city, opts = {}) {
    const params = new URLSearchParams({ city });
    if (opts.market) params.set('market', opts.market);
    if (opts.price_type) params.set('price_type', opts.price_type);
    if (opts.year_from) params.set('year_from', opts.year_from);
    if (opts.year_to) params.set('year_to', opts.year_to);

    const res = await fetch(`${BASE_URL}/api/prices?${params}`);
    if (res.status === 404) {
      const err = await res.json();
      throw new NotFoundError(err.detail || 'Nie znaleziono danych dla tego miasta.');
    }
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || `API Error: ${res.status}`);
    }
    return res.json();
  },

  /**
   * Get summary statistics for a city.
   */
  async getSummary(city, market = 'secondary', priceType = 'transaction') {
    const params = new URLSearchParams({ city, market, price_type: priceType });
    const res = await fetch(`${BASE_URL}/api/prices/summary?${params}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Summary fetch failed: ${res.status}`);
    return res.json();
  },

  /**
   * Compare prices between two cities.
   */
  async compare(cityA, cityB, market = 'secondary', priceType = 'transaction') {
    const params = new URLSearchParams({ city_a: cityA, city_b: cityB, market, price_type: priceType });
    const res = await fetch(`${BASE_URL}/api/prices/compare?${params}`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || `Compare failed: ${res.status}`);
    }
    return res.json();
  },
};

/** Custom error for 404 (city not found) */
class NotFoundError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'NotFoundError';
  }
}