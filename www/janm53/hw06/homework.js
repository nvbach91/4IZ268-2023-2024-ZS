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

// Deklarace proměnné pro rok narození
var birthYear = 2001;

// Získání aktuálního roku
var currentYear = new Date().getFullYear();

// Výpočet věku
var age = currentYear - birthYear;

// Výpis věku na konzoli pomocí zřetězení řetězců
console.log(`Pepe je ${age} let starý.`);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
 */
// Solution here

// Deklarace proměnných pro teplotu ve stupních Celsius a Fahrenheit
var celsius = 20;
var fahrenheit = 68;

// Výpočet teploty ve stupních Fahrenheit z teploty ve stupních Celsius
var celsiusToFahrenheit = (celsius * 9) / 5 + 32;

// Výpočet teploty ve stupních Celsius z teploty ve stupních Fahrenheit
var fahrenheitToCelsius = ((fahrenheit - 32) * 5) / 9;

// Výpis výsledků na konzoli
console.log(`${celsius}°C = ${celsiusToFahrenheit}°F`);
console.log(`${fahrenheit}°F = ${fahrenheitToCelsius}°C`);


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

// Funkce pro výpočet a výpis věku Pepy
function pepesAge(birthYear) {
    var currentYear = new Date().getFullYear();
    var age = currentYear - birthYear;
    console.log(`Pepe je ${age} let starý.`);
}

// Funkce pro výpočet a výpis teploty ve stupních Fahrenheit a Celsius
function convertTemperature(celsius, fahrenheit) {
    var celsiusToFahrenheit = (celsius * 9) / 5 + 32;
    var fahrenheitToCelsius = ((fahrenheit - 32) * 5) / 9;
    console.log(`${celsius}°C = ${celsiusToFahrenheit}°F`);
    console.log(`${fahrenheit}°F = ${fahrenheitToCelsius}°C`);
}

// Vytvoření tlačítka pro úlohu 1 (Pepe's age)
const buttonPepesAge = document.createElement('button');
buttonPepesAge.innerText = 'Uloha 1 (Pepe\'s age)';
buttonPepesAge.setAttribute('id', 'task-1');
buttonPepesAge.addEventListener('click', () => {
    pepesAge(1990);  // Předání argumentu funkci
});

// Vytvoření tlačítka pro úlohu 2 (Convert temperature)
const buttonConvertTemperature = document.createElement('button');
buttonConvertTemperature.innerText = 'Uloha 2 (Convert temperature)';
buttonConvertTemperature.setAttribute('id', 'task-2');
buttonConvertTemperature.addEventListener('click', () => {
    convertTemperature(20, 68);  // Předání argumentů funkci
});

// Výběr existujícího elementu na stránce s id="tasks"
const tasks = document.querySelector('#tasks');
// Vložení vytvořených tlačítek do vybraného elementu na stránce
tasks.appendChild(buttonPepesAge);
tasks.appendChild(buttonConvertTemperature);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

// Funkce pro výpočet a výpis podílu ve formátu procent
function calculatePercentage(num1, num2) {
    // Kontrola, zda druhé číslo není nula, aby se předešlo dělení nulou
    if (num2 === 0) {
        document.getElementById('results').innerText = 'Dělení nulou není možné.';
        return;
    }
    // Výpočet procentuálního podílu
    var percentage = (num1 / num2) * 100;
    // Zaokrouhlení výsledku na 2 desetinná místa
    var formattedPercentage = percentage.toFixed(2);
    // Výpis výsledku na stránku
    document.getElementById('results').innerText = `${num1} je ${formattedPercentage}% z ${num2}`;
}

// Vytvoření tlačítka pro úlohu 4 (%CENSORED%)
const buttonCalculatePercentage = document.createElement('button');
buttonCalculatePercentage.innerText = 'Uloha 4 (%CENSORED%)';
buttonCalculatePercentage.setAttribute('id', 'task-4');
buttonCalculatePercentage.addEventListener('click', () => {
    calculatePercentage(21, 42);  // Předání argumentů funkci
});

// Výběr existujícího elementu na stránce s id="tasks"
const task4 = document.querySelector('#tasks');
// Vložení vytvořeného tlačítka do vybraného elementu na stránce
tasks.appendChild(buttonCalculatePercentage);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

// Funkce pro porovnání dvou čísel a výpis výsledku na stránku
function compareNumbers(num1, num2) {
    // Deklarace proměnné pro výsledný text
    let resultText;

    // Porovnání čísel a přiřazení výsledného textu
    if (num1 > num2) {
        resultText = `${num1} je větší než ${num2}.`;
    } else if (num1 < num2) {
        resultText = `${num2} je větší než ${num1}.`;
    } else {
        resultText = `Čísla ${num1} a ${num2} se rovnají.`;
    }

    // Výpis výsledku na stránku
    document.getElementById('results').innerText = resultText;
}

// Funkce pro vytvoření tlačítka, které spustí funkci compareNumbers s předdefinovanými argumenty
function createCompareButton(id, text, num1, num2) {
    const button = document.createElement('button');
    button.innerText = text;
    button.setAttribute('id', id);
    button.addEventListener('click', () => {
        compareNumbers(num1, num2);
    });
    document.querySelector('#tasks').appendChild(button);
}

// Vytvoření tlačítek pro různé kombinace argumentů
createCompareButton('task-5-1', 'Porovnej 10 a 20', 10, 20);
createCompareButton('task-5-2', 'Porovnej 30.5 a 30.5', 30.5, 30.5);
createCompareButton('task-5-3', 'Porovnej 2/3 a 3/4', 2/3, 3/4);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

