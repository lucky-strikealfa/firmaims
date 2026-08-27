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
  // FIX: sebelumnya kode ini menggeser (translateX) container .slides,
  // padahal CSS-nya memakai .slide { position:absolute } + opacity crossfade
  // dan tidak pernah menambahkan class "active" ke slide yang aktif.
  // Akibatnya seluruh slider ikut bergeser keluar layar setelah slide pertama
  // (itulah yang membuat tampilan jadi berantakan). Sekarang slider murni
  // mengganti class "active" pada slide & dot yang sesuai.
  const slideItems = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");

  if(slideItems.length && dotsContainer){

    let index = 0;
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
      slideItems.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });

      dots.forEach((d, i) => {
        d.classList.toggle("active", i === index);
      });
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
  const overlay = document.querySelector(".nav-overlay");

  if(toggle && menu && overlay){

    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      overlay.classList.toggle("active");

      document.body.style.overflow =
        menu.classList.contains("active") ? "hidden" : "auto";
    });

    overlay.addEventListener("click", closeMenu);

    document.querySelectorAll("#menu > a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    function closeMenu(){
      menu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    // auto close saat scroll (desktop/tablet only; di mobile menu full-screen fixed
    // jadi tidak perlu ikut menutup saat halaman di baliknya di-scroll)
    window.addEventListener("scroll", () => {
      if(menu.classList.contains("active") && window.innerWidth > 992){
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
// FIX: sebelumnya toggle class "active" hanya dipasang ke dropdown PERTAMA
// yang ditemukan (querySelector, bukan querySelectorAll), dan CSS tidak
// punya aturan untuk menampilkan .dropdown-menu saat .dropdown.active
// (CSS lama hanya mengandalkan :hover, yang tidak berfungsi di layar sentuh).
// Sekarang semua tombol dropdown ditangani, dan CSS sudah menambahkan
// aturan .dropdown.active .dropdown-menu untuk mode mobile.
document.querySelectorAll(".dropdown-toggle").forEach(dropdownToggle => {

  dropdownToggle.addEventListener("click", function(e){

    if(window.innerWidth <= 992){

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
