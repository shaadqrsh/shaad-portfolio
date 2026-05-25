import os
import sys

# Ensure requirements are met first
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
if _SCRIPT_DIR not in sys.path:
    sys.path.append(_SCRIPT_DIR)
import check_requirements

import traceback
from pathlib import Path

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("Error: playwright not installed.")
    print("Run: pip install playwright && python -m playwright install chromium")
    sys.exit(1)

try:
    from pypdf import PdfReader
except ImportError:
    print("Error: pypdf not installed.")
    print("Run: pip install pypdf")
    sys.exit(1)

SCRIPT_DIR = Path(__file__).resolve().parent
RESUME_GEN_DIR = SCRIPT_DIR.parent
IGNORE_FOLDERS = {'scripts', 'templates', '__pycache__', '.git'}
TARGET_FILES = ('resume.html', 'cover_letter.html')

# Playwright scale bounds
MIN_SCALE = 0.1
MAX_SCALE = 2.0
# Tolerance for binary search — stop when the scale window is this narrow
SCALE_TOLERANCE = 0.005


def find_html_files(root: Path):
    """Find target HTML files at the root of resume_gen and exactly one level deep.

    Includes:
      - resume_gen/resume.html (if present)
      - resume_gen/<job_folder>/resume.html
      - resume_gen/<job_folder>/cover_letter.html

    Skips: scripts/, templates/, __pycache__/, .git/, and Done/ (and anything deeper).
    """
    found = []

    root_resume = root / 'resume.html'
    if root_resume.is_file():
        found.append(root_resume)

    for entry in sorted(root.iterdir()):
        if not entry.is_dir() or entry.name in IGNORE_FOLDERS:
            continue
        for target in TARGET_FILES:
            candidate = entry / target
            if candidate.is_file():
                found.append(candidate)

    return found


def render_at_scale(page, pdf_path: Path, scale: float):
    page.pdf(
        path=str(pdf_path),
        format='A4',
        print_background=True,
        prefer_css_page_size=True,
        scale=scale,
        margin={'top': '0', 'bottom': '0', 'left': '0', 'right': '0'},
    )


def page_count(pdf_path: Path) -> int:
    with open(pdf_path, 'rb') as f:
        return len(PdfReader(f).pages)


def render_single_page_pdf(page, html_path: Path, pdf_path: Path):
    page.goto(html_path.resolve().as_uri(), wait_until='networkidle')
    page.emulate_media(media='print')

    # Try full scale first — most resumes already fit.
    render_at_scale(page, pdf_path, 1.0)
    if page_count(pdf_path) <= 1:
        return 1.0

    # Binary search for the largest scale that still produces a single page.
    lo, hi = MIN_SCALE, 1.0
    best = None
    while hi - lo > SCALE_TOLERANCE:
        mid = (lo + hi) / 2
        render_at_scale(page, pdf_path, mid)
        if page_count(pdf_path) <= 1:
            best = mid
            lo = mid  # try larger
        else:
            hi = mid  # too big, try smaller

    if best is None:
        # Even the minimum scale overflowed — emit the smallest version we can.
        render_at_scale(page, pdf_path, MIN_SCALE)
        return MIN_SCALE

    # Re-render at the chosen best in case the last loop iteration overshot.
    render_at_scale(page, pdf_path, best)
    return best


def convert_html_to_pdf(html_path: Path, pdf_path: Path) -> float:
    """Helper function to convert a single HTML file to a scaled single-page PDF.
    
    Returns the scale factor used, or raises an exception on failure.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch()
        try:
            context = browser.new_context()
            page = context.new_page()
            scale = render_single_page_pdf(page, html_path, pdf_path)
            return scale
        finally:
            browser.close()


def main():
    print("=" * 60)
    print("PDF GENERATOR")
    print("=" * 60)

    html_files = find_html_files(RESUME_GEN_DIR)
    if not html_files:
        print(f"No resume.html or cover_letter.html files found under {RESUME_GEN_DIR}")
        return

    print(f"Found {len(html_files)} HTML file(s) to convert.\n")

    successes = []
    failures = []

    with sync_playwright() as p:
        browser = p.chromium.launch()
        try:
            context = browser.new_context()
            page = context.new_page()

            for html in html_files:
                rel = html.relative_to(RESUME_GEN_DIR)
                pdf_path = html.with_suffix('.pdf')
                try:
                    scale = render_single_page_pdf(page, html, pdf_path)
                    print(f"  OK  {rel}  (scale={scale:.3f})")
                    successes.append(rel)
                except Exception as e:
                    print(f"  FAIL {rel}: {e}")
                    traceback.print_exc()
                    failures.append((rel, str(e)))
        finally:
            browser.close()

    print("\n" + "=" * 60)
    print(f"Done. {len(successes)} succeeded, {len(failures)} failed.")
    if failures:
        for rel, err in failures:
            print(f"  - {rel}: {err}")
    print("=" * 60)


if __name__ == "__main__":
    main()
