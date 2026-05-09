# Content Swap Checklist

Every placeholder in `index.html`, mapped to its paper section. Fill a row and do one search-and-replace — the slot disappears.

**Placeholder format:**
- `[[FROM_PAPER_X_DESCRIPTOR]]` — content sourced from a specific paper section
- `[[FROM_ADVOCACY_INFO_WEEK_X_DESCRIPTOR]]` — direct evidence from advocacy info sources
- `[[UI_DESCRIPTOR]]` — static UI copy (no paper mapping)
- `[[URL_DESCRIPTOR]]` — a live URL that must be filled before launch
- `[[ASSET_DESCRIPTOR]]` — image or icon file that must be placed in `assets/`

---

## Head & Meta

| Section ID | Placeholder | Paper Section | Type | Note |
|---|---|---|---|---|
| `<head>` | `[[FROM_PAPER_INTRO_SITE_TITLE]]` | Intro | `<title>` text | Under 60 chars — e.g. "Iran Strike Fund" or campaign name |
| `<head>` | `[[FROM_PAPER_INTRO_META_DESCRIPTION]]` | Intro | `<meta name="description">` | ~150 chars, plain language — what the campaign is and what visitors can do |
| `<head>` | `[[URL_SITE_CANONICAL]]` | — | URL | Live domain — used in `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image` |
| `<head>` | `[[FROM_PAPER_INTRO_OG_TITLE]]` | Intro | `og:title` / `twitter:title` | Same as site title or a punchier variant |
| `<head>` | `[[FROM_PAPER_INTRO_OG_DESCRIPTION]]` | Intro | `og:description` / `twitter:description` | 1–2 sentences for link previews; must stand alone on social media |

---

## Navigation

| Section ID | Placeholder | Paper Section | Type | Note |
|---|---|---|---|---|
| nav | `[[FROM_PAPER_INTRO_SITE_NAME]]` | Intro | Logo / wordmark text | Also used in footer brand; links to `#hero` |

---

## #hero

| Section ID | Placeholder | Paper Section | Type | Note |
|---|---|---|---|---|
| `#hero` | `[[FROM_PAPER_INTRO_HEADLINE]]` | Intro | `<h1>` headline | ~20 words; one or two sentences naming the thesis; wrap accent phrase in `<span class="hero__headline-accent">` when filling in |
| `#hero` | `[[FROM_PAPER_INTRO_SUBHEAD]]` | Intro | Subhead `<p>` | ~25–30 words; explains dual purpose: argument + material contribution |
| `#hero` | `[[FROM_PAPER_INTRO_STAT]]` | Intro | Counter sentence | Full sentence — e.g. "99.2% of organized public protests are pro-regime. The rest are in abeyance. Workers are still striking." |

---

## #issue

| Section ID | Placeholder | Paper Section | Type | Note |
|---|---|---|---|---|
| `#issue` | `[[FROM_PAPER_INTRO_ISSUE_HEADLINE]]` | Intro | `<h2>` headline | Strikes, repression, and the stakes right now; ~10 words |
| `#issue` | `[[FROM_PAPER_INTRO_STRIKE_WAVE]]` | Intro | Prose p1 | The 2026 strike wave: who is striking and what they're demanding |
| `#issue` | `[[FROM_PAPER_INTRO_REGIME_RESPONSE]]` | Intro | Prose p2 | The regime's response: executions, internet blackout, foreign-agent framing |
| `#issue` | `[[FROM_PAPER_INTRO_ABEYANCE]]` | Intro | Prose p3 | Why this moment matters: abeyance, what it means for the movement |
| `#issue` | `[[FROM_ADVOCACY_INFO_WEEK_X_PULLQUOTE]]` | Advocacy Info | Pull quote text | Direct speech from a striker or activist, in translation if needed |
| `#issue` | `[[FROM_ADVOCACY_INFO_WEEK_X_PULLQUOTE_ATTRIBUTION]]` | Advocacy Info | Pull quote attribution | Name or pseudonym, role, city, date |
| `#issue` | `[[FROM_PAPER_INTRO_STAT_EXECUTIONS]]` | Intro | Stat number | Executions since the war started |
| `#issue` | `[[FROM_PAPER_INTRO_STAT_PROTESTS_PCT]]` | Intro | Stat number | % of organized protests that are pro-regime (displayed as "X%") |
| `#issue` | `[[FROM_PAPER_INTRO_STAT_CHILDREN]]` | Intro | Stat number | Children killed in a single month |
| `#issue` | `[[ASSET_ISSUE_INFOGRAPHIC]]` | — | Image asset | Iran strike map or timeline; update `aria-label` and replace `<div class="placeholder-image">` with `<img>`; place in `assets/images/` |
| `#issue` | `[[FROM_PAPER_INTRO_INFOGRAPHIC_CAPTION]]` | Intro | `<figcaption>` | What the graphic shows, source, and date data was current |

