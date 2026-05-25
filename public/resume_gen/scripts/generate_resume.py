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

def generate_cover_letter_html(cl_data, resume_data):
    CL_TEMPLATE_PATH = os.path.join(RESUME_GEN_DIR, 'templates', 'cover_letter_template.html')
    if not os.path.exists(CL_TEMPLATE_PATH):
        raise FileNotFoundError(f"Cover letter template not found at {CL_TEMPLATE_PATH}")

    with open(CL_TEMPLATE_PATH, 'r', encoding='utf-8') as f:
        template = f.read()

    cl_html = template
    cl_html = cl_html.replace('[NAME]', resume_data.get('name', ''))
    cl_html = cl_html.replace('[FULL_NAME]', resume_data.get('fullName', ''))
    cl_html = cl_html.replace('[TITLE]', resume_data.get('title', ''))
    cl_html = cl_html.replace('[DATE]', datetime.now().strftime("%B %d, %Y"))

    links = resume_data.get('links', [])
    links_html = ""
    for link in links:
        url = link.get('url', '')
        links_html += f"<div>{url_display_clean(url)}</div>"
    cl_html = cl_html.replace('[HEADER_LINKS]', links_html)

    cl_html = cl_html.replace('[INTRODUCTION]', cl_data.get('introduction', ''))
    cl_html = cl_html.replace('[PARAGRAPH 1]', cl_data.get('paragraph1', ''))
    cl_html = cl_html.replace('[PARAGRAPH 2]', cl_data.get('paragraph2', ''))
    cl_html = cl_html.replace('[CONCLUSION]', cl_data.get('conclusion', ''))

    return cl_html

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
    JSON_PATH = os.path.join(os.path.dirname(os.path.dirname(RESUME_GEN_DIR)), 'src', 'lib', 'resume_data.json')
    if os.path.exists(JSON_PATH):
        print(f"Loading base resume data directly from JSON: {JSON_PATH}")
        try:
            import json
            with open(JSON_PATH, 'r', encoding='utf-8') as f:
                resume_data = json.load(f)
            
            # 1. Map skills.top3 -> skills.top for resume compliance
            if 'skills' in resume_data and 'top3' in resume_data['skills']:
                resume_data['skills']['top'] = resume_data['skills'].pop('top3')
                
            # 2. Filter and map links to match resume format (LinkedIn, Website, Email with 'url' key)
            raw_links = resume_data.get('links', [])
            final_links = []
            
            linkedin = next((l for l in raw_links if l.get('text') == 'LinkedIn'), None)
            if linkedin:
                final_links.append({'text': 'LinkedIn', 'url': linkedin.get('href')})
                
            website_url = resume_data.get('websiteUrl') or 'https://www.shaadqrsh.com'
            final_links.append({'text': 'Website', 'url': website_url})
            
            email = next((l for l in raw_links if l.get('text') == 'Email'), None)
            if email:
                final_links.append({'text': 'Email', 'url': email.get('href')})
                
            resume_data['links'] = final_links
            
            cleaned_data = clean_data(resume_data)
            return cleaned_data
        except Exception as e:
            print(f"Error loading JSON data: {e}")
            
    # Fallback to local YAML file if JSON not found (e.g. running in tailored folders)
    if os.path.exists(YAML_FILE):
        print(f"Falling back to local YAML file: {YAML_FILE}")
        try:
            with open(YAML_FILE, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except Exception as e:
            print(f"Error parsing local YAML: {e}")
            
    return None

def main():
    data = load_base_data()
    if not data:
        print("Error: Could not load resume data from JSON database or local YAML.")
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

