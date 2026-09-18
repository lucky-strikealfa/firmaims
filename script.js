document.addEventListener("DOMContentLoaded", function () {

  /* ================= FORM GOOGLE SHEET ================= */
  const form = document.getElementById("form");
  const msg = document.getElementById("msg");

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyU-JaanMbmptpMWWO2RTRtxROnur1xETytTqElS7cscTcG2xQibrcJwJTXLpHjp4uQ1A/exec";

  if (form) {

    form.addEventListener("submit", async function (e) {

      e.preventDefault();

      if (msg) msg.innerHTML = "⏳ Mengirim data...";

      const data = {
        nama: form.nama.value,
        email: form.email.value,
        telp: form.telp.value,
        subjek: form.subjek.value,
        pesan: form.pesan.value
      };

      try {

        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data)
        });

        if (msg) msg.innerHTML = "✅ Data berhasil dikirim.";
        form.reset();

      } catch (error) {

        console.error(error);
        if (msg) msg.innerHTML = "❌ Terjadi kesalahan saat mengirim.";

      }

    });

  }

  /* ================= SCROLL ================= */
  window.scrollToForm = function () {
    document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" });
  };

  /* ================= SLIDER ================= */
  let index = 0;
  const slides = document.querySelector(".slides");
  const slideItems = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");

  if (slides && slideItems.length && dotsContainer) {

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

    function showSlide() {
      slides.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(d => d.classList.remove("active"));
      if (dots[index]) dots[index].classList.add("active");
    }

    function next() { index = (index + 1) % total; showSlide(); }
    function prev() { index = (index - 1 + total) % total; showSlide(); }

    function start() { interval = setInterval(next, 4000); }
    function stop() { clearInterval(interval); }
    function restart() { stop(); start(); }

    document.querySelector(".next")?.addEventListener("click", () => { next(); restart(); });
    document.querySelector(".prev")?.addEventListener("click", () => { prev(); restart(); });

    const slider = document.querySelector(".hero-slider");

    if (slider) {
      slider.addEventListener("mouseenter", stop);
      slider.addEventListener("mouseleave", start);

      /* GESER (SWIPE) DI HP — panah kiri/kanan disembunyikan di mobile,
         jadi sebelumnya slider cuma bisa nunggu auto-play. */
      let startX = 0;
      let startY = 0;
      let tracking = false;

      slider.addEventListener("touchstart", (e) => {
        if (e.touches.length !== 1) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        tracking = true;
        stop();
      }, { passive: true });

      slider.addEventListener("touchend", (e) => {
        if (!tracking) return;
        tracking = false;

        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;

        // hanya dianggap swipe kalau gerak horizontalnya dominan
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
          dx < 0 ? next() : prev();
        }

        restart();
      }, { passive: true });

      // hemat baterai: berhenti kalau tab tidak aktif
      document.addEventListener("visibilitychange", () => {
        document.hidden ? stop() : restart();
      });
    }

    showSlide();
    start();
  }

  /* ================= MENU MOBILE ================= */
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const overlay = document.querySelector(".nav-overlay");

  if (toggle && menu) {

    function openMenu() {
      menu.classList.add("active");
      document.body.classList.add("menu-open");
    }

    function closeMenu() {
      menu.classList.remove("active");
      document.body.classList.remove("menu-open");
      document.querySelectorAll(".dropdown.active")
        .forEach(d => d.classList.remove("active"));
    }

    toggle.addEventListener("click", () => {
      menu.classList.contains("active") ? closeMenu() : openMenu();
    });

    // klik link mana pun (termasuk di dalam dropdown) → tutup
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // klik area gelap di luar menu → tutup
    overlay?.addEventListener("click", closeMenu);

    // tombol Esc → tutup
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // kalau layar diputar / diperbesar ke ukuran desktop, reset state
    window.addEventListener("resize", () => {
      if (window.innerWidth > 991) closeMenu();
    });
  }

  /* ================= DROPDOWN MOBILE ================= */
  document.querySelectorAll(".dropdown-toggle").forEach(btn => {

    btn.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        this.parentElement.classList.toggle("active");
      }
    });

  });

  /* ================= SCROLL ANIMATION ================= */
  const revealEls = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
  );

  if (revealEls.length) {

    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      revealEls.forEach(el => el.classList.add("active"));
    } else {

      /* threshold 0.2 bikin elemen panjang (kolom teks di HP) kadang
         tidak pernah kena trigger, jadi isinya tetap opacity:0 alias
         kelihatan hilang. Pakai threshold 0 + rootMargin. */
      const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
          entry.target.classList.toggle("active", entry.isIntersecting);
        });

      }, {
        threshold: 0,
        rootMargin: "0px 0px -8% 0px"
      });

      revealEls.forEach(el => observer.observe(el));
    }
  }

  /* ================= FAQ ACCORDION ================= */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    // sebelumnya tanpa guard ini, satu .faq-item tanpa tombol
    // bikin seluruh script setelahnya mati
    if (!btn || !answer) return;

    btn.addEventListener("click", () => {

      const isActive = item.classList.contains("active");

      faqItems.forEach(i => {
        i.classList.remove("active");
        const a = i.querySelector(".faq-answer");
        if (a) a.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }

    });

  });

});
