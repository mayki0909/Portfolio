# Stage 2: Media

Build the images and reels of the plan as Remotion stills and compositions, render them, and put web-sized copies where the timeline reads them.

Work in `/Users/miha/Documents/Projects/kranfix/tools/reel`. Read its `README.md` first: it lists every existing composition, where each fact in them was copied from, and the render commands. The Remotion agent skills are installed in that repo; use them for anything about Remotion itself. Create a branch there before editing (KFX's November work was `feat/kfx-november`); do not commit to `main`.

## 1. Set up the client once

A new client gets its own folder `src/<client>/` and its own Studio `<Folder>` in `src/Root.tsx`, separate from the others:

- `brand.ts`: colours and font taken from the client's site CSS. If the site uses the system font, pick the closest Google font and say so (KFX: Inter).
- `logoPaths.ts`: the logo's SVG paths, copied from the client's logo file, so they can be animated and recoloured.
- `posts/shared.tsx`: the `POST` (1080×1350) and `STORY` (1080×1920) sizes, the side padding, and the client's facts as constants (street, town, phone, domain, handle, hours), each with a comment naming where it was copied from. Every still imports facts from here; none retypes them.
- `assets/`: photos and screenshots, imported from `src` so they stay out of the Kranfix website's public folder.
- An intro and an outro sting if the client will have reels.

For an existing client, reuse its folder and extend it. Look at `src/kfx/posts/` for the pattern.

## 2. Name everything by posting date

The ID is the file name, the composition ID and the key in the timeline:

`<Client><MonDD>-<Topic>[-<slide>]`, for example `KfxNov18-Battery-1` … `KfxNov18-Battery-7`, `KfxNov27-BlackFriday`, `KfxNov25-BlackFridayTeaserStory` (Stories end in `Story`), `KfxNov12-RenameReel` (reels end in `Reel`).

Each month has a folder `posts/<month>/` with one file per topic and an `index.tsx` that registers its stills in a `<Folder name="<Client>-<Month>">`. If a posting date moves, rename the ID so it still matches.

## 3. Build

- **Stills:** one component per slide type, with props for what varies (`rule: 1…5`), registered once per slide.
- **Stories:** keep content between y 380 and 1560, clear of the app's top bar and reply field.
- **Templates:** what the owner has not decided is a prop with a visible placeholder as its default (`−XX %`, `[datum]`), so the final image is one re-render with `--props`, not an edit.
- **Reels:** 1080×1920, 30 fps, 15 to 20 s for most. Open on the hook. Close with the client's outro. Give each scene a short overlap with the next.
- **Accessibility:** text large enough to read on a phone, no more than three flashes a second.
- **Sound:** only short effects from Remotion's library. Music is added in the Instagram app; say that in the post's note.
- **Third parties:** another company appears only as plain text, without its logo or colours.

Run `npm run lint` in `tools/reel` before rendering.

## 4. Render

From `tools/reel`, into `out/<client>/<month>/`:

```bash
npx remotion still KfxNov18-Battery-1 out/kfx/november/KfxNov18-Battery-1.png
npx remotion render KfxRenameReel out/kfx/november/KfxNov12-RenameReel.mp4 --crf=16
npx remotion still KfxRenameReel out/kfx/november/KfxNov12-RenameReel.jpg --frame=130   # reel cover / poster
npx remotion still KfxNov27-BlackFriday out/kfx/november/KfxNov27-BlackFriday.png --props='{"discount":"−20 %","subject":"na rezervne dele","until":"Velja do 30. 11."}'
```

- `./render-posts.sh <prefix>` renders every still whose ID starts with the prefix, but writes to `out/posts/`, the Kranfix folder. For another client, render per ID as above, or move the files afterwards.
- Pick a cover frame that shows the reel's subject and headline, not a transition.
- If two sessions bundle at once and rspack panics with "Transaction already in progress", bundle once with `npx remotion bundle --bundle-cache=false --out-dir=<dir>` and render from that directory.

**Look at every render** (open the PNG, scrub the MP4) before calling it made: text overflow, a wrong fact, a missing photo and a clipped logo only show in the output.

## 5. Copy web-sized media to the timeline

The timeline uses JPGs, not the full PNGs, so the page stays light (about 100 to 200 KB per image):

```bash
mkdir -p out/kfx/timeline/media
for f in out/kfx/november/*.png; do
  sips -s format jpeg -s formatOptions 85 "$f" --out "out/kfx/timeline/media/$(basename "${f%.png}").jpg" >/dev/null
done
cp out/kfx/november/*Reel.mp4 out/kfx/november/*Reel.jpg out/kfx/timeline/media/
```

The PNGs and MP4s in `out/<client>/<month>/` are the files that get posted. The JPGs are only for the preview. Also put the client's logo in `media/logo.svg`.

## 6. Update the README

Add the new compositions to `tools/reel/README.md` in its existing style: what each is, its scenes with frame ranges for a reel, where each fact and asset was copied from and what to update if the source changes, and the render commands.

## Output of this stage

For every item of the plan either the media file names (which replace its `brief` in `DAYS`) or, if it was not made, the reason. Commit the source in the kranfix repo only when the user asks.
