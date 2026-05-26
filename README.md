# Navami Designs — Website

**Build the home. Keep the change.**

An independent project. Custom-home design + construction in San Antonio, TX, with an AI-assisted owner platform. Standalone codebase — not connected to any other site.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing — hero, manifesto teaser, projects, AI platform, interest signup, partners, footer |
| `manifesto.html` | The philosophy — bring costs down, build *home* in the true sense, "money not spent is savings" |
| `projects.html` | Portfolio — 119 Grant Ave (sold $1.65M) + 200 Zambrano under construction |
| `platform.html` | AI collaborative platform — accounts, project plans, approvals, insurance, mortgage |
| `partners.html` | Certified GC network + commercial construction inquiry |
| `signup.html` | Interest signup with budget tier selection |
| `signin.html` | Returning user sign-in |
| `unsubscribe.html` | Email preferences + full unsubscribe |
| `styles.css` | Shared design system |
| `script.js` | Tabs, reveals, counters, tilt, form validation |
| `assets/` | Project photography (free-to-use, realtor details removed) |

## Run locally
No build, no dependencies.

```bash
open index.html
# or
python3 -m http.server 8000
```

## Deploy to Cloudflare Pages
The project is configured for direct Pages deployment (`wrangler.toml` → `pages_build_output_dir = "."`).

**Option A — Git-connected (recommended)**
1. Push to GitHub.
2. Cloudflare Pages → Create project → Connect to Git → select repo.
3. Framework preset: **None**. Build command: *(empty)*. Output dir: `.`
4. Add custom domain `thenavami.com` (GoDaddy DNS → CNAME to the Pages target).

**Option B — Direct upload**
```bash
npx wrangler@latest pages deploy . --project-name=navami-designs
```

## Design system
- **Ink** `#16110D` — primary text / dark surfaces
- **Bone** `#F4EFE6` — paper background
- **Brass** `#B68A4E` — luxury accent
- **Clay** `#B85A3C` — warm accent
- **Sage** `#5F7561` — calm secondary
- Fonts: **Fraunces** (display serif, heritage) + **Inter** (body, tech-credibility)

## Customizing
- Colors → `:root` variables at the top of `styles.css`
- Copy → directly in each `.html` file
- Social URLs → search `instagram.com/thenavami` etc.
- Logo mark → inline SVG in nav

---

© 2026 Navami Designs. San Antonio, TX.
