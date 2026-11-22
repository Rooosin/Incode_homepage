/* =====================================================================
   INCODE Lab site — rendering code.
   내용은 data/ 폴더에서 수정하세요. 이 파일은 디자인/동작을 바꿀 때만 수정합니다.
   ===================================================================== */
(function () {
"use strict";

/* ---------- data check: a broken data file shows a clear message instead of a blank page ---------- */
const FILES = [["SITE", "data/site.js"], ["RESEARCH", "data/research.js"], ["PEOPLE", "data/people.js"], ["PUBLICATIONS", "data/publications.js"], ["NEWS", "data/news.js"], ["ALBUMS", "data/photos.js"]];
const pending = FILES.filter(([v]) => !window[v]).map(([, f]) => `${f} 파일을 읽지 못했어요. 쉼표·따옴표·괄호가 빠졌는지 확인하세요.`);
const SITE = window.SITE || { hiring: { show: false }, lectures: [], coverScenes: Object.keys(SCENES) };
const RESEARCH = window.RESEARCH || [];
const PEOPLE = window.PEOPLE || { PI: null, MEMBERS: [], ALUMNI: [] };
const PUBS = window.PUBLICATIONS || { GROUP_MEMBERS: [], JOURNALS: [], IN_PREPARATION: [], EARLY: [] };
const NEWS = window.NEWS || [];
const ALBUMS = window.ALBUMS || [];
const KIND = { pub: "Publication", cover: "Journal cover", grant: "Research grant", award: "Award", conf: "Conference", member: "New member", alumni: "Alumni", media: "Media", lab: "Lab" };
const problems = [];
NEWS.forEach((n, i) => { if (!KIND[n.type]) pending.push(`data/news.js ${i + 1}번째 소식(${n.date}): type "${n.type}" 은 쓸 수 없는 값이에요.`); });
const devMode = location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname) || /[?&]check\b/.test(location.search);
function report(msg) {
  problems.push(msg); console.warn("[INCODE site]", msg);
  if (!devMode) return;
  let box = document.getElementById("dataProblems");
  if (!box) { box = document.createElement("div"); box.id = "dataProblems"; box.style.cssText = "position:fixed;left:12px;bottom:12px;z-index:99;max-width:min(560px,calc(100% - 24px));max-height:40vh;overflow:auto;background:#fff3f0;color:#7a1010;border:2px solid #c0392b;border-radius:10px;padding:12px 14px;font:13px/1.5 system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25)"; box.innerHTML = "<b>데이터 확인 필요</b><ul style='margin:6px 0 0;padding-left:18px'></ul>"; document.body.appendChild(box); }
  box.querySelector("ul").insertAdjacentHTML("beforeend", `<li>${esc(msg)}</li>`);
}
document.addEventListener("error", e => { if (e.target.tagName === "IMG" && e.target.id !== "lbImg") report(`이미지를 찾을 수 없어요: ${e.target.getAttribute("src")}`); }, true);

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
function esc(s) { return String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
/* text with [label](url) links -> safe HTML; each line becomes a paragraph when `paras` is true */
function md(text, paras = false) {
  const one = t => esc(t).replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (m, l, u) => `<a href="${u.replace(/&amp;/g, "&").replace(/"/g, "%22")}" target="_blank" rel="noopener">${l}</a>`);
  const lines = String(text ?? "").split("\n").filter(Boolean);
  return paras ? lines.map(l => `<p>${one(l)}</p>`).join("") : lines.map(one).join("<br>");
}
const plain = t => String(t ?? "").replace(/\[([^\]]+)\]\([^)]+\)/g, "").replace(/\s+/g, " ").trim();
const IMG = (path, alt = "") => path ? `<img src="img/${esc(path)}" alt="${esc(alt)}" loading="lazy" decoding="async">` : "";
function fmtAuthors(a) {
  let s = esc(a).replace(/Jihwan Song/g, "<b>Jihwan Song</b>");
  (PUBS.GROUP_MEMBERS || []).forEach(m => { s = s.replace(new RegExp(`(^|, |and )(${m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?=[†*,]|$| and)`, "g"), "$1<u>$2</u>"); });
  return s;
}
const kindPill = k => `<span class="pill ${k === "pub" || k === "cover" ? "crimson" : k === "conf" || k === "member" || k === "lab" ? "grey" : ""}">${KIND[k] || esc(k)}</span>`;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
function jump(id) { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); }
function subnav(el, items) {
  el.innerHTML = items.map(([id, l]) => `<button type="button" data-j="${id}">${esc(l)}</button>`).join("");
  el.onclick = e => { const b = e.target.closest("button"); if (b) jump(b.dataset.j); };
}
function chipGroup(el, items, onPick) {
  el.innerHTML = items.map(([v, l, c], i) => `<button type="button" data-v="${esc(v)}" aria-pressed="${i === 0}">${esc(l)}${c != null ? `<span class="c">${c}</span>` : ""}</button>`).join("");
  el.onclick = e => { const b = e.target.closest("button"); if (!b) return; el.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b)); onPick(b.dataset.v); };
}
function safe(name, fn) { try { fn(); } catch (err) { report(`${name} 영역을 그리는 중 오류가 났어요: ${err.message}`); console.error(err); } }
const thumb = (path, cap, extra = "") => `<button type="button" data-lb="${esc(path)}" data-cap="${esc(cap)}" ${extra}>${IMG(path, cap)}</button>`;

