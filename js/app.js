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
  $("#focusList").insertAdjacentHTML("beforeend", `<ul>${RESEARCH.map(t => `
    <li><a href="#research" data-thrust="${esc(t.id)}"><b>${esc(t.homeTitle)}</b><span>(${esc(t.homeTags).replace(/ · /g, ", ")})</span></a></li>`).join("")}</ul>`);
  const h = SITE.hiring || {};
  $("#hiring").innerHTML = h.show ? `<div class="notice ko"><span class="pill">Hiring</span><b>${esc(h.title)}</b><span>${md(h.text)}</span></div>` : "";
  /* Group News: every item from SITE.homeNewsSince onward (default: the 12 most recent) */
  const key = d => ((String(d).match(/^\d{4}(\.\d{1,2}){0,2}/) || [""])[0]).split(".").map((x, i) => i ? x.padStart(2, "0") : x).join(".");
  const since = SITE.homeNewsSince ? key(SITE.homeNewsSince) : null;
  const list = since ? NEWS.filter(n => key(n.date) >= since) : NEWS.slice(0, 12);
  $("#homeNews").innerHTML = list.map(n => {
    const imgs = n.images || [];
    return `<article class="hn">
      <div class="hn-head"><span class="num">${esc(n.date)}</span><span class="sep">|</span><b>${esc(n.title)}</b></div>
      <div class="hn-text">${md(n.text, true)}</div>
      ${imgs.length ? `<div class="hn-pics" data-gallery>${imgs.map(p => thumb(p, n.date + " · " + n.title)).join("")}</div>` : ""}
    </article>`;
  }).join("");
});

/* ---------- RESEARCH ---------- */
safe("Research", () => {
  subnav($("#thrustNav"), RESEARCH.map(t => ["th-" + t.id, t.title]));
  $("#thrusts").innerHTML = RESEARCH.map((t, ti) => `
    <section class="thrust" id="th-${esc(t.id)}"><div class="wrap">
      <div class="thrust-top">
        <div class="vis">${IMG(t.image, t.title)}</div>
        <div>
          <p class="eyebrow">Research ${String(ti + 1).padStart(2, "0")}</p>
          <h2>${esc(t.title)}</h2>
          <div class="txt">${(t.overview || []).map(p => `<p>${md(p)}</p>`).join("")}<ul>${(t.bullets || []).map(l => `<li><span>${md(l)}</span></li>`).join("")}</ul>${(t.closing || []).map(p => `<p>${md(p)}</p>`).join("")}</div>
        </div>
      </div>
      <div class="projects">${(t.projects || []).map((p, i) => `
        <article class="proj">
          <div class="fig" data-gallery>${thumb(p.image, p.title)}</div>
          <div class="body">
            <span class="k">Project ${i + 1}</span>
            <h3>${esc(p.title)}</h3>
            <div class="txt">${(p.text || []).map(x => `<p>${md(x)}</p>`).join("")}</div>
            ${(p.refs || []).length ? `<div class="refs">${p.refs.map(r => `<div class="ref"><span class="pill">${esc(r.label)}</span>${r.link ? `<a href="${esc(r.link)}" target="_blank" rel="noopener">${esc(r.title)} ↗</a>` : `<b>${esc(r.title)}</b>`}<i>${esc(r.venue)}</i></div>`).join("")}</div>` : ""}
          </div>
        </article>`).join("")}
      </div>
    </div></section>`).join("");
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
  $("#people").innerHTML = (PEOPLE.MEMBERS || []).map(g => `
    <h3 class="group-title">${esc(g.group)}</h3>
    <div class="people">${(g.people || []).map(p => `
      <article class="person">
        <div class="av">${IMG(p.photo, p.name)}</div>
        <div class="in">
          <span class="nm">${esc(p.name)}</span><span class="pill crimson">${esc(p.position)}</span>
          <dl>
            ${(p.interests || []).length ? `<div><dt>Research interests</dt>${p.interests.map(r => `<dd>${esc(r)}</dd>`).join("")}</div>` : ""}
            ${(p.education || []).length ? `<div><dt>Education</dt>${p.education.map(r => `<dd>${esc(r)}</dd>`).join("")}</div>` : ""}
            ${(p.publications || []).length ? `<div><dt>Publications &amp; honors</dt>${p.publications.map(x => `<dd>${typeof x === "number" ? pubRef(x) : md(x)}</dd>`).join("")}</div>` : ""}
          </dl>
          ${p.email ? `<span class="em">${esc(p.email)}</span>` : ""}
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
  subnav($("#pubNav"), [["p-journals", "International journals"], ["p-prep", "In preparation"], ["p-early", "2009 – 2017"]]);
  $("#prepList").innerHTML = (PUBS.IN_PREPARATION || []).map((p, i) => `<li><span class="n">P${i + 1}</span><div><div class="t">${esc(p.title)}</div><div class="a">${fmtAuthors(p.authors)}</div></div></li>`).join("");
  const early = PUBS.EARLY || [];
  $("#earlyList").innerHTML = early.map((p, i) => `<li><span class="n">${early.length - i}</span><div><div class="t">${esc(p.title)}</div><div class="a">${esc(p.info)}</div></div></li>`).join("");
  const J = PUBS.JOURNALS || [];
  let yearSel = "All", query = "";
  chipGroup($("#years"), [["All", "All"], ...[...new Set(J.map(p => String(p.year)))].map(y => [y, y])], v => { yearSel = v; render(); });
  $("#pubSearch").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); render(); });
  function render() {
    const list = J.filter(p => (yearSel === "All" || String(p.year) === yearSel) && (!query || `${p.title} ${p.authors} ${p.journal}`.toLowerCase().includes(query)));
    if (!list.length) { $("#pubList").innerHTML = `<p class="empty">No papers match “${esc(query)}”. Try an author surname or a journal name.</p>`; return; }
    const count = y => list.filter(p => p.year === y).length;
    let html = "", cur = null;
    list.forEach(p => {
      if (p.year !== cur) { cur = p.year; html += `<div class="ylabel">${esc(p.year)}<small>${count(p.year)} paper${count(p.year) > 1 ? "s" : ""}</small></div>`; }
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
      html += `<article class="nitem${imgs.length ? "" : " noimg"}">
        <div><div class="meta"><span class="num">${esc(n.date)}</span>${kindPill(n.type)}</div>
        <h3>${esc(n.title)}</h3><div class="bd">${md(n.text, true)}</div></div>
        ${imgs.length ? `<div class="pics" data-gallery>${imgs.map(p => thumb(p, n.date + " · " + n.title)).join("")}</div>` : ""}
      </article>`;
    });
    $("#newsList").innerHTML = html;
  }
  render();
});

