"use strict";

let currentPage = 1; // Start on the first page
const storiesPerPage = 15; // Number of stories per page

// Fetch and render best stories
async function fetchBestStories() {
  try {
    // Fetch the best stories JSON file
    const response = await fetch("/best-stories.json"); // Adjust path if needed
    if (!response.ok) throw new Error("Failed to load best stories.");

    const stories = await response.json();

    renderBestStories(stories);
    setupPagination(stories);
  } catch (error) {
    console.error("Error loading best stories:", error);
  }
}

// Render stories for the current page
function renderBestStories(stories) {
  const bestStoriesList = document.getElementById("best-stories-list");
  bestStoriesList.innerHTML = ""; // Clear existing content

  const startIndex = (currentPage - 1) * storiesPerPage;
  const endIndex = startIndex + storiesPerPage;

  const pageStories = stories.slice(startIndex, endIndex);

  // Create the HTML for the stories
  pageStories.forEach((story) => {
    const storyCard = `
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
                  (tag) => `<li><a href="#" class="card-tag">${tag}</a></li>`
                )
                .join("")}
            </ul>
            <h2>${story.title}</h2>
            <p>${story.description}</p>
          </div>
        </div>
      </li>`;
    bestStoriesList.insertAdjacentHTML("beforeend", storyCard);
  });
}

// Setup pagination for the stories
function setupPagination(stories) {
  const paginationContainer = document.getElementById(
    "best-stories-pagination"
  );
  paginationContainer.innerHTML = ""; // Clear existing pagination

  const totalPages = Math.ceil(stories.length / storiesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.classList.add("pagination-button");
    if (i === currentPage) button.classList.add("active");

    button.addEventListener("click", () => {
      currentPage = i;
      renderBestStories(stories);
      setupPagination(stories);

      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    paginationContainer.appendChild(button);
  }
}
// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", fetchBestStories);

