document.addEventListener('DOMContentLoaded', () => {
    // Verificação de pré-requisitos para o modal
    const modalRequiredElements = [
        '#recipe-modal',
        '#modal-recipe-details',
        '.close-modal'
    ];
    
    const allElementsExist = modalRequiredElements.every(selector => 
        document.querySelector(selector) !== null
    );
    
    if (allElementsExist) {
        console.log('Inicializando modal...');
        setupModal();
    } else {
        console.log('Modal não inicializado: elementos ausentes');
    }

});

    
// Módulo principal
import { fetchRecipes, displayRecipes } from './recipes.js';
import { setupModal } from './modal.js';
import { setupNavigation } from './navigation.js';
import { setupFavorites } from './favorites.js';


// Configurações iniciais
document.addEventListener('DOMContentLoaded', () => {
    // Configurar navegação responsiva
    setupNavigation();
    
    // Configurar modal
    setupModal();
    
    // Configurar sistema de favoritos
    setupFavorites();

     // Inicializar apenas se houver modal na página
    if (document.querySelector('#modal')) 
    setupModal();
    
    // Carregar e exibir receitas em destaque
    const featuredContainer = document.querySelector('#featured-recipes');
    if (featuredContainer) {
        fetchRecipes()
            .then(recipes => {
                // Selecionar 4 receitas aleatórias para destaque
                const featured = [...recipes].sort(() => 0.5 - Math.random()).slice(0, 4);
                displayRecipes(featured, '#featured-recipes');
            })
            .catch(error => {
                console.error('Erro ao carregar receitas:', error);
                featuredContainer.innerHTML = '<p class="error">Não foi possível carregar as receitas. Tente novamente mais tarde.</p>';
            });
    }
    
    // Configurar formulário de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Simular envio
            newsletterForm.innerHTML = '<p class="success">Obrigado por se inscrever! Você receberá nossas receitas em breve.</p>';
            
            // Salvar no localStorage
            localStorage.setItem('newsletterSubscribed', 'true');
        });
    }
});