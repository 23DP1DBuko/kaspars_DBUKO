// Dark mode funkcionalitāte
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Pārbauda, vai lietotājam ir iepriekšējas preferences
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});

// Gluda ritināšana uz sadaļām
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const dropdownBtn = document.querySelector(".dropdown"); // Poga ar dropdown
  const dropdownMenu = document.querySelector(".dropdown-menu"); // Dropdown izvēlne

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (dropdownBtn) {
        dropdownBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          dropdownMenu.classList.toggle("active");
        });
      } else {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  });

  // Dropdown pogas klikšķis

  document.addEventListener("click", (event) => {
    // Ja klikšķis nav uz hamburger/nav-links/dropdown-btn/dropdown-menu, aizver hamburger un dropdown
    if (
      !event.target.closest(".nav-links") &&
      !event.target.closest(".hamburger") &&
      !event.target.closest(".dropdown") &&
      !event.target.closest(".dropdown-menu")
    ) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      if (dropdownMenu) dropdownMenu.classList.remove("active");
    }
  });
});
