from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
TEMPLATE = ROOT / "src" / "template.html"
SECTIONS = ROOT / "src" / "sections"
OUTPUT = ROOT / "index.html"

INCLUDE_RE = re.compile(r"\{\{>\s*([^}]+?)\s*\}\}")


def render(template_text: str) -> str:
    def replace(match: re.Match[str]) -> str:
        filename = match.group(1).strip()
        path = SECTIONS / filename
        if not path.is_file():
            raise FileNotFoundError(f"Missing section partial: {path}")
        return path.read_text(encoding="utf-8").rstrip()

    rendered = INCLUDE_RE.sub(replace, template_text)
    unresolved = INCLUDE_RE.findall(rendered)
    if unresolved:
        raise RuntimeError(f"Unresolved includes: {unresolved}")
    return rendered


def main() -> None:
    template_text = TEMPLATE.read_text(encoding="utf-8")
    OUTPUT.write_text(render(template_text), encoding="utf-8")
    print(f"Built {OUTPUT}")


if __name__ == "__main__":
    main()
