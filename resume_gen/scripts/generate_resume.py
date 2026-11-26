import os
import sys

# Only the standard library at import time: CI and Vercel's ignored build step
# import this module to fingerprint the rendered HTML (.github/scripts/
# resume_fingerprint.py) without Playwright installed. main() imports
# check_requirements and generate_pdf itself.
_SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
if _SCRIPT_DIR not in sys.path:
    sys.path.append(_SCRIPT_DIR)

from pathlib import Path
from datetime import datetime
from html import escape
import json
import re
import traceback

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
RESUME_GEN_DIR = os.path.dirname(SCRIPT_DIR)
REPO_ROOT = os.path.dirname(RESUME_GEN_DIR)
PUBLIC_DIR = os.path.join(REPO_ROOT, 'public')
OUTPUT_HTML = os.path.join(PUBLIC_DIR, 'resume.html')
TEMPLATE_PATH = os.path.join(RESUME_GEN_DIR, 'templates', 'resume_template.html')

# How many entries of each section the resume prints.
RESUME_COUNTS = {
    'workExperience': 3,
    'projects': 5,
    'education': 2,
    'certificates': 6,
    'publications': 2,
}

def parse_date(date_str):
    if not date_str:
        return None
    
    if not isinstance(date_str, str):
        if hasattr(date_str, 'strftime'): # datetime.date or datetime.datetime
            return date_str, date_str.day, date_str.month
        date_str = str(date_str)

    if date_str.lower() == "present":
        return None
    try:
        parts = date_str.split('/')
        if len(parts) != 3:
            return None
        day = int(parts[0])
        month = int(parts[1])
        year = int(parts[2])
        if day == 0: day = 1
        if month == 0: month = 1
        return datetime(year, month, day), int(parts[0]), int(parts[1])
    except:
        return None

def format_date_display(date_str, end_date_str=None, in_progress=False):
    def format_single(d_str):
        if not d_str: return ""
        parsed = parse_date(d_str)
        if not parsed: return d_str
        
        dt, raw_day, raw_month = parsed
        
        if raw_day == 0 and raw_month == 0:
            return dt.strftime("%Y") 
        if raw_day == 0:
            return dt.strftime("%b %Y") 
        return dt.strftime("%b %d, %Y") 

    start_date = parse_date(date_str)
    end_date = parse_date(end_date_str) if end_date_str else None

    if end_date_str or in_progress:
        if not start_date: return date_str
        
        start_str = format_single(date_str)
        end_str = ""
        
        if in_progress:
            if end_date and end_date_str:
                end_str = f"{format_single(end_date_str)} (Expected)"
            else:
                end_str = "Present"
        else:
            if end_date_str and end_date_str.lower() == "present":
                end_str = "Present"
            elif end_date:
                end_str = format_single(end_date_str)
        
        return f"{start_str} - {end_str}"
    
    return format_single(date_str)

def text(value):
    """Escape a value for the page, so every piece of resume text prints
    exactly as written (an "&" or "<" in the data is text, never markup)."""
    return escape(str(value if value is not None else ''))

def url_display_clean(url):
    clean = url.replace('https://', '').replace('http://', '').replace('mailto:', '')
    if clean.endswith('/'):
        clean = clean[:-1]
    return clean

def link_href(url):
    """The href for a contact line. Emails are stored bare, so they get mailto:
    here, and a value made only of digits and dialling punctuation gets tel:.
    Anything else is treated as a URL."""
    url = url.strip()
    if url.startswith(('http://', 'https://', 'mailto:', 'tel:')):
        return url
    if '@' in url and '/' not in url:
        return 'mailto:' + url
    digits = ''.join(ch for ch in url if ch.isdigit())
    if len(digits) >= 7 and all(ch.isdigit() or ch in '+-(). ' for ch in url):
        return 'tel:' + ''.join(ch for ch in url if ch.isdigit() or ch == '+')
    return 'https://' + url

def links_html(links):
    """Header contact lines, each clickable in the PDF."""
    out = ""
    for link in links:
        text = escape(url_display_clean(link['url']))
        href = link_href(link['url'])
        out += f'<div><a href="{escape(href)}">{text}</a></div>'
    return out

def parse_skill_categories(raw):
    """Normalise a `skills.categories` list to [{'label', 'items'}, ...].

    The one parser for categorised skills: every categories list goes through
    it, so there is a single format. Labels and items become stripped strings,
    a bare string of items becomes a one-item list, an item already used by an
    earlier category is dropped (case-insensitive), and a category left
    without a label or items is dropped.
    """
    categories = []
    seen = set()
    for cat in raw:
        if not isinstance(cat, dict):
            continue
        label = str(cat.get('label') or '').strip()
        items = cat.get('items') or []
        if isinstance(items, str):
            items = [items]
        kept = []
        for item in items:
            name = str(item).strip()
            if name and name.lower() not in seen:
                seen.add(name.lower())
                kept.append(name)
        if label and kept:
            categories.append({'label': label, 'items': kept})
    return categories

