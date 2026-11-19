# Stage 3: Posting Timeline

Build the review page and publish it as an Artifact. The page is one HTML file that renders a `DAYS` array as Instagram-style posts, carousels, reels and Stories along a date rail, plus a `media/` folder.

## 1. Start from the right source

| Case | Start from |
|---|---|
| New client | `reference/timeline.html` in this skill's folder, copied to `tools/reel/out/<client>/timeline/<client>-timeline.html` in this repo |
| Existing client, same or next period | That client's existing file in `out/<client>/timeline/`. If it is not on this machine, read the published artifact (Artifact `read`, then its `media/` files by path) and save it there |

Before changing an existing timeline, read the live artifact (Artifact `read` with its `url` and no `path`: that is also what allows the republish) and compare it with the local file. The owner or the user may have changed it since; build on the newer one. `read` with `path: "index.html"` saves the live page to the scratchpad, which is the easiest file to edit and publish from.

**Kranfix is laid out differently.** Its local copy, `tools/reel/out/kranfix/timeline.html`, is a preview variant: its `img()` returns `../posts/<id>.png`, the full renders, while the published page's returns `media/<id>.jpg`. Everything else is the same. Edit the live page, publish it, then write the local copy from it by swapping that one line. Kranfix stills render to `out/posts/`, not `out/kranfix/<month>/`.

Do not redesign the page. The layout, both colour themes and the phone layout are done; a new client changes only the things below.

## 2. Client-specific parts

