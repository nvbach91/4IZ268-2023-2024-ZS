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

const pepesDateOfBirth = 2003;
const presentYear = new Date().getFullYear();

console.log(`Pepeho věk je ${presentYear - pepesDateOfBirth} let.`);


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const celsiusValue = 20;
const fahrenheihtValue = 68;

const convertedCelsiusToFahrenheiht = celsiusValue * 9 / 5 + 32;
const convertedFahrenheihtToCelsius = (fahrenheihtValue - 32) * 5 / 9;

console.log(`${celsiusValue}°C = ${convertedCelsiusToFahrenheiht}°F`);
console.log(`${fahrenheihtValue}°F = ${convertedFahrenheihtToCelsius}°C`);


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

const getAge = (birthYear) => {
    return new Date().getFullYear() - birthYear;
};

const buttonGetAge = document.createElement('button');

buttonGetAge.innerText = 'Get Age';

buttonGetAge.setAttribute('id', 'task-1');

buttonGetAge.addEventListener('click', () => {
    console.log(`${getAge(2003)} let`);
});

const tasks1 = document.querySelector('#tasks');

tasks1.appendChild(buttonGetAge);




const convertCelsiusToFahrenheit = (celsiusValue1) => {
    return celsiusValue1 * 9 / 5 + 32;
};

const buttonConvertCelsiusToFahrenheit = document.createElement('button');

buttonConvertCelsiusToFahrenheit.innerText = 'Convert To Fahrenheit';

buttonConvertCelsiusToFahrenheit.setAttribute('id', 'task-2');

buttonConvertCelsiusToFahrenheit.addEventListener('click', () => {
    console.log(`${convertCelsiusToFahrenheit(20)}°F`);
});

const tasks2 = document.querySelector('#tasks');

tasks2.appendChild(buttonConvertCelsiusToFahrenheit);




const convertFahrenheitToCelsius = (fahrenheihtValue1) => {
    return (fahrenheihtValue1 - 32) * 5 / 9;
};

const buttonConvertFahrenheitToCelsius = document.createElement('button');

buttonConvertFahrenheitToCelsius.innerText = 'Convert To Celsius';

buttonConvertFahrenheitToCelsius.setAttribute('id', 'task-3');

buttonConvertFahrenheitToCelsius.addEventListener('click', () => {
    console.log(`${convertFahrenheitToCelsius(68)}°C`);
});

const tasks3 = document.querySelector('#tasks');

tasks3.appendChild(buttonConvertFahrenheitToCelsius);

