(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Year
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  // Sticky nav
  var nav = $("#nav");
  var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 40); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  var toggle = $("#navToggle"), links = $("#navLinks");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      nav.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("#navLinks a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        nav.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal on scroll
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  // Gallery filter
  var items = $$(".g-item");
  $$(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      $$(".filter").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.getAttribute("data-filter");
      items.forEach(function (it) {
        var show = f === "all" || it.getAttribute("data-cat") === f;
        it.classList.toggle("hide", !show);
      });
    });
  });

  // Lightbox
  var lb = $("#lightbox"), lbImg = $("#lbImg");
  var current = 0;
  var visible = function () { return items.filter(function (it) { return !it.classList.contains("hide"); }); };
  var show = function (i) {
    var v = visible(); if (!v.length) return;
    current = (i + v.length) % v.length;
    var img = $("img", v[current]);
    lbImg.src = img.getAttribute("src");
    lbImg.alt = img.getAttribute("alt") || "";
  };
  var open = function (it) {
    var v = visible(); current = v.indexOf(it);
    show(current); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  var close = function () {
    lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  items.forEach(function (it) { it.addEventListener("click", function () { open(it); }); });
  $("#lbClose").addEventListener("click", close);
  $("#lbNext").addEventListener("click", function () { show(current + 1); });
  $("#lbPrev").addEventListener("click", function () { show(current - 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "ArrowLeft") show(current - 1);
  });

  // Hero cake slider
  var cakes = $$(".hero__stage .cake");
  var dots = $$(".hdot");
  var capTitle = $("#capTitle");
  var capSub = $("#capSub");
  if (cakes.length && dots.length) {
    var hi = 0, timer;
    var setHero = function (i) {
      hi = (i + cakes.length) % cakes.length;
      cakes.forEach(function (c, k) { c.classList.toggle("is-active", k === hi); });
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === hi); });
      var active = cakes[hi];
      if (capTitle) capTitle.textContent = active.getAttribute("data-title") || "";
      if (capSub) capSub.textContent = active.getAttribute("data-sub") || "";
    };
    var startAuto = function () { timer = setInterval(function () { setHero(hi + 1); }, 5000); };
    var stopAuto = function () { clearInterval(timer); };
    dots.forEach(function (d) {
      d.addEventListener("click", function () { stopAuto(); setHero(+d.getAttribute("data-i")); startAuto(); });
    });
    startAuto();
  }
})();
