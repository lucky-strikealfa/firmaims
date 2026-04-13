function scrollToForm(){
  document.getElementById("kontak").scrollIntoView({
    behavior:"smooth"
  });
}

document.getElementById("form").addEventListener("submit", function(e){
  e.preventDefault();
  document.getElementById("msg").innerText = "Pesan berhasil dikirim!";
});

let index = 0;
const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const total = slideItems.length;
const dotsContainer = document.querySelector(".dots");

let interval;

// DOTS
slideItems.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.onclick = () => {
    index = i;
    showSlide();
  };
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dots span");

function showSlide(){
  slides.style.transform = `translateX(-${index * 100}%)`;

  // HAPUS semua active
  slideItems.forEach(slide => slide.classList.remove("active"));

  // TAMBAH active ke slide sekarang
  slideItems[index].classList.add("active");

  // DOTS
  dots.forEach(d => d.classList.remove("active"));
  if(dots[index]) dots[index].classList.add("active");
}

function next(){
  index = (index + 1) % total;
  showSlide();
}

function prev(){
  index = (index - 1 + total) % total;
  showSlide();
}

// AUTO
function start(){
  interval = setInterval(next, 4000);
}

function stop(){
  clearInterval(interval);
}

start();

// BUTTON
document.querySelector(".next").onclick = next;
document.querySelector(".prev").onclick = prev;

// HOVER STOP
const slider = document.querySelector(".hero-slider");
slider.addEventListener("mouseenter", stop);
slider.addEventListener("mouseleave", start);

// INIT
showSlide();


// ================= MENU HAMBURGER =================
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
});

// klik luar = tutup
overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  overlay.classList.remove("active");
});

// ================= ANIMASI SCROLL =================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".card, .tentang, form, h2").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});
