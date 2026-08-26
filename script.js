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
        nama: form.nama ? form.nama.value : "",
        email: form.email ? form.email.value : "",
        telp: form.telp ? form.telp.value : "",
        subjek: form.subjek ? form.subjek.value : "",
        pesan: form.pesan ? form.pesan.value : ""
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
        console.error("Error submitting form:", error);
        if (msg) msg.innerHTML = "❌ Terjadi kesalahan saat mengirim.";
      }
    });
  }

  // ================= SCROLL HELPER =================
  window.scrollToForm = function () {
    document.getElementById("kontak")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  // ================= SLIDER =================
  let index = 0;
  const slides = document.querySelector(".slides");
  const slideItems = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");

  if (slides && slideItems.length && dotsContainer) {
    const total = slideItems.length;
    let interval;

    // Generate Dots dynamically
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

    // Slider controls
    document.querySelector(".next")?.addEventListener("click", next);
    document.querySelector(".prev")?.addEventListener("click", prev);

    // Hover pause behavior
    const slider = document.querySelector(".hero-slider");
    if (slider) {
      slider.addEventListener("mouseenter", stop);
      slider.addEventListener("mouseleave", start);
    }

    start();
    showSlide();
  }

  // ================= MENU MOBILE =================
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
      const isActive = menu.classList.toggle("active");
      overlay.classList.toggle("active", isActive);
      document.body.style.overflow = isActive ? "hidden" : "auto";
    });

    overlay.addEventListener("click", closeMenu);

    document.querySelectorAll("#menu > a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("scroll", () => {
      if (menu.classList.contains("active")) {
        closeMenu();
      }
    }, { passive: true });
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

  // ================= SCROLL ANIMATION (INTERSECTION OBSERVER) =================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
  }

  // ================= FAQ ACCORDION =================
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (btn && answer) {
      btn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Reset state for all items
        faqItems.forEach(i => {
          i.classList.remove("active");
          const ans = i.querySelector(".faq-answer");
          if (ans) ans.style.maxHeight = null;
        });

        // Expand clicked item if previously inactive
        if (!isActive) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    }
  });

});
