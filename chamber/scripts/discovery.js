// Load JSON data and create cards
fetch('data/attractions.json')
    .then(response => response.json())
    .then(data => {
        const gallery = document.getElementById('gallery');
        
        data.attractions.forEach(attraction => {
            const card = document.createElement('article');
            card.className = 'card';
            card.innerHTML = `
                <figure>
                    <img src="images/${attraction.image}" alt="${attraction.name}" loading="lazy">
                </figure>
                <div class="card-content">
                    <h2>${attraction.name}</h2>
                    <address>${attraction.address}</address>
                    <p>${attraction.description}</p>
                    <button>Learn More</button>
                </div>
            `;
            gallery.appendChild(card);
        });
    });

// Visit tracking
document.addEventListener('DOMContentLoaded', () => {
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date();
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const timeDiff = currentDate - lastVisitDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', currentDate);
    
    // Footer year and last modified
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const primaryNav = document.getElementById('primary-nav');
    
    menuToggle.addEventListener('click', () => {
        primaryNav.classList.toggle('show');
    });
});
fetch('data/attractions.json')
    .then(response => response.json())
    .then(data => {
        console.log("Imagens a serem carregadas:", 
            data.attractions.map(a => `images/${a.image}`));
    });