def skill_categories(skills):
    """The skills section as categories.

    An explicit `skills.categories` list is used as given. Otherwise skills are
    grouped by each entry's `category` in resume_data.json: categories print in
    the order their first skill appears across top, main and other, and items
    keep their order in those lists.
    """
    if 'categories' in skills:
        return parse_skill_categories(skills['categories'])
    grouped = {}
    for bucket, key in (('top', 'title'), ('main', 'name'), ('other', 'title')):
        for entry in skills[bucket]:
            if 'category' not in entry:
                raise KeyError(f"Skill {entry[key]!r} in resume_data.json has no 'category'")
            grouped.setdefault(entry['category'], []).append(entry[key])
    return parse_skill_categories(
        [{'label': label, 'items': items} for label, items in grouped.items()])

def resume_projects(projects, limit):
    """The RESUME_COUNTS['projects'] projects for the resume, listed featured first.

    More featured projects than the limit: keep the newest featured ones.
    Fewer: take every featured one, then fill with the newest of the rest.
    """
    def newest(p):
        parsed = parse_date(p.get('date'))
        return parsed[0] if parsed else datetime.min

    if limit <= 0:
        return []
    # Sorted by rank first, so projects from the same month keep rank order.
    featured = sorted((p for p in projects if p.get('featured')), key=lambda p: p['featured'])
    if len(featured) >= limit:
        keep = {id(p) for p in sorted(featured, key=newest, reverse=True)[:limit]}
        return [p for p in featured if id(p) in keep]
    rest = sorted((p for p in projects if not p.get('featured')), key=newest, reverse=True)
    return featured + rest[:limit - len(featured)]

def generate_html(data):
    counts = data.get('counts') or RESUME_COUNTS

    header_links = links_html(data['links'])
    root = data['websiteUrl'].rstrip('/')

    content_html = ""

    if data['summary']:
        content_html += f"""
        <div class="section">
            <h2>PROFESSIONAL SUMMARY</h2>
            <p style="margin-top:2px;">{text(data['summary'])}</p>
        </div>"""

    edus = data['education']
    limit = counts['education']
    if edus and limit > 0:
        content_html += '\n        <div class="section">\n            <h2>EDUCATION</h2>'
        for edu in edus[:limit]:
            date_str = format_date_display(edu['startDate'], edu.get('endDate'), edu.get('inProgress'))
            subtitle = text(", ".join(edu['subtitle']))
            grade = edu.get('grade')
            grade_html = f"<b>&ensp;&#9679;&ensp;{text(grade)}</b>" if grade else ""
            content_html += f"""
            <div class="entry">
                <div class="degree-info">{text(edu['title'])} <span>{text(date_str)}</span></div>
                <p class="institution">{subtitle}{grade_html}</p>
            </div>"""
        content_html += "\n        </div>"

    exps = data['experience']
    limit = counts['workExperience']
    if exps and limit > 0:
        content_html += '\n        <div class="section">\n            <h2>WORK EXPERIENCE</h2>'
        for exp in exps[:limit]:
            date_str = format_date_display(exp['startDate'], exp.get('endDate'), exp.get('inProgress'))
            location_html = f'\n                <p class="location">{text(exp["location"])}</p>'
            bullets = "".join(f"\n                    <li>{text(sub)}</li>" for sub in exp['subtitle'])
            content_html += f"""
            <div class="entry">
                <div class="job-title">{text(exp['title'])} <span>{text(date_str)}</span></div>{location_html}
                <ul>{bullets}
                </ul>
            </div>"""
        content_html += "\n        </div>"

    # The site's home page shows the first three featured projects; the
    # resume picks RESUME_COUNTS['projects'] of them with resume_projects().
    projs = resume_projects(data['projects'], counts['projects'])
    if projs:
        content_html += '\n        <div class="section">\n            <h2>PROJECTS</h2>'
        for proj in projs:
            date_html = f"<span>{text(format_date_display(proj['date']))}</span>"
            # One paragraph, or a list of bullets.
            desc = proj['desc']
            items = desc if isinstance(desc, list) else [desc]
            items_html = "".join(f"\n                    <li>{text(item)}</li>" for item in items)
            # The title itself is the link. Printing the address beside it was
            # tried and dropped: an ATS reading the text layer took it as part
            # of the project name. The template colours every link blue, which
            # is styling, so it never reaches the text.
            # A hidden project has no page on the site, so its title isn't a link.
            if proj.get('hidden'):
                title = text(proj["title"])
            else:
                href = f"{root}/projects/{proj['url']}"
                title = f'<a class="proj-link" href="{escape(href)}">{text(proj["title"])}</a>'
            content_html += f"""
            <div class="entry">
                <div class="job-title">{title} {date_html}</div>
                <ul>{items_html}
                </ul>
            </div>"""
        content_html += "\n        </div>"

    pubs = data['publications']
    limit = counts['publications']
    if pubs and limit > 0:
        content_html += '\n        <div class="section">\n            <h2>PUBLICATIONS</h2>\n            <div class="grid-container">'
        for p in pubs[:limit]:
            d = format_date_display(p['date'])
            content_html += f"""
                <div class="grid-item">
                    <span>{text(p["name"])}</span><br/>
                    <span>{text(p["publishing"])} &#9679; {text(d)}</span>
                </div>"""
        content_html += "\n            </div>\n        </div>"

    certs = data['certificates']
    limit = counts['certificates']
    if certs and limit > 0:
        content_html += '\n        <div class="section">\n            <h2>CERTIFICATIONS</h2>\n            <div class="grid-container">'
        for c in certs[:limit]:
            d = format_date_display(c['date'])
            content_html += f"""
                <div class="grid-item">
                    <span>{text(c["title"])}</span><br/>
                    <span>{text(c["subtitle"])} &#9679; {text(d)}</span>
                </div>"""
        content_html += "\n            </div>\n        </div>"

    # One labelled row per category, rendered as a comma-separated list.
    content_html += '\n        <div class="section">\n            <h2>TECHNICAL SKILLS</h2>'
    for cat in skill_categories(data['skills']):
        content_html += (
            f"\n            <div class=\"skill-cat\">"
            f"<span class=\"cat-label\">{escape(cat['label'])}:</span> "
            f"{escape(', '.join(cat['items']))}</div>"
        )
    content_html += "\n        </div>"

    with open(TEMPLATE_PATH, 'r', encoding='utf-8') as f:
        template = f.read()

    final_html = template
    final_html = final_html.replace('[PAGE_TITLE]', text(data['name'] + ' - Resume'))
    final_html = final_html.replace('[FULL_NAME]', text(data['fullName']))
    final_html = final_html.replace('[JOB_TITLE]', text(data['title']))
    final_html = final_html.replace('[LOCATION]', text(data['location']))
    final_html = final_html.replace('[HEADER_LINKS]', header_links)
    final_html = final_html.replace('[CONTENT]', content_html)

    return final_html

