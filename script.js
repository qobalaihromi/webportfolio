window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.sticky-navbar');
    const heroSection = document.querySelector('.section-hero');
    
    const heroMargin = getComputedStyle(heroSection).marginLeft;
    
    if (window.pageYOffset > heroSection.offsetHeight) {
      navbar.style.margin = '0'; // Ketika sticky, margin dihapus
      navbar.style.padding = '0 100px'; // Sticky mengikuti padding yang lebih besar
    } else {
      navbar.style.margin = `0 ${heroMargin}`; // Saat di hero section, margin mengikuti hero section
      navbar.style.padding = '8px'; // Default padding pada sticky navbar
    }
  });
  
  // Ganti Base ID dan API Key sesuai dengan informasi kamu
const baseUrl = 'https://api.airtable.com/v0/appCGbKOTltcfhjqx/Web%20Portfolio';
const apiKey = 'patz7CHPSxFhadt6epXXXXX';  // Gunakan API key lengkap kamu

// Function untuk mengambil project dari Airtable
async function fetchProjects() {
  const response = await fetch(`${baseUrl}?api_key=${apiKey}`);
  const data = await response.json();
  return data.records;
}

// Function untuk menampilkan project di section portfolio
function renderProjects(projects) {
  const portfolioContainer = document.querySelector('.portfolio-container');

  projects.forEach((project) => {
    const projectData = project.fields;
    const projectCard = `
      <div class="portfolio-card">
        <img src="${projectData['Image URL']}" alt="${projectData['Project Name']}">
        <h3>${projectData['Project Name']}</h3>
        <p>${projectData['Content']}</p>
        <a href="#" class="cta-button">Readmore →</a>
      </div>
    `;

    portfolioContainer.insertAdjacentHTML('beforeend', projectCard);
  });
}

// Fetch dan tampilkan project
fetchProjects().then(renderProjects);

// Example: Fetch data from Airtable and create cards dynamically
const airtableUrl = 'YOUR_AIRTABLE_API_URL'; // Replace with your Airtable API URL

fetch(airtableUrl)
  .then(response => response.json())
  .then(data => {
    const portfolioContainer = document.querySelector('.portfolio-container');
    
    data.records.forEach(record => {
      // Create the card element
      const card = document.createElement('div');
      card.classList.add('portfolio-card');
      
      // Create and append the thumbnail
      const thumbnail = document.createElement('div');
      thumbnail.classList.add('thumbnail');
      thumbnail.style.backgroundImage = `url(${record.fields.Image_URL})`; // Assuming "Image_URL" field
      card.appendChild(thumbnail);
      
      // Create and append the title
      const title = document.createElement('h3');
      title.textContent = record.fields.Project_Name; // Assuming "Project_Name" field
      card.appendChild(title);
      
      // Create and append the description
      const description = document.createElement('p');
      description.textContent = record.fields.Content; // Assuming "Content" field
      card.appendChild(description);
      
      // Create and append the "Readmore" button
      const button = document.createElement('a');
      button.href = '#'; // You can add actual links here
      button.classList.add('cta-button');
      button.textContent = 'Readmore →';
      card.appendChild(button);
      
      // Append the card to the container
      portfolioContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching data:', error));

