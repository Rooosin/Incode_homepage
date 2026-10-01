/* ================= research cover scenes =================
   Each scene: make(env) -> { layout(), step(), draw() }.  env = { ctx, W, H, dpr, t, mouse }.
   runScene(canvas, key) sizes the canvas, runs the loop and pauses it when off-screen. */
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const rnd = (a, b) => a + Math.random() * (b - a);
function glowSprite(stops) {
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const g = c.getContext("2d"), r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  stops.forEach(([o, col]) => r.addColorStop(o, col)); g.fillStyle = r; g.fillRect(0, 0, 64, 64); return c;
}
const SPR_ORANGE = glowSprite([[0, "rgba(255,236,190,1)"], [0.12, "rgba(255,190,90,0.9)"], [0.35, "rgba(255,130,20,0.28)"], [1, "rgba(255,90,0,0)"]]);
const SPR_GOLD = glowSprite([[0, "rgba(255,250,220,1)"], [0.15, "rgba(255,214,110,0.85)"], [0.4, "rgba(255,170,40,0.25)"], [1, "rgba(255,140,0,0)"]]);
const SPR_ROSE = glowSprite([[0, "rgba(255,220,220,0.9)"], [0.2, "rgba(255,120,120,0.5)"], [1, "rgba(200,30,40,0)"]]);

