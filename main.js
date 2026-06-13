/* Centraus Structural Consulting — interactions */
(function () {
  "use strict";

  // Intro overlay
  var intro = document.getElementById("intro");
  if (intro) {
    window.addEventListener("load", function () {
      setTimeout(function () { intro.classList.add("done"); }, 1500);
    });
    setTimeout(function () { intro.classList.add("done"); }, 2600); // safety
  }

  // Nav scroll state
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Hero rolling slides
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var slides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
  if (slides.length > 1 && !reduce) {
    // lazy-load non-first backgrounds
    slides.forEach(function (s) {
      var bg = s.getAttribute("data-bg");
      if (bg) { var img = new Image(); img.src = bg; img.onload = function () { s.style.backgroundImage = "url('" + bg + "')"; }; }
    });
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove("active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("active");
    }, 6000);
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Year
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
