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
  const one = t => esc(t).replace(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, m => `<span class="mail">${m}</span>`)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (m, l, u) => `<a href="${u.replace(/&amp;/g, "&").replace(/"/g, "%22")}" target="_blank" rel="noopener">${l}</a>`);
  const lines = String(text ?? "").split("\n").filter(Boolean);
  return paras ? lines.map(l => `<p>${one(l)}</p>`).join("") : lines.map(one).join("<br>");
}
const plain = t => String(t ?? "").replace(/\[([^\]]+)\]\([^)]+\)/g, "").replace(/\s+/g, " ").trim();
/* images carry the site version (app.js?v=N) so an edited photo with the same file name is fetched again */
const IMGV = (document.currentScript && document.currentScript.src.match(/[?&]v=(\w+)/) || [])[1] || "";
const IMG = (path, alt = "") => path ? `<img src="img/${esc(path)}${IMGV ? "?v=" + IMGV : ""}" alt="${esc(alt)}" loading="lazy" decoding="async">` : "";
/* an author name inside "A, B†, and C*" lists */
const authorRe = n => new RegExp(`(^|, |and )(${n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?=[†*,]|$| and)`, "g");
const PEOPLE_ALL = [...(PEOPLE.MEMBERS || []).flatMap(g => g.people || []), ...(PEOPLE.ALUMNI || [])];
const namesOf = p => [p.name, ...(p.aka || [])];
/* underlined in author lists: everyone on the Team page plus the extra GROUP_MEMBERS names */
const MEMBER_NAMES = [...new Set(["Jihwan Song", ...PEOPLE_ALL.flatMap(namesOf), ...(PUBS.GROUP_MEMBERS || [])])];
function fmtAuthors(a) {
  let s = esc(a);
  MEMBER_NAMES.forEach(m => { s = s.replace(authorRe(m), "$1<u>$2</u>"); });
  return s;
}
/* a person's papers are found by name in JOURNALS; numbers/text in their own publications list are added on top */
const papersOf = p => {
  const own = p.publications || [];
  const nos = new Set([...(PUBS.JOURNALS || []).filter(j => namesOf(p).some(n => authorRe(n).test(j.authors || ""))).map(j => j.no), ...own.filter(x => typeof x === "number")]);
  return [...[...nos].sort((a, b) => b - a), ...own.filter(x => typeof x !== "number")];
};
const kindPill = k => `<span class="pill ${k === "pub" || k === "cover" ? "crimson" : k === "conf" || k === "member" || k === "lab" ? "grey" : ""}">${KIND[k] || esc(k)}</span>`;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
function jump(id) { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); }
function subnav(el, items) {
  el.innerHTML = items.map(([id, l]) => `<button type="button" data-j="${id}">${esc(l)}</button>`).join("");
  const pg = el.closest(".page");
  el.onclick = e => { const b = e.target.closest("button"); if (!b) return; pg.classList.toggle("alumni-view", b.dataset.j === "t-alumni"); jump(b.dataset.j === "t-alumni" ? "teamNav" : b.dataset.j); };
  addEventListener("hashchange", () => pg.classList.remove("alumni-view"));
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
  $("#nav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false"); $("#menuBtn").textContent = "Menu";
  window.scrollTo(0, 0); onScroll();
  if (hero) hero.setActive(page === "home");
}
function onScroll() { $("#top").classList.toggle("solid", scrollY > 40 || $("#nav").classList.contains("open")); }
addEventListener("scroll", onScroll, { passive: true });
$("#menuBtn").onclick = () => { const o = $("#nav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded", o); $("#menuBtn").textContent = o ? "Close" : "Menu"; onScroll(); };

