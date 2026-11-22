document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".pill-btn[data-target]");
  const tabContents = document.querySelectorAll(".tab-content");

  function openTab(tabId, scrollOnMobile = false) {
    const targetContent = document.getElementById(tabId);
    if (!targetContent) {
      return;
    }

    const showcaseGrid = document.querySelector(".showcase-grid");
    showcaseGrid?.classList.toggle("photos-hidden", tabId !== "personal");

    tabButtons.forEach((button) => {
      const isActive = button.dataset.target === tabId;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    tabContents.forEach((content) => {
      content.classList.toggle("active", content.id === tabId);
    });

    if (scrollOnMobile && window.innerWidth <= 880) {
      document.querySelector(".details-panel")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  tabButtons.forEach((button) => {
    button.setAttribute("role", "tab");
    button.setAttribute("tabindex", button.classList.contains("active") ? "0" : "-1");
    button.addEventListener("click", () => openTab(button.dataset.target, true));
  });

  tabContents.forEach((content) => {
    content.setAttribute("role", "tabpanel");
  });

  const tabLinks = {
    nextToFamilyBtn: "family",
    nextToCareerBtn: "career",
    nextToContactBtn: "contact"
  };

  Object.entries(tabLinks).forEach(([buttonId, tabId]) => {
    document.getElementById(buttonId)?.addEventListener("click", () => openTab(tabId, true));
  });

  openTab(document.querySelector(".pill-btn.active")?.dataset.target || "personal");
});
