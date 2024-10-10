// Airtable API configuration for Project Details
const baseURL = 'https://api.airtable.com/v0/appCGbK0Tltcfhjqx/tblqf6a4mfSlccRzB'; // Ganti sesuai Table ID untuk Portfolio
const token = 'Bearer patz7CHPSxFhadt6e'; // Token API yang telah diberikan

// Function to fetch project details based on project ID
async function fetchProjectDetail(projectID) {
    try {
        const response = await fetch(`${baseURL}/${projectID}`, {
            method: 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching project details: ${response.statusText}`);
        }

        const data = await response.json();
        displayProjectDetail(data.fields);
    } catch (error) {
        console.error(error);
        document.getElementById('project-detail').innerHTML = '<p>Error loading project details.</p>';
    }
}

// Function to display project details on the page
function displayProjectDetail(fields) {
    const projectDetailContainer = document.getElementById('project-detail');
    projectDetailContainer.innerHTML = `
        <div class="project-header">
            <img src="${fields['Image URL']}" alt="${fields['Project Name']}">
            <h2>${fields['Project Name']}</h2>
            <p><strong>Role:</strong> ${fields['Role']}</p>
            <p><strong>Timeline:</strong> ${fields['Timeline']}</p>
            <p><strong>Platform:</strong> ${fields['Platform']}</p>
        </div>
        <div class="project-body">
            <h3>Design Process</h3>
            <p>${fields['Content']}</p>
        </div>
    `;
}

// Get project ID from URL
const urlParams = new URLSearchParams(window.location.search);
const projectID = urlParams.get('id');

// Fetch and display project details on page load
document.addEventListener('DOMContentLoaded', () => {
    if (projectID) {
        fetchProjectDetail(projectID);
    } else {
        document.getElementById('project-detail').innerHTML = '<p>No project ID found in URL.</p>';
    }
});