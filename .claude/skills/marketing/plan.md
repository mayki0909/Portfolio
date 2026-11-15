# Stage 1: Plan

Produce the calendar that the other two stages build: for each posting day a date, a time, a format, a topic, a caption, and either finished media or a brief for it.

## 1. Collect the facts first

Before writing any post, gather and write down, with the source and the date checked:

- Name and handle exactly as on the profile (KFX: `@kfx_kranj`). Check the real profile; site links can be stale.
- Address, phone, opening hours, website and booking URL.
- What they sell and what they do, in their own words, with current prices for anything a post will name.
- Their promises: warranty, turnaround, free services, pickup. Only the ones the site states.
- What sets them apart from local competitors.
- What changed recently: new name, location, website, products.
- Brand: logo file, colours, fonts, existing photos.

If two sources disagree (KFX: "od leta 2019" in the footer, "več kot 10 let" on a page), do not pick silently. Use one consistently and flag the conflict in the post's note so the owner decides.

These facts go into the comment above `DAYS` in the timeline and into the shared constants of the client's Remotion folder, so every post reads from one place.

## 2. Lay out the calendar

- **Period:** usually two months. Start a few days after today, so the owner has time to review.
- **Cadence:** about three feed posts a week, with a day or two between them (KFX ran Mon/Wed/Fri or Tue/Thu/Sat patterns, 9 to 12 items a month). Fewer good posts beat daily filler. If the client's offer names a number of posts per month, plan that number.
- **Time:** one default time for the campaign (KFX: 17:30) and a different time only with a reason: a lights post at 16:00 just before dark, a Black Friday offer at 08:00, a Saturday Story at 10:00 inside opening hours. Times are suggestions, not measured best times; say so.
- **Anchor on real dates first:** the client's own news (launch, rename, move), then the calendar (Black Friday, Cyber Monday, Miklavž, Christmas, New Year, season start and end, school holidays, law changes). When a date falls on a closed day, move the post to the nearest open day and say why in the note.
- **Then fill with evergreen value:** how-to and care advice, rules people must know, what the service includes, the right spare part, signs something needs a service.

## 3. Mix formats by what the post has to do

| Format | Size | Use for |
|---|---|---|
| Reel | 1080×1920, 15 to 20 s | Reach and announcements: news, a process, a strong hook. Opens on the hook, not on a logo sting, unless the logo is the news |
| Carousel | 1080×1350, 2 to 7 slides | Things people save or share: rules, steps, checklists. One point per slide, the action on the last |
| Single image | 1080×1350 | One message: an offer, opening hours, a greeting, one service |
| Story | 1080×1920 | Reminders and teasers around a feed post: "coming Friday", "last day" |

A typical month for KFX: 3 reels, 3 to 4 carousels, 3 to 4 single images, 1 to 2 Stories. Do not put two sales posts next to each other; alternate selling with useful posts.

## 4. Write the captions

- Slovenian, formal plural (vi). Short sentences. No emoji unless the client already uses them.
- **The first paragraph is the hook.** It is all a follower sees before "… more", so it must carry the post alone. Leave a blank line after it.
- Then the body: the facts, a numbered list where the carousel has one.
- Then one clear action with the real contact: booking URL, phone, or address and hours.
- Last line: three hashtags, lowercase, no diacritics: brand, town, topic (`#kfx #kranj #eskiro`).
- Slovenian formats: `17,99 €`, `24–48 urah`, `9.00–16.00`, `24. 12.`
- No promises of results, no superlatives, no claims the site does not make.
- A template caption keeps its placeholder in square brackets: `[PONUDBA: −XX % na …]`, `[datum]`.

## 5. Write the reviewer note for each day

One or two sentences in English that tell the owner what they need to know or do:

- what the post is for ("A post people save", "Off-season booking push");
- what to check before posting ("Check the three prices on the site before posting");
- what must happen first ("Rename the Instagram profile first. Pin this reel");
- for a template, exactly what is missing and what happens once it is set ("then re-render the image");
- for anything done in the app, that it is not in the file ("add music in the app").

## 6. Brief the media that is not made yet

For each image or reel still to make, write a brief that is enough to build it: scenes or slides in order, the on-screen text, the products with their prices, the photos to use. Note when a real photo or clip from the client would be better than a rendered one, and keep the rendered one as the fallback.

## Output of this stage

The entries of the `DAYS` array described in `timeline.md`, complete except for media paths. Show the calendar to the user as a short table (date, format, topic, status) before spending time on media, and proceed unless they change it.
