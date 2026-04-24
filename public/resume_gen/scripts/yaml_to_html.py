import os
import sys
try:
    import yaml
except ImportError:
    print("Error: 'pyyaml' module not found.")
    print("Please install it using: pip install pyyaml")
    sys.exit(1)

from datetime import datetime
import traceback

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
RESUME_GEN_DIR = os.path.dirname(SCRIPT_DIR)
YAML_FILE = os.path.join(RESUME_GEN_DIR, 'resume_data.yaml')
OUTPUT_HTML = os.path.join(RESUME_GEN_DIR, 'resume.html')
TEMPLATE_PATH = os.path.join(RESUME_GEN_DIR, 'templates', 'resume_template.html')

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

def url_display_clean(url):
    if not url: return ""
    if not isinstance(url, str):
        url = str(url)
    clean = url.replace('https://', '').replace('http://', '').replace('mailto:', '')
    if clean.endswith('/'):
        clean = clean[:-1]
    return clean

def generate_html(data):
    counts = data.get('counts') or {}

    links = data.get('links', [])
    header_links = ""
    for link in links:
        url = link.get('url', '')
        header_links += f"<div>{url_display_clean(url)}</div>"

    content_html = ""

    if data.get('summary'):
        content_html += f"""
        <div class="section">
            <h2>PROFESSIONAL SUMMARY</h2>
            <p style="margin-top:2px;">{data.get('summary')}</p>
        </div>"""

    edus = data.get('education', [])
    limit = counts.get('education') if counts.get('education') is not None else 100
    if edus and limit > 0:
        content_html += '\n        <div class="section">\n            <h2>EDUCATION</h2>'
        for edu in edus[:limit]:
            date_str = format_date_display(edu.get('startDate'), edu.get('endDate'), edu.get('inProgress'))
            subtitle = edu.get('subtitle', [])
            if isinstance(subtitle, list):
                subtitle = ", ".join(subtitle)
            grade = edu.get('grade', '')
            grade_html = f"<b>&ensp;&#9679;&ensp;{grade}</b>" if grade else ""
            content_html += f"""
            <div class="entry">
                <div class="degree-info">{edu.get('title')} <span>{date_str}</span></div>
                <p class="institution">{subtitle}{grade_html}</p>
            </div>"""
        content_html += "\n        </div>"

    exps = data.get('experience', [])
    limit = counts.get('workExperience') if counts.get('workExperience') is not None else 100
    if exps and limit > 0:
        content_html += '\n        <div class="section">\n            <h2>WORK EXPERIENCE</h2>'
        for exp in exps[:limit]:
            date_str = format_date_display(exp.get('startDate'), exp.get('endDate'), exp.get('inProgress'))
            location = exp.get('location', '')
            subtitles = exp.get('subtitle', [])
            if isinstance(subtitles, str):
                subtitles = [subtitles]
            location_html = f'\n                <p class="location">{location}</p>' if location else ""
            bullets = "".join(f"\n                    <li>{sub}</li>" for sub in subtitles if sub)
            content_html += f"""
            <div class="entry">
                <div class="job-title">{exp.get('title')} <span>{date_str}</span></div>{location_html}
                <ul>{bullets}
                </ul>
            </div>"""
        content_html += "\n        </div>"

    projs = data.get('projects', [])
    limit = counts.get('projects') if counts.get('projects') is not None else 100
    if projs and limit > 0:
        content_html += '\n        <div class="section">\n            <h2>PROJECTS</h2>'
        for proj in projs[:limit]:
            p_date = format_date_display(proj.get('date'))
            date_html = f"<span>{p_date}</span>" if p_date else ""
            content_html += f"""
            <div class="entry">
                <div class="job-title">{proj.get('title')} {date_html}</div>
                <ul>
                    <li>{proj.get('desc')}</li>
                </ul>
            </div>"""
        content_html += "\n        </div>"

    pubs = data.get('publications', [])
    limit = counts.get('publications') if counts.get('publications') is not None else 100
    if pubs and limit > 0:
        content_html += '\n        <div class="section">\n            <h2>PUBLICATIONS</h2>\n            <div class="grid-container">'
        for p in pubs[:limit]:
            d = format_date_display(p.get('date'))
            content_html += f"""
                <div class="grid-item">
                    <span>{p.get("name")}</span><br/>
                    <span>{p.get("publishing")} &#9679; {d}</span>
                </div>"""
        content_html += "\n            </div>\n        </div>"

    certs = data.get('certificates', [])
    limit = counts.get('certificates') if counts.get('certificates') is not None else 100
    if certs and limit > 0:
        content_html += '\n        <div class="section">\n            <h2>CERTIFICATIONS</h2>\n            <div class="grid-container">'
        for c in certs[:limit]:
            d = format_date_display(c.get('date'))
            content_html += f"""
                <div class="grid-item">
                    <span>{c.get("title")}</span><br/>
                    <span>{c.get("subtitle")} &#9679; {d}</span>
                </div>"""
        content_html += "\n            </div>\n        </div>"

    skills = data.get('skills', {})
    limit = counts.get('skills') if counts.get('skills') is not None else 100
    if skills and limit > 0:
        flat_skills = []
        for s in skills.get('top', []):
            flat_skills.append(s.get('title'))
        for s in skills.get('main', []):
            flat_skills.append(s.get('name'))
        for s in skills.get('other', []):
            flat_skills.append(s.get('title'))
        flat_skills = flat_skills[:limit]
        content_html += '\n        <div class="section">\n            <h2>SKILLS</h2>\n            <ul class="skills-grid">'
        for skill in flat_skills:
            content_html += f"\n                <li>{skill}</li>"
        content_html += "\n            </ul>\n        </div>"

    if not os.path.exists(TEMPLATE_PATH):
        return f"Error: Template not found at {TEMPLATE_PATH}. Please ensure it exists."

    with open(TEMPLATE_PATH, 'r', encoding='utf-8') as f:
        template = f.read()

    final_html = template
    final_html = final_html.replace('[PAGE_TITLE]', data.get('name', 'Resume') + ' - Resume')
    final_html = final_html.replace('[FULL_NAME]', data.get('fullName', ''))
    final_html = final_html.replace('[JOB_TITLE]', data.get('title', ''))
    final_html = final_html.replace('[HEADER_LINKS]', header_links)
    final_html = final_html.replace('[CONTENT]', content_html)

    return final_html

def main():
    if not os.path.exists(YAML_FILE):
        print(f"Error: {YAML_FILE} not found.")
        return

    try:
        with open(YAML_FILE, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
    except Exception as e:
        print(f"Error parse YAML: {e}")
        return

    try:
        html = generate_html(data)
        with open(OUTPUT_HTML, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Success! HTML saved to {OUTPUT_HTML}")
            
    except Exception as e:
        print(f"Critical Error: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    main()
