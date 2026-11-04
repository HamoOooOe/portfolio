# Mohamed Moussa — Portfolio

Personal portfolio of Mohamed Moussa, Flutter developer in Alexandria, Egypt.

Live: https://portfolio-ham-ooo-oe.vercel.app

## What is on the page

- **Hero**: who I am, with the ScanDesk screens cycling on a phone.
- **Work**: ScanDesk (a scroll story with a sticky phone), YLB (an interactive price engine), Waslny, and the games.
- **Services**: what I take on as a freelancer (Figma to Flutter, bug fixes and features, full apps with a backend).
- **Path**: how two years on support lines led to building apps, plus experience and education.
- **Contact**: email, LinkedIn, GitHub, CV.
- English by default with an Arabic (right-to-left) switch. `?lang=ar` opens the Arabic version directly.

## Stack

Plain HTML, CSS and vanilla JavaScript. No build step. Fonts from Google Fonts (Bricolage Grotesque, Schibsted Grotesk, IBM Plex Sans Arabic).

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8123
```

## Structure

```
index.html        page content
css/style.css     design system and layout
js/app.js         language switch, phone story, YLB price engine
assets/images/    portrait and ScanDesk screenshots
```

The ScanDesk screens are from its demo build, which runs on built-in synthetic data.
