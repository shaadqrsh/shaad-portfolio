import os
import sys
import yaml
from datetime import datetime
import traceback

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
YAML_FILE = os.path.join(SCRIPT_DIR, 'resume_data.yaml')
OUTPUT_HTML = os.path.join(SCRIPT_DIR, 'resume.html')

def parse_date(date_str):
    if not date_str or date_str.lower() == "present":
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
    clean = url.replace('https://', '').replace('http://', '').replace('mailto:', '')
    if clean.endswith('/'):
        clean = clean[:-1]
    return clean

CSS = """
    @page {
        size: A4 portrait;
        margin: 0; 
    }
    body {
        margin: 0;
        padding: 0;
        background-color: #525659;
        display: flex;
        justify-content: center;
        font-family: "Times New Roman", serif;
        -webkit-print-color-adjust: exact;
    }
    .resume-container {
        width: 21cm;
        min-height: 29.7cm;
        margin: 1cm auto;
        padding: 1cm;
        background-color: white;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        box-sizing: border-box;
        font-size: 12px;
        line-height: 1.3;
        color: black;
    }
    
    @media print {
        body {
            background-color: white;
            display: block;
        }
        .resume-container {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 1.5cm;
            box-shadow: none;
            zoom: 100%; 
        }
    }

    h1, h2, h3 { margin: 0; padding: 0; }
    h1 {
        font-size: 25px;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 2px;
    }
    h2 {
        display: flex;
        width: 100%;
        align-items: center;
        white-space: nowrap;
        font-size: 15px;
        text-transform: uppercase;
        font-weight: bold;
        margin: 0;
        margin-bottom: 8px;
        margin-top: 12px;
        padding-top: 4px;
        border-top: 1px solid #ddd;
    }
    h2::after {
        content: '';
        flex: 1;
        border-bottom: 2px solid #333;
        margin-left: 6px;
        margin-top: 8px;
    }
    h3 {
        font-size: 15px;
        font-weight: normal;
        margin-bottom: 2px;
        margin-top: -1px; 
    }
    
    .header-table { width: 100%; margin-bottom: 10px; border-collapse: collapse; }
    .header-left { text-align: left; vertical-align: top; }
    .header-right { 
        text-align: right; 
        font-size: 10px; 
        line-height: 1.5; 
        vertical-align: top; 
        padding-top: 6px;
    }
    
    .section { margin-bottom: 15px; }
    
    .entry { margin-bottom: 4px; }
    
    .job-title, .degree-info {
        font-weight: bold;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end; 
        margin-bottom: 2px;
    }
    .job-title span, .degree-info span {
        font-weight: bold; 
        font-size: 12px; 
    }

    .location, .institution {
        font-size: 11px;
        margin-top: 2px;
        margin-bottom: 5px;
    }
    
    ul {
        margin: 5px 0;
        padding-left: 20px;
        list-style-type: disc;
    }
    li { margin-bottom: 2px; }
    
    .grid-container {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0;
    }
    .grid-item {
        width: 50%;
        box-sizing: border-box;
        padding-right: 10px;
        margin-bottom: 5px;
        font-size: 11px;
    }
    .grid-item span:first-child {
        font-weight: bold;
    }
    
    .skills-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 4px 20px;
        padding-left: 20px;
        list-style-type: disc;
        margin: 12px 0;
        margin-top: 8px;
        font-size: 12px;
    }
    .skills-grid li {
        margin-bottom: -3px;
    }
"""

