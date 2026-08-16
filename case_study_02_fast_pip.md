# Case Study 02: FAST PiP
## Validating Investment with Data Before Committing to High-Cost Development

**Role:** Product Manager (Sole PM)
**Team:** iOS, Android, UIUX, QA, Data
**Timeline:** January – March 2025
**Tags:** ROI Decision-Making · New Business · Data-Driven · FAST Streaming

---

## Overview

FAST (Free Ad-Supported Streaming TV) is a free streaming vertical — a newer business unit where engineering investments need to be carefully justified. When the opportunity arose to extend picture-in-picture (PiP) from the VOD player to the FAST player, the path forward wasn't straightforward: Android and iOS required fundamentally different implementation approaches, and the iOS scope carried significantly higher cost.

Extending PiP to FAST was already validated by VOD data — PiP users generate meaningfully more view count per session, making the case for FAST expansion clear. The harder question was whether to invest in iOS in-app PiP specifically: a full architectural rebuild with no ability to reuse the existing VOD module.

Rather than committing to that cost without evidence, I worked with the data analyst to analyze how users actually engage with in-app vs. out-of-app PiP on VOD — using it as a behavioral proxy to determine whether the in-app entry point was worth the rebuild.

**Android launched on schedule (March 2025). The analysis provided the evidential foundation for the iOS in-app PiP investment decision.**

---

## Background

### VOD PiP: the foundation
Before FAST PiP, I led the delivery of PiP for the VOD player on both iOS and Android (launched August 2024). On Android, users can activate PiP either by tapping a minimize button within the player (in-app) or by navigating away from the app (out-of-app). On iOS, only out-of-app PiP was supported — the in-app minimize button was not part of the iOS VOD implementation.

This established both a reusable technical foundation and a body of user behavior data that would later inform the FAST PiP investment decision.

### The opportunity
FAST needed to grow its product competitiveness and user retention. PiP was identified as a natural extension to the FAST player — data from the VOD player suggested that PiP users generate meaningfully more view count per session than non-PiP users, and the team believed the same dynamic would hold for FAST's live streaming context.

---

## The Problem

FAST users watching live streams had no way to keep content playing while navigating elsewhere. Extending PiP to the FAST player was the solution — but the two platforms presented very different cost profiles:

**Android:** Could support both in-app PiP (minimize button within the player) and out-of-app PiP (swipe away to background). Implementation was scoped and proceeded directly.

**iOS:** Due to architectural constraints, only out-of-app PiP was feasible without significant additional investment. Adding in-app PiP to iOS — the entry point that mirrors what Android users experience inside the app — would require a substantial rebuild of the FAST player's architecture. The existing VOD module was incompatible; there was no in-app design to build on.

Extending PiP to FAST was already the right call — VOD data had confirmed that PiP users generate significantly more view count per session, providing sufficient justification for the expansion. The question was more specific:

> **Is the in-app PiP entry point on iOS valuable enough to justify a substantial architectural investment — or is out-of-app PiP alone sufficient?**

---

## Constraints

**iOS architectural limitation.**
iOS in-app PiP on FAST required a significant player rebuild — not a configuration change, and not reusable from the VOD implementation. This represented a substantial engineering investment.

**FAST player integration complexity.**
Beyond the architectural work, extending PiP to the FAST player required a thorough audit of dependent features — including ad playback, viewing task mechanics, and vertical player behavior — to ensure none were disrupted by player state changes during PiP transitions.

**Engineering resource trade-offs.**
Committing iOS engineers to a high-effort rebuild meant deferring other FAST improvements. The decision needed to be grounded in evidence, not assumption.

---

## My Approach

### 01 — Scope Android and proceed
Android's FAST PiP implementation was well-defined and lower-risk. I scoped the feature to support both in-app and out-of-app PiP on Android, and proceeded with development while the iOS question was still being evaluated. Android launched March 2025.

### 02 — Find a data proxy for the iOS in-app decision
When the iOS architectural constraint became clear, I didn't move straight to a yes/no call. The real question was: **do users actually rely on in-app PiP, or would out-of-app alone be sufficient?**

VOD PiP had been live since August 2024 with tracking in place. I worked with the data analyst to design an analysis of how users engage with in-app vs. out-of-app PiP — specifically, which entry point users prefer, and whether the in-app experience drives meaningfully different engagement outcomes.

### 03 — Analyze and interpret the findings
The analysis segmented VOD PiP users into four journey groups based on how they moved between in-app and out-of-app during a session. Two findings stood out:

**In-app PiP is the dominant entry point.** The vast majority of users activate PiP via the in-app minimize button. Very few users use PiP exclusively outside the app.

**Switching behavior drives the longest sessions.** Users who move between in-app and out-of-app — enabled by starting in-app — watch significantly more content than those who only use out-of-app PiP. The engagement gap between the highest and lowest groups was substantial.

This meant that out-of-app-only PiP (the lower-cost iOS path) would serve a small minority of user behavior, while the higher-engagement patterns depended on having the in-app entry point.

### 04 — Use findings to make the iOS in-app case
The data made the case: the in-app entry point was the dominant behavior, and the highest-engagement patterns depended on starting there. Out-of-app-only PiP on iOS would serve a small minority of how users actually engage with the feature.

This analysis grounded the iOS in-app investment decision in evidence — turning what would otherwise be a cost-versus-intuition trade-off into a data-backed call.

---

## Result

**Android:** Launched on schedule, March 2025, with full in-app and out-of-app PiP support.

**iOS investment evaluation:** The VOD PiP analysis validated the hypothesis that in-app PiP is the dominant and higher-value entry point. This data-backed rationale supports the case for investing in the full iOS implementation when engineering capacity allows.

---

## What This Case Shows

- **ROI framing before committing to cost** — when the iOS architectural constraint surfaced, I didn't default to the cheaper path or push for the full build on instinct; I found a data proxy and made the case with evidence
- **Using existing products as research infrastructure** — VOD PiP had been live for months with tracking in place; I recognized that behavioral data as answerable to the iOS question and designed the analysis accordingly
- **Parallel execution under uncertainty** — I scoped and launched Android while the iOS decision was still being evaluated, rather than blocking both on a single unresolved question
- **Hypothesis-driven analysis** — the four user journey segments weren't a fishing expedition; the analysis was designed to answer a specific question about entry point value, and the findings directly informed the investment decision
- **Translating data into a business decision** — the output wasn't a data report; it was a defensible rationale for where to commit engineering resources

---

*Note: Relative figures and technical implementation details have been adjusted to protect company confidentiality.*
