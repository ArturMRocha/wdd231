// modal.js
import { fetchRecipes } from './recipes.js';

// Variável global para armazenar as receitas
let allRecipes = [];

// Função para pré-carregar as receitas
export const preloadRecipes = async () => {
    try {
        allRecipes = await fetchRecipes();
        console.log('Receitas pré-carregadas para o modal');
    } catch (error) {
        console.error('Erro ao pré-carregar receitas para o modal:', error);
    }
};

export const setupModal = () => {
    // Seleção segura de elementos com mensagens detalhadas
    const modal = document.getElementById('recipe-modal');
    const modalContent = document.getElementById('modal-recipe-details');
    const closeBtn = document.querySelector('.close-modal');
    
    // Verificação rigorosa de cada elemento
    if (!modal) {
        console.error('CRÍTICO: Elemento #recipe-modal não encontrado no DOM');
        return;
    }
    
    if (!modalContent) {
        console.error('CRÍTICO: Elemento #modal-recipe-details não encontrado');
        return;
    }
    
    if (!closeBtn) {
        console.error('CRÍTICO: Elemento .close-modal não encontrado');
        return;
    }
    
    // Funções de controle do modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaura rolagem da página
    };
    
    const openModal = (recipe) => {
        // Formatar tempo de preparo
        const prepTime = recipe.prepTime < 60 ? 
            `${recipe.prepTime} min` : 
            `${Math.floor(recipe.prepTime/60)}h ${recipe.prepTime%60}min`;
        
        // Formatar ingredientes com verificação de segurança
        const ingredientsList = recipe.ingredients?.map(ing => `
            <li>
                <span>${ing.name || 'Ingrediente'}</span>
                <span>${ing.amount || 'Qtd. não especificada'}</span>
            </li>
        `).join('') || '<li>Nenhum ingrediente listado</li>';
        
        // Formatar instruções com verificação de segurança
        const instructionsList = recipe.steps?.map((step, i) => `
            <li>${step || `Passo ${i + 1} não descrito`}</li>
        `).join('') || '<li>Nenhuma instrução disponível</li>';
        
        // Construir conteúdo do modal com fallbacks
        modalContent.innerHTML = `
            <div class="modal-recipe-image">
                <img src="${recipe.image || 'placeholder.jpg'}" alt="${recipe.title || 'Receita'}" loading="lazy">
            </div>
            <h2>${recipe.title || 'Receita sem nome'}</h2>
            <div class="modal-recipe-meta">
                <div>
                    <span>⏱️</span>
                    <span>${prepTime}</span>
                </div>
                <div>
                    <span>👥</span>
                    <span>${recipe.servings || 'N/A'} porções</span>
                </div>
                <div>
                    <span>🔥</span>
                    <span>${recipe.calories || 'N/A'} kcal</span>
                </div>
            </div>
            <div class="ingredients-list">
                <h3>Ingredientes</h3>
                <ul>${ingredientsList}</ul>
            </div>
            <div class="instructions-list">
                <h3>Modo de Preparo</h3>
                <ol>${instructionsList}</ol>
            </div>
        `;
        
        // Ativar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloqueia rolagem da página
    };
    
    // Delegation de eventos para abrir modal
    document.addEventListener('click', (e) => {
        const recipeCard = e.target.closest('.recipe-card');
        if (!recipeCard) return;
        
        const recipeId = recipeCard.dataset.id;
        if (!recipeId) {
            console.warn('Recipe card sem ID:', recipeCard);
            return;
        }
        
        // Verificar se já temos as receitas carregadas
        if (allRecipes.length > 0) {
            const recipe = allRecipes.find(r => r.id == recipeId);
            if (recipe) {
                openModal(recipe);
            } else {
                console.error(`Receita com ID ${recipeId} não encontrada`);
                // Fallback UI
                modalContent.innerHTML = `<h2>Receita não encontrada</h2><p>Desculpe, a receita solicitada não está disponível.</p>`;
                modal.classList.add('active');
            }
        } else {
            // Se não tivermos as receitas, buscamos apenas a necessária
            fetchRecipes()
                .then(recipes => {
                    const recipe = recipes.find(r => r.id == recipeId);
                    if (recipe) {
                        openModal(recipe);
                    } else {
                        console.error(`Receita com ID ${recipeId} não encontrada`);
                        modalContent.innerHTML = `<h2>Receita não encontrada</h2><p>Desculpe, a receita solicitada não está disponível.</p>`;
                        modal.classList.add('active');
                    }
                })
                .catch(error => {
                    console.error('Erro ao carregar receitas:', error);
                    modalContent.innerHTML = `<h2>Erro</h2><p>Não foi possível carregar os dados da receita.</p>`;
                    modal.classList.add('active');
                });
        }
    });
    
    // Eventos de fechamento
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    console.log('Modal configurado com sucesso para:', modal);
};