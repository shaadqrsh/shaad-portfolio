import os
import re
import json
import ast

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
RESUME_GEN_DIR = os.path.dirname(SCRIPT_DIR)
PUBLIC_DIR = os.path.dirname(RESUME_GEN_DIR)
PROJECT_ROOT = os.path.dirname(PUBLIC_DIR)
LIB_DIR = os.path.join(PROJECT_ROOT, 'src', 'lib')
OUTPUT_FILE = os.path.join(RESUME_GEN_DIR, 'resume_data.yaml')

def read_file(filename):
    path = os.path.join(LIB_DIR, filename)
    if not os.path.exists(path):
        return ""
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def parse_js_object(content, var_name):
    pattern = re.compile(
        r'(?:export\s+)?const\s+' + re.escape(var_name) + r'\s*(?::[^=]+)?=\s*(.*?)(?=\n(?:export\s+)?const|\nexport\s+default|\Z)', 
        re.DOTALL
    )
    match = pattern.search(content)
    
    if not match:
        return None
    
    raw_value = match.group(1).strip()
    if raw_value.endswith(';'):
        raw_value = raw_value[:-1]
        
    return clean_and_parse(raw_value)

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

def clean_and_parse(raw_value):
    # Remove comments safely (respecting strings, including backticks and escaped quotes)
    pattern = r'("(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|`(?:\\.|[^`\\])*`)|(/\*.*?\*/|//[^\r\n]*$)'
    def replace_comments(match):
        if match.group(2): return ""
        return match.group(1)
    
    raw_value = re.sub(pattern, replace_comments, raw_value, flags=re.DOTALL | re.MULTILINE)
    
    # Handle undefined -> null
    raw_value = raw_value.replace('undefined', 'null')
    
    # Convert backticks to double quotes (escaping inner double quotes)
    def replace_backticks(match):
        # Escape double quotes inside the string
        content = match.group(1).replace('"', '\\"')
        # Replace newlines with \n for JSON compatibility
        content = content.replace('\n', '\\n')
        return f'"{content}"'
        
    raw_value = re.sub(r'`((?:\\.|[^`\\])*)`', replace_backticks, raw_value, flags=re.DOTALL)
    
    # Quote keys: key: -> "key":
    raw_value = re.sub(r'([{,]\s*)([a-zA-Z0-9_]+)\s*:', r'\1"\2":', raw_value)
    
    # Remove trailing commas
    raw_value = re.sub(r',\s*([}\]])', r'\1', raw_value)
    
    try:
        return json.loads(raw_value)
    except:
        # Try adjusting for Python syntax (in case JSON fails but it's close to Python)
        # Note: trailing commas are allowed in Python, but we removed them for JSON.
        # Python literal_eval handles some things JSON doesn't (like None vs null if we swapped them)
        py_val = raw_value.replace('true', 'True').replace('false', 'False').replace('null', 'None')
        try:
           return ast.literal_eval(py_val)
        except:
           pass
           
    return raw_value 

def to_yaml(data, indent=0):
    yaml_str = ""
    prefix = "  " * indent
    if isinstance(data, dict):
        for k, v in data.items():
            if v is None: continue 
            if isinstance(v, (dict, list)):
                yaml_str += f"{prefix}{k}:\n{to_yaml(v, indent + 1)}"
            else:
                yaml_str += f"{prefix}{k}: {format_yaml_value(v)}\n"
    elif isinstance(data, list):
        for item in data:
            if isinstance(item, (dict, list)):
                sub_yaml = to_yaml(item, indent + 1)
                sub_yaml = sub_yaml.lstrip() 
                yaml_str += f"{prefix}- {sub_yaml}"
            else:
                yaml_str += f"{prefix}- {format_yaml_value(item)}\n"
    return yaml_str

def format_yaml_value(val):
    if val is None: return ""
    if isinstance(val, bool): return "true" if val else "false"
    if isinstance(val, (int, float)): return str(val)
    if isinstance(val, str):
        if '\n' in val:
             return f"|\n    {val.replace(chr(10), chr(10) + '    ')}"
        should_quote = False
        val_s = val.strip()
        unsafe_starts = ['-', '?', ':', ',', '[', ']', '{', '}', '&', '*', '! ', '|', '>', '%', '@', '`', ' ']
        for ch in unsafe_starts:
            if val_s.startswith(ch):
                should_quote = True
                break
        if ' #' in val or val_s.startswith('#'): should_quote = True
        if ': ' in val_s: should_quote = True
        
        if should_quote: return f'"{val}"'
        return val
    return str(val)

