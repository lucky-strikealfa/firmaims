// ================= SLIDER =================

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slides');

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

// UPDATE
function updateSlider(){

  slider.style.transform =
  `translateX(-${currentIndex * 100}%)`;

  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  dots[currentIndex].classList.add('active');

}

// NEXT
function nextSlide(){

  currentIndex++;

  if(currentIndex >= slides.length){
    currentIndex = 0;
  }

  updateSlider();

}

// PREV
function prevSlide(){

  currentIndex--;

  if(currentIndex < 0){
    currentIndex = slides.length - 1;
  }

  updateSlider();

}

// BUTTONS
if(nextBtn){
  nextBtn.addEventListener('click', nextSlide);
}

if(prevBtn){
  prevBtn.addEventListener('click', prevSlide);
}

// AUTO
function startAutoSlide(){

  autoSlide = setInterval(() => {
    nextSlide();
  }, 5000);

}

function stopAutoSlide(){

  clearInterval(autoSlide);

}

const heroSlider = document.querySelector('.hero-slider');

if(heroSlider){

  heroSlider.addEventListener(
    'mouseenter',
    stopAutoSlide
  );

  heroSlider.addEventListener(
    'mouseleave',
    startAutoSlide
  );

}

startAutoSlide();

// ================= MOBILE MENU =================

const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');

if(toggle){

  toggle.addEventListener('click', () => {

    menu.classList.toggle('active');
    overlay.classList.toggle('active');

  });

}

function closeMenu(){

  menu.classList.remove('active');
  overlay.classList.remove('active');

}

if(overlay){
  overlay.addEventListener('click', closeMenu);
}

document.querySelectorAll('#menu a')
.forEach(link => {

  link.addEventListener('click', closeMenu);

});

// ================= RESET POSISI =================

window.addEventListener('load', () => {
  window.scrollTo(0,0);
});

// ================= LOAD FOOTER =================

fetch('footer.html')
  .then(response => response.text())
  .then(data => {

    document.getElementById('footer').innerHTML = data;

  })
  .catch(error => {

    console.log('Footer gagal dimuat');

  });
