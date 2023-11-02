/* HOMEWORK */
/**
 * 0) Pre-preparacion.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!" 
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou "tasks" - <div id="tasks"></div>). 
 * - Na stránce vytvořte místo pro výpis výsledků úkolů (div, který má id s hodnotou "result" - <div id="results"></div>).
 * 
 * - Připojte tento homework.js soubor k vytvořené HTML stránce pomocí tagu <script> (viz LAB) a vyzkoušejte
 * console.log('Ahoj světe');
 */

console.log('Ahoj světe');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

function calculateAge(yearOfBirth) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearOfBirth;
    console.log(`Pepovi je ${age} let.`);
}

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

function convertTemperature(temp, unit) {
    if (unit === 'C') {
        const fahrenheit = temp * 9 / 5 + 32;
        console.log(`${temp}°C = ${fahrenheit}°F`);
    } else if (unit === 'F') {
        const celsius = (temp - 32) * 5 / 9;
        console.log(`${temp}°F = ${celsius}°C`);
    } else {
        console.log('Invalid unit. Use "C" or "F".');
    }
}

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvoříte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 * 
 * Pro testování funkce:
 * - Pouze pomocí JavaScriptu (bez knihoven) vytvořte HTML tlačítko s názvem této úlohy, resp. co funkce dělá, a 
 * id s číslem úlohy <button id="task-1">Uloha 1 (Pepe's age)</button>, umístěte ho na stránku do předem vytvořeného 
 * místa <div id="tasks"></div> a pomocí posluchače události "click" nabindujte implementovanou funkci na toto tlačítko.
 * 
 * Výsledkem má být tlačítko, na které když kliknete, tak se provede to, co je implementováno ve funkci.
 *
 * Příklad vytvoření tlačítka s funkcí:
 * 
 * // deklarace a implementace funkce
 * const sayHello = () => {
 *   console.log('Hello');
 * };
 * 
 * // vytvoření tlačítka
 * const buttonSayHello = document.createElement('button');
 * // nastavení textu tlačítka
 * buttonSayHello.innerText = 'Say Hello';
 * // nastavení atributu id tlačítka
 * buttonSayHello.setAttribute('id', 'task-0');
 * // nabindování funkce na událost click tlačítka
 * buttonSayHello.addEventListener('click', () => {
 *   sayHello();
 * });
 * 
 * // výběr existujícího elementu na stránce s id="tasks"
 * const tasks = document.querySelector('#tasks');
 * // vložení vytvořeného tlačítka do vybraného elementu na stránce
 * tasks.appendChild(buttonSayHello);
 */
// Solution here

const button1 = document.createElement('button');
button1.innerText = `Uloha 1 (Pepe's age)`;
button1.setAttribute('id', 'task-1');
button1.addEventListener('click', () => {
    calculateAge(2001);
});
const tasks = document.querySelector('#tasks');
tasks.appendChild(button1);

const button2 = document.createElement('button');
button2.innerText = `Uloha 2 (WTF (wow, that's fun))`;
button2.setAttribute('id', 'task-2');
button2.addEventListener('click', () => {
    convertTemperature(32, 'C');
});
tasks.appendChild(button2);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

function calculatePercentage(a, b) {
    if (b === 0) {
        console.log('Není možné dělit nulou.');
        return;
    }
    const percentage = (a / b) * 100;
    console.log(`${a} je ${percentage.toFixed(2)}% z ${b}.`);
}

const button3 = document.createElement('button');
button3.innerText = 'Uloha 4 (%CENSORED%)';
button3.setAttribute('id', 'task-4');
button3.addEventListener('click', () => {
    calculatePercentage(21, 42);
});
tasks.appendChild(button3);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

function compareNumbers(a, b) {
    if (a < b) {
        console.log(`${b} je větší než ${a}.`);
    } else if (a > b) {
        console.log(`${a} je větší než ${b}.`);
    } else {
        console.log(`${a} a ${b} se rovnají.`);
    }
}

const button4 = document.createElement('button');
button4.innerText = 'Uloha 5 - test 1';
button4.setAttribute('id', 'task-5.1');
button4.addEventListener('click', () => {
    compareNumbers(5, 10);
});
tasks.appendChild(button4);

const button5 = document.createElement('button');
button5.innerText = 'Uloha 5 - test 2';
button5.setAttribute('id', 'task-5.2');
button5.addEventListener('click', () => {
    compareNumbers(5.6, 10 / 2);
});
tasks.appendChild(button5);

const button6 = document.createElement('button');
button6.innerText = 'Uloha 5 - test 3';
button6.setAttribute('id', 'task-5.3');
button6.addEventListener('click', () => {
    compareNumbers(2.5, 10 / 4);
});
tasks.appendChild(button6);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

function printMultiplesOf13() {
    for (let i = 0; i <= 730; i += 13) {
        console.log(i);
    }
}

const button7 = document.createElement('button');
button7.innerText = 'Uloha 6 (I can cleary see the pattern.)';
button7.setAttribute('id', 'task-6');
button7.addEventListener('click', () => {
    printMultiplesOf13();
});
tasks.appendChild(button7);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

function calculateCircleArea(radius) {
    const area = Math.PI * Math.pow(radius, 2);
    console.log(`Pro poloměr ${radius} je obsah ${area.toFixed(2)}.`);
}

const button8 = document.createElement('button');
button8.innerText = 'Uloha 7 (Around and about.)';
button8.setAttribute('id', 'task-7');
button8.addEventListener('click', () => {
    calculateCircleArea(5);
});
tasks.appendChild(button8);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

function calculateConeVolume(height, radius) {
    const volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
    console.log(`Objem kuželu o výšce ${height} a poloměru ${radius} je ${volume.toFixed(2)}.`);
}

const button9 = document.createElement('button');
button9.innerText = 'Uloha 8 (Another dimension.)';
button9.setAttribute('id', 'task-8');
button9.addEventListener('click', () => {
    calculateConeVolume(8, 4);
});
tasks.appendChild(button9);

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

function isTriangle(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        console.log(`Ano, ze stran ${a}, ${b}, ${c} se dá postavit trojúhelník.`);
        return true;
    } else {
        console.log(`Ne, ze stran ${a}, ${b}, ${c} se nedá postavit trojúhelník.`);
        return false;
    }
}

