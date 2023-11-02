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

console.log("Ahoj světe")

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

var birthYear = 1990;
var currentYear = new Date().getFullYear();
var age = currentYear - birthYear;
console.log("Pepe is " + age + " years old.");

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here 


var celsius = 20;
var fahrenheit = 68;

var celsiusToFahrenheit = (celsius * 9 / 5) + 32;
var fahrenheitToCelsius = (fahrenheit - 32) * 5 / 9;

console.log(celsius + "°C = " + celsiusToFahrenheit + "°F.");
console.log(fahrenheit + "°F = " + fahrenheitToCelsius + "°C.");



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

// funkce pro výpočet věku
const calculateAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    results.textContent = `Pepe is ${age} years old.`;
}

// funkce pro převod z Celsius na fahrenheit
const convertCelsius = (celsius) => {
    const celsiusToFahr = (celsius * 9 / 5) + 32;
    results.textContent = celsius + "°C = " + celsiusToFahr + "°F.";
}

// funkce pro převod z Fahrenheit na celsius
const convertFahrenheit = (fahrenheit) => {
    const fahrenheitToCels = (fahrenheit - 32) * 5 / 9;
    results.textContent = fahrenheit + "°F = " + fahrenheitToCels + "°C.";
}

//Vytvoření buttonů eventy funkcí a přiřazení do tasks
const buttonAge = document.createElement('button');
buttonAge.innerText = "1) Pepe's age";
buttonAge.setAttribute('id', 'task-1');
buttonAge.addEventListener('click', () => {
    calculateAge(1998);
})

const buttonC = document.createElement('button');
buttonC.innerText = "2) Convert Celsius to Fahrenheit";
buttonC.setAttribute('id', 'task-2');
buttonC.addEventListener('click', () => {
    convertCelsius(45);
})

const buttonF = document.createElement('button');
buttonF.innerText = "3) Convert Fahrenheit to Celsius";
buttonF.setAttribute('id', 'task-3');
buttonF.addEventListener('click', () => {
    convertFahrenheit(113);
})

const tasks = document.querySelector('#tasks');
tasks.appendChild(buttonAge);
tasks.appendChild(buttonC);
tasks.appendChild(buttonF);



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

// funkce pro podíl
const calculateRatio = (num1, num2) => {
    if (num2 === 0) {
        results.textContent = "Division by zero is not allowed.";
        return;
    }

    var ratio = (num1 / num2) * 100;
    ratio = ratio.toFixed(2);
    const resultText = num1 + " is " + ratio + "% of " + num2;
    results.textContent = resultText;
}

//Vytvoření tlačítka a přiřazení eventu na kliknutí
const buttonRatio = document.createElement('button');
buttonRatio.innerText = "4) Ratio";
buttonRatio.setAttribute('id', 'task-4');
buttonRatio.addEventListener('click', () => {
    calculateRatio(30, 50);
});

tasks.appendChild(buttonRatio);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

// funkce na porovnání čísel
const compareNumbers = (number1, number2) => {
    var message;

    if (number1 > number2) {
        message = `${number1} is greater than ${number2}.`;
    } else if (number1 < number2) {
        message = `${number2} is greater than ${number1}.`;
    } else {
        message = `${number1} and ${number2} are equal.`;
    }

    results.textContent = message;
}

//Vytvoření tlačítka a přiřazení eventu na kliknutí
const buttonComparison = document.createElement('button');
buttonComparison.innerText = "5) Comparison";
buttonComparison.setAttribute('id', 'task-5');
buttonComparison.addEventListener('click', () => {
    compareNumbers(5, 8);
});

tasks.appendChild(buttonComparison);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

//funkce pro násobky 13
const multiply = () => {
    const limit = 730;
    for (let i = 0; i <= limit; i += 13) {
        results.textContent = i;
    }
}

//Vytvoření tlačítka a přiřazení eventu na kliknutí
const buttonMultiply = document.createElement('button');
buttonMultiply.innerText = "6) Multiples of 13"
buttonMultiply.setAttribute('id', 'task-6');
buttonMultiply.addEventListener('click', () => {
    multiply();
})

tasks.appendChild(buttonMultiply);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

//funkce pro výpočet obsahu kruznice
const calculateCircleArea = (radius) => {
    const pi = Math.PI;
    const area = pi * radius * radius;
    results.textContent = area;
}

//Vytvoření tlačítka a přiřazení eventu na kliknutí
const buttonCircle = document.createElement('button');
buttonCircle.innerText = "7) Circle area"
buttonCircle.setAttribute('id', 'task-7');
buttonCircle.addEventListener('click', () => {
    calculateCircleArea(5);
})

tasks.appendChild(buttonCircle);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

// funkce pro výpočet objemu kuželu
const calculateConeVolume = (radius, height) => {
    const pi = Math.PI;
    const volume = (1 / 3) * pi * radius * radius * height;
    results.textContent = volume;
}

//Vytvoření tlačítka a přiřazení eventu na kliknutí
const buttonConeVolume = document.createElement('button');
buttonConeVolume.innerText = "8) Cone volume"
buttonConeVolume.setAttribute('id', 'task-8');
buttonConeVolume.addEventListener('click', () => {
    calculateConeVolume(5, 8);
})

tasks.appendChild(buttonConeVolume);



/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here

// funkce pro kontrolu, jestli z délky stran jde sestavit trojúhelník
const isTriangle = (a, b, c) => {
    console.log(`a = ${a}, b = ${b}, c = ${c}`);
    if (a + b > c && a + c > b && b + c > a) {
        results.textContent = 'Does make a triangle';
        return true;
    } else {
        results.textContent = 'Does not make a triangle';
        return false;
    }
}

//Vytvoření tlačítka a přiřazení eventu na kliknutí
const buttonTriangle = document.createElement('button');
buttonTriangle.innerText = "9) Triangle"
buttonTriangle.setAttribute('id', 'task-9');
buttonTriangle.addEventListener('click', () => {
    isTriangle(2, 3, 4);
})

tasks.appendChild(buttonTriangle);

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


// funkce pro výpočet obsahu trojúhelníku z délky stran
const calculateTriangleArea = (a, b, c) => {
    if (isTriangle(a, b, c) == false) {
        return false;
    } else if (isTriangle(a, b, c) == true) {
        const s = (a + b + c) / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        results.textContent = "Triangle area is " + area;
    }
}

//Vytvoření tlačítka a přiřazení eventu na kliknutí
const buttonHeroic = document.createElement('button');
buttonHeroic.innerText = "10) Triangle area"
buttonHeroic.setAttribute('id', 'task-10');
buttonHeroic.addEventListener('click', () => {
    calculateTriangleArea(2, 3, 4);
})

tasks.appendChild(buttonHeroic);
