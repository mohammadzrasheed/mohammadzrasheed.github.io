// ============================
// ACTIVE NAV LINK ON SCROLL
// ============================
const sections = document.querySelectorAll("main, section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let currentSection = "";
  const y = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (y >= sectionTop && y < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});


// ============================
// SCROLL REVEAL (FADE IN SECTIONS)
// ============================
const revealTargets = document.querySelectorAll("main#home, section");
revealTargets.forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach(el => revealObserver.observe(el));


// ============================
// MOBILE NAV MENU TOGGLE
// ============================
const headerEl = document.querySelector("header");
const toggleBtn = document.querySelector(".nav-toggle");
const linksBox = document.querySelector(".nav-links");

if (toggleBtn && headerEl && linksBox) {
  const closeMenu = () => {
    headerEl.classList.remove("menu-open");
    toggleBtn.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    headerEl.classList.add("menu-open");
    toggleBtn.setAttribute("aria-expanded", "true");
  };

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = headerEl.classList.contains("menu-open");
    isOpen ? closeMenu() : openMenu();
  });

  // close when clicking a link
  linksBox.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", closeMenu);
  });

  // close on outside click
  document.addEventListener("click", (e) => {
    if (!headerEl.contains(e.target)) closeMenu();
  });

  // close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}


