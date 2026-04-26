"""
City definitions for FlatAnalyzer.
Based on cities tracked by NBP in their quarterly reports.
"""

from __future__ import annotations
from dataclasses import dataclass


@dataclass(frozen=True)
class City:
    """Represents a city tracked by NBP."""
    slug: str          # URL-safe lowercase key
    display_name: str  # Polish display name
    region: str        # Region / voivodeship


# NBP tracks these cities in their quarterly reports
NBP_CITIES: list[City] = [
    City("warszawa",    "Warszawa",    "Mazowieckie"),
    City("krakow",      "Kraków",      "Małopolskie"),
    City("wroclaw",     "Wrocław",     "Dolnośląskie"),
    City("poznan",      "Poznań",      "Wielkopolskie"),
    City("gdansk",      "Gdańsk",      "Pomorskie"),
    City("gdynia",      "Gdynia",      "Pomorskie"),
    City("lodz",        "Łódź",        "Łódzkie"),
    City("katowice",    "Katowice",    "Śląskie"),
    City("bialystok",   "Białystok",   "Podlaskie"),
    City("lublin",      "Lublin",      "Lubelskie"),
    City("szczecin",    "Szczecin",    "Zachodniopomorskie"),
    City("rzeszow",     "Rzeszów",     "Podkarpackie"),
    City("bydgoszcz",   "Bydgoszcz",   "Kujawsko-Pomorskie"),
    City("olsztyn",     "Olsztyn",     "Warmińsko-Mazurskie"),
    City("opole",       "Opole",       "Opolskie"),
    City("zielona-gora","Zielona Góra","Lubuskie"),
]

# Lookup helpers
CITY_BY_SLUG: dict[str, City] = {c.slug: c for c in NBP_CITIES}
CITY_BY_NAME: dict[str, City] = {c.display_name.lower(): c for c in NBP_CITIES}


def find_city(query: str) -> City | None:
    """
    Find a city by partial name or slug (case-insensitive).
    Handles Polish diacritics via transliteration.
    """
    q = query.strip().lower()
    # Direct slug match
    if q in CITY_BY_SLUG:
        return CITY_BY_SLUG[q]
    # Display name match
    if q in CITY_BY_NAME:
        return CITY_BY_NAME[q]
    # Partial match on display name
    for city in NBP_CITIES:
        if q in city.display_name.lower() or q in city.slug:
            return city
    return None
