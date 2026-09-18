document.addEventListener("DOMContentLoaded", function () {

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     1. HERO SLIDER
     ========================================================= */
  (function initSlider() {

    var track = document.querySelector(".slides");
    var slides = document.querySelectorAll(".slide");
    var dotsBox = document.querySelector(".dots");
    var slider = document.querySelector(".hero-slider");

    if (!track || slides.length < 2 || !slider) return;

    var total = slides.length;
    var index = 0;
    var timer = null;
    var DELAY = 6000;

    // buat dots
    var dots = [];
    if (dotsBox) {
      dotsBox.innerHTML = "";
      for (var i = 0; i < total; i++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Slide " + (i + 1));
        dot.dataset.index = i;
        dot.addEventListener("click", function () {
          goTo(Number(this.dataset.index));
          restart();
        });
        dotsBox.appendChild(dot);
        dots.push(dot);
      }
    }

    function render() {
      track.style.transform = "translateX(" + (-index * 100) + "%)";

      for (var i = 0; i < total; i++) {
        var isCurrent = i === index;
        // slide yang tersembunyi tidak boleh bisa di-tab
        slides[i].setAttribute("aria-hidden", String(!isCurrent));
        slides[i].querySelectorAll("a, button").forEach(function (el) {
          el.tabIndex = isCurrent ? 0 : -1;
        });
        if (dots[i]) {
          dots[i].classList.toggle("active", isCurrent);
          dots[i].setAttribute("aria-current", isCurrent ? "true" : "false");
        }
      }
    }

    function goTo(i) { index = (i + total) % total; render(); }
    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function start() { if (!reduceMotion) timer = setInterval(next, DELAY); }
    function stop() { clearInterval(timer); timer = null; }
    function restart() { stop(); start(); }

    var btnNext = slider.querySelector(".next");
    var btnPrev = slider.querySelector(".prev");
    if (btnNext) btnNext.addEventListener("click", function () { next(); restart(); });
    if (btnPrev) btnPrev.addEventListener("click", function () { prev(); restart(); });

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);

    // swipe di HP
    var startX = 0, startY = 0, tracking = false;

    slider.addEventListener("touchstart", function (e) {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
      stop();
    }, { passive: true });

    slider.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;

      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;

      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) { next(); } else { prev(); }
      }
      restart();
    }, { passive: true });

    // panah keyboard saat slider difokus
    slider.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { next(); restart(); }
      if (e.key === "ArrowLeft") { prev(); restart(); }
    });

    // hemat baterai: berhenti kalau tab tidak aktif
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { stop(); } else { restart(); }
    });

    render();
    start();
  })();

  /* =========================================================
     2. MENU MOBILE
     ========================================================= */
  (function initMenu() {

    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("menu");
    var overlay = document.querySelector(".nav-overlay");

    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add("active");
      document.body.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Tutup menu");
      if (overlay) overlay.hidden = false;
    }

    function closeMenu() {
      menu.classList.remove("active");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Buka menu");
      if (overlay) overlay.hidden = true;
      menu.querySelectorAll(".dropdown.active").forEach(function (d) {
        d.classList.remove("active");
        var b = d.querySelector(".dropdown-toggle");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    }

    toggle.addEventListener("click", function () {
      menu.classList.contains("active") ? closeMenu() : openMenu();
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    if (overlay) overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 991) closeMenu();
    });

    // dropdown: klik hanya aktif di mobile, desktop pakai hover/focus
    menu.querySelectorAll(".dropdown-toggle").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        if (window.innerWidth > 991) return;
        e.preventDefault();
        var parent = this.parentElement;
        var willOpen = !parent.classList.contains("active");
        parent.classList.toggle("active", willOpen);
        this.setAttribute("aria-expanded", String(willOpen));
      });
    });
  })();

  /* =========================================================
     3. REVEAL SAAT SCROLL
     Sekali muncul, tetap muncul (versi lama pakai toggle,
     jadi konten hilang lagi kalau di-scroll ke atas).
     ========================================================= */
  (function initReveal() {

    var items = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom");
    if (!items.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("active"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =========================================================
     4. FAQ ACCORDION
     ========================================================= */
  (function initFaq() {

    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach(function (item) {

      var btn = item.querySelector(".faq-question");
      var answer = item.querySelector(".faq-answer");
      if (!btn || !answer) return;

      btn.setAttribute("aria-expanded", "false");

      btn.addEventListener("click", function () {
        var wasActive = item.classList.contains("active");

        items.forEach(function (other) {
          other.classList.remove("active");
          var a = other.querySelector(".faq-answer");
          var b = other.querySelector(".faq-question");
          if (a) a.style.maxHeight = null;
          if (b) b.setAttribute("aria-expanded", "false");
        });

        if (!wasActive) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + 40 + "px";
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });

    // kalau layar diputar, tinggi jawaban yang terbuka dihitung ulang
    window.addEventListener("resize", function () {
      var open = document.querySelector(".faq-item.active .faq-answer");
      if (open) open.style.maxHeight = open.scrollHeight + 40 + "px";
    });
  })();

  /* =========================================================
     5. FORM KE GOOGLE SHEET
     ========================================================= */
  (function initForm() {

    var form = document.getElementById("form");
    var msg = document.getElementById("msg");
    if (!form) return;

    var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyU-JaanMbmptpMWWO2RTRtxROnur1xETytTqElS7cscTcG2xQibrcJwJTXLpHjp4uQ1A/exec";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var button = form.querySelector("button[type=submit], button");
      if (button) button.disabled = true;
      if (msg) msg.textContent = "Mengirim data...";

      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });

      fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data)
      }).then(function () {
        if (msg) msg.textContent = "Pesan terkirim. Kami akan menghubungi Anda kembali.";
        form.reset();
      }).catch(function (error) {
        console.error(error);
        if (msg) msg.textContent = "Pengiriman gagal. Coba lagi, atau hubungi kami lewat WhatsApp.";
      }).finally(function () {
        if (button) button.disabled = false;
      });
    });
  })();

  /* kompatibilitas halaman lama */
  window.scrollToForm = function () {
    var target = document.getElementById("kontak") || document.getElementById("form-pertanyaan");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

});
