# Kranfix: marketing so far

Updated 18 Nov 2026.

| | Where |
|---|---|
| Offer (website, admin system, import, marketing) | `public/offer/kranfix.html`, https://znidar.dev/offer/kranfix |
| Posting Timeline | https://claude.ai/artifact/CtauMamWm6Yr8b9cBe2zVQ. Local source `tools/reel/out/kranfix/timeline.html` (reads `../posts/*.png`) |
| Campaign plan and captions | The "Kranfix social media plan" doc |
| Instagram / Facebook | `@_kranfix_` / "Popravilo mobilnih telefonov ter tabličnih računalnikov KranFix". New profile picture and cover in `tools/reel/out/facebook/` (`FacebookImages.tsx`) |

## Campaign November–December 2026

15 posting days, 18 Nov to 30 Dec. On 23 Nov 2026 everything from 21 Nov moved 9 days later because the owner was on vacation (nothing posted 19–29 Nov); Christmas, buyback and New Year kept their dates.

| Dates | Posts |
|---|---|
| 18 Nov | "Tag a friend": broken screen |
| 30 Nov – 12 Dec | **Giveaway 1, "Popravilo na naš račun"**: free labour, the winner pays for parts. Follow, like, comment; opens Mon 30 Nov, closes Fri 11 Dec at 23.59, draw Sat 12 Dec, winner replies by Wed 16 Dec. Stories: 4 days left (7 Dec), last day (11 Dec), winner (12 Dec, name added in Instagram). No "Nagradna igra" pill on the images |
| 3–12 Dec | Charging port carousel (3 Dec), "tag a friend": empty battery (6 Dec), screen replacement carousel (9 Dec), "how a repair works" carousel (12 Dec) |
| 18–23 Dec | Christmas gifts carousel (18 Dec), battery carousel (22 Dec), before the holidays (23 Dec) |
| 24–30 Dec | Christmas (24 Dec), buyback ("Nov telefon pod jelko?", 27 Dec), camera glass carousel (28 Dec), happy 2027 (30 Dec) |

The holiday hours post was dropped on 18 Nov 2026 (`Dec21-HolidayHours` is kept for next year). A second December giveaway was dropped.

## Videos and posts (Remotion, `tools/reel/src`)

Documented in `tools/reel/README.md`, section "Kranfix". The Kranfix compositions read the website's real files from `../kranfix/apps/webshop/public` (`remotion.config.ts`), so the kranfix repo must sit next to this one.

| Composition | What it is |
|---|---|
| `LogoIntro` / `LogoOutro` | 3 s stings: the mark assembles with a click and spark, "Popravilo telefonov v Kranju" / logo with the Kranj skyline, "Popravila · Nakup · Odkup · Dodatki" |
| `LaunchReel` | 13.5 s: new kranfix.si, repairs, accessories, buyback |
| `LocationReel` | 16 s: new location Koroška cesta 4, next to A1, opening hours |
| `RefurbishedReel` | 33 s: the ten checks before a refurbished phone is sold |
| `BuybackReel` | 28 s: "Koliko je vreden tvoj stari telefon?", the /odkup flow; `estimate` prop (default "280 €", check live) |
| `RepairReel` | 30 s: booking a repair in five steps. **Shows the old booking form** (Premium/Ugodnejša, Ekspres +20 €), which the site no longer uses: rebuild before reposting |
| `posts/november`, `posts/december` | Feed posts and Stories: tag posts, giveaway, carousels, holiday cards |

Renders: `tools/reel/out/kranfix-*.mp4`, `tools/reel/out/posts/` (render with `./render-posts.sh Nov`).

## Notes for the next campaign

- Captions so far use **ti**, the site mostly **vi**: keep one per client (see `brand.md`).
- Every repair price on a post is "od" and "končno ceno potrdimo po pregledu".
- `RepairReel` needs rebuilding against the current booking form before it is used again.
