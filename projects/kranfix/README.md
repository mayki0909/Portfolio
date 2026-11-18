# Kranfix

Phone repair shop and store in Kranj: repairs of phones, tablets, laptops and consoles, buyback of used phones, refurbished and new phones, and accessories.

> **Checked 18 Nov 2026** in the repo (branch `feat/fixes`, 2 commits ahead of `main`), not on the live site. Paths are relative to `/Users/miha/Documents/Projects/kranfix/apps/webshop` unless they start with another folder. Phones, accessories and buyback prices live in the Supabase database: read them on https://kranfix.si.

In the site's own words: "Kranfix je servis in trgovina telefonov na naslovu Koroška cesta 4, 4000 Kranj. Popravljamo iPhone, Samsung in druge telefone, menjamo zaslone in baterije, odkupujemo rabljene telefone ter prodajamo telefone in dodatke." (`public/llms.txt:3`)

## Who is behind it

| | | Source |
|---|---|---|
| Brand | **Kranfix** in text (titles, `SHOP_NAME`); the logo reads KRAN / FIX; some copy and the Facebook page write "KranFix". Use "Kranfix" in captions | `lib/shop.ts:3`, `components/home/logo.tsx:28` |
| Sub-brand | **Kran Refix**: a green lockup (winged phone, KRAN over RE+FIX) for buyback and refurbished phones. "Refix" appears only in the logo, never as text | `components/home/revivo-section.tsx:31`, `public/home/refix-*.svg` |
| Company | POPRAVILO MOBILNIH TELEFONOV KRANFIX, TIM IDRIZI S.P., registered at Drulovka 51, 4000 Kranj; the shop is at Koroška cesta 4 | `content/legal.ts:20` |
| Founded | Unknown. The earlier website was popravilotelefonov.si | `lib/legacy-redirects.ts:4` |
| Relation to KFX | Separate business. The website was built from the KFX (Krgofix) codebase, its work orders used to run in the KFX admin, and the registered seat is KFX's shop address. Keep the brands apart | `ProjectContext.md:17-19` |

## What they do

### Repairs

| Device | Shown as | Source |
|---|---|---|
| Telefon | "iPhone, Samsung, Xiaomi in drugi" | `lib/repairs.ts:63-69` |
| Tablica | "iPad in Android tablice" | |
| Računalnik | "MacBook in prenosniki" | |
| Konzola | "Switch, PlayStation, Xbox" | |
| Nekaj drugega | free description | |

`main` also offers "Ura" (smartwatch); `feat/fixes` removes it. Do not advertise watch repairs until that is settled.

Homepage service cards: Menjava ekrana telefona, Popravilo stekla kamere, Menjava baterije telefona, Menjava zadnjega pokrova, Menjava polnilnega priključka (`components/home/services-section.tsx`). SEO pages exist for screen, battery, charging port, camera glass, back cover, water damage, iPhone, Samsung and ten models (iPhone 13–16 Pro, Galaxy S23–S25) (`lib/repair-pages.ts`).

How to hand over a device: walk in without booking, or send it by post and get it back by post (`components/repair/repairs-landing.tsx:24-40`). Booking form at https://kranfix.si/popravila.

### Buyback (odkup)

At `/odkup`: pick the model, answer four condition questions, see an informative price, leave contact details. "Prinesem v servis" or "Pošljem po pošti". "Denar izplačamo, ko napravo pregledamo." (`lib/buyback.ts`, `app/odkup/page.tsx`)

### Shop

- **Refurbished phones** ("Obnovljen"), graded A Odlično, B Zelo dobro, C Dobro (`lib/revivo.ts:14-32`). "Vsak odkupljen telefon pred prodajo strokovno pregledamo in obnovimo." Battery at least 80 % (`lib/revivo.ts:37`). Add-ons: Nova baterija +59 €, 30W polnilec +12,99 €.
- **New phones** (catalogue imported from Priporočam.si).
- **Accessories**: Ovitki, Zaščitna stekla, Polnilci, Kabli, Power banki, Ostalo (imported from Chameleon.si).
- Payment: card, NLB Buy&Go, cash on delivery. Shipping 4,90 €, pickup in the shop free (`lib/delivery-pricing.ts`).

## Who buys

Not stated in code. Phone owners in Kranj and around (SEO keywords and `areaServed` are Kranj), people selling an old phone, people buying a cheaper checked phone.

## Promises (only what the site states)

