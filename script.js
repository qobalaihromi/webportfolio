const baseUrl = 'https://api.airtable.com/v0/appCGbKOTltcfhjqx/Web%20Portfolio';
const apiKey = 'Bearer patz7CHPSxFhadt6eJ4HplAiJxyzFA43';

async function getProjects() {
  try {
    const response = await fetch(`${baseUrl}`, {
      headers: {
        Authorization: apiKey
      }
    });
    const data = await response.json();
    if (data.records) {
      displayProjects(data.records);
    } else {
      console.error("No records found");
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

function displayProjects(projects) {
  const projectsGrid = document.getElementById('projects');
  projectsGrid.innerHTML = ''; // Clear previous content
  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');

    const projectImage = document.createElement('img');
    projectImage.src = project.fields['Image URL'];
    projectImage.alt = project.fields['Project Name'];
    projectCard.appendChild(projectImage);

    const projectTitle = document.createElement('h3');
    projectTitle.textContent = project.fields['Project Name'];
    projectCard.appendChild(projectTitle);

    const projectTimeline = document.createElement('p');
    projectTimeline.textContent = project.fields['Timeline'];
    projectCard.appendChild(projectTimeline);

    const projectRole = document.createElement('p');
    projectRole.textContent = `${project.fields['Role']} - ${project.fields['Platform']}`;
    projectCard.appendChild(projectRole);

    const projectContent = document.createElement('p');
    projectContent.textContent = project.fields['Content'];
    projectCard.appendChild(projectContent);

    const readMoreButton = document.createElement('button');
    readMoreButton.textContent = "Read More";
    readMoreButton.classList.add('cta-button');
    readMoreButton.onclick = () => {
      alert(`More details about: ${project.fields['Project Name']}`);
    };
    projectCard.appendChild(readMoreButton);

    projectsGrid.appendChild(projectCard);
  });
}

getProjects();