const SCENES = {
  /* ---------- 1. Li+ transport in an ASSB composite electrode ---------- */
  energy: { thrust: "Energy Systems", cap: "Li⁺ transport through an all-solid-state battery composite electrode", scale: "10 µm",
    make(E) {
      let parts = [], ions = [];
      function spawn(anywhere) {
        const o = { x: anywhere ? rnd(0, E.W) : rnd(-40, 0), y: rnd(0, E.H), vx: 0, vy: 0, sp: rnd(0.7, 1.8) * E.dpr, tr: [] };
        for (const p of parts) if (Math.hypot(p.x - o.x, p.y - o.y) < p.r + 2 * E.dpr) { o.x = -10; break; }
        return o;
      }
      return {
        layout() {
          const { W, H, dpr } = E; parts = [];
          const s = Math.min(W, H * 1.6), rMin = s * 0.022, rMax = s * 0.075, gap = 7 * dpr;
          for (let k = 0; k < 4000 && parts.length < 140; k++) {
            const r = rMin + Math.pow(Math.random(), 1.8) * (rMax - rMin), x = rnd(-r / 2, W + r / 2), y = rnd(-r / 2, H + r / 2);
            if (parts.every(p => Math.hypot(p.x - x, p.y - y) > p.r + r + gap)) parts.push({ x, y, r, z: rnd(0.35, 1), soc: rnd(0, 0.3), ph: rnd(0, 6.28), hit: 0 });
          }
          ions = Array.from({ length: Math.round(Math.min(560, W * H / (dpr * dpr) / 1900)) }, () => spawn(true));
        },
        step() {
          const { W, H, dpr, t, mouse } = E;
          for (const p of parts) { p.soc = Math.max(0, p.soc - 0.0012); p.hit *= 0.94; }
          for (const o of ions) {
            let tx = o.sp, ty = Math.sin((o.y / H) * 9 + t * 0.01 + o.x * 0.004) * 0.35 * dpr;
            const mx = mouse.x - o.x, my = mouse.y - o.y, md = Math.hypot(mx, my), R = 170 * dpr;
            if (md < R) { const f = (1 - md / R) * 1.6 * dpr; tx += (mx / md) * f - (my / md) * f * 0.6; ty += (my / md) * f + (mx / md) * f * 0.6; }
            o.vx += (tx - o.vx) * 0.08 + rnd(-0.12, 0.12) * dpr; o.vy += (ty - o.vy) * 0.08 + rnd(-0.12, 0.12) * dpr;
            for (const p of parts) {
              const dx = o.x - p.x, dy = o.y - p.y, d = Math.hypot(dx, dy), lim = p.r + 2.5 * dpr;
              if (d < lim + 6 * dpr) {
                const nx = dx / d, ny = dy / d, vn = o.vx * nx + o.vy * ny;
                if (vn < 0) { o.vx -= vn * nx * 1.05; o.vy -= vn * ny * 1.05; }
                if (d < lim) { o.x = p.x + nx * lim; o.y = p.y + ny * lim; }
                if (d < lim + 1.5 * dpr && Math.random() < 0.006) { p.soc = Math.min(1, p.soc + 0.09); p.hit = 1; Object.assign(o, spawn(false)); break; }
              }
            }
            o.x += o.vx; o.y += o.vy; o.tr.push(o.x, o.y); if (o.tr.length > 24) o.tr.splice(0, 2);
            if (o.x > W + 20 || o.y < -30 || o.y > H + 30) Object.assign(o, spawn(false));
          }
        },
        draw() {
          const { ctx, W, H, dpr, t } = E; ctx.clearRect(0, 0, W, H);
          for (const p of parts) {
            const s = p.soc, gl = 0.5 + 0.5 * Math.sin(t * 0.02 + p.ph), d = p.z;
            const g = ctx.createRadialGradient(p.x - p.r * 0.4, p.y - p.r * 0.45, p.r * 0.05, p.x, p.y, p.r * 1.02);
            g.addColorStop(0, `rgba(${92 + 60 * d | 0},${24 + 14 * d | 0},24,${0.5 + 0.4 * d})`); g.addColorStop(0.55, `rgba(${46 + 20 * d | 0},10,12,${0.55 + 0.35 * d})`); g.addColorStop(1, `rgba(20,5,6,${0.7 + 0.25 * d})`);
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fillStyle = g; ctx.fill();
            if (s > 0.02) { const c = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r); c.addColorStop(0, `rgba(255,${150 + 60 * s | 0},40,${0.55 * s})`); c.addColorStop(0.7, `rgba(255,110,20,${0.22 * s})`); c.addColorStop(1, "rgba(255,90,0,0)"); ctx.fillStyle = c; ctx.fill(); }
            ctx.lineWidth = (0.8 + p.hit * 2) * dpr; ctx.strokeStyle = `rgba(255,${140 + 80 * s | 0},70,${(0.1 + 0.1 * gl) * d + 0.35 * s + 0.5 * p.hit})`; ctx.stroke();
          }
          ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
          const sz = 22 * dpr;
          for (const o of ions) {
            const tr = o.tr;
            if (tr.length >= 4) { ctx.beginPath(); ctx.moveTo(tr[0], tr[1]); for (let i = 2; i < tr.length; i += 2) ctx.lineTo(tr[i], tr[i + 1]); ctx.strokeStyle = "rgba(255,140,30,0.28)"; ctx.lineWidth = 1.8 * dpr; ctx.stroke(); }
            ctx.drawImage(SPR_ORANGE, o.x - sz / 2, o.y - sz / 2, sz, sz);
          }
          ctx.globalCompositeOperation = "source-over";
        } };
    } },

  /* ---------- 2. 3D tumor spheroid culture chip with perfusion-driven drug transport ---------- */
  spheroid: { thrust: "Nano-Bio Systems", cap: "3D tumor spheroid culture chip with perfusion-driven drug transport", scale: "200 µm",
    make(E) {
      let rows = [], wells = [], ps = [], G = {};
      function spawn(row, anywhere) {
        return { row, x: anywhere ? rnd(-20, E.W) : rnd(-80, -5), off: rnd(-0.8, 0.8), sp: rnd(0.8, 1.6) * E.dpr, dive: Math.random() < 0.35, ph: rnd(0, 6.28), tr: [] };
      }
      /* drug dose: a concentration pulse travelling down each channel */
      const dose = (x, t) => { const period = 900, v = 2.2 * E.dpr, u = ((t * v - x) % (period * v) + period * v) % (period * v) / (period * v); return Math.exp(-Math.pow((u - 0.18) / 0.12, 2)); };
      return {
        layout() {
          const { W, H, dpr } = E;
          const nRows = H / dpr > 520 ? 3 : 2, band = H * 0.68 / nRows;
          const R = Math.min(band * 0.4, W * 0.07), cw = R * 0.36, pitch = R * 2.7;
          G = { R, cw };
          rows = Array.from({ length: nRows }, (_, i) => H * 0.5 + (i - (nRows - 1) / 2) * band);
          wells = [];
          rows.forEach((y, ri) => {
            for (let x = W * 0.34 + (ri % 2) * pitch * 0.5; x < W + R; x += pitch) {
              const Rs = R * rnd(0.55, 0.64);
              wells.push({ x, y, row: ri, Rs, c: 0, flash: 0, ph: rnd(0, 6.28) });
            }
          });
          ps = [];
          rows.forEach((y, ri) => { for (let i = 0; i < 70; i++) ps.push(spawn(ri, true)); });
        },
        step() {
          const { W, dpr, t, mouse } = E, { R, cw } = G;
          for (const w of wells) { w.c += (dose(w.x, t) - w.c) * 0.02; w.flash *= 0.94; }
          for (const p of ps) {
            const y0 = rows[p.row];
            p.x += p.sp;
            let y = y0 + p.off * cw * 0.8 + Math.sin(p.x * 0.02 / dpr + p.ph) * cw * 0.12;
            if (p.dive) for (const w of wells) {
              if (w.row !== p.row) continue;
              const dx = p.x - w.x;
              if (Math.abs(dx) < R * 0.95) {                                      // recirculating path through the well
                const dip = Math.sqrt(Math.max(0, (R * 0.82) ** 2 - dx * dx));
                y = y0 + Math.sign(p.off || 1) * dip;
                const d = Math.hypot(dx, y - w.y);
                if (d < w.Rs * 1.08 && Math.random() < 0.05) {                   // uptake at the spheroid surface
                  w.flash = Math.min(1, w.flash + 0.5);
                  Object.assign(p, spawn(p.row, false)); break;
                }
              }
            }
            const mx = mouse.x - p.x, my = mouse.y - y, md = Math.hypot(mx, my);
            if (md < 110 * dpr) y -= (my / md) * (1 - md / (110 * dpr)) * 18 * dpr;
            p.y = y; p.tr.push(p.x, y); if (p.tr.length > 18) p.tr.splice(0, 2);
            if (p.x > W + 20) Object.assign(p, spawn(p.row, false));
          }
        },
        draw() {
          const { ctx, W, H, dpr, t } = E, { R, cw } = G;
          ctx.clearRect(0, 0, W, H);
          /* chip: channels with circular culture wells (outline = expanded union, then interior) */
          const union = (grow) => { ctx.beginPath(); for (const y of rows) ctx.rect(-10, y - cw - grow, W + 20, (cw + grow) * 2); for (const w of wells) { ctx.moveTo(w.x + R + grow, w.y); ctx.arc(w.x, w.y, R + grow, 0, 6.2832); } };
          ctx.save(); ctx.shadowColor = "rgba(255,110,50,0.55)"; ctx.shadowBlur = 14 * dpr; ctx.fillStyle = "rgba(255,150,100,0.5)"; union(1.6 * dpr); ctx.fill("nonzero"); ctx.restore();
          ctx.fillStyle = "#1c0a0b"; union(0); ctx.fill("nonzero");
          /* flow streaks in the channels */
          ctx.strokeStyle = "rgba(255,150,110,0.07)"; ctx.lineWidth = 1 * dpr; ctx.setLineDash([16 * dpr, 22 * dpr]); ctx.lineDashOffset = -t * 1.3 * dpr;
          for (const y of rows) for (const k of [-0.5, 0, 0.5]) { ctx.beginPath(); ctx.moveTo(0, y + k * cw); ctx.lineTo(W, y + k * cw); ctx.stroke(); }
          ctx.setLineDash([]);
          /* drug concentration halo inside each well */
          for (const w of wells) {
            const g = ctx.createRadialGradient(w.x, w.y, w.Rs * 0.7, w.x, w.y, R);
            g.addColorStop(0, `rgba(255,140,40,${0.05 + 0.22 * w.c})`); g.addColorStop(1, `rgba(255,140,40,${0.02 + 0.08 * w.c})`);
            ctx.beginPath(); ctx.arc(w.x, w.y, R - 1, 0, 6.2832); ctx.fillStyle = g; ctx.fill();
          }
          /* spheroids: smooth spheres, brighter outer shell where the drug arrives */
          for (const w of wells) {
            const r = w.Rs * (1 + 0.025 * Math.sin(t * 0.02 + w.ph)), k = Math.min(1, 0.6 * w.c + w.flash);
            const g = ctx.createRadialGradient(w.x - r * 0.35, w.y - r * 0.4, r * 0.05, w.x, w.y, r);
            g.addColorStop(0, `rgba(${150 + 90 * k | 0},${60 + 70 * k | 0},${50 + 20 * k | 0},0.95)`);
            g.addColorStop(0.6, `rgba(${90 + 60 * k | 0},${24 + 30 * k | 0},${28},0.95)`);
            g.addColorStop(1, `rgba(${50 + 40 * k | 0},${12 + 10 * k | 0},16,0.95)`);
            ctx.beginPath(); ctx.arc(w.x, w.y, r, 0, 6.2832); ctx.fillStyle = g; ctx.fill();
            ctx.lineWidth = (1.2 + 2 * w.flash) * dpr; ctx.strokeStyle = `rgba(255,${170 + 50 * k | 0},90,${0.25 + 0.6 * k})`; ctx.stroke();
            if (k > 0.05) { const s2 = r * 3.2; ctx.globalCompositeOperation = "lighter"; ctx.globalAlpha = 0.35 * k; ctx.drawImage(SPR_ORANGE, w.x - s2 / 2, w.y - s2 / 2, s2, s2); ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over"; }
          }
          /* drug / nutrient particles */
          ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
          const sz = 16 * dpr;
          for (const p of ps) {
            const tr = p.tr, a = 0.35 + 0.65 * dose(p.x, t);
            if (tr.length >= 4) { ctx.beginPath(); ctx.moveTo(tr[0], tr[1]); for (let i = 2; i < tr.length; i += 2) ctx.lineTo(tr[i], tr[i + 1]); ctx.strokeStyle = `rgba(255,150,40,${0.22 * a})`; ctx.lineWidth = 1.6 * dpr; ctx.stroke(); }
            ctx.globalAlpha = a; ctx.drawImage(SPR_ORANGE, p.x - sz / 2, p.y - sz / 2, sz, sz);
          }
          ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
        } };
    } },

  /* ---------- 3. Au nanohole array: LSPR hot spots ---------- */
  plasmonic: { thrust: "Nano-Bio Systems", cap: "Au nanohole array under illumination, with plasmonic hot spots", scale: "500 nm",
    make(E) {
      let holes = [], rings = [], a = 50, hr = 15;
      const K = () => 6.2832 / (E.W * 0.42), OM = 0.022;
      return {
        layout() {
          const { W, H, dpr } = E; a = Math.max(46 * dpr, W / 30); hr = a * 0.3; holes = []; rings = [];
          for (let j = -1, row = 0; j * a * 0.866 < H + a; j++, row++)
            for (let i = -1; i * a < W + a; i++) holes.push({ x: i * a + (row % 2 ? a / 2 : 0), y: j * a * 0.866, prev: 0 });
        },
        step() {
          const { t, mouse, dpr } = E, k = K();
          for (const h of holes) {
            const ph = k * (h.x * 0.94 + h.y * 0.34) - OM * t;
            let I = Math.pow(Math.max(0, Math.cos(ph)), 10);
            const md = Math.hypot(mouse.x - h.x, mouse.y - h.y); if (md < 160 * dpr) I = Math.max(I, 1 - md / (160 * dpr));
            if (I > 0.92 && h.prev <= 0.92 && Math.random() < 0.35 && rings.length < 90) rings.push({ x: h.x, y: h.y, r: hr, a: 0.5 });
            h.prev = I; h.I = I;
          }
          for (const r of rings) { r.r += 1.1 * dpr; r.a *= 0.965; }
          rings = rings.filter(r => r.a > 0.02);
        },
        draw() {
          const { ctx, W, H, dpr, t } = E, k = K();
          ctx.clearRect(0, 0, W, H);
          /* incident wavefronts */
          ctx.save(); ctx.globalCompositeOperation = "lighter";
          const n = Math.hypot(0.94, 0.34), dx = 0.94 / n, dy = 0.34 / n, lamPx = 6.2832 / k / n;
          const base = (OM * t) / k / n;
          for (let s = -2; s < (W + H) / lamPx + 2; s++) {
            const d = base + s * lamPx, cx = dx * d, cy = dy * d;
            const g = ctx.createLinearGradient(cx - dx * lamPx * 0.25, cy - dy * lamPx * 0.25, cx + dx * lamPx * 0.25, cy + dy * lamPx * 0.25);
            g.addColorStop(0, "rgba(255,170,60,0)"); g.addColorStop(0.5, "rgba(255,170,60,0.07)"); g.addColorStop(1, "rgba(255,170,60,0)");
            ctx.fillStyle = g; ctx.beginPath();
            ctx.moveTo(cx - dy * 4000 - dx * lamPx * 0.25, cy + dx * 4000 - dy * lamPx * 0.25); ctx.lineTo(cx + dy * 4000 - dx * lamPx * 0.25, cy - dx * 4000 - dy * lamPx * 0.25);
            ctx.lineTo(cx + dy * 4000 + dx * lamPx * 0.25, cy - dx * 4000 + dy * lamPx * 0.25); ctx.lineTo(cx - dy * 4000 + dx * lamPx * 0.25, cy + dx * 4000 + dy * lamPx * 0.25); ctx.fill();
          }
          ctx.restore();
          /* gold film holes */
          for (const h of holes) {
            const g = ctx.createRadialGradient(h.x, h.y, hr * 0.2, h.x, h.y, hr);
            g.addColorStop(0, "rgba(8,3,3,0.95)"); g.addColorStop(1, "rgba(30,10,8,0.95)");
            ctx.beginPath(); ctx.arc(h.x, h.y, hr, 0, 6.2832); ctx.fillStyle = g; ctx.fill();
            ctx.lineWidth = 1.4 * dpr; ctx.strokeStyle = `rgba(255,200,110,${0.16 + 0.5 * h.I})`; ctx.stroke();
          }
          ctx.globalCompositeOperation = "lighter";
          for (const r of rings) { ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 6.2832); ctx.strokeStyle = `rgba(255,190,90,${r.a * 0.6})`; ctx.lineWidth = 1.2 * dpr; ctx.stroke(); }
          for (const h of holes) if (h.I > 0.05) {
            const s = (14 + 26 * h.I) * dpr;
            ctx.globalAlpha = h.I; ctx.drawImage(SPR_GOLD, h.x - hr - s / 2, h.y - s / 2, s, s); ctx.drawImage(SPR_GOLD, h.x + hr - s / 2, h.y - s / 2, s, s);
          }
          ctx.globalAlpha = 1; ctx.globalCompositeOperation = "source-over";
        } };
    } },

  /* ---------- 4. Physics-informed neural network ---------- */
  neural: { thrust: "Intelligent Systems Engineering", cap: "Physics-informed neural network learning a multiphysics battery model", scale: "PINN",
    make(E) {
      let L = [], edges = [], pulses = [];
      const SIZES = [4, 8, 11, 11, 8, 3];
      function fire(n) { const out = edges.filter(e => e.a === n); for (let i = 0; i < 2; i++) { const e = out[Math.random() * out.length | 0]; if (e) pulses.push({ e, u: 0, sp: rnd(0.012, 0.022) }); } }
      return {
        layout() {
          const { W, H } = E, x0 = W * 0.4, x1 = W * 0.93;
          L = SIZES.map((n, li) => Array.from({ length: n }, (_, k) => ({ li, bx: x0 + (x1 - x0) * li / (SIZES.length - 1), by: H * 0.5 + (k - (n - 1) / 2) * Math.min(H * 0.07, H * 0.7 / n), ph: rnd(0, 6.28), act: 0 })));
          edges = []; for (let li = 0; li < L.length - 1; li++) for (const a of L[li]) for (const b of L[li + 1]) edges.push({ a, b, w: rnd(-1, 1) });
          pulses = [];
        },
        step() {
          const { t, dpr, mouse } = E;
          for (const ly of L) for (const n of ly) { n.x = n.bx + Math.sin(t * 0.008 + n.ph) * 4 * dpr; n.y = n.by + Math.cos(t * 0.011 + n.ph) * 5 * dpr; n.act *= 0.95;
            if (Math.hypot(mouse.x - n.x, mouse.y - n.y) < 90 * dpr && Math.random() < 0.08) { n.act = 1; fire(n); } }
          if (t % 7 === 0) { const n = L[0][Math.random() * L[0].length | 0]; n.act = 1; fire(n); }
          for (const p of pulses) { p.u += p.sp; if (p.u >= 1) { p.done = true; p.e.b.act = Math.min(1, p.e.b.act + 0.45); if (Math.random() < 0.5 && pulses.length < 260) fire(p.e.b); } }
          pulses = pulses.filter(p => !p.done);
          for (const e of edges) e.w += rnd(-0.004, 0.004);
        },
        draw() {
          const { ctx, W, H, dpr, t } = E; ctx.clearRect(0, 0, W, H);
          /* input fields: scrolling waves feeding the input layer */
          ctx.lineWidth = 1.2 * dpr;
          for (const n of L[0]) {
            ctx.beginPath();
            for (let x = W * 0.08; x <= n.x; x += 6 * dpr) { const y = n.y + Math.sin(x * 0.02 / dpr - t * 0.05 + n.ph) * 10 * dpr * (1 - (x - W * 0.08) / (n.x - W * 0.08 + 1)); x === W * 0.08 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
            ctx.strokeStyle = "rgba(255,160,80,0.16)"; ctx.stroke();
          }
          for (const e of edges) { ctx.beginPath(); ctx.moveTo(e.a.x, e.a.y); ctx.lineTo(e.b.x, e.b.y); ctx.strokeStyle = e.w > 0 ? `rgba(255,150,60,${0.03 + 0.08 * Math.abs(e.w)})` : `rgba(230,70,80,${0.03 + 0.08 * Math.abs(e.w)})`; ctx.lineWidth = (0.5 + Math.abs(e.w)) * dpr; ctx.stroke(); }
          for (const n of L[L.length - 1]) { const g = ctx.createLinearGradient(n.x, 0, W, 0); g.addColorStop(0, `rgba(255,170,80,${0.15 + 0.5 * n.act})`); g.addColorStop(1, "rgba(255,170,80,0)"); ctx.strokeStyle = g; ctx.lineWidth = 2 * dpr; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(W, n.y); ctx.stroke(); }
          ctx.globalCompositeOperation = "lighter";
          for (const p of pulses) { const x = p.e.a.x + (p.e.b.x - p.e.a.x) * p.u, y = p.e.a.y + (p.e.b.y - p.e.a.y) * p.u, s = 16 * dpr; ctx.drawImage(SPR_ORANGE, x - s / 2, y - s / 2, s, s); }
          ctx.globalCompositeOperation = "source-over";
          for (const ly of L) for (const n of ly) {
            const r = (5 + 3 * n.act) * dpr;
            ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 6.2832); ctx.fillStyle = `rgb(${40 + 215 * n.act | 0},${12 + 150 * n.act | 0},${14 + 40 * n.act | 0})`; ctx.fill();
            ctx.strokeStyle = `rgba(255,190,120,${0.35 + 0.5 * n.act})`; ctx.lineWidth = 1.2 * dpr; ctx.stroke();
            if (n.act > 0.3) { const s = 40 * n.act * dpr; ctx.globalCompositeOperation = "lighter"; ctx.drawImage(SPR_ORANGE, n.x - s / 2, n.y - s / 2, s, s); ctx.globalCompositeOperation = "source-over"; }
          }
        } };
    } }
};

