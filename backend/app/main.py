import logging
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.config import settings
from .routers import prices, cities

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    debug=settings.debug
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")

app.include_router(cities.router, prefix="/api/cities", tags=["cities"])
app.include_router(prices.router, prefix="/api/prices", tags=["prices"])

frontend_dir = Path(__file__).parent.parent.parent / "frontend"

@app.get("/")
async def root():
    index_path = frontend_dir / "index.html"
    if index_path.exists():
        return FileResponse(index_path)
    return {
        "app": settings.app_name,
        "version": settings.app_version,
        "status": "online"
    }

if frontend_dir.exists():
    app.mount("/", StaticFiles(directory=frontend_dir), name="frontend")