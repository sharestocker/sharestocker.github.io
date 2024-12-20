
// // Best-Stories section
// async function fetchBestStories() {
//     try {
//       const response = await fetch("/best-stories.json");
//       const stories = await response.json();
//       const storiesList =
//         document.getElementById("best-stories-list");
  
//       // Populate 6 stories dynamically
//       stories.slice(0, 6).forEach((story) => {
//         const storyCard = `
//   <li class="scrollbar-item">
//   <div class="blog-card" onclick="window.location.href='${
//   story.link
//   }';" style="cursor: pointer;">
//   <figure class="card-banner img-holder" style="--width: 500; --height: 600;">
//   <img src="${
//   story.image
//   }" width="500" height="600" loading="lazy" alt="${
//           story.title
//         }" class="img-cover">
//   <ul class="avatar-list absolute">
//   ${
//     Array.isArray(story.authorImages)
//       ? story.authorImages
//           .map(
//             (img) => `
//             <li class="avatar-item">
//               <a href="#" class="avatar img-holder" style="--width: 100; --height: 100;">
//                 <img src="${img}" width="100" height="100" loading="lazy" alt="Author" class="img-cover">
//               </a>
//             </li>
//           `
//           )
//           .join("")
//       : ""
//   }
//   </ul>
//   </figure>
//   <div class="card-content">
//   <ul class="card-meta-list">
//   ${story.tags
//     .map(
//       (tag) => `<li><a href="#" class="card-tag">${tag}</a></li>`
//     )
//     .join("")}
//   </ul>
//   <h2>${story.title}</h2>
//   <p>${story.description}</p>
//   </div>
//   </div>
//   </li>
//   `;
//         storiesList.insertAdjacentHTML("beforeend", storyCard);
//       });
//     } catch (error) {
//       console.error("Error fetching best stories:", error);
//     }
//   }
  
//   document.addEventListener("DOMContentLoaded", fetchBestStories);
  