/* ---------- router & header ---------- */
const PAGES = ["home", "research", "team", "publications", "news", "photo", "lectures"];
let hero = null;
function route() {
  const h = location.hash.slice(1), page = PAGES.includes(h) ? h : "home";
  document.querySelectorAll(".page").forEach(p => p.hidden = p.dataset.page !== page);
  document.querySelectorAll(".nav a").forEach(a => a.getAttribute("href") === "#" + page ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0); onScroll();
  if (hero) hero.setActive(page === "home");
}
function onScroll() { $("#top").classList.toggle("solid", scrollY > 40 || $("#nav").classList.contains("open")); }
addEventListener("scroll", onScroll, { passive: true });
$("#menuBtn").onclick = () => { const o = $("#nav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", o); onScroll(); };

/* ---------- lightbox ---------- */
const lb = { list: [], i: 0 };
function showLB() {
  const it = lb.list[lb.i]; if (!it) return;
  $("#lbImg").src = "img/" + it.p; $("#lbImg").alt = it.c || "";
  $("#lbCap").textContent = it.c || ""; $("#lbCnt").textContent = `${lb.i + 1} / ${lb.list.length}`;
  $("#lbPrev").hidden = $("#lbNext").hidden = lb.list.length < 2;
}
function closeLB() { $("#lb").hidden = true; document.body.style.overflow = ""; }
$("#lbClose").onclick = closeLB;
$("#lbPrev").onclick = () => { lb.i = (lb.i - 1 + lb.list.length) % lb.list.length; showLB(); };
$("#lbNext").onclick = () => { lb.i = (lb.i + 1) % lb.list.length; showLB(); };
$("#lb").addEventListener("click", e => { if (e.target.id === "lb" || e.target.classList.contains("stage")) closeLB(); });
document.addEventListener("keydown", e => {
  if ($("#lb").hidden) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowLeft") $("#lbPrev").click();
  if (e.key === "ArrowRight") $("#lbNext").click();
});
document.addEventListener("click", e => {
  const b = e.target.closest("[data-lb]"); if (!b) return;
  const items = [...b.closest("[data-gallery]").querySelectorAll("[data-lb]")];
  lb.list = items.map(x => ({ p: x.dataset.lb, c: x.dataset.cap })); lb.i = items.indexOf(b);
  showLB(); $("#lb").hidden = false; document.body.style.overflow = "hidden"; $("#lbClose").focus();
});
document.addEventListener("click", e => {
  const a = e.target.closest("[data-thrust]"); if (!a) return;
  e.preventDefault(); location.hash = "research"; setTimeout(() => jump("th-" + a.dataset.thrust), 40);
});

