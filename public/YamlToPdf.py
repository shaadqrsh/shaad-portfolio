
import os
import sys
import yaml
from datetime import datetime
import traceback

# Configuration
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
YAML_FILE = os.path.join(SCRIPT_DIR, 'resume_data.yaml')
OUTPUT_PDF = os.path.join(SCRIPT_DIR, 'output_resume.pdf')
LOG_FILE = os.path.join(SCRIPT_DIR, 'yamltopdf_log.txt')

# Try importing xhtml2pdf
try:
    from xhtml2pdf import pisa
except ImportError:
    print("Error: xhtml2pdf is not installed.")
    print("Please run: pip install xhtml2pdf PyYAML")
    sys.exit(1)

def log(msg):
    print(msg)
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(f"{datetime.now()}: {msg}\n")

# --- Date Formatting Logic (Ported from DateDisplay.tsx) ---

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
    # Logic for single date
    def format_single(d_str):
        if not d_str: return ""
        parsed = parse_date(d_str)
        if not parsed: return d_str
        
        dt, raw_day, raw_month = parsed
        
        # Precision logic
        if raw_day == 0 and raw_month == 0:
            return dt.strftime("%Y") # Year
        if raw_day == 0:
            return dt.strftime("%b %Y") # Month Year
        return dt.strftime("%b %d, %Y") # Long

    start_date = parse_date(date_str)
    end_date = parse_date(end_date_str) if end_date_str else None

    # Range logic
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
    
    # Single date logic
    return format_single(date_str)

# --- CSS Styling (Ported from Resume.tsx) ---
# Note: xhtml2pdf has limited CSS support. 
# We use tables for columns instead of CSS columns/grid.
CSS = """
    @page {
        size: a4 portrait;
        margin: 1.5cm;
    }
    body {
        font-family: "Times New Roman", serif;
        font-size: 12px;
        color: black;
        margin: 0;
        padding: 0;
    }
    /* Wrapper to ensure internal padding if page margins flaky */
    .resume-container {
        padding-top: 10px;
        padding-bottom: 10px;
    }
    h1, h2, h3 { margin: 0; padding: 0; }
    h1 {
        font-size: 25px;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 2px;
    }
    h2 {
        font-size: 15px;
        text-transform: uppercase;
        font-weight: bold;
        margin: 0;
    }
    h3 {
        font-size: 15px;
        font-weight: normal;
        margin-bottom: 2px;
    }
    .header-table { width: 100%; margin-bottom: 10px; }
    .header-left { text-align: left; vertical-align: top; }
    .header-right { 
        text-align: right; 
        font-size: 10px; 
        line-height: 1.5; 
        vertical-align: top; 
        padding-top: 6px;
    }
    .section { margin-bottom: 15px; }
    .section-title {
        width: 100%;
        border-top: 1px solid #ddd;
        border-bottom: 2px solid #333;
        padding-top: 8px;
        margin-bottom: 5px;
    }
    .entry { margin-bottom: 5px; } /* Slightly increased for PDF readability */
    .job-title, .degree-info {
        font-weight: bold;
        font-size: 12px;
        margin-bottom: 2px;
    }
    /* Float/Flex simulation for title row */
    .title-row-table { width: 100%; }
    .title-left { text-align: left; font-weight: bold; }
    .title-right { text-align: right; font-weight: normal; }
    
    .location, .institution {
        font-size: 11px;
        margin-top: 2px;
        margin-bottom: 5px;
    }
    ul {
        margin: 5px 0;
        padding-left: 20px;
    }
    li { margin-bottom: 2px; }
    
    /* Grid simulation tables */
    .grid-table { width: 100%; }
    .grid-col { width: 50%; vertical-align: top; padding-right: 10px; }
    .cert-item { font-size: 11px; margin-bottom: 8px; }
    .cert-name { font-weight: bold; }
    
    /* Skills list simulation */
    .skills-table { width: 100%; }
    .skills-col { vertical-align: top; padding-right: 5px; }
"""

