---
name: "LMCT+ Petrol South Australia"
description: "A bold, evidence-led petrol campaign system built from editorial colour fields, exact offer terms and real Edwardstown proof."
colors:
  petrol-navy: "#07142D"
  petrol-navy-raised: "#0C1831"
  action-blue: "#1D5FB8"
  action-blue-hover: "#154A90"
  campaign-blue: "#1D8FFF"
  forecourt-sky: "#79C8FF"
  fuel-ice: "#D9ECFF"
  blue-white: "#F7FBFF"
  white: "#FFFFFF"
  ink: "#0B1220"
  muted: "#465B76"
  error: "#A32121"
  navy-copy: "#C8D8EB"
  hero-copy: "#DCE8F8"
  hero-note: "#B8CAE1"
  action-copy: "#EAF3FF"
  app-caption: "#9EB6D2"
typography:
  display:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(3.75rem, 7.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, Arial, sans-serif"
    fontSize: "clamp(2.8rem, 5vw, 4.8rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Jost, Arial, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Jost, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.25vw, 1.16rem)"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  label:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, Arial, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.035em"
rounded:
  nested: "12px"
  action-panel: "14px"
  panel: "16px"
  pill: "999px"
spacing:
  tight: "10px"
  compact: "14px"
  content: "24px"
  gutter: "24px"
  gutter-mobile: "18px"
  section: "clamp(72px, 8vw, 124px)"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.action-blue-hover}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
    height: "56px"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.petrol-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "15px 26px"
    height: "56px"
  offer-ledger:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.panel}"
    padding: "clamp(30px, 4vw, 50px)"
  rate-panel:
    backgroundColor: "{colors.campaign-blue}"
    textColor: "{colors.petrol-navy}"
    rounded: "{rounded.panel}"
    padding: "clamp(26px, 4vw, 46px)"
  faq-row:
    backgroundColor: "{colors.blue-white}"
    textColor: "{colors.petrol-navy}"
    rounded: "{rounded.nested}"
    padding: "18px 22px"
    height: "64px"
---

# Design System: LMCT+ Petrol South Australia

## Overview

**Creative North Star: "The Forecourt Ledger"**

LMCT+ Petrol South Australia feels like a bold annual-offer campaign printed at forecourt scale and translated into a precise digital ledger. Large condensed type, real Edwardstown imagery and decisive navy, white and electric-blue fields make the practical fuel proposition instantly legible; exact renewal, purchase and promotion terms keep that confidence credible.

The system is editorial rather than app-dashboard-like. Full-width colour chapters alternate with asymmetric splits, price and entry figures act as typographic anchors, and only the few concepts that benefit from enclosure become panels. It rejects generic card grids, decorative prize collages, unverified countdown theatre and imagery that implies benefits the offer does not include.

**Key Characteristics:**

- Alternating full-width navy, white, blue-white and campaign-blue editorial fields.
- Bold italic uppercase Barlow Semi Condensed headlines paired with highly readable Jost copy.
- One-plan price ledgers, oversized factual numerals and concise Australian-English disclosures.
- Real Edwardstown station and LMCT+ app imagery used as evidence, with captions that limit what each image claims.
- Restrained transform-only motion, visible focus states and reduced-motion parity.

## Colors

The palette combines forecourt authority with one vivid campaign destination: navy establishes trust, action blue carries decisions, bright blue marks promotional emphasis, and pale surfaces keep long-form explanation clear.

### Primary

- **Petrol Navy** (`petrol-navy`): The dominant brand field for headers, hero areas, proof chapters, final closes and the mobile action bar.
- **Action Blue** (`action-blue`): The transactional colour for primary buttons, annual-plan ledgers, progress tools and compact confirmation marks.
- **Action Blue Hover** (`action-blue-hover`): The single darker response colour for actionable hover states.

### Secondary

- **Campaign Blue** (`campaign-blue`): The high-energy field for the current promotion, entry-rate panels and campaign numerals.
- **Forecourt Sky** (`forecourt-sky`): A sparing highlight for price terms, icons, selection and mobile price emphasis.
- **Fuel Ice** (`fuel-ice`): The quiet proof and disclosure surface for inclusions, secondary rate panels, app facts and open FAQs.

### Neutral