// Example usage:

const button10 = document.createElement('button');
button10.innerText = 'Uloha 9 (Not sure if triangle, or just some random values.)';
button10.setAttribute('id', 'task-9');
button10.addEventListener('click', () => {
    isTriangle(3, 4, 5);
});
tasks.appendChild(button10);

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
// - krok 1 - vytvořte funkci
//   - krok 1.1 - pomocí selektoru vyberte container pro výpis výsledků a uložte ho do proměnné
//   - krok 1.2 - zvalidujte vstupní argumenty pomocí funkce z úlohy č. 9
//     - v případě nevalidních hodnot vypište chybovou hlášku na místo pro výpis výsledků a funkci ukončete
//     - v případě validních hodnot pokračujte s výpočtem
//   - krok 1.3 - spočítejte obsah trojúhelníku podle Heronovy vzorce a výsledek uložte do proměnné
//   - krok 1.4 - vypište výsledek na místo pro výpis výsledků
// - krok 2 - vytvořte tlačítko
// - krok 3 - nabindujte na toto tlačítko callback, ve kterém zavoláte implementovanou funkci pro výpočet a výpis výsledků
// - krok 4 - tlačítko umístěte na stránku
// - krok 5 - otestujte řešení klikáním na tlačítko

function calculateTriangleArea(a, b, c) {
    const results = document.querySelector('#results');
    if (isTriangle(a, b, c)) {
        const s = (a + b + c) / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        results.innerHTML = `Obsah trojúhelníku o stranách ${a}, ${b}, ${c} je ${area.toFixed(2)}.`;
    } else {
        results.innerHTML = 'Dané strany netvoří trojúhelník.';
    }
}

const button11 = document.createElement('button');
button11.innerText = 'Uloha 10 (Heroic performance.)';
button11.setAttribute('id', 'task-10');
button11.addEventListener('click', () => {
    calculateTriangleArea(3, 4, 5);;
});
tasks.appendChild(button11);