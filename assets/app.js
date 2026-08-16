/* =====================================================
   Portfolio App

   Case study content lives in the .md files next to index.html
   and is fetched at runtime. The .md file is the single source
   of truth — do not duplicate content into this file.

   Local preview needs a server (fetch fails on file://):
     python3 -m http.server 8791
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
const mdCache = new Map();

async function loadMarkdown(file) {
  if (mdCache.has(file)) return mdCache.get(file);
  const res = await fetch(file, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const text = await res.text();
  mdCache.set(file, text);
  return text;
}

async function renderCaseStudy() {
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

  article.innerHTML = '<p style="color:var(--muted);padding:4rem 0;">Loading…</p>';

  let content;
  try {
    content = await loadMarkdown(cs.file);
  } catch (err) {
    console.error('Failed to load case study:', cs.file, err);
    article.innerHTML =
      '<p style="color:var(--muted);padding:4rem 0;">' +
      "Sorry — this case study didn't load. Please refresh, or " +
      '<a href="index.html">go back to the overview</a>.' +
      '</p>';
    renderCsNav(idx);
    return;
  }

  // 這次載入完成前，使用者可能已經切到另一篇（hashchange）
  if (window.location.hash.slice(1) !== cs.file) return;

  const hrIndex = content.indexOf('\n---\n');
  const headerBlock = hrIndex !== -1 ? content.slice(0, hrIndex) : '';
  const bodyBlock   = hrIndex !== -1 ? content.slice(hrIndex + 5) : content;

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
