#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IMG = {".png", ".jpg", ".jpeg", ".gif", ".webp"}
VID = {".mp4", ".webm", ".mov"}


def media(folder, extra=()):
    exts = IMG | set(extra)
    if not folder.exists():
        return []
    return [str(p.relative_to(ROOT).as_posix()) for p in sorted(folder.iterdir())
            if p.is_file() and p.suffix.lower() in exts and not p.name.startswith(".")]


def build_galleries():
    for name, extra in (("drawings", VID), ("comics", ()), ("banners", ())):
        files = media(ROOT / "content" / name, extra)
        if name == "banners":
            path = ROOT / "content" / "banners.json"
            try:
                old = {b["src"]: b for b in json.loads(path.read_text()) if isinstance(b, dict) and b.get("src")}
            except (OSError, ValueError):
                old = {}
            files = sorted(files, key=lambda s: (ROOT / s).stat().st_mtime, reverse=True)
            files = [{
                "src": s,
                "link": old.get(s, {}).get("link", "index.html"),
                "alt": old.get(s, {}).get("alt", Path(s).stem),
            } for s in files]
            path.write_text(json.dumps(files, indent=2) + "\n")
            print(f"banners.json: {len(files)}")
        else:
            out = ROOT / "data" / f"{name}.json"
            out.write_text(json.dumps(files, indent=2) + "\n")
            print(f"{out.name}: {len(files)}")


def build_logs():
    folder = ROOT / "content" / "logs"
    entries = []
    for p in sorted(folder.glob("*.txt"), reverse=True) if folder.exists() else []:
        text = p.read_text(encoding="utf-8", errors="replace")
        title = next((line.strip() for line in text.splitlines() if line.strip()), p.stem)[:80]
        entries.append({"src": f"content/logs/{p.name}", "title": title})
    out = ROOT / "data" / "logs.json"
    out.write_text(json.dumps(entries, indent=2) + "\n")
    print(f"{out.name}: {len(entries)}")


def build_photos():
    base = ROOT / "content" / "photos"
    entries = []
    for d in sorted((p for p in base.iterdir() if p.is_dir()), reverse=True) if base.exists() else []:
        text = (d / "text.txt").read_text(encoding="utf-8", errors="replace") if (d / "text.txt").exists() else ""
        photos = [str(p.relative_to(ROOT).as_posix()) for p in sorted(d.iterdir())
                  if p.is_file() and p.suffix.lower() in IMG]
        entries.append({"date": d.name, "text": text, "photos": photos})
    out = ROOT / "data" / "photos.json"
    out.write_text(json.dumps(entries, indent=2) + "\n")
    print(f"{out.name}: {len(entries)}")


if __name__ == "__main__":
    build_galleries()
    build_logs()
    build_photos()
