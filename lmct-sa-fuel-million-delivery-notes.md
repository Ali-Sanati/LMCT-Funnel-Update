# LMCT+ SA Fuel + $1M Funnel — Delivery Notes

## Deliverables

- `lmct-sa-fuel-million-preview.html` — standalone reviewable page using local supplied assets.
- `lmct-sa-fuel-million-fragment.html` — ClickFunnels-ready HTML/CSS/JavaScript fragment; all component styles are scoped under `.lmct-sa-fuel-million`.
- `assets/lmct-sa-fuel/edwardstown-station.png` — local preview copy of the supplied Edwardstown station image.

## Three passes

1. **Impeccable:** established the campaign hierarchy, LMCT+ type/palette, alternating editorial composition, one-plan $199 offer, responsive layout, accessible semantics and precise Australian-English offer copy.
2. **Emil Kowalski:** refined hover/focus/pressed states, single-open FAQ behaviour, CTA routing, query preservation, 56 px mobile targets, guarded sticky CTA, image stability and reduced-motion behaviour.
3. **Taste Skill:** rendered desktop/tablet/mobile screenshots, replaced generic card repetition with full-width campaign fields, improved image cropping and copy order, strengthened the fuel/prize distinction, and kept motion to a station reveal plus short content-specific transform cues.

## ClickFunnels integration

Edit only `LMCT_SA_FUEL_CONFIG` near the end of the fragment. Set either:

- `checkoutUrl` to the checkout destination; current page query parameters are carried forward, or
- `nativeCheckoutSelector` to the selector for an existing native checkout element; the element is moved into the funnel checkout mount and scrolled into view.

If neither is set, CTA buttons scroll to the annual offer for safe previewing. The funnel does not collect card data or simulate a completed purchase.

## Verified

- Taste source lint: 0 failures, 0 warnings.
- Render inspection at 1440 px, 768 px and 390 px: 0 failures; no horizontal overflow, broken images, clipping or sticky-content collisions.
- Live headless-Chromium interaction checks: 130 L calculates as 2 bonus entries plus 30 L progress; only one FAQ stays open; CTA routing fires; focus outline is visible; mobile actions meet the 56 px target; the sticky CTA clears the footer; reduced motion is honoured; no console errors.
- ClickFunnels-hosted logo, station and app assets returned HTTP 200.
- Offer copy was checked against the supplied campaign facts and excluded-benefit list.

The final Taste warnings are documented and intentional: responsive `clamp()` values inflate the computed type-size count; grey is limited to secondary notes; no verified campaign video was supplied; and motion remains deliberately restrained.

## Required before launch

1. Confirm the number of immediate entries included with purchase (`initialPurchaseEntries`).
2. Supply the checkout URL or native checkout selector (`checkoutUrl` / `nativeCheckoutSelector`).
3. Supply the official promotion terms URL (`promotionTermsUrl`).
4. Confirm the exact 29 October 2026 closing timestamp and timezone (`campaignClosingTimestamp` / `campaignClosingTimezone`).
5. Confirm whether petrol-station shop spend accumulates across transactions (`shopSpendAccumulatesAcrossTransactions`).

No countdown is included because the exact closing timestamp and timezone are unconfirmed. No dedicated verified $1M campaign video or prize artwork was supplied; the design uses the approved station, logo and app assets without inventing a prize visual.
