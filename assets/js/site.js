(function () {
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var menu = document.querySelector(".nav-menu");
  if (menu) {
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.removeAttribute("open");
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") menu.removeAttribute("open");
    });
  }

  var nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;
  var show = function (node) { node.classList.add("in"); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    nodes.forEach(show);
    return;
  }
  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      show(entry.target);
      seen.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  nodes.forEach(function (node) { seen.observe(node); });

  /* If the observer never delivers, a scroll (or a late check) still reveals
     whatever has entered the viewport. Content must not stay invisible. */
  var revealInView = function () {
    var h = window.innerHeight || 800;
    document.querySelectorAll(".reveal:not(.in)").forEach(function (node) {
      if (node.getBoundingClientRect().top < h * 0.96) show(node);
    });
  };
  revealInView();
  window.addEventListener("scroll", revealInView, { passive: true });
  window.addEventListener("load", revealInView);
})();
