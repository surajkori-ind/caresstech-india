# CaressTech India — Website

Production-ready one-page site built with HTML5, CSS3, vanilla JS, Bootstrap 5,
Swiper.js, AOS, GSAP + ScrollTrigger, and Font Awesome (all via CDN).

## Structure
```
index.html
style.css
script.js
assets/
  images/   <- drop real photography here (see "Swap placeholders" below)
  icons/
  fonts/
  pdf/      <- 9 placeholder curriculum PDFs (3 programmes x EN/HI/GU)
```

## Swap placeholders before launch
- Every photo spot is a labelled `.ph-card` block (blue/orange gradient with a
  caption) instead of a stock photo — hotlinked stock-photo services are
  unreliable long-term, so real photography should be added directly:
  1. Add your images to `assets/images/`.
  2. Replace the relevant `<div class="ph-card">...</div>` with an `<img>` tag,
     or set it as a CSS `background-image` on the same class.
- Replace the 9 files in `assets/pdf/` with your final curriculum PDFs
  (same filenames: `stem-curriculum-en.pdf`, `stem-tinkering-hi.pdf`, etc.)
- The contact form shows a client-side "success" message only — connect it to
  a real backend or service (Formspree, EmailJS, your CRM) before launch.
- Update the phone number, email, address and social links in `index.html`
  (search for `+91 00000 00000` and `hello@caresstechindia.com`).
- Add a real Google Maps embed in place of `.map-placeholder`.

## Deploying to GitHub Pages
1. Push this folder to a GitHub repo.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Your site will be live at `https://<username>.github.io/<repo>/`.
