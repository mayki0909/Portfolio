# KFX (formerly Krgofix)

E-scooter and e-bike shop and certified service in Kranj: new vehicles, spare parts, other e-vehicles and robots online, plus servicing, rentals and pickup from the customer's address.

> **Checked 18 Nov 2026** in the repo (branch `perf/reduce-fluid-cpu`, local HEAD `8365b9a`) and read-only in the live Supabase tables (products, branches, rentals). Not checked on the live site. Paths are relative to `/Users/miha/Documents/Projects/krgofix/apps/webshop` unless they start with another folder. **The local HEAD is not pushed**: `origin/main`, which production probably runs, still links the old Krgofix Facebook and `@krgoservis` Instagram.

In the site's own words: "KFX je spletna trgovina in servis v Kranju: e-skiroji, e-kolesa, rezervni deli za e-skiroje ter certificiran servis e-skirojev in e-koles." (`public/llms.txt:3`)

## Who is behind it

| | | Source |
|---|---|---|
| Brand | KFX | `constants.ts:2` |
| Former name | Krgofix (also written KrgoFix, KRGO FiX). Renamed on 28 Oct 2026 (commit `3dd1016`); the renaming campaign started 12 Nov 2026 | git log |
| Company | KFX, Špendi Idrizi s.p. (tax and registration numbers in the same file) | `constants.ts:3-9` |
| Founded | **Unclear**: footer "od leta 2019" vs "več kot 10 let izkušenj" on /servis. See open questions | `components/footer.tsx:98`, `app/servis/page.tsx:17` |
| Relation to Kranfix | A separate phone-repair business (Tim Idrizi s.p.). It had an admin-only module in the KFX CMS, removed on 17 Nov 2026. It was never on the KFX website. Keep the two apart | commit `8365b9a` |

## What they sell

Navigation (`components/navbar/navbar-desktop-nav.tsx`, `lib/nav-product-dropdowns.ts`):

| Group | Categories |
|---|---|
| E-Skiroji | Novi, Obnovljeni |
| E-Kolesa | Nova, Obnovljena |
| Ostala E-Vozila | E-mobilna vozila, E-skuterji, Otroška e-vozila, Monocikli, Podvodni skuterji |
| Rezervni deli | Polnilci in baterije, Blatniki, Elektronika in motorji, Svetila, Tačke, Vzmetenje, Zaklepi, zatiči, zglobi in varovala, Zavore, Pnevmatike in zračnice, Ročke, Dodatki |
| Robotika | |
| Polnilne postaje | |

Live catalogue on 18 Nov 2026: **135 active products, all new** (88 parts, 14 e-bikes, 14 other vehicles, 10 robots, 9 scooters). **No refurbished stock**, although the menu links to "Obnovljeni".

Brands in stock: KuKirin scooters (G2, G2 Ultra, G2 Master, G4), Engwe (Y600S scooter and 14 e-bikes), Veleco mobility scooters, Vigorous, NMOTO, Asiwo underwater scooter, Unitree and VIGX robots, Kaluu and Segway parts.

### Services

| Service | What the site says | Source |
|---|---|---|
| **Servis** | E-scooters and e-bikes. Free diagnostics and repair estimate, most repairs done in 24–48 hours, 12 months' warranty on service work | `components/servis/servis-info-bar.tsx`, `components/servis/service-process-steps.tsx` |
| Pickup for service | From the customer's address: "Do 10 km – 10 €, več kot 10 km – 20 €" | `components/servis/servis-form-section.tsx:378` |
| Assembly and upgrades | For parts bought on the site | `components/cta-section.tsx:38-41` |
| **Najem** (rental) | Day rental of e-scooters, e-bikes, kids' e-vehicles and underwater scooters in Kranj; 20 % paid online, the rest on pickup | `/najem`, DB `rental_*` |
| Odkup (buyback) | **Hidden** from the desktop menu and footer, still reachable at `/odkup`. Do not promote | `navbar-desktop-nav.tsx:56` |
| "Uradni serviserji za" | Kukirin, Engwe, EcoSpeed, Teverun, Langfeite | `components/servis/servis-brands-strip.tsx` |
| Instalments | NLB Buy&Go "Nakup na obroke"; also card (Apple/Google Pay), SEPA transfer, cash on delivery | `components/checkout/checkout-form.tsx:61-63,643` |
| EKO subsidy | All 14 Engwe e-bikes show "Cena s subvencijo" (25 %); "Borzen / EKO sklad povrne v roku približno 30 dni" | `lib/eko-subsidy-copy.ts:5` |

## Who buys

Not stated in code. From the copy and catalogue: e-scooter and e-bike owners in Kranj and Gorenjska (service), buyers of parts across Slovenia (webshop), e-bike buyers using the EKO subsidy, and rental customers in Kranj.

## Promises (only what the site states)