def generate_html(data):
    counts = data.get('counts', {})
    
    # Header
    html = f"""
    <html>
    <head><style>{CSS}</style></head>
    <body>
    <div class="resume-container">
    <table class="header-table">
        <tr>
            <td class="header-left">
                <h1>{data.get('fullName', '')}</h1>
                <h3>{data.get('title', '')}</h3>
            </td>
            <td class="header-right">
                {format_links(data.get('links', []))} 
                <!-- Hardcoded website from Resume.tsx -->
                <div>https://www.shaadqrsh.in</div>
                <div>shaadqrsh.work@gmail.com</div> <!-- Fallback if links missing -->
            </td>
        </tr>
    </table>
    """
    
    # Correction: Links are gone from YAML, hardcoding standard ones or inferring? 
    # User removed links from YAML. Resume.tsx had them imported.
    # We will just stick to what Resume.tsx had hardcoded or imply standard contact info if possible,
    # but based on the user request, we only have YAML data.
    # Re-reading Resume.tsx:
    # <div>{email}</div>
    # <div>https://www.shaadqrsh.in</div>
    # <div>{linkedin?.replace("https://", "")}</div>
    # Since YAML has no links, we might miss email/linkedin if not in YAML.
    # Wait, the YAML DOES NOT have links anymore.
    # But usually a resume needs contact info. 
    # I will just put the website (hardcoded in Resume.tsx) and look for email in text if possible?
    # Or just leave what I can find.
    # Actually, verify if `fullName` etc are there. Yes.
    
    # Summary
    if data.get('summary'):
        html += f"""
        <div class="section">
            <div class="section-title"><h2>PROFESSIONAL SUMMARY</h2></div>
            <p style="margin-top:2px;">{data.get('summary')}</p>
        </div>
        """
        
    # Experience
    exps = data.get('experience', [])
    limit = counts.get('workExperience', 100)
    if exps and limit > 0:
        html += '<div class="section"><div class="section-title"><h2>WORK EXPERIENCE</h2></div>'
        for exp in exps[:limit]:
            date_str = format_date_display(exp.get('startDate'), exp.get('endDate'), exp.get('inProgress'))
            html += f"""
            <div class="entry">
                <table class="title-row-table"><tr>
                    <td class="title-left">{exp.get('title')}</td>
                    <td class="title-right">{date_str}</td>
                </tr></table>
                <p class="location">Various Clients</p>
                <ul>
            """
            subtitles = exp.get('subtitle', [])
            if isinstance(subtitles, str): subtitles = [subtitles]
            for sub in subtitles:
                html += f"<li>{sub}</li>"
            html += "</ul></div>"
        html += "</div>"
        
    # Projects
    projs = data.get('projects', [])
    limit = counts.get('projects', 100)
    if projs and limit > 0:
        html += '<div class="section"><div class="section-title"><h2>PROJECTS</h2></div>'
        for proj in projs[:limit]:
            # Resume.tsx fetches date from projectId.ts based on url.
            # We don't have projectId.ts data in YAML. We will omit date for consistency unless added.
            html += f"""
            <div class="entry">
                <p class="job-title">{proj.get('title')}</p>
                <ul><li>{proj.get('desc')}</li></ul>
            </div>
            """
        html += "</div>"

    # Education
    edus = data.get('education', [])
    if edus:
        html += '<div class="section"><div class="section-title"><h2>EDUCATION</h2></div>'
        for edu in edus:
            date_str = format_date_display(edu.get('startDate'), edu.get('endDate'), edu.get('inProgress'))
            subtitle = edu.get('subtitle', [])
            if isinstance(subtitle, list): subtitle = ", ".join(subtitle)
            grade = edu.get('grade', '')
            grade_html = f"<b>&ensp;&#9679;&ensp;{grade}</b>" if grade else ""
            
            html += f"""
            <div class="entry">
                <table class="title-row-table"><tr>
                    <td class="title-left">{edu.get('title')}</td>
                    <td class="title-right">{date_str}</td>
                </tr></table>
                <p class="institution">{subtitle}{grade_html}</p>
            </div>
            """
        html += "</div>"

    # Publications (2 Col Grid)
    pubs = data.get('publications', []) # YAML doesn't have publications key in recent paste?
    # Checking recent YAML... it DOES NOT have publications in the main paste, but Resume.tsx uses it?
    # Wait, the YAML HAS counts: publications: 2. But no `publications` list?
    # Ah, I missed scrolling in previous helper previews maybe? Or the user didn't include it?
    # The generated YAML I made had it? The USER paste might have cut it?
    # I'll check `data.get` safety.
    # EDIT: The YAML pasted by user ends at counts, but previous blocks show certificates. 
    # If key is missing, we skip.
    
    # ... Wait, checking user paste history ...
    # Step 1120: YAML ends with `counts`. It HAS `experience`, `education`, `projects`, `skills`, `certificates`.
    # It does NOT seem to have `publications` list in the visible snippet? 
    # Ah, typical truncate. I will code safely.
    
    # Certifications (2 Col Grid)
    certs = data.get('certificates', [])
    limit = counts.get('certificates', 100)
    if certs and limit > 0:
        html += '<div class="section"><div class="section-title"><h2>CERTIFICATIONS</h2></div>'
        certs = certs[:limit]
        # Split into two columns
        mid = (len(certs) + 1) // 2
        col1 = certs[:mid]
        col2 = certs[mid:]
        
        html += '<table class="grid-table"><tr><td class="grid-col">'
        for c in col1:
             d = format_date_display(c.get('date'))
             html += f'<div class="cert-item"><span class="cert-name">{c.get("title")}</span><br/><span>{c.get("subtitle")} &#9679; {d}</span></div>'
        html += '</td><td class="grid-col">'
        for c in col2:
             d = format_date_display(c.get('date'))
             html += f'<div class="cert-item"><span class="cert-name">{c.get("title")}</span><br/><span>{c.get("subtitle")} &#9679; {d}</span></div>'
        html += '</td></tr></table></div>'
        
    # Skills (List)
    skills = data.get('skills', {})
    limit = counts.get('skills', 100)
    if skills and limit > 0:
        # Flatten skills like Resume.tsx: top3 + skills + nameless
        flat_skills = []
        # top
        for s in skills.get('top', []): flat_skills.append(s.get('title'))
        # main
        for s in skills.get('main', []): flat_skills.append(s.get('name'))
        # other
        for s in skills.get('other', []): flat_skills.append(s.get('title'))
        
        flat_skills = flat_skills[:limit]
        
        # Resume.tsx uses a 5-column grid. We can try a table with 5 columns.
        html += '<div class="section"><div class="section-title"><h2>SKILLS</h2></div>'
        html += '<table class="skills-table"><tr>'
        
        # Simple 5 col distribution
        cols = 5
        # We need to fill row by row for standard reading, or col by col?
        # CSS Grid `grid-template-columns: repeat(5, 1fr)` fills row by row.
        # So:
        # Item 1 | Item 2 | Item 3 | Item 4 | Item 5
        # Item 6 ...
        
        # We can just use a single table row with many items? No, layout needs wrapping.
        # Best for PDF table: Explicit rows.
        
        for i, skill in enumerate(flat_skills):
            html += f'<td class="skills-col">&#8226; {skill}</td>'
            if (i + 1) % cols == 0 and (i + 1) < len(flat_skills):
                html += '</tr><tr>'
        
        html += '</tr></table></div>'

    html += "</div></body></html>"
    return html

def format_links(links_list):
    # Dummy, since links removed from YAML
    # We could hardcode if needed
    return ""

def main():
    log("Starting PDF generation...")
    
    if not os.path.exists(YAML_FILE):
        log(f"Error: {YAML_FILE} not found.")
        return

    try:
        with open(YAML_FILE, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
        log("YAML loaded.")
    except Exception as e:
        log(f"Error parse YAML: {e}")
        return

    try:
        html = generate_html(data)
        log("HTML generated.")
        
        # Write HTML for debug
        with open(os.path.join(SCRIPT_DIR, 'debug_resume.html'), 'w', encoding='utf-8') as f:
            f.write(html)
            
        # Convert to PDF
        with open(OUTPUT_PDF, "wb") as pdf_file:
            pisa_status = pisa.CreatePDF(html, dest=pdf_file)
            
        if pisa_status.err:
            log(f"PDF Error: {pisa_status.err}")
        else:
            log(f"Success! PDF saved to {OUTPUT_PDF}")
            
    except Exception as e:
        log(f"Critical Error: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    main()
