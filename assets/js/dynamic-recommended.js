// Fetch the JSON data
fetch("recommended.json")
.then((response) => response.json())
.then((data) => {
  const recommendedSection = document.querySelector(
    ".recommended .grid-list"
  );

  // Limit to 6 latest posts
  const limitedData = data.slice(0, 6);

  limitedData.forEach((post) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
<div class="blog-card">
<a href="${post.link}">
<figure class="card-banner img-holder" style="--width: 300; --height: 360">
  <img src="${post.image}" alt="${post.title}" class="img-cover" style="width: 100%; height: 100%; object-fit: cover;">
  <ul class="avatar-list absolute">
    </ul>
</figure>
</a>
<div class="card-content">
<h3 class="h5">
  <a href="${post.link}" class="card-title hover:underline">${post.title}</a>
</h3>
</div>
</div>
`;

    recommendedSection.appendChild(listItem);
  });
})
.catch((error) => {
  console.error("Error fetching JSON data:", error);
});