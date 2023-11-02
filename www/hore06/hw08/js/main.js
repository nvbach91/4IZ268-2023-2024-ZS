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


/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here


const pepesAge = 2000;
const thisYear = new Date().getFullYear();

console.log(`Pepa ma ${thisYear - pepesAge} let.`);


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here


const celsiusValue = 30;
const fahrenheihtValue = 70;

const convertedCelsiusToFahrenheiht = celsiusValue * 9 / 5 + 32;
const convertedFahrenheihtToCelsius = (fahrenheihtValue - 32) * 5 / 9;
console.log(`Teplota v F: ${convertedCelsiusToFahrenheiht} .`);
console.log(`Teplota v C: ${convertedFahrenheihtToCelsius} .`);



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

const convertCelsiusToFahrenheit = (celsiusValue) => {
    return celsiusValue * 9 / 5 + 32;
};
const convertFahrenheitToCelsius = (fahrenheihtValue) => {
    return (fahrenheihtValue - 32) * 5 / 9;
};

const buttonTask1 = document.createElement('button');
buttonTask1.innerText = 'Uloha 1 (Pepe\'s age)';
buttonTask1.setAttribute('id', 'task-1');
buttonTask1.addEventListener('click', () => {
    console.log(getAge(1900));
});
const tasks = document.querySelector('#tasks');
tasks.appendChild(buttonTask1);

const buttonTask2 = document.createElement('button');
buttonTask2.innerText = 'Uloha 2 WTF';
buttonTask2.setAttribute('id', 'WTF (wow, that\'s fun)');
buttonTask2.addEventListener('click', () => {
    console.log(convertCelsiusToFahrenheit(1900));
    console.log(convertFahrenheitToCelsius(1900));
});

tasks.appendChild(buttonTask2);




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
        return 'Nelze delit nulou';
    }
    return ` Podil cisla ${a} z cisla ${b} je ${(a / b * 100).toFixed(2)}% `;
};



const buttonTask3 = document.createElement('button');
buttonTask3.innerText = 'Uloha 2 (%CENSORED%)';
buttonTask3.setAttribute('id', 'task-3');

var result = document.createTextNode(" Zde bude vystup funkce getPercentage: ");
tasks.appendChild(buttonTask3);
tasks.appendChild(result);

buttonTask3.addEventListener('click', () => {
    result.nodeValue = getPercentage(100, 23);

});


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na stránce. Pokud se čísla rovnají, vypište, že se rovnají. 
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
    return ' Cisla se rovnaji ';
};

const result1 = compare(10, 10);
const result2 = compare(10, 12);
const result3 = compare(100, 12);

const buttonTask4 = document.createElement('button');
buttonTask4.innerText = 'Uloha 5 (Kdo s koho.)';
buttonTask4.setAttribute('id', 'task-4');

var resultCompare = document.createTextNode(" Zde bude vystup funkce comprare: ");
tasks.appendChild(buttonTask4);
tasks.appendChild(resultCompare);

buttonTask4.addEventListener('click', () => {
    resultCompare.nodeValue = result1;

});


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here



const buttonTask5 = document.createElement('button');
buttonTask5.innerText = 'Uloha 6 (I can cleary see the pattern)';
buttonTask5.setAttribute('id', 'task-5');

tasks.appendChild(buttonTask5);


buttonTask5.addEventListener('click', () => {
    for (let i = 0; i < 730; i += 13) {
        console.log(i);
    }

});


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

const buttonTask6 = document.createElement('button');
buttonTask6.innerText = 'Uloha 7 (Around and about.)';
buttonTask6.setAttribute('id', 'task-6');

tasks.appendChild(buttonTask6);


buttonTask6.addEventListener('click', () => {

    console.log(getCircleArea(7));


});



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

const buttonTask7 = document.createElement('button');
buttonTask7.innerText = 'Uloha 8 (Another dimension.)';
buttonTask7.setAttribute('id', 'task-6');

tasks.appendChild(buttonTask7);


buttonTask7.addEventListener('click', () => {

    console.log(getConeVolume(2, 6));


});



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
    return (a + b > c && a + c > b && b + c > a);
};



const buttonTask8 = document.createElement('button');
buttonTask8.innerText = 'Uloha 9 (Not sure if triangle.)';
buttonTask8.setAttribute('id', 'task-7');

tasks.appendChild(buttonTask8);


buttonTask8.addEventListener('click', () => {

    console.log(isTriangle(3, 4, 5));


});

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
        return `Neni to validni trojuhelnik`;
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return area;
};

const buttonTask9 = document.createElement('button');
buttonTask9.innerText = 'Uloha 10 (Heroic performance.)';
buttonTask9.setAttribute('id', 'task-7');

tasks.appendChild(buttonTask9);


buttonTask9.addEventListener('click', () => {

    console.log(getTriangleArea(3, 4, 5));


});
