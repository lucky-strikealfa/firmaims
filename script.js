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

/* =========================================================
   FOOTER MODERN FIX
========================================================= */

.footer-modern{
  background:#0f172a;
  color:#fff;
  padding:80px 20px 25px;
}

.footer-grid{
  display:grid;
  grid-template-columns:
  1.2fr
  1fr
  1.2fr;

  gap:50px;

  padding-bottom:50px;

  border-bottom:
  1px solid rgba(255,255,255,.08);
}

/* =========================================================
   FOOTER BRAND
========================================================= */

.footer-brand{
  display:flex;
  flex-direction:column;
  gap:20px;
}

.footer-logo{
  display:flex;
  align-items:center;
  gap:14px;
}

.footer-logo img{
  width:58px;
  height:58px;
  object-fit:contain;
}

.footer-logo h3{
  font-size:20px;
  font-weight:700;
  line-height:1.2;
}

.footer-logo span{
  font-size:14px;
  color:#94a3b8;
}

.footer-brand h4{
  font-size:16px;
  line-height:1.7;
  color:#e2e8f0;
  font-weight:500;
}

/* =========================================================
   SOCIAL
========================================================= */

.socials{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
}

.socials a{
  width:44px;
  height:44px;

  border-radius:14px;

  display:flex;
  align-items:center;
  justify-content:center;

  background:rgba(255,255,255,.06);

  color:#fff;

  transition:.3s ease;
}

.socials a:hover{
  transform:translateY(-4px);

  background:#2563eb;
}

/* =========================================================
   ADDRESS
========================================================= */

.footer-address{
  display:flex;
  flex-direction:column;
  gap:22px;
}

.footer-address p{
  color:#cbd5e1;
  line-height:1.9;
  font-size:15px;
}

.footer-address strong{
  color:#fff;
}

/* =========================================================
   FOOTER LINKS
========================================================= */

.footer-links{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:30px;
}

.footer-links h4{
  color:#fff;
  margin-bottom:18px;
  font-size:17px;
}

.footer-links div{
  display:flex;
  flex-direction:column;
}

.footer-links a{
  color:#cbd5e1;
  text-decoration:none;

  margin-bottom:12px;

  font-size:15px;

  transition:.3s ease;
}

.footer-links a:hover{
  color:#60a5fa;
  transform:translateX(4px);
}

/* =========================================================
   FOOTER BOTTOM
========================================================= */

.footer-bottom{
  padding-top:22px;

  text-align:center;

  color:#94a3b8;

  font-size:14px;
}

/* =========================================================
   MOBILE FOOTER
========================================================= */

@media screen and (max-width:1024px){

  .footer-grid{
    grid-template-columns:1fr;
    gap:45px;
  }

}

@media screen and (max-width:768px){

  .footer-modern{
    padding:65px 20px 25px;
  }

  .footer-grid{
    gap:40px;
  }

  .footer-logo{
    justify-content:center;
    text-align:left;
  }

  .footer-brand{
    text-align:center;
    align-items:center;
  }

  .socials{
    justify-content:center;
  }

  .footer-address{
    text-align:center;
  }

  .footer-links{
    grid-template-columns:1fr;
    gap:30px;

    text-align:center;
  }

  .footer-links a:hover{
    transform:none;
  }

}
