---
name: posting-timeline
description: Build, update or reschedule a Posting Timeline, the claude.ai artifact that previews a client's planned Instagram and Facebook feed posts, carousels, reels and Stories day by day, with captions, status and comment buttons, as done for Kranfix and KFX. Covers making the images and reels in the Remotion project in this repo (tools/reel), every post type built so far, the tools to use, publishing the artifact, and moving or removing posts. Use when asked for a posting timeline or post preview, to make or change post images, holiday or greeting posts, to add, move, shift or remove posts or a giveaway, or to republish a timeline. Invoke with /posting-timeline.
argument-hint: "[client] [new | update | reschedule | holiday] [what to change]"
---

# Posting Timeline

A Posting Timeline is one private claude.ai artifact per client. It shows every planned post on a date rail as it will look in Instagram: the image or carousel (swipeable), reel (playable) or Story, the caption with "… more", the posting time, a status pill and a reviewer note, plus a **Comment** button above each post for the owner. The images and reels are rendered in the Remotion project in this repo.

| Client | Artifact | Local source in `tools/reel/out/` |
|---|---|---|
| Kranfix (phone repairs, `@_kranfix_`) | https://claude.ai/artifact/CtauMamWm6Yr8b9cBe2zVQ | `kranfix/timeline.html` (preview variant reading `../posts/*.png`), renders in `posts/`; also on znidar.dev as `public/marketing/kranfix-2026.html`, with Download and Copy caption under each post |
| KFX (e-scooters, `@kfx_kranj`) | https://claude.ai/artifact/Djh8jHt5VkqZEY3S44jXrQ | `kfx/timeline/kfx-timeline.html` and `media/`, renders in `kfx/<month>/`; also on znidar.dev as `public/marketing/kfx-2026.html` |

`out/` is ignored by git and exists only on this machine. When a local copy is missing or older, the live artifact is the source.

## Tools

| Tool | Use it for |
|---|---|
| **Remotion project** `tools/reel` (React, Remotion 4) | Every post image, Story and reel. `npm run dev` opens Remotion Studio for live layout work; `npx remotion still <id> <file>.png` renders an image, `npx remotion render <id> <file>.mp4 --crf=16` a reel; `./render-posts.sh <prefix>` renders all Kranfix stills starting with a prefix into `out/posts/`; `npm run lint` runs ESLint and `tsc`. Its `README.md` documents every composition and where each fact came from |
| **Remotion agent skills** `.claude/skills/remotion-*` | Anything about Remotion itself: `remotion-best-practices` first, then `remotion-render`, `remotion-studio`, `remotion-multimedia` (sound, video) as needed. Restore them with `npx skills experimental_install` (`skills-lock.json`) |
| **Read tool** | Looking at every rendered PNG or JPG before calling it done. Overflowing text, a wrong date, a bow that vanishes into the background only show in the render |
| **`sips`** (macOS) | Converting PNG renders to JPGs for the page: `sips -s format jpeg -s formatOptions 85 in.png --out out.jpg` |
| **Artifact tool** | `read` the live page (with `url`, before any republish), `read` with `path` to save a file, `list` with `scope: "files"`, `publish` with `file_path`, `root` and a `files` map (`null` removes a file). New timelines: load the `artifact-design` and `artifact-capabilities` skills first and publish with `capabilities: {"comments": {"composer_only": true}}` and `icon: "calendar"` |
| **ArtifactComments tool** | Reading the owner's comments on a post and answering each with what was changed |
| **Client sources** | Facts for posts: start with `projects/<client>/` in this repo (facts with their source files, brand, tone, repo path), then check at the source it names: the client's live site (WebFetch or the Chrome browser) and its repo (Kranfix: `/Users/miha/Documents/Projects/kranfix`, KFX: `/Users/miha/Documents/Projects/krgofix`, Savne Dolium: `/Users/miha/Documents/Projects/saunas-shop`) |
| **Background Bash** | Rendering many stills or reels (`run_in_background`), so you can edit the page while they render |

## What to do

| Request | Do |
|---|---|
| A new campaign or a new client | Plan with the `marketing` skill (`../marketing/plan.md`), then `media.md`, then `timeline.md` |
| Make or change post images or reels | `media.md`, starting from the closest type in `posts.md` |
| A holiday or greeting post | `posts.md`, "Holiday cards" |
| Show or update the timeline after media changed | `timeline.md` |
| Remove, move or shift posts, cancel a giveaway | `reschedule.md` |
| The owner left comments | `timeline.md` step 6 |

Read the file before doing its step. For a small change (one post re-rendered) the path is short: edit the component, render, look at it, convert to JPG, republish with only that file.

## Rules

- **Nothing is posted from here.** The skill prepares and previews. Posting, scheduling in Meta, changing a profile or a website is the owner's or the user's action; list what they need to do.
- **Facts come from the client's own sources**, kept as constants in the client's shared file with the source named. Never invent or round a price, hour, warranty or date.
- **What the owner decides is a template**: a prop with a visible placeholder (`[vpišite]`, `−XX %`, `@profil`), marked in the note with exactly what is missing.
- **Posts are in Slovenian; the page's interface, labels and notes are in English.**
- **One client's assets never appear in another's.** Kranfix compositions read the Kranfix website's `public/` folder (from the kranfix repo, a sibling of this one); every other client imports from `src/<client>/assets`.
- **Same client, same link**: an update republishes to the client's existing artifact URL. A new client gets a new artifact.
- **Leave changes uncommitted** unless the user asks; work on a branch, not `main`.
- **Report at the end**: posts and Stories planned and made, templates and what each needs, what moved or changed in dated text, and anything to do outside the repo (rules page, plan doc, sharing the artifact with the owner for comments).
