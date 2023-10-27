/**
 * tohle vybere element, prida k tomu udalost 'click'
 * kdyz se klikne, vybere se element #logo a element #text-input
 * dosadi se hodnota #text-inputu do textoveho obsahu elementu #logo
 */
document.querySelector('#submit-button').addEventListener('click', () => {
    document.querySelector('#logo').textContent = 
    document.querySelector('#text-input').value;
});


// komentar
/* viceradkovy komentar */