| Promise | Exact wording | Source |
|---|---|---|
| Warranty | "Za opravljeno servisno storitev vam nudimo 90-dnevno garancijo." | `components/home/trust-section.tsx:137-139` |
| Diagnosis first | "Napravo najprej pregledamo in potrdimo ceno, šele nato jo popravimo." | `components/home/hero-section.tsx:44-45` |
| No booking needed | "Pridite v trgovino brez naročila" | `repairs-landing.tsx:24` |
| Quick booking | "Rezervirajte popravilo v dveh minutah" | `repairs-landing.tsx:149` |
| Data | "Z osebnimi podatki na vaši napravi ravnamo skrbno in jih ne posredujemo tretjim osebam." | `app/o-nas/page.tsx:33` |
| Loaner | Only "preverite možnost izposoje nadomestnega telefona" | `trust-section.tsx:103` |
| Express | On request, no price on the site | `components/home/faq-section.tsx:32` |
| Refurbished | "Strokovno pregledani", "Z garancijo", "Jasno označeno stanje" (no warranty length stated) | `revivo-section.tsx:46-64` |

## Contact

| | | Source |
|---|---|---|
| Website | https://kranfix.si | `public/llms.txt:9` |
| Address | Koroška cesta 4, 4000 Kranj (since 5 Nov 2026; before: Glavni trg 20). Next to A1 in the Globus building (the location reel says "Takoj zraven A1."; the site does not) | `lib/shop.ts:4-7` |
| Phone | +386 70 467 273 (shown as 070 467 273) | `lib/shop.ts:8` |
| Email | info@kranfix.si | `lib/shop.ts:10` |
| Instagram | https://www.instagram.com/_kranfix_/ (`@_kranfix_`) | `lib/shop.ts:13` |
| Facebook | "Popravilo mobilnih telefonov ter tabličnih računalnikov KranFix" | `lib/shop.ts:11-12` |
| Other networks | None | |

Opening hours (`components/home/office-hours.ts:13-25`):

| Day | Hours |
|---|---|
| Ponedeljek – Četrtek | 09:00–12:00, 13:00–16:00 |
| Petek | 09:00–14:00 |
| Sobota | 09:00–12:00 |
| Nedelja | Zaprto |

The old hours (Mon–Fri 9–18, Sat 10–18) ended on 5 Nov 2026: do not reuse them. Hours for 24 and 31 Dec are not set yet.

## Prices

All prices include DDV (`content/legal.ts:50`) and are informative: "končno ceno potrdimo po pregledu".

Shown on the live site (`lib/repair-pages.ts:17-20`, the cheaper "Ugodnejša" tier with a "preverjen nadomestni del"):

| Repair | Price |
|---|---|
| Menjava zaslona | od 89,00 € |
| Menjava baterije | od 49,00 € |
| Steklo kamere | od 39,00 € |
| Zadnji pokrov | od 89,00 € |

The full list in `lib/repairs.ts:142-271` (Premium screen 129 €, port od 79 €, Express +20 € …) belongs to a booking form the site **no longer uses**. Do not quote it. The shop's own price list in the admin (`apps/admin/constants/kranfix-fixed-services.ts`) has diagnostics 20 €, data rescue 55 €, express +10 € and more; it is not public.

Buyback prices are in the database (`buyback_models`, 34 Apple, Samsung, Google and Xiaomi models, grades A–D). The seed had iPhone 15 128 GB at 330 / 280 / 180 € (A / B / C); live prices may differ.

## Open questions for the owner

- **Turnaround:** "Večino telefonov popravimo še isti dan, če je del na zalogi." (repair pages) vs "Večina popravil je narejenih v 2 dneh" (`repairs-landing.tsx:25`) vs "Rok povemo po pregledu." (FAQ).
- **Express surcharge:** +20 € in the site code vs +10 € in the shop's price list. The site shows none.
- **Watch repairs:** on `main`, removed on `feat/fixes`.
- **"Originalni deli":** the old footer says "originalni deli in dodatki", but the published prices are for a "preverjen nadomestni del". The homepage also says "Originalni modeli z garancijo pri pooblaščenem prodajalcu" (`components/home/shop-section.tsx:46`): confirm before repeating.
- **Refurbished warranty length:** none is stated.
- **Name casing:** Kranfix vs KranFix.
- **Social links:** on `feat/fixes` no page footer links to Instagram or Facebook.

## Do not claim

- Original parts, a refurbished warranty length, or authorised-reseller status without the owner confirming.
- Same-day repair as a promise: always "če je del na zalogi", or leave the time out.
- Express +20 €, Premium/Ugodnejša tiers or "Prevzem na naslovu": none of these are on the live site.
- A guaranteed loaner phone; that water-damaged phones can be saved ("uspeh ni zagotovljen"); waterproofing after a repair ("vodotesnosti ne zagotavljamo"); responsibility for data on the device.
- A final price before inspection: every price is "od" and confirmed after the check.
- Anything about A1 beyond being the neighbour; no A1 logo or colours. No competing repair shops by name.
- Anything about KFX.