- **Blue White** (`blue-white`): The low-contrast editorial field behind the offer, final section and closed FAQ rows.
- **White** (`white`): The clean reading surface and inverse text colour.
- **Ink** (`ink`): Full-strength running copy on light fields.
- **Muted** (`muted`): Secondary billing notes only; it is not the default body colour.
- **Petrol Navy Raised** (`petrol-navy-raised`): Image fallback and subtle tonal separation inside dark chapters.
- **Navy Copy**, **Hero Copy**, **Hero Note**, **Action Copy** and **App Caption**: Purpose-specific cool tints for dark-background support text, ordered from strong supporting copy to quiet disclaimer text.
- **Error** (`error`): Reserved for genuine validation or launch-state failures; it is not a promotional accent.

### Named Rules

**The Electric Destination Rule.** Campaign blue marks a small number of high-value destinations or proof points; it does not wash every section.

**The Full-Ink Rule.** Primary body copy uses Ink on light surfaces. Muted and cool-tint copy is limited to notes, captions and disclosures.

## Typography

**Display Font:** Barlow Semi Condensed (with Arial Narrow and Arial fallbacks)  
**Body Font:** Jost (with Arial fallback)  
**Label Font:** Barlow Semi Condensed (with Arial Narrow and Arial fallbacks)

**Character:** The pairing is fast, physical and unmistakably promotional without sacrificing comprehension. Barlow Semi Condensed supplies petrol-sign scale and tabular-feeling numerals; Jost gives offer mechanics and disclosures a calm, open reading texture.

### Hierarchy

- **Display** (800 italic, `clamp(3.75rem, 7.4vw, 6rem)`, `0.9` line-height): Two-line hero statements and the strongest campaign claims; uppercase with tight tracking (`-0.03em`).
- **Headline** (800 italic, `clamp(2.8rem, 5vw, 4.8rem)`, `0.92` line-height): Section chapter titles, generally held to 14 characters of measure or less.
- **Title** (700, `1.35rem`, `1.2` line-height): Plain-language labels inside rate and proof panels.
- **Body** (400, `clamp(1rem, 1.25vw, 1.16rem)`, `1.62` line-height): Running explanation with a maximum measure of approximately 66 characters.
- **Label** (800 italic, `1.15rem`, `0.035em` tracking): Uppercase button labels and compact high-emphasis actions.

### Named Rules

**The Two-Line Rule.** Display and headline copy must remain short enough to resolve in no more than two lines at its intended breakpoint.

**The Numeral-as-Evidence Rule.** Price, litres, spend thresholds and prize amounts may become oversized typography only when they state a verified campaign fact.

## Layout

The page is a sequence of full-width editorial fields around a centered container (`min(1180px, 100% - 48px)`). Desktop sections use asymmetric two-column grids with fluid gaps and generous vertical rhythm (`clamp(72px, 8vw, 124px)`); repeated grids are reserved for the two confirmed earning rates and paired station crops.

At `960px`, major grid gaps tighten. At `820px`, all primary splits collapse to one column, the app copy precedes its proof image, and sections settle to 82px vertical padding. At `640px`, the container gutter becomes 18px per side, sections use 68px vertical padding, buttons become full width and paired rate/inclusion layouts stack. Mobile content reserves safe-area space for a guarded action bar.

**The Alternating Field Rule.** Build rhythm through large navy, white, blue-white and campaign-blue chapters; do not turn the page into a procession of same-size cards.

**The One-Plan Rule.** A single annual offer is expressed as one price ledger and one final close, never as a comparison table or invented tier system.

## Elevation & Depth

The system is flat and tonal. It uses no box shadows: hierarchy comes from colour-field contrast, deliberate overlap-free composition, rounded clipping and photographic crops. Interactive depth is communicated through a two-pixel lift or a slight press scale, not ambient shadow.

### Named Rules

**The No-Shadow Rule.** Do not add floating-card shadows, glows or glass effects. Separate surfaces with colour, whitespace and restrained borders only when a real boundary is needed.

## Shapes

Large content panels and media crops use restrained curved corners (`16px`). Nested rows such as inclusions, app proof items and FAQs use slightly tighter corners (`12px`); the final action inset uses `14px`. Buttons, progress tracks and small status marks are fully pill-shaped (`999px`) or circular. Photographs are clipped cleanly rather than decorated.

