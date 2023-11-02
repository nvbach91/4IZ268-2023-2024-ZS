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
const birthYear = 2001;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;
console.log(`Pepe is ${age} years old.`);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
let celsius = 21;
let fahrenheit = celsius * 9 / 5 + 32;
console.log(`${celsius}°C = ${fahrenheit}°F`);

fahrenheit = 69;
celsius = (fahrenheit - 32) * 5 / 9;
console.log(`${fahrenheit}°F = ${celsius}°C`);

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
const pepesAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    console.log(`Pepe is ${age} years old.`);
};

const celsiusToFahrenheit = (celsius) => {
    const fahrenheit = celsius * 9 / 5 + 32;
    console.log(`${celsius}°C = ${fahrenheit}°F`);
};

const fahrenheitToCelsius = (fahrenheit) => {
    const celsius = (fahrenheit - 32) * 5 / 9;
    console.log(`${fahrenheit}°F = ${celsius}°C`);
};

const buttonPepesAge = document.createElement('button');
buttonPepesAge.innerText = "Task 1 (Pepe's age)";
buttonPepesAge.setAttribute('id', 'task-1');
buttonPepesAge.addEventListener('click', () => {
    pepesAge(2001);
});

const buttonCelsiusToFahrenheit = document.createElement('button');
buttonCelsiusToFahrenheit.innerText = "Task 2 (Celsius to Fahrenheit)";
buttonCelsiusToFahrenheit.setAttribute('id', 'task-2_1');
buttonCelsiusToFahrenheit.addEventListener('click', () => {
    celsiusToFahrenheit(21);
});

const buttonFahrenheitToCelsius = document.createElement('button');
buttonFahrenheitToCelsius.innerText = "Task 2 (Fahrenheit to Celsius)";
buttonFahrenheitToCelsius.setAttribute('id', 'task-2_2');
buttonFahrenheitToCelsius.addEventListener('click', () => {
    fahrenheitToCelsius(69);
});

const tasks = document.querySelector('#tasks');
tasks.appendChild(buttonPepesAge);
tasks.appendChild(buttonCelsiusToFahrenheit);
tasks.appendChild(buttonFahrenheitToCelsius);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */

const percentOf = (a, b) => {
    if (b === 0) {
        return 0;
    }
    return (a / b).toFixed(2) * 100
};

const buttonPercentOf = document.createElement('button');
buttonPercentOf.innerText = "Task 4 (Percent of)";
buttonPercentOf.setAttribute('id', 'task-4');
buttonPercentOf.addEventListener('click', () => {
    const a = 21;
    const b = 42
    const percent = percentOf(21, 42);
    document.querySelector('#results').textContent = `${a} is ${percent}% of ${b}`;
});

tasks.appendChild(buttonPercentOf);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
const compareNumbers = (a, b) => {
    const results = document.querySelector('#results');
    if (a > b) {
        results.textContent = `${a} is greater than ${b}`;
    } else if (a < b) {
        results.textContent = `${b} is greater than ${a}`;
    } else {
        results.textContent = 'the numbers are equal'
    }
};

const buttonGreaterThan = document.createElement('button');
buttonGreaterThan.innerText = "Task 5 (a > b)";
buttonGreaterThan.setAttribute('id', 'task-5_1');
buttonGreaterThan.addEventListener('click', () => {
    compareNumbers(10, 5);
});

const buttonLessThan = document.createElement('button');
buttonLessThan.innerText = "Task 5 (a < b)";
buttonLessThan.setAttribute('id', 'task-5_2');
buttonLessThan.addEventListener('click', () => {
    compareNumbers(2, 7);
});

const buttonEquals = document.createElement('button');
buttonEquals.innerText = "Task 5 (a === b)";
buttonEquals.setAttribute('id', 'task-5_3');
buttonEquals.addEventListener('click', () => {
    compareNumbers(4, 4);
});

const buttonCompareFloats = document.createElement('button');
buttonCompareFloats.innerText = "Task 5 (floats)";
buttonCompareFloats.setAttribute('id', 'task-5_4');
buttonCompareFloats.addEventListener('click', () => {
    compareNumbers(0.5, 0.3);
});

