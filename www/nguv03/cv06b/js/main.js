/**
 * vyber tlacitka
 *      nastaveni posluchace udalosti 'click'
 *      funkce, ktera se spusti kdyz se klikne na tlacitko
 *          vyber elementu #text-content
 *          uprava textoveho obsahu tohoto elementu
 *          vyber textoveho inputu #text-input a ziskavani hodnoty inputu
 *          hodnotu inputu dosadime do textoveho obsahu textoveho elementu
 */
document.querySelector('#submit').addEventListener('click', () => {
    document.querySelector('#text-content').textContent = 
        document.querySelector('#text-input').value;
});