/* ---------- HOME ---------- */
safe("Home", () => {
  $("#hxResearch").innerHTML = RESEARCH.map((t, i) => `
    <a class="hx-card" href="#research" data-thrust="${esc(t.id)}" data-rv style="--d:${i * 0.12}s">
      <span class="hx-fig">${IMG(t.image, "")}</span>
      <span class="hx-no num">0${i + 1}</span><b>${esc(t.homeTitle)}</b><span class="hx-sub">${esc(t.homeTags)}</span></a>`).join("");
  const h = SITE.hiring || {};
  $("#hiring").innerHTML = h.show ? `<div class="notice ko"><b>${esc(h.title)}</b><p>${md(h.text)}</p></div>` : "";
  /* Join our journey card: opened by the button on the first screen; closes with ✕, Esc or a click outside */
  const dlg = $("#joinDlg");
  $("#joinOpen").onclick = () => dlg.showModal();
  $("#joinClose").onclick = () => dlg.close();
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  /* Group News: the most recent SITE.homeNewsCount items as cards (the News page keeps the full record) */
  $("#homeNews").innerHTML = NEWS.slice(0, SITE.homeNewsCount || 10).map((n, i) => `
    <article class="hx-ncard" data-rv style="--d:${(i % 2) * 0.1}s">
      <span class="hx-fig">${(n.images || [])[0] ? IMG(n.images[0], "") : `<span class="hx-blank">${KIND[n.type] || ""}</span>`}</span>
      <b>${esc(n.title)}</b><div class="hx-sub">${md(n.text, true)}</div>
      <span class="hx-meta num">${esc(n.date)} · ${KIND[n.type] || ""}</span></article>`).join("");
  const pics = ALBUMS.flatMap(a => (a.events || []).flatMap(e => e.images || [])).sort(() => Math.random() - 0.5).slice(0, 8);
  $("#hxStrip").innerHTML = pics.map(p => IMG(p, "")).join("");
  $("#hxWall").onclick = () => setTimeout(() => $('#albumTabs [data-v="wall"]')?.click(), 60);
  /* reveal on scroll; the class that hides things is added here, so content stays visible without JS */
  const els = document.querySelectorAll('[data-page="home"] [data-rv]');
  if (reduceMotion || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -10% 0px" });
  els.forEach(el => { el.classList.add("rv"); io.observe(el); });
});

/* ---------- RESEARCH ---------- */
safe("Research", () => {
  subnav($("#thrustNav"), RESEARCH.map(t => ["th-" + t.id, t.title]));
  $("#thrusts").innerHTML = RESEARCH.map((t, ti) => {
    const no = String(ti + 1).padStart(2, "0");
    return `<section class="thrust" id="th-${esc(t.id)}">
      <div class="th-hero">${IMG(t.image, "")}
        <div class="wrap"><span class="th-no num" aria-hidden="true">${no}</span>
          <p class="eyebrow on-dark">Research thrust ${no}</p><h2>${esc(t.title)}</h2><p class="th-lead">${esc(t.homeTitle)}</p>
          <p class="th-tags">${esc(t.homeTags).split(" · ").map(x => `<span>${x}</span>`).join("")}</p></div>
      </div>
      <div class="wrap">
        <div class="th-intro">
          <div class="txt">${(t.overview || []).map(p => `<p>${md(p)}</p>`).join("")}</div>
          <ol class="th-points">${(t.bullets || []).map((l, i) => `<li><span class="n num">${String(i + 1).padStart(2, "0")}</span><span>${md(l)}</span></li>`).join("")}</ol>
          ${(t.closing || []).length ? `<div class="th-closing">${t.closing.map(p => `<p>${md(p)}</p>`).join("")}</div>` : ""}
        </div>
        <div class="projects">${(t.projects || []).map((p, i) => `
          <article class="proj">
            <div class="fig" data-gallery>${thumb(p.image, p.title, 'class="zoom"')}</div>
            <div class="body">
              <span class="k num">${ti + 1}.${i + 1} <i>Project</i></span>
              <h3>${esc(p.title)}</h3>
              <div class="txt">${(p.text || []).map(x => `<p>${md(x)}</p>`).join("")}</div>
              ${(p.refs || []).length ? `<div class="refs">${p.refs.map(r => `<div class="ref"><span class="pill">${esc(r.label)}</span>${r.link ? `<a href="${esc(r.link)}" target="_blank" rel="noopener">${esc(r.title)} ↗</a>` : `<b>${esc(r.title)}</b>`}<i>${esc(r.venue)}</i></div>`).join("")}</div>` : ""}
            </div>
          </article>`).join("")}
        </div>
      </div>
    </section>`;
  }).join("");
});

/* ---------- TEAM ---------- */
safe("Team", () => {
  subnav($("#teamNav"), [["t-pi", "Principal Investigator"], ["t-researchers", "Researchers"], ["t-alumni", "Alumni"]]);
  const pi = PEOPLE.PI;
  const tl = list => `<ul class="tl">${(list || []).map(x => `<li${x.current ? ' class="now"' : ""}><span class="when">${esc(x.when)}</span><span class="what">${esc(x.what)}</span><span class="sub">${esc(x.where).replace(/\n/g, "<br>")}</span></li>`).join("")}</ul>`;
  if (pi) $("#pi").innerHTML = `
    <div class="photo">${IMG(pi.photo, pi.name)}</div>
    <div>
      <p class="eyebrow">Principal Investigator</p>
      <h2>${esc(pi.name)}</h2>
      <p class="role">${esc(pi.role)}</p>
      <div class="contact-rows">
        <div><span>Office</span><span class="num">${esc(pi.phone)}</span></div>
        <div><span>E-mail</span><span class="mail">${esc(pi.email)}</span></div>
        <div><span>Address</span><span>${esc(pi.address)}</span></div>
      </div>
      <div class="cv"><div><h3>Professional experiences</h3>${tl(pi.experience)}</div><div><h3>Educations</h3>${tl(pi.education)}</div></div>
    </div>`;
  const pubRef = no => { const p = PUBS.JOURNALS.find(x => x.no === no); return p ? (p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)) + ` <span style="color:var(--muted)">· ${esc(p.journal)}${p.date ? ", " + esc(p.date) : ""}</span>` : ""; };
  /* groups keep their headings; inside each group, wide cards (photo left, details right) */
  $("#people").innerHTML = (PEOPLE.MEMBERS || []).map(g => `
    <h3 class="group-title">${esc(g.group)}</h3>
    <div class="people">${(g.people || []).map(p => `
      <article class="person">
        <div class="av">${IMG(p.photo, p.name)}</div>
        <div class="in">
          <span class="nm">${esc(p.name)}</span><span class="pill crimson">${esc(p.position)}</span>
          ${p.email ? `<span class="em">${esc(p.email)}</span>` : ""}
          <dl>
            ${(p.interests || []).length ? `<div><dt>Research interests</dt>${p.interests.map(r => `<dd>${esc(r)}</dd>`).join("")}</div>` : ""}
            ${(p.education || []).length ? `<div><dt>Education</dt>${p.education.map(r => `<dd>${esc(r)}</dd>`).join("")}</div>` : ""}
          </dl>
          ${(p.publications || []).length ? `<details class="pubs"><summary>Publications &amp; honors (${p.publications.length})</summary><ol>${p.publications.map(x => `<li>${typeof x === "number" ? pubRef(x) : md(x)}</li>`).join("")}</ol></details>` : ""}
        </div>
      </article>`).join("")}</div>`).join("");
  $("#alumni").innerHTML = (PEOPLE.ALUMNI || []).map(a => `
    <article class="alum">
      <span class="nm">${esc(a.name)}</span>
      <span class="pos${a.position ? "" : " none"}">${a.position ? esc(a.position) : "Current position not listed"}</span>
      <div class="edu">${(a.education || []).map(x => `<span>${esc(x)}</span>`).join("")}</div>
      ${(a.publications || []).length ? `<details><summary>Publications (${a.publications.length})</summary><ol>${a.publications.map(p => `<li>${md(p)}</li>`).join("")}</ol></details>` : ""}
    </article>`).join("");
});

