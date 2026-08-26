document.addEventListener("DOMContentLoaded", function () {

  // ================= FORM GOOGLE SHEET =================
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

  // ================= SCROLL TO FORM =================
  window.scrollToForm = function () {
    document.getElementById("kontak")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  // ================= HERO SLIDER =================
  let index = 0;
  const slides = document.querySelector(".slides");
  const slideItems = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");

  if (slides && slideItems.length && dotsContainer) {
    const total = slideItems.length;
    let interval;

    // Generate Dots
    slideItems.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.addEventListener("click", () => {
        index = i;
        showSlide();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dots span");

    function showSlide() {
      slides.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(d => d.classList.remove("active"));
      if (dots[index]) dots[index].classList.add("active");
    }

    function next() {
      index = (index + 1) % total;
      showSlide();
    }

    function prev() {
      index = (index - 1 + total) % total;
      showSlide();
    }

    function start() {
      interval = setInterval(next, 4000);
    }

    function stop() {
      clearInterval(interval);
    }

    // Button Listeners
    document.querySelector(".next")?.addEventListener("click", next);
    document.querySelector(".prev")?.addEventListener("click", prev);

    // Hover Pause
    const slider = document.querySelector(".hero-slider");
    if (slider) {
      slider.addEventListener("mouseenter", stop);
      slider.addEventListener("mouseleave", start);
    }

    start();
    showSlide();
  }

  // ================= MENU MOBILE & OVERLAY =================
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const overlay = document.querySelector(".nav-overlay");

  if (toggle && menu && overlay) {
    function closeMenu() {
      menu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = menu.classList.contains("active") ? "hidden" : "auto";
    });

    overlay.addEventListener("click", closeMenu);

    document.querySelectorAll("#menu > a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // Auto close saat scroll
    window.addEventListener("scroll", () => {
      if (menu.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  // ================= DROPDOWN MOBILE =================
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  if (dropdownToggle) {
    dropdownToggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        this.parentElement.classList.toggle("active");
      }
    });
  }

  // ================= SCROLL ANIMATION REPEAT =================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom').forEach(el => {
    observer.observe(el);
  });

  // ================= FAQ ACCORDION =================
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    if (btn) {
      btn.addEventListener("click", () => {
        const active = item.classList.contains("active");
        
        faqItems.forEach(i => {
          i.classList.remove("active");
          const ans = i.querySelector(".faq-answer");
          if (ans) ans.style.maxHeight = null;
        });

        if (!active) {
          item.classList.add("active");
          const answer = item.querySelector(".faq-answer");
          if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    }
  });

});
