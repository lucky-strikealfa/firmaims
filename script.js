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

// CREATE DOTS
slideItems.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => {
    index = i;
    showSlide();
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dots span");

function showSlide(){
  slides.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");

  // reset animasi
  slideItems.forEach(s => {
    s.querySelector(".caption").style.animation = "none";
  });

  setTimeout(()=>{
    slideItems[index].querySelector(".caption").style.animation = "fadeUp 1s ease";
  },50);
}

function next(){
  index = (index + 1) % total;
  showSlide();
}

function prev(){
  index = (index - 1 + total) % total;
  showSlide();
}

// AUTO SLIDE
function startAuto(){
  interval = setInterval(next, 5000);
}

function stopAuto(){
  clearInterval(interval);
}

startAuto();

// BUTTON
document.querySelector(".next").onclick = next;
document.querySelector(".prev").onclick = prev;

// PAUSE HOVER
document.querySelector(".hero-slider").addEventListener("mouseenter", stopAuto);
document.querySelector(".hero-slider").addEventListener("mouseleave", startAuto);

// INIT
showSlide();
