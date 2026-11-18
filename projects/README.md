# Projects

Context for every client project that marketing content is made for: what the business does, how it looks and sounds, and where its source code and assets are on this machine. Read the project's folder before planning a campaign, writing a caption, making a post or reel, or building an offer.

| Project | Business | Live site | Source on this machine |
|---|---|---|---|
| [KFX](kfx/README.md) (formerly Krgofix) | E-scooter and e-bike shop and service, Kranj | https://kfxservis.si | `/Users/miha/Documents/Projects/krgofix` |
| [Kranfix](kranfix/README.md) | Phone repairs, accessories, refurbished phones and buyback, Kranj | https://kranfix.si | `/Users/miha/Documents/Projects/kranfix` |
| [Savne Dolium](savne-dolium/README.md) | Webshop for outdoor saunas, hot tubs and garden buildings | https://savne-dolium.si | `/Users/miha/Documents/Projects/saunas-shop` |

## What is in each folder

| File | Answers |
|---|---|
| `README.md` | What the business is and does, who it sells to, its promises, contact facts and public prices, each with the file it came from and the date it was checked |
| `brand.md` | Logo files, colours, fonts, photos and video worth reusing, taglines, tone of voice, and what not to do |
| `source.md` | Where the code is, how it is built and deployed, and which file holds each kind of fact (hours, prices, steps, products) |
| `marketing.md` | What has been made so far: offer page, Posting Timeline, Remotion compositions, renders, open templates |

## Rules

- **The client's repo and live site are the source of truth; these files are a map to them.** Every fact here names its source file. Before a fact goes on a post, check it at that source again: prices, hours and addresses change. When you find a change, update the fact and its "checked" date here.
- **Never invent or round a fact.** If something is not in the client's sources, write "unknown" and leave it to the owner.
- **Conflicts are listed, not resolved.** When two sources disagree, both are written down under "Open questions" in the project's `README.md` until the owner decides.
- **Nothing here is secret.** No passwords, API keys, `.env` values or customer data. Point at the file that holds them, never copy them.
- **One client's assets never appear in another's**, even where two clients share a colour.

## Adding a project

1. Create `projects/<slug>/` (lowercase, hyphens) with the four files above. Copy the headings from an existing project and fill them in from the client's repo and live site.
2. Add a row to the table above.
3. If the project gets videos or posts, add its Remotion folder under `tools/reel/src/<slug>` and link it from `marketing.md`.
