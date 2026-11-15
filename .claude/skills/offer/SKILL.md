---
name: offer
description: Build a "predlog sodelovanja" (cooperation proposal / offer) for a client company as a standalone HTML page at /offer/<company> on znidar.dev, modelled on the KranFix and KFX offers. Use when asked to make an offer, ponudba, predlog sodelovanja or pricing proposal for a company. Invoke with /offer.
argument-hint: "[company name] [what is being offered, prices, notes]"
---

# Offer page (predlog sodelovanja)

Produce a one-page, client-branded proposal in Slovenian as a single self-contained HTML file in the Portfolio site, the same way `/offer/kranfix` and `/offer/kfx` were made.

- **Output:** `public/offer/<slug>.html` in this repo, served at `https://znidar.dev/offer/<slug>`. The slug is the company name in lowercase ASCII with hyphens (`kranfix`, `kfx`, `avtoservis-novak`).
- **One company, one file.** No tabs and no shared page: each recipient gets a link that shows only their offer.
- **Do not publish an Artifact** unless the user asks for one.

Start from a copy of an existing offer in `public/offer/`. Do not design from scratch: the layout, type scale, print stylesheet and mobile breakpoints are already tuned.

| Reference | Use for |
|---|---|
| `public/offer/kranfix.html` | Full offer: build (website, system, import) with three payment options, plus marketing |
| `public/offer/kfx.html` | Marketing-only offer: monthly package and campaigns |

## 1. Gather the inputs

Take what `$ARGUMENTS` and the conversation give. Research the company yourself (website, Facebook/Instagram page) for what it sells, its tone, brand colour and logo. Ask the user only for what you cannot find or must not guess:

- **Scope**: what is actually offered (website, admin system, data import, marketing, something else).
- **Prices**: build price, maintenance, marketing. Never invent prices. If the user gives none, propose the KranFix numbers below as a starting point and ask for confirmation before finishing.
- **Logo**: an SVG or image file. If none is available, set the company name as text in the brand colour; do not redraw or approximate a logo.
- **Payment basis**, if a revenue-share option is offered: which measurable revenue the percentage applies to (for KranFix: invoiced service labour, excluding parts and sold goods).

## 2. File format

Keep the file exactly as the references are built:

- A complete document: `<!doctype html>`, `<html lang="sl">`, `<head>`, `<body>`. Everything inline: one base `<style>`, one page `<style>`, one `<script>` at the end. No external CSS, JS, fonts or images, and nothing imported from the Next.js app.
- In `<head>`, in this order: charset, viewport, `<meta name="robots" content="noindex, nofollow">`, `<title>{Company} predlog sodelovanja</title>`, a one-sentence Slovenian `<meta name="description">`, `<meta name="theme-color">` in the brand colour.
- **`noindex, nofollow` must stay.** Offers contain prices meant for one recipient. Do not add the page to the sitemap, the site navigation or any other page.
- Logos are inlined as `data:image/svg+xml;base64,…` in the top bar and the footer.
- The page is light-only by design (`color-scheme:light`), because it is printed and sent as PDF.

## 3. Page structure

Keep this order. Drop a section the offer does not have and renumber the `01 /`, `02 /` labels and the nav links.

| Block | KranFix content | Adapt per client |
|---|---|---|
| Sticky top bar | Logo, section nav | Logo, nav anchors |
| Hero | Eyebrow "Predlog sodelovanja", "Pripravljeno za {company} · {date}", two-line headline with the second line in brand colour, one paragraph, link down | Headline states the client's benefit, not the deliverable ("Več reda v servisu. Več prostora za rast.") |
| Hero visual | Mock app window: sidebar, sample rows with status chips, a three-step flow | Show the client's own daily process in their words (sprejem → popravilo → izdaja). Label it as a "ponazoritev" |
| Hero bottom | Three numbered promises | The three sections of this offer |
| 01 Scope ("Vse, kar dobite.") | Four cards with icon, title, checklist | One card per deliverable, 4 to 5 concrete checklist items each |
| 02 Payment ("Ista rešitev. Tri poti do nje.") | Three plan cards, the middle one `active` with "Priporočena izbira", then fine print | See pricing model |
| 03 Marketing ("Marketing vsak mesec.") | Monthly price, four included items, campaign example with size slider, price list, "Ni vključeno" note | Content themes from the client's own offer |
| Footer | Logo, one-line summary of services, legal note | Restate every price that appears above |

