document.addEventListener('DOMContentLoaded', () => {
  updateSlider();
});

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  function startAutoSlide(){
    autoSlide = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide(){
    clearInterval(autoSlide);
  }

  document.querySelector('.hero-slider').addEventListener('mouseenter', stopAutoSlide);

  document.querySelector('.hero-slider').addEventListener('mouseleave', startAutoSlide);

  startAutoSlide();


  // ================= MOBILE MENU =================
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('overlay');

  toggle.addEventListener('click', () => {

    menu.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('#menu a').forEach(link => {

    link.addEventListener('click', closeMenu);
  });

  function closeMenu(){

    menu.classList.remove('active');
    overlay.classList.remove('active');
  }


  // ================= RESET POSISI AWAL =================
  window.scrollTo(0,0);

});

function updateSlider(){
  document.querySelector('.slides').style.transform =
    `translateX(-${currentIndex * 100}%)`;
}

function nextSlide(){
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide(){
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}


