# Case Study 01: Auto Login
## Removing the Barrier Between Partner Platform Users and Content

**Role:** Product Manager (Sole PM)
**Team:** 10+ cross-functional (Android, Web, Backend, Design, QA, Data)
**Timeline:** March – June 2023
**Context:** 6 weeks into role
**Tags:** Cross-company Integration · User Growth · Technical Complexity · B2C Streaming

---

## Overview

A major cable TV operator — a platform whose subscribers skew older — required users to scan a QR code with their mobile phone to watch content on their set-top boxes. This multi-step process created unnecessary friction and drove users away before they even started watching.

I led the end-to-end delivery of Auto Login: a feature that lets partner platform users open the TV app and start watching immediately, without any manual login step. The project involved integrating two authentication systems across two independent engineering teams — with no prior integration blueprint to follow.

**Result:** DAU +57%, Viewers +55%, View Count +58% — measured four weeks post-launch (p<0.001).

---

## The Problem

The partner platform's user base is predominantly older adults, many of whom found the existing QR code login process too technically demanding. The flow required them to:

1. Open the TV app on their set-top box
2. See a QR code on screen
3. Open the streaming app on their phone
4. Scan the QR code to authenticate

For a demographic unfamiliar with QR codes, this was effectively a barrier to entry. Many users dropped off before watching a single episode — meaning the partner platform's subscribers weren't converting into active viewers, and the streaming platform was losing both viewership data and the ability to market to this audience.

> "Simplify login, and you unlock a dormant user base — without acquiring a single new user."

The product goal was clear: let partner platform users open the TV app and start watching immediately, with no manual login step required.

---

## Constraints

**No integration blueprint.**
The only existing documentation was years out of date — predating my time at the company. I had joined approximately six weeks before this project kicked off, with no handoff documentation and no internal precedent to reference.

**External API uncertainty.**
External API documentation arrived five weeks into the planning phase, and integration surfaced several technical discrepancies between the two systems that required real-time resolution.

**High-stakes account merging logic.**
Partner platform users could have multiple account states across two platforms, two purchase channels, and various subscription statuses. Every combination needed a defined behavior. Getting this wrong meant users losing access to paid content — a critical trust and business risk.

**Cross-company coordination.**
Two independent engineering teams needed to align on API specs, error handling, and release timing, with no shared tooling or process.

---

## My Approach

### 01 — Map the existing flow before waiting for documentation
While waiting for external API documentation, I audited the entire existing user flow and designed the target state: what the experience should look like after Auto Login. This gave me a concrete basis for early discussions with our engineering lead about technical feasibility, and meant we weren't starting from zero when documentation finally arrived.

### 02 — Own the edge case definition
The most technically complex part was account merging. I drafted the first version of the full logic matrix myself — mapping 10+ user scenarios across purchase channels, account states, and subscription statuses. I then worked through it line by line with our backend engineers to identify gaps and validate technical assumptions. I also drew both as-is and to-be user flows as a shared reference for both teams to align on.

### 03 — Bridge two engineering teams in real time
When technical discrepancies surfaced during integration, I facilitated concalls between both engineering teams to diagnose issues, translated technical findings into actionable decisions, and kept both sides moving without letting problems accumulate into blockers.

### 04 — Close the loop post-launch
After launch, I produced documentation for the partner platform's team covering error codes, flows, and Q&A — ensuring they could support their users independently. I also worked with Data to establish event tracking for account merging and entry points, creating the measurement foundation for subsequent integration features.

---

## Result

### Core metrics (4-week post-launch comparison)
| Metric | Growth | Significance |
|--------|--------|--------------|
| DAU | **+57%** | p<0.001 |
| Viewers | **+55%** | p<0.001 |
| View Count | **+58%** | p<0.001 |

### Trend health
Growth held steady through weeks 3–4 after controlling for public holiday effects — confirming structural uplift rather than a short-term spike.

### Usage pattern shift
Weekday growth outpaced weekend growth, and the weekend/weekday ratio converged — signaling a shift from occasional weekend entertainment to a daily viewing habit.

### Longer-term impact
Beyond the numbers, this project established the integration foundation that subsequent partner platform features were built on — including account binding flows and downstream platform consolidation work.

---

## What This Case Shows

- **Technical ownership without a blueprint** — I mapped the integration from scratch, drafted the edge case logic myself, and drove resolution across two independent engineering teams with no prior process to follow
- **Proactive scope definition** — rather than waiting for complete documentation, I audited the existing flow and defined the target state early, creating a concrete basis for technical discussions before API docs arrived
- **Edge case thinking as risk management** — the account merging matrix wasn't a documentation exercise; it was how I identified and neutralized the scenarios most likely to break user trust
- **Cross-company coordination under ambiguity** — bridging two engineering teams in real time, translating between technical and product, keeping both sides unblocked without a shared process
- **Closing the loop post-launch** — post-launch documentation and event tracking weren't afterthoughts; they were how I ensured the integration could be maintained and built on by others

---

*Note: Partner platform name, specific metrics, and internal system details have been adjusted to protect company confidentiality.*
