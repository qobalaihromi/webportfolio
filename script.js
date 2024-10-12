// Function to handle sticky navbar scrolling
let timeout;
window.addEventListener('scroll', function() {
    if (timeout) clearTimeout(timeout);  // Clear previous timeout
    timeout = setTimeout(() => {
        const navbar = document.querySelector('.sticky-navbar');
        const heroSection = document.querySelector('.section-hero');
        const heroMargin = getComputedStyle(heroSection).marginLeft;

        // Change margin and padding depending on scroll position
        if (window.pageYOffset > heroSection.offsetHeight) {
            navbar.style.margin = '0'; // Sticky: remove margin
            navbar.style.padding = '0 100px'; // Sticky: larger padding
        } else {
            navbar.style.margin = `0 ${heroMargin}`; // In hero section: follow margin
            navbar.style.padding = '8px'; // Default padding
        }
    }, 100); // Debouncing to reduce number of executions
});

// Airtable API settings
const baseUrl = 'https://api.airtable.com/v0/appCGbKOTltcfhjqx/Web%20Portfolio';
const apiKey = 'patz7CHPSxFhadt6epXXXXX'; // Use your full API key

// Function to fetch projects from Airtable
async function fetchProjects() {
    try {
        const response = await fetch(`${baseUrl}?api_key=${apiKey}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data.records;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to render projects in the portfolio section
function renderProjects(projects) {
    const portfolioContainer = document.querySelector('.portfolio-container');
    let projectCards = '';

    // Loop through each project and create card HTML
    projects.forEach((project) => {
        const projectData = project.fields;
        projectCards += `
            <div class="portfolio-card">
                <img src="${projectData['Image URL']}" alt="${projectData['Project Name']}">
                <h3>${projectData['Project Name']}</h3>
                <p>${projectData['Content']}</p>
                <a href="#" class="cta-button">Readmore →</a>
            </div>
        `;
    });

    // Insert all project cards into the container at once
    portfolioContainer.insertAdjacentHTML('beforeend', projectCards);
}

// Call fetchProjects and renderProjects when data is ready
fetchProjects().then(renderProjects);
