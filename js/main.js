document.addEventListener("DOMContentLoaded", () => {
  I18n.init();

  const header = document.getElementById("header");
  const nav = document.querySelector(".nav");
  const navToggle = document.getElementById("nav-toggle");

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  navToggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
    navToggle.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("open");
      navToggle?.classList.remove("active");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document
    .querySelectorAll(".city-card, .tip-card, .section-header, .detail-card, .detail-card--attraction, .info-box")
    .forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });
});
