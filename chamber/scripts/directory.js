//hamburguer//
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  function isMobile() {
    return window.innerWidth < 769;
  }

  function updateMenuDisplay() {
    if (isMobile()) {
      navMenu.classList.add("hidden");
      menuToggle.innerHTML = "☰";
    } else {
      navMenu.classList.remove("hidden");
      menuToggle.innerHTML = "✕";
    }
  }

  menuToggle.addEventListener("click", () => {
    if (isMobile()) {
      navMenu.classList.toggle("hidden");
      const isOpen = !navMenu.classList.contains("hidden");
      menuToggle.innerHTML = isOpen ? "✕" : "☰";
    }
  });

  window.addEventListener("resize", updateMenuDisplay);
  updateMenuDisplay();
});




//json//

const dataUrl = 'data/members.json'; // Caminho para seu arquivo JSON
const cardsContainer = document.querySelector('.directory-cards');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');

// Aplica classe CSS baseada na visualização escolhida
gridBtn.addEventListener('click', () => {
  cardsContainer.classList.add('grid');
  cardsContainer.classList.remove('list');
});

listBtn.addEventListener('click', () => {
  cardsContainer.classList.add('list');
  cardsContainer.classList.remove('grid');
});

// Busca os dados do JSON e popula os cards
async function loadMembers() {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error('Erro ao carregar dados.');
    const data = await response.json();
    displayMembers(data.members);
  } catch (err) {
    console.error('Erro ao buscar membros:', err);
  }
}

function displayMembers(members) {
  cardsContainer.innerHTML = ''; // Limpa os cards existentes
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.description}</p>
      <img src="images/${member.image}" alt="${member.name} logo">
      <p><strong>Email:</strong> <a href="mailto:${member.phone}">${member.phone}</a></p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
    `;

    cardsContainer.appendChild(card);
  });
}

loadMembers();


//footer//


  // Define o ano atual
  const currentYear = new Date().getFullYear();
  document.getElementById("currentYear").textContent = currentYear;

  // Define a última data de modificação
  const lastModified = document.lastModified;
  document.getElementById("lastModified").textContent = lastModified;



