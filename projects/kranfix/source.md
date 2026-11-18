# Kranfix: source

| | |
|---|---|
| Repo | `/Users/miha/Documents/Projects/kranfix` |
| Remote | https://github.com/mayki0909/kranfix |
| Branch on 18 Nov 2026 | `feat/fixes`, 2 commits ahead of `main` ("Style fixes", "404"). Uncommitted changes in `tools/reel`, untracked `reports/` and `research_notes/` |
| Live | https://kranfix.si, admin at `cms.kranfix.si` |
| Docs | `Context.md` and `ProjectContext.md` (business spec, built from the Krgofix architecture), `README.md`, `agents/*.md` (post and blog-SEO agent designs), `.cursor/skills/` (`post-agent/visual.md` has image rules), `reports/`, `research_notes/` (AI and video tool research, 15 Nov 2026) |

## Stack

Turbo monorepo, yarn 1. Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript 5, Supabase, Stripe, nodemailer, zod. Google Analytics behind a cookie banner. Hosted on Vercel (`apps/vercel.json`: the webshop takes all traffic, the admin answers on `cms.kranfix.si`).

## Layout

| Path | What it is |
|---|---|
| `apps/webshop` (port 3001) | Public site: repairs, buyback, shop, blog |
| `apps/admin` | Admin: dashboard, service work orders (`/kranfix`, synced with Trello), buyback and buyback models, products, blog, orders |
| `packages/supabase`, `packages/ui`, `packages/countries` | Shared client and types, shadcn components, country list |
| `supabase/` | 14 migrations, including the buyback price seed |
| `tools/catalog-scraper` | Imports phones from Priporočam.si and accessories from Chameleon.si |
| `tools/social-image/composite.mjs` | Crops a scene and stamps the real logo lockup on it |
| `tools/trello` | Work-order board sync |
| `tools/reel` | **Old copy** of the Remotion project, now in `Portfolio/tools/reel`. Its `src/` matches the Portfolio copy but it still has uncommitted edits from 18 Nov 2026. Make new changes in the Portfolio copy only |

## Where each fact lives

| Fact | Where (in `apps/webshop`) |
|---|---|
| Name, address, phone, email, Instagram, Facebook | `lib/shop.ts` |
| Opening hours | `components/home/office-hours.ts` (also copied into `tools/reel/src/location/scenes/Hours.tsx`) |
| Published "od" prices, SEO repair pages | `lib/repair-pages.ts`, prices via `publishedFromPrice` in `lib/repairs.ts` |
| Device types, repair list | `lib/repairs.ts` |
| Buyback questions and grades | `lib/buyback.ts` |
| Refurbished grades and add-ons | `lib/revivo.ts` |
| Repair process steps | `components/home/process-section.tsx` |
| Promises (warranty, diagnosis, loaner) | `components/home/trust-section.tsx`, `app/o-nas/page.tsx` |
| FAQ | `components/home/faq-section.tsx` |
| Legal, company data, warranty terms | `content/legal.ts` |
| SEO titles, schema.org | `lib/seo.ts`, `lib/schema.ts` |
| Shop's internal price list | `apps/admin/constants/kranfix-fixed-services.ts` (not public) |
| Products, categories, buyback prices, blog posts | Supabase: `products`, `categories`, `buyback_models`, `blog_posts` |

## Routes

`/`, `/popravila`, `/popravila/[slug]` (18 pages), `/odkup`, `/trgovina`, `/trgovina/[slug]`, `/dodatki`, `/dodatki/[slug]`, `/blog`, `/blog/[slug]`, `/o-nas`, `/kosarica`, `/blagajna`, `/zasebnost`, `/pogoji-poslovanja`, `/llms.txt`.

## Watch out

- `apps/webshop/.env`, `apps/admin/.env` and `tools/catalog-scraper/.env` hold keys. Never copy their values.
- Outdated docs: `.cursor/skills/post-agent/business.md`, `.cursor/skills/blog-seo/business.md` and `agents/runs/` still say Glavni trg 20, "no public price list" and "no warranty length". This folder supersedes them.
- `components/repair/repair-wizard.tsx` and the full price list in `lib/repairs.ts` are no longer used by any route; the `RepairReel` was built from them.
