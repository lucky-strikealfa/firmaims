document.addEventListener("DOMContentLoaded", function(){

  // ================= FORM =================
  const form = document.getElementById("form");
  const msg = document.getElementById("msg");

  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      if(msg) msg.innerText = "Pesan berhasil dikirim!";
    });
  }

  // ================= SCROLL =================
  window.scrollToForm = function(){
    document.getElementById("kontak")?.scrollIntoView({
      behavior:"smooth"
    });
  };

  // ================= SLIDER =================
  let index = 0;
  const slides = document.querySelector(".slides");
  const slideItems = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");

  if(slides && slideItems.length && dotsContainer){

    const total = slideItems.length;
    let interval;

    // DOTS
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

    // BUTTON
    document.querySelector(".next")?.addEventListener("click", next);
    document.querySelector(".prev")?.addEventListener("click", prev);

    // HOVER PAUSE
    const slider = document.querySelector(".hero-slider");
    if(slider){
      slider.addEventListener("mouseenter", stop);
      slider.addEventListener("mouseleave", start);
    }

    start();
    showSlide();
  }

  // ================= MENU MOBILE =================
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay");

  if(toggle && menu && overlay){

    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      overlay.classList.toggle("active");

      document.body.style.overflow =
        menu.classList.contains("active") ? "hidden" : "auto";
    });

    overlay.addEventListener("click", closeMenu);

    document.querySelectorAll("#menu a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    function closeMenu(){
      menu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    // auto close saat scroll
    window.addEventListener("scroll", () => {
      if(menu.classList.contains("active")){
        closeMenu();
      }
    });
  }

});
