# Sinden's Wedding Cakes

Marketing website for **Sinden's Wedding Cakes** — *Luxury Wedding Cakes by Bev* — based in Vanderbijlpark, South Africa, serving the Vaal Triangle and Gauteng.

A fast, responsive, single-page static site. No build step required.

## Structure

```
index.html            # the site
assets/css/styles.css # styles
assets/js/main.js     # nav, gallery filter, lightbox, scroll reveal
assets/img/           # web-optimised images (hero, brand, favicon, gallery g01–g44)
source-photos/        # original full-resolution photos (not served)
netlify.toml          # Netlify config (publish dir + cache headers)
robots.txt / sitemap.xml
```

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (Netlify)

Connected to GitHub → Netlify auto-deploys on every push to `main`.
The enquiry form uses **Netlify Forms** (`data-netlify="true"`); submissions
appear under the site's *Forms* tab in Netlify.

## Content / contact

- WhatsApp / phone: 083 285 2515
- Email: teenbev@icloud.com
- Facebook: https://www.facebook.com/sindensweddingcakes

## Editing the gallery

Add an optimised image to `assets/img/` and add a `<figure class="g-item" data-cat="…">`
block in the gallery section of `index.html`. Categories: `classic`, `blush`,
`bold`, `statement`, `weddings`.
