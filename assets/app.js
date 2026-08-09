/* =====================================================
   Portfolio App — markdown embedded, no fetch needed
   ===================================================== */

const CASE_STUDIES = [
  {
    file: 'case_study_01_auto_login.md',
    id: '01',
    title: 'Auto Login',
    tagline: 'Removing the Barrier Between Partner Platform Users and Content',
    timeline: 'Mar–Jun 2023',
    tags: ['Cross-company Integration', 'User Growth', 'Technical Complexity', 'B2C Streaming'],
    metric: 'DAU >55%  ·  Viewers >50%  ·  View Count >55%',
    inProgress: false,
    content: `# Case Study 01: Auto Login
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

**Result:** DAU grew over 55%, Viewers over 50%, View Count over 55% — measured four weeks post-launch (p<0.001).

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
| DAU | >55% | p<0.001 |
| Viewers | >50% | p<0.001 |
| View Count | >55% | p<0.001 |

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

*Note: Partner platform name, specific metrics, and internal system details have been adjusted to protect company confidentiality.*`,
  },
  {
    file: 'case_study_02_fast_pip.md',
    id: '02',
    title: 'FAST PiP',
    tagline: 'Validating Investment with Data Before Committing to High-Cost Development',
    timeline: 'Jan–Mar 2025',
    tags: ['ROI Decision-Making', 'Data-Driven', 'New Business', 'FAST Streaming'],
    metric: 'Android launched on schedule  ·  iOS investment case validated',
    inProgress: false,
    content: `# Case Study 02: FAST PiP
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

*Note: Relative figures and technical implementation details have been adjusted to protect company confidentiality.*`,
  },
  {
    file: 'case_study_03_series_bundle_voucher.md',
    id: '03',
    title: 'Series Bundle Voucher',
    tagline: 'Bridging a New Content Partnership Model with a Viable Payment Architecture',
    timeline: 'Jun–Dec 2024',
    tags: ['Monetization', '0-to-1', 'Business Partnership', 'Paywall Design'],
    metric: 'Revenue ~+10% (micro-drama)  ·  200+ orders (film) in 6-week pilot',
    inProgress: false,
    content: `# Case Study 03: Series Bundle Voucher
## Bridging a New Content Partnership Model with a Viable Payment Architecture

**Role:** Product Manager (Sole PM)
**Team:** Frontend, Backend, Design, Content Operations, Data
**Timeline:** June – December 2024
**Tags:** Monetization · 0-to-1 · Business Partnership · Paywall Design · B2C Streaming

---

## Overview

The platform's micro-drama catalog was originally available exclusively under SVOD subscription. In mid-2024, the content and rights team brought a new studio partnership to the table — one that required per-episode purchase (TVOD) as a condition of the deal, a model that didn't exist in the platform's payment infrastructure at the time.

I led the end-to-end delivery of the Series Bundle Voucher: a 30-day time-limited access pass that unlocks an entire series in a single purchase. Designed in collaboration with backend engineers and design, the voucher served as a transitional payment architecture — satisfying the studio's requirement to monetize content outside SVOD while remaining within what the team could realistically ship. The project also required upfront infrastructure work to support vertical video playback across all platforms before the payment layer could be built.

The feature shipped in December 2024. A subsequent six-week pilot validated commercial demand: micro-drama revenue grew roughly 10% versus baseline, and film titles generated 200+ voucher orders through a purchase channel that hadn't existed before.

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
| Micro-dramas | Voucher replaces SVOD | Revenue ~+10% vs. baseline |
| Film titles | Voucher as new purchase channel | 200+ orders across the pilot period |

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

*Note: Company name, revenue figures, order counts, and partnership details have been adjusted or generalized to protect company confidentiality.*`,
  },
];

/* ---- Escape HTML ---- */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* =====================================================
   Index page
   ===================================================== */
function renderIndex() {
  const grid = document.getElementById('case-grid');
  if (!grid) return;

  grid.innerHTML = CASE_STUDIES.map((cs) => `
    <a class="case-card" href="case-study.html#${esc(cs.file)}" aria-label="Read case study: ${esc(cs.title)}">
      <div class="card-number">${esc(cs.id)}</div>
      <div class="card-title">${esc(cs.title)}</div>
      <div class="card-tagline">${esc(cs.tagline)}</div>
      <div class="card-timeline">${esc(cs.timeline)}${cs.inProgress ? ' <span class="card-status">· In progress</span>' : ''}</div>
      <div class="card-tags">${cs.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="card-divider"></div>
      <div class="card-metric">${esc(cs.metric)}${cs.inProgress ? '<br><span class="card-status">Results pending</span>' : ''}</div>
    </a>
  `).join('');
}

/* =====================================================
   Case study page
   ===================================================== */
function renderCaseStudy() {
  const article = document.getElementById('case-study-content');
  if (!article) return;

  window.scrollTo(0, 0);

  const filename = window.location.hash.slice(1);

  const cs = CASE_STUDIES.find((c) => c.file === filename);
  if (!cs) {
    article.innerHTML = '<p style="color:var(--muted);padding:4rem 0;">Case study not found.</p>';
    return;
  }

  const idx = CASE_STUDIES.indexOf(cs);

  document.title = `${cs.title} — Wen Peng`;

  const hrIndex = cs.content.indexOf('\n---\n');
  const headerBlock = hrIndex !== -1 ? cs.content.slice(0, hrIndex) : '';
  const bodyBlock   = hrIndex !== -1 ? cs.content.slice(hrIndex + 5) : cs.content;

  const meta = parseMetadata(headerBlock);

  document.getElementById('cs-header').innerHTML = buildHeader(cs, meta);

  article.innerHTML = marked.parse(bodyBlock, { gfm: true, breaks: false });

  postProcess(article, cs);
  renderCsNav(idx);
}