/* ---------- PHOTO ---------- */
safe("Photo", () => {
  let sel = 0;
  chipGroup($("#albumTabs"), ALBUMS.map((a, i) => [i, a.label, (a.events || []).reduce((s, e) => s + (e.images || []).length, 0)]), v => { sel = +v; render(); });
  function render() {
    const a = ALBUMS[sel]; if (!a) return;
    $("#album").innerHTML = (a.events || []).map(ev => `
      <div class="event">
        <div class="hd"><h3>${esc(ev.title)}</h3><span class="d num">${esc(ev.date)}</span></div>
        <div class="gal${(ev.images || []).length === 1 ? " single" : ""}" data-gallery>${(ev.images || []).map(p => thumb(p, ev.date + " · " + ev.title, 'class="zoom" style="flex:1.5 1 18rem;aspect-ratio:1.5"')).join("")}</div>
      </div>`).join("");
    /* size each tile by its real aspect ratio once it loads (justified rows) */
    $("#album").querySelectorAll(".gal img").forEach(img => {
      const fit = () => { if (!img.naturalWidth) return; const r = img.naturalWidth / img.naturalHeight, b = img.parentElement, single = b.parentElement.classList.contains("single");
        b.style.flex = `${r.toFixed(3)} 1 ${Math.round(r * 12)}rem`; b.style.aspectRatio = r.toFixed(3); if (single) b.style.maxWidth = `${Math.min(100, Math.round(r * 36))}rem`; };
      img.complete ? fit() : img.addEventListener("load", fit, { once: true });
    });
  }
  render();
});

/* ---------- LECTURES ---------- */
safe("Lectures", () => {
  const abbr = n => (n.match(/[A-Z]/g) || [n[0]]).slice(0, 2).join("");
  $("#lects").innerHTML = (SITE.lectures || []).map(s => `
    <div class="lect"><p class="eyebrow">${esc(s.semester)}</p><h2>Undergraduate courses</h2><ul>
      ${(s.courses || []).map(c => `<li><span class="i">${esc(abbr(c.name))}</span><span class="ko"><b>${esc(c.name)}</b><small>${esc(c.sub || "")}</small></span></li>`).join("")}
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
