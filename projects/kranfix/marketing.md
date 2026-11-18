# Kranfix: marketing so far

Updated 18 Nov 2026.

| | Where |
|---|---|
| Offer (website, admin system, import, marketing) | `public/offer/kranfix.html`, https://znidar.dev/offer/kranfix |
| Posting Timeline | https://claude.ai/artifact/CtauMamWm6Yr8b9cBe2zVQ. Local source `tools/reel/out/kranfix/timeline.html` (reads `../posts/*.png`) |
| Campaign plan and captions | The "Kranfix social media plan" doc |
| Instagram / Facebook | `@_kranfix_` / "Popravilo mobilnih telefonov ter tabličnih računalnikov KranFix". New profile picture and cover in `tools/reel/out/facebook/` (`FacebookImages.tsx`) |

## Campaign November–December 2026

16 posting days, 18 Nov to 30 Dec.

| Dates | Posts |
|---|---|
| 18–27 Nov | "Tag a friend" posts (broken screen, empty battery), charging port carousel |
| 21 Nov – 3 Dec | **Giveaway 1, "Popravilo na naš račun"**: free labour, the winner pays for parts. Follow, like, comment; closes 2 Dec at 23.59, draw 3 Dec. Stories: 4 days left, last day, **winner (template: needs `winner`)** |
| 30 Nov – 3 Dec | Screen replacement carousel, "how a repair works" carousel |
| 9–15 Dec | Christmas gifts (accessories) carousel, battery carousel, camera glass carousel |
| 18–30 Dec | Before the holidays, **holiday hours (template: 24 and 31 Dec unknown)**, Christmas, buyback ("Nov telefon pod jelko?"), happy 2027 |

A second December giveaway was dropped.

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