def generate_html(data):
    counts = data.get('counts', {})
    
    links = data.get('links', [])
    header_links = ""
    
    for link in links:
        url = link.get('url', '')
        val_to_show = url_display_clean(url)
        header_links += f"<div>{val_to_show}</div>"

    html = f"""<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>{data.get('name', 'Resume') + ' - Resume'}</title>
        <style>{CSS}</style>
    </head>
    <body>
    <div class="resume-container">
        <table class="header-table">
            <tr>
                <td class="header-left">
                    <h1>{data.get('fullName', '')}</h1>
                    <h3>{data.get('title', '')}</h3>
                </td>
                <td class="header-right">
                    {header_links}
                </td>
            </tr>
        </table>
    """
    
    if data.get('summary'):
        html += f"""
        <div class="section">
            <h2>PROFESSIONAL SUMMARY</h2>
            <p style="margin-top:2px;">{data.get('summary')}</p>
        </div>
        """

    edus = data.get('education', [])
    limit = counts.get('education', 100)
    if edus and limit > 0:
        html += '<div class="section"><h2>EDUCATION</h2>'
        for edu in edus[:limit]:
            date_str = format_date_display(edu.get('startDate'), edu.get('endDate'), edu.get('inProgress'))
            subtitle = edu.get('subtitle', [])
            if isinstance(subtitle, list): subtitle = ", ".join(subtitle)
            grade = edu.get('grade', '')
            grade_html = f"<b>&ensp;&#9679;&ensp;{grade}</b>" if grade else ""
            
            html += f"""
            <div class="entry">
                <div class="degree-info">{edu.get('title')} <span>{date_str}</span></div>
                <p class="institution">{subtitle}{grade_html}</p>
            </div>
            """
        html += "</div>"
        
    exps = data.get('experience', [])
    limit = counts.get('workExperience', 100)
    if exps and limit > 0:
        html += '<div class="section"><h2>WORK EXPERIENCE</h2>'
        for exp in exps[:limit]:
            date_str = format_date_display(exp.get('startDate'), exp.get('endDate'), exp.get('inProgress'))
            location = exp.get('location', '')
            date_display = f"{location} &#9679; {date_str}" if location else date_str
            
            html += f"""
            <div class="entry">
                <div class="job-title">{exp.get('title')} <span>{date_display}</span></div>
                <ul>
            """
            subtitles = exp.get('subtitle', [])
            if isinstance(subtitles, str): subtitles = [subtitles]
            for sub in subtitles:
                if sub:
                    html += f"<li>{sub}</li>"
            html += "</ul></div>"
        html += "</div>"
        
    projs = data.get('projects', [])
    limit = counts.get('projects', 100)
    if projs and limit > 0:
        html += '<div class="section"><h2>PROJECTS</h2>'
        for proj in projs[:limit]:
            p_date = format_date_display(proj.get('date'))
            date_html = f"<span>{p_date}</span>" if p_date else ""
            
            html += f"""
            <div class="entry">
                <div class="job-title">{proj.get('title')} {date_html}</div>
                <ul><li>{proj.get('desc')}</li></ul>
            </div>
            """
        html += "</div>"

    pubs = data.get('publications', [])
    limit = counts.get('publications', 100)
    if pubs and limit > 0:
        html += '<div class="section"><h2>PUBLICATIONS</h2><div class="grid-container">'
        for p in pubs[:limit]:
            d = format_date_display(p.get('date'))
            html += f'<div class="grid-item"><span>{p.get("name")}</span><br/><span>{p.get("publishing")} &#9679; {d}</span></div>'
        html += "</div></div>"
    
    certs = data.get('certificates', [])
    limit = counts.get('certificates', 100)
    if certs and limit > 0:
        html += '<div class="section"><h2>CERTIFICATIONS</h2><div class="grid-container">'
        for c in certs[:limit]:
             d = format_date_display(c.get('date'))
             html += f'<div class="grid-item"><span>{c.get("title")}</span><br/><span>{c.get("subtitle")} &#9679; {d}</span></div>'
        html += '</div></div>'
        
    skills = data.get('skills', {})
    limit = counts.get('skills', 100)
    if skills and limit > 0:
        flat_skills = []
        for s in skills.get('top', []): flat_skills.append(s.get('title'))
        for s in skills.get('main', []): flat_skills.append(s.get('name'))
        for s in skills.get('other', []): flat_skills.append(s.get('title'))
        
        flat_skills = flat_skills[:limit]
        
        html += '<div class="section"><h2>SKILLS</h2><ul class="skills-grid">'
        for skill in flat_skills:
            html += f'<li>{skill}</li>'
        html += '</ul></div>'

    html += "</div></body></html>"
    return html

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
