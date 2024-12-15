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
    const response = await fetch("../footer.html");
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
    const response = await fetch("../header.html");
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


("use strict");

async function fetchRelatedStories() {
  try {
    // Fetch the best stories JSON file
    const response = await fetch("/best-stories.json");
    if (!response.ok) throw new Error("Failed to load best stories.");

    const stories = await response.json();
    const placeholder = document.getElementById("best-stories-placeholder");

    if (!placeholder) {
      console.error(
        "Error: Element with id 'best-stories-placeholder' not found."
      );
      return;
    }

    // Randomly select 3 stories
    const randomStories = stories.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Create the related stories section HTML
    const sectionHTML = `
      <section class="section related-stories" aria-label="related stories">
        <div class="container">
          <h2 class="h2 section-title">You May Also Like</h2>
          <br>
          <ul class="grid-list" id="best-stories-list">
            ${randomStories
              .map(
                (story) => `
              <li>
                <div class="blog-card" onclick="window.location.href='${
                  story.link
                }';" style="cursor: pointer;">
                  <figure class="card-banner img-holder" style="--width: 500; --height: 600;">
                    <img src="${
                      story.image
                    }" width="500" height="600" loading="lazy" alt="${
                  story.title
                }" class="img-cover">
                  </figure>
                  <div class="card-content">
                    <ul class="card-meta-list">
                      ${story.tags
                        .map(
                          (tag) =>
                            `<li><a href="#" class="card-tag">${tag}</a></li>`
                        )
                        .join("")}
                    </ul>
                    <h2>${story.title}</h2>
                    <p>${story.description}</p>
                  </div>
                </div>
              </li>`
              )
              .join("")}
          </ul>
        </div>
      </section>
    `;

    // Insert the section HTML into the placeholder
    placeholder.innerHTML = sectionHTML;
  } catch (error) {
    console.error("Error loading related stories:", error);
  }
}

// Run the function when DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchRelatedStories);

// Posts Published Date

// const publishedDate = new Date(document.lastModified);
// document.getElementById("published-date").textContent = publishedDate.toLocaleDateString();

const publishedDate = new Date(document.lastModified);

// Create a formatter for DD/MM/YYYY format
const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const formattedDate = formatter.format(publishedDate);

document.getElementById("published-date").textContent = formattedDate;