**The Restrained Radius Rule.** Sixteen pixels is the maximum standard panel radius. Pills belong to actions and meters, not to every container.

## Components

All funnel CSS is scoped under `.lmct-sa-fuel-million`. New components for the ClickFunnels fragment must preserve that boundary and must not leak global resets or tokens.

### Buttons

- **Shape:** Fully rounded action silhouette (`999px`) with a 56px minimum height and `15px 26px` padding.
- **Primary:** Action Blue background with White uppercase italic Label typography.
- **Hover / Focus:** Fine-pointer hover lifts by 2px and shifts to Action Blue Hover; active press scales to `0.97`. Keyboard focus uses a 3px Campaign Blue outline with a 4px offset.
- **Light:** White on Petrol Navy; hover converges on Action Blue Hover with White text.
- **Mobile:** Primary actions fill the available width. The compact sticky action remains at least 48px high inside a 56px-plus safe touch region.

### Cards / Containers

- **Corner Style:** Restrained panel corners (`16px`), with nested content rows at `12px`.
- **Background:** One decisive field per purpose: Action Blue for the annual ledger and progress tool, Campaign Blue or Fuel Ice for rate proof, Petrol Navy for the final offer frame.
- **Shadow Strategy:** None; see the No-Shadow Rule.
- **Border:** None in the incumbent system.
- **Internal Padding:** Fluid, usually `clamp(26px, 4vw, 50px)`; mobile panels reduce to 22px horizontal padding.

### Inputs / Fields

- **Style:** The fuel-progress range is the canonical input: a minimum 44px touch target, Forecourt Sky accent and a 14px pill meter on a translucent white track.
- **Focus:** The shared 3px Campaign Blue focus outline with 4px offset remains visible on keyboard interaction.
- **Feedback:** Update numeric output and meter transform immediately; do not delay or animate layout properties.

### Navigation

The compact Petrol Navy header uses the approved LMCT+ Petrol mark at 164px wide, a concise Edwardstown location label and a 74px minimum height. On mobile it tightens to 66px, the mark reduces to 132px and the decorative location icon is removed rather than squeezing the copy.

### Disclosure Rows

Inclusion and app-proof rows use Fuel Ice, Petrol Navy text, 12px corners, a 24px Action Blue confirmation dot and compact 14–18px padding. They state verified facts only; disclaimers remain adjacent to the asset or action they qualify.

### FAQ

FAQ items are quiet Blue White disclosure rows with 12px corners and 64px minimum summaries. The open state shifts to Fuel Ice, the plus icon rotates by transform, and opening one item closes the others.

### Mobile Sticky Action

The sticky action appears only below 640px, uses a Petrol Navy field, respects `env(safe-area-inset-bottom)` and hides whenever the offer, final close, footer, headings, controls or other actionable content intersects its guard zone. It is a convenience, never a layer that covers reading or input.

## Do's and Don'ts

### Do:

- **Do** use real Edwardstown station and LMCT+ app imagery as evidence, with honest captions that define what the image does and does not prove.
- **Do** keep price, annual renewal, 12-month duration, Edwardstown location and fuel-purchased-separately terms next to the relevant action.
- **Do** alternate full-width editorial fields and preserve asymmetric desktop compositions before collapsing cleanly at 820px.
- **Do** limit motion to short transform feedback, one purposeful image reveal and content-specific proof cues, with a complete reduced-motion fallback.
- **Do** keep campaign facts and integrations in the single campaign configuration object so dates, rates, URLs, selectors and assets remain updateable without rewriting the page.
- **Do** scope every fragment selector and design token under `.lmct-sa-fuel-million`.

### Don't:

- **Don't** invent offer tiers, entry quantities, fuel prices, fixed savings, partner benefits, testimonials or countdown precision that has not been confirmed.
- **Don't** imply that pictured app prices, savings, rewards or unrelated promotions are package inclusions.
- **Don't** use generic giveaway collages, unrelated footage, decorative video or prize imagery in place of real location and product proof.
- **Don't** repeat identical floating cards, add ambient shadows or exceed the restrained 16px standard panel radius.
- **Don't** use blanket fades, delayed reading, layout-property animation or motion that survives `prefers-reduced-motion: reduce`.
- **Don't** let the mobile sticky action cover the slider, FAQ controls, headings, final offer, checkout or footer.
