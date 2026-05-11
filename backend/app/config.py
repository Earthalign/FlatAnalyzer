"""
Configuration settings for FlatAnalyzer backend.
Uses pydantic-settings for environment-based configuration.
"""

from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded from environment variables or defaults."""

    app_name: str = "FlatAnalyzer API"
    app_version: str = "1.0.0"
    debug: bool = False

    # Data paths
    base_dir: Path = Path(__file__).parent.parent
    data_dir: Path = base_dir / "data"

    # NBP data source
    nbp_base_url: str = "https://www.nbp.pl"
    nbp_real_estate_path: str = "/statystyka-i-sprawozdawczosc/ceny-nieruchomosci/"

    # Cache settings
    cache_ttl_hours: int = 24
    db_file: str = "flatanalyzer.db"

    # CORS
    allowed_origins: list[str] = ['https://earthalign.github.io']

    @property
    def db_path(self) -> Path:
        return self.data_dir / self.db_file

    @property
    def static_data_path(self) -> Path:
        return self.data_dir / "nbp_prices_dataset.json"

    model_config = SettingsConfigDict(env_prefix="FLAT_")


settings = Settings()