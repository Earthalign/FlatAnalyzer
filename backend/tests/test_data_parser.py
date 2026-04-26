"""
Unit tests for DataParser service.
Tests filtering, city lookup, and summary computation.
"""

from __future__ import annotations

import pytest
from app.services.data_parser import DataParser


class TestDataParserLoad:
    """Tests for loading and basic access."""

    def test_loads_correct_record_count(self, parser: DataParser):
        assert len(parser.records) == 5

    def test_missing_file_returns_empty(self, tmp_path):
        p = DataParser(tmp_path / "nonexistent.json")
        p.load()
        assert p.records == []

    def test_get_all_cities_returns_unique(self, parser: DataParser):
        cities = parser.get_all_cities()
        slugs = [c["slug"] for c in cities]
        assert len(slugs) == len(set(slugs))  # No duplicates
        assert "warszawa" in slugs
        assert "krakow" in slugs


class TestDataParserFiltering:
    """Tests for get_prices filtering."""

    @pytest.mark.parametrize("city,expected_count", [
        ("warszawa", 3),
        ("krakow", 2),
        ("wroclaw", 0),   # Not in sample dataset
    ])
    def test_filter_by_city(self, parser: DataParser, city, expected_count):
        result = parser.get_prices(city=city)
        assert len(result) == expected_count

    @pytest.mark.parametrize("market,price_type,city,expected_count", [
        ("secondary", "transaction", "warszawa", 2),
        ("primary",   "offer",       "warszawa", 1),
        ("primary",   "transaction", "warszawa", 0),
        ("secondary", "transaction", "krakow",   2),
    ])
    def test_filter_by_market_and_price_type(
        self, parser: DataParser, market, price_type, city, expected_count
    ):
        result = parser.get_prices(city=city, market=market, price_type=price_type)
        assert len(result) == expected_count

    def test_no_results_for_unknown_city(self, parser: DataParser):
        """Filtering by a city not in dataset returns empty list."""
        result = parser.get_prices("zakopane")
        assert result == []

    def test_results_are_sorted_by_year_quarter(self, parser: DataParser):
        result = parser.get_prices("warszawa")
        years = [(r.year, r.quarter) for r in result]
        assert years == sorted(years)

    def test_case_insensitive_city(self, parser: DataParser):
        result_lower = parser.get_prices("warszawa")
        result_upper = parser.get_prices("WARSZAWA")
        assert len(result_lower) == len(result_upper)


class TestDataParserYearFilter:
    """More precise year filter tests."""

    @pytest.mark.parametrize("city,year_from,year_to,expected", [
        ("warszawa", 2023, None,   2),   # 2023 x2
        ("warszawa", None, 2022,   1),   # 2022 x1
        ("warszawa", 2022, 2023,   3),   # 2022 x1 + 2023 x2
        ("krakow",   2024, None,   1),   # 2024 x1
        ("krakow",   2020, 2022,   0),   # none in range
    ])
    def test_year_range_parametrize(self, parser, city, year_from, year_to, expected):
        result = parser.get_prices(city, year_from=year_from, year_to=year_to)
        assert len(result) == expected


class TestDataParserSummary:
    """Tests for compute_summary."""

    def test_summary_contains_expected_keys(self, parser: DataParser):
        summary = parser.compute_summary("warszawa", market="secondary", price_type="transaction")
        required_keys = {
            "city", "city_display", "market", "price_type",
            "latest_price", "latest_year", "min_price", "max_price",
            "records_count", "available_years",
        }
        assert required_keys.issubset(summary.keys())

    def test_summary_latest_price_is_correct(self, parser: DataParser):
        summary = parser.compute_summary("warszawa", market="secondary", price_type="transaction")
        # Latest record: 2023 Q1 secondary transaction = 12700.0
        assert summary["latest_price"] == 12700.0

    def test_summary_min_max_are_correct(self, parser: DataParser):
        summary = parser.compute_summary("warszawa", market="secondary", price_type="transaction")
        assert summary["min_price"] == 11800.0
        assert summary["max_price"] == 12700.0

    def test_summary_yoy_change(self, parser: DataParser):
        # krakow: 2023=11900, 2024=13900 → (13900-11900)/11900*100 ≈ 16.81%
        summary = parser.compute_summary("krakow", market="secondary", price_type="transaction")
        assert summary["price_change_yoy"] is not None
        assert summary["price_change_yoy"] > 0

    def test_summary_unknown_city_returns_empty(self, parser: DataParser):
        summary = parser.compute_summary("nieistniejace")
        assert summary == {}

    @pytest.mark.parametrize("city", ["warszawa", "krakow"])
    def test_summary_available_years_sorted(self, parser: DataParser, city):
        summary = parser.compute_summary(city, market="secondary", price_type="transaction")
        years = summary.get("available_years", [])
        assert years == sorted(years)