---

## #defaults

| Section ID | Placeholder | Paper Section | Type | Note |
|---|---|---|---|---|
| `#defaults` | `[[FROM_PAPER_SECTION_1_HEADLINE]]` | Section 1 | `<h2>` headline | One sentence summarizing the negative case from your thesis |
| `#defaults` | `[[FROM_PAPER_SECTION_1_LEDE]]` | Section 1 | Lede `<p>` | Restates that conventional methods fall into two failure modes, previews three examples |
| `#defaults` | `[[FROM_PAPER_SECTION_1_1_STATE_PRESSURE]]` | Section 1.1 | Card 1 body | Chenoweth foreign-support warning + 1953 historical anchor + regime "betrayal of homeland" framing |
| `#defaults` | `[[FROM_ADVOCACY_INFO_WEEK_5_ENEMIES_QUOTE]]` | Advocacy Info Wk 5 | Card 1 evidence | Iranian Police Commander: protestors "treated as enemies" — Azar BBC March 2026 |
| `#defaults` | `[[FROM_PAPER_SECTION_1_2_PUBLIC_PROTEST]]` | Section 1.2 | Card 2 body | Tarrow on common purpose; channel between Iranians and outside protestors severed by internet blackout and bombing |
| `#defaults` | `[[FROM_ADVOCACY_INFO_WEEK_8_DIGITAL_APARTHEID]]` | Advocacy Info Wk 8 | Card 2 evidence | Ameri DW April 2026: only government employees and the wealthy maintained reliable internet |
| `#defaults` | `[[FROM_PAPER_SECTION_1_3_NGO_ADVOCACY]]` | Section 1.3 | Card 3 body | Visibility doesn't pay rent; strikes are real and constraint is material, not informational |
| `#defaults` | `[[FROM_ADVOCACY_INFO_WEEK_5_NO_FUND]]` | Advocacy Info Wk 5 | Card 3 evidence | Azar BBC: oil workers, teachers, shopkeepers all participating — no organized strike fund noted |
| `#defaults` | `[[FROM_PAPER_SECTION_1_TRANSITION]]` | Section 1 | Pivot `<p>` (`.thesis-bridge`) | One sentence pivoting from "all three fail" to "here is what works" |

---

## #theory

| Section ID | Placeholder | Paper Section | Type | Note |
|---|---|---|---|---|
| `#theory` | `[[FROM_PAPER_SECTION_2_HEADLINE]]` | Section 2 | `<h2>` headline | Why material support matters and what a strike fund does |
| `#theory` | `[[FROM_PAPER_SECTION_2_MCALEVEY]]` | Section 2 | Prose p1 | Strikes fail when workers run out of money, not anger — McAlevey argument |
| `#theory` | `[[FROM_PAPER_SECTION_2_BHARGAVA_LUCE]]` | Section 2 | Prose p2 | Collective care as strategy, not charity — Bhargava + Luce |
| `#theory` | `[[FROM_PAPER_SECTION_2_IRAN_SPECIFIC]]` | Section 2 | Prose p3 | Why this matters for Iran now: property confiscation threats, no existing fund |
| `#theory` | `[[FROM_PAPER_SECTION_2_MATERIAL_FLOOR_DESC]]` | Section 2 | Feature 1 body | A strike fund gives workers a financial foundation to hold out |
| `#theory` | `[[FROM_PAPER_SECTION_2_SUSTAINED_PARTICIPATION_DESC]]` | Section 2 | Feature 2 body | Money extends how long people can stay in the streets |
| `#theory` | `[[FROM_PAPER_SECTION_2_PARALLEL_INFRASTRUCTURE_DESC]]` | Section 2 | Feature 3 body | A fund is also a node of trust outside regime control |
| `#theory` | `[[ASSET_ICON_MATERIAL_FLOOR]]` | — | SVG icon | Icon for "Material floor" card — place in `assets/icons/` |
| `#theory` | `[[ASSET_ICON_SUSTAINED_PARTICIPATION]]` | — | SVG icon | Icon for "Sustained participation" card |
| `#theory` | `[[ASSET_ICON_PARALLEL_INFRASTRUCTURE]]` | — | SVG icon | Icon for "Parallel infrastructure" card |

