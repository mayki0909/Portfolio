# Savne Dolium

Outdoor Finnish saunas, wooden and hot tubs and garden buildings, sold online with delivery across Slovenia, plus a mobile sauna for rent and custom-built saunas.

> **Checked 18 Nov 2026** in the repo's working tree (branch `feat/icons-images`), not on the live site. Paths are relative to `/Users/miha/Documents/Projects/saunas-shop`. Products, prices and rental prices live in the Directus CMS, not in the repo: check them on https://savne-dolium.si before they go on a post.

In the site's own words: "Strokovnjaki za zunanje finske savne in lesene kadi. Prodaja in najem kakovostnih sod savn iz termo lesa po Sloveniji." (`schemas.tsx:291`)

## Who is behind it

| | | Source |
|---|---|---|
| Brand | Savne Dolium | `schemas.tsx:11`, footer "Savne Dolium © {year} \| Vse pravice pridržane" |
| Company | Marko Pogačnik s.p. (registration and tax numbers in the same block) | `constants.tsx:10-15`. A code comment says the block may hold placeholders: confirm with the owner before quoting |
| Founded | Unknown. Not in code; the repo starts in Feb 2023 | |
| Showroom | None mentioned anywhere | |

## What they sell

Category names as the site writes them (`config/shopCategories.ts:74-111`, mega menu in `components/Navbar/MegaMenu.tsx`).

| Group | Categories | Notes |
|---|---|---|
| Savne | Zunanje savne, Sod savne, Kvadratne savne, Luxury savne, Notranje savne, IR savne, Dodatki za savne | Luxury savne carry a "Novo" badge. Barrel saunas (sod savne) are the core product |
| Kadi | Vroče kadi, Lesene kadi, Masažne kadi, Ledene kadi, Dodatki za kadi | |
| Vrtno pohištvo | Glamping hiške, Vrtne hiške, Vrtne lope, Otroška igrala, Nadstreški, Paviljoni, Dodatki za hiške | |
| Peči | Električne peči, Peči na drva, Dodatki za peči | Both stove categories show **"Kmalu v ponudbi!"**: not on sale yet (`config/shopCategories.ts:67-71`) |
| Ostalo | Ostali dodatki, **Odprodaja** (clearance) | Odprodaja = any CMS item with a discount; it has its own top-level nav link |

Model names (from the generated sitemap, no prices): saunas S2, S2V, S28V, S3, S3P, S3V, S4P, S4PV, S4D, S5P, Mini 1,6m, Ovalna 2,4×4,1m, Velika ovalna, Vertikalna, Sod za kampiranje 4m, Savna Vision, Savna Cube SQ2R, Vrtni tuš; tubs OCTA, OCTA OVAL, OCTA velika, ROUND, OVAL, QUATTRO, TP2V.

### Services

| Service | What the site says | Source |
|---|---|---|
| **Najem** (mobile sauna rental) | Wood-fired barrel sauna on a single-axle trailer with a Harvia M3 stove, no electricity needed. They deliver it, light it, show how it works and collect it. Per day, weekend or week; longer by agreement. Final cleaning included; delivery priced by location | `constants.tsx:166-175`, `components/Rent/RentSauna.tsx`, `components/Rent/Process.tsx:17` |
| Rental refund | "Vsem, ki bi savno po najemu želeli kupiti povrnemo ceno najema." | `constants.tsx:172` |
| **Savne po meri** (custom builds) | Four steps: 1. Svetovanje, 2. Izris (3D vizualizacija), 3. Izdelava ("Natančna ročna izdelava v naši delavnici"), 4. Montaža. CTA "Brezplačno svetovanje" | `components/SavnePoMeri/ProcessSection.tsx:11-32`, `CtaSection.tsx:17` |
| **Dostava** | Standard delivery to the customer's address is included in every price. Saunas over 2.4 m come by HIAB truck | `components/Dostava/DeliveryConditionsSection.tsx:7,11` |
| Postavitev temeljev | A **guide only**: suitable foundations (concrete slab "vsaj 10 cm z armaturo", pavers, screw or point foundations). The customer prepares the base | `components/PostavitevTemeljev/PrimernePodlageSection.tsx`, `DeliveryConditionsSection.tsx:35` |
| Hot tub rental | "PRIHAJA KMALU" (not available) | `components/Rent/RentOffer.tsx:21-22` |

## Who buys

- Homeowners with a garden: "Primerno za vsako dvorišče" (`components/About/About.tsx:15`), larger models for families of 4 to 8 (`components/About/SaunasDescription.tsx:11`).
- People renting for an event, a birthday or as a gift (`constants.tsx:175`).
- All of Slovenia.

