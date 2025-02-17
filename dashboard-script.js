import caseDetails from './enhanced-cases.js';

// Case data with extra display info
const cases = Object.values(caseDetails).map(caseData => ({
    id: caseData.id,
    title: caseData.title,
    status: "ACTIV",
    priority: caseData.priority,
    difficulty: caseData.difficulty,
    description: caseData.brief.split('\n')[0], // First line of brief as description
    difficultyLevel: getDifficultyLevel(caseData.difficulty)
}));

// Helper function to get difficulty level
function getDifficultyLevel(difficulty) {
    const levels = {
        'ÎNCEPĂTOR': 1,
        'INTERMEDIAR': 2,
        'AVANSAT': 3,
        'EXPERT': 4
    };
    return levels[difficulty] || 1;
}

// Create case card HTML
function createCaseCard(caseData) {
    const isSolved = localStorage.getItem(`case_${caseData.id}_status`) === 'solved';
    const statusClass = isSolved ? "solved" : "active";
    
    // Generate difficulty stars
    const difficultyStars = '⭐'.repeat(caseData.difficultyLevel);
    
    // Get difficulty color class
    const difficultyColorClass = getDifficultyColorClass(caseData.difficulty);
    
    return `
        <div class="case-card ${statusClass}" data-case-id="${caseData.id}" data-difficulty="${caseData.difficulty}">
            <div class="case-header">
                <div class="case-header-left">
                    <span class="case-id">${caseData.id}</span>
                    <span class="difficulty-level ${difficultyColorClass}">
                        ${caseData.difficulty} ${difficultyStars}
                    </span>
                </div>
                <span class="case-priority priority-${caseData.priority.toLowerCase()}">${caseData.priority}</span>
            </div>
            <h2 class="case-title">${caseData.title}</h2>
            <p class="case-description">${caseData.description}</p>
            <div class="case-footer">
                <div class="case-status">
                    <span class="status-item">
                        ${isSolved ? '✅ REZOLVAT' : '⚠️ ACTIV'}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// Get color class based on difficulty
function getDifficultyColorClass(difficulty) {
    switch(difficulty.toUpperCase()) {
        case 'ÎNCEPĂTOR':
            return 'difficulty-beginner';
        case 'INTERMEDIAR':
            return 'difficulty-intermediate';
        case 'AVANSAT':
            return 'difficulty-advanced';
        case 'EXPERT':
            return 'difficulty-expert';
        default:
            return '';
    }
}

// Render all cases
function renderCases(filterStatus = 'all', filterDifficulty = 'all') {
    const casesContainer = document.getElementById('casesContainer');
    let filteredCases = [...cases]; // Create a copy of the cases array
    
    // Apply status filter
    if (filterStatus !== 'all') {
        filteredCases = filteredCases.filter(caseData => {
            const isSolved = localStorage.getItem(`case_${caseData.id}_status`) === 'solved';
            return filterStatus === 'solved' ? isSolved : !isSolved;
        });
    }
    
    // Apply difficulty filter
    if (filterDifficulty !== 'all') {
        filteredCases = filteredCases.filter(caseData => 
            caseData.difficulty === filterDifficulty
        );
    }
    
    // Sort cases: active first, then solved
    filteredCases.sort((a, b) => {
        const aIsSolved = localStorage.getItem(`case_${a.id}_status`) === 'solved';
        const bIsSolved = localStorage.getItem(`case_${b.id}_status`) === 'solved';
        if (aIsSolved === bIsSolved) return 0;
        return aIsSolved ? 1 : -1;
    });

    casesContainer.innerHTML = filteredCases.map(createCaseCard).join('');
    
    // Add click handlers and hover effects to all case cards
    document.querySelectorAll('.case-card').forEach(card => {
        card.addEventListener('click', () => {
            const caseId = card.dataset.caseId;
            // Add click animation
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
                window.location.href = `case.html?id=${caseId}`;
            }, 100);
        });
    });
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Create filter containers
    const filtersDiv = document.querySelector('.filters');
    
    // Create status filters container
    const statusFilters = document.createElement('div');
    statusFilters.className = 'status-filters';
    statusFilters.innerHTML = `
        <button class="filter-btn active" data-filter="all">TOATE</button>
        <button class="filter-btn" data-filter="active">ACTIVE</button>
        <button class="filter-btn" data-filter="solved">REZOLVATE</button>
    `;
    
    // Create difficulty filters container
    const difficultyFilters = document.createElement('div');
    difficultyFilters.className = 'difficulty-filters';
    difficultyFilters.innerHTML = `
        <button class="filter-btn active" data-difficulty="all">TOATE</button>
        <button class="filter-btn" data-difficulty="ÎNCEPĂTOR">ÎNCEPĂTOR</button>
        <button class="filter-btn" data-difficulty="INTERMEDIAR">INTERMEDIAR</button>
        <button class="filter-btn" data-difficulty="AVANSAT">AVANSAT</button>
        <button class="filter-btn" data-difficulty="EXPERT">EXPERT</button>
    `;
    
    // Clear and append both filter groups
    filtersDiv.innerHTML = '';
    filtersDiv.appendChild(statusFilters);
    filtersDiv.appendChild(difficultyFilters);
    
    // Add search functionality with debounce
    let searchTimeout;
    document.getElementById('search').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCases = cases.filter(c => 
                c.id.toLowerCase().includes(searchTerm) ||
                c.title.toLowerCase().includes(searchTerm) ||
                c.description.toLowerCase().includes(searchTerm)
            );
            
            const statusFilter = document.querySelector('.status-filters .filter-btn.active').dataset.filter;
            const difficultyFilter = document.querySelector('.difficulty-filters .filter-btn.active').dataset.difficulty;
            
            renderCases(statusFilter, difficultyFilter);
        }, 300); // Debounce delay
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filterType = btn.parentElement.classList.contains('difficulty-filters') 
                ? 'difficulty' 
                : 'status';
            
            // Update active button in the correct group
            btn.parentElement.querySelectorAll('.filter-btn').forEach(b => 
                b.classList.remove('active')
            );
            btn.classList.add('active');
            
            // Add click animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => btn.style.transform = '', 100);
            
            // Get current filters
            const statusFilter = document.querySelector('.status-filters .filter-btn.active').dataset.filter;
            const difficultyFilter = document.querySelector('.difficulty-filters .filter-btn.active').dataset.difficulty;
            
            // Render with both filters
            renderCases(statusFilter, difficultyFilter);
        });
    });
    
    // Initial render
    renderCases();
    
    // Add animation for page load
    document.querySelectorAll('.case-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});