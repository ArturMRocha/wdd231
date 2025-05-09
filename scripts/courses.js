// Function to update the footer with current year and last modified date
function updateFooterDates() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    
    const lastModified = new Date(document.lastModified);
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    const formattedDate = lastModified.toLocaleDateString('pt-BR', options).replace(',', '');
    document.getElementById('lastModified').textContent = `Última atualização: ${formattedDate}`;
}

// Add country flag emoji
function addCountryFlag() {
    const countryElement = document.getElementById('country');
    if (countryElement) {
        countryElement.innerHTML = 'Brazil <span class="flag">🇧🇷</span>';
    }
}

// Mark completed courses
function markCompletedCourses() {
    const completedCourses = ['CSE 110', 'WDD 130', 'CSE 111'];
    
    document.querySelectorAll('.certificate-grid div').forEach(course => {
        const courseCode = course.textContent.trim();
        if (completedCourses.includes(courseCode)) {
            course.classList.add('completed');
        } else if (courseCode && !['All', 'CSE', 'WDD'].includes(courseCode)) {
            course.classList.add('pending');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateFooterDates();
    addCountryFlag();
    markCompletedCourses();
});
// Se precisar manipular os elementos dinamicamente
document.addEventListener('DOMContentLoaded', function() {
    // Pode adicionar interações específicas para esta seção aqui
    const courseWorkItems = document.querySelectorAll('.course-work-list li');
    
    courseWorkItems.forEach(item => {
        item.addEventListener('click', function() {
            // Adicione comportamentos de clique se necessário
        });
    });
});