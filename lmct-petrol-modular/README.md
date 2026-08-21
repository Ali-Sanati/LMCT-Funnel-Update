# LMCT+ Petrol Modular Landing Page

The original single-file page has been split into independent section partials while preserving the existing IDs, classes, form fields, calculator hooks, tier logic, links, and JavaScript behavior.

## Structure

- `index.html` — prebuilt page, ready to preview.
- `src/template.html` — document shell and ordered section includes.
- `src/styles.css` — shared page styles.
- `src/app.js` — shared page behavior.
- `src/sections/` — one HTML file per major page section.
- `build.py` — combines the section files into `index.html`.

## Rebuild after editing a section

```bash
python build.py
```

## Preview locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Required assets

Keep these existing files at the same paths:

- `assets/lmct-petrol-logo.png`
- `assets/lmct-preston-station.png`

The folder contains an asset note, but not the original images because they were not included in the uploaded HTML file.

## Section files

1. Header
2. Hero
3. Trust strip
4. Savings calculator
5. Membership benefits
6. How it works
7. Signup
8. Member stories
9. Locations
10. Founder story
11. FAQs
12. Save + Win giveaways
13. Disclaimer
14. Final CTA
15. Footer
16. Mobile sticky CTA