---

## #legal

| Section ID | Placeholder | Paper Section | Type | Note |
|---|---|---|---|---|
| `#legal` | `[[FROM_PAPER_SECTION_3_1_HEADLINE]]` | Section 3.1 | `<h2>` headline | How donations reach workers legally and safely |
| `#legal` | `[[FROM_PAPER_SECTION_3_1_YOU_DONATE]]` | Section 3.1 | Flow panel 1 | What you're doing when you donate and why it's safe and legal (2 sentences) |
| `#legal` | `[[FROM_PAPER_SECTION_3_1_UNITED_FOR_IRAN]]` | Section 3.1 | Flow panel 2 | What United for Iran is + how OFAC General License E permits transfer (2 sentences) |
| `#legal` | `[[FROM_PAPER_SECTION_3_1_WORKER_AID]]` | Section 3.1 | Flow panel 3 | Who receives funds, how distribution works, what workers use it for (2 sentences) |
| `#legal` | `[[FROM_PAPER_SECTION_3_1_FUNDING_MODEL]]` | Section 3.1 | Explainer p1 | Strategic case for this funding model; why routing through a 501(c)(3) matters |
| `#legal` | `[[FROM_PAPER_SECTION_3_1_SAFEST_PATH]]` | Section 3.1 | Explainer p2 | Why OFAC license + diaspora network + mutual-aid structure = safest and most direct path |
| `#legal` | `[[FROM_PAPER_SECTION_3_1_OFAC_EXPLAINER]]` | Section 3.1 (Block 1 — legal mechanism) | Prose p1 | What OFAC General License E is and why it matters — plain language, no legalese |
| `#legal` | `[[FROM_PAPER_SECTION_3_2_UFI_ORG]]` | Section 3.1 (Block 2 — structural distinction) | Prose p2 | What United for Iran is: diaspora-led, not a USAID grantee, how funds are directed |
| `#legal` | `[[FROM_PAPER_SECTION_3_1_NOT_GOVERNMENT]]` | Section 3.1 (Block 3 — narrative work) | Note block `<aside>` | What this campaign is NOT: not government money, not political parties or armed groups |
| `#legal` | `[[FAQ_LEGAL]]` | Section 3.1 | FAQ q1 answer | OFAC General License E in plain language; UFI's 501(c)(3) status. ~50 words. Q text is hardcoded. |
| `#legal` | `[[FAQ_INSTAGRAM]]` | Section 1 | FAQ q2 answer | Instagram/TikTok engagement vs. donation endpoint; infographics can still be reposted later. ~70 words. Q text is hardcoded. |
| `#legal` | `[[FAQ_PETITION]]` | Section 1.1 | FAQ q3 answer | Petitions route through U.S. government; feed foreign-agent narrative; cite Chenoweth. ~70 words. Q text is hardcoded. |
| `#legal` | `[[FAQ_PROTEST]]` | Section 1.2 | FAQ q4 answer | Public protest abroad doesn't address the material constraint; strike fund addresses the actual bottleneck. ~70 words. Q text is hardcoded. |
| `#legal` | `[[FAQ_GOVERNMENT]]` | Section 3.2 | FAQ q5 answer | No — UFI directs to worker mutual aid, not regime/parties/armed groups. ~50 words. Q text is hardcoded. |
| `#legal` | `[[FAQ_UNITED_FOR_IRAN]]` | Section 3.1 | FAQ q6 answer | Direct giving across OFAC sanctions is illegal; GL-E + diaspora leadership makes this structurally different from state-to-movement money. ~70 words. Q text is hardcoded. |
| `#legal` | `[[FAQ_PEER_CRITIQUE]]` | Section 3.2 | FAQ q7 answer | Acknowledge 1953 history; distinguish state-to-movement vs. people-to-people; refusing solidarity lets the regime set the rules. ~80 words. Q text is hardcoded. |
| `#legal` | `[[FAQ_NON_MONEY]]` | Conclusion | FAQ q8 answer | Share the link; print a flyer; reach out to Iranian diaspora privately if safe. ~50 words. Q text is hardcoded. |
| `#legal` | `[[ASSET_ICON_DONATE]]` | — | SVG icon | Flow step 1 icon — place in `assets/icons/` |
| `#legal` | `[[ASSET_ICON_UFI]]` | — | SVG icon | Flow step 2 icon |
| `#legal` | `[[ASSET_ICON_WORKERS]]` | — | SVG icon | Flow step 3 icon |

