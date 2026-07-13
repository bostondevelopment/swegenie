"""Shared helper for window-mode pipeline scripts (see WAVE_DESIGN.md)."""
import json
from datetime import date
from pathlib import Path

CORPUS_DIR = Path(__file__).resolve().parents[2] / "docs/research/job-postings-corpus"


def load_wave_dates():
    """wave_id -> harvested_at (date) for every waves/<id>/manifest.json found."""
    out = {}
    waves_dir = CORPUS_DIR / "waves"
    if not waves_dir.exists():
        return out
    for manifest_fp in waves_dir.glob("*/manifest.json"):
        m = json.loads(manifest_fp.read_text())
        out[m["wave_id"]] = date.fromisoformat(m["harvested_at"][:10])
    return out


def window_cutoff(wave_dates: dict, window_months: int):
    """Cutoff date: window_months back from the most recent wave. None if no waves known."""
    if not wave_dates:
        return None
    latest = max(wave_dates.values())
    month = latest.month - window_months
    year = latest.year + (month - 1) // 12
    month = (month - 1) % 12 + 1
    return date(year, month, latest.day if latest.day <= 28 else 28)


def record_in_window(record: dict, wave_dates: dict, cutoff) -> bool:
    """True if record's wave is within the window, or if it predates wave-tagging (legacy data)."""
    if cutoff is None:
        return True
    wave_id = record.get("wave_id")
    if wave_id is None or wave_id not in wave_dates:
        return True  # legacy/untagged data — include rather than silently drop
    return wave_dates[wave_id] >= cutoff
