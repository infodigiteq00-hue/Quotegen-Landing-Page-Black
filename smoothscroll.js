/* smoothscroll.js — smooth in-page anchor navigation
   Scrolls to #target links with an offset for the sticky navbar.
   Falls back gracefully when the target is missing or motion is reduced. */
(function () {
  "use strict";

  function navOffset() {
    var nav = document.querySelector(".nav");
    return nav ? nav.getBoundingClientRect().height + 8 : 0;
  }

  function scrollToTarget(target) {
    var top = target.getBoundingClientRect().top + window.pageYOffset - navOffset();
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(top, 0), behavior: reduce ? "auto" : "smooth" });
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    var target = document.getElementById(hash.slice(1)) ||
                 document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    scrollToTarget(target);

    if (history.pushState) history.pushState(null, "", hash);
  });

  window.addEventListener("load", function () {
    if (window.location.hash.length > 1) {
      var target = document.getElementById(window.location.hash.slice(1));
      if (target) setTimeout(function () { scrollToTarget(target); }, 0);
    }
  });
})();
