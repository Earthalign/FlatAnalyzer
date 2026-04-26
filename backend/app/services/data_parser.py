"""
Data parser service for FlatAnalyzer.
Handles loading and parsing of NBP price data from the local JSON dataset.
"""

from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Optional

from app.models.price_record import Market, PriceRecord, PriceType

logger = logging.getLogger(__name__)


class DataParser:
    """
    Parses raw NBP data (from JSON dataset) into PriceRecord objects.
    Supports filtering by city, market, price_type, year range.
    """

    def __init__(self, dataset_path: Path) -> None:
        self._path = dataset_path
        self._records: list[PriceRecord] = []
        self._loaded = False

    def load(self) -> None:
        """Load and parse the JSON dataset into memory."""
        if self._loaded:
            return
        if not self._path.exists():
            logger.warning("Dataset not found at %s", self._path)
            self._records = []
            self._loaded = True
            return

        with self._path.open("r", encoding="utf-8") as f:
            raw = json.load(f)

        self._records = [self._parse_record(r) for r in raw.get("records", [])]
        logger.info("Loaded %d price records from %s", len(self._records), self._path)
        self._loaded = True

    def _parse_record(self, raw: dict) -> PriceRecord:
        """Parse a single raw dict into a PriceRecord."""
        return PriceRecord(
            city=raw["city"],
            city_display=raw["city_display"],
            year=int(raw["year"]),
            quarter=int(raw["quarter"]),
            market=Market(raw["market"]),
            price_type=PriceType(raw["price_type"]),
            price_per_sqm=float(raw["price_per_sqm"]),
        )

    @property
    def records(self) -> list[PriceRecord]:
        """All loaded price records."""
        if not self._loaded:
            self.load()
        return self._records

    def get_all_cities(self) -> list[dict]:
        """Return unique cities with display names."""
        seen: dict[str, str] = {}
        for r in self.records:
            if r.city not in seen:
                seen[r.city] = r.city_display
        return [{"slug": slug, "display": display} for slug, display in sorted(seen.items())]

    def get_prices(
        self,
        city: str,
        market: Optional[str] = None,
        price_type: Optional[str] = None,
        year_from: Optional[int] = None,
        year_to: Optional[int] = None,
    ) -> list[PriceRecord]:
        """
        Filter price records by city and optional parameters.

        Args:
            city: City slug (lowercase, ASCII)
            market: 'primary' or 'secondary' (optional)
            price_type: 'offer' or 'transaction' (optional)
            year_from: Earliest year to include
            year_to: Latest year to include

        Returns:
            Sorted list of matching PriceRecord objects
        """
        if not self._loaded:
            self.load()

        results = [r for r in self._records if r.city == city.lower()]

        if market:
            results = [r for r in results if r.market == market]
        if price_type:
            results = [r for r in results if r.price_type == price_type]
        if year_from:
            results = [r for r in results if r.year >= year_from]
        if year_to:
            results = [r for r in results if r.year <= year_to]

        return sorted(results, key=lambda r: (r.year, r.quarter))

    def compute_summary(
        self,
        city: str,
        market: str = "secondary",
        price_type: str = "transaction",
    ) -> dict:
        """
        Compute summary statistics for a city.

        Returns a dict with latest price, YoY change, min/max.
        """
        records = self.get_prices(city, market=market, price_type=price_type)

        if not records:
            return {}

        prices = [r.price_per_sqm for r in records]
        latest = records[-1]

        # Year-over-year change
        current_year_records = [r for r in records if r.year == latest.year]
        prev_year_records = [r for r in records if r.year == latest.year - 1]

        yoy_change = None
        if current_year_records and prev_year_records:
            avg_current = sum(r.price_per_sqm for r in current_year_records) / len(current_year_records)
            avg_prev = sum(r.price_per_sqm for r in prev_year_records) / len(prev_year_records)
            if avg_prev > 0:
                yoy_change = round(((avg_current - avg_prev) / avg_prev) * 100, 2)

        return {
            "city": city,
            "city_display": latest.city_display,
            "market": market,
            "price_type": price_type,
            "latest_price": latest.price_per_sqm,
            "latest_year": latest.year,
            "latest_quarter": latest.quarter,
            "min_price": min(prices),
            "max_price": max(prices),
            "price_change_yoy": yoy_change,
            "records_count": len(records),
            "available_years": sorted(set(r.year for r in records)),
        }