/* ---------- PUBLICATIONS ---------- */
safe("Publications", () => {
  subnav($("#pubNav"), [["p-prep", "In preparation"], ["p-journals", "International journals"]]);
  $("#prepList").innerHTML = (PUBS.IN_PREPARATION || []).map((p, i) => `<li><span class="n">P${i + 1}</span><div><div class="t">${esc(p.title)}</div><div class="a">${fmtAuthors(p.authors)}</div></div></li>`).join("");
  /* 2009–2017 papers are listed as one more year group after the dated journals */
  const early = (PUBS.EARLY || []).map((p, i, a) => ({ no: a.length - i, year: "2009 – 2017", title: p.title, info: p.info }));
  const J = (PUBS.JOURNALS || []).concat(early);
  let yearSel = "All", query = "";
  chipGroup($("#years"), [["All", "All"], ...[...new Set(J.map(p => String(p.year)))].map(y => [y, y])], v => { yearSel = v; render(); });
  $("#pubSearch").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); render(); });
  function render() {
    const list = J.filter(p => (yearSel === "All" || String(p.year) === yearSel) && (!query || `${p.title} ${p.authors || ""} ${p.journal || ""} ${p.info || ""}`.toLowerCase().includes(query)));
    if (!list.length) { $("#pubList").innerHTML = `<p class="empty">No papers match “${esc(query)}”. Try an author surname or a journal name.</p>`; return; }
    const count = y => list.filter(p => p.year === y).length;
    let html = "", cur = null;
    list.forEach(p => {
      if (p.year !== cur) { cur = p.year; html += `<div class="ylabel">${esc(p.year)}<small>${count(p.year)} paper${count(p.year) > 1 ? "s" : ""}</small></div>`; }
      if (p.info) { html += `<div class="pub"><span class="n num">${esc(p.no)}</span><div><div class="t">${esc(p.title)}</div><div class="a">${esc(p.info)}</div></div></div>`; return; }
      const review = p.journal === "Under review";
      html += `<div class="pub"><span class="n num">${esc(p.no)}</span><div>
        <div class="t">${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</div>
        <div class="a">${fmtAuthors(p.authors)}</div>
        <div class="v">${review ? `<span class="pill grey">Under review</span>` : `<i>${esc(p.journal)}</i><span class="vol num">${esc([p.volume, p.date].filter(Boolean).join(" · "))}</span>${p.impact ? `<span class="pill">${esc(p.impact)}</span>` : ""}`}${p.note ? `<span class="pill crimson">${esc(p.note)}</span>` : ""}</div>
      </div></div>`;
    });
    $("#pubList").innerHTML = html;
  }
  render();
});

