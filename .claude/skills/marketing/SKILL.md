---
name: marketing
description: Prepare a social media campaign for a client and its Posting Timeline, the review page that shows every planned Instagram and Facebook post, carousel, reel and Story by date, as was done for KFX and Kranfix. Use when asked to plan a campaign, decide what to post and when, or write captions for a client; it hands the images, reels and the timeline page to the posting-timeline skill. Invoke with /marketing.
argument-hint: "[client] [period, e.g. January–February 2027] [plan | media | timeline]"
---

# Marketing: campaign and Posting Timeline

The deliverable is a **Posting Timeline**: one page the client's owner opens to see, day by day, exactly what will be posted, as it will look in Instagram, with the caption, a status and a button to comment. The KFX one is https://claude.ai/artifact/Djh8jHt5VkqZEY3S44jXrQ and the Kranfix one is https://claude.ai/artifact/CtauMamWm6Yr8b9cBe2zVQ.

Getting there has three stages. The plan is in this folder; the media and the timeline belong to the `posting-timeline` skill, which also lists every post type built so far, the tools, and how to reschedule. Read the file before doing the stage.

| Stage | File | Produces |
|---|---|---|
| 1. Plan | `plan.md` | The calendar: dates, formats, topics, captions, and the facts they rest on |
| 2. Media | `../posting-timeline/media.md` (post types in `../posting-timeline/posts.md`) | The images and reels, rendered in the Remotion project |
| 3. Timeline | `../posting-timeline/timeline.md` | The Posting Timeline page, published as an Artifact |

Run all three in order for a new campaign. Run one alone when `$ARGUMENTS` or the request names it ("just the plan", "the reels are done, update the timeline"). A timeline can be published with the plan only: posts without media show as "Planned" with a brief of what the image or reel will show, and fill in as the media is made.

## Where things live

- **Media source:** the Remotion project at `tools/reel` in this repo (moved from the kranfix repo in November 2026). Its `README.md` documents every composition and command; read it first. Each client has its own folder under `src/` (`src/kfx`, `src/dolium`; Kranfix itself is in `src/posts` and the top-level folders).
- **Renders and the timeline source:** `tools/reel/out/<client>/<month>/` and `tools/reel/out/<client>/timeline/`. `out/` is ignored by git, so these exist only on this machine. If the timeline source is missing locally, read it back from the published artifact.
- **Client facts:** start with the client's folder in `projects/` at the repo root (`projects/kfx`, `projects/kranfix`, `projects/savne-dolium`): what the business does, contact facts and prices with their source files, brand, tone of voice, where the repo is, open questions and what not to claim. Re-check each fact at the source it names (the client's live site or repo) before it goes on a post, and update the folder when something changed. A new client gets a folder first (`projects/README.md`).
- **Preview:** the Posting Timeline artifact. Do not load campaigns into Pendpost or any other scheduling tool for preview.

## Rules for every stage

- **Nothing is posted by this skill.** It prepares and previews. Posting, renaming a profile, or scheduling in Meta is the user's or the owner's action.
- **Every fact on a post is a claim to the client's customers.** Take addresses, hours, phone numbers, prices, warranties and turnaround times from the client's live site or repo, record the source and the date checked, and never round, improve or invent them. Legal or safety statements (traffic rules, age limits) need an official source, named on the post.
- **What only the owner can decide stays a template.** An offer, a discount, a prize, a winner, holiday hours: write the post with a visible placeholder (`−XX %`, `[datum]`, `[vpišite]`), mark it as a template, and say in the note exactly what is missing. Do not guess a value to make the post look finished.
- **Posts are in Slovenian; the timeline's own interface and reviewer notes are in English**, as in the existing timelines.
- **One client's assets never appear in another's.** KFX videos use no Kranfix file and the other way round.
- **Report plainly at the end:** how many posts and Stories are planned, how many are made, which are templates waiting for the owner, and what you could not verify.
