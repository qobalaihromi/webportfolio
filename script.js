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

        const item = document.createElement('div');
        item.classList.add('portfolio-item');
        item.innerHTML = `
            <a href="#">
                <img src="${imageUrl}" alt="${projectName}">
                <h3>${projectName}</h3>
                <p>Description for ${projectName}</p> <!-- You can modify this if you have a description column -->
            </a>
        `;
        portfolioItemsContainer.appendChild(item);
    });
}

// Call fetchProjects on page load
document.addEventListener('DOMContentLoaded', fetchProjects);
