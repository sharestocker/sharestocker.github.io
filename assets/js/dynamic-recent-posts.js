// Function to fetch posts from posts.json and dynamically display them
async function loadRecentPosts() {
    const response = await fetch("./posts.json"); // Adjust path as needed
    const posts = await response.json();

    const recentPostsContainer =
      document.getElementById("recent-posts");
    recentPostsContainer.innerHTML = ""; // Clear existing content

    // Get the 6 most recent posts
    const latestPosts = posts.slice(0, 6); // Assuming posts are sorted in descending order

    latestPosts.forEach((post) => {
      const postCard = `
<li>
<div class="blog-card">
  <figure class="card-banner img-holder" style="--width: 550; --height: 660;">
    <img src="${post.image}" width="550" height="660" loading="lazy"
      alt="${
        post.title
      }" class="img-cover" onclick="window.location.href='${
        post.link
      }';" style="cursor: pointer;">
   
  </figure>
  <div class="card-content">
    <ul class="card-meta-list">
      ${post.tags
        .map(
          (tag) =>
            `<li><a href="${post.link}" class="card-tag">${tag}</a></li>`
        )
        .join("")}
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
      recentPostsContainer.insertAdjacentHTML("beforeend", postCard);
    });
  }

  loadRecentPosts();