document.addEventListener("DOMContentLoaded", function(){

 // ================= FORM GOOGLE SHEET =================
const form = document.getElementById("form");
const msg = document.getElementById("msg");

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyU-JaanMbmptpMWWO2RTRtxROnur1xETytTqElS7cscTcG2xQibrcJwJTXLpHjp4uQ1A/exec";

if(form){

  form.addEventListener("submit", async function(e){

    e.preventDefault();

    msg.innerHTML = "⏳ Mengirim data...";

    const data = {
      nama: form.nama.value,
      email: form.email.value,
      telp: form.telp.value,
      subjek: form.subjek.value,
      pesan: form.pesan.value
    };

    try{

      await fetch(SCRIPT_URL,{
        method:"POST",
        mode:"no-cors",
        body:JSON.stringify(data)
      });

      msg.innerHTML = "✅ Data berhasil dikirim.";

      form.reset();

    }catch(error){

      console.error(error);

      msg.innerHTML = "❌ Terjadi kesalahan saat mengirim.";

    }

  });

}
  // ================= SCROLL =================
  window.scrollToForm = function(){
    document.getElementById("kontak")?.scrollIntoView({
      behavior:"smooth"
    });
  };

  // ================= SLIDER =================
  // Cocok dengan style.css asli: .slides = flex row, .slide = min-width:100%,
  // jadi kita geser .slides pakai translateX (bukan opacity-crossfade).
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
        restart();
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

    function restart(){
      stop();
      start();
    }

    // BUTTON
    document.querySelector(".next")?.addEventListener("click", () => { next(); restart(); });
    document.querySelector(".prev")?.addEventListener("click", () => { prev(); restart(); });

    // HOVER PAUSE
    const slider = document.querySelector(".hero-slider");
    if(slider){
      slider.addEventListener("mouseenter", stop);
      slider.addEventListener("mouseleave", start);
    }

    showSlide();
    start();
  }

  // ================= MENU MOBILE =================
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if(toggle && menu){

    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");

      document.body.style.overflow =
        menu.classList.contains("active") ? "hidden" : "auto";
    });

    // Tutup menu saat link mana pun di dalamnya diklik
    // (termasuk link di dalam dropdown "Layanan", bukan cuma anak langsung #menu)
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    function closeMenu(){
      menu.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    // auto close saat scroll (hanya saat mode mobile/tablet aktif)
    window.addEventListener("scroll", () => {
      if(menu.classList.contains("active") && window.innerWidth <= 991){
        closeMenu();
      }
    });
  }

});

// =======================
// SCROLL ANIMATION REPEAT
// =======================

const observer = new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }else{
      entry.target.classList.remove('active');
    }

  });

},{
  threshold:0.2
});

document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right, .reveal-zoom'
).forEach(el=>{
  observer.observe(el);
});

// ================= DROPDOWN MOBILE =================
// Sebelumnya querySelector() hanya mengikat dropdown PERTAMA yang ditemukan.
// Sekarang semua tombol dropdown (kalau nanti ada lebih dari satu) ditangani.
document.querySelectorAll(".dropdown-toggle").forEach(dropdownToggle => {

  dropdownToggle.addEventListener("click", function(e){

    if(window.innerWidth <= 991){

      e.preventDefault();

      this.parentElement.classList.toggle("active");

    }

  });

});

/* ==========================================
FAQ ACCORDION
========================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const btn = item.querySelector(".faq-question");

    btn.addEventListener("click", () => {

        const active = item.classList.contains("active");

        faqItems.forEach(i => {
            i.classList.remove("active");
            i.querySelector(".faq-answer").style.maxHeight = null;
        });

        if (!active) {
            item.classList.add("active");
            item.querySelector(".faq-answer").style.maxHeight =
                item.querySelector(".faq-answer").scrollHeight + "px";
        }

    });

});
