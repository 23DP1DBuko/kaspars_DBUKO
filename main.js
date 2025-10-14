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

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById('loginTab').addEventListener('click', function () {
  document.getElementById('loginForm').classList.add('active');
  document.getElementById('registerForm').classList.remove('active');
  this.classList.add('active');
  document.getElementById('registerTab').classList.remove('active');
});

document.getElementById('registerTab').addEventListener('click', function () {
  document.getElementById('registerForm').classList.add('active');
  document.getElementById('loginForm').classList.remove('active');
  this.classList.add('active');
  document.getElementById('loginTab').classList.remove('active');
});