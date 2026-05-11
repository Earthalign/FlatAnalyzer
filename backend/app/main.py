"""
FlatAnalyzer – FastAPI Application Entry Point.

Serves the REST API (under /api/) and the frontend static files.
"""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.config import settings
from app.routers import cities, prices
from app.services.cache_service import CacheService
from app.services.data_parser import DataParser

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: initialize services on startup."""
    logger.info("Starting FlatAnalyzer API v%s", settings.app_version)

    # Initialize cache
    cache = CacheService(db_path=settings.db_path, ttl_hours=settings.cache_ttl_hours)
    await cache.initialize()
    app.state.cache = cache

    # Load price data parser
    parser = DataParser(dataset_path=settings.static_data_path)
    parser.load()
    app.state.parser = parser

    logger.info("FlatAnalyzer ready. Loaded %d price records.", len(parser.records))
    yield

    logger.info("Shutting down FlatAnalyzer.")


def create_app() -> FastAPI:
    """Application factory."""
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description=(
            "API for browsing historical and current real estate prices in Poland. "
            "Data source: NBP (Narodowy Bank Polski) quarterly reports."
        ),
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        lifespan=lifespan,
    )

    # CORS – allow all origins for portfolio demo
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,  
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # API Routers
    app.include_router(prices.router)
    app.include_router(cities.router)

    # Health check
    @app.get("/api/health", tags=["meta"])
    async def health():
        return {"status": "ok", "version": settings.app_version}

    # Serve frontend static files
    frontend_dir = Path(__file__).parent.parent.parent / "frontend"
    if frontend_dir.exists():
        app.mount("/static", StaticFiles(directory=str(frontend_dir), html=False), name="static")

        @app.get("/", include_in_schema=False)
        async def serve_frontend():
            return FileResponse(str(frontend_dir / "index.html"))

        @app.get("/{full_path:path}", include_in_schema=False)
        async def serve_static(full_path: str):
            file_path = frontend_dir / full_path
            if file_path.exists() and file_path.is_file():
                return FileResponse(str(file_path))
            return FileResponse(str(frontend_dir / "index.html"))

    return app


app = create_app()
