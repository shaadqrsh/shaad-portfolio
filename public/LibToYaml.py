
import os
import re
import json
import ast

# Configuration
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR) # public/ -> root
LIB_DIR = os.path.join(PROJECT_ROOT, 'src', 'lib')
OUTPUT_FILE = os.path.join(SCRIPT_DIR, 'resume_data.yaml')

def read_file(filename):
    path = os.path.join(LIB_DIR, filename)
    if not os.path.exists(path):
        print(f"Warning: File not found: {path}")
        return ""
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def parse_js_object(content, var_name):
    """
    Extracts a variable definition from TS content and parses it into a Python object.
    """
    # Try finding "export const varName =" OR "const varName ="
    # We prioritize "export const" but fallback to "const"
    pattern = re.compile(r'(?:export\s+)?const\s+' + re.escape(var_name) + r'\s*=\s*(.*?)(?=\n(?:export\s+)?const|\nexport\s+default|\Z)', re.DOTALL)
    match = pattern.search(content)
    
    if not match:
        print(f"Warning: Could not find variable '{var_name}'")
        return None
    
    raw_value = match.group(1).strip()
    # Remove trailing semicolon
    if raw_value.endswith(';'):
        raw_value = raw_value[:-1]
        
    return clean_and_parse(raw_value)

def clean_data(data):
    """
    Recursively remove keys that are not needed for the resume YAML (images, icons).
    """
    if isinstance(data, dict):
        # Create a copy of keys to avoid modification during iteration issues
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
    # 1. Remove comments using regex
    # Block comments
    raw_value = re.sub(r'/\*.*?\*/', '', raw_value, flags=re.DOTALL)
    # Line comments
    raw_value = re.sub(r'//.*', '', raw_value)
    
    # 2. Convert backticks to double quotes (for template literals)
    raw_value = raw_value.replace('`', '"')
    
    # 3. Handle keys: "key:" -> "key": "
    raw_value = re.sub(r'([{,]\s*)([a-zA-Z0-9_]+)\s*:', r'\1"\2":', raw_value)
    
    # 4. Handle trailing commas (JSON doesn't allow them)
    raw_value = re.sub(r',\s*([}\]])', r'\1', raw_value)
    
    # 5. Skip aggressive quote replacement. 
    # Previous attempts to regex replace '...' with "..." broke valid double-quoted strings containing single quotes.
    # We will rely on ast.literal_eval to handle single-quoted strings if json.loads fails.
    
    try:
        return json.loads(raw_value)
    except:
        # If normal parsing fails, try to strip potential double-wrapping
        if raw_value.startswith('""') and raw_value.endswith('""'):
             raw_value = raw_value[1:-1]

        # Fallback for Python syntax vs JS
        raw_value = raw_value.replace('true', 'True').replace('false', 'False')
        try:
           return ast.literal_eval(raw_value)
        except:
           # Final fallback: Strip outer quotes if present
           s = raw_value.strip()
           if (s.startswith('"') and s.endswith('"')) or (s.startswith("'") and s.endswith("'")):
               return s[1:-1]
           return raw_value

def to_yaml(data, indent=0):
    """
    Simple recursive YAML dumper.
    """
    yaml_str = ""
    prefix = "  " * indent
    
    if isinstance(data, dict):
        for k, v in data.items():
            if v is None: continue # Skip nulls
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
    if val is None:
        return ""
    if isinstance(val, bool):
        return "true" if val else "false"
    if isinstance(val, int) or isinstance(val, float):
        return str(val)
    if isinstance(val, str):
        # Multiline strings
        if '\n' in val:
             return f"|\n    {val.replace(chr(10), chr(10) + '    ')}"
        
        # Check for special characters needing quotes
        # Relaxed rules: Only quote if necessary for validity
        should_quote = False
        val_s = val.strip()
        
        # Dangerous start characters
        unsafe_starts = ['-', '?', ':', ',', '[', ']', '{', '}', '&', '*', '! ', '|', '>', '%', '@', '`', ' ']
        
        for ch in unsafe_starts:
            if val_s.startswith(ch):
                should_quote = True
                break
        
        # Hash indicates comment ONLY if preceded by space (or at start)
        if ' #' in val or val_s.startswith('#'):
            should_quote = True
            
        # Colon followed by space CAN be problematic in flow style, but usually fine in block style values.
        # However, to meet user request "never have that", we risk unquoting it.
        # Standard YAML 1.2: "key: value" is safe.
        # But if the string IS "key: value", it's safer to not quote if we are sure it's a value?
        # We will assume safe unless it looks like a key-value mapping inside valid YAML structures
        # For simple strings like "Score: 95%", it is safe unquoted.
        
        # ERROR FIX: "Score: 84%" caused "mapping values are not allowed here".
        # This is because YAML parses "key: value" as a mapping even inside a value if not quoted.
        # We MUST quote if we detecting ": ".
        if ': ' in val_s:
            should_quote = True
        
        if should_quote:
            return f'"{val}"'
        return val
    return str(val)

