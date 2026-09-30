async function fetchText(url, fallback = "") {
  try {
    const r = await fetch(url);
    if (!r.ok) throw 0;
    return await r.text();
  } catch { return fallback; }
}

async function fetchJSON(url, fallback) {
  try {
    const r = await fetch(url);
    if (!r.ok) throw 0;
    return await r.json();
  } catch { return fallback; }
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function richText(text) {
  let html = "";
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    const m = t.match(/^\[img:(.+?)\]$/i);
    if (m) {
      const src = m[1].trim();
      html += `<a href="${src}" target="_blank" rel="noopener"><img style="max-width:100%;border-radius:8px" src="${src}" loading="lazy"></a>`;
      continue;
    }
    html += `<p>${esc(t).replace(/\(([a-z0-9_\-]+\.(gif|png|jpg|jpeg))\)/gi, '<img class="inline-sprite" src="assets/sprites/$1" alt="$1" loading="lazy">')}</p>`;
  }
  return html || "<p>(empty)</p>";
}

async function initBanner() {
  const track = document.getElementById("bannerTrack");
  const dots = document.getElementById("bannerDots");
  if (!track) return;
  const banners = await fetchJSON("content/banners.json", []);
  if (!banners.length) return;
  track.innerHTML = "";
  dots.innerHTML = "";
  banners.forEach((b, i) => {
    const slide = document.createElement("div");
    slide.className = "banner-slide";
    const a = document.createElement("a");
    a.href = b.link || "#";
    if ((b.link || "").startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
    const img = document.createElement("img");
    img.src = b.src;
    img.alt = b.alt || ("banner " + (i + 1));
    a.appendChild(img);
    slide.appendChild(a);
    track.appendChild(slide);
    const d = document.createElement("button");
    d.setAttribute("aria-label", "banner " + (i + 1));
    d.addEventListener("click", () => show(i));
    dots.appendChild(d);
  });
  let idx = parseInt(localStorage.getItem("banner-idx") || "0", 10) || 0;
  function show(n) {
    idx = ((n % banners.length) + banners.length) % banners.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    [...dots.children].forEach((d, k) => d.classList.toggle("active", k === idx));
    localStorage.setItem("banner-idx", String(idx));
  }
  document.getElementById("bannerPrev")?.addEventListener("click", () => show(idx - 1));
  document.getElementById("bannerNext")?.addEventListener("click", () => show(idx + 1));
  show(idx);
}

async function initMarquee() {
  const el = document.getElementById("marqueeInner");
  if (!el) return;
  const txt = (await fetchText("content/scrolling.txt", "Welcome!")).replace(/\s+/g, " ").trim();
  el.textContent = "";
  const a = document.createElement("span");
  a.textContent = txt;
  const b = document.createElement("span");
  b.textContent = txt;
  b.setAttribute("aria-hidden", "true");
  el.append(a, b);
  const now = Date.now();
  let t0 = parseFloat(sessionStorage.getItem("marquee-t0") || "0");
  if (!t0 || now - t0 > 3600e3) {
    t0 = now;
    try { sessionStorage.setItem("marquee-t0", String(t0)); } catch {}
  }
  requestAnimationFrame(() => {
    const dur = Math.max(15, (el.scrollWidth / 2) / 50);
    el.style.animationDuration = dur + "s";
    el.style.animationDelay = (-(((Date.now() - t0) / 1000) % dur)) + "s";
  });
}

async function initSplash() {
  const el = document.getElementById("splash");
  if (!el) return;
  const pool = (await fetchText("content/splashes.txt", "to my super cool website!"))
    .split("\n").map(s => s.trim()).filter(Boolean);
  if (!pool.length) return;
  el.textContent = pool[Math.floor(Math.random() * pool.length)];
}

async function initStatus() {
  const dateEl = document.getElementById("statusDate");
  const textEl = document.getElementById("statusText");
  if (!dateEl || !textEl) return;
  const list = await fetchJSON("content/statuses.json", []);
  if (!list.length) { textEl.textContent = "no statuses yet!"; return; }
  const latest = list[0];
  const d = new Date(latest.date + "T00:00:00Z");
  dateEl.textContent = (isNaN(d) ? latest.date : d.toLocaleDateString("en-US", { timeZone: "UTC" })) + " - " + (latest.time || "12:00 am");
  textEl.textContent = latest.text;
  const arch = document.getElementById("statusArchive");
  if (arch) {
    arch.innerHTML = "";
    list.forEach(s => {
      const div = document.createElement("div");
      div.className = "log-entry";
      div.innerHTML = `<h3>${esc(s.date)}${s.time ? " - " + esc(s.time) : ""}</h3><p>${esc(s.text)}</p>`;
      arch.appendChild(div);
    });
  }
}

function initPlant() {
  const box = document.getElementById("plantBox");
  const count = document.getElementById("plantCount");
  const plant = document.getElementById("plantImg");
  if (!box || !count || !plant) return;
  const key = "plant-water-" + new Date().toISOString().slice(0, 10);
  const get = () => parseInt(localStorage.getItem(key) || "0", 10) || 0;
  const render = () => {
    const n = get();
    count.innerHTML = n === 0 ? "click the plant<br>to water it!" : `watered ${n} time${n === 1 ? "" : "s"} today`;
  };
  plant.addEventListener("click", () => {
    localStorage.setItem(key, String(get() + 1));
    render();
    box.classList.remove("watering");
    void box.offsetWidth;
    box.classList.add("watering");
    setTimeout(() => box.classList.remove("watering"), 950);
  });
  render();
}

async function initSimpleText() {
  for (const [id, file] of [["aboutText", "content/about.txt"], ["otherText", "content/other.txt"]]) {
    const el = document.getElementById(id);
    if (!el) continue;
    const t = await fetchText(file, "");
    if (t.trim()) el.innerHTML = richText(t);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initBanner();
  initMarquee();
  initSplash();
  initStatus();
  initPlant();
  initSimpleText();
});
