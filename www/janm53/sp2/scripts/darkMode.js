// Načte stav dark mode z lokálního úložiště a uloží ho do proměnné `darkMode`.
let darkMode = localStorage.getItem('darkMode');

// Kontroluje, zda je dark mode aktivní (hodnota 'true'). Pokud ano, aplikuje třídu 'dark-mode' na tělo dokumentu a aktualizuje text tlačítka.
if (darkMode === 'true') {
    document.body.classList.toggle('dark-mode');
    let button = document.getElementById('toggleDarkMode');
    button.textContent = 'Toggle Bright Mode';
}

// Funkce pro přepínání dark mode. Přidává nebo odebírá třídu 'dark-mode' na tělo dokumentu.
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    let isDarkMode = document.body.classList.contains('dark-mode');
    let button = document.getElementById('toggleDarkMode');
    let text = 'Toggle Bright Mode';

    // Mění text tlačítka a hodnotu v lokálním úložišti v závislosti na tom, zda je dark mode aktivní.
    if (!isDarkMode) {
        text = 'Toggle Dark Mode';
        localStorage.setItem('darkMode', 'false');
    } else {
        localStorage.setItem('darkMode', 'true');
    }
    button.textContent = text;
}

// Po načtení obsahu dokumentu přiřadí událost 'click' k tlačítku, které spouští funkci pro přepínání dark mode.
document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('toggleDarkMode');
    button.addEventListener('click', toggleDarkMode);
});