// Funkce pro výpis všech násobků čísla 13, které jsou menší nebo rovné 730
function printMultiplesOf13() {
    // Inicializace prázdného řetězce pro výsledek
    let resultText = '';

    // Cyklus for, který projde všechny násobky čísla 13 od 0 do 730
    for (let i = 0; i <= 730; i += 13) {
        // Přidání aktuálního násobku do řetězce výsledku
        resultText += i + ' ';
    }

    // Výpis výsledku na stránku
    document.getElementById('results').innerText = resultText.trim();  // .trim() odstraní extra mezeru na konci
}

// Vytvoření tlačítka pro úlohu 6 (I can clearly see the pattern)
const buttonPrintMultiplesOf13 = document.createElement('button');
buttonPrintMultiplesOf13.innerText = 'Uloha 6 (I can cleary see the pattern)';
buttonPrintMultiplesOf13.setAttribute('id', 'task-6');
buttonPrintMultiplesOf13.addEventListener('click', printMultiplesOf13);

// Vložení vytvořeného tlačítka do vybraného elementu na stránce
tasks.appendChild(buttonPrintMultiplesOf13);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

// Funkce pro výpočet a výpis obsahu kruhu
function calculateCircleArea(radius) {
    // Výpočet obsahu kruhu pomocí vzorce πr^2
    var area = Math.PI * Math.pow(radius, 2);

    // Výpis výsledku na stránku
    document.getElementById('results').innerText = `Obsah kruhu s poloměrem ${radius} je ${area.toFixed(2)}.`;
}

// Vytvoření tlačítka pro úlohu 7 (Around and about)
const buttonCalculateCircleArea = document.createElement('button');
buttonCalculateCircleArea.innerText = 'Uloha 7 (Around and about)';
buttonCalculateCircleArea.setAttribute('id', 'task-7');
buttonCalculateCircleArea.addEventListener('click', () => {
    calculateCircleArea(10);  // Předání argumentu funkci
});

// Vložení vytvořeného tlačítka do vybraného elementu na stránce
tasks.appendChild(buttonCalculateCircleArea);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

// Funkce pro výpočet a výpis objemu kuželu
function calculateConeVolume(radius, height) {
    // Výpočet objemu kuželu pomocí vzorce (1/3)πr^2h
    var volume = (1/3) * Math.PI * Math.pow(radius, 2) * height;

    // Výpis výsledku na stránku
    document.getElementById('results').innerText = `Objem kuželu s poloměrem ${radius} a výškou ${height} je ${volume.toFixed(2)}.`;
}

// Vytvoření tlačítka pro úlohu 8 (Another dimension)
const buttonCalculateConeVolume = document.createElement('button');
buttonCalculateConeVolume.innerText = 'Uloha 8 (Another dimension)';
buttonCalculateConeVolume.setAttribute('id', 'task-8');
buttonCalculateConeVolume.addEventListener('click', () => {
    calculateConeVolume(5, 10);  // Předání argumentů funkci
});

// Vložení vytvořeného tlačítka do vybraného elementu na stránce
tasks.appendChild(buttonCalculateConeVolume);

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

// Funkce pro ověření, zda lze z daných délek vytvořit trojúhelník
function isTriangle(a, b, c) {
    // Ověření nerovnosti trojúhelníku
    const isTriangle = (a + b > c) && (a + c > b) && (b + c > a);

    // Výpis výsledku na stránku
    const resultText = `${isTriangle ? 'ano' : 'ne'}`;
    document.getElementById('results').innerText = resultText;

    // Návratová hodnota funkce
    return isTriangle;
}

// Vytvoření tlačítka pro úlohu 9 (Not sure if triangle, or just some random values)
const buttonIsTriangle = document.createElement('button');
buttonIsTriangle.innerText = 'Uloha 9 (Not sure if triangle, or just some random values)';
buttonIsTriangle.setAttribute('id', 'task-9');
buttonIsTriangle.addEventListener('click', () => {
    isTriangle(3, 4, 5);  // Předání argumentů funkci
});

// Vložení vytvořeného tlačítka do vybraného elementu na stránce
tasks.appendChild(buttonIsTriangle);


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

// krok 1 - vytvořte funkci
function calculateTriangleArea(a, b, c) {
    // krok 1.1 - pomocí selektoru vyberte container pro výpis výsledků a uložte ho do proměnné
    const resultContainer = document.getElementById('results');

    // krok 1.2 - zvalidujte vstupní argumenty pomocí funkce z úlohy č. 9
    const isValid = isTriangle(a, b, c);  // funkce z předchozí úlohy
    if (!isValid) {
        resultContainer.innerText = 'Zadané délky stran nevytváří trojúhelník.';
        return;  // ukončení funkce v případě nevalidních hodnot
    }

    // krok 1.3 - spočítejte obsah trojúhelníka podle Heronova vzorce a výsledek uložte do proměnné
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    // krok 1.4 - vypište výsledek na místo pro výpis výsledků
    resultContainer.innerText = `Obsah trojúhelníku je ${area.toFixed(2)}.`;
}

// krok 2 - vytvořte tlačítko
const buttonCalculateTriangleArea = document.createElement('button');
buttonCalculateTriangleArea.innerText = 'Uloha 10 (Heroic performance)';
buttonCalculateTriangleArea.setAttribute('id', 'task-10');

// krok 3 - nabindujte na toto tlačítko callback, ve kterém zavoláte implementovanou funkci pro výpočet a výpis výsledků
buttonCalculateTriangleArea.addEventListener('click', () => {
    calculateTriangleArea(3, 4, 5);  // předání argumentů funkci
});

// krok 4 - tlačítko umístěte na stránku
tasks.appendChild(buttonCalculateTriangleArea);