function runScene(cv, key) {
  const E = { ctx: cv.getContext("2d"), W: 0, H: 0, dpr: 1, t: 0, mouse: { x: -1e4, y: -1e4 } };
  let sc = SCENES[key].make(E), active = true, visible = true, running = false;
  function layout() {
    E.dpr = Math.min(devicePixelRatio || 1, 2); E.W = Math.round(cv.clientWidth * E.dpr); E.H = Math.round(cv.clientHeight * E.dpr);
    if (!E.W || !E.H) return;
    cv.width = E.W; cv.height = E.H; sc.layout();
    for (let i = 0; i < 140; i++) { E.t++; sc.step(); } sc.draw();
  }
  function loop() { if (!(active && visible) || RM) { running = false; return; } E.t++; sc.step(); sc.draw(); requestAnimationFrame(loop); }
  function kick() { if (!E.W) layout(); if (!running && active && visible && !RM && E.W) { running = true; requestAnimationFrame(loop); } }
  const host = cv.parentElement;
  host.addEventListener("pointermove", e => { const r = cv.getBoundingClientRect(); E.mouse.x = (e.clientX - r.left) * E.dpr; E.mouse.y = (e.clientY - r.top) * E.dpr; }, { passive: true });
  host.addEventListener("pointerleave", () => { E.mouse.x = E.mouse.y = -1e4; });
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(layout, 150); });
  new IntersectionObserver(es => { visible = es[0].isIntersecting; kick(); }).observe(cv);
  document.addEventListener("visibilitychange", () => { visible = !document.hidden; kick(); });
  layout(); kick();
  return {
    setActive(on) { active = on; kick(); },
    swap(k) { key = k; sc = SCENES[k].make(E); E.t = 0; layout(); kick(); },
    get key() { return key; }
  };
}
