# reel

Remotion videos and post images for client social media campaigns (Kranfix, KFX, Savne Dolium), previewed in each client's Posting Timeline. The `posting-timeline` skill in this repo (`.claude/skills/posting-timeline`) describes the whole workflow. This project was moved here from `kranfix/tools/reel`; paths below such as `apps/webshop/...` refer to the Kranfix repo, `/Users/miha/Documents/Projects/kranfix`, unless they name another project.

## Kranfix

The `LaunchReel` composition is a 13.5 s Instagram reel (1080×1920, 30 fps) announcing the new kranfix.si: repairs, accessories and buyback. It opens with `LogoIntro` and closes with `LogoOutro`.

`remotion.config.ts` points the public folder at the Kranfix repo's `apps/webshop/public` (`../../../kranfix/apps/webshop/public`, or `REEL_PUBLIC_DIR` if set), so the Kranfix reels and posts use the website's real logos and photos. Rendering a Kranfix composition therefore needs the kranfix repo next to this one. Fonts (Manrope, Geist), colours and easing match `apps/webshop/app/globals.css`.

| Scene | Frames | Content |
| --- | --- | --- |
| Intro | 0–90 | `LogoIntro` |
| Announce | 75–150 | "Zdaj na spletu" badge, "Nova spletna stran je zaživela." |
| Repair | 135–210 | Cracked screen is swept into a fixed one: "Popravilo rezervirate v nekaj klikih." |
| Accessories | 195–270 | Case, charger and cable from the site's shop section pop in: "Nakup ovitkov in dodatkov." |
| Buyback | 255–330 | The site's buyback photo with the green Refix mark: "Odkup rabljenih telefonov." |
| Outro | 315–405 | `LogoOutro` |

`LocationReel` is a 16 s reel (1080×1920, 30 fps) announcing the new location, Koroška cesta 4, next to A1. It opens with `LogoIntro` and closes with `LogoOutro`.

| Scene | Frames | Content |
| --- | --- | --- |
| Intro | 0–90 | `LogoIntro` |
| New home | 75–165 | Map pin drops in, "Nova lokacija" badge, "Kranfix ima novo lokacijo poslovalnice!" |
| Address | 150–255 | Google map of Koroška cesta 4 pushes in, the crimson pin lands on Google's marker and pings: "Koroška cesta 4, 4000 Kranj" |
| Next to A1 | 240–330 | Illustrated Globus building with Kranfix (left) and A1 (right) shopfronts; the pin hops from A1 onto Kranfix: "Takoj zraven A1." |
| Hours | 315–405 | "Delovni čas" with the opening hours, row by row |
| Outro | 390–480 | `LogoOutro` |

