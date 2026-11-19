# Post catalog

Every kind of post built so far, with the file to start from. A new post starts from the closest existing one: copy its layout and building blocks, then change the content. Paths are under `tools/reel/src/`. Feed posts are 1080×1350 (`POST`), Stories 1080×1920 (`STORY`), reels 1080×1920 at 30 fps.

Each client has one shared file with its frame, type and facts. Use it, never retype a fact:

| Client | Shared building blocks | Look |
|---|---|---|
| Kranfix | `posts/shared.tsx` (`PostFrame`, `Footer`, `Headline`, `Accent`, `Lead`, `Badge`, `Photo`, `PhotoCard`, `StateChip`, `TagBubble`, `ADDRESS`), `posts/giveaway.tsx` | White page, Manrope 800 headlines with the crimson (`#af1a44`) line in `<Accent>`, Geist body, logo and address footer on a hairline |
| KFX | `kfx/posts/shared.tsx` (facts: `STREET`, `PHONE`, `DOMAIN`, `HOURS`, light/dark `palette`), `kfx/posts/slides.tsx` (`ScooterCover`, `TipSlide`, `BigFigure`, `IconVisual`, `BookCta`, `BookButton`), `kfx/posts/Photo.tsx` | Inter, crimson and black, light pages and the site's dark footer colour, the hero scooter as the recurring photo |
| Savne Dolium | `dolium/posts/shared.tsx` (facts: `PHONE`, `DOMAIN`, `RENT`, `MODELS`; `PostFrame`, `Headline` with `Soft`, `Label`, `Button`, `Photo`, `DoliumLogo`), `dolium/posts/slides.tsx` (`PhotoCover`, `TipSlide`, `StepsSlide`, `ChecklistSlide`, `PriceSlide`, `CtaSlide`, `ProductSlide`, `GiftSlide`), `dolium/film.tsx` for reels | DM Serif Display headlines with an italic second line, DM Sans text, violet on `primaryLight` pages or `night` dark pages, warm photos, pill labels and buttons |

## Feed posts

| Type | Use for | Examples (ID) | Start from |
|---|---|---|---|
| Single message | One point: a service, a promise, a reminder | `Dec18-Holidays`, `KfxDec11-Diagnostics`, `KfxDec28-January` | `posts/december/Posts.tsx` (`HolidayHelp`), `kfx/posts/december/Singles.tsx` |
| Tag a friend | Comments and reach, never on a giveaway post | `Nov18-TagScreen`, `Nov27-TagBattery` | `posts/november/TagPosts.tsx` (`TagBubble`) |
| Before/after carousel, 2 slides | A repair shown on the website's own before/after photos | `Nov24-Port-*`, `Nov30-Screen-*`, `Dec12-Battery-*`, `Dec15-Camera-*` | `posts/november/Carousels.tsx`, `CropSlide` in `posts/december/Posts.tsx`: the headline on top, a 1080×640 crop window below, a `Pred`/`Po` chip. The crop maths is in the comments; two photos of different zoom are scaled to the same body width |
| Steps carousel | How a process works, one step per slide | `Dec03-Process-*` (Kranfix repair), `KfxDec22-FirstRide-*` | `ProcessCover`/`ProcessStep` in `posts/november/Carousels.tsx`; `FirstRide.tsx` for KFX |
| Tips or rules carousel | Things people save: care advice, traffic rules. Cover, one tip per slide, booking slide last | `KfxNov18-Battery-*` (7), `KfxDec09-Rules-*` (7), `KfxNov20-Lights-*` | `kfx/posts/slides.tsx` (`TipSlide` with `BigFigure` or `IconVisual`, `BookCta`). A rule names its official source on every slide, because slides get shared one at a time |
| Product carousel | Shop items: gift ideas, spare parts with prices | `Dec09-Gifts-*`, `KfxDec01-Tubes-*` | `GiftsCover`/`GiftSlide` (`ProductTile`) in `posts/december/Posts.tsx`; `Tubes.tsx` for KFX. Product PNGs carry wide transparent margins, so they get a `zoom` |
| News carousel | A rename, a move, a new website | `KfxNov14-Rename-*` | `kfx/posts/november/Rename.tsx` |
| Offer, template | Black Friday and other discounts. The owner sets the offer | `KfxNov27-BlackFriday` | `kfx/posts/november/BlackFriday.tsx`: `discount`, `subject` and `until` are props whose defaults are visible placeholders (`OFFER_PLACEHOLDER`) |
| Opening hours, template | Holidays and other changed hours | `Dec21-HolidayHours`, `KfxDec18-HolidayHours` | `HolidayHours` in `posts/december/Posts.tsx`: `dec24` and `dec31` props default to the normal day until the owner confirms; `[]` renders "Zaprto" |
| Deadline | Last day to order or bring something in before a holiday | `KfxDec16-LastOrder` | `LastOrderPost` in `kfx/posts/december/Singles.tsx` (`orderBy`, `pickupBy` props) |
| Second-brand post | A sub-brand with its own colour (Kranfix buyback is Refix green) | `Dec27-Buyback` | `Buyback` in `posts/december/Posts.tsx` |
| Holiday greeting | Christmas, New Year, other holidays | `Dec24-Christmas`, `Dec30-NewYear`, `KfxDec24-Christmas` | `posts/december/Holidays.tsx`. See "Holiday cards" below |