## Promises (only what the site states)

| Promise | Exact wording or value | Source |
|---|---|---|
| Warranty | "enoletno garancijo za vse naše zunanje finske savne in lesene kadi" | `components/About/About.tsx:26` |
| Delivery | Included in the price; cart shows "Brezplačna poštnina" and "Rok dobave 3-4 tedne". Delivery times are "informativni in niso zavezujoči" | `components/Cart/Total.tsx:25-26`, `DeliveryConditionsSection.tsx:23` |
| Assembly | Delivered assembled or as a kit; "Dve osebi … v 1-2 dneh" | `constants.tsx:52` |
| Materials | Spruce and thermowood ("Savne izdelujemo iz dveh vrst lesa: smreke in termo lesa"), thermowood "iz skandinavije", treated "po finski tehniki … 170 do 230 stopinj" | `constants.tsx:56-58`, `About.tsx:21` |
| Stoves | From "vodilnega finskega proizvajalca HARVIA"; custom builds also name Tylo | `constants.tsx:64`, `components/SavnePoMeri/DetailsSection.tsx:24` |
| Heating | Barrel sauna heats to 90 °C in "30-40 minut"; about 20 % lower consumption thanks to the shape. Tubs 700–3600 L, 24–35 kW stoves, heat in 1–3 h | `constants.tsx:41,46,145` |
| Payment | Card or pro-forma invoice (Stripe). **No financing or instalments** | `components/Cart/Cart.tsx:161,167` |

## Contact

| | | Source |
|---|---|---|
| Website | https://savne-dolium.si | `k8s-files/web-deployment.yaml:32` |
| Phone | +386 68 601 072 | `constants.tsx:5` |
| Email | info@savne-dolium.si | `constants.tsx:6` |
| Address | Dolenja vas 47A, 4227 Selca (contact page, with map). **See open questions** | `constants.tsx:15`, `components/Contact/ContactMap.tsx:31-34` |
| Hours | Mo–Fr 08:00–16:00, only in structured data, not shown on the site | `schemas.tsx:311` |
| Instagram | https://www.instagram.com/savne_dolium (`@savne_dolium`) | `constants.tsx:3` |
| Facebook | https://www.facebook.com/profile.php?id=100090625181069 | `constants.tsx:4` |
| Other networks | None in code | |

## Prices

Product prices are **not in the repo**: they come from the Directus CMS at runtime (`services/*.tsx`). Read them on the live product page.

Mobile sauna rental, code fallbacks that match the structured data (`components/Rent/RentSauna.tsx:84-99`, `schemas.tsx:393-426`). The live values come from the CMS (`RentPrices`) and may differ:

| Package | Price |
|---|---|
| Pon–Čet | 55,00 € / dan |
| Pet–Ned | 70,00 € / dan |
| Vikend paket (Pet–Ned) | 200,00 € |
| Tedenski paket (Pon–Ned) | 350,00 € |

"V ceno je všteto končno čiščenje, stroški dostave po dogovoru odvisno od lokacije najema."

## Open questions for the owner

Sources disagree. Do not pick one silently: ask, or leave the detail out of the post.

- **Location:** contact page and legal data say Dolenja vas 47A, 4227 Selca; the homepage contact block and the LocalBusiness schema say Škofja Loka (`components/Contact/Contact.tsx:28`, `schemas.tsx:298`).
- **Barrel sauna capacity:** FAQ "od 2 do 6 oseb" (`constants.tsx:41`) vs "za družine od 4 do 8 oseb" (`SaunasDescription.tsx:11`).
- **Rental sauna capacity:** "do 4 oseb" (`RentSauna.tsx:55`) vs "4 - 5 oseb" (`constants.tsx:169`).
- **Wood types:** spruce and thermowood (`constants.tsx:56`) vs custom builds in "nordijska smreka, macesen, termo les, lipa ali trepetlika" (`SavnePoMeri/DetailsSection.tsx:14`).
- **Delivery time:** "3-4 tedne" in the cart, but delivery times "niso zavezujoči".
- **Legal data:** a code comment says it may be placeholders.

## Do not claim

- A showroom, a founding year, financing or instalments.
- That they build foundations (the site only advises).
- Stoves as available (both stove categories are "Kmalu v ponudbi!") or hot tub rental (coming soon).
- A fixed delivery date.
- Anything from Terms, Privacy or Cookies: those pages are still Lorem ipsum (`components/Terms/Terms.tsx`).
- Testimonials from `constants.tsx:18-34` (unused placeholders; live reviews are in the CMS), or copy from the unused `components/About/AboutSaunas.tsx` and `components/Rent/Gifts.tsx` (gift vouchers): neither is live.
