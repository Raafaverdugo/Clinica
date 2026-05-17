const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#main-menu");
const header = document.querySelector(".site-header");

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const revealTargets = document.querySelectorAll(
  ".section-heading, .two-column > div, .mission-band > div, .value-grid article, .service-grid article, .audience-layout article, .feature-list div, .journey-track article, .tech-highlight, .tech-card, .innovation-grid article, .ods-grid article, .appointment-copy, .appointment-form"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -70px 0px" }
  );

  revealTargets.forEach((target, index) => {
    target.setAttribute("data-reveal", "");
    target.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => {
    target.setAttribute("data-reveal", "");
    target.classList.add("is-visible");
  });
}

const appointmentForm = document.querySelector("#appointment-form");
const formStatus = document.querySelector("#form-status");

if (appointmentForm && formStatus) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!appointmentForm.checkValidity()) {
      formStatus.textContent = "Revisa los campos obligatorios para completar la solicitud demo.";
      formStatus.classList.add("error");
      appointmentForm.reportValidity();
      return;
    }

    formStatus.classList.remove("error");
    formStatus.textContent = "Solicitud demo registrada en pantalla. No se han enviado datos ni se ha reservado una cita real.";
    appointmentForm.reset();
  });
}