function parseMetadata(headerBlock) {
  const meta = {};
  const pattern = /\*\*(.+?):\*\*\s*(.+)/g;
  let m;
  while ((m = pattern.exec(headerBlock)) !== null) {
    meta[m[1].trim().toLowerCase()] = m[2].trim();
  }
  return meta;
}

function buildHeader(cs, meta) {
  const role     = meta['role']     || '';
  const team     = meta['team']     || '';
  const timeline = meta['timeline'] || cs.timeline;
  const context  = meta['context']  || '';
  const tagsRaw  = meta['tags']     || '';
  const tags     = tagsRaw.split(' · ').filter(Boolean);

  const contextRow = context ? `
    <div class="cs-meta-item">
      <div class="cs-meta-label">Context</div>
      <div class="cs-meta-value">${esc(context)}</div>
    </div>` : '';

  return `
    <div class="cs-number">Case Study ${esc(cs.id)}</div>
    <h1 class="cs-title">${esc(cs.title)}</h1>
    <p class="cs-tagline">${esc(cs.tagline)}</p>
    <div class="cs-meta-grid">
      <div class="cs-meta-item">
        <div class="cs-meta-label">Role</div>
        <div class="cs-meta-value">${esc(role)}</div>
      </div>
      <div class="cs-meta-item">
        <div class="cs-meta-label">Team</div>
        <div class="cs-meta-value">${esc(team)}</div>
      </div>
      <div class="cs-meta-item">
        <div class="cs-meta-label">Timeline</div>
        <div class="cs-meta-value">${esc(timeline)}</div>
      </div>
      ${contextRow}
    </div>
    <div class="cs-tags-row">
      ${tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
    </div>
  `;
}

function postProcess(container, cs) {
  container.querySelectorAll('h3').forEach((h3) => {
    const m = h3.textContent.match(/^(\d{2})\s*[—–-]\s*(.+)/);
    if (m) {
      h3.innerHTML = `<span class="step-num">${m[1]}</span>${esc(m[2])}`;
    }
  });

  let inResult = false;
  container.querySelectorAll('h2, table').forEach((el) => {
    if (el.tagName === 'H2' && el.textContent.toLowerCase().includes('result')) {
      inResult = true;
    }
    if (el.tagName === 'TABLE' && inResult) {
      styleResultTable(el);
    }
  });

  container.querySelectorAll('blockquote').forEach((bq) => {
    if (/[　-鿿豈-﫿]/.test(bq.textContent)) {
      bq.setAttribute('lang', 'zh-TW');
    }
  });

  const allParas = container.querySelectorAll('p');
  const lastPara = allParas[allParas.length - 1];
  if (lastPara && lastPara.textContent.trim().startsWith('Note:')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'confidentiality-note';
    lastPara.parentNode.insertBefore(wrapper, lastPara);
    wrapper.appendChild(lastPara);
  }

  if (cs.inProgress) {
    let resultH2 = null;
    container.querySelectorAll('h2').forEach((h) => {
      if (h.textContent.toLowerCase().includes('result')) resultH2 = h;
    });
    if (resultH2) {
      let next = resultH2.nextElementSibling;
      while (next && next.tagName !== 'H2') {
        const following = next.nextElementSibling;
        const wrapper = document.createElement('div');
        wrapper.className = 'result-pending';
        next.parentNode.insertBefore(wrapper, next);
        wrapper.appendChild(next);
        next = following;
      }
    }
  }
}

function styleResultTable(table) {
  table.querySelectorAll('tr').forEach((row) => {
    const cells = row.querySelectorAll('td');
    if (cells.length >= 2) cells[1].classList.add('metric-val');
  });
}

function renderCsNav(idx) {
  const navEl = document.getElementById('cs-nav');
  if (!navEl) return;

  const prev = CASE_STUDIES[idx - 1];
  const next = CASE_STUDIES[idx + 1];

  navEl.innerHTML = `
    <div class="cs-nav-inner">
      ${prev
        ? `<a class="cs-nav-link prev" href="case-study.html#${esc(prev.file)}">
             <span>← Previous</span>
             ${esc(prev.title)}
           </a>`
        : '<span></span>'}
      ${next
        ? `<a class="cs-nav-link next" href="case-study.html#${esc(next.file)}">
             <span>Next →</span>
             ${esc(next.title)}
           </a>`
        : '<span></span>'}
    </div>
  `;
}

/* =====================================================
   Init
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'index') {
    renderIndex();
    initCopyEmail();
  }
  if (page === 'case-study') renderCaseStudy();
});

function initCopyEmail() {
  const btn = document.querySelector('.contact-email[data-email]');
  if (!btn) return;
  btn.addEventListener('click', () => {
    navigator.clipboard.writeText(btn.dataset.email).then(() => {
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 2000);
    });
  });
}

window.addEventListener('hashchange', () => {
  if (document.body.dataset.page === 'case-study') renderCaseStudy();
});
