# Reschedule an existing timeline

Use this when posts are dropped, moved or added in a campaign that already has media and a published timeline: "remove the first two reels", "start from today and move everything", "drop the December giveaway". The reference case is Kranfix on 18 Nov 2026: the 9 and 12 Nov reels were removed, everything from 15 Nov moved three days later, and the December giveaway with its four Stories and winner post was removed.

A date is printed in more places than the timeline's `date` field. Missing one leaves a post that says "do nedelje, 29. 11." under a giveaway that now ends on 2 Dec.

## 1. Read what is live

- Artifact `read` with the client's `url` (no `path`), and `list` with `scope: "files"`. Save the page with `read` and `path: "index.html"` and edit that copy.
- Compare it with the local copy in `tools/reel/out/…` (Kranfix's local one is the preview variant, see `timeline.md`).

## 2. Decide the new calendar, then show it

Write the old and new date of every remaining post. Apply the request literally, with these exceptions, each stated to the user:

- **Posts tied to a calendar date stay**: holiday hours, Christmas, New Year, Black Friday, Miklavž, the post after Christmas about new phones. Shifting them would put them after the day they are about. Keep them and let the gap close.
- **Shift from the latest date to the earliest** when editing, so a moved post never lands on a date that has not been moved yet.
- **A post that loses its reason moves its note with it**: the screen carousel was "Black Friday" on 27 Nov; on 30 Nov the note no longer says so.
- **Deadlines that land on a closed day** (a winner's reply deadline on a Sunday) move to the next working day; say which ones you changed.
- **Removing something that other posts reference** (a giveaway) removes all of it: the post, every Story, the winner post, the template notes in the month paragraph, and the caption lines that mention it elsewhere.

Show the user a short table (old date → new date, removed, unchanged) and continue unless they object.

## 3. Find every printed date

Search the composition files, the captions and the notes for the old dates and the weekdays that go with them:

```bash
cd tools/reel
grep -rnE "[0-9]{1,2}\. ?1[12]\.|nedelj|ponedelj|torek|tork|sred|četrt|petek|petk|sobot" src/<client-or-posts>
grep -rnE "(Mon|Tue|Wed|Thu|Fri|Sat|Sun) [0-9]+ (Nov|Dec)" src README.md render-posts.sh
```

Places a date hides:

| Where | Example |
|---|---|
| Constants in the post files | `DEADLINE = "Do nedelje, 29. 11."` |
| Text inside an image | "Do nedelje, 29. 11., lahko še sodeluješ …", "Javi se nam v sporočilu do četrtka, 3. 12." |
| Comments above components | `/** Wed 18 Nov feed post. */`, `/* ---------- Sun 6 Dec: Christmas gifts ---------- */` |
| Composition IDs | `Nov18-Giveaway` |
| The caption in `DAYS` | "Nagradna igra traja do nedelje, 29. 11., do 23.59. … v ponedeljek, 30. 11." |
| The note in `DAYS` | "Black Friday. …", "Giveaway 1 opens …" |
| The page header and month paragraphs | "9 Nov to 30 Dec 2026", "Three are templates to re-render: the prize (3 Dec) …" |
| README and `render-posts.sh` examples | `npx remotion still Nov30-GiveawayWinnerStory …` |
| Outside this repo | The giveaway rules page on the client's site, the client's plan doc. You cannot change these here; list them for the user |

When a date moves, the weekday word moves with it: "do nedelje, 29. 11." becomes "do srede, 2. 12.", not "do nedelje, 2. 12.". Work the weekday out from the date.

## 4. Change the source

- Rename each moved composition ID to its new date. A series that now crosses into the next month keeps its folder and takes the new month's prefix (`Dec02-GiveawayLastDayStory` stays in `posts/november/`); say so in that `index.tsx`'s comment.
- Update the constants, image text and comments found in step 3.
- Delete removed compositions from the `index.tsx`. If a component file is no longer used anywhere, `git rm` it rather than leaving dead code.
- Update the README's examples and its list of templates.
- `npm run lint`, then `npx remotion compositions --quiet` to see the final list of IDs.

## 5. Re-render

Every renamed still needs a file under its new name, so re-render all of them rather than picking:

```bash
mkdir -p <scratchpad>/old-posts && mv out/posts/*.png <scratchpad>/old-posts/   # Kranfix: keep the old renders aside, don't delete
./render-posts.sh Nov && ./render-posts.sh Dec                                   # in the background; ~30 stills take a few minutes
```

For other clients render per ID into `out/<client>/<month>/`. Then convert to JPGs for the page (`media.md` step 5). Open the stills whose text changed and check the new dates are on them.

## 6. Update the page

In the saved `index.html`:

1. Delete the removed days from `DAYS` (and the empty line a removed block leaves).
2. Shift the `date` of each moved day, latest first.
3. Rename every `img("<old id>")` to the new ID.
4. Fix captions and notes from step 3, the header's period, and each month paragraph (what is made, which posts are templates).
5. If a month now has no reels, drop "play the reels" from its paragraph.

Check the result before publishing: list the `date:` lines in order, and the set of `img(…)` IDs, and compare that set with the files in `media/`.

## 7. Publish and tidy

Republish to the same `url` (`timeline.md` step 5): the page, every new JPG, and `null` for every old name and every removed reel or cover. Then write the local copy from the published page (Kranfix: swap the `img()` line back to `../posts/<id>.png`).

## 8. Report

Say which posts were removed, which moved and to what dates, which stayed and why, every deadline or weekday you changed in images and captions, the gaps the change left in the calendar, and what must change outside the repo (rules page, plan doc, anything already scheduled in Meta). A post that falls on today is worth naming.
