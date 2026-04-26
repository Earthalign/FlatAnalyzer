"""
API router for cities endpoint.
"""

from __future__ import annotations

from fastapi import APIRouter, Request

router = APIRouter(prefix="/api/cities", tags=["cities"])


@router.get("/", summary="List all available cities")
async def list_cities(request: Request):
    """
    Returns all cities available in the dataset.
    Each city has a `slug` (for API calls) and `display` (Polish name).
    """
    parser = request.app.state.parser
    cities = parser.get_all_cities()
    return {
        "count": len(cities),
        "cities": cities,
    }
