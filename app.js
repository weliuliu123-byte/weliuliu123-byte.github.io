(() => {
  "use strict";

  // 1. Dark / Light Theme Persistence
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("portfolio-theme", next);
    });
  }

  // 2. Mobile Navigation Toggle
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. Per-Case-Study Visual Evidence Tab Switcher
  const evidenceGroups = document.querySelectorAll("[data-evidence-group]");
  evidenceGroups.forEach((group) => {
    const tabs = group.querySelectorAll(".ev-tab[data-tab]");
    const panes = group.querySelectorAll(".ev-pane[data-pane]");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", String(active));
        });
        panes.forEach((pane) => {
          const match = pane.dataset.pane === target;
          pane.classList.toggle("is-active", match);
          pane.hidden = !match;
        });
      });
    });
  });

  // 4. Figure Click-to-Zoom Lightbox (<dialog>)
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeLightbox = document.getElementById("close-lightbox");
  const lightboxStage = lightboxModal ? lightboxModal.querySelector(".lightbox-stage") : null;
  let lastTriggerEl = null;

  document.querySelectorAll("[data-lightbox-src]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (!lightboxModal || !lightboxImg) return;
      lastTriggerEl = trigger;
      const src = trigger.getAttribute("data-lightbox-src") || "";
      const caption = trigger.getAttribute("data-lightbox-caption") || "";
      const isDarkFig = trigger.classList.contains("fig-dark") || trigger.classList.contains("stage-img-wrap");

      lightboxImg.src = src;
      lightboxImg.alt = caption;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      if (lightboxStage) lightboxStage.classList.toggle("is-dark-fig", isDarkFig);

      if (typeof lightboxModal.showModal === "function") {
        lightboxModal.showModal();
        if (closeLightbox) closeLightbox.focus();
      }
    });
  });

  if (lightboxModal && closeLightbox) {
    const closeBox = () => {
      lightboxModal.close();
      if (lastTriggerEl) lastTriggerEl.focus();
    };
    closeLightbox.addEventListener("click", closeBox);
    lightboxModal.addEventListener("click", (event) => {
      if (event.target === lightboxModal) closeBox();
    });
  }

  // 5. Resume Preview Modal (<dialog>)
  const resumeModal = document.getElementById("resume-modal");
  const closeResumeBtn = document.getElementById("close-resume-modal");
  const openResumeBtns = [
    document.getElementById("open-resume-modal"),
    document.getElementById("nav-preview-cv"),
    document.getElementById("contact-preview-cv")
  ].filter(Boolean);

  let lastResumeTrigger = null;

  if (resumeModal && closeResumeBtn) {
    openResumeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        lastResumeTrigger = btn;
        if (typeof resumeModal.showModal === "function") {
          resumeModal.showModal();
          closeResumeBtn.focus();
        } else {
          window.open("./Ha_Gia_Bao_Resume.pdf", "_blank", "noopener");
        }
      });
    });

    const closeResume = () => {
      resumeModal.close();
      if (lastResumeTrigger) lastResumeTrigger.focus();
    };

    closeResumeBtn.addEventListener("click", closeResume);
    resumeModal.addEventListener("click", (event) => {
      if (event.target === resumeModal) closeResume();
    });
  }

  // 6. One-Click Email Copy
  const copyEmailBtn = document.getElementById("copy-email-btn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = copyEmailBtn.dataset.email || "weliuliu132@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        const originalHTML = copyEmailBtn.innerHTML;
        copyEmailBtn.textContent = "Copied!";
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalHTML;
        }, 1800);
      } catch (_err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }
})();
