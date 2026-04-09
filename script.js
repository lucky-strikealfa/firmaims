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