def main():
    print("Starting conversion...")
    
    resume_data = {}
    
    # Data.ts
    print("Reading Data.ts...")
    data_content = read_file('Data.ts')
    resume_data['name'] = parse_js_object(data_content, 'name')
    resume_data['title'] = parse_js_object(data_content, 'title')
    resume_data['fullName'] = parse_js_object(data_content, 'fullName')
    resume_data['summary'] = parse_js_object(data_content, 'homePara')
    resume_data['about'] = parse_js_object(data_content, 'whoAmI')
    
    # Experience.ts
    print("Reading Experience.ts...")
    exp_content = read_file('Experience.ts')
    resume_data['experience'] = parse_js_object(exp_content, 'experience')
    
    # Education.ts
    print("Reading Education.ts...")
    edu_content = read_file('Education.ts')
    resume_data['education'] = parse_js_object(edu_content, 'education')
    
    # Projects.ts
    print("Reading Projects.ts...")
    proj_content = read_file('Projects.ts')
    resume_data['projects'] = parse_js_object(proj_content, 'projects')
    
    # Skills.ts
    print("Reading Skills.ts...")
    skills_content = read_file('Skills.ts')
    resume_data['skills'] = {
        'top': parse_js_object(skills_content, 'top3'),
        'main': parse_js_object(skills_content, 'skills'),
        'other': parse_js_object(skills_content, 'nameless')
    }
    
    # Certificates.ts
    print("Reading Certificates.ts...")
    cert_content = read_file('Certificates.ts')
    resume_data['certificates'] = parse_js_object(cert_content, 'Certificates')
    
    # Certificates.ts
    print("Reading Certificates.ts...")
    cert_content = read_file('Certificates.ts')
    resume_data['certificates'] = parse_js_object(cert_content, 'Certificates')

    # Counts (from Data.ts)
    resume_data['counts'] = {
        'workExperience': parse_js_object(data_content, 'maxWorkExperienceCount'),
        'projects': parse_js_object(data_content, 'maxProjectsCount'),
        'certificates': parse_js_object(data_content, 'maxCertificatesCount'),
        'skills': parse_js_object(data_content, 'maxSkillsCount'),
        'publications': parse_js_object(data_content, 'maxPublicationsCount')
    }
    
    # Clean data (remove images, icons)
    clean_data(resume_data)
    
    # Write to YAML
    print(f"Writing to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(to_yaml(resume_data))
        
    print("Done!")

if __name__ == "__main__":
    try:
        with open(os.path.join(SCRIPT_DIR, 'debug_log.txt'), 'w') as log:
            log.write(f"Script started at {SCRIPT_DIR}\n")
            log.write(f"Project root calculated: {PROJECT_ROOT}\n")
            log.write(f"Lib dir calculated: {LIB_DIR}\n")
            if not os.path.exists(LIB_DIR):
                log.write(f"ERROR: Lib dir does not exist: {LIB_DIR}\n")
            
            log.write("Running conversion...\n")
            main()
            log.write("Completed successfully.\n")
    except Exception as e:
        with open(os.path.join(SCRIPT_DIR, 'debug_log.txt'), 'a') as log:
            log.write(f"CRITICAL ERROR: {e}\n")
            import traceback
            traceback.print_exc(file=log)
