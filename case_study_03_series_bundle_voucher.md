# Case Study 03: Series Bundle Voucher
## Bridging a New Content Partnership Model with a Viable Payment Architecture

**Role:** Product Manager (Sole PM)
**Team:** Frontend, Backend, Design, Content Operations, Data
**Timeline:** June – December 2024
**Tags:** Monetization · 0-to-1 · Business Partnership · Paywall Design · B2C Streaming

---

## Overview

The platform's micro-drama catalog was originally available exclusively under SVOD subscription. In mid-2024, the content and rights team brought a new studio partnership to the table — one that required per-episode purchase (TVOD) as a condition of the deal, a model that didn't exist in the platform's payment infrastructure at the time.

I led the end-to-end delivery of the Series Bundle Voucher: a 30-day time-limited access pass that unlocks an entire series in a single purchase. Designed in collaboration with backend engineers and design, the voucher served as a transitional payment architecture — satisfying the studio's requirement to monetize content outside SVOD while remaining within what the team could realistically ship. The project also required upfront infrastructure work to support vertical video playback across all platforms before the payment layer could be built.

The feature shipped in December 2024. A subsequent six-week pilot validated commercial demand: micro-drama revenue grew 10.1% versus baseline, and film titles generated 250+ voucher orders through a purchase channel that hadn't existed before.

---

## The Problem

The studio partnership came with a clear commercial requirement: content provided under the deal needed to be monetized on a per-title basis, not bundled into the existing SVOD subscription. This was a condition for the revenue-sharing model to work for the studio.

The platform had no per-episode or per-title purchase option for micro-dramas. Building a full single-episode TVOD system was the eventual goal, but not a realistic near-term scope given the engineering investment required. At the same time, saying the platform couldn't support the partnership wasn't an option — micro-dramas were a new and strategically important content category.

The question the team needed to answer was:

> "What payment model could satisfy the studio's requirement, ship within a realistic timeline, and still leave room to evolve toward per-episode purchase later?"

---

## Constraints

**No vertical video infrastructure.**
Before the payment layer could be built, the platform needed to support direct-format (vertical) video across all surfaces. Existing transcoding, subtitle rendering, and player components were built for horizontal content — none of them handled vertical video correctly out of the box.

**No existing per-title payment infrastructure.**
Micro-dramas had only ever been sold under SVOD. Building per-episode TVOD from scratch was out of scope for the partnership timeline — the voucher model had to work within the existing entitlement architecture with targeted modifications.

**Single purchase option per page.**
The existing drama page could only display one purchase option at a time. Offering both the bundle voucher and SVOD subscription side-by-side — the natural upsell pairing — would have required rebuilding the purchase UI from the ground up, which was out of scope for the initial build.

**Content access isolation.**
Bundle voucher content and SVOD content had to be managed as separate entities in the backend — limiting flexibility in how content was packaged and surfaced.

---

## My Approach

### 01 — Resolve vertical video infrastructure before touching the payment layer
The payment feature couldn't be built on top of a platform that didn't reliably support vertical video. Before the voucher work began, I coordinated three parallel infrastructure workstreams with engineering and design:

- **Automated transcoding:** Extended the existing transcoding pipeline to detect and handle vertical vs. horizontal video formats, giving Ops a reliable path to process direct-format content.
- **Subtitle rendering:** Adjusted subtitle display boundaries across platforms to follow design specifications for vertical video — preventing text from overlapping action areas.
- **Player support:** Audited all platform players for vertical video compatibility and prioritized fixes for those in the critical path.

These weren't glamorous features, but clearing them first meant the payment layer wouldn't be built on shaky ground.

### 02 — Design the payment architecture around a single type that solved three problems at once
When the per-episode TVOD requirement came in, the team — frontend and backend engineers, design, and myself — worked through the architecture options together. The core question wasn't just "what can we ship now," but "what implementation choice leaves the right doors open later."

The answer was to implement the voucher as a **consumable in-app purchase item** (App Store / Google Play). This single decision resolved three constraints simultaneously:

