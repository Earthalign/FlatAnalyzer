"""
Integration tests for the FlatAnalyzer FastAPI endpoints.
Uses pytest + TestClient (synchronous, no async needed).
"""

from __future__ import annotations

import json
import pytest
from fastapi.testclient import TestClient
from pathlib import Path

from app.main import create_app
from app.services.data_parser import DataParser


@pytest.fixture
def app_client(sample_dataset_path: Path) -> TestClient:
    """
    Build app with test dataset, bypass the lifespan startup
    by directly setting state on the app.
    """
    app = create_app()

    class _FakeCache:
        async def initialize(self): pass
        async def get(self, **_): return None
        async def set(self, payload, **_): pass

    # Use TestClient as context manager to trigger lifespan
    # But we patch state before that since startup will override
    parser = DataParser(dataset_path=sample_dataset_path)
    parser.load()

    # We need to override parser after startup; use a workaround:
    with TestClient(app) as c:
        app.state.parser = parser  # override after lifespan
        app.state.cache = _FakeCache()
        yield c


class TestHealthEndpoint:
    def test_health_returns_200(self, app_client):
        resp = app_client.get("/api/health")
        assert resp.status_code == 200
        assert resp.json()["status"] == "ok"


class TestCitiesEndpoint:
    def test_cities_returns_list(self, app_client):
        resp = app_client.get("/api/cities/")
        assert resp.status_code == 200
        data = resp.json()
        assert "cities" in data
        assert data["count"] >= 0

    def test_cities_have_slug_and_display(self, app_client):
        resp = app_client.get("/api/cities/")
        assert resp.status_code == 200
        for city in resp.json()["cities"]:
            assert "slug" in city
            assert "display" in city


class TestPricesEndpoint:
    @pytest.mark.parametrize("city,expect_status", [
        ("warszawa",    200),
        ("krakow",      200),
        ("nieistniejace", 404),
    ])
    def test_prices_by_city(self, app_client, city, expect_status):
        resp = app_client.get(f"/api/prices/?city={city}")
        assert resp.status_code == expect_status

    def test_prices_returns_records_list(self, app_client):
        resp = app_client.get("/api/prices/?city=warszawa")
        assert resp.status_code == 200
        data = resp.json()
        assert "records" in data
        assert isinstance(data["records"], list)
        assert len(data["records"]) > 0

    def test_prices_filter_by_market(self, app_client):
        resp = app_client.get("/api/prices/?city=warszawa&market=secondary")
        assert resp.status_code == 200
        for record in resp.json()["records"]:
            assert record["market"] == "secondary"

    def test_prices_filter_by_price_type(self, app_client):
        resp = app_client.get("/api/prices/?city=warszawa&price_type=transaction")
        assert resp.status_code == 200
        for record in resp.json()["records"]:
            assert record["price_type"] == "transaction"

    @pytest.mark.parametrize("bad_market", ["wrong", "both", "123"])
    def test_prices_invalid_market_returns_400(self, app_client, bad_market):
        resp = app_client.get(f"/api/prices/?city=warszawa&market={bad_market}")
        assert resp.status_code == 400

    def test_prices_filter_by_year(self, app_client):
        resp = app_client.get("/api/prices/?city=warszawa&year_from=2023&year_to=2023")
        assert resp.status_code == 200
        for record in resp.json()["records"]:
            assert record["year"] == 2023


class TestSummaryEndpoint:
    @pytest.mark.parametrize("city,expected_status", [
        ("warszawa", 200),
        ("krakow",   200),
        ("xyz_unknown", 404),
    ])
    def test_summary_status(self, app_client, city, expected_status):
        resp = app_client.get(
            f"/api/prices/summary?city={city}&market=secondary&price_type=transaction"
        )
        assert resp.status_code == expected_status

    def test_summary_has_required_fields(self, app_client):
        resp = app_client.get(
            "/api/prices/summary?city=warszawa&market=secondary&price_type=transaction"
        )
        data = resp.json()
        for field in ["city", "latest_price", "min_price", "max_price", "records_count"]:
            assert field in data


class TestCompareEndpoint:
    def test_compare_two_cities(self, app_client):
        resp = app_client.get(
            "/api/prices/compare?city_a=warszawa&city_b=krakow&market=secondary&price_type=transaction"
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "city_a" in data
        assert "city_b" in data
        assert "difference_pln" in data

    def test_compare_unknown_city_returns_404(self, app_client):
        resp = app_client.get(
            "/api/prices/compare?city_a=warszawa&city_b=nieznanemiasto&market=secondary&price_type=transaction"
        )
        assert resp.status_code == 404
