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

// ============================================
// DYNAMIC CONTENT GENERATION
// ============================================

// Training programs data array
const trainingPrograms = [
  {
    id: 1,
    title: "Kata noteikumi",
    description: "Pilnīga tiesnešu sagatavošana ar visiem nepieciešamajiem noteikumiem un vērtēšanas kritērijiem Kata sacensībām.",
    image: "https://placehold.co/300x200/3498db/ffffff",
    link: "kata.html",
    category: "Tiesneši",
    level: "Pamata"
  },
  {
    id: 2,
    title: "Kumite noteikumi",
    description: "Pilnīga tiesnešu sagatavošana ar visiem nepieciešamajiem noteikumiem un vērtēšanas kritērijiem Kumite sacensībām.",
    image: "https://placehold.co/300x200/e74c3c/ffffff",
    link: "kumite.html",
    category: "Tiesneši",
    level: "Vidējs"
  },
  {
    id: 3,
    title: "Noteikumi sekretāriem",
    description: "Specializēta apmācība sacensību sekretāriem ar dokumentācijas un protokolu sagatavošanu.",
    image: "https://placehold.co/300x200/2ecc71/ffffff",
    link: "sekretari.html",
    category: "Sekretāri",
    level: "Pamata"
  },
  {
    id: 4,
    title: "Atkārtota sertifikācija",
    description: "Atkārtotas sertifikācijas kurss pieredzējušiem tiesnešiem ar jaunākajām WKF izmaiņām.",
    image: "https://placehold.co/300x200/9b59b6/ffffff",
    link: "#",
    category: "Tiesneši",
    level: "Augstākais"
  },
  {
    id: 5,
    title: "Bērnu sacensību vadīšana",
    description: "Specializēts kurss bērnu un jauniešu sacensību organizēšanai un tiesāšanai.",
    image: "https://placehold.co/300x200/f39c12/ffffff",
    link: "#",
    category: "Tiesneši",
    level: "Vidējs"
  },
  {
    id: 6,
    title: "Elektroniskās sistēmas",
    description: "Apmācība darbam ar elektroniskajām rezultātu fiksēšanas un apstiprināšanas sistēmām.",
    image: "https://placehold.co/300x200/1abc9c/ffffff",
    link: "#",
    category: "Sekretāri",
    level: "Vidējs"
  }
];

// Store original order for reset
let currentPrograms = [...trainingPrograms];
let filteredPrograms = [...trainingPrograms];

// Function to create a card element
function createCard(program) {
  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-title', program.title.toLowerCase());
  card.setAttribute('data-id', program.id);
  
  card.innerHTML = `
    <img src="${program.image}" alt="${program.title}" class="card-image">
    <div class="card-content">
      <h3>${program.title}</h3>
      <p>${program.description}</p>
      <a href="${program.link}" class="card-button">Uzzināt vairāk</a>
    </div>
  `;
  
  return card;
}

// Function to render cards
function renderCards(programs) {
  const container = document.getElementById('cardsContainer');
  const noResults = document.getElementById('noResults');
  
  // Clear existing cards
  container.innerHTML = '';
  
  // Check if there are programs to display
  if (programs.length === 0) {
    noResults.style.display = 'block';
    container.style.display = 'none';
  } else {
    noResults.style.display = 'none';
    container.style.display = 'grid';
    
    // Create and append cards with stagger animation
    programs.forEach((program, index) => {
      const card = createCard(program);
      card.style.animationDelay = `${index * 0.1}s`;
      container.appendChild(card);
    });
  }
  
  // Update results count
  updateResultsCount(programs.length);
}

// Function to update results count
function updateResultsCount(count) {
  const countText = document.getElementById('countText');
  const total = trainingPrograms.length;
  
  if (count === total) {
    countText.textContent = `Rāda visas apmācības (${total})`;
  } else if (count === 1) {
    countText.textContent = `Atrasta ${count} apmācība`;
  } else if (count > 1) {
    countText.textContent = `Atrastas ${count} apmācības no ${total}`;
  } else {
    countText.textContent = 'Nav atrasti rezultāti';
  }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    // Filter programs based on search term
    filteredPrograms = currentPrograms.filter(program => {
      return program.title.toLowerCase().includes(searchTerm) ||
             program.description.toLowerCase().includes(searchTerm) ||
             program.category.toLowerCase().includes(searchTerm);
    });
    
    // Render filtered results
    renderCards(filteredPrograms);
    
    // Add visual feedback
    if (searchTerm) {
      searchInput.style.borderColor = 'var(--color-primary-500)';
    } else {
      searchInput.style.borderColor = 'var(--border-color)';
    }
  });
}

// ============================================
// SORT FUNCTIONALITY
// ============================================

const sortAZBtn = document.getElementById('sortAZ');
const sortZABtn = document.getElementById('sortZA');
const resetSortBtn = document.getElementById('resetSort');
const sortButtons = document.querySelectorAll('.sort-btn');

// Function to remove active state from all sort buttons
function clearActiveSortButtons() {
  sortButtons.forEach(btn => btn.classList.remove('active'));
}

// Sort A-Z
if (sortAZBtn) {
  sortAZBtn.addEventListener('click', () => {
    clearActiveSortButtons();
    sortAZBtn.classList.add('active');
    
    // Sort current programs alphabetically (A-Z)
    currentPrograms.sort((a, b) => a.title.localeCompare(b.title, 'lv'));
    
    // Apply search filter if exists
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
      filteredPrograms = currentPrograms.filter(program => {
        return program.title.toLowerCase().includes(searchTerm) ||
               program.description.toLowerCase().includes(searchTerm) ||
               program.category.toLowerCase().includes(searchTerm);
      });
      renderCards(filteredPrograms);
    } else {
      renderCards(currentPrograms);
    }
  });
}

// Sort Z-A
if (sortZABtn) {
  sortZABtn.addEventListener('click', () => {
    clearActiveSortButtons();
    sortZABtn.classList.add('active');
    
    // Sort current programs reverse alphabetically (Z-A)
    currentPrograms.sort((a, b) => b.title.localeCompare(a.title, 'lv'));
    
    // Apply search filter if exists
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
      filteredPrograms = currentPrograms.filter(program => {
        return program.title.toLowerCase().includes(searchTerm) ||
               program.description.toLowerCase().includes(searchTerm) ||
               program.category.toLowerCase().includes(searchTerm);
      });
      renderCards(filteredPrograms);
    } else {
      renderCards(currentPrograms);
    }
  });
}

// Reset sort
if (resetSortBtn) {
  resetSortBtn.addEventListener('click', () => {
    clearActiveSortButtons();
    
    // Reset to original order
    currentPrograms = [...trainingPrograms];
    
    // Clear search
    searchInput.value = '';
    searchInput.style.borderColor = 'var(--border-color)';
    
    // Render original cards
    filteredPrograms = [...trainingPrograms];
    renderCards(filteredPrograms);
  });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

// Render cards when the page loads
if (document.getElementById('cardsContainer')) {
  renderCards(currentPrograms);
}