- `<title>`: `<Client> Posting Timeline`.
- `--accent` and `--accent-soft` in all three colour blocks (light, dark by media query, dark by `data-theme`): the client's brand colour, with a lighter variant for dark mode that still reads on the dark surface.
- `media/logo.svg`, and the logo's three sizes (header `.brand-logo img`, `.avatar img`, `.story .story-head .avatar img`, and the matching `width`/`height` attributes), set to its real aspect ratio. A wide logo sits small on a white disc, as Instagram crops it.
- `HANDLE` (without `@`), `TIME` (the campaign's default posting time) and `PERIOD`.
- The fact comment above `DAYS`: every source and the date it was checked.
- One `<section class="month">` per month, with `id`, heading, a nav chip linking to it, and `data-month` set to the month number. A day whose month has no section is not rendered at all, so add the section before the days. A period that spans two years needs the selector extended to include the year.
- The paragraph under each month heading: what is made, what is still planned, which posts wait for the owner.

## 3. The DAYS array

One entry per posting day, in date order:

```js
{
  date: "2026-11-18",              // ISO date; the weekday is computed from it
  time: "16:00",                   // optional; defaults to TIME
  format: "Carousel, 7 slides",    // shown as a pill: "Reel, 17 s", "Single image", "Story", "Reel, planned"
  template: true,                  // optional; the post waits for a decision by the owner
  note: "…",                       // reviewer note, English, one or two sentences
  items: [ /* one or more of the items below */ ]
}
```

Items:

| Item | Fields |
|---|---|
| Made reel | `kind: "reel"`, `label`, `video: "media/<id>.mp4"`, `poster: "media/<id>.jpg"`, `place` (optional, shown under the handle), `caption` |
| Made image or carousel | `kind: "post"`, `label`, `images: [ … ]` (one path for a single image, several for a carousel; `img("<id>")` gives `media/<id>.jpg`), `caption` |
| Made Story | `kind: "story"`, `label`, `image: img("<id>")` |
| Planned image | `kind: "post"`, `label`, `brief`, `caption` |
| Planned reel | `kind: "post"`, `tall: true`, `label`, `brief`, `caption` |
| Planned Story | `kind: "story"`, `label`, `brief` |

- `brief` and media are alternatives: an item with `brief` shows a dashed placeholder with the brief's text. When the media is made, remove `brief` and add the media fields (and change a planned reel to `kind: "reel"`).
- `label` is the short English name shown above the item and quoted in comments ("Battery in winter carousel", "Reel: winter service", "Story: Miklavž").
- `caption`: paragraphs separated by `\n\n`. The first paragraph is shown; the rest opens with "… more". Hashtags and `@handles` are coloured automatically.
- The status pill is computed: **Ready** (all media made, not a template), **Planned** (some media missing), **Template, needs the owner** (made, but `template: true`), **Planned, needs the owner** (both).
- The header summary counts posts, Stories and how many are made. Do not type those numbers by hand anywhere else on the page, or keep them in step if you do (the month paragraphs).

## 4. Check the page locally

Open the file in a browser from its folder, so `media/` resolves:

- every day appears under the right month, in order, with the right weekday;
- no broken image; every carousel has the right number of slides and its arrows, counter and dots move together; every reel plays;
- each caption's first paragraph works alone, and "Show full captions" opens all of them;
- templates show their placeholder in both the image and the caption;
- light and dark theme, and phone width (the date rail moves above the post below 640 px);
- every media file named in `DAYS` exists in `media/`, and `media/` holds no file that `DAYS` does not use.

Comment buttons stay hidden outside claude.ai; that is expected.

## 5. Publish

Load the `artifact-design` and `artifact-capabilities` skills, then publish with the Artifact tool:

- `file_path`: the timeline HTML.
- `files`: every file in `media/`, published under the same `media/<name>` path the page uses. Each file must be under 15 MB and one publish under 64 MB; with many reels, publish the page first and add media in further publishes to the same `url`.
- `capabilities`: `{"comments": {"composer_only": true}}`. This is what makes the **Comment** button above each post work for people the page is shared with.
- `icon`: `calendar`. `description`: one sentence, for example "Planned Instagram and Facebook posts for KFX, November and December 2026."

**Same client, same link.** An update republishes to that client's existing URL (pass it as `url` after reading it), so the link the owner already has keeps working. On an update, send only the media that is new or changed and pass `null` for files that were removed. A new client gets a new artifact.

For an update, list the live files first (`list` with `scope: "files"`), then publish with `file_path` set to the page, `root` set to the folder that holds it and its `media/`, and a `files` map: `{"media/<new>.jpg": "media/<new>.jpg", "media/<old>.jpg": null, …}`. Give it a short `label` ("Holiday cards, schedule +3 days"). Leave `capabilities` out so the comments setting carries over. Afterwards `media/` on the artifact must hold exactly the files `DAYS` uses: no old names left behind, for example after a rename or a removed reel.

The artifact is private until the user shares it. Sharing with the owner for commenting is the user's step; tell them it is needed for the Comment buttons.

## 5b. Or publish on znidar.dev

When the user asks for a page on the site (as with `/marketing/kfx-2026`), put the timeline in the Portfolio repo instead of, or as well as, the Artifact:

- Page: `public/marketing/<client>-<year>.html`, served at `https://znidar.dev/marketing/<client>-<year>`. Media: `public/marketing/<client>-<year>/media/`.
- In the page, every media path is `<client>-<year>/media/<file>`, not `media/<file>`, because the page is served from `/marketing/`.
- Make it a complete document: `<!doctype html>`, `<html lang="en">`, `<head>` with charset, viewport, `<meta name="robots" content="noindex, nofollow">`, title and description. Keep `noindex`; do not link the page from the site or add it to the sitemap.
- There is no comment API outside claude.ai, so the comment hint stays hidden and the Comment buttons do not appear. Review comments need the Artifact.
- Media is committed to the repo (KFX: 16 MB). Leave it uncommitted unless the user asks.

`public/marketing/kfx-2026.html` is the reference for this form.

When the page is for the person who posts (not only for review), use `public/marketing/kranfix-2026.html` as the reference instead: under each post it has **Download** (the image, or every slide of a carousel, as `<client>-<file>.jpg`) and **Copy caption** (the full caption, line breaks and hashtags included), so posting takes two clicks. On iPhone and iPad, Download opens the share sheet so "Save Image" puts the files in Photos, where Instagram finds them. Days with a placeholder in the image or caption get `template: true`, so the pill warns before anyone copies `[vpišite]`. Something the poster can add in the app (the giveaway winner as a Mention sticker) stays out of the image; give that day a `howTo: { title, steps }` and the page shows the numbered steps under the note.

## 6. After the owner reviews

Comments arrive on the artifact, each quoting the post's label ("Wed 18 Nov · Battery in winter carousel"). Read them with the `ArtifactComments` tool, make the change in the plan, the media or both, re-render what changed, republish to the same URL, and answer each comment with what was done. When the owner supplies a missing value for a template, re-render the image with `--props`, replace the placeholder in the caption, remove `template: true`, and update the note.

## Output of this stage

The artifact link, and the summary the main skill asks for: posts and Stories planned, how many are made, which are templates and what each needs from the owner, and anything that should be checked again on the day of posting (prices, stock, hours).
