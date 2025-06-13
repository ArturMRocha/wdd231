// recipes.js API/dados
export async function fetchRecipes() {
  const response = await fetch('data/receitas.json');
  if (!response.ok) {
    throw new Error(`Erro HTTP! status: ${response.status}`);
  }
  const data = await response.json();
  return data.recipes;
  }

export const displayRecipes = (recipes, containerSelector) => {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (recipes.length === 0) {
        container.innerHTML = '<p class="no-results">Nenhuma receita encontrada nesta categoria.</p>';
        return;
    }
    
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('article');
        recipeCard.className = 'recipe-card';
        recipeCard.dataset.id = recipe.id;
        
        // Formatar tempo de preparo
        const prepTime = recipe.prepTime < 60 ? 
            `${recipe.prepTime} min` : 
            `${Math.floor(recipe.prepTime/60)}h ${recipe.prepTime%60}min`;
        
        recipeCard.innerHTML = `
            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
                <span class="recipe-badge">${recipe.category}</span>
            </div>
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <div class="recipe-meta">
                    <span>⏱️ ${prepTime}</span>
                    <span>👥 ${recipe.servings} porções</span>
                </div>
                <div class="recipe-actions">
                    <button class="btn">Ver Receita</button>
                    <button class="favorite-btn" aria-label="Favoritar">❤️</button>
                </div>
            </div>
        `;
        
        container.appendChild(recipeCard);
    });
};

// Filtrar receitas por categoria
export const setupFiltering = (recipes) => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recipeGrid = document.querySelector('#all-recipes');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Atualizar botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrar receitas
            const category = button.dataset.category;
            let filteredRecipes = [...recipes];
            
            if (category !== 'all') {
                filteredRecipes = recipes.filter(recipe => 
                    recipe.category.toLowerCase() === category
                );
            }
            
            // Exibir receitas filtradas
            displayRecipes(filteredRecipes, '#all-recipes');
        });
    });
};