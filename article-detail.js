// Airtable API configuration for Articles
const articleBaseURL = 'https://api.airtable.com/v0/appCGbK0Tltcfhjqx/tblVg6uumUJJYY2do'; // Ganti sesuai Table ID untuk Articles
const token = 'Bearer patz7CHPSxFhadt6e'; // Token API yang telah diberikan

// Function to fetch article details based on article ID
async function fetchArticleDetail(articleID) {
    try {
        const response = await fetch(`${articleBaseURL}/${articleID}`, {
            method: 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching article details: ${response.statusText}`);
        }

        const data = await response.json();
        displayArticleDetail(data.fields);
    } catch (error) {
        console.error(error);
        document.getElementById('article-detail').innerHTML = '<p>Error loading article details.</p>';
    }
}

// Function to display article details on the page
function displayArticleDetail(fields) {
    const articleDetailContainer = document.getElementById('article-detail');
    articleDetailContainer.innerHTML = `
        <div class="article-header">
            <img src="${fields['Image Thumbnail']}" alt="${fields['Title']}">
            <h2>${fields['Title']}</h2>
        </div>
        <div class="article-body">
            <p>${fields['Content']}</p>
        </div>
    `;
}

// Get article ID from URL
const urlParams = new URLSearchParams(window.location.search);
const articleID = urlParams.get('id');

// Fetch and display article details on page load
document.addEventListener('DOMContentLoaded', () => {
    if (articleID) {
        fetchArticleDetail(articleID);
    } else {
        document.getElementById('article-detail').innerHTML = '<p>No article ID found in URL.</p>';
    }
});