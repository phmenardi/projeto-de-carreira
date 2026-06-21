const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = Array.from(document.querySelectorAll(".nav-group a"));

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
);

sections.forEach((section) => observer.observe(section));

const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

function setError(field, message) {
  const wrapper = field.closest(".form-field");
  const error = wrapper.querySelector(".error-message");
  wrapper.classList.toggle("invalid", Boolean(message));
  error.textContent = message;
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form?.addEventListener("submit", (event) => {
  const fields = {
    name: form.querySelector("#name"),
    email: form.querySelector("#email"),
    message: form.querySelector("#message"),
  };

  let isValid = true;
  Object.values(fields).forEach((field) => setError(field, ""));

  if (!fields.name.value.trim()) {
    setError(fields.name, "Informe seu nome.");
    isValid = false;
  }

  if (!fields.email.value.trim()) {
    setError(fields.email, "Informe seu email.");
    isValid = false;
  } else if (!validateEmail(fields.email.value.trim())) {
    setError(fields.email, "Informe um email válido.");
    isValid = false;
  }

  if (!fields.message.value.trim()) {
    setError(fields.message, "Escreva uma mensagem.");
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
    formStatus.textContent = "Revise os campos destacados antes de enviar.";
    return;
  }

  if (form.action.includes("SEU_ID_AQUI")) {
    event.preventDefault();
    formStatus.textContent = "Configure o ID do Formspree no atributo action para ativar o envio.";
  }
});

const timelineButtons = Array.from(document.querySelectorAll(".timeline-item"));
const timelinePanels = Array.from(document.querySelectorAll(".timeline-panel"));

timelineButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;

    timelineButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-expanded", String(isActive));
    });

    timelinePanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === targetId);
    });
  });
});