---

## #donate

| Section ID | Placeholder | Paper Section | Type | Note |
|---|---|---|---|---|
| `#donate` | `[[UI_DONATE_HEADLINE]]` | — | Static UI | Direct headline: what you're asking people to do and why |
| `#donate` | `[[UI_DONATE_INTRO]]` | — | Static UI | 2 sentences: where money goes, what it does, why small amounts matter |
| `#donate` | `[[URL_UNITED_FOR_IRAN_DONATE]]` | — | URL | United for Iran donation page — confirm whether `?amount=` query param is supported before launch |
| `#donate` | `[[UI_EMAIL_SUBJECT]]` | — | Static UI | Subject line for "Email a friend" `mailto:` link |
| `#donate` | `[[UI_EMAIL_BODY_WITH_URL]]` | — | Static UI | 2-sentence email body with site URL for "Email a friend" link |
| `#donate` | `[[FROM_PAPER_CONCLUSION_CLOSING_LINE]]` | Conclusion | Closing `<p>` | Farsi or English closing line — e.g. "Workers of the world…" or equivalent |
| `#donate` | `[[ASSET_QR_CODE_DONATE]]` | — | Image asset | QR code linking to `[[URL_UNITED_FOR_IRAN_DONATE]]` — replace `<div class="qr-placeholder">` with `<img>` in both the donate section slot and the floating desktop widget |

---

## Campaign Components (`.campaign-components` aside, above footer)

| Section ID | Placeholder | Paper Section | Type | Note |
|---|---|---|---|---|
| aside | `[[FROM_PAPER_SECTION_4_OVERVIEW]]` | Section 4 | Intro `<p>` | One sentence: student civic-action project for POLS 1365, three components funneling to one place |
| aside | `[[FROM_PAPER_SECTION_4_WEBSITE]]` | Section 4 | List item — Website | One phrase: argument-forward site that ends in donate |
| aside | `[[FROM_PAPER_SECTION_4_INFOGRAPHICS]]` | Section 4 | List item — Infographics | Name the three: How a Strike Fund Works, Where Your Donation Goes, The Iranian Labor Timeline |
| aside | `[[FROM_PAPER_SECTION_4_FLYERS]]` | Section 4 | List item — Flyers | IAPA spaces, political science building, student union; QR code routes here |
| aside | `[[FROM_PAPER_SECTION_4_PARTNER]]` | Section 4 | List item — Partner | United for Iran; Schumacher correspondence April 2026; institutional pathway |

---

## Footer

| Section ID | Placeholder | Paper Section | Type | Note |
|---|---|---|---|---|
| footer | `[[FROM_PAPER_INTRO_SITE_NAME]]` | Intro | Brand name | Same as nav logo |
| footer | `[[FROM_PAPER_INTRO_TAGLINE]]` | Intro | Tagline `<p>` | 6-word tagline |
| footer | `[[UI_AUTHOR_NAME]]` | — | Static UI | Your name or organizing collective — follows "A project by" |

---

## Pre-Launch Checklist

Once all rows above are filled:

- [ ] `grep -r '\[\[' index.html` returns zero results
- [ ] Donate button `href` resolves to a live United for Iran page
- [ ] Email `mailto:` link pre-fills subject and body correctly
- [ ] `og-image.jpg` (1200×630 px) is in `assets/images/`
- [ ] QR code image is in `assets/images/` and scans to the correct URL
- [ ] Three icon SVGs are in `assets/icons/`
- [ ] Delete or hide the dev banner (`#dev-banner`) in `index.html`
- [ ] Test on mobile (iOS Safari + Android Chrome) and desktop Chrome / Firefox
- [ ] Confirm scroll-reveal animations fire on first visit (no cached `.revealed` state)
