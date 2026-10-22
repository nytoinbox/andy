# Anakpong Achotipong — Sushi Chef Portfolio

Personal portfolio website (English / ไทย) with a dark theme and animations.

## Run locally

Static site, no build step:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Files

- `index.html` — page content
- `assets/css/style.css` — styles and animations
- `assets/js/main.js` — language toggle, scroll effects, gallery lightbox, contact form
- `assets/img/` — photos
- `assets/resume/` — downloadable resume (PDF)
- `tools/build_resume.py` — regenerates the resume PDF (`pip install reportlab`, then `python3 tools/build_resume.py`)

## Editing

- Change text: edit `index.html` (English) and the matching key in the `i18n` object in `assets/js/main.js` (`en` and `th`).
- Change resume content: edit `tools/build_resume.py` and run it.

See [CLAUDE.md](CLAUDE.md) for detailed developer notes, privacy rules and deployment.

## Deploy

GitHub Pages: Settings → Pages → Deploy from a branch → `claude/portfolio-site`, `/ (root)`.