/* ---------- NEWS ---------- */
safe("News", () => {
  let kindSel = "all";
  const kinds = Object.keys(KIND).filter(k => NEWS.some(n => n.type === k));
  chipGroup($("#newsKinds"), [["all", "All", NEWS.length], ...kinds.map(k => [k, KIND[k], NEWS.filter(n => n.type === k).length])], v => { kindSel = v; render(); });
  function render() {
    let html = "", y = null;
    NEWS.filter(n => kindSel === "all" || n.type === kindSel).forEach(n => {
      const yr = String(n.date).slice(0, 4);
      if (yr !== y) { y = yr; html += `<div class="nyear">${esc(y)}</div>`; }
      const imgs = n.images || [];
      const cap = esc(n.date + " · " + n.title);
      html += `<article class="nitem">
        <div class="meta"><span class="num">${esc(n.date)}</span>${kindPill(n.type)}</div>
        <h3>${esc(n.title)}</h3><div class="bd">${md(n.text, true)}</div>
        ${imgs.length ? `<div class="photo-link" data-gallery><button type="button" class="photo-btn" data-lb="${esc(imgs[0])}" data-cap="${cap}"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v7.6l4.3-4.3a1 1 0 0 1 1.4 0l4.3 4.3 1.8-1.8a1 1 0 0 1 1.4 0L20 15.6V7H4zm11 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg>${imgs.length > 1 ? `View photos (${imgs.length})` : "View photo"}</button>${imgs.slice(1).map(p => `<span hidden data-lb="${esc(p)}" data-cap="${cap}"></span>`).join("")}</div>` : ""}
      </article>`;
    });
    $("#newsList").innerHTML = html;
  }
  render();
});