| Promise | Exact wording | Source |
|---|---|---|
| Turnaround | "Večina popravil končana v 24-48 urah" | `components/servis/servis-info-bar.tsx:8` |
| Warranty on work | "12 mesecev garancije na vse servisne storitve" | `servis-info-bar.tsx:13` |
| Diagnostics | "Brezplačna diagnostika in cenitev popravila" | `service-process-steps.tsx:12` |
| Technicians | "Certificirani Tehniki / Usposobljeni in pooblaščeni serviserji" | `servis-info-bar.tsx:17-18` |
| Parts | "Uporabljamo samo originalne nadomestne dele" | `servis-info-bar.tsx:23` |
| Pickup in store | "Priročen prevzem v naših razstavnih prostorih v Kranju", free at checkout | `components/info-bar.tsx:21-22` |

## Contact

| | | Source |
|---|---|---|
| Website | https://kfxservis.si (was krgofix.si until 8 Nov 2026) | `constants.ts:40`, `public/llms.txt` |
| Address | Drulovka 51, 4000 Kranj (was Poštna ulica 3a) | `constants.ts:6` |
| Hours | pon–pet 9.00–16.00, sob 9.00–12.00, ned zaprto (matches DB `branches`). **See open questions** | `constants.ts:10` |
| Phone | +386 70 646 482 | `constants.ts:4` |
| Email | info@kfxservis.si | `constants.ts:5` |
| Booking | Service form at https://kfxservis.si/servis | `app/servis` |
| Directions | https://maps.app.goo.gl/wpWCZQDTm5KWu4TW7 | DB `branches` |
| Instagram | https://www.instagram.com/kfx_kranj (`@kfx_kranj`) | `constants.ts:21-23` (local only, see note at top) |
| Facebook | Old page "KRGO FiX servis in prodaja e-skirojev in e-koles" on `origin/main`; removed locally. Ask the owner whether it is renamed or dropped | `origin/main:apps/webshop/constants.ts` |
| Partner location | **Bajk ER**, Ulica Viktorja Kejžarja 7, 4270 Jesenice, +386 40 374 041. A separately named partner, not a "KFX Jesenice" branch | DB `branches` |

## Prices

| What | Price | Source |
|---|---|---|
| Shipping, parts | 4,90 € | `lib/delivery-pricing.ts:3` |
| Shipping, vehicles | 39 € | `lib/delivery-pricing.ts:4` |
| Pickup in store | Brezplačno | `checkout-form.tsx:80-82` |
| Service diagnostics | Free | `service-process-steps.tsx:12` |
| Service pickup | Do 10 km 10 €, več kot 10 km 20 € | `servis-form-section.tsx:378` |
| Products, discounts | In the database (`products.price` is what the customer pays; `discount` only draws the strike-through and "Akcija") | DB, admin |

Rental, Kranj, per day (DB `rental_item_prices`, 18 Nov 2026):

| Item | Celodnevna | Dvodnevna /dan | Poljubni datumi /dan |
|---|---|---|---|
| Engwe P275 PRO, Deruiz Quartz SUV, Deruiz Quartz M, Yadea C LINE 1200W | 35 € | 25 € | 35 € |
| Hiley Tiger 10 GTR 2x1400W | 25 € | 25 € | 25 € |
| Hiley TIGER 8 GTR 2x600W | 25 € | 20 € | 25 € |
| Hiley TIGER 10 V3, APOLLO Olala SX-E500 (kids), Asiwo MANTA underwater scooter | 15 € | 15 € | 15 € |
| Otroški sedež (add-on) | 8 € | 8 € | 8 € |

The 3-day rates (18,33 €, 21,67 € …) come from dividing old 3-day totals by three; do not quote them without checking the site.

## Open questions for the owner

- **Founding year:** "od leta 2019" (footer) vs "več kot 10 let izkušenj" (/servis, metadata). The November campaign used "od leta 2019"; the owner should pick one.
- **Hours on /servis:** the service form shows "Ponedeljek - Petek 8:00 - 18:00, Sobota 9:00 - 14:00" (`servis-form-section.tsx:30-34`) next to the real 9.00–16.00 / 9.00–12.00. The form block is stale.
- **Free shipping:** product pages say "Brezplačna dostava nad 99 €" and "4,99 € za naročila pod 99 €"; checkout charges 4,90 € / 39 € with no threshold.
- **Returns:** home bar says "30 dni za zamenjavo izdelka"; the terms give the statutory 14 days (`app/splosni-pogoji/page.tsx:85`).
- **Facebook page:** keep and rename, or drop?
- **Brand colour in emails and print:** admin uses `#B22D41`, the sites use `#AF1A44`.

## Do not claim

- Free shipping over 99 €, 4,99 € shipping, or 30-day exchange (see above).
- "1000+ izdelkov na zalogi" (135 active) or "50+ znamk".
- Refurbished vehicles in stock (none right now), or buyback (page hidden).
- "Uradni serviserji" or "certificirani" for a specific brand without the owner confirming it.
- The /servis 8–18 hours, or "NOVA POSLOVALNICA" as news.
- Xiaomi or Segway Ninebot scooters (named in SEO copy, not in the catalogue).
- Anything about Kranfix, or the old Facebook page and `@krgoservis`.
- Bajk ER as a KFX branch.
- Legal or safety rules without an official source on the post (the December rules carousel cites policija.si and Uradni list RS 16/2026).
