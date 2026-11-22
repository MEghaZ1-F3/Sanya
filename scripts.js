document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".pill-btn[data-target]");
  const tabContents = document.querySelectorAll(".tab-content");

  function openTab(tabId) {
    const targetContent = document.getElementById(tabId);
    if (!targetContent) {
      return;
    }

    tabButtons.forEach((button) => {
      const isActive = button.dataset.target === tabId;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    tabContents.forEach((content) => {
      content.classList.toggle("active", content.id === tabId);
    });

    if (window.innerWidth <= 880) {
      document.querySelector(".details-panel")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  tabButtons.forEach((button) => {
    button.setAttribute("role", "tab");
    button.addEventListener("click", () => openTab(button.dataset.target));
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
    document.getElementById(buttonId)?.addEventListener("click", () => openTab(tabId));
  });

  openTab(document.querySelector(".pill-btn.active")?.dataset.target || "personal");
});
