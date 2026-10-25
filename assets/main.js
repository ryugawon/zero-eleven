/* ZERO ELEVEN — no dependency static site. Educational simulation, not a real football event. */
/* CSS included by build-generated HTML */

const OFFSIDE_URL = 'https://www.theifab.com/laws/latest/offside/';
const VAR_URL = 'https://www.theifab.com/laws/latest/video-assistant-referee-var-protocol/';
const FOUL_URL = 'https://www.theifab.com/laws/latest/fouls-and-misconduct/';
const FIFA_URL = 'https://www.youtube.com/@fifa';
const FIFA_VIDEOS_URL = 'https://www.youtube.com/@fifa/videos';
const disclaimer = '본 페이지는 수업 실습을 위해 제작한 학습용 기획물입니다. 공식 대회·협회·선수의 운영 페이지가 아닙니다.';

const routes = [
  { label: 'BRAND', href: '/about', key: 'about' },
  { label: 'RULES', href: '/rules', key: 'rules' },
  { label: 'GAME', href: '/review', key: 'review' },
  { label: 'HIGHLIGHTS', href: '/highlights', key: 'highlights' },
  { label: 'BLOG', href: '/blog', key: 'blog' },
];

const scenarios = [
  {
    id: 'pass-moment', kicker: 'SCENARIO 01 / PASS MOMENT',
    title: '패스 순간 앞에 있던 공격수, 득점 인정일까?',
    text: '같은 팀 선수가 공을 패스한 순간, 9번 공격수는 상대 진영에서 공과 끝에서 두 번째 상대 선수보다 골라인에 더 가까웠습니다. 9번은 바로 그 패스를 받아 골을 넣었습니다. 다른 예외 상황은 없습니다.',
    answer: 'NO GOAL',
    reason: '동료가 공을 플레이한 순간 이미 오프사이드 위치에 있던 9번이 그 공을 받아 적극적으로 플레이했습니다. 따라서 오프사이드 반칙이 성립하고 이 득점은 인정되지 않습니다.',
    diagram: 'offside', source: OFFSIDE_URL
  },
  {
    id: 'uninvolved-attacker', kicker: 'SCENARIO 02 / INVOLVEMENT',
    title: '앞에 있는 선수, 하지만 공에 관여하지 않았다면?',
    text: '공격수 A는 오프사이드 위치에 있었지만 공을 건드리거나 상대를 방해하지 않았습니다. 온사이드 위치에서 출발한 동료 B가 패스를 받아 골을 넣었습니다. 다른 반칙은 없다고 가정합니다.',
    answer: 'GOAL',
    reason: '오프사이드 위치에 있다는 사실만으로 반칙은 아닙니다. A가 플레이나 상대 선수에게 규정상 영향을 주지 않았고, 온사이드의 B가 정상적으로 득점했다면 오프사이드 반칙으로 취소하지 않습니다.',
    diagram: 'onside', source: OFFSIDE_URL
  },
  {
    id: 'goal-kick', kicker: 'SCENARIO 03 / RESTART',
    title: '골킥에서 공을 직접 받았다면?',
    text: '골키퍼의 골킥으로 시작된 공을 공격수가 상대 진영의 최전방에서 직접 받았습니다. 공이 다른 선수에게 닿지 않았고, 그 밖의 반칙은 없다고 가정합니다. 오프사이드로 골을 취소해야 할까요?',
    answer: 'GOAL',
    reason: 'IFAB 경기규칙 제11조에 따라 골킥에서 공을 직접 받는 경우에는 오프사이드 반칙이 적용되지 않습니다. 득점 과정에 다른 위반이 없다면 오프사이드만을 이유로 골을 취소할 수 없습니다.',
    diagram: 'goal-kick', source: OFFSIDE_URL
  },
];

const definitions = {
  offside: {
    number: '01', label: 'OFFSIDE', title: '앞에 있었다고, 무조건 반칙은 아니야.',
    text: '선수가 오프사이드 위치에 있는 것만으로는 반칙이 아닙니다. 동료가 공을 플레이한 순간의 위치와 이후 실제 플레이 관여 여부를 함께 확인해야 해요.',
    bullets: ['패스·터치 순간의 위치 확인', '공과 끝에서 두 번째 상대 선수 기준', '공격에 관여했는지 확인'],
    source: OFFSIDE_URL, sourceLabel: 'IFAB LAW 11'
  },
  var: {
    number: '02', label: 'VAR', title: '영상은 판단을 돕고, 결정은 주심이 해.',
    text: 'VAR은 비디오 보조 심판입니다. 골 인정 여부, 페널티킥, 직접 퇴장, 선수 오인 등 규정된 상황에서 명백한 오류나 놓친 중대한 사건을 확인하도록 돕습니다.',
    bullets: ['골 / 노 골 판정 검토', '정해진 네 가지 상황 중심', '최종 판정은 주심'],
    source: VAR_URL, sourceLabel: 'IFAB VAR PROTOCOL'
  },
  foul: {
    number: '03', label: 'FOUL', title: '몸이 닿았다고 모두 파울은 아니야.',
    text: '접촉 자체가 곧 반칙을 의미하지 않습니다. 어떤 행동이었는지, 부주의하거나 무모했는지 등 경기규칙이 정한 기준으로 판단합니다.',
    bullets: ['단순 접촉과 반칙 구분', '행동의 유형과 정도 확인', '상황에 맞는 규정 적용'],
    source: FOUL_URL, sourceLabel: 'IFAB LAW 12'
  }
};

const faq = [
  ['오프사이드 위치에 있으면 무조건 반칙인가요?', '아니요. 동료가 공을 플레이하거나 터치한 순간의 위치, 그리고 이후 플레이에 관여했는지에 따라 오프사이드 반칙 여부를 판단합니다.'],
  ['VAR이 직접 골을 취소하나요?', 'VAR은 주심을 지원하는 비디오 보조 심판입니다. 판정 검토는 규정된 상황에 제한되며 최종 결정은 주심이 내립니다.'],
  ['선수끼리 부딪히면 모두 파울인가요?', '아니요. 경기 중 접촉 자체가 항상 반칙은 아니며 행위의 유형과 정도를 IFAB 경기규칙에 따라 판단합니다.'],
  ['이 사이트의 2:1 경기는 실제로 있었나요?', '아니요. 2:1 → 2:2? → 2:1은 판정 이해를 돕기 위한 ZERO ELEVEN의 가상 상황입니다. 실제 대회·팀·선수의 경기 기록이 아닙니다.']
];

