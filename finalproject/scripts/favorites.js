// Módulo para gerenciar favoritos
export const setupFavorites = () => {
    // Carregar favoritos do localStorage
    const getFavorites = () => {
        const favorites = localStorage.getItem('recipeFavorites');
        return favorites ? JSON.parse(favorites) : [];
    };
    
    // Salvar favoritos no localStorage
    const saveFavorites = (favorites) => {
        localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
    };
    
    // Alternar favorito
    const toggleFavorite = (recipeId) => {
        const favorites = getFavorites();
        const index = favorites.indexOf(recipeId);
        
        if (index > -1) {
            favorites.splice(index, 1); // Remover dos favoritos
        } else {
            favorites.push(recipeId); // Adicionar aos favoritos
        }
        
        saveFavorites(favorites);
        return index === -1; // Retorna true se foi favoritado
    };
    
    // Atualizar ícone de favorito
    const updateFavoriteIcon = (button, isFavorite) => {
        if (isFavorite) {
            button.classList.add('favorited');
            button.setAttribute('aria-label', 'Desfavoritar');
        } else {
            button.classList.remove('favorited');
            button.setAttribute('aria-label', 'Favoritar');
        }
    };
    
    // Evento para favoritar receitas
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('favorite-btn')) {
            const button = e.target;
            const recipeCard = button.closest('.recipe-card');
            
            if (recipeCard) {
                const recipeId = recipeCard.dataset.id;
                const isFavorite = toggleFavorite(recipeId);
                updateFavoriteIcon(button, isFavorite);
            }
        }
    });
    
    // Atualizar ícones na inicialização
    document.addEventListener('DOMContentLoaded', () => {
        const favorites = getFavorites();
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        
        favoriteButtons.forEach(button => {
            const recipeCard = button.closest('.recipe-card');
            if (recipeCard) {
                const recipeId = recipeCard.dataset.id;
                const isFavorite = favorites.includes(recipeId);
                updateFavoriteIcon(button, isFavorite);
            }
        });
    });
};