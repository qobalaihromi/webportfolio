// Airtable API configuration for Portfolio and Articles
const portfolioBaseURL = 'https://api.airtable.com/v0/appCGbK0Tltcfhjqx/tblqf6a4mfSlccRzB'; // Ganti sesuai Table ID untuk Portfolio
const articleBaseURL = 'https://api.airtable.com/v0/appCGbK0Tltcfhjqx/tblVg6uumUJJYY2do'; // Ganti sesuai Table ID untuk Articles
const portfolioViewID = 'viwdDx1VYEgHXJQpL'; // Ganti sesuai View ID untuk Portfolio
const articleViewID = 'viwdCZxQhBIEM1cT'; // Ganti sesuai View ID untuk Articles
const token = 'Bearer patz7CHPSxFhadt6e'; // Token API yang telah diberikan

// Function to fetch projects from Airtable
async function fetchProjects() {
    try {
        const response = await fetch(`${portfolioBaseURL}?view=${portfolioViewID}`, {
            method: 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        });

        console.log(response.status); // Debugging response status for projects
        if (!response.ok) {
            throw new Error(`Error fetching projects: ${response.statusText}`);
        }

        const data = await response.json();
        displayProjects(data.records);
    } catch (error) {
        console.error(error);
        document.getElementById('portfolio-items').innerHTML = '<p>Error loading projects.</p>';
    }
}

// Function to display projects in the portfolio section
function displayProjects(records) {
    const portfolioItemsContainer = document.getElementById('portfolio-items');
    portfolioItemsContainer.innerHTML = ''; // Clear loading message

    records.forEach(record => {
        const projectName = record.fields['Project Name'];
        const imageUrl = record.fields['Image URL'];
        const projectID = record.id;  // Retrieve the unique project ID from Airtable

        const item = document.createElement('div');
        item.classList.add('portfolio-item');
        item.innerHTML = `
            <a href="project-detail.html?id=${projectID}">
                <img src="${imageUrl}" alt="${projectName}">
                <h3>${projectName}</h3>
                <p>Description for ${projectName}</p>
            </a>
        `;
        portfolioItemsContainer.appendChild(item);
    });
}

// Function to fetch articles from Airtable
async function fetchArticles() {
    try {
        const response = await fetch(`${articleBaseURL}?view=${articleViewID}`, {
            method: 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        });

        console.log(response.status); // Debugging response status for articles
        if (!response.ok) {
            throw new Error(`Error fetching articles: ${response.statusText}`);
        }

        const data = await response.json();
        displayArticles(data.records);
    } catch (error) {
        console.error(error);
        document.getElementById('article-items').innerHTML = '<p>Error loading articles.</p>';
    }
}

// Function to display articles in the articles section
function displayArticles(records) {
    const articleItemsContainer = document.getElementById('article-items');
    articleItemsContainer.innerHTML = ''; // Clear loading message

    records.forEach(record => {
        const articleTitle = record.fields['Title'];
        const imageUrl = record.fields['Image Thumbnail'];
        const articleID = record.id;  // Retrieve the unique article ID from Airtable
        const articleContent = record.fields['Content'].substring(0, 100); // Get snippet of content

        const item = document.createElement('div');
        item.classList.add('article-item');
        item.innerHTML = `
            <img src="${imageUrl}" alt="${articleTitle}">
            <h3>${articleTitle}</h3>
            <p>${articleContent}...</p>
            <a href="article-detail.html?id=${articleID}" class="read-more">Read More</a>
        `;
        articleItemsContainer.appendChild(item);
    });
}

// Call fetchProjects and fetchArticles on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
    fetchArticles();
});

// Smooth scrolling behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sticky Navbar Function
window.onscroll = function() {stickyNavbar()};

var navbar = document.querySelector('.navbar');
var sticky = navbar.offsetTop;

function stickyNavbar() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}