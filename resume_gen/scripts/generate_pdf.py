import os
import sys

# Ensure requirements are met first
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
if _SCRIPT_DIR not in sys.path:
    sys.path.append(_SCRIPT_DIR)
import check_requirements

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
PUBLIC_DIR = SCRIPT_DIR.parent.parent / 'public'

# Playwright scale bounds
MIN_SCALE = 0.1
MAX_SCALE = 2.0
# Tolerance for binary search — stop when the scale window is this narrow
SCALE_TOLERANCE = 0.005


def locked_page(browser):
    """A page that renders the local HTML and nothing else: no JavaScript, and
    every request that isn't a local file is refused. The template needs
    neither."""
    context = browser.new_context(java_script_enabled=False)
    context.route('**/*', lambda route: route.continue_()
                  if route.request.url.startswith('file:') else route.abort())
    return context.new_page()


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
            page = locked_page(browser)
            scale = render_single_page_pdf(page, html_path, pdf_path)
            return scale
        finally:
            browser.close()


def main():
    """Print public/resume.html (written by generate_resume.py) to public/resume.pdf."""
    html = PUBLIC_DIR / 'resume.html'
    if not html.is_file():
        print(f"{html} not found. Run generate_resume.py first.")
        return
    scale = convert_html_to_pdf(html, PUBLIC_DIR / 'resume.pdf')
    print(f"Saved resume.pdf (scale={scale:.3f})")


if __name__ == "__main__":
    main()
