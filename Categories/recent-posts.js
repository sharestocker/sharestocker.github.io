let currentPage = 1; // Start on the first page
const postsPerPage = 15; // Number of posts per page

// Fetch posts and initialize pagination
async function loadPosts() {
  const response = await fetch('/posts.json'); // Adjust path as needed
  const posts = await response.json();

  renderPosts(posts);
  setupPagination(posts);
}

// Render posts for the current page
function renderPosts(posts) {
  const recentPostsContainer = document.getElementById('recent-posts');
  recentPostsContainer.innerHTML = ''; // Clear existing content

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const pagePosts = posts.slice(startIndex, endIndex); // Get posts for the current page

  pagePosts.forEach((post) => {
    const postCard = `
      <li>
        <div class="blog-card">
          <figure class="card-banner img-holder" style="--width: 550; --height: 660;">
            <img src="${post.image}" width="550" height="660" loading="lazy"
              alt="${post.title}" class="img-cover" onclick="window.location.href='${post.link}';" style="cursor: pointer;">
          
          </figure>
          <div class="card-content">
            <ul class="card-meta-list">
              ${post.tags.map((tag) => `<li><a href="${post.link}" class="card-tag">${tag}</a></li>`).join('')}
            </ul>
            <h3 class="h4">
              <a href="${post.link}" class="card-title hover:underline">
                ${post.title}
              </a>
            </h3>
            <p class="card-text">
              ${post.description}
            </p>
          </div>
        </div>
      </li>`;
    recentPostsContainer.insertAdjacentHTML('beforeend', postCard);
  });
}

// Setup pagination buttons
function setupPagination(posts) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(posts.length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.classList.add('pagination-button');
    if (i === currentPage) button.classList.add('active');

    button.addEventListener('click', () => {
      currentPage = i;
      renderPosts(posts);
      setupPagination(posts);

      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    paginationContainer.appendChild(button);
  }
}

// Initialize
loadPosts();
