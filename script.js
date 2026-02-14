const overWrap = document.getElementById("overWrap");

const totalPages = 9;

const under = document.getElementById("under");
const over = document.getElementById("over");
const counter = document.getElementById("counter");
const fsBtn = document.getElementById("fsBtn");
const hint = document.getElementById("hint");

let currentPage = getInitialPageFromURL();
let animTimer = null;

function pageSrc(n){
  return `pages/page${String(n).padStart(2, "0")}.png`;
}
function clamp(n, min, max){
  return Math.max(min, Math.min(max, n));
}
function getInitialPageFromURL(){
  const url = new URL(window.location.href);
  const p = parseInt(url.searchParams.get("page") || "1", 10);
  return clamp(isNaN(p) ? 1 : p, 1, totalPages);
}
function setURLPage(n){
  const url = new URL(window.location.href);
  url.searchParams.set("page", String(n));
  window.history.replaceState({}, "", url);
}
function saveLastPage(n){
  try { localStorage.setItem("nomu_last_page", String(n)); } catch(e) {}
}
function hideHint(){
  if (hint) hint.style.opacity = 0;
}
function goEnd(){
  window.location.href = "end.html";
}
function preload(n){
  if (n < 1 || n > totalPages) return;
  const im = new Image();
  im.src = pageSrc(n);
}

function renderTo(targetPage, direction){
  if (animTimer) return;

  hideHint();
  if (under) under.src = pageSrc(targetPage);

  if (over){
    over.classList.remove("turn-next","turn-prev");
over.classList.add(direction > 0 ? "turn-next" : "turn-prev");
void over.offsetWidth;

  }

  animTimer = setTimeout(() => {
    currentPage = targetPage;

    if (over){
      over.classList.remove("turn-next","turn-prev");
      over.style.opacity = "";
      over.style.transform = "";
      over.src = pageSrc(currentPage);
    }

    if (counter) counter.textContent = `${currentPage} / ${totalPages}`;
    setURLPage(currentPage);
    saveLastPage(currentPage);

    preload(currentPage + 1);
    preload(currentPage - 1);

    animTimer = null;
  }, 600);
}

function nextPage(){
  if (currentPage >= totalPages) return goEnd();
  renderTo(currentPage + 1, +1);
}
function prevPage(){
  if (currentPage <= 1) return;
  renderTo(currentPage - 1, -1);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextPage();
  if (e.key === "ArrowLeft") prevPage();
});

document.addEventListener("click", (e) => {
  const t = e.target;
  if (t && (t.id === "fsBtn" || t.classList.contains("home"))) return;
  const middle = window.innerWidth / 2;
  e.clientX > middle ? nextPage() : prevPage();
});

let startX = 0;
document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextPage();
  if (endX - startX > 50) prevPage();
}, { passive: true });

if (under && over){
  under.src = pageSrc(currentPage);
  over.src = pageSrc(currentPage);
}
if (counter) counter.textContent = `${currentPage} / ${totalPages}`;
setURLPage(currentPage);
saveLastPage(currentPage);
preload(currentPage + 1);
preload(currentPage - 1);
