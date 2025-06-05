// Set timestamp when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Timestamp
    document.getElementById('timestamp').value = new Date().toISOString();
    
    // Modal functionality with improvements
    const modalLinks = document.querySelectorAll('.modal-link');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
    let currentModal = null;

    // Show modal function
    function showModal(modalId) {
        // Hide current modal if exists
        if (currentModal) {
            currentModal.style.display = 'none';
        }
        
        const modal = document.querySelector(modalId);
        if (modal) {
            modal.style.display = 'block';
            currentModal = modal;
            
            // Focus on close button for accessibility
            const closeBtn = modal.querySelector('.close');
            if (closeBtn) {
                closeBtn.focus();
            }
        }
    }

    // Hide modal function
    function hideModal(modal) {
        modal.style.display = 'none';
        currentModal = null;
    }

    // Event listeners for modal links
    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href');
            showModal(modalId);
        });
    });

    // Event listeners for close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            hideModal(this.closest('.modal'));
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target);
        }
    });

    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        // Escape key closes modal
        if (e.key === 'Escape' && currentModal) {
            hideModal(currentModal);
        }
    });

    // Animation for membership cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});