/* ---------- PHOTO ---------- */
safe("Photo", () => {
  /* event kind: an optional `tag` in data/photos.js wins, otherwise guessed from the title */
  const KINDS = { conf: "Conference", milestone: "Milestone", celebrate: "Celebration", life: "Lab life" };
  const kindOf = ev => KINDS[ev.tag] ? ev.tag : /meeting|conference|symposium|학회/i.test(ev.title) ? "conf" : /graduat|farewell|welcome|opening|졸업|환영|송별/i.test(ev.title) ? "milestone" : /birthday|teacher|christmas|생일|스승/i.test(ev.title) ? "celebrate" : "life";
  const allEvents = ALBUMS.flatMap(a => a.events || []);
  let sel = "0";
  chipGroup($("#albumTabs"), ALBUMS.map((a, i) => [i, a.label]).concat([["wall", "Photo wall"]]), v => {
    sel = v; render();
    if (v === "wall") $("#album").closest(".sec").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });
  addEventListener("resize", () => { if (sel === "wall") fitWall(); });
  function render() {
    $("#album").closest(".sec").classList.toggle("dark-wall", sel === "wall");
    if (sel === "wall") return renderWall();
    const a = ALBUMS[+sel]; if (!a) return;
    const evs = (a.events || []).map(ev => ({ ...ev, k: kindOf(ev) }));
    $("#album").innerHTML = `
      <div class="album-head"><span class="album-year num" aria-hidden="true">${esc(a.label)}</span></div>
      <div class="timeline">${evs.map(ev => {
        const d = String(ev.date), k = d.indexOf(".");
        return `<article class="ev">
          <div class="ev-meta"><span class="ev-tag" data-k="${ev.k}">${KINDS[ev.k]}</span>
            <p class="ev-date num"><b>${esc(k > 0 ? d.slice(k + 1) : d)}</b> ${esc(k > 0 ? d.slice(0, k) : "")}</p>
            <h3>${esc(ev.title)}</h3></div>
          <div class="gal">${(ev.images || []).map(p => `<span class="ph" style="flex:1.5 1 18rem;aspect-ratio:1.5">${IMG(p, ev.date + " · " + ev.title)}</span>`).join("")}</div>
        </article>`; }).join("")}</div>`;
    /* size each tile by its real aspect ratio once it loads (justified rows) */
    $("#album").querySelectorAll(".gal img").forEach(img => {
      const fit = () => { if (!img.naturalWidth) return; const r = img.naturalWidth / img.naturalHeight, b = img.parentElement;
        b.style.flex = `${r.toFixed(3)} 1 ${Math.round(r * 12)}rem`; b.style.aspectRatio = r.toFixed(3); };
      img.complete ? fit() : img.addEventListener("load", fit, { once: true });
    });
  }
  /* Photo wall ("Our journey"): all photos as one dim mosaic filling a single screen.
     Hovering (or tapping) a photo lights it up and the middle tells when it was. */
  function renderWall() {
    const shots = allEvents.flatMap(ev => (ev.images || []).map(p => ({ p, ev })));
    const years = shots.map(x => String(x.ev.date).slice(0, 4)).sort();
    /* random order on every visit */
    for (let i = shots.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shots[i], shots[j]] = [shots[j], shots[i]]; }
    $("#album").innerHTML = `
      <div class="jn-stage" id="jnStage"><div class="jn-grid" id="jnGrid"></div>
        <div class="jn-center"><p class="eyebrow on-dark">${years[0]} — ${years[years.length - 1]}</p><h2>Our journey</h2>
          <p class="jn-cap" id="jnCap" aria-live="off"></p></div></div>`;
    Promise.all(shots.map(x => new Promise(ok => { const im = new Image(); im.onload = () => { x.r = im.naturalWidth / im.naturalHeight; ok(); }; im.onerror = ok; im.src = "img/" + x.p; }))).then(() => { if (sel === "wall") fitWall(shots); });
    const cap = $("#jnCap"), idle = `<span>Hover over a photo</span>`;
    cap.innerHTML = idle;
    /* hover (or tap) a photo: it lights up and the middle shows when it was */
    const show = t => {
      $("#jnGrid").querySelectorAll(".lit").forEach(x => x.classList.remove("lit"));
      if (!t) { cap.innerHTML = idle; return; }
      t.classList.add("lit"); const x = wallShots[+t.dataset.i];
      cap.innerHTML = `<b class="num">${esc(x.ev.date)}</b>${esc(x.ev.title)}`;
    };
    const grid = $("#jnGrid");
    grid.onmouseover = e => { const t = e.target.closest(".jn-tile"); if (t && !t.classList.contains("lit")) show(t); };
    grid.onclick = e => show(e.target.closest(".jn-tile"));
    grid.onmouseleave = () => show(null);
  }
  /* "tetris" packing: photos keep their own shape (no cropping) in justified rows; the row height is the
     largest one that still fits every photo on one screen. Edges may stay a little empty. */
  let wallShots = [];
  function fitWall(shots) {
    if (shots) wallShots = shots;
    const stage = $("#jnStage"), grid = $("#jnGrid"); if (!stage || !grid || !wallShots.length) return;
    const GAP = 4, W = stage.clientWidth - 16, H = stage.clientHeight - 16, rs = wallShots.map(x => x.r || 1.5);
    const pack = h => {
      const rows = []; let row = [], sum = 0;
      rs.forEach((r, i) => { row.push(i); sum += r;
        if (sum * h + GAP * (row.length - 1) >= W) { rows.push({ row, h: (W - GAP * (row.length - 1)) / sum }); row = []; sum = 0; } });
      if (row.length) rows.push({ row, h });
      return { rows, total: rows.reduce((t, x) => t + x.h, 0) + GAP * (rows.length - 1) };
    };
    let lo = 20, hi = H;
    for (let k = 0; k < 30; k++) { const mid = (lo + hi) / 2; pack(mid).total <= H ? lo = mid : hi = mid; }
    grid.innerHTML = pack(lo).rows.map(({ row, h }) => `<div class="jn-row">${row.map(i => { const x = wallShots[i];
      return `<span class="jn-tile" data-i="${i}" style="width:${(rs[i] * h).toFixed(1)}px;height:${h.toFixed(1)}px">${IMG(x.p, x.ev.date + " · " + x.ev.title)}</span>`; }).join("")}</div>`).join("");
  }
  render();
});

