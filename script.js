
const sections = document.querySelectorAll("main, section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
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

  linksBox.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    if (!headerEl.contains(e.target)) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}


const typingEl = document.getElementById("typing");

if (typingEl) {
  const phrases = [
    "Computer Science Graduate • Software & Web Developer",
    "Full-Stack Projects • Web & Database Systems",
    "IoT Systems • Real-World Problem Solver"
  ];

  let p = 0;
  let i = 0;
  let deleting = false;

 
  const safeSetText = (value) => {
    typingEl.textContent = value.length ? value : " ";
  };

  
  safeSetText(" ");

  function tick() {
    const text = phrases[p];
    const current = text.slice(0, i);
    safeSetText(current);

    if (!deleting) {
      i++;
      if (i > text.length) {
        deleting = true;
        setTimeout(tick, 900);
        return;
      }
      setTimeout(tick, 55);
    } else {
      i--;
      if (i <= 0) {
        i = 0; 
        deleting = false;
        p = (p + 1) % phrases.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, 35);
    }
  }

  tick();
}

