# Suchona × Sanjid — Romantic Birthday Website ♥

GitHub-ready static site for **Suchona**, created by **Sanjid**.

## Birthday
October 11, 2026

## Password
`You are mine`

## Included
- 16 unique personal photos collected from this conversation (duplicates removed)
- Long cinematic single-page experience
- Photo mosaic + animated filmstrip
- Full-screen photo lightbox
- Original romantic birthday soundtrack (`assets/audio/birthday-ambient.mp3`)
- Sound effects generated with Web Audio
- Music control + reliable user-gesture playback
- Typewriter birthday letter
- Live countdown to October 11, 2026 (UTC+6)
- Dedicated birthday wish
- Final surprise modal
- Mobile responsive styling
- `.nojekyll` for GitHub Pages
- GitHub Actions workflow at `.github/workflows/pages.yml`

## Run locally
Open `index.html` in Chrome/Edge, or use VS Code + Live Server.

## GitHub Pages
1. Create a new repository.
2. Upload everything in this folder to the repository root.
3. Push to the `main` branch.
4. GitHub Pages can deploy from the included Actions workflow.

## Music troubleshooting
The site starts music after the password button is clicked, because browsers commonly block autoplay before a user interaction. The audio is a local MP3 in the repository, so no third-party music host is needed.

If the browser still starts muted, use the **Music** button in the top bar or **Play our soundtrack** in the hero.

## Personalization
Edit `app.js` to change the password, birthday date, captions, or letter.
