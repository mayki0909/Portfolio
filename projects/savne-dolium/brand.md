# Savne Dolium: brand

Paths are relative to `/Users/miha/Documents/Projects/saunas-shop` unless they start with `tools/reel` (this repo). Checked 18 Nov 2026.

## Feel

Calm, warm, unhurried: wood, steam, a lake at golden hour. The site pairs soft violet-grey UI with warm product photography. The videos made so far go darker and more filmic (night violet, grain, mist), with no sound effects beyond the intro's whooshes.

## Logo

| File | What it is | Use |
|---|---|---|
| `public/assets/Logo.svg` (142×51) | Barrel with three wisps of steam, and a two-line serif wordmark "Savne / Dolium", all in `#5D5A88` | The logo the site uses (navbar, footer). Use this one |
| `public/assets/Logo.png` (108×39) | Same lockup in dark brown `#503E2E` | Only in structured data and the OG images. Older colour |
| `public/favicons/` | Brown barrel icon alone, 16, 32, 192 px | Favicons |
| `tools/reel/src/dolium/logoPaths.ts` | `Logo.svg` split into steam, barrel and the two wordmark lines | For animating the logo in Remotion; regenerate if the logo changes |

Do not redraw or recolour the logo beyond `primaryDark` and `primaryLight` (light version on dark, as in `DoliumOutro`).

## Colours

From `styles/variables.scss:1-6`, mirrored in `tools/reel/src/dolium/brand.ts`.

| Name | Hex | Used for |
|---|---|---|
| `primaryDark` | `#5D5A88` | Logo, headings, buttons |
| `primaryLight` | `#ECEFF9` | Light backgrounds; logo on dark video |
| `secondaryDark` | `#9795B5` | Body text |
| `secondaryLight` | `#BCBACD` | Borders, soft accents |
| `neutral30` | `#5F5C65` | Dark grey text |
| `white` | `#FFFFFF` | |
| `night` | `#121019` | **Not on the site.** Near-black with the violet of `primaryDark`, made for the darker videos |

Newer Figma-built sections also use `#EFEFF7` (footer and section backgrounds), `#7E7B84`, `#4D4A78`, `#6A6992`, `#EDECF5`, `#F5F6FA`, `#EAEFF5`, `#4B4A67`.

## Type

- **DM Serif Display** for h1 and h2 (italic works well for a single soft line: the outro's "Razkošje popolne sprostitve").
- **DM Sans** 400 and 500 for everything else.
- Sources: `pages/_document.tsx:11-12`, `styles/globals.scss`. Both are Google Fonts, loaded in Remotion from `tools/reel/src/dolium/brand.ts`.
- Buttons are pills (radius 100 px large, 30 px small).

## Icons

Custom SVGs in `public/icons/` (32 files: Phone, Email, Location, Check, Calendar, SaunaPerson, Hart, Smile, Health, Shipping, Safe …). No icon library.

## Photos and video worth reusing

| File | Shows |
|---|---|
| `public/assets/hero.jpg` (1024×526), `public/assets/Hero.png` (1440×903, sharper) | Inside a barrel sauna, looking out of an arched window onto a forest lake, orange pillows. The homepage hero |
| `public/hero.mp4` (1920×1080, 11 s, 25 fps) | Sauna footage: shingle roof, stove, fire, stones, birch whisk. Not used on the site any more; the `RitualReel` is cut from it |
| `public/navbar/sod-savna.jpg` | Thermowood barrel sauna by a lake at sunset (the `DoliumOutro` photo) |
| `public/navbar/zunanje-savne.jpg` | Spruce barrel with shingle roof on a deck, steam rising |
| `public/navbar/kvadratna-savna.png` | Modern square sauna by a pool |
| `public/navbar/luxury-savna.jpg` | Dark pod sauna at a trade fair |
| `public/navbar/*.jpg` (others) | One photo per category: tubs on a sea shore, ice, glamping cabin, garden house, shed, pavilion, carport |
| `public/assets/about/najem1.jpg`, `najem2.jpg`, `public/assets/rent/Sauna1-4.jpg` | The rental sauna on its trailer, and its interior with the Harvia stove |
| `public/assets/offers/Najem.jpg` | Family in an octagonal tub |
| `public/assets/about/AboutSaunas4.png` | Woman ladling water on the stove |
| `public/assets/dostava/hero.png` | Truck loaded with barrel saunas |
| `public/assets/postavitev-temeljev/hero.jpeg` | Barrel on concrete blocks at sunset |

Most are product or stock-style shots. A real photo from a customer's garden or of the rental sauna at an event would beat any of them; ask the owner.

## Taglines and lines the site uses

- "Prepustite se razkošju popolne sprostitve s kakovostnimi zunanjimi finskimi savnami in lesenimi kadmi." (homepage hero, `pages/index.tsx:66`)
- "Wellness za vaš dom." (rental, `components/Rent/RentSauna.tsx:32`)
- "Vaše želje so naša inspiracija." (custom builds, `components/SavnePoMeri/HeroSection.tsx:19`)
- "Z nami se lahko sprostite" (`components/About/About.tsx:11`)
- "Kupite svoj oddih …" (`components/About/Offers.tsx:10`)
- "Tradicija in kvaliteta" (badge, `components/OPodjetju/HeroSection.tsx:15`)
- Videos so far: "Razkošje popolne sprostitve", "Vaša savna. Vaš ritual."

## Tone of voice

Formal **vikanje** (vi), calm and inviting, about rest and wellbeing more than specs. Examples:

- "Sprostite se v svoji osebni mobilni savni. Nič ne bo oviralo vašega nepozabnega dne."
- "Nakupujte brez stresa z enoletno garancijo …"
- "Izpolnite obrazec za povpraševanje ali nas pokličite. Skupaj bomo ustvarili vašo sanjsko savno."
- "Z veseljem vam pomagamo pri izbiri pravega izdelka …"

The site slips into tikanje in a few places ("Stopi v stik z nami", "Poglej izdelke", "Izberi moc grelca"). Do not copy that: use vi everywhere.

## Typos on the site not to copy

"Najbolše" (homepage hero; correct: Najboljše), "Izbolšanje počutja", "najnoveši", "Po dogovrou", "Zunanja finske savna", and "Oddprodaja" on `public/metadata/odprodaja.jpg`. Worth telling the owner.
