# KFX: brand

Paths are relative to `/Users/miha/Documents/Projects/krgofix/apps/webshop` unless they start with `tools/reel` (this repo). Checked 18 Nov 2026.

## Feel

Fast and technical: an italic, forward-leaning wordmark with a speed-line tail, crimson on white or white on near-black, all-caps headlines. The videos lean on that slant (speed lines, riding in and braking into place, a battery charging).

## Logo

| File | What it is | Use |
|---|---|---|
| `public/logo-primary.svg` (146×33) | Italic "KFX": KF in `#AF1A44`, the X in black, with a speed-line tail | On white (navbar). The main logo |
| `public/logo-white.svg` | Same wordmark, all white | On dark (footer, `#171717`) |
| `public/favicons/favicon-*.ico` | White KFX on a crimson square | Favicons, profile picture |
| `tools/reel/src/kfx/logoPaths.ts` | `logo-primary.svg` split into KF and the two halves of the X | Animating the logo; regenerate if it changes |
| `tools/reel/src/kfx/rename/oldLogo.ts` | The old Krgofix logo (`git show 3dd1016~1:apps/webshop/public/logo-primary.svg`) | Only for "Krgofix is now KFX" content |
| `public/icons/logo.png` | Old "KRGO FIX" logo with a scooter-shaped K | **Do not use** |

The logo leans about 32° (`LOGO_SLANT` in `tools/reel/src/kfx/brand.ts`): speed lines and wipes use the same angle.

## Colours

From `app/globals.css` and `packages/ui/src/styles/globals.css`, mirrored in `tools/reel/src/kfx/brand.ts`.

| Name | Hex | Used for |
|---|---|---|
| Primary | `#AF1A44` | Logo KF, buttons, accents |
| On primary | `#FAFAFA` | Text on crimson |
| Ink | `#0A0A0A` | Headlines, the X |
| Body | `#525252`, `#404040` | Body text |
| Muted | `#737373` | Secondary text |
| Border | `#E5E5E5` | |
| Surface | `#F5F5F5`; section grey `#F2F2F3` | Muted backgrounds, "Kako poteka servis?" section |
| Pink tile | `#FFF1F2` | Icon tiles |
| Footer | `#171717` (bar `#262626`), text `#E5E5E5` / `#D4D4D4` | Dark backgrounds, outro |
| Refurbished tag | `#009689` | Only on "Obnovljeno" tags |

Kranfix uses the same crimson (`#AF1A44`). Keep KFX visually apart through the slanted wordmark, the dark footer look and e-mobility imagery, and never use a Kranfix file.

## Type

The site loads **no web font**: it uses the system sans (SF Pro on Apple, Segoe UI on Windows). Videos and posts use **Inter** (500, 600, 800) as the closest Google font (`tools/reel/src/kfx/brand.ts`). Headlines are ALL CAPS; info titles use Title Case ("Hitra Obravnava").

## Icons

`lucide-react`. The ones used in videos are copied into `tools/reel/src/kfx/icons.tsx`.

## Photos worth reusing

| File | Shows | Note |
|---|---|---|
| `public/assets/hero.png` (1440×800) | Black e-scooter on a grey dune landscape, moody studio render | Manufacturer imagery with a third-party mark on the stem. Used in `KfxOutro` |
| `public/assets/cta.png` (1440×640) | Technician holding a hub motor over an opened scooter | Looks like stock or AI and shows a "VELOX" brand they do not sell. Used as the mechanic photo in the reels |
| `public/assets/locations/kranj.png` | Kranj old town with mountains | |
| `public/assets/service/*.png` | Logos of the five serviced brands | |
| Product photos | From the supplier's Shopify CDN (eVolt) | Supplier imagery |
| `tools/reel/src/kfx/assets/site-mobile.jpg` | The live homepage on a phone (7 Nov 2026) | Retake if the homepage changes |

**KFX has no photos of its own** yet: the shop, the team, real repairs. Any real photo from Drulovka 51 beats all of these; ask the owner. Unused and off-brand: `public/assets/rezervni-deli-hero.png` (a phone-repair bench, fits Kranfix, not KFX), `locations/celovec.png`, `locations/skoda-loka.png`.

## Taglines and lines the site uses

- "NOVA GENERACIJA E-SKIROJEV" (homepage hero, `components/hero.tsx:32-33`)
- "SERVIS E-SKIROJEV IN E-KOLES" (`app/servis/page.tsx:15`)
- "Kako poteka servis?" (`components/servis/service-process-steps.tsx:39`)
- "Poiščite pravi del" (`components/spare-parts.tsx:125`)
- Videos: "Servis e-skirojev in e-koles" (intro), "Servis · Rezervni deli · Najem" and "E-skiroji in E-kolesa" (outro), "Novo ime. Ista ekipa."

## Tone of voice

Body copy is formal **vikanje** (vi), helpful and direct. Buttons switch to ti ("Oglej si ponudbo", "Rezerviraj termin"); posts and captions use **vi** throughout. Emails open "Spoštovani …" and close "Lep pozdrav, KFX".

- "Certificiran servis e-skirojev in e-koles v Kranju … Zagotavljamo hitro in strokovno popravilo vašega električnega skiroja ali kolesa."
- "Obiščite nas osebno za testne vožnje, servis in strokovno svetovanje."
- "Smo tu, da vam pomagamo. Kontaktirajte nas za kakršnokoli vprašanje ali pomoč."
- "Bodite na tekočem. Prejmite ponudbe, novosti in servisne nasvete na vaš e-mail."

Hashtags used so far: `#kfx #kranj` plus a topic (`#eskiro`, `#ekolo`).
