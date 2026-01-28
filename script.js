const totalPages = 9;

const img = document.getElementById("page");
const counter = document.getElementById("counter");
const fsBtn = document.getElementById("fsBtn");

const LAST_PAGE_KEY = "nomu_last_page";

let currentPage = getInitialPageFromURL();

// --- helpers ---
function pageSrc(n){
  return `pages/page${String(n).padStart(2, "0")}.png`;
}
function clamp(n, min, max){
  return Math.max(min, Math.min(max, n));
}
function setURLPage(n){
  const url = new URL(window.location.href);
  url.searchParams.set("page", String(n));
  window.history.replaceState({}, "", url);
}
function getInitialPageFromURL(){
  const url = new URL(window.location.href);
  const p = parseInt(url.searchParams.get("page") || "1", 10);
  return clamp(isNaN(p) ? 1 : p, 1, totalPages);
}
function preload(n){
  if (n < 1 || n > totalPages) return;
  const pre = new Image();
  pre.src = pageSrc(n);
}
function saveLastPage(n){
  try { localStorage.setItem(LAST_PAGE_KEY, String(n)); } catch(e) {}
}

function goEnd(){
  window.location.href = "end.html";
}

// --- render ---
function render(direction = 1){
  saveLastPage(currentPage);

  counter.textContent = `${currentPage} / ${totalPages}`;
  setURLPage(currentPage);

  preload(currentPage + 1);
  preload(currentPage - 1);

  img.style.opacity = 0;
  img.style.transform = `translateX(${direction * 55}px) rotateY(${direction * -12}deg)`;

  setTimeout(() => {
    img.classList.add("is-turning");

    img.src = pageSrc(currentPage);
    img.onload = () => {
      img.style.transform = "translateX(0) rotateY(0deg)";
      img.style.opacity = 1;
    };
  }, 160);
}

function nextPage(){
  if (currentPage >= totalPages) return goEnd();
  currentPage++;
  render(1);
}

function prevPage(){
  if (currentPage <= 1) return;
  currentPage--;
  render(-1);
}

// --- inputs ---
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextPage();
  if (e.key === "ArrowLeft") prevPage();
  if (e.key.toLowerCase() === "f") toggleFullscreen();
});

document.addEventListener("click", (e) => {
  const t = e.target;
  if (t && (t.id === "fsBtn" || t.id === "homeBtn")) return;

  const middle = window.innerWidth / 2;
  e.clientX > middle ? nextPage() : prevPage();
});

// swipe
let startX = 0;
document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextPage();
  if (endX - startX > 50) prevPage();
}, { passive: true });

// fullscreen
function toggleFullscreen(){
  if (!document.fullscreenElement){
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}
fsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleFullscreen();
});

// init
img.classList.add("is-turning");

img.src = pageSrc(currentPage);
counter.textContent = `${currentPage} / ${totalPages}`;
preload(currentPage + 1);
preload(currentPage - 1);
setURLPage(currentPage);
saveLastPage(currentPage);
