# Kranfix: brand

Paths are relative to `/Users/miha/Documents/Projects/kranfix/apps/webshop` unless they start with `tools/reel` (this repo). Checked 18 Nov 2026.

## Feel

Trustworthy local workshop: crimson and black on white, clean studio shots of phones on a bench, plain short sentences, no superlatives. The Refix green marks everything about second-hand phones (buyback, refurbished).

## Logo

| File (`public/brand/`) | What it is | Use |
|---|---|---|
| `logo-mark-color.svg` / `.png` | Phone-shaped mark with a white wrench, crimson top, black bottom | Profile picture, stings |
| `logo-word-color.svg` | "KRAN" in crimson over "FIX" in black | |
| Mark + wordmark side by side | The lockup the site uses (`components/home/logo.tsx`) | Main logo on white |
| `logo-mark-light.svg` / `.png`, `logo-word-light.svg` | Mark in `#D4D4D4`, wordmark in `#E5E5E5` | On dark |
| `public/home/refix-mark.svg`, `refix-kran.svg`, `refix-re.svg`, `refix-fix.svg`, `refix-mark-lg.svg` | **Kran Refix** green lockup (`#306B34`): winged phone, KRAN over RE+FIX | Buyback and refurbished phones only |
| `app/icon.svg`, `app/apple-icon.png` | Favicon | |
| `tools/reel/src/intro/logoPaths.ts` | The mark and wordmark as paths | Animating the logo; regenerate if it changes |

Unused legacy files, do not use: `public/shop/logo-mark.svg`, `public/home/logo.svg`, `public/home/logo-footer.svg` (old winged-phone marks).

## Colours

From `app/globals.css` and `components/home/styles.ts`, mirrored in `tools/reel/src/brand.ts`.

| Name | Hex | Used for |
|---|---|---|
| Primary | `#AF1A44` | KRAN, buttons, accents |
| On primary | `#FAFAFA` | Text on crimson |
| Ink | `#0A0A0A` | Headlines, FIX |
| Text / body | `#404040` / `#525252` | Body text |
| Muted | `#737373` | Secondary text |
| Border | `#E5E5E5` (reel uses `#D4D4D4`) | |
| Surface | `#F5F5F5` | Light sections |
| Dark sections | `#171717`, cards `#242424` | Process and trust sections |
| **Refix green** | `#306B34`; card gradient `#F1F7F1` → `#E2EEE2` | Buyback, refurbished |
| Open now | `#22C55E` | Live "open" dot |

The homepage footer uses a slightly different red, `#A5294B`. KFX uses the same crimson `#AF1A44`: never mix their files.

## Type

- **Manrope** 600 and 800 for headlines (hero h1 is extra-bold).
- **Geist** 400, 500, 600 for everything else.
- Both from Google Fonts (`app/layout.tsx:12-20`), loaded in Remotion from `tools/reel/src/brand.ts`.

## Icons

Custom SVGs in `public/home/` and `public/repairs/`, rendered by `components/home/icon.tsx`. Device tiles in `public/repairs/` (phone, tablet, laptop, console, watch).

## Photos worth reusing

Mostly staged or generated studio images, not photos of the real shop.

| File (`public/`) | Shows |
|---|---|
| `home/hero-bench.png` (1672×941) | Technician's hands opening a phone on a grey bench mat. Homepage hero |
| `home/hero.png` (1920×1080) | Close-up of an opened iPhone's bottom edge. OG image |
| `home/footer-city.png` (1658×949) | Crimson halftone Kranj skyline with mountains. Used in `LogoOutro` and the Facebook cover |
| `home/process-1…4.png` | Repair steps on a burgundy mat: inspection, opened phone, hand-over at the counter |
| `home/service-*.png` and `*-fixed.png` | Before/after pairs: screen, camera, battery, back, port |
| `home/buyback-phones.png` | Two hands passing phones (used with the Refix mark) |
| `home/trust-*.png` | 3D icon renders in crimson and silver (stopwatch, shield, rosette, magnifier), cut-out phones |
| `home/shop-devices.png`, `shop-case.png`, `shop-glass.png`, `shop-cable.png` | Product cut-outs on near-white (lift them 3 % and multiply into the page, see `tools/reel/README.md`) |
| `blog/*.jpg` (1280×720) | Cracked screen, buyback, battery, phone not charging |

A real photo of the new shop at Koroška cesta 4 or of the team would beat all of these; ask the owner.

## Taglines and lines the site uses

- "Hitro in zanesljivo popravilo telefonov v Kranju" (homepage hero), button "Rezerviraj popravilo"
- "Kaj nagaja vašemu telefonu?"
- "Kako poteka popravilo?"
- "Vaš telefon. V dobrih rokah."
- "Blizu, ko nas potrebujete." / "Uredimo vaš telefon"
- "Servis in trgovina v središču Kranja", "Vse na enem naslovu"
- Videos: "Popravilo telefonov v Kranju" (intro), "Popravila · Nakup · Odkup · Dodatki" (outro)

## Tone of voice

Short, plain sentences, no superlatives, no emoji. Repeats that the price is confirmed after inspection ("končno ceno potrdimo po pregledu").

- **Website:** mostly formal **vi** ("Izberite težavo. Sporočite model. Skupaj poiščemo naslednji korak."), with some ti slips ("Opišeš težavo …", "Pokliči nas").
- **Instagram, so far: informal ti** throughout, unlike KFX and Savne Dolium. "Koliko je vreden tvoj stari telefon?", "Plačaš samo nadomestne dele, delo je na nas.", "Med prazniki ne ostani brez telefona." Keep ti in Kranfix captions unless the owner asks otherwise.

Hashtags used so far: `#kranfix #kranj` plus a topic (`#popravilotelefonov`, `#menjavaekrana`, `#menjavabaterije`).
