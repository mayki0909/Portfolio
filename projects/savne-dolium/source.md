# Savne Dolium: source

| | |
|---|---|
| Repo | `/Users/miha/Documents/Projects/saunas-shop` |
| Remote | https://github.com/mayki0909/saunas-shop (`origin/HEAD` is `staging`) |
| Branch on 18 Nov 2026 | `feat/icons-images`, 7 commits ahead of `main`, one uncommitted change in `components/Hottub/Configurator.tsx`. What is live may differ from this branch |
| Live | https://savne-dolium.si, CMS at https://cms.savne-dolium.si |
| Docs | `SEO-OPTIMIZACIJA.md` (target keywords), `.cursor/rules/designer.md` (Figma workflow). `README.md` is the create-next-app default |

## Stack

Next.js 13 (Pages Router, `output: "standalone"`), React 18, TypeScript 4.9, Bootstrap 5, Sass, Swiper, Directus SDK (CMS), Stripe (payments), nodemailer, `next-mdx-remote` (blog), `next-sitemap`. Yarn 1. `postbuild` generates the sitemap, `robots.txt` and `llms.txt`.

## Layout

| Folder or file | What is in it |
|---|---|
| `pages/` | Routes, and `api/` (checkout and invoice sessions, contact, rental and email mail) |
| `components/` | One folder per section or page |
| `config/shopCategories.ts` | Category slugs, labels, images, "Kmalu v ponudbi" flags |
| `services/` | Data access to Directus and Stripe |
| `constants.tsx` | Contact details, socials, legal data, FAQ copy, rental facts |
| `metadata.tsx` | SEO title and description per page |
| `schemas.tsx` | JSON-LD: LocalBusiness, opening hours, rental prices |
| `styles/variables.scss`, `styles/globals.scss` | Colours, fonts, buttons |
| `public/` | Logos, icons, photos, `hero.mp4`, OG images in `metadata/` |
| `scripts/` | `llms.txt` generator (holds a short company description) |
| `k8s-files/`, `Dockerfile`, `utils/` | Deployment |

## Where each fact lives

| Fact | Where |
|---|---|
| Phone, email, Instagram, Facebook, legal data | `constants.tsx:1-16` |
| Address | `constants.tsx:15` (Selca), `components/Contact/Contact.tsx:28` and `schemas.tsx:298` (Škofja Loka) |
| Opening hours | `schemas.tsx:311` only |
| Categories | `config/shopCategories.ts` |
| Products, prices, discounts (Odprodaja), testimonials, blog, gift cards, rental prices | **Directus CMS**: collections `Saunas`, `Hottubs`, `Houses`, `Products`, `Featured`, `GiftCards`, `RentPrices`, `Testemonials`, `Blog`. Read on the live site |
| Rental facts and fallback prices | `constants.tsx:166-175`, `components/Rent/RentSauna.tsx` |
| Custom build steps | `components/SavnePoMeri/ProcessSection.tsx` |
| Delivery terms | `components/Dostava/DeliveryConditionsSection.tsx` |
| FAQ (heating time, materials, winter use) | `constants.tsx` |

## Routes

`/`, `/trgovina?izdelki=<slug>`, `/zunanja-savna/[slug]`, `/lesena-kad/[slug]`, `/vrtno-pohistvo/[slug]`, `/dodatek/[slug]`, `/najem`, `/savne-po-meri`, `/postavitev-temeljev`, `/dostava`, `/o-podjetju`, `/about`, `/faq`, `/contact`, `/blog`, `/blog/[slug]`, `/cart`, `/success`, `/terms`, `/privacy`, `/cookies`, `/style` (internal style guide).

## Deployment

A manual GitHub Action (`.github/workflows/deploy-app.yml`) builds and pushes the Docker image `coffeegrainstudios/dolium.web`. Kubernetes manifests (web, Directus, Postgres, Redis, nginx ingress) are in `k8s-files/`; the auto-update steps are commented out. The hosting provider is not named in the repo.

## Watch out

- `.env` holds the Directus URL, GA ID and Stripe keys. Never copy its values.
- `k8s-files/stripe-secret.yaml` and `k8s-files/dolium-tls-secret.yaml` are **committed to git**. Worth moving out of the repo and rotating.
- Terms, Privacy and Cookies pages are still Lorem ipsum.
- `Layout.tsx` points at `favicon-96x96.png` and `schemas.tsx:94` at `/logo.png`; neither file exists.