def clean_data(data):
    if isinstance(data, dict):
        for key in list(data.keys()):
            if key in ['image', 'icon', 'label']:
                del data[key]
            else:
                clean_data(data[key])
    elif isinstance(data, list):
        for item in data:
            clean_data(item)
    return data

def load_base_data():
    """The resume from src/lib/resume_data.json, shaped for rendering."""
    JSON_PATH = os.path.join(REPO_ROOT, 'src', 'lib', 'resume_data.json')
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        resume_data = json.load(f)

    # The resume calls skills.top3 skills.top.
    resume_data['skills']['top'] = resume_data['skills'].pop('top3')

    # The header carries exactly LinkedIn, Website, Email.
    links = {l['text']: l['href'] for l in resume_data['links']}
    resume_data['links'] = [
        {'text': 'LinkedIn', 'url': links['LinkedIn']},
        {'text': 'Website', 'url': resume_data['websiteUrl']},
        {'text': 'Email', 'url': links['Email']},
    ]

    return clean_data(resume_data)

def render_preview(pdf_path, dpi=250):
    """Renders the PDF's page to a PNG beside it. /resume shows this image,
    drawn at well over twice its display size so the text stays sharp."""
    import pymupdf
    out = Path(pdf_path).with_suffix('.png')
    with pymupdf.open(pdf_path) as doc:
        doc[0].get_pixmap(dpi=dpi).save(out)
    return out

def main():
    import check_requirements  # noqa: F401  (installs anything missing)
    import generate_pdf

    data = load_base_data()
    try:
        html = generate_html(data)
        os.makedirs(os.path.dirname(OUTPUT_HTML), exist_ok=True)
        with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
            f.write(html)
        
        rel = lambda p: os.path.relpath(p, REPO_ROOT).replace('\\', '/')
        print(f"Success! HTML saved to {rel(OUTPUT_HTML)}")
        # Automatically convert compiled HTML to PDF
        try:
            output_pdf = os.path.splitext(OUTPUT_HTML)[0] + ".pdf"
            scale = generate_pdf.convert_html_to_pdf(Path(OUTPUT_HTML), Path(output_pdf))
            print(f"Success! Base PDF generated (scale={scale:.3f}) and saved to {rel(output_pdf)}")
            print("  The site serves this at /resume.pdf")
            try:
                preview = render_preview(output_pdf)
                print(f"Success! Page preview saved to {rel(preview)}")
            except Exception as e:
                print(f"Warning: Error rendering page preview: {e}")
        except Exception as e:
            print(f"Warning: Error generating base PDF: {e}")
            
    except Exception as e:
        print(f"Critical Error: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    main()