tasks.appendChild(buttonGreaterThan);
tasks.appendChild(buttonLessThan);
tasks.appendChild(buttonEquals);
tasks.appendChild(buttonCompareFloats);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
const getMultiplesOf13 = () => {
    let multiples = "";
    for (let multiple = 0; multiple <= 730; multiple += 13) {
        multiples += `${multiple} `;
    }
    return multiples;
};

const buttonMultiples = document.createElement('button');
buttonMultiples.innerText = "Task 6 (Multiples of 13)";
buttonMultiples.setAttribute('id', 'task-6');
buttonMultiples.addEventListener('click', () => {
    document.querySelector('#results').textContent = getMultiplesOf13();
});

tasks.appendChild(buttonMultiples);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
const getCircleArea = (radius) => {
    return Math.PI * radius ** 2;
};

const buttonCircleArea = document.createElement('button');
buttonCircleArea.innerText = "Task 7 (Circle area)";
buttonCircleArea.setAttribute('id', 'task-7');
buttonCircleArea.addEventListener('click', () => {
    const radius = 6;
    const area = getCircleArea(radius);
    document.querySelector('#results').textContent = `Area of circle with radius ${radius} is ${area}.`;
});

tasks.appendChild(buttonCircleArea);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
const getConeVolume = (height, radius) => {
    return Math.PI * radius ** 2 * height / 3
};

const buttonConeVolume = document.createElement('button');
buttonConeVolume.innerText = "Task 8 (Cone volume)";
buttonConeVolume.setAttribute('id', 'task-8');
buttonConeVolume.addEventListener('click', () => {
    const height = 9;
    const radius = 6;
    const volume = getConeVolume(height, radius);
    document.querySelector('#results').textContent = `Volume of cone with height ${height} and radius ${radius} is ${volume}.`;
});

tasks.appendChild(buttonConeVolume);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
const isTriangleValid = (a, b, c) => {
    const sides = [a, b, c].sort();
    let valid;
    if (sides[2] < sides[0] + sides[1]) {
        valid = true;
    } else {
        valid = false;
    }
    document.querySelector('#results').textContent = `a = ${a}; b = ${b}; c = ${c}; valid: ${valid}`;
    return valid;
};

const buttonValidTriangle = document.createElement('button');
buttonValidTriangle.innerText = "Task 9 (valid triangle)";
buttonValidTriangle.setAttribute('id', 'task-9_1');
buttonValidTriangle.addEventListener('click', () => {
    isTriangleValid(3, 2, 4);
});

const buttonInvalidTriangle = document.createElement('button');
buttonInvalidTriangle.innerText = "Task 9 (invalid triangle)";
buttonInvalidTriangle.setAttribute('id', 'task-9_2');
buttonInvalidTriangle.addEventListener('click', () => {
    isTriangleValid(7, 1, 5);
});

tasks.appendChild(buttonValidTriangle);
tasks.appendChild(buttonInvalidTriangle);

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
const printTriangleArea = (a, b, c) => {
    const results = document.querySelector('#results');
    if (!isTriangleValid(a, b, c)) {
        results.textContent = `Sides of lengths ${a}, ${b} and ${c} do not make a valid triangle!`;
        return;
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    results.textContent = `Area of the triangle is ${area}.`
};

const buttonTriangleAreaValid = document.createElement('button');
buttonTriangleAreaValid.innerText = "Task 10 (valid triangle)";
buttonTriangleAreaValid.setAttribute('id', 'task-10_2');
buttonTriangleAreaValid.addEventListener('click', () => {
    printTriangleArea(3, 2, 4);
});

const buttonTriangleAreaInvalid = document.createElement('button');
buttonTriangleAreaInvalid.innerText = "Task 10 (invalid triangle)";
buttonTriangleAreaInvalid.setAttribute('id', 'task-10_1');
buttonTriangleAreaInvalid.addEventListener('click', () => {
    printTriangleArea(7, 1, 5);
});

tasks.appendChild(buttonTriangleAreaValid);
tasks.appendChild(buttonTriangleAreaInvalid);