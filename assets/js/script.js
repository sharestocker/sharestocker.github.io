"use strict";

// Utility function to add events to elements
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

// Load dynamic footer
const loadDynamicFooter = async () => {
  try {
    const response = await fetch("footer.html");
    if (!response.ok) throw new Error("Failed to load footer");

    const footerHTML = await response.text();
    document.getElementById("footer-placeholder").innerHTML = footerHTML;

    // Any additional footer-specific scripts can be initialized here, if needed.
  } catch (error) {
    console.error("Error loading footer:", error);
  }
};

// Load dynamic header
const loadDynamicHeader = async () => {
  try {
    const response = await fetch("header.html");
    if (!response.ok) throw new Error("Failed to load header");

    const headerHTML = await response.text();
    document.getElementById("header-placeholder").innerHTML = headerHTML;

    // Reinitialize scripts after header loads
    initializeHeaderScripts();
  } catch (error) {
    console.error("Error loading header:", error);
  }
};

// Function to reinitialize header-specific scripts
const initializeHeaderScripts = () => {
  const navbar = document.querySelector("[data-navbar]");
  const navbarLinks = document.querySelectorAll("[data-nav-link]");
  const navToggler = document.querySelector("[data-nav-toggler]");

  const toggleNavbar = function () {
    navbar.classList.toggle("active");
    this.classList.toggle("active");
  };

  addEventOnElem(navToggler, "click", toggleNavbar);

  const closeNavbar = function () {
    navbar.classList.remove("active");
    navToggler.classList.remove("active");
  };

  addEventOnElem(navbarLinks, "click", closeNavbar);

  const searchBar = document.querySelector("[data-search-bar]");
  const searchTogglers = document.querySelectorAll("[data-search-toggler]");
  const overlay = document.querySelector("[data-overlay]");

  const toggleSearchBar = function () {
    searchBar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
  };

  addEventOnElem(searchTogglers, "click", toggleSearchBar);
};

// Run the script after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadDynamicHeader();
  loadDynamicFooter();
});


/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);




/**
 * search bar toggle
 */

const searchBar = document.querySelector("[data-search-bar]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleSearchBar = function () {
  searchBar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(searchTogglers, "click", toggleSearchBar);





// Contact Form Submit Popup starts

function countValidCharacters(str) {
  return str.replace(/[^a-zA-Z0-9]/g, '').length;
}

function updateCharacterCount() {
  const message = document.getElementById('message').value;
  const validCharCount = countValidCharacters(message);
  document.getElementById('charCounter').innerText = `${validCharCount}/50`;
}

document.getElementById('message').addEventListener('input', updateCharacterCount);


document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var message = document.getElementById('message').value;

  if (countValidCharacters(name) < 7) {
      alert('Name must be at least 7 characters long, excluding spaces and symbols.');
      return;
  }

  if (countValidCharacters(message) < 50) {
      alert('Message must be at least 50 characters long, excluding spaces and symbols.');
      return;
  }

  document.getElementById('popupOverlay').style.display = 'block';
});

function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';
  document.getElementById('contact-form').reset();
  updateCharacterCount(); // Reset the character count display
}

// Contact Form Submit Popup ends