/* ---------- lightbox ---------- */
const lb = { list: [], i: 0 };
function showLB() {
  const it = lb.list[lb.i]; if (!it) return;
  $("#lbImg").src = "img/" + it.p + (IMGV ? "?v=" + IMGV : ""); $("#lbImg").alt = it.c || "";
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
  /* seasonal full stop: the "." after "life" turns into a small icon on special days (dates in SITE.seasons) */
  const ICONS = {
    halloween: ["Happy Halloween", '<path d="M12 7c-.6-2.4.4-4.2 2.6-5" stroke="#6d8f3e" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="7.6" cy="15" rx="5.8" ry="7.2" fill="#d4621c"/><ellipse cx="16.4" cy="15" rx="5.8" ry="7.2" fill="#d4621c"/><ellipse cx="12" cy="15" rx="4.8" ry="7.8" fill="#f0892b"/><path d="M8 12.5l2 2.2H6zM16 12.5l2 2.2h-4zM8 17.5q4 2.6 8 0q-4 1.2-8 0z" fill="#2a160b"/>'],
    christmas: ["Merry Christmas", '<path d="M3.5 17Q5.5 6 14 4.2q5.6-1 6.6 5.8l-2.6.4q-.8-3-2.8-2.4Q12 9.4 14 17z" fill="#d23a2f"/><rect x="2" y="15.6" width="15" height="5.4" rx="2.7" fill="#fbf7ef"/><circle cx="19.4" cy="11" r="2.7" fill="#fbf7ef"/>'],
    seollal: ["새해 복 많이 받으세요", '<path d="M8.4 13.4L.8 18.8l1 1.4 8.2-4.6z" fill="#2c3f6b"/><ellipse cx="12" cy="13" rx="6.2" ry="4" transform="rotate(-20 12 13)" fill="#2c3f6b"/><ellipse cx="14.2" cy="14.6" rx="3.3" ry="1.9" transform="rotate(-30 14.2 14.6)" fill="#fbf7ef"/><ellipse class="fold" cx="9.8" cy="11.9" rx="2.5" ry=".95" transform="rotate(-20 9.8 11.9)" fill="#fbf7ef"/><circle cx="17" cy="8.4" r="2.9" fill="#2c3f6b"/><path d="M19.6 7.7l3.2.8-3.2.8z" fill="#e8e4da"/><circle cx="17.9" cy="7.8" r=".6" fill="#fbf7ef"/><path d="M12.2 16.6l-.5 3M14.2 16.2v3" stroke="#c9c3b6" stroke-width=".8" stroke-linecap="round"/><g class="wing"><g class="wu"><path d="M9 11.4C8.2 8 7.4 5.4 6.4 3C9 3.2 11.6 4.6 13 6.6C13.9 8 14.3 9.4 14.2 10.6z" fill="#34497c"/><path d="M6.4 3C7.6 3.1 8.8 3.6 9.8 4.3C9.4 5.4 8.6 6.2 7.6 6.4C7.2 5.2 6.8 4 6.4 3z" fill="#fbf7ef"/></g><g class="wd"><path d="M9.2 11C8.6 13.8 7.8 16.4 6.6 18.8C9.2 18.4 11.6 16.8 13 14.6C13.8 13.3 14.2 12 14.2 10.8z" fill="#34497c"/><path d="M6.6 18.8C7.8 18.6 9 18 10 17.2C9.6 16.2 8.8 15.4 7.8 15.2C7.4 16.4 7 17.6 6.6 18.8z" fill="#fbf7ef"/></g></g>'],
    teachers: ["스승의 은혜에 감사드립니다", '<rect x="11.45" y="15" width="1.1" height="7.6" fill="#7a9568"/><path d="M7 9.6 L7.1 3.6 Q7.92 1.40 8.73 2.76 Q9.55 1.40 10.37 3.00 Q11.18 1.40 12.00 2.76 Q12.82 1.40 13.63 3.00 Q14.45 1.40 15.27 2.76 Q16.08 1.40 16.90 3.00 L17 9.6 Z" fill="#ee6a5c"/><path d="M8.4 10.4 Q5 9.8 3.7 7.6 Q3.2 6.4 4.4 6.1 Q4.5 4.6 5.9 4.8 Q6.8 4.1 7.6 5 L8.6 6.2 Z" fill="#e9503f"/><path d="M 15.60 10.40 Q 19.00 9.80 20.30 7.60 Q 20.80 6.40 19.60 6.10 Q 19.50 4.60 18.10 4.80 Q 17.20 4.10 16.40 5.00 L 15.40 6.20 Z" fill="#e9503f"/><path d="M8 10.6 L8.1 6.1 Q8.75 4.15 9.40 5.30 Q10.05 4.15 10.70 5.50 Q11.35 4.15 12.00 5.30 Q12.65 4.15 13.30 5.50 Q13.95 4.15 14.60 5.30 Q15.25 4.15 15.90 5.50 L16 10.6 Z" fill="#e9503f"/><path d="M11 13.4 Q6.4 13 3.9 10.6 Q3.2 9.6 4.3 9.2 Q4.6 8 6 8.2 Q7 7.6 7.9 8.5 L9.2 9.8 Z" fill="#ee7569"/><path d="M 13.00 13.40 Q 17.60 13.00 20.10 10.60 Q 20.80 9.60 19.70 9.20 Q 19.40 8.00 18.00 8.20 Q 17.00 7.60 16.10 8.50 L 14.80 9.80 Z" fill="#ee7569"/><path d="M10.8 13.7 Q9 12 8.7 9.2 Q9.52 6.90 10.35 8.18 Q11.18 6.90 12.00 8.40 Q12.82 6.90 13.65 8.18 Q14.48 6.90 15.30 8.40 Q15 12 13.2 13.7 Z" fill="#ea867d"/><path d="M9.6 12.9 Q10.00 12.00 10.40 12.77 Q10.80 12.00 11.20 12.90 Q11.60 12.00 12.00 12.77 Q12.40 12.00 12.80 12.90 Q13.20 12.00 13.60 12.77 Q14.00 12.00 14.40 12.90 Q13.8 14.8 12.6 15.9 L11.4 15.9 Q10.2 14.8 9.6 12.9 Z" fill="#86a077"/><path d="M11.6 16.3 Q9.8 18.6 7.3 19.5 L8.1 19.8 L8.3 21.5 Q10.9 19.7 12 16.8 Z" fill="#e3a52c"/><path d="M 12.40 16.30 Q 14.20 18.60 16.70 19.50 L 15.90 19.80 L 15.70 21.50 Q 13.10 19.70 12.00 16.80 Z" fill="#e3a52c"/><path d="M12 15.3 L7.6 14 Q7 14.5 7 15.9 Q7.1 17.3 7.8 17.5 L12 16.3 Z" fill="#f2c14e"/><path d="M 12.00 15.30 L 16.40 14.00 Q 17.00 14.50 17.00 15.90 Q 16.90 17.30 16.20 17.50 L 12.00 16.30 Z" fill="#f2c14e"/><path d="M12 15.3 L7.6 14 Q7.2 14.2 7.1 14.7 L12 15.9 Z" fill="#e3a52c"/><path d="M 12.00 15.30 L 16.40 14.00 Q 16.80 14.20 16.90 14.70 L 12.00 15.90 Z" fill="#e3a52c"/><rect x="11.1" y="14.7" width="1.8" height="2" rx=".45" fill="#d39522"/>'],
    chuseok: ["풍성한 한가위 보내세요", '<circle cx="12" cy="16" r="11" fill="#ffe08a" opacity=".14"/><circle cx="12" cy="16" r="9" fill="#ffe08a" opacity=".2"/><circle cx="12" cy="16" r="7.2" fill="#ffe29a"/><circle cx="9.5" cy="14" r="1.6" fill="#f1c867"/><circle cx="14.5" cy="18" r="2" fill="#f1c867"/><circle cx="13.6" cy="12.6" r=".85" fill="#f1c867"/><circle cx="9.4" cy="18.8" r=".75" fill="#f1c867"/>'],
    birthday: ["Happy birthday, Professor Song!", '<ellipse cx="12" cy="21.6" rx="10.5" ry="1.5" fill="#e9e4da"/><rect x="4" y="12.6" width="16" height="8.6" rx="1.8" fill="#ffd9e2"/><rect x="4" y="16.7" width="16" height="1.3" fill="#f4839f"/><circle cx="6" cy="19.6" r=".45" fill="#fff"/><circle cx="8" cy="19.6" r=".45" fill="#fff"/><circle cx="10" cy="19.6" r=".45" fill="#fff"/><circle cx="12" cy="19.6" r=".45" fill="#fff"/><circle cx="14" cy="19.6" r=".45" fill="#fff"/><circle cx="16" cy="19.6" r=".45" fill="#fff"/><circle cx="18" cy="19.6" r=".45" fill="#fff"/><path d="M4 15.1v-1.5a1.8 1.8 0 0 1 1.8-1.8h12.4a1.8 1.8 0 0 1 1.8 1.8v1.5q-1 2.3-2 0q-1 1.2-2 0q-1 2.3-2 0q-1 1.2-2 0q-1 2.3-2 0q-1 1.2-2 0q-1 2.3-2 0q-1 1.2-2 0z" fill="#fffaf3"/><circle cx="10" cy="12" r="1" fill="#e8364f"/><circle cx="14" cy="12" r="1" fill="#e8364f"/><rect x="7.4" y="7.6" width="1.2" height="4.4" rx=".4" fill="#8ec5ff"/><rect x="11.4" y="7" width="1.2" height="5" rx=".4" fill="#ffd166"/><rect x="15.4" y="7.6" width="1.2" height="4.4" rx=".4" fill="#ff9fb6"/><g class="flame"><g class="fl"><path d="M8 4.199999999999999q1.25 1.5 1.25 2.3a1.25 1.25 0 0 1-2.5 0q0-.8 1.25-2.3z" fill="#ffc94a"/><ellipse cx="8" cy="6.3999999999999995" rx=".5" ry=".75" fill="#fff4bf"/></g></g><g class="flame"><g class="fl"><path d="M12 3.6q1.25 1.5 1.25 2.3a1.25 1.25 0 0 1-2.5 0q0-.8 1.25-2.3z" fill="#ffc94a"/><ellipse cx="12" cy="5.8" rx=".5" ry=".75" fill="#fff4bf"/></g></g><g class="flame"><g class="fl"><path d="M16 4.199999999999999q1.25 1.5 1.25 2.3a1.25 1.25 0 0 1-2.5 0q0-.8 1.25-2.3z" fill="#ffc94a"/><ellipse cx="16" cy="6.3999999999999995" rx=".5" ry=".75" fill="#fff4bf"/></g></g><path class="smoke" d="M8 7.199999999999999q-.9-1.1 0-2.2t0-2.2" stroke="#cfcac0" stroke-width=".55" fill="none" stroke-linecap="round"/><path class="smoke" d="M12 6.6q-.9-1.1 0-2.2t0-2.2" stroke="#cfcac0" stroke-width=".55" fill="none" stroke-linecap="round"/><path class="smoke" d="M16 7.199999999999999q-.9-1.1 0-2.2t0-2.2" stroke="#cfcac0" stroke-width=".55" fill="none" stroke-linecap="round"/>']
  };
  const season = (() => {
    const q = new URLSearchParams(location.search).get("season"); if (ICONS[q]) return q;
    const now = new Date(), S = SITE.seasons || {}, md = (now.getMonth() + 1) * 100 + now.getDate();
    const pad = n => String(n).padStart(2, "0");
    if (S.birthday === `${pad(now.getMonth() + 1)}-${pad(now.getDate())}`) return "birthday";
    /* Seollal (lunar 1/1) and Chuseok (lunar 8/15) from the browser's Korean (dangi) calendar; shown the day before, on the day and the day after */
    const lunar = new Intl.DateTimeFormat("ko-KR-u-ca-dangi", { month: "numeric", day: "numeric" });
    const lunarIs = (m, day) => lunar.resolvedOptions().calendar === "dangi" && [-1, 0, 1].some(off => {
      const p = lunar.formatToParts(new Date(now.getFullYear(), now.getMonth(), now.getDate() + off, 12)), v = k => (p.find(x => x.type === k) || {}).value;
      return v("month") === m && v("day") === day; });
    if (lunarIs("1", "1")) return "seollal";
    if (lunarIs("8", "15")) return "chuseok";
    if (md === 515) return "teachers";
    if (md >= 1025 && md <= 1031) return "halloween";
    if (md === 1224 || md === 1225) return "christmas";
    return "";
  })();
  /* extra icons for some seasons: one is picked at random per page load and kept until refresh */
  const MORE = {
    christmas: ['<g transform="rotate(22 12 16)"><path d="M14.5 22V8.5a4 4 0 0 0-8 0v1.2" stroke="#fbf7ef" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M14.5 22V8.5a4 4 0 0 0-8 0v1.2" stroke="#e03a3e" stroke-width="3.2" fill="none" stroke-dasharray="1.5 3.6" pathLength="30"/><path d="M14.5 13.4l-3.4-1.8v3.6zM14.5 13.4l3.4-1.8v3.6z" fill="#3f9b54"/><circle cx="14.5" cy="13.4" r=".9" fill="#5cb870"/></g>', '<path d="M7.6 15.2L3.4 12.4M3.9 13.6l-.9-1.9M16.4 15.2l4.2-2.8M20.1 13.6l.9-1.9" stroke="#9a6b43" stroke-width=".9" stroke-linecap="round"/><circle cx="12" cy="17.6" r="5" fill="#f7f7f3"/><circle cx="12" cy="9.8" r="3.6" fill="#fbfbf8"/><path d="M8.6 12.4q3.4 1.6 6.8 0l.3 1.5q-3.7 1.4-7.4 0z" fill="#e03a3e"/><path d="M14.2 13.4l1.3 3.4 1.1-.8-.9-3z" fill="#c42e33"/><rect x="9" y="5.4" width="6" height="1.2" rx=".5" fill="#3b3b44"/><rect x="10" y="2" width="4" height="4" rx=".6" fill="#3b3b44"/><rect x="10" y="4.4" width="4" height=".8" fill="#e03a3e"/><circle cx="10.7" cy="9.2" r=".55" fill="#2a2a2e"/><circle cx="13.3" cy="9.2" r=".55" fill="#2a2a2e"/><path d="M12 10.2l2.9.7-2.9.5z" fill="#f08a2b"/><circle cx="12" cy="16" r=".55" fill="#2a2a2e"/><circle cx="12" cy="18.2" r=".55" fill="#2a2a2e"/><circle cx="12" cy="20.4" r=".55" fill="#2a2a2e"/>']
  };
  if (season) { const [label, first] = ICONS[season], set = [first, ...(MORE[season] || [])], svg = set[Math.floor(Math.random() * set.length)];
    $("#heroDot").innerHTML = `<span class="pd">.</span><svg viewBox="0 0 24 24" role="img" aria-label="${label}"><title>${label}</title>${svg}</svg>`; $("#heroDot").classList.add("icon"); const motion = { seollal: "fly" }[season];
    if (motion) { $("#heroDot").classList.add(motion); setTimeout(() => $("#heroDot").closest(".ln").style.overflow = "visible", 2500); } /* the line clips for the text reveal; let the icon move above it once that is done (first pop is at ~3s) */
    /* click/tap: jump straight to the next pop (dot -> icon, or icon -> dot); 7s and 14.5s are the pop moments in the 17s CSS cycle, -4s its delay */
    const dot = $("#heroDot"); dot.setAttribute("role", "button"); dot.tabIndex = 0;
    const flip = () => dot.getAnimations({ subtree: true }).filter(a => a.effect.getTiming().duration === 17000).forEach(a => {
      const t = a.currentTime + 4000, local = t % 17000, goal = local >= 7000 && local < 15200 ? 14500 : 7000;
      a.currentTime = t - local + goal + (goal < local ? 17000 : 0) - 4000; a.play();
    });
    dot.onclick = flip; dot.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } }; }
  $("#hxResearch").innerHTML = RESEARCH.map((t, i) => `
    <a class="hx-card" href="#research" data-thrust="${esc(t.id)}" data-rv style="--d:${i * 0.12}s">
      <span class="hx-fig">${IMG(t.image, "")}</span>
      <span class="hx-no num">0${i + 1}</span><b>${esc(t.homeTitle)}</b><span class="hx-sub">${esc(t.homeTags)}</span></a>`).join("");
  const h = SITE.hiring || {};
  $("#hiring").innerHTML = h.show ? `<div class="notice ko"><b>${esc(h.title)}</b><p>${md(h.text)}</p></div>` : "";
  $("#hiringEn").innerHTML = h.show && h.titleEn ? `<div class="notice en-only"><b>${esc(h.titleEn)}</b><p>${md(h.textEn)}</p></div>` : "";
  /* phones: Korean / English switch inside the Join card */
  document.querySelectorAll("#joinDlg .lang button").forEach(b => b.onclick = () => {
    $("#joinDlg").dataset.lang = b.dataset.l;
    document.querySelectorAll("#joinDlg .lang button").forEach(o => o.setAttribute("aria-pressed", o === b));
    $("#joinDlg .join").scrollTop = 0;
  });
  /* Join our journey card: opened by the button on the first screen; closes with ✕, Esc or a click outside */
  const dlg = $("#joinDlg");
  $("#joinOpen").onclick = () => dlg.showModal();
  /* gold line drawn along the pill-shaped outline of the button */
  const ring = () => { const b = $("#joinOpen"), w = b.offsetWidth, hgt = b.offsetHeight, svg = b.querySelector(".cta-ring"); if (!w) return;
    const shape = `pathLength="100" x="0.75" y="0.75" width="${w - 1.5}" height="${hgt - 1.5}" rx="${(hgt - 1.5) / 2}"`;
    svg.setAttribute("viewBox", `0 0 ${w} ${hgt}`);
    /* update the existing rect on resize instead of replacing it, so its animation stays in step with the label's */
    const r = svg.querySelector("rect");
    if (!r) { svg.innerHTML = `<rect class="trail" ${shape}/>`; return; }
    Object.entries({ width: w - 1.5, height: hgt - 1.5, rx: (hgt - 1.5) / 2 }).forEach(([k, v]) => r.setAttribute(k, v)); };
  ring(); addEventListener("resize", ring); addEventListener("hashchange", () => setTimeout(ring, 60));
  $("#joinClose").onclick = () => dlg.close();
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  /* Group News: the latest SITE.homeNewsCount items as rounded photo cards, one at a time, story-style:
     thin bars under the card fill up and move on by themselves (paused while hovered, off screen, or with reduced motion) */
  const bgUrl = p => `img/${esc(p)}${IMGV ? "?v=" + IMGV : ""}`;
  const hn = NEWS.slice(0, SITE.homeNewsCount || 10);
  $("#homeNews").innerHTML = hn.map((n, i) => {
    const im = (n.images || [])[0];
    return `<article class="hn-card${im ? "" : " text-only"}" data-rv>
      ${im ? `<span class="hn-bg" style="background-image:url('${bgUrl(im)}')"></span>
      <span class="hn-fig">${IMG(im, "")}</span>` : ""}
      <div class="hn-txt"><span class="hn-date num">${esc(n.date)}</span>
      <b>${esc(n.title)}</b><div class="hx-sub">${md(n.text, true)}</div></div>
    </article>`;
  }).join("");
  {
    const row = $("#homeNews"), bars = document.createElement("div");
    bars.className = "hn-bars";
    bars.innerHTML = hn.map((_, i) => `<button type="button" aria-label="News ${i + 1}"><i></i></button>`).join("");
    row.parentElement.after(bars);
    let cur = -1;
    const stride = () => row.children.length > 1 ? row.children[1].offsetLeft - row.children[0].offsetLeft : row.clientWidth; // card width + gap
    const go = i => row.scrollTo({ left: ((i + hn.length) % hn.length) * stride(), behavior: reduceMotion ? "auto" : "smooth" });
    const mark = () => {
      const i = Math.round(row.scrollLeft / stride());
      if (i === cur) return;
      cur = i;
      [...bars.children].forEach((b, k) => {
        b.className = k < cur ? "done" : k === cur ? "on" : "";
        if (k === cur) { const t = b.firstChild; t.replaceWith(t.cloneNode()); } // restart the fill
      });
    };
    $(".hn-prev").onclick = () => go(cur - 1);
    $(".hn-next").onclick = () => go(cur + 1);
    [...bars.children].forEach((b, k) => b.onclick = () => go(k));
    bars.addEventListener("animationend", () => go(cur + 1));
    row.addEventListener("scroll", mark, { passive: true });
    mark();
    const sec = row.parentElement, pause = on => bars.classList.toggle("paused", on);
    let hover = false, seen = false;
    sec.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") { hover = true; pause(true); } });
    sec.addEventListener("pointerleave", () => { hover = false; pause(!seen); });
    if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => { seen = e.isIntersecting; pause(hover || !seen); }, { threshold: 0.4 }).observe(row);
    pause(true);
  }
  /* photo strip drifts sideways forever: the set is drawn twice and the track slides by exactly one set */
  const pics = ALBUMS.flatMap(a => (a.events || []).flatMap(e => e.images || [])).sort(() => Math.random() - 0.5).slice(0, 14);
  const set = pics.map(p => IMG(p, "").replace(' loading="lazy"', "")).join("");
  $("#hxStrip").innerHTML = `<div class="hx-track" style="--dur:${pics.length * 8}s">${set}${set}</div>`;
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
  /* alumni cards keep the full citation line: title, authors, journal (impact), date. Link */
  const cite = no => { const p = PUBS.JOURNALS.find(x => x.no === no); return p ? md(`${p.title}, ${p.authors}, ${p.journal}${p.impact ? ` (${p.impact})` : ""}${p.date ? ", " + p.date : ""}.${p.link ? ` [Link ↗](${p.link})` : ""}`) : ""; };
  const pubList = (list, label, always, ref = pubRef) => list.length || always ? `<details class="pubs"><summary>${label}${list.length ? ` (${list.length})` : ""}</summary>${list.length ? `<ol>${list.map(x => `<li>${typeof x === "number" ? ref(x) : md(x)}</li>`).join("")}</ol>` : `<p class="none">To be updated.</p>`}</details>` : "";
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
          ${pubList(papersOf(p), "Publications &amp; honors", /ph\.?d|m\.?s/i.test(g.group))}
        </div>
      </article>`).join("")}</div>`).join("");
  $("#alumni").innerHTML = (PEOPLE.ALUMNI || []).map(a => `
    <article class="alum">
      <span class="nm">${esc(a.name)}</span>
      <span class="pos${a.position ? "" : " none"}">${a.position ? esc(a.position) : "Current position not listed"}</span>
      <div class="edu">${(a.education || []).map(x => `<span>${esc(x)}</span>`).join("")}</div>
      ${pubList(papersOf(a), "Publications", false, cite)}
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
    if (p.year !== cur) { cur = p.year; if (typeof p.year === "string") html += `<div style="display:flex;align-items:center;gap:1rem;margin:3.5rem 0 .5rem"><span style="flex:1;height:1px;background:var(--crimson-text);opacity:.35"></span><span style="font-size:.78rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--crimson-text);border:1px solid currentColor;border-radius:999px;padding:.45rem 1.1rem">▲ Start of Independent Research</span><span style="flex:1;height:1px;background:var(--crimson-text);opacity:.35"></span></div>`; html += `<div class="ylabel">${esc(p.year)}<small>${count(p.year)} paper${count(p.year) > 1 ? "s" : ""}</small></div>`; }      
    if (p.info) { html += `<div class="pub"><span class="n num">${esc(p.no)}</span><div><div class="t">${esc(p.title)}</div><div class="a">${esc(p.info)}</div></div></div>`; return; }
      const review = p.journal === "Under review";
      html += `<div class="pub${p.cover ? " has-cover" : ""}"><span class="n num">${esc(p.no)}</span><div>
        <div class="t">${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</div>
        <div class="a">${fmtAuthors(p.authors)}</div>
        <div class="v">${review ? `<span class="pill grey">Under review</span>` : `<i>${esc(p.journal)}</i><span class="vol num">${esc([p.volume, p.date].filter(Boolean).join(" · "))}</span>${p.impact ? `<span class="pill">${esc(p.impact)}</span>` : ""}`}${p.note ? `<span class="pill crimson">${esc(p.note)}</span>` : ""}</div>
      </div>${p.cover ? `<a class="cover" href="${esc(p.link || "img/" + p.cover)}" target="_blank" rel="noopener">${IMG(p.cover, p.journal + " cover")}</a>` : ""}</div>`;
    });
    $("#pubList").innerHTML = html;
  }
  render();
});

/* ---------- NEWS ---------- */
safe("News", () => {
  /* a plain record: year headings, then one row per item (date | title, text, photo toggle); year buttons jump to each year */
  let html = "", y = null;
  NEWS.forEach(n => {
    const yr = String(n.date).slice(0, 4);
    if (yr !== y) { y = yr; html += `<h2 class="nlog-year num" id="ny-${esc(y)}">${esc(y)}</h2>`; }
    const imgs = n.images || [];
    html += `<article class="nlog-row">
      <p class="nlog-date num">${esc(String(n.date).slice(5) || n.date)}</p>
      <div class="nlog-body"><h3>${esc(n.title)}</h3><div class="nlog-text">${md(n.text, true)}</div>
        ${imgs.length ? `<details class="nlog-pics"><summary class="nlog-photo">${imgs.length > 1 ? `View photos (${imgs.length})` : "View photo"}</summary><div>${imgs.map(p => IMG(p, n.date + " · " + n.title)).join("")}</div></details>` : ""}
      </div>
    </article>`;
  });
  $("#newsList").innerHTML = html;
  subnav($("#newsYears"), [...new Set(NEWS.map(n => String(n.date).slice(0, 4)))].map(yr => ["ny-" + yr, yr]));
});

/* ---------- PHOTO ---------- */
safe("Photo", () => {
  /* event kind: an optional `tag` in data/photos.js wins, otherwise guessed from the title */
  const KINDS = { conf: "Conference", celebrate: "Celebration", life: "Lab life" };
  const kindOf = ev => KINDS[ev.tag] ? ev.tag : /meeting|conference|symposium|학회/i.test(ev.title) ? "conf" : /birthday|teacher|christmas|graduat|생일|스승|졸업/i.test(ev.title) ? "celebrate" : "life";
  const allEvents = ALBUMS.flatMap(a => a.events || []);
  let sel = "0";
  chipGroup($("#albumTabs"), ALBUMS.map((a, i) => [i, a.label]).concat([["wall", "Photo wall"]]), v => {
    sel = v; render();
    if (v === "wall") $("#album").closest(".sec").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });
  addEventListener("resize", () => { if (sel === "wall") fitWall(); });
  /* timeline: only the event being read has a filled dot; it moves down as you scroll */
  const markCurrent = () => {
    const evs = [...$("#album").querySelectorAll(".ev")]; if (!evs.length || $('[data-page="photo"]').hidden) return;
    /* the event whose photos sit closest to the middle of the screen */
    const mid = innerHeight / 2;
    let cur = evs[0], best = Infinity;
    for (const ev of evs) {
      const r = (ev.querySelector(".gal") || ev).getBoundingClientRect();
      const d = r.top <= mid && r.bottom >= mid ? 0 : Math.min(Math.abs(r.top - mid), Math.abs(r.bottom - mid));
      if (d < best) { best = d; cur = ev; }
    }
    evs.forEach(ev => ev.classList.toggle("cur", ev === cur));
  };
  addEventListener("scroll", markCurrent, { passive: true });
  addEventListener("hashchange", () => setTimeout(markCurrent, 60));
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
          <div class="gal">${(ev.images || []).map((p, i) => `<span class="ph${ev.wide ? (ev.wide.some(w => p.endsWith(w)) ? " wide" : "") : i === 0 ? " wide auto" : ""}" style="flex:1.5 1 calc(var(--row) * 1.5);aspect-ratio:1.5">${IMG(p, ev.date + " · " + ev.title)}</span>`).join("")}</div>
        </article>`; }).join("")}</div>`;
    /* size each tile by its real aspect ratio once it loads (justified rows) */
    $("#album").querySelectorAll(".gal img").forEach(img => {
      const fit = () => { if (!img.naturalWidth) return; const r = img.naturalWidth / img.naturalHeight, b = img.parentElement;
        b.style.flex = `${r.toFixed(3)} 1 calc(var(--row) * ${r.toFixed(3)})`; b.style.aspectRatio = r.toFixed(3); if (r < 1) b.classList.remove("auto", "wide"); /* a portrait first photo (e.g. photo-booth strip) stays small; only a landscape one goes full width on phones */ b.style.maxWidth = `calc(var(--row) * ${r.toFixed(3)} * var(--cap))`; };
      img.complete ? fit() : img.addEventListener("load", fit, { once: true });
    });
    markCurrent();
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
    Promise.all(shots.map(x => new Promise(ok => { const im = new Image(); im.onload = () => { x.r = im.naturalWidth / im.naturalHeight; ok(); }; im.onerror = ok; im.src = "img/" + x.p + (IMGV ? "?v=" + IMGV : ""); }))).then(() => { if (sel === "wall") fitWall(shots); });
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

/* ---------- every e-mail address copies itself on click ---------- */
document.addEventListener("click", async e => {
  const el = e.target.closest(".mail, .em, #mail"); if (!el) return;
  const addr = el.textContent.trim(); let ok = true;
  try { await navigator.clipboard.writeText(addr); } catch { ok = false; const r = document.createRange(); r.selectNodeContents(el); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); }
  /* a modal dialog sits in the top layer, so the toast goes inside it when one is open */
  const host = el.closest("dialog") || document.body;
  let t = host.querySelector(":scope > .toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); host.appendChild(t); }
  t.textContent = ok ? `메일 주소를 복사했어요 · ${addr}` : `주소를 선택했어요. Ctrl+C로 복사하세요`;
  t.classList.add("on"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("on"), 1800);
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
