"""Decide whether public/resume.pdf is out of date, without rendering a PDF.

The fingerprint is a hash of the resume HTML generate_resume.py would write
plus generate_pdf.py's source, so it changes exactly when the PDF would. Edits
to site-only fields in resume_data.json (images, testimonials, project pages)
leave it alone. The last fingerprint a PDF was built from is committed in
.github/resume-fingerprint.

Uses only the standard library, because Vercel's ignored build step runs it
before anything is installed.

  --check   exit 0 if the committed PDF is current, 1 if it needs rebuilding
  --write   record the current fingerprint (after building the PDF)
  --vercel  Vercel's ignoreCommand: exit 0 (skip this deploy) when the PDF is
            stale, because the Regenerate resume Action is about to push a
            commit that deploys with the new one; exit 1 (build) otherwise.
            A commit message containing [force deploy] always builds.
"""
import contextlib
import hashlib
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPTS = ROOT / 'public' / 'resume_gen' / 'scripts'
STORED = ROOT / '.github' / 'resume-fingerprint'


def current():
    sys.path.insert(0, str(SCRIPTS))
    import generate_resume
    # load_base_data prints progress; keep stdout for the result.
    with contextlib.redirect_stdout(sys.stderr):
        html = generate_resume.generate_html(generate_resume.load_base_data())
    pdf_code = (SCRIPTS / 'generate_pdf.py').read_text(encoding='utf-8')
    h = hashlib.sha256()
    for part in (html, pdf_code):
        h.update(part.replace('\r\n', '\n').encode('utf-8'))
        h.update(b'\0')
    return h.hexdigest()


def stored():
    return STORED.read_text(encoding='utf-8').strip() if STORED.exists() else ''


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else ''
    if mode == '--write':
        STORED.write_text(current() + '\n', encoding='utf-8')
        return 0
    if mode == '--check':
        fresh = current() == stored()
        print('resume.pdf is current' if fresh else 'resume.pdf is out of date')
        return 0 if fresh else 1
    if mode == '--vercel':
        if '[force deploy]' in os.environ.get('VERCEL_GIT_COMMIT_MESSAGE', ''):
            print('[force deploy] in commit message: building')
            return 1
        if current() == stored():
            print('resume.pdf is current: building')
            return 1
        print('resume.pdf is out of date: skipping, the Regenerate resume '
              'Action will push a commit that deploys with the new PDF')
        return 0
    print(__doc__)
    return 2


if __name__ == '__main__':
    sys.exit(main())
