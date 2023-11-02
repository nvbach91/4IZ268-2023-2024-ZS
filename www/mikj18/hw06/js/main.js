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

const yearPepe = 1996;
var currentYear = new Date().getFullYear();
const agePepe = currentYear - yearPepe;
console.log("Pepe is " + agePepe);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

let temperatureCelsius = 20;
let temperatureFahrenheit = ((temperatureCelsius * 9 / 5) + 32);
console.log(temperatureCelsius + "°C = " + temperatureFahrenheit + "°F");

let temperatureFahrenheit2 = 68;
let temperatureCelsius2 = ((temperatureFahrenheit2 - 32) * 5 / 9);
console.log(temperatureFahrenheit2 + "°F = " + temperatureCelsius2 + "°C");

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

const calculateAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    console.log("Pepe is " + age + " years old.");
};

const convertTemp = (value, unit) => {
    if (unit.toLowerCase() === 'c') {
        const fahrenheit = (value * 9 / 5 + 32);
        console.log(value + "°C = " + fahrenheit + "°F");
    } else if (unit.toLowerCase() === 'f') {
        const celsius = ((value - 32) * 5 / 9);
        console.log(value + "°F = " + celsius + "°C");
    } else {
        console.log('Invalid unit. Please use "C" or "F".');
    }
};

const button1 = document.createElement('button');
button1.innerText = 'Task 1 - Pepe';
button1.setAttribute('id', 'task-1');
document.getElementById('tasks').appendChild(button1);
button1.addEventListener('click', () => {
    calculateAge(1996);
});

const button2 = document.createElement('button');
button2.innerText = 'Task 2 - WTF';
button2.setAttribute('id', 'task-2');
document.getElementById('tasks').appendChild(button2);
button2.addEventListener('click', () => {
    convertTemp(20, 'c');
    convertTemp(68, 'f');
});

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const button3 = document.createElement('button');
button3.innerText = 'Task 4 - %CENSORED%';
button3.setAttribute('id', 'task-3');
document.getElementById('tasks').appendChild(button3);

button3.addEventListener('click', () => {
    calculatePercentage(169, 42);
});

const calculatePercentage = (number1, number2) => {
    if (number2 === 0) {
        document.getElementById('results').innerText = `${number2} is ${number2}% of ${number1}.`;
        return;
    }

    const result = (number2 / number1) * 100;

    document.getElementById('results').innerText = `${number2} is ${result.toFixed(2)}% of ${number1}.`;
};

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na stránce. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const compareNumbers = (number1, number2) => {
    if (number1 > number2) {
        document.getElementById('results').innerText = `${number1} is bigger than ${number2}.`;
    } else if (number1 < number2) {
        document.getElementById('results').innerText = `${number2} is bigger than ${number1}.`;
    } else {
        document.getElementById('results').innerText = `${number1} and ${number2} are equal.`;
    }
};

const button5a = document.createElement('button');
button5a.innerText = 'Task 5 - Kdo s koho - Cela';
button5a.setAttribute('id', 'task-5a');
document.getElementById('tasks').appendChild(button5a);

button5a.addEventListener('click', () => {
    compareNumbers(-1, 1);
});

const button5b = document.createElement('button');
button5b.innerText = 'Task 5 - Kdo s koho - Desetinná';
button5b.setAttribute('id', 'task-5b');
document.getElementById('tasks').appendChild(button5b);

button5b.addEventListener('click', () => {
    compareNumbers(3.14, -2.9);
});

const button5c = document.createElement('button');
button5c.innerText = 'Task 5 - Kdo s koho - Zlomky';
button5c.setAttribute('id', 'task-5c');
document.getElementById('tasks').appendChild(button5c);

button5c.addEventListener('click', () => {
    compareNumbers(6 / 2, 87/ 3);
});


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const multiplesOfThirteen = () => {
    document.getElementById('results').innerText = '';

    for (let i = 0; i <= 730; i += 13) {
        document.getElementById('results').innerText += i + '\n';
    }
};

const button6 = document.createElement('button');
button6.innerText = 'Task 6 - Pattern';
button6.setAttribute('id', 'task-6');
document.getElementById('tasks').appendChild(button6);

button6.addEventListener('click', () => {
    multiplesOfThirteen();
});

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const areaOfCircle = (radius) => {
    const area = Math.PI * Math.pow(radius, 2);
    document.getElementById('results').innerText = `The area of the circle with radius ${radius} is ${area.toFixed(2)}`;
};

const button7 = document.createElement('button');
button7.innerText = 'Task 7 - Around and about';
button7.setAttribute('id', 'task-7');
document.getElementById('tasks').appendChild(button7);

button7.addEventListener('click', () => {
    areaOfCircle(23);
});

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const coneVolume = (height, radius) => {
    const volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
    document.getElementById('results').innerText = `The volume of the cone with height ${height} and radius ${radius} is ${volume.toFixed(2)}`;
};

const button8 = document.createElement('button');
button8.innerText = 'Task 8 - Another dimension';
button8.setAttribute('id', 'task-8');
document.getElementById('tasks').appendChild(button8);

button8.addEventListener('click', () => {
    coneVolume(25, 9);
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

const doesTriangleExists = (a, b, c) => {
    if (a + b > c && b + c > a && c + a > b) {
        document.getElementById('results').innerText = `Triangle with side lengths ${a}, ${b}, and ${c} is possible.`;
        return true;
    } else {
        document.getElementById('results').innerText = `Triangle with side lengths ${a}, ${b}, and ${c} is NOT possible.`;
        return false;
    }
};

const button9 = document.createElement('button');
button9.innerText = 'Task 9 - Triangle Check';
button9.setAttribute('id', 'task-9');
document.getElementById('tasks').appendChild(button9);

button9.addEventListener('click', () => {
    doesTriangleExists(6, 4, 3);
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


const heron = (a, b, c) => {

    if (doesTriangleExists(a, b, c)==false) {
        document.getElementById('results').innerText = `Triangle with side lengths ${a}, ${b}, and ${c} is NOT possible.`;
        return;
    }

    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    document.getElementById('results').innerText = `The area of the triangle with side lengths ${a}, ${b}, and ${c} is ${area.toFixed(2)}`;
};

const button10 = document.createElement('button');
button10.innerText = 'Task 10 - Heroic performance';
button10.setAttribute('id', 'task-10');
document.getElementById('tasks').appendChild(button10);

button10.addEventListener('click', () => {
    heron(12, 23, 4);
});