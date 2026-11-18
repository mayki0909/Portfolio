# KFX: marketing so far

Updated 18 Nov 2026.

| | Where |
|---|---|
| Offer (marketing-only: monthly package and campaigns) | `public/offer/kfx.html`, https://znidar.dev/offer/kfx |
| Posting Timeline | https://claude.ai/artifact/Djh8jHt5VkqZEY3S44jXrQ, also `public/marketing/kfx-2026.html` (https://znidar.dev/marketing/kfx-2026, noindex). Local source `tools/reel/out/kfx/timeline/` (copy of 9 Nov; the artifact is newer if they differ) |
| Instagram | `@kfx_kranj` (renamed from `@krgoservis`) |

## Campaign November–December 2026

22 posting days, 12 Nov to 30 Dec, default time 17:30.

| Dates | Posts |
|---|---|
| 12–16 Nov | Rename: "Krgofix je zdaj KFX" reel (pin it), "what's new" carousel, service reel |
| 18–23 Nov | Winter: battery care carousel, lights carousel (posted at 16:00), winter service reel |
| 25–30 Nov | Black Friday teaser Story, **Black Friday offer (template)**, **Cyber Monday Story (template)** |
| 1–14 Dec | Inner tubes carousel, gifts reel (planned), Miklavž Story, robots reel (planned), e-scooter rules 2026 carousel, free diagnostics and pickup, "5 signs it needs a service" reel (planned) |
| 16–30 Dec | **Last order day (template)**, **holiday hours (template)**, "first 5 steps with a new e-scooter" carousel, Christmas, service in January, "happy 2027" reel (planned) |

Templates wait for the owner: the Black Friday and Cyber Monday offers, the last order date, the holiday hours. Planned reels have a brief but no media yet.

## Videos and posts (Remotion, `tools/reel/src/kfx`)

Documented in `tools/reel/README.md`, section "KFX". Studio folders "KFX", "KFX-November", "KFX-December".

| Composition | What it is |
|---|---|
| `KfxIntro` / `KfxOutro` | 3 s logo stings: KF rides in and brakes, X locks with a spark / footer-style white logo on `#171717` with the hero scooter. `domain` prop defaults to `kfxservis.si` |
| `KfxOutroCharge` | 3.5 s outro where the logo charges like a battery, 0 → 100 % |
| `KfxRenameReel` | 17 s "Krgofix je zdaj KFX": old logo out, KFX in, team, Drulovka 51 and hours, new site in a phone |
| `KfxServiceReel` | 18 s "Kako poteka servis?": promises, four steps, "Rezerviraj termin" and phone |
| `KfxWinterReel` | 16 s winter service reel, opens on a snowy scooter |
| `posts/november`, `posts/december` | Feed posts and Stories (1080×1350, 1080×1920): Rename, Battery, Lights, BlackFriday, Tubes, Rules, FirstRide, Singles (Miklavž, diagnostics, last order, holiday hours, Christmas, January) |

Renders: `tools/reel/out/kfx/november/`, `tools/reel/out/kfx/december/`, `tools/reel/out/kfx-*.mp4`. `out/` is not in git.

## Decisions this campaign made

No engagement data has been collected yet, so these are the plan's choices, not measured results.

- Followers know the old name: rename content opens on the Krgofix logo, then shows KFX.
- Useful posts people save (battery care, rules, first steps) alternate with sales posts; two sales posts never sit next to each other.
- Service content leads with free diagnostics and pickup, which the plan treats as what sets KFX apart in Gorenjska (the owner should confirm rivals do not offer it).
- E-scooter rules since 28 Feb 2026 (riders 15 and over, helmet until 18, 25 km/h) come from policija.si and Uradni list RS 16/2026, named on the post. Gift content says on screen that e-scooters are for riders 15 and over.
- A real photo from the shop (team, Christmas, robot in the showroom) would replace the rendered fallback wherever the owner can supply one.