/* ---------- LECTURES ---------- */
safe("Lectures", () => {
  /* course icons (Lucide, ISC licence); picked by course.icon or by keywords in the course name */
  const ICONS = {
    math: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M16 14v4M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"/>',
    factory: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1M12 18h1M7 18h1"/>',
    tools: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>'
  };
  const pick = c => ICONS[c.icon] ? c.icon
    : /math|수학/i.test(c.name + c.sub) ? "math" : /생산|공정|manufactur/i.test(c.name + c.sub) ? "factory"
    : /제작|실습|fabricat|machin/i.test(c.name + c.sub) ? "tools" : /program|프로그래밍|coding/i.test(c.name + c.sub) ? "code" : "book";
  const icon = c => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[pick(c)]}</svg>`;
  $("#lects").innerHTML = (SITE.lectures || []).map(s => `
    <div class="lect"><p class="eyebrow">${esc(s.semester)}</p><h2>Undergraduate courses</h2><ul>
      ${(s.courses || []).map(c => `<li><span class="i">${icon(c)}</span><span class="ko"><b>${esc(c.name)}</b><small>${esc(c.sub || "")}</small></span></li>`).join("")}
    </ul></div>`).join("");
});

/* ---------- footer ---------- */
$("#copyMail").addEventListener("click", async e => {
  const b = e.currentTarget;
  try { await navigator.clipboard.writeText($("#mail").textContent); b.textContent = "Copied"; }
  catch { const r = document.createRange(); r.selectNodeContents($("#mail")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Selected"; }
  setTimeout(() => b.textContent = "Copy", 1600);
});

/* ---------- hero: a random research simulation on every visit ---------- */
safe("Cover", () => {
  const keys = (SITE.coverScenes || []).filter(k => SCENES[k]);
  if (!keys.length) { $(".hero-cap").hidden = true; return; }
  let last = null; try { last = localStorage.getItem("incode-scene"); } catch (e) {}
  const pool = keys.length > 1 ? keys.filter(k => k !== last) : keys;
  let key = pool[Math.random() * pool.length | 0];
  try { localStorage.setItem("incode-scene", key); } catch (e) {}
  const runner = runScene($("#heroCanvas"), key);
  const caption = k => { const s = SCENES[k]; $("#heroCapText").textContent = `Live simulation · ${s.cap}`; $("#heroScale").innerHTML = /m$/.test(s.scale) ? `<i></i>${esc(s.scale)}` : esc(s.scale); };
  caption(key);
  $("#heroNext").hidden = keys.length < 2;
  $("#heroNext").onclick = () => { key = keys[(keys.indexOf(runner.key) + 1) % keys.length]; runner.swap(key); caption(key); try { localStorage.setItem("incode-scene", key); } catch (e) {} };
  hero = { setActive: on => runner.setActive(on) };
});

pending.forEach(report);
addEventListener("hashchange", route);
route();
})();
