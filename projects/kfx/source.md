# KFX: source

| | |
|---|---|
| Repo | `/Users/miha/Documents/Projects/krgofix` (the folder kept its old name) |
| Remote | https://github.com/mayki0909/krgofix |
| Branch on 18 Nov 2026 | `perf/reduce-fluid-cpu`; HEAD `8365b9a` (removes Kranfix from the CMS, points social links at `@kfx_kranj`) is **local only**. `origin/main` is at `531affd` |
| Live | https://kfxservis.si (webshop), admin at `admin.kfxservis.si` (from `.env.example`) |
| Docs | `Context.md`, `README.md`, `apps/webshop/public/llms.txt` (short company summary), `supabase/rls-access-matrix.md`, `.planning/`. `PROMPT.md` is outdated (mentions Retool, branches that do not exist) |

## Stack

Turbo monorepo, yarn 1. Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript 5.9, Supabase (database, auth, storage), Stripe, nodemailer, shadcn/Radix UI, lucide-react. Hosted on Vercel (no `vercel.json` in the repo); pages are cached with `revalidate = 300`.

## Layout

| Path | What it is |
|---|---|
| `apps/webshop` (`@kfx/webshop`, port 3001) | Public shop and service site |
| `apps/admin` (`@kfx/admin`, port 3000) | "KFX CMS": orders, service jobs, buyback, rentals, products, partners, payouts, technicians |
| `packages/ui` | Shared shadcn components and brand CSS |
| `packages/supabase` | Supabase clients and generated types |
| `packages/countries` | Checkout country list |
| `supabase/` | `initial_db.sql`, ~80 migrations |
| `tools/evolt-scraper` | Product catalogue imported from the eVolt.si Shopify feed (slugs start with `evolt-`) |
| `tools/rental-scraper` | Rental catalogue migrated from bike-rental-kranj.si |
| `tools/spare-parts`, `tools/robbo-scraper`, `tools/trello` | Other import tools |

## Where each fact lives

| Fact | Where |
|---|---|
| Name, legal name, phone, email, address, hours, Instagram, domain | `apps/webshop/constants.ts` (mirrored in `apps/admin/constants/contacts.ts`, `email.ts`) |
| SEO titles and descriptions | `apps/webshop/metadata.ts` |
| Locations and their hours | Database `branches` (shown by `components/locations.tsx`) |
| Products, categories, prices, discounts, EKO % | Database `products`, `categories`, `product_images`; edited in the admin |
| Rental items and prices | Database `rental_items`, `rental_item_prices`, `rental_locations` |
| Service promises | `components/servis/servis-info-bar.tsx` |
| Service steps | `components/servis/service-process-steps.tsx` (`SERVIS_STEPS`) |
| Serviced brands | `components/servis/servis-brands-strip.tsx` |
| Shop promises (home bar) | `components/info-bar.tsx` |
| Shipping fees | `lib/delivery-pricing.ts` |
| Service pickup fee, stale service hours | `components/servis/servis-form-section.tsx` |
| EKO subsidy copy | `lib/eko-subsidy-copy.ts` |

There is no headless CMS: content is either in code or in Supabase. Read database facts on the live site rather than querying the database.

## Routes

`/`, `/servis`, `/rezervni-deli`, `/izdelki`, `/izdelki/[slug]`, `/najem`, `/najem/lokacija/[locationId]/[itemId]`, `/odkup` (hidden), `/poslovalnice`, `/kontakt`, `/kosarica`, `/blagajna`, `/splosni-pogoji`, `/pravilnik-o-zasebnosti`. English legacy paths redirect to these.

## Watch out

- `apps/webshop/.env.local` and several `tools/*/.env` files hold keys. Never copy their values.
- Push or merge `8365b9a` before telling followers the site links to `@kfx_kranj`.
