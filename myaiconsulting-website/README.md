# MyAIConsulting website

A static website: plain HTML, CSS and JavaScript. No framework, no build step, no database, no login.

## Structure
```
index.html              all pages (Home, Plans, About, FAQ, Blog, legal) switch with the # in the address
css/styles.css          all styles, light and dark theme, glass cards
js/theme-init.js        sets light or dark before the page draws (no flash)
js/zero-data.js         Zero chat: the questions and answers
js/zero.js              Zero chat: the matching logic
js/main.js              logo drawing, menu, page switching, cookie banner, theme button, contact form
assets/logo/            logo mark: SVG and PNG (black, white, orange)
assets/favicon/         favicons: black-on-white (light tabs) and white-on-black (dark tabs)
favicon.ico             fallback favicon for older browsers (in the main folder)
assets/brand/           BRAND-KIT.md, brand.json, original full logos
_headers                security headers for Netlify and Cloudflare Pages
.htaccess               the same security headers for Apache hosting
robots.txt
.well-known/security.txt   where to report a security problem
```

## Put it online
Upload the whole folder to a static host (Netlify, Cloudflare Pages, GitHub Pages, or any Apache server). Use `_headers` on Netlify or Cloudflare Pages and `.htaccess` on Apache. GitHub Pages cannot send custom headers; the CSP in `index.html` still applies there.

## Security (kept simple on purpose)
- No server code and no database, so there is nothing to break into on the site itself.
- Content Security Policy: only your own scripts and styles run; only Google Fonts is allowed from outside. This is why there are no inline scripts or styles in the HTML.
- Extra headers: no content sniffing, no framing (clickjacking), strict referrer, HTTPS only (HSTS), camera and microphone blocked.
- External links use `rel="noopener noreferrer"`. Form fields have length limits and the message is URL-encoded before it is passed to the email app.
- No cookies and no trackers. The cookie banner only stores the visitor’s choice in their browser.
- Still your job: use HTTPS, turn on two-step login for your host, domain and email accounts, and keep the folder in a private repo.
- No website is 100% unhackable. This setup removes the common risks for a static site.
- Optional: download Hanken Grotesk and host it yourself, then remove the Google Fonts links and the two Google entries in the CSP.

## Still to fill in
- Social links in the footer (they point to each platform’s home page) and the LinkedIn icon in About > Meet the team
- [PAYMENT TERMS] in the FAQ
- A photo of Andi V instead of the “AV” circle
- Confirm the email spelling: info@myai-consulting.com
- Have the Privacy Policy, Terms and Cookie Policy reviewed by a lawyer
- Confirm the plan prices (Plans page)
- The AI tool logos are simple drawings, not official artwork. Use each company’s official brand assets if you want exact logos.
- The contact form opens the visitor’s email app. For form submissions saved online, a form service is needed.

## Zero, the chat assistant
- Files: `js/zero-data.js` (questions and answers), `js/zero.js` (matching logic). Its styles are at the end of `css/styles.css`.
- Zero is a scripted bot, not a live AI. It runs only in the visitor’s browser, sends nothing anywhere and stores nothing.
- It has 139 answers, and each answer matches many ways of asking. It also handles small talk and off-topic questions politely, does simple maths, and tells the time and date from the visitor’s device.
- To add or edit answers, change `js/zero-data.js`. Each entry is `[`keyword one|keyword two`, `answer`]`. Keywords are lowercase with no apostrophes. Use `[[#page|label]]` for links and `~~` between answer variants. A leading `~` on the keywords makes it a small-talk entry that loses to longer questions.
- A live AI chat that can answer anything would need a small backend to keep an API key secret. A static site cannot hold a key safely, so that is not included.