The map is a Google Maps screenshot in `src/location/assets/koroska-cesta-4.png` (imported, so it stays out of the website's public folder). If you replace it, update `MAP_SIZE`, `MARKER` and `MAP_SCALE` in `src/location/scenes/Address.tsx`. A1 appears only as a plain text sign, without its logo or colours. The opening hours are copied from `apps/webshop/components/home/office-hours.ts` into `src/location/scenes/Hours.tsx`: update both if they change.

`LogoIntro` is a 3 s logo sting (1080×1920, 30 fps) to open reels and other videos. The phone mark is assembled from its three pieces (click and spark when they lock), then KRAN / FIX slide out from behind it and "Popravilo telefonov v Kranju" rises in. The logo paths are animated individually, so they live in `src/intro/logoPaths.ts`, copied from `apps/webshop/public/brand/logo-*-color.svg`. Regenerate that file if the logo changes.

`LogoOutro` is the matching 3 s sting to close videos. The full logo rises in, the crimson top of the I lifts off and X, I, F, KRAN slide back behind the mark, which moves to the centre and lands with a click and spark. Then "kranfix.si" and "Popravila · Nakup · Odkup · Dodatki" rise in and hold to the end. The website footer's Kranj skyline (`home/footer-city.png`) fades in behind them and slowly drifts up.

## KFX

`KfxIntro` and `KfxOutro` (Remotion Studio folder "KFX") are 3 s logo stings (1080×1920, 30 fps) for KFX, the e-scooter and e-bike shop and service in Kranj that was called Krgofix (the `krgofix` project). They do not use any Kranfix file. The logo paths are in `src/kfx/logoPaths.ts`, copied from `krgofix/apps/webshop/public/logo-primary.svg` and split into KF and the two halves of the X; regenerate that file if the logo changes. Colours come from the KFX site's `globals.css`. The site loads no web font (it uses the system sans), so the stings use Inter, the closest Google font.

`KfxIntro` is on white with the colour logo, as in the site's navbar. KF rides in from the left with crimson speed lines, leaning forward, and brakes into place. The X's long blade slashes in, its other half springs in from the right and locks into it with a click and spark, then "Servis e-skirojev in e-koles" rises in.

`KfxOutro` is styled after the site's footer: the white logo (`logo-white.svg`) on `#171717`. The logo rises in, speed lines whip past behind it and it leans into them, then the domain, "Servis · Rezervni deli · Najem" and "E-skiroji in E-kolesa" rise in. The site's hero scooter (`src/kfx/assets/hero.jpg`, from `krgofix/apps/webshop/public/assets/hero.png`) fades in below with the hero's gradient and drifts up. The domain is a prop and defaults to `kfxservis.si`; pass `--props='{"domain":"…"}'` to show another one.

`KfxOutroCharge` is a second version of the outro (3.5 s): the logo charges like a battery. Its outline is drawn on in light grey, then it fills with its own colours in ten ticks, along the letters' slant, while a ⚡ counter runs from 0 % to 100 %. At 100 % there's a ding and the logo pulses, the counter flips up and the domain rises into its place, then "Servis · Rezervni deli · Najem" and "E-skiroji in E-kolesa". Same `domain` prop as `KfxOutro`. The reels still close with `KfxOutro`.

`KfxServiceReel` is an 18 s reel (1080×1920, 30 fps), "Kako poteka servis?", built from the KFX service page (`krgofix/apps/webshop/app/servis` and `components/servis/`). It opens with `KfxIntro` and closes with `KfxOutro`.

| Scene | Frames | Content |
| --- | --- | --- |
| Intro | 0–90 | `KfxIntro` |
| Hero | 75–165 | The page's mechanic photo (`src/kfx/assets/service.jpg`, from `public/assets/cta.png`), "Certificiran servis", "SERVIS E-SKIROJEV IN E-KOLES", 10+ years, and two promises from the info bar: most repairs in 24–48 hours, 12 months' warranty on work |
| Steps | 150–330 | "Kako poteka servis?": the four step cards, one at a time with a click, then each number flips to a tick and a ding |
| Book | 315–465 | "Prijavite se na termin.": the "Rezerviraj termin" button is tapped, then "ali pokličite" and the phone number; the button keeps pulsing and the phone icon rings, so the scene holds for about 5 s |
| Outro | 450–540 | `KfxOutro` |

The steps are copied from `SERVIS_STEPS` in `components/servis/service-process-steps.tsx`, except the first description, which on the site points at "the form below". The promises come from `servis-info-bar.tsx` and the phone number from `constants.ts`: update them here if they change on the site. The icons are Lucide's, copied into `src/kfx/icons.tsx`.

`KfxRenameReel` is a 17 s reel (1080×1920, 30 fps), "Krgofix je zdaj KFX". It opens on the old Krgofix logo instead of `KfxIntro`, because that is the logo followers know, and closes with `KfxOutro`.

| Scene | Frames | Content |
| --- | --- | --- |
| Rename | 0–160 | The old logo winds up and pulls away to the right with speed lines, KFX rides in from the left (`KfxIntro` without its tagline), then "Krgofix" is struck through and "je zdaj KFX." follows |
| Team | 145–235 | The mechanic photo (shared with `KfxServiceReel` in `src/kfx/MechanicPhoto.tsx`): "Novo ime. Ista ekipa.", "Trgovina in servis e-skirojev in e-koles od leta 2019." (the footer's "od leta 2019") |
| Address | 220–330 | "Nova lokacija": a pin drops in, "Drulovka 51, 4000 Kranj", and the opening hours Pon–Pet 9:00–16:00, Sob 9:00–12:00 |
| Website | 315–435 | "Nova spletna stran.": the live homepage scrolls in a phone with the domain in its address bar |
| Outro | 420–510 | `KfxOutro` |

The old logo is in `src/kfx/rename/oldLogo.ts`, from `logo-primary.svg` at the commit before the rebrand (`git show 3dd1016~1:apps/webshop/public/logo-primary.svg` in krgofix). The address and hours are copied from `constants.ts` (they match the live /poslovalnice page); the rebrand moved the address there from Poštna ulica 3a. The phone shows `src/kfx/assets/site-mobile.jpg`, a screenshot of the live homepage at 390 CSS px (2×) with the cookie banner accepted, taken on 7 Nov 2026; retake it if the homepage changes.

## Savne Dolium

`DoliumIntro` (Remotion Studio folder "Dolium") is a 3 s logo sting (1080×1920, 30 fps) for Savne Dolium, the saunas-shop project. The barrel rises in and its three wisps of steam curl up, then it slides aside as "Savne" and "Dolium" rise out of a mask, followed by "Zunanje finske savne in lesene kadi". It does not use any Kranfix file. The logo paths are in `src/dolium/logoPaths.ts`, split from `saunas-shop/public/assets/Logo.svg` into steam, barrel and the two wordmark lines; regenerate that file if the logo changes. Colours and the DM Sans font come from `saunas-shop/styles`.

`DoliumOutro` is a 4 s end card (1080×1920, 30 fps) to close Savne Dolium videos, darker and slower than the intro. A barrel sauna by a lake at golden hour fills the frame, with a slow camera drift and push-in, soft mist rising and fine film grain. The photo then dims and falls out of focus, and the logo (in `primaryLight`) comes into focus over it as its steam curls up. Then "Razkošje popolne sprostitve" (DM Serif Display italic, adapted from the homepage hero's "Prepustite se razkošju popolne sprostitve"), a hairline and a widely spaced "SAVNE-DOLIUM.SI" follow. It has no sound effects; add music in the Instagram app. The photo is `src/dolium/assets/sauna-lake.jpg`, copied from `saunas-shop/public/navbar/sod-savna.jpg`; if you replace it, update `PHOTO_WIDTH` and `FOCUS` in `src/dolium/DoliumOutro.tsx`. `night` (#121019) in `src/dolium/brand.ts` is the only colour that is not on the site.

`RitualReel` ("Na vrtu") is a 13.4 s reel (1080×1920, 30 fps, 402 frames). It is a daylight film of where the sauna stands, not a numbered ritual. Photographs fill the frame and slide across each other. One italic line sits at the lower left. The last photograph stays bright; a small logo and the domain replace the line. It does not use `DoliumOutro`.

| Scene | Frames | Content |
| --- | --- | --- |
| Vrt | 0–110 | The barrel in a garden (`posts/barrel-garden.jpg`, cropped off the "Relax" sign): "Na vrtu." |
| Razgled | 102–198 | The arched window onto the trees (`posts/window-lake.jpg`): "Z razgledom." |
| Les | 190–286 | The wood interior (`posts/custom-interior.jpg`, cropped off the bench engraving): "Iz lesa." |
| Večer | 278–402 | The lakeside barrel (`sauna-lake.jpg`) stays bright under "Za vsak večer.", then the logo and savne-dolium.si |

The photographs are `posts/barrel-garden.jpg`, `posts/window-lake.jpg` and `posts/custom-interior.jpg` from the saunas-shop site, plus `sauna-lake.jpg` (the outro's photograph, used here without the dim). The garden crop stays on the flowers and the round front, clear of the "Relax" sign. The interior crop stays on the stove and the meadow, clear of the brand engraved on the right-hand bench. No sound; add music in the Instagram app. `DoliumIntro` and `DoliumOutro` are unchanged and still used by other films.

`DoliumDec21-RoundReel` ("one round of sauna") is a 17.8 s reel (1080×1920, 30 fps, 534 frames) for 21 Dec, the winter solstice. It keeps the framed night look and closes with `DoliumOutro`. The opening darkens the outro's lakeside barrel so the lit door reads as the longest night. The fire clip is cropped tight so the stove brand on the door stays out of frame.

| Scene | Frames | Content |
| --- | --- | --- |
| 01 Noč | 0–96 | The barrel fills the frame, the window closes: "Najdaljša noč v letu." |
| 02 Krog | 82–172 | The fire: "01 — Krog / 10 do 15 minut." Terme Krka, Talaso Strunjan, "Finska savna" (checked 19 Nov 2026) |
| 03 Para | 158–262 | The stones and steam: "02 — Para / Polijte kamne. / Ne nad peč." Finnish Sauna Society, "Sauna bathing and customs" |
| 04 Mir | 248–338 | The barrel's window onto the trees: "03 — Mir / Ohladite se. / Umirjeno, nato počivajte." |
| 05 Voda | 324–428 | "04 — Voda / Pijte vodo. / Med savnanjem brez alkohola." and "Terme Krka · Suomen Saunaseura". Water: Terme Krka, "Savna rituali". Alcohol: Finnish Sauna Society, "Saunan terveysvaikutukset" |
| Outro | 414–534 | `DoliumOutro` |

No health claims. The Society's own health page says löyly suits pregnancy, so the reel does not tell pregnant people to see a doctor. It has no sound; add music in the Instagram app. The poster is frame 70.

### Savne Dolium posts

`src/dolium/posts/` holds the Savne Dolium feed posts (1080×1350) and Stories (1080×1920), in Studio folder "Dolium-December". The 2 Dec electric-stove carousel and the 4 Dec wood-stove carousel (`december/Electric.tsx`, `december/Wood.tsx`) sit before the 5 Dec "Drva ali elektrika?" Story. Their facts are the FAQ answer on electric versus wood heaters and the supply lines on the foundations page (`ELECTRIC_SUPPLY`, `SAUNA_LIGHTS`, `STOVE_TEMP` in `shared.tsx`). The stove shop categories still show "Kmalu v ponudbi", so the last slide points at the sauna configurator. The Story's tile title and body use DM Serif Display, the same face as the headline. The 11 Dec tub post, the 12 Dec holiday Story and the 14 Dec holiday post are no longer in the timeline. `shared.tsx` has the frame (light pages in `primaryLight`, dark pages in `night`), the logo drawn from `logoPaths.ts`, DM Serif Display headlines with an italic second line (`Soft`), the outlined pill label, the dark pill button, and every fact as a constant with its source: phone, domain, handle, rental prices, the rental refund, heating time, and `MODELS` (sauna names, capacity, price, discount). `slides.tsx` has the slide layouts: `PhotoCover`, `TipSlide`, `StepsSlide`, `ChecklistSlide`, `PriceSlide`, `CtaSlide`, `ProductSlide`, `GiftSlide`.

Products, prices and rental prices are not in the saunas-shop code: they come from the Directus CMS (`cms.savne-dolium.si`, collections `Saunas`, `Products`, `RentPrices`), read on 18 Nov 2026. The rental fallbacks in `components/Rent/RentSauna.tsx` (55/70/200/350 €) are outdated; the live prices are 95/100/250/500 €. Sauna prices are the basic kit with delivery and without a stove, which every product slide says. Update `shared.tsx` and re-render when a price changes. The heating tips are from the shop's blog post, the care rules and winter tub tips from its FAQ (`constants.tsx`), the custom build steps from `components/SavnePoMeri/ProcessSection.tsx`, the rental steps from `components/Rent/Process.tsx` with the site's own icons (`public/icons`, copied to `src/dolium/assets/posts/icons`).

Photos are copied into `src/dolium/assets/posts/` from `saunas-shop/public` (rental trailer and interior, stove, accessories, tubs, gardens) and from the CMS (`products/`, `accessories/`), so no other client's folder is used. The S2V photo is only 600×450 in the CMS; a sharper one from the owner would help. The Christmas card (`december/Holidays.tsx`) keeps the logo and adds hanging baubles, the logo's own barrel in the middle, snowflakes and presents. The New Year card keeps the logo and draws the same kind of shells, in Dolium violet and lilac on the night sky: tapered streaks with pale heads, a lilac willow, confetti and sparkles.

```bash
npx remotion bundle --bundle-cache=false --out-dir=/tmp/dolium-bundle
npx remotion still /tmp/dolium-bundle DoliumDec03-Rent-1 out/dolium/december/DoliumDec03-Rent-1.png   # one still; loop over the IDs for all
```

The December reel on 1 Dec is `RitualReel` (copied to `out/dolium/december/DoliumDec01-RitualReel.mp4`). The 21 Dec reel is `DoliumDec21-RoundReel` (copied to `out/dolium/december/DoliumDec21-RoundReel.mp4`).

`RefurbishedReel` is a 33 s reel (1080×1920, 30 fps), "Kako preverimo obnovljen telefon?", fully animated on a drawn generic phone (`src/refurbished/Phone.tsx`), so it stands for any model. It opens with the question instead of `LogoIntro`, since the first seconds decide whether people keep watching.

| Scene | Frames | Content |
| --- | --- | --- |
| Hook | 0–96 | "Kaj preverimo, preden prodamo obnovljen telefon?", the phone rises |
| Checks | 96–756 | Ten 66-frame checks (lock, battery, display, cameras, sound, charging, buttons and unlock, network, data wipe, cleaning and grade, with the light logo on the screen), each with its own screen in `screens.tsx`, a check mark and a click at frame 44 of the step |
| Promises | 756–840 | The site's three promises for refurbished phones |
| Ending | 825–915 | "Z garancijo" badge, "Obnovljeni telefoni na kranfix.si" |
| Outro | 900–990 | `LogoOutro` |

The ten checks in `Checks.tsx` are claims to customers: keep them to what the shop really does. The battery shows a bar and no number, and the display test flashes once, slowly (WCAG 2.3.1: at most three flashes a second).

`BuybackReel` is a 28 s reel (1080×1920, 30 fps), "Koliko je vreden tvoj stari telefon?": the four steps of kranfix.si/odkup on the same drawn phone, with the site's own words from `apps/webshop/lib/buyback.ts`. Its headlines use the buyback green (`brand.refix`); the site inside the phone keeps its crimson, as on the real page. `src/EndCard.tsx` is the closing card both this reel and `RefurbishedReel` use.

| Scene | Frames | Content |
| --- | --- | --- |
| Hook | 0–96 | "Koliko je vreden tvoj stari telefon?", the phone rises on /odkup |
| Model | 96–186 | Types "iPhone 15 128" (the site's placeholder), picks "Apple iPhone 15 (128 GB)" |
| Stanje | 186–336 | The four questions answered "Da", then "Zelo dobro" |
| Ocena | 336–456 | "Pripravljam …", then the estimate counts up, labelled "Primer" |
| Podatki | 456–576 | Name, "Prinesem v servis", then "Ocena je pripravljena" |
| Inspection | 576–696 | "Končno ceno potrdimo po pregledu.", a magnifier and the "Pregledano" stamp |
| End card | 681–771 | "Odkup telefonov", "Preveri ceno na kranfix.si" |
| Outro | 756–846 | `LogoOutro` |

The estimate is the `estimate` prop, default "280 €": iPhone 15, 128 GB, grade B in `supabase/migrations/20261010140219_buyback.sql`. Check it against the live site before posting. If another session is bundling in this project at the same time, the shared rspack cache can panic ("Transaction already in progress"): bundle once with `npx remotion bundle --bundle-cache=false --out-dir=<dir>` and render from that directory.

`RepairReel` is a 30 s reel (1080×1920, 30 fps), "Razbit ekran? Popravilo rezerviraš v nekaj klikih.": the five booking steps of kranfix.si's repair form on the same drawn phone, with the site's own words and "od" prices from `apps/webshop/lib/repairs.ts` (screen od 89 €, Premium od 129 €, battery od 49 €, charging port od 79 €, Ekspres +20 €). If those prices change in `lib/repairs.ts`, update `src/repair/SiteScreens.tsx` too. `src/site/ui.tsx` holds the site UI both booking reels draw: page, step bar, cards and taps.

| Scene | Frames | Content |
| --- | --- | --- |
| Hook | 0–96 | "Razbit ekran?" on a cracked screen, which clears to the booking page |
| Naprava | 96–171 | Six device tiles, "Telefon" |
| Model | 171–261 | "Apple", then "iPhone 13" |
| Napaka | 261–351 | Screen, battery and port with prices, "Informativno skupaj: od 89 €" |
| Možnosti | 351–501 | "Ugodnejša izbira", Standardno (same day), then scrolls to "Prinesem v servis" |
| Podatki | 501–621 | "Jan Novak", "Jutri", then "Po pregledu potrdimo končno ceno in čas popravila." |
| Same day | 621–741 | "Večino telefonov popravimo še isti dan." with a closing clock |
| End card | 726–816 | "Popravila", "Rezerviraj popravilo na kranfix.si" |
| Outro | 801–891 | `LogoOutro` |

## Commands

```bash
npm i
npm run dev                                                    # Remotion Studio
npx remotion render LaunchReel out/kranfix-launch-reel.mp4 --crf=16
npx remotion still LaunchReel out/kranfix-launch-reel-cover.jpg --frame=125
npx remotion render LocationReel out/kranfix-location-reel.mp4 --crf=16
npx remotion still LocationReel out/kranfix-location-reel-cover.jpg --frame=225
npx remotion render RefurbishedReel out/kranfix-refurbished-reel.mp4 --crf=16
npx remotion render BuybackReel out/kranfix-buyback-reel.mp4 --crf=16 --props='{"estimate":"280 €"}'
npx remotion render RepairReel out/kranfix-repair-reel.mp4 --crf=16
npx remotion render LogoIntro out/kranfix-logo-intro.mp4 --crf=16
npx remotion render LogoOutro out/kranfix-logo-outro.mp4 --crf=16
npx remotion render KfxIntro out/kfx-intro.mp4 --crf=16
npx remotion render KfxOutro out/kfx-outro.mp4 --crf=16
npx remotion render KfxOutroCharge out/kfx-outro-charge.mp4 --crf=16
npx remotion render KfxServiceReel out/kfx-service-reel.mp4 --crf=16
npx remotion still KfxServiceReel out/kfx-service-reel-cover.jpg --frame=145
npx remotion render KfxRenameReel out/kfx-rename-reel.mp4 --crf=16
npx remotion still KfxRenameReel out/kfx-rename-reel-cover.jpg --frame=130
npx remotion render DoliumIntro out/dolium-intro.mp4 --crf=16
npx remotion render DoliumOutro out/dolium-outro.mp4 --crf=16
npx remotion render RitualReel out/dolium-ritual-reel.mp4 --crf=16
npx remotion still RitualReel out/dolium-ritual-reel-cover.jpg --frame=160
```

`out/` is ignored by git. Add music in the Instagram app. `LogoIntro` and `LogoOutro` each have two whooshes and a click (so both reels have them), and `LocationReel` adds whooshes, clicks and a ding to its own scenes, CC0 sounds from Remotion's library (https://www.remotion.dev/docs/sfx), loaded from remotion.media when rendering.

Remotion's agent skills are in this repo's `.claude/skills/remotion-*` (listed in `skills-lock.json` at the repo root; restore with `npx skills experimental_install`). Remotion is free for teams of up to 3; larger companies need a license: https://www.remotion.pro/license

## Posts

`src/posts/` holds the feed posts (1080×1350, 4:5) and stories (1080×1920) as Remotion stills, in the same type, colours and photos as the reels. `shared.tsx` has the frame, headline, badge, footer and photo pieces. Each month has its own folder, and each still's ID starts with its posting date, so `Dec03-Port-1` is the first slide of the 3 December carousel. On 23 Nov 2026 every post from 21 Nov moved 9 days later (the owner was on vacation), except Christmas, buyback and New Year; the 22 Dec battery, 23 Dec before-the-holidays and 28 Dec camera posts were placed around those. The November folder keeps its stills, so most of its IDs now start with `Dec`. Giveaway 1 runs 30 Nov – 11 Dec with the draw on Sat 12 Dec, and its images no longer carry the "Nagradna igra" pill. The captions and the schedule are in the "Kranfix social media plan" doc.

```bash
./render-posts.sh Nov                    # every still dated November → out/posts/<id>.png
./render-posts.sh Dec                    # every still dated December
npx remotion still Dec21-HolidayHours out/posts/Dec21-HolidayHours.png --props='{"dec24":["09:00 – 12:00"],"dec31":[]}'   # [] = closed
```

The giveaway winner Story on 12 Dec has no name in it: it leaves an empty space under "prejme:", where the owner adds the winner as a Mention sticker in Instagram (tappable, and it notifies them); the steps are on the posting timeline. `Dec21-HolidayHours` is a template whose hours for 24 and 31 Dec default to the normal Thursday; it was dropped from the timeline on 18 Nov 2026, but the still is kept for next year. The Christmas and New Year cards (`Holidays.tsx`) are full-bleed, unlike the white posts: crimson with presents, baubles and snow, and a night sky with fireworks, each with the light logo on top. The fireworks are drawn like real shells: each star is a tapered ribbon along a falling arc (`flight`, `ribbon`, `Streak`) with a white-hot head, peonies have an inner ring in a second colour, the bottom-left one is a golden willow whose stars hang in long arcs, and each burst has glitter and a soft light on the sky. Every decoration is SVG drawn in the file, and the scattered snow, stars and confetti use Remotion's seeded `random()`, so re-renders match. `Dec22-Battery-*` uses the same cropped window as the camera slides: `service-battery-fixed.png` is a 1.34× closer crop of the phone, so the two are scaled to the same body width (see `BATTERY_BEFORE` / `BATTERY_AFTER`).

The product shots in `apps/webshop/public/home/` sit on near-white, so `Photo` lifts them 3 % and multiplies them into the page; without that they show a grey box. Story content stays between y 380 and 1560, clear of Instagram's top bar and reply field. The repair steps in `Dec12-Process-*` are copied from `apps/webshop/components/home/process-section.tsx`: update both if they change.
