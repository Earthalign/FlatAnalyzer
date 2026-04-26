"""
Data models for FlatAnalyzer.
Defines Pydantic models for price records and API responses.
"""

from __future__ import annotations

from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class Market(str, Enum):
    """Real estate market type."""
    PRIMARY = "primary"     # Rynek pierwotny
    SECONDARY = "secondary"  # Rynek wtórny


class PriceType(str, Enum):
    """Type of price data."""
    OFFER = "offer"           # Cena ofertowa
    TRANSACTION = "transaction"  # Cena transakcyjna


class PriceRecord(BaseModel):
    """A single quarterly price record for a city."""

    city: str = Field(..., description="City name (lowercase, ASCII)")
    city_display: str = Field(..., description="City name for display (Polish characters)")
    year: int = Field(..., ge=2000, le=2030)
    quarter: int = Field(..., ge=1, le=4)
    market: Market
    price_type: PriceType
    price_per_sqm: float = Field(..., description="Price per square meter in PLN")
    source: str = Field(default="NBP", description="Data source")

    @property
    def period_label(self) -> str:
        """Human-friendly period label e.g. '2023 Q1'."""
        return f"{self.year} Q{self.quarter}"

    class Config:
        use_enum_values = True


class PriceSummary(BaseModel):
    """Summary statistics for a city."""

    city: str
    city_display: str
    market: Market
    price_type: PriceType
    latest_price: Optional[float]
    latest_year: Optional[int]
    latest_quarter: Optional[int]
    min_price: Optional[float]
    max_price: Optional[float]
    price_change_yoy: Optional[float] = Field(
        None, description="Year-over-year price change in %"
    )
    records_count: int
    available_years: list[int]