/**
/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here


const getPercentage = (a, b) => {
    if (b === 0) {
        return 'Delit nulou nelze!';
    }
    return `${a} je ${(a / b * 100).toFixed(2)}% z ${b}`;
};

const buttonGetPercentage = document.createElement('button');

buttonGetPercentage.innerText = 'Get Percentage';

buttonGetPercentage.setAttribute('id', 'task-4');

buttonGetPercentage.addEventListener('click', () => {
    const result = getPercentage(29, 93);
    
    const resultElement = document.createElement('p');
    resultElement.innerText = result;

    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = ''; 
    resultsContainer.appendChild(resultElement);
});

const tasks4 = document.querySelector('#tasks');
tasks4.appendChild(buttonGetPercentage);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here


const compare = (a, b) => {
    if (a < b) {
        return b;
    }
    if (a > b) {
        return a;
    }
    return 'Cisla se rovnaji';
};

const buttonCompare1 = document.createElement('button');

buttonCompare1.innerText = "Compare 1";

buttonCompare1.setAttribute('id', 'task-5.1');

buttonCompare1.addEventListener('click', () => {
    const result = compare(2, 2.00001);

    const resultElement = document.createElement('p');
    resultElement.textContent = result;
    
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultElement);
});

const tasks5v1 = document.querySelector('#tasks');
tasks5v1.appendChild(buttonCompare1);



const buttonCompare2 = document.createElement('button');

buttonCompare2.innerText = "Compare 2";

buttonCompare2.setAttribute('id', 'task-5.2');

buttonCompare2.addEventListener('click', () => {
    const result = compare(2, 8/4);

    const resultElement = document.createElement('p');
    resultElement.textContent = result;
    
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultElement);
});

const tasks5v2 = document.querySelector('#tasks');
tasks5v2.appendChild(buttonCompare2);



const buttonCompare3 = document.createElement('button');

buttonCompare3.innerText = "Compare 3";

buttonCompare3.setAttribute('id', 'task-5.3');

buttonCompare3.addEventListener('click', () => {
    const result = compare(5.999, 5);

    const resultElement = document.createElement('p');
    resultElement.textContent = result;
    
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultElement);
});

const tasks5v3 = document.querySelector('#tasks');
tasks5v3.appendChild(buttonCompare3);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here


const buttonForCycle = document.createElement('button');

buttonForCycle.innerText = 'For Cycle';

buttonForCycle.setAttribute('id', 'task-6');

buttonForCycle.addEventListener('click', () => {
    for (let i = 0; i <= 730; i += 13) {
        console.log(i);
    }
});

const tasks6 = document.querySelector('#tasks');

tasks6.appendChild(buttonForCycle);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here


const getCircleArea = (radius) => {
    return Math.PI * radius ** 2;
};

const buttonGetCircleArea = document.createElement('button');

buttonGetCircleArea.innerText = 'Get Circle Area';

buttonGetCircleArea.setAttribute('id', 'task-7');

buttonGetCircleArea.addEventListener('click', () => {
    const result = getCircleArea(10);

    const resultElement = document.createElement('p');
    resultElement.textContent = result;
    
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultElement);
});

const tasks7 = document.querySelector('#tasks');

tasks7.appendChild(buttonGetCircleArea);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here


const getConeVolume = (height, radius) => {
    return Math.PI * radius ** 2 * height / 3;
};

const buttonGetConeVolume = document.createElement('button');

buttonGetConeVolume.innerText = 'Get Cone Volume';

buttonGetConeVolume.setAttribute('id', 'task-8');

buttonGetConeVolume.addEventListener('click', () => {
    const result = getConeVolume(15, 20);

    const resultElement = document.createElement('p');
    resultElement.textContent = result;
    
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultElement);
});

const tasks8 = document.querySelector('#tasks');

tasks8.appendChild(buttonGetConeVolume);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here


const isTriangle = (a, b, c) => {
    if (a + b > c && a + c > b && b + c > a){
        return true
    }
    else {
        return false
    }
};

const buttonIsTriangle = document.createElement('button');

buttonIsTriangle.innerText = 'Is Triangle';

buttonIsTriangle.setAttribute('id', 'task-9');

buttonIsTriangle.addEventListener('click', () => {
    const result = isTriangle(10,10,5);

    const resultElement = document.createElement('p');
    resultElement.textContent = result;
    
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultElement);
});

const tasks9 = document.querySelector('#tasks');

tasks9.appendChild(buttonIsTriangle);

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


const getTriangleArea = (a, b, c) => {
    if (!isTriangle(a, b, c)) {
        return "Neni to validni trojuhelnik";
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return area;
};

const buttonGetTriangleArea = document.createElement('button');

buttonGetTriangleArea.innerText = "Get Triangle Area";

buttonGetTriangleArea.setAttribute('id', 'task-10');

buttonGetTriangleArea.addEventListener('click', () => {
  const result = getTriangleArea(10,10,5);

  const resultElement = document.createElement('p');
  resultElement.textContent = result;
  
  const resultsContainer = document.querySelector('#results');
  resultsContainer.innerHTML = '';
  resultsContainer.appendChild(resultElement);
});

const tasks10 = document.querySelector('#tasks');
tasks10.appendChild(buttonGetTriangleArea);