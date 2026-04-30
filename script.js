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

  slideItems.forEach(slide => slide.classList.remove("active"));

  slideItems[index].classList.add("active");

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

function start(){
  interval = setInterval(next, 4000);
}

function stop(){
  clearInterval(interval);
}

start();

document.querySelector(".next").onclick = next;
document.querySelector(".prev").onclick = prev;

const slider = document.querySelector(".hero-slider");
slider.addEventListener("mouseenter", stop);
slider.addEventListener("mouseleave", start);

showSlide();

// ================= MENU MOBILE =================
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const overlay = document.getElementById("overlay");

// OPEN MENU
if(toggle && menu && overlay){

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");

    // animasi body biar tidak scroll
    document.body.style.overflow = menu.classList.contains("active") ? "hidden" : "auto";
  });

  // CLOSE via overlay
  overlay.addEventListener("click", () => {
    closeMenu();
  });

  // CLOSE saat klik link
  document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  function closeMenu(){
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

window.addEventListener("scroll", () => {
  if(menu.classList.contains("active")){
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});