def main():
    print("Starting conversion...")
    resume_data = {}
    
    data_content = read_file('Data.ts')
    resume_data['name'] = parse_js_object(data_content, 'name')
    resume_data['title'] = parse_js_object(data_content, 'title')
    resume_data['fullName'] = parse_js_object(data_content, 'fullName')
    resume_data['summary'] = parse_js_object(data_content, 'homePara')
    resume_data['about'] = parse_js_object(data_content, 'whoAmI')
    
    resume_data['education'] = parse_js_object(read_file('Education.ts'), 'education')
    resume_data['experience'] = parse_js_object(read_file('Experience.ts'), 'experience')
    resume_data['publications'] = parse_js_object(read_file('Publications.ts'), 'Publications')
    resume_data['certificates'] = parse_js_object(read_file('Certificates.ts'), 'Certificates')
    
    sc = read_file('Skills.ts')
    resume_data['skills'] = {
        'top': parse_js_object(sc, 'top3'),
        'main': parse_js_object(sc, 'skills'),
        'other': parse_js_object(sc, 'nameless')
    }
    
    resume_data['projects'] = parse_js_object(read_file('Projects.ts'), 'projects')

    resume_data['counts'] = {
        'workExperience': parse_js_object(data_content, 'maxWorkExperienceCount'),
        'projects': parse_js_object(data_content, 'maxProjectsCount'),
        'education': parse_js_object(data_content, 'maxEducationCount'),
        'certificates': parse_js_object(data_content, 'maxCertificatesCount'),
        'skills': parse_js_object(data_content, 'maxSkillsCount'),
        'publications': parse_js_object(data_content, 'maxPublicationsCount')
    }
    
    header_content = read_file('header.ts')
    raw_links = []
    
    parsed_links = parse_js_object(header_content, 'links')
    if isinstance(parsed_links, list):
        for link in parsed_links:
            if isinstance(link, dict) and link.get('href') and link.get('text'):
                raw_links.append({
                    'text': link.get('text'),
                    'url': link.get('href')
                })
    
    if not raw_links:
        print("Fallback: Using simple regex for Links...")
        matches = re.finditer(r'href:\s*["\']([^"\']+)["\'].*?text:\s*["\']([^"\']+)["\']', header_content, re.DOTALL)
        for m in matches:
             raw_links.append({'url': m.group(1), 'text': m.group(2)})
        matches2 = re.finditer(r'text:\s*["\']([^"\']+)["\'].*?href:\s*["\']([^"\']+)["\']', header_content, re.DOTALL)
        for m in matches2:
             if not any(l['url'] == m.group(2) for l in raw_links):
                 raw_links.append({'text': m.group(1), 'url': m.group(2)})
                 
    final_links = []
    
    linkedin = next((l for l in raw_links if l.get('text') == 'LinkedIn'), None)
    if linkedin:
        final_links.append(linkedin)
        
    final_links.append({'text': 'Website', 'url': 'https://www.shaadqrsh.in'})
    
    email = next((l for l in raw_links if l.get('text') == 'Email'), None)
    if email:
        final_links.append(email)

    if final_links:
        resume_data['links'] = final_links

    project_id_content = read_file('projectId.ts')
    
    project_dates = {}
    
    parsed_meta = None
    cleaned_proj_content = re.sub(r':\s*{[^}]+}\s*=', ' =', project_id_content)
    parsed_meta = parse_js_object(cleaned_proj_content, 'data')
    
    if parsed_meta and isinstance(parsed_meta, dict):
        for k, v in parsed_meta.items():
            if isinstance(v, dict) and 'date' in v:
                project_dates[k] = v['date']
    else:
        print("Fallback: Using regex for Project Dates...")
        current_key = None
        for line in project_id_content.splitlines():
            line = line.strip()
            m_key = re.match(r'^([a-zA-Z0-9_]+):\s*\{', line)
            if m_key:
                current_key = m_key.group(1)
                continue
                
            if current_key:
                m_date = re.match(r"date:\s*['\"]([^'\"]+)['\"]", line)
                if m_date:
                    project_dates[current_key] = m_date.group(1)
    
    if project_dates and isinstance(resume_data.get('projects'), list):
        for proj in resume_data['projects']:
             url_key = proj.get('url')
             if url_key in project_dates:
                 proj['date'] = project_dates[url_key]
    
    clean_data(resume_data)
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(to_yaml(resume_data))
        
    print("Done!")

if __name__ == "__main__":
    main()
