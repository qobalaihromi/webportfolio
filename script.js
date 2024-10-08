// Airtable API configuration
const baseURL = 'https://api.airtable.com/v0/appCGbK0Tltcfhjqx/tblqf6a4mfSlccRzB';
const viewID = 'viwdDx1VYEgHXJQpL';
const token = 'Bearer patz7CHPSxFhadt6e.d9302892a574d6bb607cd555672a434b1eb1a05b2a0d3b43bd39029660004648';

// Function to fetch projects from Airtable
async function fetchProjects() {
    try {
        const response = await fetch(`${baseURL}?view=${viewID}`, {
            method: 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
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

// Call fetchProjects on page load
document.addEventListener('DOMContentLoaded', fetchProjects);

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