// filter.js
import { displayRecipes } from './recipes.js';

// Função para normalizar categorias para comparação
function normalizeCategory(category) {
    return category
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/\s+/g, '-'); // Substitui espaços por hífens
}

// Filtrar receitas por categoria
export const setupFiltering = (recipes) => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Atualizar botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar receitas
            const category = button.dataset.category;
            let filteredRecipes = [...recipes];
            
            if (category !== 'all') {
                filteredRecipes = recipes.filter(recipe => {
                    // Normaliza a categoria da receita para comparar
                    const normalizedRecipeCategory = normalizeCategory(recipe.category);
                    return normalizedRecipeCategory === category;
                });
            }
            
            // Exibir receitas filtradas
            displayRecipes(filteredRecipes, '#all-recipes');
        });
    });
};