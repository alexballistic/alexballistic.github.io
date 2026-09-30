function mediaCard(src) {
  const a = document.createElement("a");
  a.href = src;
  a.target = "_blank";
  a.rel = "noopener";
  if (/\.(mp4|webm|mov)$/i.test(src)) {
    const v = document.createElement("video");
    v.src = src;
    v.controls = true;
    v.preload = "metadata";
    a.appendChild(v);
  } else {
    const img = document.createElement("img");
    img.src = src;
    img.loading = "lazy";
    img.alt = src.split("/").pop();
    a.appendChild(img);
  }
  const cap = document.createElement("div");
  cap.className = "cap";
  cap.textContent = src.split("/").pop();
  a.appendChild(cap);
  return a;
}

async function initGallery(id, manifest, folder) {
  const el = document.getElementById(id);
  if (!el) return;
  const files = await fetchJSON(manifest, []);
  el.innerHTML = "";
  if (!files.length) el.innerHTML = `<p>Nothing here yet! Drop files into ${folder}!</p>`;
  files.forEach(f => el.appendChild(mediaCard(f)));
}

async function initLogs() {
  const list = document.getElementById("logsList");
  if (!list) return;
  const files = await fetchJSON("data/logs.json", []);
  list.innerHTML = "";
  if (!files.length) list.innerHTML = "<p>No logs yet!</p>";
  for (const f of files) {
    const div = document.createElement("div");
    div.className = "log-entry";
    div.innerHTML = `<h3>${esc(f.title || f.src)}</h3>` + richText(await fetchText(f.src, ""));
    list.appendChild(div);
  }
}

async function initPhotography() {
  const dates = document.getElementById("photoDates");
  const view = document.getElementById("photoView");
  if (!dates || !view) return;
  const entries = await fetchJSON("data/photos.json", []);
  dates.innerHTML = "";
  view.innerHTML = "";
  if (!entries.length) view.innerHTML = "<p>No photos yet!</p>";
  function show(i) {
    [...dates.children].forEach((b, k) => b.classList.toggle("active", k === i));
    const e = entries[i];
    view.innerHTML = `<div class="photo-entry"><h3 style="margin-top:0">${esc(e.date)}</h3>`
      + richText(e.text || "")
      + (e.photos || []).map(p => `<a href="${p}" target="_blank" rel="noopener"><img class="photo" src="${p}" loading="lazy"></a>`).join("")
      + `</div>`;
  }
  entries.forEach((e, i) => {
    const b = document.createElement("button");
    b.textContent = e.date;
    b.addEventListener("click", () => show(i));
    dates.appendChild(b);
  });
  if (entries.length) show(0);
}

async function initLinks() {
  const el = document.getElementById("linksList");
  if (!el) return;
  const data = await fetchJSON("content/links.json", []);
  el.innerHTML = "";
  data.forEach(section => {
    const div = document.createElement("div");
    div.className = "link-section";
    div.innerHTML = `<h3 style="margin-top:0">${esc(section.section)}</h3>` + section.items.map(it =>
      `<div class="link-row">${it.icon ? `<img src="${it.icon}" alt="">` : ""}<a href="${it.url}" target="_blank" rel="noopener">${esc(it.label)}</a></div>`
    ).join("");
    el.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initGallery("drawingsGallery", "data/drawings.json", "content/drawings/");
  initGallery("comicsGallery", "data/comics.json", "content/comics/");
  initLogs();
  initPhotography();
  initLinks();
});
