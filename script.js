// ================= SLIDER =================
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dotsContainer = document.querySelector('.dots');

let currentIndex = 0;
let autoSlide;

// CREATE DOTS
slides.forEach((_, index) => {
  const dot = document.createElement('span');

  if(index === 0){
    dot.classList.add('active');
  }

  dot.addEventListener('click', () => {
    currentIndex = index;
    updateSlider();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dots span');

// UPDATE SLIDER
function updateSlider(){

  document.querySelector('.slides').style.transform =
    `translateX(-${currentIndex * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));

  dots[currentIndex].classList.add('active');
}

// NEXT
function nextSlide(){
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

// PREV
function prevSlide(){
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

// BUTTON
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// AUTO SLIDE
function startAutoSlide(){
  autoSlide = setInterval(nextSlide, 4000);
}

function stopAutoSlide(){
  clearInterval(autoSlide);
}

document.querySelector('.hero-slider')
.addEventListener('mouseenter', stopAutoSlide);

document.querySelector('.hero-slider')
.addEventListener('mouseleave', startAutoSlide);

startAutoSlide();

// ================= MOBILE MENU =================
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');

toggle.addEventListener('click', () => {

  menu.classList.toggle('active');
  overlay.classList.toggle('active');

});

// CLOSE MENU
function closeMenu(){

  menu.classList.remove('active');
  overlay.classList.remove('active');

}

overlay.addEventListener('click', closeMenu);

document.querySelectorAll('#menu a').forEach(link => {

  link.addEventListener('click', closeMenu);

});

// ================= RESET POSISI =================
window.addEventListener('load', () => {
  window.scrollTo(0,0);
});
