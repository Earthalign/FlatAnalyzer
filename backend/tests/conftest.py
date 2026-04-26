"""
Pytest configuration and shared fixtures for FlatAnalyzer tests.
"""

from __future__ import annotations

import json
import pytest
from pathlib import Path
from fastapi.testclient import TestClient

from app.main import create_app
from app.services.data_parser import DataParser


SAMPLE_RECORDS = [
    {
        "city": "warszawa",
        "city_display": "Warszawa",
        "year": 2022,
        "quarter": 1,
        "market": "secondary",
        "price_type": "transaction",
        "price_per_sqm": 11800.0,
    },
    {
        "city": "warszawa",
        "city_display": "Warszawa",
        "year": 2023,
        "quarter": 1,
        "market": "secondary",
        "price_type": "transaction",
        "price_per_sqm": 12700.0,
    },
    {
        "city": "warszawa",
        "city_display": "Warszawa",
        "year": 2023,
        "quarter": 1,
        "market": "primary",
        "price_type": "offer",
        "price_per_sqm": 13100.0,
    },
    {
        "city": "krakow",
        "city_display": "Kraków",
        "year": 2023,
        "quarter": 1,
        "market": "secondary",
        "price_type": "transaction",
        "price_per_sqm": 11900.0,
    },
    {
        "city": "krakow",
        "city_display": "Kraków",
        "year": 2024,
        "quarter": 1,
        "market": "secondary",
        "price_type": "transaction",
        "price_per_sqm": 13900.0,
    },
]


@pytest.fixture
def sample_dataset_path(tmp_path: Path) -> Path:
    """Create a temporary JSON dataset file for testing."""
    data = {"metadata": {"source": "test"}, "records": SAMPLE_RECORDS}
    path = tmp_path / "test_dataset.json"
    path.write_text(json.dumps(data), encoding="utf-8")
    return path


@pytest.fixture
def parser(sample_dataset_path: Path) -> DataParser:
    """A DataParser loaded with sample test records."""
    p = DataParser(dataset_path=sample_dataset_path)
    p.load()
    return p


@pytest.fixture
def client(sample_dataset_path: Path) -> TestClient:
    """FastAPI TestClient with the app using the test dataset."""
    app = create_app()
    # Override the dataset path for tests
    app.state.parser = DataParser(dataset_path=sample_dataset_path)
    app.state.parser.load()

    # Provide a minimal cache stub to avoid DB init
    class _FakeCache:
        async def initialize(self): pass
        async def get(self, **_): return None
        async def set(self, payload, **_): pass

    app.state.cache = _FakeCache()
    return TestClient(app, raise_server_exceptions=True)
