
// Posts Published Date

// const publishedDate = new Date(document.lastModified);
// document.getElementById("published-date").textContent = publishedDate.toLocaleDateString();

const publishedDate = new Date(document.lastModified);

// Create a formatter for DD/MM/YYYY format
const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});

const formattedDate = formatter.format(publishedDate);

document.getElementById("published-date").textContent = formattedDate;