const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");
const bagButton = document.querySelector(".bag-button");
const bagCount = document.querySelector(".bag-count");
const toast = document.querySelector(".toast");
const newsletterForm = document.querySelector(".newsletter-form");
const mobileMenuButton = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector(".nav-left");

let itemCount = 0;
let toastTimeout;

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    productCards.forEach((card) => {
      card.hidden = selectedFilter !== "all" && card.dataset.category !== selectedFilter;
    });
  });
});

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    itemCount += 1;
    bagCount.textContent = String(itemCount);
    bagButton.setAttribute("aria-label", `Shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`);
    toast.textContent = `${button.dataset.product} added to your bag`;
    toast.classList.add("visible");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 2400);
  });
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = newsletterForm.querySelector('input[type="email"]');
  const message = newsletterForm.querySelector(".form-message");
  if (!emailInput.reportValidity()) return;
  message.textContent = "You’re on the list — a little lovely is headed your way.";
  emailInput.value = "";
});

mobileMenuButton.addEventListener("click", () => {
  const isOpen = mobileMenuButton.getAttribute("aria-expanded") !== "true";
  mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
  mobileMenuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  mainNavigation.classList.toggle("open", isOpen);
});

mainNavigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNavigation.classList.remove("open");
    mobileMenuButton.setAttribute("aria-expanded", "false");
    mobileMenuButton.setAttribute("aria-label", "Open navigation");
  });
});
