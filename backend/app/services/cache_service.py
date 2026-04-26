"""
Cache service for FlatAnalyzer.
Uses SQLite via aiosqlite to store and retrieve parsed price records.
"""

from __future__ import annotations

import json
import logging
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional

import aiosqlite

logger = logging.getLogger(__name__)

_CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS price_cache (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    cache_key   TEXT NOT NULL UNIQUE,
    payload     TEXT NOT NULL,
    created_at  TEXT NOT NULL
);
"""


class CacheService:
    """
    Async SQLite-based cache for price query results.

    Stores serialized JSON payloads keyed by query parameters.
    Entries expire after `ttl_hours` hours.
    """

    def __init__(self, db_path: Path, ttl_hours: int = 24) -> None:
        self._db_path = db_path
        self._ttl = timedelta(hours=ttl_hours)

    async def initialize(self) -> None:
        """Create the database tables if they don't exist."""
        self._db_path.parent.mkdir(parents=True, exist_ok=True)
        async with aiosqlite.connect(self._db_path) as db:
            await db.execute(_CREATE_TABLE_SQL)
            await db.commit()
        logger.info("Cache database ready at %s", self._db_path)

    def _make_key(self, **kwargs) -> str:
        """Build a deterministic cache key from query params."""
        return json.dumps(kwargs, sort_keys=True)

    async def get(self, **kwargs) -> Optional[dict | list]:
        """
        Retrieve a cached result.

        Returns None if not found or expired.
        """
        key = self._make_key(**kwargs)
        async with aiosqlite.connect(self._db_path) as db:
            db.row_factory = aiosqlite.Row
            async with db.execute(
                "SELECT payload, created_at FROM price_cache WHERE cache_key = ?",
                (key,),
            ) as cursor:
                row = await cursor.fetchone()

        if not row:
            return None

        created = datetime.fromisoformat(row["created_at"])
        if datetime.utcnow() - created > self._ttl:
            await self.delete(**kwargs)
            return None

        return json.loads(row["payload"])

    async def set(self, payload: dict | list, **kwargs) -> None:
        """Store a result in the cache."""
        key = self._make_key(**kwargs)
        now = datetime.utcnow().isoformat()
        async with aiosqlite.connect(self._db_path) as db:
            await db.execute(
                """
                INSERT INTO price_cache (cache_key, payload, created_at)
                VALUES (?, ?, ?)
                ON CONFLICT(cache_key) DO UPDATE SET
                    payload = excluded.payload,
                    created_at = excluded.created_at
                """,
                (key, json.dumps(payload), now),
            )
            await db.commit()

    async def delete(self, **kwargs) -> None:
        """Remove a single cached entry."""
        key = self._make_key(**kwargs)
        async with aiosqlite.connect(self._db_path) as db:
            await db.execute("DELETE FROM price_cache WHERE cache_key = ?", (key,))
            await db.commit()

    async def clear_expired(self) -> int:
        """Remove all expired cache entries. Returns count of removed rows."""
        cutoff = (datetime.utcnow() - self._ttl).isoformat()
        async with aiosqlite.connect(self._db_path) as db:
            cursor = await db.execute(
                "DELETE FROM price_cache WHERE created_at < ?", (cutoff,)
            )
            await db.commit()
            return cursor.rowcount
