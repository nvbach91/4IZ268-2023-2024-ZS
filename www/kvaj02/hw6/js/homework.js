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


// vytvoření tlačítka
const btnTask1 = document.createElement('button');
btnTask1.innerText = 'Uloha 1 (Pepe age)';
btnTask1.setAttribute('id', 'task-1');
btnTask1.addEventListener('click', () => {
    const pepesAge = 42069;
    const thisYear = new Date().getFullYear();
    console.log(`Pepovi je ${thisYear - pepesAge} roků`);
});
const tasks = document.querySelector('#tasks');
tasks.appendChild(btnTask1);


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const buttonTask2 = document.createElement('button');
buttonTask2.innerText = 'Uloha 2 (Celsius and Fahrenheit)';
buttonTask2.setAttribute('id', 'task-2');
buttonTask2.addEventListener('click', () => {
    const celsiusV = 30;
    const fahrenheihtV = 70;
    const CelsiusToFahrenheiht = celsiusV * 9 / 5 + 32;
    const FahrenheihtToCelsius = (fahrenheihtV - 32) * 5 / 9;

    console.log(`${celsiusV}°C = ${CelsiusToFahrenheiht}°F`);
    console.log(`${fahrenheihtV}°F = ${FahrenheihtToCelsius}°C`);
});
const tasks2 = document.querySelector('#tasks');
tasks2.appendChild(buttonTask2);



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

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

// Vytvoření tlačítka pro úkol
const buttonTask4 = document.createElement('button');
buttonTask4.innerText = 'Uloha 4 (Percentage)';
buttonTask4.setAttribute('id', 'task-4');
buttonTask4.addEventListener('click', () => {
    const getPercentage = (a, b) => {
        if (b === 0) {
            console.log('Nelze delit nulou');
        } else {
            const percentage = (a / b * 100).toFixed(2);
            console.log(`Podil cisla ${a} z cisla ${b} je ${percentage}%`);
        }
    };
    getPercentage(5, 10);
    getPercentage(3, 0);
});

const tasks4 = document.querySelector('#tasks');
tasks4.appendChild(buttonTask4);





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

const result1 = compare(10, 10);
const result2 = compare(10, 12);
const result3 = compare(100, 12);

console.log(result1);
console.log(result2);
console.log(result3);

const buttonTask5 = document.createElement('button');
buttonTask5.innerText = 'Uloha 5 (Compare Numbers)';
buttonTask5.setAttribute('id', 'task-5');
buttonTask5.addEventListener('click', () => {
    const result1 = compare(10, 10);
    const result2 = compare(10, 12);
    const result3 = compare(100, 12);

    console.log(result1);
    console.log(result2);
    console.log(result3);
});

const tasks5 = document.querySelector('#tasks');
tasks5.appendChild(buttonTask5);




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

for (let i = 0; i < 730; i += 13) {
    console.log(i);
}

const buttonTask6 = document.createElement('button');
buttonTask6.innerText = 'Uloha 6 (Multiples of 13)';
buttonTask6.setAttribute('id', 'task-6');
buttonTask6.addEventListener('click', () => {
    for (let i = 0; i < 730; i += 13) {
        console.log(i);
    }
});

const tasks6 = document.querySelector('#tasks');
tasks6.appendChild(buttonTask6);


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

const buttonTask7 = document.createElement('button');
buttonTask7.innerText = 'Uloha 7 (Circle Area)';
buttonTask7.setAttribute('id', 'task-7');
buttonTask7.addEventListener('click', () => {
    const radius = 5; // Můžete zde změnit poloměr kruhu podle potřeby
    const area = getCircleArea(radius);
    console.log(`Plocha kruhu s poloměrem ${radius} je ${area}`);
});

const tasks7 = document.querySelector('#tasks');
tasks7.appendChild(buttonTask7);



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

const buttonTask8 = document.createElement('button');
buttonTask8.innerText = 'Uloha 8 (Cone Volume)';
buttonTask8.setAttribute('id', 'task-8');
buttonTask8.addEventListener('click', () => {
    const radius = 5; // Můžete zde změnit poloměr kužele podle potřeby
    const height = 10; // Můžete zde změnit výšku kužele podle potřeby
    const volume = getConeVolume(height, radius);
    console.log(`Objem kužele s poloměrem ${radius} a výškou ${height} je ${volume}`);
});

const tasks8 = document.querySelector('#tasks');
tasks8.appendChild(buttonTask8);





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
    return a + b > c && a + c > b && b + c > a;
};

const buttonTask9 = document.createElement('button');
buttonTask9.innerText = 'Uloha 9 (Triangle Check)';
buttonTask9.setAttribute('id', 'task-9');
buttonTask9.addEventListener('click', () => {
    const sideA = 3; // Změňte hodnoty stran a, b a c podle potřeby
    const sideB = 4;
    const sideC = 5;
    const isTriangleResult = isTriangle(sideA, sideB, sideC);

    if (isTriangleResult) {
        console.log('Lze sestrojit trojúhelník.');
    } else {
        console.log('Nelze sestrojit trojúhelník.');
    }
});

const tasks9 = document.querySelector('#tasks');
tasks9.appendChild(buttonTask9);




/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const isTriangle2 = (a, b, c) => {
    return a + b > c && a + c > b && b + c > a;
};

const getTriangleArea = (a, b, c) => {
    if (!isTriangle2(a, b, c)) {
        return `Není to validní trojúhelník`;
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return area;
};

const buttonTask10 = document.createElement('button');
buttonTask10.innerText = 'Uloha 10 (Triangle Area)';
buttonTask10.setAttribute('id', 'task-10');
buttonTask10.addEventListener('click', () => {
    const sideA = 3; // Změňte hodnoty stran a, b a c podle potřeby
    const sideB = 4;
    const sideC = 5;
    const areaResult = getTriangleArea(sideA, sideB, sideC);

    if (typeof areaResult === 'string') {
        console.log(areaResult);
    } else {
        console.log(`Obsah trojúhelníka je ${areaResult.toFixed(2)}`);
    }
});

const tasks10 = document.querySelector('#tasks');
tasks10.appendChild(buttonTask10);


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
