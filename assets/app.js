/* =====================================================
   Portfolio App

   Case study content lives in the .md files next to index.html
   and is fetched at runtime. The .md file is the single source
   of truth — do not duplicate content into this file.

   `slug` drives the URL hash; `file` is only used to fetch the markdown.
   Filenames stay numbered for internal filing; the number is not shown
   to readers and array order is free to change.

   Local preview needs a server (fetch fails on file://):
     python3 -m http.server 8791

   NOTE: `tagline`, `timeline` and `metric` below are card-level
   summaries and are NOT read from the .md — update them here too
   whenever those change in the markdown.
   ===================================================== */

const CASE_STUDIES = [
  /* Case 04 待上線：功能全量上線確認後把下面這段取消註解。
     case_study_04_homepage_preference_filter.md 已在 repo 目錄下但未 commit，
     所以這段一定要跟那個 .md 同一次 commit，否則線上會 fetch 到 404。
     本機要預覽 04 就先取消註解，commit 前記得改回來。 */
  /*
  {
    file: 'case_study_04_homepage_preference_filter.md',
    slug: 'homepage-preference-filter',
    title: 'Homepage Preference Filter',
    tagline: 'Shipping a Constrained Solution While Building the Case for Segmentation',
    timeline: 'Apr–Aug 2026',
    tags: ['Content Discovery', 'A/B Testing', 'Constraint-Driven Delivery', 'Disagree & Commit'],
    metric: '+1.60pp home-to-view conversion (p=0.012)  ·  6-week build',
    inProgress: false,
  },
  */
  {
    file: 'case_study_01_auto_login.md',
    slug: 'auto-login',
    title: 'Auto Login',
    tagline: 'Removing the Barrier Between Partner Platform Users and Content',
    timeline: 'Mar–Jun 2023',
    tags: ['Cross-company Integration', 'User Growth', 'Technical Complexity'],
    metric: 'DAU +57%  ·  Viewers +55%  ·  View Count +58%',
    inProgress: false,
  },
  {
    file: 'case_study_03_series_bundle_voucher.md',
    slug: 'series-bundle-voucher',
    title: 'Series Bundle Voucher',
    tagline: 'Bridging a New Content Partnership Model with a Viable Payment Architecture',
    timeline: 'Jun–Dec 2024',
    tags: ['Monetization', '0-to-1', 'Business Partnership', 'Paywall Design'],
    metric: 'Revenue +10.1% (micro-drama)  ·  250+ orders (film) in 6-week pilot',
    inProgress: false,
  },
  {
    file: 'case_study_02_fast_pip.md',
    slug: 'fast-pip',
    title: 'FAST PiP',
    tagline: 'Validating Investment with Data Before Committing to High-Cost Development',
    timeline: 'Jan–Mar 2025',
    tags: ['ROI Decision-Making', 'New Business', 'Data-Driven', 'FAST Streaming'],
    metric: 'Android launched on schedule  ·  iOS investment case validated',
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
    <a class="case-card" href="case-study.html#${esc(cs.slug)}" aria-label="Read case study: ${esc(cs.title)}">
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

  const cs = CASE_STUDIES.find((c) => c.slug === filename);
  if (!cs) {
    // 這條路徑也會從 hashchange 進來（前一篇已經渲染好了），
    // 所以要把上一篇留下的標題、頁尾導覽、目錄、進度條一起清掉，
    // 否則畫面會變成「A 篇的標題 + 找不到」。
    document.title = 'Wen Peng — Product Manager';
    document.getElementById('cs-header').innerHTML = '';
    const navEl = document.getElementById('cs-nav');
    if (navEl) navEl.innerHTML = '';
    document.querySelector('.cs-toc')?.remove();
    document.querySelector('.reading-progress')?.remove();
    article.innerHTML =
      '<p style="color:var(--muted);padding:4rem 0;">' +
      'Case study not found. <a href="index.html">Back to the overview</a>.' +
      '</p>';
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
  if (window.location.hash.slice(1) !== cs.slug) return;

  const hrIndex = content.indexOf('\n---\n');
  const headerBlock = hrIndex !== -1 ? content.slice(0, hrIndex) : '';
  const bodyBlock   = hrIndex !== -1 ? content.slice(hrIndex + 5) : content;

  const meta = parseMetadata(headerBlock);

  document.getElementById('cs-header').innerHTML = buildHeader(cs, meta);

  article.innerHTML = marked.parse(bodyBlock, { gfm: true, breaks: false });

  postProcess(article, cs);
  buildToc(article);
  renderCsNav(idx);
}

/* ---- On-this-page nav + reading progress ----
   目錄用 button 而非 <a href="#...">：本站以 hash 做路由，
   改動 hash 會觸發 hashchange 並重新渲染整頁。 */
function buildToc(container) {
  document.querySelector('.cs-toc')?.remove();
  document.querySelector('.reading-progress')?.remove();

  const headings = Array.from(container.querySelectorAll('h2'));
  if (headings.length < 3) return;

  headings.forEach((h, i) => { if (!h.id) h.id = 'section-' + i; });

  const nav = document.createElement('nav');
  nav.className = 'cs-toc';
  nav.setAttribute('aria-label', 'On this page');
  // 版面關鍵屬性用 inline 兜底：萬一 style.css 沒載到，
  // 目錄也不會變成一般區塊掉到 footer 下面。
  nav.style.position = 'fixed';
  // 目錄標籤取逗號前的部分：章節標題可以完整，目錄只要能辨識。
  // 縮短後每項都是單行，掃讀快很多，右緣也不會太參差。
  const tocLabel = (text) => {
    const short = text.split(/[,，]/)[0].trim();
    return short.length >= 3 ? short : text.trim();
  };

  nav.innerHTML =
    '<div class="cs-toc-label">On this page</div><ol class="cs-toc-list">' +
    headings.map((h, i) =>
      `<li><button type="button" class="cs-toc-link" data-i="${i}">${esc(tocLabel(h.textContent))}</button></li>`
    ).join('') +
    '</ol>';
  document.body.appendChild(nav);

  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  bar.innerHTML = '<span></span>';
  document.body.appendChild(bar);
  const fill = bar.firstElementChild;

  const links = Array.from(nav.querySelectorAll('.cs-toc-link'));
  links.forEach((btn) => {
    btn.addEventListener('click', () => {
      headings[Number(btn.dataset.i)].scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const TOC_MIN_WIDTH = 1180;
  // 目錄只在「正在讀內文」時出現：
  // 還在看檔頭時不顯示（避免蓋住 Role/Team/Timeline/Context 欄位），
  // 讀完內文捲到頁尾導覽時也收起來。
  const applyVisibility = () => {
    const wideEnough = window.innerWidth >= TOC_MIN_WIDTH;
    nav.style.display = wideEnough ? '' : 'none';
    if (!wideEnough) { nav.classList.remove('is-visible'); return; }
    const r = container.getBoundingClientRect();
    const reading = r.top <= 140 && r.bottom >= 240;
    nav.classList.toggle('is-visible', reading);
  };
  applyVisibility();

  let ticking = false;
  const update = () => {
    ticking = false;
    applyVisibility();

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    fill.style.transform = `scaleX(${pct})`;

    let activeIdx = 0;
    headings.forEach((h, i) => {
      if (h.getBoundingClientRect().top <= 120) activeIdx = i;
    });
    links.forEach((btn, i) => btn.classList.toggle('is-active', i === activeIdx));
  };

  const onScroll = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
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
  // 內文第一個 blockquote 是案例摘要，給它專屬樣式（不要和使用者引言混淆）
  const first = container.firstElementChild;
  if (first && first.tagName === 'BLOCKQUOTE') {
    first.classList.add('cs-summary');
  }

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

/* 高亮「結果欄」：靠表頭文字判斷是哪一欄，而不是固定第 2 欄。
   固定第 2 欄在兩欄表沒問題，但欄位一多就會highlight錯——
   例如 A/B 表的第 2 欄是對照組，highlight 它會讀成那是成果。 */
const RESULT_HEADER_PATTERNS = [
  /^(Δ|delta|change|lift|diff)/i,   // 差值優先：有差值欄時它就是結論
  /^(growth|result|impact|outcome)/i,
  /(conversion|rate|revenue|orders)/i,
];

function resultColumnIndex(table) {
  const heads = Array.from(table.querySelectorAll('thead th')).map((th) => th.textContent.trim());
  for (const pattern of RESULT_HEADER_PATTERNS) {
    const i = heads.findIndex((h, idx) => idx > 0 && pattern.test(h));
    if (i !== -1) return i;
  }
  return 1; // 認不出來就沿用舊行為
}

/* .metric-val 是等寬＋accent 色，適合短數值。整句話套上去會變成
   一段金色等寬散文，比不套還吵，所以長格子跳過。 */
function isShortValue(text) {
  return text.trim().length <= 24;
}

function styleResultTable(table) {
  const col = resultColumnIndex(table);
  table.querySelectorAll('tr').forEach((row) => {
    const cells = row.querySelectorAll('td');
    if (cells.length <= col) return;
    // 短格子：整格套色。長格子（結果寫成一句話）：只挑裡面的粗體數字，
    // 句子本身維持內文樣式。
    cells[col].classList.add(isShortValue(cells[col].textContent) ? 'metric-val' : 'metric-inline');
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
        ? `<a class="cs-nav-link prev" href="case-study.html#${esc(prev.slug)}">
             <span>← Previous</span>
             ${esc(prev.title)}
           </a>`
        : '<span></span>'}
      ${next
        ? `<a class="cs-nav-link next" href="case-study.html#${esc(next.slug)}">
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
