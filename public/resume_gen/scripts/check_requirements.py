import sys
import subprocess
import os
import importlib

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REQUIREMENTS_PATH = os.path.join(SCRIPT_DIR, 'requirements.txt')

def ensure_requirements():
    REQUIRED_IMPORTS = [
        ('yaml', 'pyyaml'),
        ('dotenv', 'python-dotenv'),
        ('google.genai', 'google-genai'),
        ('playwright', 'playwright'),
        ('pypdf', 'pypdf'),
    ]
    
    missing = []
    for mod_name, pkg_name in REQUIRED_IMPORTS:
        try:
            if '.' in mod_name:
                parts = mod_name.split('.')
                importlib.import_module(parts[0])
                importlib.import_module(mod_name)
            else:
                importlib.import_module(mod_name)
        except ImportError:
            missing.append(pkg_name)

    if missing:
        print(f"\nMissing required python packages: {', '.join(missing)}")
        if os.path.exists(REQUIREMENTS_PATH):
            print(f"Installing requirements from: {REQUIREMENTS_PATH}...")
            try:
                subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", REQUIREMENTS_PATH])
                print("Packages installed successfully!")
                
                # Special setup for playwright browser binaries
                if 'playwright' in missing:
                    print("Installing Playwright Chromium browser binaries...")
                    subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium"])
                    print("Playwright browser binaries installed successfully!")
            except Exception as e:
                print(f"Error installing packages: {e}")
                print(f"Please install them manually using: pip install {' '.join(missing)}")
                sys.exit(1)
        else:
            # Fallback if requirements.txt is not found
            try:
                print("Installing missing packages...")
                subprocess.check_call([sys.executable, "-m", "pip", "install"] + missing)
                if 'playwright' in missing:
                    subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium"])
                print("Packages installed successfully!")
            except Exception as e:
                print(f"Error installing packages: {e}")
                sys.exit(1)

ensure_requirements()
