// Importă detaliile cazurilor
import caseDetails from './enhanced-cases.js';

// Verifică dacă suntem pe pagina corectă
document.addEventListener('DOMContentLoaded', () => {
    // Get case ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const caseId = urlParams.get('id');
    
    if (caseId && caseDetails[caseId]) {
        loadCase(caseId);
        // Adaugă handler pentru tasta ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                window.location.href = 'index.html';
            }
        });
    } else {
        window.location.href = 'index.html';
    }
});

// Încarcă detaliile cazului
function loadCase(caseId) {
    const caseData = caseDetails[caseId];
    
    document.getElementById('caseId').textContent = caseData.id;
    document.getElementById('caseTitle').textContent = caseData.title;
    document.getElementById('casePriority').textContent = caseData.priority;
    document.getElementById('casePriority').className = `case-priority priority-${caseData.priority.toLowerCase()}`;
    
    document.getElementById('caseBrief').textContent = caseData.brief;
    document.getElementById('caseObjective').textContent = caseData.objective;
    document.getElementById('technicalData').textContent = caseData.technicalData;
}

// Animație pentru rezultat
function animateResult(isSuccess) {
    const output = document.getElementById('output');
    output.style.opacity = '0';
    output.classList.remove('hidden');
    
    setTimeout(() => {
        output.style.transition = 'opacity 0.5s ease-in-out';
        output.style.opacity = '1';
    }, 100);
    
    if (isSuccess) {
        document.body.style.animation = 'successPulse 1.5s ease-in-out';
    } else {
        document.body.style.animation = 'errorShake 0.5s ease-in-out';
    }
}

// Verifică codul de acces
function verifyCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const caseId = urlParams.get('id');
    const caseData = caseDetails[caseId];
    
    const accessCode = document.getElementById('accessCode').value.trim();
    const output = document.getElementById('output');
    const outputText = document.getElementById('outputText');
    
    if (accessCode === caseData.solution) {
        // Marchează cazul ca rezolvat
        localStorage.setItem(`case_${caseId}_status`, 'solved');
        
        outputText.innerHTML = caseData.successMessage;
        outputText.className = 'output-text success';
        animateResult(true);
    } else {
        outputText.innerHTML = caseData.failureMessage;
        outputText.className = 'output-text error';
        animateResult(false);
    }
}

// Expune funcția global pentru a putea fi accesată din HTML
window.verifyCode = verifyCode;