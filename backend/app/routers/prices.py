"""
API router for price data endpoints.
"""

from __future__ import annotations

from typing import Optional
from fastapi import APIRouter, HTTPException, Query, Request

router = APIRouter(prefix="/api/prices", tags=["prices"])


@router.get("/", summary="Get historical price records for a city")
async def get_prices(
    request: Request,
    city: str = Query(..., description="City slug, e.g. 'warszawa' or 'krakow'"),
    market: Optional[str] = Query(None, description="'primary' or 'secondary'"),
    price_type: Optional[str] = Query(None, description="'offer' or 'transaction'"),
    year_from: Optional[int] = Query(None, description="Start year, e.g. 2018"),
    year_to: Optional[int] = Query(None, description="End year, e.g. 2024"),
):
    """
    Returns quarterly price records for a given city.

    Optionally filter by market type (primary/secondary),
    price type (offer/transaction), and year range.
    """
    parser = request.app.state.parser

    # Validate market and price_type
    if market and market not in ("primary", "secondary"):
        raise HTTPException(status_code=400, detail="market must be 'primary' or 'secondary'")
    if price_type and price_type not in ("offer", "transaction"):
        raise HTTPException(status_code=400, detail="price_type must be 'offer' or 'transaction'")

    records = parser.get_prices(
        city=city,
        market=market,
        price_type=price_type,
        year_from=year_from,
        year_to=year_to,
    )

    if not records:
        raise HTTPException(
            status_code=404,
            detail=f"No data found for city='{city}' with given filters. "
                   f"Try: /api/cities to see available cities.",
        )

    return {
        "city": city,
        "filters": {
            "market": market,
            "price_type": price_type,
            "year_from": year_from,
            "year_to": year_to,
        },
        "count": len(records),
        "records": [r.model_dump() for r in records],
    }


@router.get("/summary", summary="Get price summary / statistics for a city")
async def get_price_summary(
    request: Request,
    city: str = Query(..., description="City slug"),
    market: str = Query("secondary", description="'primary' or 'secondary'"),
    price_type: str = Query("transaction", description="'offer' or 'transaction'"),
):
    """
    Returns summary statistics: latest price, year-over-year change, min/max.
    """
    parser = request.app.state.parser
    summary = parser.compute_summary(city=city, market=market, price_type=price_type)

    if not summary:
        raise HTTPException(
            status_code=404,
            detail=f"No data found for city='{city}'. Try /api/cities for valid cities.",
        )

    return summary


@router.get("/compare", summary="Compare prices between two cities")
async def compare_cities(
    request: Request,
    city_a: str = Query(..., description="First city slug"),
    city_b: str = Query(..., description="Second city slug"),
    market: str = Query("secondary", description="'primary' or 'secondary'"),
    price_type: str = Query("transaction", description="'offer' or 'transaction'"),
):
    """Compare latest prices between two cities."""
    parser = request.app.state.parser
    summary_a = parser.compute_summary(city=city_a, market=market, price_type=price_type)
    summary_b = parser.compute_summary(city=city_b, market=market, price_type=price_type)

    if not summary_a:
        raise HTTPException(status_code=404, detail=f"No data for city '{city_a}'")
    if not summary_b:
        raise HTTPException(status_code=404, detail=f"No data for city '{city_b}'")

    diff = None
    if summary_a.get("latest_price") and summary_b.get("latest_price"):
        diff = round(summary_a["latest_price"] - summary_b["latest_price"], 2)
        diff_pct = round((diff / summary_b["latest_price"]) * 100, 2)
    else:
        diff_pct = None

    return {
        "city_a": summary_a,
        "city_b": summary_b,
        "difference_pln": diff,
        "difference_pct": diff_pct,
    }