function track(name, values = {}) {
  // GTM/GA4 are intentionally NOT installed. Pushing to dataLayer prepares future approved setup.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...values });
}
function outbound(label, cls = '', location = 'generic', destination = FIFA_URL) {
  return `<a class="${cls}" href="${destination}" target="_blank" rel="noopener noreferrer" data-event="cta_click" data-location="${location}" data-text="${label}">${label}<span class="arrow-inline" aria-hidden="true">↗</span></a>`;
}
function eyebrow(index, title, inverse = false) {
  return `<div class="eyebrow ${inverse ? 'eyebrow-inverse' : ''}"><span class="eyebrow-line"></span><span>${index} &nbsp;/&nbsp; ${title}</span></div>`;
}
function header(key) {
  return `<a class="skip-link" href="#main">본문 바로가기</a>
  <header class="site-header" id="siteHeader">
    <div class="topline"><span>ZERO ELEVEN / THE FOOTBALL PLAYBOOK</span><span class="topline-right"><i class="live-dot"></i> LEARN THE RULE. LOVE THE GAME.</span></div>
    <div class="nav-wrap container-wide">
      <a class="brand" href="/" aria-label="ZERO ELEVEN 홈으로 이동"><span class="brand-symbol"><span></span><b>11</b></span><span class="brand-name">ZERO<span>ELEVEN</span></span></a>
      <nav class="nav-desktop" aria-label="주 메뉴">${routes.map(r => `<a ${r.key === key || (key === 'article' && r.key === 'blog') ? 'aria-current="page"' : ''} href="${r.href}" class="nav-link ${r.key === key || (key === 'article' && r.key === 'blog') ? 'selected' : ''}">${r.label}</a>`).join('')}</nav>
      <div class="nav-actions">${outbound('FIFA YOUTUBE', 'nav-youtube', 'header', FIFA_URL)}<button type="button" class="menu-button" id="menuButton" aria-controls="mobileMenu" aria-expanded="false" aria-label="메뉴 열기"><span></span><span></span></button></div>
    </div>
    <nav class="nav-mobile" id="mobileMenu" aria-label="모바일 메뉴" hidden>${routes.map(r => `<a href="${r.href}" ${r.key === key || (key === 'article' && r.key === 'blog') ? 'aria-current="page"' : ''}>${r.label}<span>↗</span></a>`).join('')}</nav>
  </header>`;
}
function footer() {
  return `<footer class="footer"><div class="container-wide">
    <div class="footer-head"><div><span class="footer-label">SEE IT DIFFERENTLY.</span><a class="footer-logo" href="/">ZERO<span>ELEVEN<span class="footer-dot">.</span></span></a></div><div class="footer-next"><span>ONE MORE PLAY?</span>${outbound('FIFA 공식 채널', 'footer-link', 'footer')}</div></div>
    <div class="footer-bottom"><p>${disclaimer}</p><div class="footer-links"><a href="/about">BRAND</a><a href="/rules">RULES</a><a href="/blog">BLOG</a><a href="${OFFSIDE_URL}" target="_blank" rel="noopener noreferrer">IFAB ↗</a></div><span>© 2026 ZERO ELEVEN / STUDENT PROJECT</span></div>
  </div></footer>`;
}
function pitchGraphic(type = 'offside') {
  const a = type === 'onside';
  const gk = type === 'goal-kick';
  const label = gk ? 'GOAL KICK' : a ? 'NO INVOLVEMENT' : 'PASS MOMENT';
  const line = gk ? 342 : 352;
  const ballX = gk ? 100 : a ? 170 : 172;
  const ballY = gk ? 230 : 260;
  const targetX = a ? 309 : 422;
  const targetY = a ? 270 : 160;
  return `<svg viewBox="0 0 550 350" class="pitch-svg" role="img" aria-label="가상 경기장 도식. 노란 점은 공격수, 흰 점은 수비수, 붉은 점선은 오프사이드 위치를 비교하는 기준선입니다. 실제 경기 영상이 아닙니다.">
    <defs><pattern id="pitchLines-${type}" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" stroke="#9cccaa" opacity=".09" fill="none"/></pattern></defs>
    <rect width="550" height="350" rx="16" fill="#153d31"/><rect width="550" height="350" rx="16" fill="url(#pitchLines-${type})"/>
    <rect x="22" y="20" width="505" height="309" rx="3" fill="none" stroke="#8fb49e" stroke-width="2"/><path d="M275 20v309" stroke="#8fb49e" stroke-width="2"/><circle cx="275" cy="175" r="67" fill="none" stroke="#8fb49e" stroke-width="2"/>
    <rect x="441" y="102" width="85" height="150" fill="none" stroke="#8fb49e" stroke-width="2"/><rect x="485" y="138" width="40" height="76" fill="none" stroke="#8fb49e" stroke-width="2"/>
    ${gk ? '' : `<path d="M${line} 20V329" stroke="#e4484a" stroke-width="3" stroke-dasharray="9 8"/>`}
    <g fill="#f8f7f2" stroke="#123329" stroke-width="4"><circle cx="344" cy="102" r="15"/><circle cx="339" cy="245" r="15"/><circle cx="452" cy="250" r="15"/></g>
    <g fill="#ffd43b" stroke="#123329" stroke-width="4"><circle cx="${gk ? 87 : 165}" cy="${gk ? 229 : 272}" r="17"/><circle cx="411" cy="${a ? 92 : 161}" r="17"/><circle cx="${targetX}" cy="${targetY}" r="17"/></g>
    <circle cx="${ballX}" cy="${ballY}" r="9" fill="#fff" stroke="#151515" stroke-width="3"/>
    <path d="M${ballX + 10} ${ballY - 6} Q${gk ? 280 : 270} ${gk ? 110 : 215} ${targetX - 17} ${targetY + 4}" stroke="#ffd43b" stroke-width="4" stroke-dasharray="11 9" fill="none" stroke-linecap="round"/>
    <path d="m${targetX - 31} ${targetY - 6} 18 10 -16 13" stroke="#ffd43b" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g font-family="Arial,sans-serif" font-weight="800" font-size="13"><rect x="37" y="36" width="${gk ? 112 : a ? 166 : 143}" height="27" rx="3" fill="#151515"/><text x="46" y="54" fill="#ffd43b" letter-spacing="1.5">${label}</text></g>
    <g font-family="Arial,sans-serif" font-weight="700" font-size="13"><text x="39" y="314" fill="#cee6d7">● ATTACK</text><text x="151" y="314" fill="#cee6d7">● DEFENCE</text></g>
  </svg>`;
}
function quizLayout(mode, index = 0) {
  const q = mode === 'mini' ? scenarios[1] : scenarios[index];
  const n = mode === 'mini' ? 1 : scenarios.length;
  return `<div class="quiz-layout"><div class="quiz-visual"><div class="visual-caption"><span class="indicator-light"></span> TACTICAL REPLAY <small>/ DEMO ONLY</small></div>${pitchGraphic(q.diagram)}<div class="visual-legend"><span><i class="dot yellow"></i> 공격</span><span><i class="dot white"></i> 수비</span><span><i class="line red"></i> 위치 기준선</span></div></div>
      <div class="quiz-panel"><div class="quiz-meta"><span>${q.kicker}</span><span>${mode === 'mini' ? 'QUICK CHECK' : `${String(index + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`}</span></div>
        <h3>${q.title}</h3><p class="quiz-situation">${q.text}</p>
        <p class="quiz-prompt">YOUR CALL <span>↘</span></p>
        <div class="quiz-options"><button type="button" data-answer="GOAL">GOAL <span>↗</span></button><button type="button" data-answer="NO GOAL">NO GOAL <span>↗</span></button></div>
        <div class="quiz-result" role="status" aria-live="polite" hidden></div>
        <p class="quiz-fine">* 실제 경기나 공식 판정이 아닌 학습용 가상 사례입니다.</p>
      </div></div>`;
}
function renderQuiz(mode) {
  return `<div class="quiz-stage" data-mode="${mode}" data-index="0">${quizLayout(mode)}</div>`;
}
function rulesTabs() {
  return `<div class="rules-tabs" data-rules-tabs>
      <div class="tabs-row" role="tablist" aria-label="축구 규칙 분류">${Object.keys(definitions).map((k, i) => `<button type="button" role="tab" id="tab-${k}" aria-selected="${i === 0}" aria-controls="panel-${k}" data-tab="${k}" class="tab-button ${i === 0 ? 'active' : ''}"><span>0${i + 1}</span>${definitions[k].label}<span>↗</span></button>`).join('')}</div>
      ${Object.entries(definitions).map(([k, d], i) => `<div class="rule-panel ${i === 0 ? 'active' : ''}" role="tabpanel" id="panel-${k}" aria-labelledby="tab-${k}" data-panel="${k}" ${i !== 0 ? 'hidden' : ''}>
        <div class="rule-content"><span class="rule-index">LAW / ${d.number}</span><h3>${d.title}</h3><p>${d.text}</p><ul>${d.bullets.map(b => `<li><span>↗</span>${b}</li>`).join('')}</ul><a href="${d.source}" target="_blank" rel="noopener noreferrer" class="rule-source">공식 규칙으로 확인하기 <span>${d.sourceLabel} ↗</span></a></div>
        <div class="rule-visual"><div class="rule-visual-tag">THE RULES BEHIND THE MOMENT</div>${k === 'offside' ? `<img src="/assets/offside-cover.svg" alt="패스와 오프사이드 기준선을 나타내는 자체 제작 전술 그래픽" loading="lazy" width="1200" height="740" />` : `<img src="${k === 'var' ? '/assets/thumbnail-var.svg' : '/assets/thumbnail-rules.svg'}" alt="${k === 'var' ? '비디오 판독 VAR을 상징하는 자체 제작 모니터 이미지' : '옐로 카드와 레드 카드의 자체 제작 규칙 이미지'}" loading="lazy" width="900" height="540" />`}<span class="rule-watermark">ZERO / 11</span></div>
      </div>`).join('')}
    </div>`;
}
function faqBlock() {
  return `<div class="faq-list">${faq.map((q, i) => `<details class="faq-item" ${i === 0 ? 'open' : ''}><summary><span class="faq-num">0${i + 1}</span><span>${q[0]}</span><span class="faq-plus" aria-hidden="true">+</span></summary><div class="faq-answer">${q[1]}</div></details>`).join('')}</div>`;
}
function sectionLead(index, label, title, desc = '') {
  return `<div class="section-lead">${eyebrow(index, label)}<h2>${title}</h2>${desc ? `<p>${desc}</p>` : ''}</div>`;
}
function actionCards() {
  return `<div class="action-grid">
    <a href="/rules" class="action-card action-know" data-event="hero_step_click" data-step="know"><div class="action-head"><span>01 / UNDERSTAND</span><span>↗</span></div><div><div class="action-graphic action-mark-rules">≡<small>?</small></div><h2>KNOW<span>.</span></h2><p>먼저 규칙을 이해해.<br/>쉽게 읽는 축구 판정의 기본.</p></div><span class="action-bottom">LEARN THE RULES <span>↗</span></span></a>
    <a href="/review" class="action-card action-check" data-event="hero_step_click" data-step="check"><div class="action-head"><span>02 / MAKE THE CALL</span><span>↗</span></div><div><div class="action-graphic action-mark-check">✓<small>×</small></div><h2>CHECK<span>.</span></h2><p>이번엔 네가 심판이야.<br/>GOAL? 아니면 NO GOAL?</p></div><span class="action-bottom">TRY THE GAME <span>↗</span></span></a>
    <a href="${FIFA_URL}" target="_blank" rel="noopener noreferrer" class="action-card action-watch" data-event="cta_click" data-location="hero_watch" data-text="WATCH FIFA highlights"><div class="action-head"><span>03 / WATCH DIFFERENTLY</span><span>↗</span></div><div><div class="action-graphic action-mark-watch">▶<small>REC</small></div><h2>WATCH<span>.</span></h2><p>이제 하이라이트로 확인해.<br/>보는 눈이 달라지는 순간.</p></div><span class="action-bottom">FIFA OFFICIAL YOUTUBE <span>↗</span></span></a>
  </div>`;
}
function heroBoard() {
  return `<div class="score-board" role="img" aria-label="가상 경기 스코어보드: 최초 2대1, 골로 2대2처럼 보인 뒤 판정으로 다시 2대1. 실제 경기 기록이 아닙니다.">
     <div class="score-head"><div><span class="pulse-dot"></span> LIVE / DEMO MATCH</div><div>THE GOAL THAT NEVER COUNTED</div><span>89:27</span></div>
     <div class="score-cards"><div class="score-card"><span class="score-phase">01 / BEFORE</span><strong>2<span>:</span>1</strong><small>THE SCORE</small></div><div class="score-card score-card-highlight"><span class="score-phase">02 / THE MOMENT</span><strong>2<span>:</span>2<sup>?</sup></strong><small>WAIT. REPLAY.</small></div><div class="score-card"><span class="score-phase">03 / THE CALL</span><strong>2<span>:</span>1</strong><small>NO GOAL</small></div></div>
     <div class="score-footer"><span>SIMULATED SCENARIO / NOT A REAL MATCH</span><span>VAR CHECK COMPLETE <i>●</i></span></div>
  </div>`;
}
function finalYouTubeCta() {
  return `<section class="final-cta" aria-labelledby="final-cta-title"><div class="final-cta-pattern">11</div><div class="container-wide final-cta-inner"><div>${eyebrow('FINAL WHISTLE', 'ONE MORE THING')}<h2 id="final-cta-title">스코어는 그대로.<br/><em>보는 눈은 달라진다.</em></h2><p>이제 실제 경기에서 판정의 순간을 찾아볼 차례.</p></div>${outbound('FIFA 공식 하이라이트 보러 가기', 'button button-black', 'final')}</div></section>`;
}
function home() {
  return `${header('home')}<main id="main">
    <section class="hero stadium-hero" aria-label="ZERO ELEVEN 메인 소개">
      <div class="stadium-stage">
        <div class="stadium-hero-main">
          <p class="stadium-event"><span class="stadium-event-dot"></span> THE GOAL THAT NEVER COUNTED <span class="event-slash">/ 001</span></p>
          <div class="stadium-logo-display" aria-label="ZERO ELEVEN">ZERO <span>ELEVEN</span></div>
          <h1>골이 들어갔는데, 왜 <span>2:1</span> 그대로일까?</h1>
          <p class="stadium-tagline">스코어는 그대로. 보는 눈은 달라진다.</p>
          <p class="stadium-score-story">2:1 <span>→</span> 2:2? <span>→</span> 2:1 <em>· 가상 판정 사례</em></p>
          <div class="stadium-hero-buttons">
            <a href="/rules" class="stadium-primary" data-event="hero_step_click" data-step="know"><span aria-hidden="true">◫</span> 축구 규칙 배우기</a>
            <a href="/highlights" class="stadium-secondary"><span aria-hidden="true">▶</span> 하이라이트 관전하기</a>
          </div>
        </div>
        <div class="stadium-triple" aria-label="축구 콘텐츠 세 가지 바로가기">
          <a href="/rules" data-event="hero_step_click" data-step="know"><strong>LEARN</strong><span>축구 규칙 쉽게 배우기</span></a>
          <a href="/highlights"><strong>WATCH</strong><span>경기 관전 포인트 알아보기</span></a>
          <a href="/review" data-event="hero_step_click" data-step="check"><strong>REVIEW</strong><span>GOAL / NO GOAL 판정 게임</span></a>
        </div>
        <span class="stadium-scroll-indicator" aria-hidden="true"><span></span></span>
      </div>
    </section>
    <section class="action-section"><div class="container-wide"><div class="action-intro"><span>01 — YOUR PLAYBOOK</span><p>축구를 보는 방식을 바꾸는 <strong>3가지 스텝.</strong></p></div>${actionCards()}</div></section>
    <section class="manifesto-section"><div class="container-wide"><span class="section-watermark">THE PLAY IS NOT OVER</span>${sectionLead('02', 'THE BIG QUESTION', '골이 취소되는 그 순간,<br/><em>무슨 일이 있었을까?</em>', '공격수가 앞에 있었다고 무조건 오프사이드일까? VAR은 모든 판정을 뒤집을까? 중요한 건 장면을 보는 기준이야.')}${rulesTabs()}</div></section>
    <section class="quiz-section" id="quick-check"><div class="container-wide"><div class="quiz-title-row"><div>${eyebrow('03', 'YOUR CALL / GAME')}<h2>이번엔 네가 <span>심판</span>이야.</h2></div><p>정답을 보기 전에 직접 결정해 봐.<br/>이 판정, GOAL? NO GOAL?</p></div>${renderQuiz('mini')}<div class="quiz-more"><span>MORE THAN ONE WAY TO SEE THE GAME.</span><a href="/review" class="text-link-light">전체 판정 게임 도전하기 <span>↗</span></a></div></div></section>
    <section class="highlights-section"><div class="container-wide">${sectionLead('04', 'SEE THE GAME', '알고 보면 더 재밌는<br/><em>90분의 순간들.</em>', '배운 규칙을 떠올리며 하이라이트를 다시 봐. 공식 영상은 FIFA 채널에서 확인할 수 있어.')}
      <div class="editorial-grid"><a class="editorial-card editorial-card-big" href="/highlights"><div class="editorial-image"><img src="/assets/thumbnail-match.svg" alt="슛 궤적과 경기장을 그린 ZERO ELEVEN 자체 제작 이미지" loading="lazy" width="900" height="540"/><span class="image-label">EDITORIAL / 01</span></div><div class="editorial-content"><div><span>WATCHING GUIDE</span><h3>경기 하이라이트,<br/>이제 장면을 읽어보자.</h3></div><b class="round-arrow">↗</b></div></a>
      <a class="editorial-card" href="/blog/offside-goal" data-event="blog_card_click"><div class="editorial-image"><img src="/assets/offside-cover.svg" alt="패스 순간과 오프사이드 기준선을 표현한 자체 제작 전술 이미지" loading="lazy" width="1200" height="740"/><span class="image-label image-label-yellow">FOOTBALL NOTE</span></div><div class="editorial-content"><div><span>RULES / OFFSIDE</span><h3>골은 들어갔는데,<br/>득점은 무효?</h3></div><b class="round-arrow">↗</b></div></a></div>
    </div></section>
    <section class="faq-section"><div class="container-wide"><div class="faq-layout"><div>${eyebrow('05', 'FAQ / RULES')}<h2>아직 헷갈리는<br/><em>판정이 있다면.</em></h2><p>가장 많이 마주치는 질문부터 빠르게 짚어볼게.</p><a href="/rules" class="inline-link">규칙 전체 보기 <span>↗</span></a></div>${faqBlock()}</div></div></section>
    ${finalYouTubeCta()}
  </main>${footer()}`;
}
function pageHero(index, kicker, title, text, variant = '') {
  return `<section class="page-hero ${variant}"><div class="container-wide page-hero-inner">${eyebrow(index, kicker, true)}<h1>${title}</h1><p>${text}</p><div class="page-hero-footer"><span>ZERO ELEVEN / THE FOOTBALL PLAYBOOK</span><span>2026 — EDUCATIONAL PROJECT</span></div></div></section>`;
}
function blog() {
  return `${header('blog')}<main id="main">${pageHero('BLOG', 'ZERO ELEVEN BLOG', '축구를 더 재미있게 보는<br/><em>짧고 정확한 노트.</em>', '규칙이 어려웠던 순간을 쉬운 말과 그림으로 다시 설명합니다.', 'page-hero-yellow')}
    <section class="blog-list-section"><div class="container-wide"><div class="list-heading"><div>${eyebrow('01','LATEST STORY')}<h2>NOW READING<span class="square-dot">■</span></h2></div><span>01 STORY / MORE COMING SOON</span></div>
      <article class="featured-story"><a href="/blog/offside-goal" class="featured-image" aria-label="오프사이드 홍보 글 자세히 읽기"><img src="/assets/offside-cover.svg" alt="노란 공격수와 흰 수비수, 빨간 오프사이드 기준선을 보여 주는 ZERO ELEVEN 자체 제작 전술 이미지" width="1200" height="740" /><span class="featured-image-stamp">FEATURED / 01</span></a><div class="featured-details"><div class="story-meta"><span>RULES  /  OFFSIDE</span><span>2026.10.23  ·  5 MIN READ</span></div><h2><a href="/blog/offside-goal">골은 들어갔는데,<br/>득점은 무효?<br/><span>오프사이드로 골이 취소되는 이유</span></a></h2><p>선수가 앞에 있었다는 이유만으로 골을 취소하는 걸까? 패스 순간, 관여 여부, VAR까지 한 번에 정리했어.</p><a class="button button-black" href="/blog/offside-goal" data-event="blog_card_click">아티클 읽기 <span>↗</span></a></div></article>
      <div class="blog-bottom-message"><span>EVERY GOAL HAS A STORY.</span><p>한 편부터 제대로. 앞으로도 축구의 결정적 순간을 쉽게 풀어낼게.</p></div>
    </div></section>
  </main>${footer()}`;
}
function articleFigure(src, alt, number, title, caption) {
  return `<figure class="article-figure"><div class="article-img"><img src="${src}" alt="${alt}" width="1200" height="740" loading="lazy"/></div><figcaption><div class="fig-head"><span>FIG. ${number} / ZERO ELEVEN ORIGINAL</span><b>${title}</b></div><p>${caption}</p></figcaption></figure>`;
}
function article() {
  return `${header('article')}<main id="main"><article>
    <header class="article-hero"><div class="container-narrow"><a href="/blog" class="article-back">← ZERO ELEVEN BLOG / 블로그 목록</a><div class="article-meta"><span>THE RULES BEHIND THE GOAL</span><span>2026.10.23</span><span>5 MIN READ</span></div><h1>골은 들어갔는데,<br/>득점은 무효? <span>오프사이드로 골이 취소되는 이유</span></h1><p class="article-lead">공이 골망을 흔들었는데 점수판은 그대로일 때가 있습니다. 골이 들어가기 전에 오프사이드 반칙이 있었다면 득점이 인정되지 않을 수 있기 때문입니다. 다만 공격수가 수비수보다 앞에 서 있었다는 이유만으로 곧바로 반칙이 되는 것은 아닙니다. <strong>동료가 공을 플레이하거나 터치한 순간의 위치와 이후 실제 플레이 관여 여부</strong>를 함께 판단해야 합니다.</p><div class="article-author"><span class="author-monogram">11</span><div><b>ZERO ELEVEN EDITORIAL</b><span>FOOTBALL RULES / LEARNING GUIDE</span></div></div></div></header>
    <div class="article-cover container-wide">${articleFigure('/assets/goal-sequence.svg','2:1에서 동점골처럼 보인 뒤 오프사이드로 다시 2:1을 유지하는 가상 스코어보드','01','골망은 흔들렸는데, 점수는 그대로?','실제 경기 사진이 아닌 ZERO ELEVEN 자체 제작 가상 장면입니다. 골을 넣었어도 오프사이드 반칙이 확인되면 득점이 인정되지 않을 수 있습니다.')}</div>
    <div class="container-narrow article-body"><div class="article-toc"><span>ON THIS PAGE</span><nav aria-label="글 목차"><a href="#offside">01 오프사이드란?</a><a href="#fictional-goal">02 골 취소 가상 사례</a><a href="#video-review">03 비디오 판독(VAR)</a><a href="#watching-tips">04 관전 포인트</a><a href="#article-faq">05 자주 묻는 질문</a></nav></div>
    <section id="offside"><span class="article-section-index">01 / THE RULE</span><h2>오프사이드란? <span>위치와 반칙은 다릅니다</span></h2><p>국제축구평의회(IFAB) 경기규칙 제11조에 따르면 오프사이드 위치에 있는 것 자체는 반칙이 아닙니다. 선수가 상대 팀 진영에서 공과 끝에서 두 번째 상대 선수보다 상대 골라인에 더 가까이 있는지 등 위치 조건을 먼저 살핍니다. 이때 팔과 손은 위치 판단에 포함하지 않습니다. 그 위치에서 동료의 공을 플레이하거나 상대 선수의 플레이를 방해하는 등 규정된 방식으로 관여해야 반칙이 성립합니다.</p><p>그래서 관전할 때는 '선수가 앞에 있나?'에서 멈추지 말고, <strong>'언제 패스했나?'와 '그 선수가 플레이에 관여했나?'</strong>를 차례로 확인해야 합니다.</p><div class="article-note"><span>REMEMBER THIS / KEY RULE</span><strong>위치만 앞섰다 = 자동 반칙 ❌<br/>오프사이드 위치 + 규정상 플레이 관여 = 반칙 가능 ⭕</strong><p>출처: <a href="${OFFSIDE_URL}" target="_blank" rel="noopener noreferrer">IFAB 경기규칙 제11조 ↗</a></p></div></section>
    <section id="fictional-goal"><span class="article-section-index">02 / THE MOMENT</span><h2>골이 취소되는 순간을 <span>가상 장면으로 살펴볼까요?</span></h2><p>ZERO ELEVEN의 2:1 → 2:2? → 2:1은 실제 경기 결과가 아닌 설명용 가상 장면입니다. 2:1로 뒤진 팀의 공격수가 패스를 받아 동점골처럼 보이는 장면을 만들었지만, 패스 순간 오프사이드 위치에 있었고 이후 공을 직접 플레이해 반칙이 인정됐다면 득점은 취소되고 점수는 2:1로 남습니다. 반대로 오프사이드 위치에 있었다고 해도 반칙에 해당하는 관여가 없다면 그 이유만으로 득점을 취소할 수는 없습니다.</p></section>
    </div>
    <div class="container-wide article-second-visual">${articleFigure('/assets/offside-cover.svg','패스 순간 공과 공격수, 끝에서 두 번째 상대 선수의 위치와 이후 공격 관여를 보여주는 가상 축구장 도식','02','수비수보다 앞에 있었다고, 무조건 반칙?','오프사이드는 위치만으로 결정되지 않습니다. 동료가 공을 패스한 순간의 선수 위치와 이후 플레이 관여 여부를 함께 확인해야 합니다. ZERO ELEVEN 자체 제작 설명용 그래픽으로, 공식 판정 화면이 아닙니다.')}</div>
    <div class="container-narrow article-body">
    <section id="video-review"><span class="article-section-index">03 / VIDEO ASSISTANT REFEREE</span><h2>비디오 판독(VAR)은 <span>무엇을 확인할까요?</span></h2><p>VAR은 Video Assistant Referee, 즉 비디오 보조 심판입니다. 단순한 장치 이름이 아니라, 영상을 통해 골 인정 여부 등 규정된 상황에서 주심의 판단을 돕는 심판을 뜻합니다. 모든 장면을 제한 없이 다시 판정하는 방식은 아닙니다. 골 장면에 오프사이드가 있었는지 확인할 때에도 <strong>최종 결정의 주체는 주심</strong>입니다. 화면에 판정선이 등장했다면 선수가 공을 받는 순간만 보지 말고, 패스가 이뤄진 순간을 먼저 떠올려 보세요.</p><a class="article-source-link" href="${VAR_URL}" target="_blank" rel="noopener noreferrer"><span>OFFICIAL SOURCE</span><strong>IFAB / VAR PROTOCOL</strong><span>원문 보기 ↗</span></a></section>
    <section id="watching-tips"><span class="article-section-index">04 / THE 3-STEP CHECK</span><h2>하이라이트를 볼 때 <span>확인할 세 가지</span></h2><ol class="article-steps"><li><span>01</span><div><p>동료가 공을 플레이하거나 터치한 정확한 순간은 언제인가?</p></div></li><li><span>02</span><div><p>그때 공격수와 공, 끝에서 두 번째 상대 선수의 위치 관계는 어떠했는가?</p></div></li><li><span>03</span><div><p>공격수가 공을 플레이하거나 상대의 플레이를 방해하는 등 반칙에 해당하는 방식으로 관여했는가?</p></div></li></ol><p>경기를 보며 이 세 질문을 떠올리면 '왜 골이 취소됐지?'라는 궁금증을 더 구체적으로 이해할 수 있습니다. 자세한 규칙은 ZERO ELEVEN의 규칙 설명 페이지에서도 확인할 수 있도록 연결할 예정입니다. <a href="/rules">축구 규칙 설명 페이지 바로가기 →</a></p></section>
    <section id="article-faq"><span class="article-section-index">05 / QUICK FAQ</span><h2>자주 묻는 질문(FAQ)</h2><div class="article-faq"><div class="faq-list"><details class="faq-item" open><summary>Q. 수비수보다 앞에 서 있기만 해도 반칙인가요?<span class="faq-plus" aria-hidden="true">+</span></summary><div class="faq-answer">아니요. 위치 조건을 충족하더라도 규칙상 플레이 관여가 없다면 자동으로 반칙이 되지 않습니다.</div></details><details class="faq-item"><summary>Q. 공을 직접 만지지 않았으면 오프사이드 반칙이 아닌가요?<span class="faq-plus" aria-hidden="true">+</span></summary><div class="faq-answer">반드시 그렇지는 않습니다. 상대의 시야나 공에 도전할 기회 등을 방해하는 경우처럼, 직접 공을 터치하지 않아도 반칙이 될 수 있습니다.</div></details><details class="faq-item"><summary>Q. VAR이 골을 취소하나요?<span class="faq-plus" aria-hidden="true">+</span></summary><div class="faq-answer">VAR은 주심의 결정을 돕고, 최종 판정은 주심이 내립니다.</div></details></div></div></section>
    <div class="article-summary"><span>THE FINAL TAKEAWAY</span><h2>오프사이드 =<br/><em>동료의 플레이 순간 + 위치 + 이후 관여.</em></h2><p>오프사이드는 위치만의 문제가 아니라 <strong>동료의 플레이 순간 + 위치 + 이후 관여</strong>를 함께 보는 규칙입니다. 골이 들어간 뒤 판정이 바뀌더라도 이 순서대로 보면 장면을 이해하기 쉬워집니다.</p></div>
    <section class="article-sources"><h2>공식 출처</h2><p>아래 출처는 IFAB 경기규칙의 원문입니다. 실제 경기 판정은 해당 장면의 조건을 구체적으로 확인해야 합니다.</p><ul><li><a href="${OFFSIDE_URL}" target="_blank" rel="noopener noreferrer">IFAB, Law 11 — Offside ↗</a></li><li><a href="${VAR_URL}" target="_blank" rel="noopener noreferrer">IFAB, Video Assistant Referee (VAR) Protocol ↗</a></li></ul><p class="sources-note">원문 기준 확인일: 2026.10.23 · 이미지 2점: ZERO ELEVEN 자체 제작 · 실제 대회·심판 판정과 무관한 학습용 사례</p></section>
    </div>
    <section class="article-cta"><div class="container-narrow"><div class="article-cta-inner"><span>YOU KNOW THE RULES. NOW MAKE THE CALL.</span><h2>이제 당신이 심판!<br/><em>직접 판정해 볼 차례</em></h2><p>오프사이드의 뜻을 알아봤다면, 이번에는 가상 경기 장면을 보고 직접 판단해 보세요. 정답을 맞히지 못해도 판정 이유를 확인할 수 있습니다.</p><a href="/review" class="button button-yellow" data-event="blog_to_game_click" data-location="blog_end" data-text="이제 당신이 심판! GOAL / NO GOAL 판정하러 가기">이제 당신이 심판! GOAL / NO GOAL 판정하러 가기 <span>→</span></a></div></div></section>
   </article></main>${footer()}`;
}
function about() {
 return `${header('about')}<main id="main">${pageHero('00','THIS IS ZERO ELEVEN','스코어는 그대로.<br/><em>보는 눈은 달라진다.</em>','한 장면을 더 오래 보게 만드는 축구 관전 가이드. 우리는 골 뒤에 숨은 판정의 이유를 이야기합니다.','page-hero-black')}
 <section class="about-statement"><div class="container-wide"><span>WHY WE EXIST / BRAND STORY</span><h2>경기는 <em>90분.</em><br/>궁금증은 <em>1초.</em></h2><div class="about-statement-row"><p>하이라이트를 보다가 누구나 한 번쯤 생각할 수 있어요. “분명 골인데, 왜 취소됐지?” ZERO ELEVEN은 바로 그 질문에서 출발한 학습용 브랜드 기획입니다.</p><p>규칙집을 처음부터 외우지 않아도 괜찮아요. 짧은 설명과 전술 보드, 직접 판정하는 게임을 통해 중요한 기준을 쉽고 정확하게 익힐 수 있도록 설계했어요.</p></div></div></section>
 <section class="about-values"><div class="container-wide">${sectionLead('01','OUR METHOD','보는 눈이 달라지는<br/><em>3개의 과정.</em>')}${actionCards()}</div></section>
 <section class="about-name"><div class="container-wide"><div>${eyebrow('02','THE NAME')}<h2>ZERO.<br/><span>ELEVEN.</span></h2></div><div><p><strong>ZERO</strong>는 골처럼 보였지만 인정되지 않은 순간을, <strong>ELEVEN</strong>은 경기장을 누비는 한 팀의 선수 11명을 의미합니다.</p><p>이 이름은 실제 경기 결과나 공인 캠페인을 뜻하지 않아요. 골 취소 이후에도 점수가 변하지 않는 가상 장면에서 출발한 ZERO ELEVEN만의 학습용 콘셉트입니다.</p><a href="/rules" class="button button-yellow">규칙 배우러 가기 <span>↗</span></a></div></div></section>
 <section class="about-disclaimer"><div class="container-wide"><span>ABOUT THIS PROJECT</span><h2>공식 대회 페이지가 아닙니다.</h2><p>${disclaimer} 실제 경기를 사칭하지 않고, 규칙 근거는 IFAB 공식 사이트와 연결합니다.</p></div></section>
 </main>${footer()}`;
}
function rules() {
 return `${header('rules')}<main id="main">${pageHero('01','THE RULE BOOK','축구 규칙,<br/><em>알고 보면 쉽다.</em>','오프사이드부터 비디오 판독까지. 경기장 위에서 벌어지는 중요한 판정 기준을 쉽고 정확하게 정리했어요.','page-hero-black')}
 <section class="rules-page-body"><div class="container-wide">${sectionLead('01','THREE RULES TO KNOW','판정의 순간을 읽는<br/><em>기본 규칙 3가지.</em>')}${rulesTabs()}</div></section>
 <section class="rules-explainer"><div class="container-wide"><div>${eyebrow('02','START WITH OFFSIDE')}<h2>오프사이드는<br/><em>언제 반칙일까?</em></h2><p>많이 헷갈리는 오프사이드는 세 가지를 연결하면 이해하기 쉬워요. 동료가 공을 플레이한 순간 → 당시 위치 → 이후 관여 여부.</p><a href="/blog/offside-goal" class="button button-black">블로그에서 더 자세히 <span>↗</span></a></div><img src="/assets/offside-cover.svg" alt="패스 순간과 오프사이드 기준선을 나타내는 ZERO ELEVEN 자체 제작 축구장 도식" loading="lazy" width="1200" height="740" /></div></section>
 <section class="rules-official"><div class="container-wide"><span>THE SOURCE MATTERS.</span><h2>확실한 규칙은<br/>공식 문서에서.</h2><div class="official-cards"><a href="${OFFSIDE_URL}" target="_blank" rel="noopener noreferrer"><span>LAW 11</span><strong>OFFSIDE</strong><span>원문 보기 ↗</span></a><a href="${VAR_URL}" target="_blank" rel="noopener noreferrer"><span>PROTOCOL</span><strong>VAR</strong><span>원문 보기 ↗</span></a><a href="${FOUL_URL}" target="_blank" rel="noopener noreferrer"><span>LAW 12</span><strong>FOULS</strong><span>원문 보기 ↗</span></a></div></div></section>
 <section class="mid-cta"><div class="container-wide"><h2>이제 <em>판정해 볼까?</em></h2><a href="/review" class="button button-yellow">GOAL / NO GOAL 도전하기 <span>↗</span></a></div></section>
 </main>${footer()}`;
}
function review() {
 return `${header('review')}<main id="main">${pageHero('02','GOAL CHECKER','당신이 심판이라면,<br/><em>GOAL or NO GOAL?</em>','총 3가지 가상 장면. 규칙을 확인했다면 이제 직접 판정해 볼 차례. 정답 뒤에는 공식 규칙에 따른 해설이 나옵니다.','page-hero-red')}
  <section class="review-main"><div class="container-wide"><div class="review-header"><div>${eyebrow('01','THE DECISION ROOM')}<h2>MAKE THE CALL<span>.</span></h2></div><p>정답은 선택한 뒤에 나타나. <br/>한 문제씩 천천히 판단해 봐.</p></div>${renderQuiz('full')}<div class="review-bottom"><span>ALL CASES ARE FICTIONAL. / FOR LEARNING ONLY.</span><a href="${OFFSIDE_URL}" target="_blank" rel="noopener noreferrer">IFAB 경기규칙 제11조 확인 ↗</a></div></div></section>
 <section class="review-more"><div class="container-wide"><div>${eyebrow('02','KNOW THE WHY')}<h2>답보다 중요한 건<br/><em>판정의 이유.</em></h2><p>왜 그 장면이 오프사이드인지, 왜 골이 인정되는지 더 자세히 알고 싶다면.</p></div><a href="/blog/offside-goal" class="button button-black">오프사이드 글 읽기 <span>↗</span></a></div></section>
 </main>${footer()}`;
}
function highlights() {
 return `${header('highlights')}<main id="main">${pageHero('03','WATCH DIFFERENTLY','다르게 보면,<br/><em>다른 장면이 보인다.</em>','실제 경기 영상은 FIFA 공식 채널에서 확인하세요. 아래 카드는 하이라이트를 보면서 찾아볼 관전 포인트를 소개하는 ZERO ELEVEN의 자체 제작 이미지입니다.','page-hero-yellow')}
 <section class="highlight-page-list"><div class="container-wide">${sectionLead('01','WATCH LIST','하이라이트를 읽는<br/><em>3가지 관전 포인트.</em>')}
 <div class="watch-card-list"><article class="watch-card"><div class="watch-image"><img src="/assets/thumbnail-match.svg" alt="공이 골문을 향해 이동하는 장면을 추상화한 ZERO ELEVEN 자체 제작 경기장 일러스트" width="900" height="540" loading="lazy"/><span>WATCH POINT 01</span></div><div><span class="watch-kicker">GOAL / NO GOAL</span><h3>득점 직전,<br/>패스의 순간을 보자.</h3><p>골만 보는 대신 패스가 이뤄지는 순간과 공격수의 위치를 함께 확인해 봐. FIFA 공식 채널에서 실제 하이라이트를 볼 수 있어.</p>${outbound('FIFA 공식 영상 모아보기', 'watch-link', 'highlights', FIFA_VIDEOS_URL)}</div></article>
 <article class="watch-card"><div class="watch-image"><img src="/assets/thumbnail-var.svg" alt="모니터에 VAR이라는 글자가 표시된 ZERO ELEVEN 자체 제작 비디오 판독 이미지" width="900" height="540" loading="lazy"/><span>WATCH POINT 02</span></div><div><span class="watch-kicker">VIDEO REVIEW</span><h3>리플레이가 나올 때,<br/>무엇을 확인할까?</h3><p>비디오 판독 장면에서는 골 인정 여부와 반칙이 있었던 순간을 다시 떠올려 봐. VAR의 역할은 IFAB 공식 규정으로 이해할 수 있어.</p><a href="${VAR_URL}" target="_blank" rel="noopener noreferrer" class="watch-link">IFAB VAR 규정 확인하기 <span>↗</span></a></div></article>
 <article class="watch-card"><div class="watch-image"><img src="/assets/thumbnail-rules.svg" alt="노란 카드와 빨간 카드가 겹쳐 있는 ZERO ELEVEN 자체 제작 카드 이미지" width="900" height="540" loading="lazy"/><span>WATCH POINT 03</span></div><div><span class="watch-kicker">READ THE RULES</span><h3>판정 이유를 알면,<br/>경기가 더 재밌어진다.</h3><p>영상 시청 전 오프사이드·접촉 반칙·VAR 규정을 간단히 익히고, 실제 장면과 연결해 보자.</p><a href="/rules" class="watch-link">규칙 배우러 가기 <span>↗</span></a></div></article></div>
 <p class="highlight-disclaimer">※ 위 그림은 영상 썸네일이나 실제 경기 사진이 아닌 ZERO ELEVEN 자체 제작 그래픽입니다. 특정 경기 장면이나 공식 영상 제목을 사칭하지 않습니다.</p></div></section>
 ${finalYouTubeCta()}
 </main>${footer()}`;
}
function notFound() {
 return `${header('home')}<main id="main"><section class="not-found"><div class="container-wide"><p>404 / NOT FOUND</p><h1>이 페이지는<br/><em>오프사이드.</em></h1><p>찾는 페이지가 없어. 메인으로 돌아가서 다시 시작해 볼까?</p><a href="/" class="button button-yellow">메인으로 돌아가기 <span>↗</span></a></div></section></main>${footer()}`;
}

// Vercel serves index.html for every page, so its data-route is always '/'.
// Select the page from the requested URL instead of the shared HTML template.
const cleanPath = window.location.pathname.replace(/\/+$/, '') || '/';
const key = cleanPath === '/' ? 'home' : cleanPath === '/blog' ? 'blog' : cleanPath === '/blog/offside-goal' ? 'article' : cleanPath === '/rules' ? 'rules' : cleanPath === '/review' ? 'review' : cleanPath === '/about' ? 'about' : cleanPath === '/highlights' ? 'highlights' : '404';
const pages = { home, blog, article, rules, review, about, highlights, '404': notFound };
const app = document.querySelector('#app');
app.innerHTML = pages[key]();

document.querySelectorAll('[data-event]').forEach(el => {
  el.addEventListener('click', () => {
    const name = el.dataset.event;
    const info = { page_path: cleanPath, destination_url: el.getAttribute('href') || '' };
    if (name === 'cta_click') Object.assign(info, { cta_location: el.dataset.location || 'unknown', cta_text: el.dataset.text || el.textContent.trim() });
    if (name === 'hero_step_click') Object.assign(info, { step_name: el.dataset.step || 'unknown', card_position: el.dataset.step === 'know' ? 1 : 2 });
    if (name === 'blog_to_game_click') Object.assign(info, { cta_location: 'blog_end', cta_text: el.dataset.text || el.textContent.trim() });
    if (name === 'blog_card_click') Object.assign(info, { article_path: '/blog/offside-goal' });
    track(name, info);
  });
});

const menuButton = document.getElementById('menuButton');
if (menuButton) {
  menuButton.addEventListener('click', () => {
    const nav = document.getElementById('mobileMenu');
    nav.hidden = !nav.hidden;
    menuButton.setAttribute('aria-expanded', String(!nav.hidden));
    menuButton.setAttribute('aria-label', nav.hidden ? '메뉴 열기' : '메뉴 닫기');
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') { document.getElementById('mobileMenu').hidden = true; menuButton.setAttribute('aria-expanded', 'false'); }
  });
}

document.querySelectorAll('[data-rules-tabs]').forEach(wrapper => {
  wrapper.addEventListener('click', ev => {
    const tab = ev.target.closest('[data-tab]');
    if (!tab) return;
    const category = tab.dataset.tab;
    wrapper.querySelectorAll('[data-tab]').forEach(t => {
      const active = t.dataset.tab === category;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });
    wrapper.querySelectorAll('[data-panel]').forEach(p => {
      const active = p.dataset.panel === category;
      p.hidden = !active;
      p.classList.toggle('active', active);
    });
    track('rule_tab_click', { rule_type: category, page_path: cleanPath });
  });
});

document.querySelectorAll('.quiz-stage').forEach(stage => {
  stage.addEventListener('click', ev => {
    const answer = ev.target.closest('[data-answer]');
    if (answer) {
      const mode = stage.dataset.mode;
      const index = Number(stage.dataset.index);
      const q = mode === 'mini' ? scenarios[1] : scenarios[index];
      const chosen = answer.dataset.answer;
      const correct = q.answer === chosen;
      stage.querySelectorAll('[data-answer]').forEach(btn => {
        btn.disabled = true;
        btn.classList.toggle('option-chosen', btn.dataset.answer === chosen);
        btn.classList.toggle('option-correct', btn.dataset.answer === q.answer);
      });
      const result = stage.querySelector('.quiz-result');
      result.hidden = false;
      const isLast = index === scenarios.length - 1;
      result.innerHTML = `<div class="result-badge">${correct ? '✓ CORRECT CALL' : '↗ GOOD TRY / THE RULE IS...'}</div><strong>${q.answer === 'GOAL' ? 'GOAL — 득점 인정!' : 'NO GOAL — 득점 무효!'}</strong><p>${q.reason}</p><a class="result-source" href="${q.source}" target="_blank" rel="noopener noreferrer">IFAB 공식 규칙 확인하기 ↗</a><div class="result-actions">${mode === 'full' ? `<button type="button" class="button button-yellow" data-next>${isLast ? '다시 도전하기' : '다음 상황 판정하기'} <span>↗</span></button>` : `<a href="/review" class="button button-yellow">판정 게임 더 하기 <span>↗</span></a>`}${outbound('FIFA 공식 영상 보기', 'button button-outline-white', 'post_review')}</div>`;
      result.querySelectorAll('[data-event]').forEach(el => {
        el.addEventListener('click', () => track('cta_click', { page_path: cleanPath, cta_location: el.dataset.location, cta_text: el.dataset.text, destination_url: el.href }));
      });
      track('decision_submit', { question_id: q.id, selected_answer: chosen, is_correct: correct, page_path: cleanPath });
      track('decision_result_view', { question_id: q.id, result_type: correct ? 'correct' : 'incorrect', page_path: cleanPath });
      result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
      return;
    }
    const next = ev.target.closest('[data-next]');
    if (next) {
      const current = Number(stage.dataset.index);
      stage.dataset.index = String((current + 1) % scenarios.length);
      stage.innerHTML = quizLayout('full', Number(stage.dataset.index));
      stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Canonical is also updated at runtime, e.g. when previewing or uploading a static build.
const canonical = document.querySelector('link[rel="canonical"]');
if (canonical) canonical.href = window.location.origin + cleanPath;