## Stories

Content stays between y 380 and 1560: Instagram covers about 250 px at the top and 340 px at the bottom.

| Type | Examples | Start from |
|---|---|---|
| Giveaway set: opens, reminder ("Še 4 dni"), last day, winner | `Nov21-GiveawayStory`, `Nov28-GiveawayReminderStory`, `Dec02-GiveawayLastDayStory`, `Dec03-GiveawayWinnerStory` | `posts/november/Giveaway.tsx` with `posts/giveaway.tsx` (`StoryFrame`, `Steps`, `JoinLine`, `handleSize`). The winner is a `winner` prop, `@profil` until the draw |
| Teaser and last chance around an offer | `KfxNov25-BlackFridayTeaserStory`, `KfxNov30-CyberMondayStory` | `kfx/posts/november/BlackFriday.tsx` |
| Calendar day | `KfxDec05-MiklavzStory` (Miklavž on a Sunday, posted on Saturday with Saturday's hours) | `kfx/posts/december/Singles.tsx` |

## Giveaway

A giveaway is one feed post plus four Stories: opens (same day as the post), reminder (about four days before the end), last day, winner (the morning after the draw). The deadline is one constant (`DEADLINE`) used in the badge and in the reminder's text; the draw date and the winner's reply deadline are in the winner Story. The caption carries the full rules: how to enter, the end date and time, the draw date, the rules page URL and Meta's disclaimer ("Meta, Instagram in Facebook nagradne igre ne sponzorirajo …"). The rules page on the client's site must exist, with the same dates, before the post goes out; that is the owner's or the developer's step, so say so in the note. Do not ask for tags on a giveaway post.

## Reels

| Client | Reels | Pattern |
|---|---|---|
| Kranfix | `LaunchReel`, `LocationReel`, `RefurbishedReel`, `BuybackReel`, `RepairReel` | `LogoIntro` (3 s), three or four scenes of about 2.5 s with short overlaps, `LogoOutro` (3 s) |
| KFX | `KfxServiceReel`, `KfxRenameReel`, `KfxWinterReel` | `KfxIntro`, scenes, `KfxOutro` or `KfxOutroCharge` |
| Savne Dolium | `RitualReel`, `DoliumDec21-RoundReel` | `DoliumIntro`, footage clips slowed to fill each shot, `DoliumOutro` |

The README in `tools/reel` has every reel's scene table with frame ranges. A reel's cover for the timeline is a still of a frame that shows the subject and headline (`npx remotion still <Reel> <file>.jpg --frame=<n>`).

## Holiday cards

Greeting posts are the one place to leave the white page. Kranfix's Christmas and New Year (`posts/december/Holidays.tsx`) are the reference:

- **Full bleed in the brand colour or a night sky**, not `PostFrame`. Christmas: a crimson radial gradient. New Year: near-black with a crimson glow at the bottom.
- **The logo big on top**: `<Logo height={104} tone="onDark" />`, centred above the headline. No footer logo; the address can sit small at the bottom (on the snow).
- **Headline centred**, two lines, white and a light tint of the brand colour (`#ffd3df` on crimson, `#ff6f97` with a soft `textShadow` glow on night).
- **Motifs drawn in SVG in the file**, so they stay in the brand's colours and need no stock images: presents (box, lid, ribbon, bow, dots or stripes, a gift tag with the logo mark), baubles on strings, snowflakes and soft flakes, a snowdrift; fireworks drawn like real shells (each star a tapered ribbon along a falling arc with a white-hot head, an inner ring in a second colour, a golden willow, glitter, a soft light on the sky; straight rays ending in dots looked like clip art and were redone), faint rocket trails rising from the bottom edge, confetti and four-point sparkles.
- **Seeded randomness**: scatter snow, stars and confetti with Remotion's `random("<seed>")`, never `Math.random()`, so every render is the same.
- **Keep motifs off the logo and the headline**: place the big elements by hand around the text, and skip scattered pieces inside the text's box.
- **Check contrast against the background, not just the white page**: a crimson bow on a crimson background disappears. On crimson use white, pink, ink or a deep wine (`#6e0d29`) for ribbons and bows.
- No characters or brands that belong to someone else (no Coca-Cola Santa, no film characters); generic winter and holiday shapes only.
- Render, look at the PNG, and adjust positions once or twice; these cards always need a second pass.

## Rules that hold for every post

- Facts come from the client's shared constants, which name their source. A price, an hour, a warranty is never typed into a post directly.
- What the owner decides is a prop with a visible placeholder default, and the post is marked as a template in the timeline.
- Text big enough for a phone; the footer and Story safe zones respected; no more than three flashes a second in a reel.
- Another company appears only as plain text, without its logo or colours.
- Render and look at every image before calling it made.