The stylesheet also carries unused blocks you may use when the offer needs them: `.steps` (four-step process), `.calculator` (dark interactive cost calculator), `.ai-section` (tinted add-on service), `.terms-grid` (collapsible terms), `.next` (next-step call to action). Leaving unused CSS in place is harmless.

## 4. Pricing model

KranFix numbers, all without VAT. Keep the ratios when the user gives only a full build price `P`:

| Option | Upfront | Revenue share | Total |
|---|---|---|---|
| 01 Plačilo iz servisov | 0 € | 12 % until 6.000 € is paid (1,33 × P) | 6.000 € |
| 02 Delno plačilo + odstotki (recommended) | 1.500 € (P / 3), half on confirmation, half at launch | 8 % until a further 3.600 € (0,8 × P) | 5.100 € |
| 03 Celotno plačilo | 4.500 € (P), half on confirmation, half before launch | 0 % | 4.500 € |

- Maintenance: 89 € per month or 8 % of the same revenue basis, billed separately from the build.
- Monthly marketing: 120 € for 4 image posts, one per week, approved by the client before posting; unused posts do not roll over.
- Campaigns (usually two months, 4 to 10 posts): concept 40 € (small) or 75 € (medium, large); image post 35 €; short video up to 15 s 55 €. Examples: small 4 posts, no video; medium 6 posts, 1 video; large 10 posts, 2 videos.
- Not included: paid ad budget (paid directly to Meta) and on-location filming.

Rules that keep the offer honest:

- The revenue share is a way of paying off the build. Always state the cap and that the percentage stops when it is reached.
- State the basis of the percentage precisely and what is excluded from it.
- Every total must equal its parts. Recompute each card, the campaign `SETS` in the script (`concept + posts × POST + videos × VIDEO`) and the footer after any price change.
- Keep the fine print: prices without VAT, VAT added if charged, the proposal is informative and is not an order, final scope and terms are confirmed in a written agreement.

## 5. Branding

- Replace the two brand tokens in `:root`: `--wine` (client's primary colour) and `--blush` (a very light tint of it for chips and highlights); adjust `--wine-dark` to match. Leave `--paper`, `--ink`, `--muted`, `--line` alone. Update `theme-color` and the `#af1a4408` shadow on `.plan.active`.
- Check the brand colour has enough contrast as text on `--paper` and as a button background under white text. If it does not (yellow, light green), use a darkened variant for text and keep the true colour for fills.
- Encode the client's logo as base64 and set `width` and `height` on both `<img>` tags to its real aspect ratio.

## 6. Copy

- Slovenian, formal plural address (vi, "dobite", "potrdite"). Short sentences. No English terms where a Slovenian one exists.
- Write from the client's side: what they get and how their day changes, in the vocabulary of their trade. Use their real product and service names in the scope cards, the hero visual and the campaign examples.
- Headlines are short statements ending in a full stop. No exclamation marks, no superlatives, no promises of results (reach, sales, rankings).
- Be specific about quantities and limits (number of pages, posts, products, images per product) and about what is not included.
- Slovenian number format: `1.500 €`, `12 %`, dates as `9. 11. 2026`.

## 7. Build

1. Copy the fitting reference to `public/offer/<slug>.html`. If a file with that slug exists, read it and ask before overwriting.
2. Replace the content, brand tokens, both logos, title, description, the "Pripravljeno za … · date" line and the campaign data in the script. The key under `SETS` must match the `data-campaigns` attribute in the markup; rename both to the new slug.
3. Preview the file in a browser (`open public/offer/<slug>.html`) at desktop and phone width, and check the print preview.
4. Leave the change uncommitted unless the user asks to commit or push. When they do, work on a branch, not on `main`; the page goes live at `https://znidar.dev/offer/<slug>` after the site is deployed.

## 8. Check before handing over

- Search the new file for `KranFix`, `KFX`, `krgofix`, `Chameleon`, `Priporočam`, `telefon`, `skiro`, `servis` and the old date. Nothing of the reference client may remain, including in `aria-label`, `alt`, the script and the footer.
- `noindex, nofollow` is present, and nothing else in the repo links to the page.
- Every price appears with the same value everywhere: plan cards, fine print, marketing section, script constants, footer.
- All nav anchors resolve to an existing `id`.
- At 380 px width nothing scrolls sideways; the print layout still breaks pages before the payment section.
- Tell the user the file path and the future URL, and what you assumed (prices taken from KranFix, colours picked from their site, missing logo), so they can correct it before sending.