- **Store policy compliance.** Consumable items are the correct purchase type under platform guidelines for content that is accessed and depleted — keeping the implementation store-compliant without requiring a separate payment flow.
- **Current business requirement.** The consumable maps cleanly to the full-series unlock mechanic: one purchase, one series, 30-day access — satisfying the studio's requirement to monetize content outside SVOD on a per-title basis.
- **Future extensibility.** Consumables are the natural foundation for a token-based model. When the platform is ready to move toward per-episode unlocking, the architecture is already in place. The voucher wasn't a detour; it was the first step on the intended path.

I worked through the entitlement logic with the backend team to define where existing systems could be adapted and where new builds were needed, and documented the architectural rationale so the per-episode path remained visible to future teams.

### 03 — Design the purchase flow with the constraint as a given
When it became clear that the drama page could only display one purchase option at a time — and that supporting both voucher and SVOD side-by-side would require rebuilding the purchase UI entirely — I worked with design and engineering to scope what was feasible within the constraint. Rather than blocking on the ideal state, we defined a clean single-option purchase flow, and documented the UI rebuild as a follow-up investment decision with a clear rationale for when and why to prioritize it.

### 04 — Close discoverability gaps after commercial validation
With no capacity to build a dedicated voucher storefront at launch, discoverability had to be solved through existing infrastructure. After the pilot confirmed commercial demand, the constraint became concrete: Ops editors had no efficient way to find and curate voucher titles as the catalog grew.

Rather than scoping a new frontend feature, I worked with Content Operations to extend the existing CMS filter system — adding a bundle voucher filter to the playlist tool. This gave editors an immediate path to surface voucher content through curated playlists and promotional slots without additional engineering cost.

---

## Result

### Commercial validation (6-week pilot)

| Content Type | Model | Result |
|---|---|---|
| Micro-dramas | Voucher replaces SVOD | Revenue **+10.1%** vs. baseline |
| Film titles | Voucher as new purchase channel | **250+ orders** across the pilot period |

### What the results established

**For micro-dramas:** Moving content out of SVOD and into a bundle voucher directly grew revenue — confirming that per-title monetization is a viable model for this content category and that users respond to the simplified purchase mechanic.

**For film titles:** The voucher opened a net-new purchase channel with no prior full-series access option, confirming genuine demand from users who weren't converting through existing channels alone.

### What remains unresolved — and why

The studio partnership that originally drove this feature was discontinued — meaning the per-episode TVOD model the voucher was designed to transition toward was never built. The infrastructure remains live and commercially validated, but its long-term roadmap depends on whether the platform pursues new content partnerships requiring per-title monetization.

Two product gaps also remain open: displaying both voucher and SVOD purchase options on a single drama page still requires rebuilding the purchase UI, and content discoverability at scale hasn't been structurally solved beyond the CMS filter added post-pilot.

---

## What This Case Shows

- **Translating a business requirement into a product architecture decision** — the studio's per-title monetization requirement wasn't a feature request; I worked with engineering to find an implementation that satisfied it within realistic constraints while leaving the right doors open for what came next
- **Forward-looking architecture under timeline pressure** — choosing consumable IAP wasn't just the compliant option; it was the option that created a path to per-episode unlocking without requiring a rebuild later
- **Infrastructure-first sequencing** — I resolved vertical video support across transcoding, subtitles, and player before touching the payment layer, because building on unstable infrastructure would have multiplied downstream risk
- **Constraint-aware scoping** — when it became clear the drama page couldn't display both purchase options at once without a full UI rebuild, I didn't try to solve it within scope; I documented it clearly as a follow-up investment decision and moved forward with a clean single-option flow
- **Post-launch iteration grounded in evidence** — the CMS filter for voucher content wasn't in the original plan; it came from listening to Ops after commercial validation confirmed the catalog would grow

---

*Note: Company name, revenue figures, order counts, and partnership details have been adjusted or generalized to protect company confidentiality.*
