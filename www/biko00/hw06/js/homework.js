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
let birthYear = 1990;
let currentYear = new Date().getFullYear(); 
let age = currentYear - birthYear; 

console.log(`Pepe is ${age} years old.`);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
let temperatureCelsius = 20;
let temperatureFahrenheihtFromCelsius = temperatureCelsius * 9 / 5 + 32;
console.log(`${temperatureCelsius}°C = ${temperatureFahrenheihtFromCelsius}°F`)

let temperatureFahrenheiht = 68
let temperatureCelsiusFromFahrenheiht = (temperatureFahrenheiht - 32) * 5 / 9;
console.log(`${temperatureFahrenheiht}°F = ${temperatureCelsiusFromFahrenheiht}°C`)

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

// function to get Pepe's age
const getPepesAge = () => {
    let birthYear = 1990;
    let currentYear = new Date().getFullYear(); 
    let age = currentYear - birthYear; 
    console.log(`Pepe is ${age} years old.`);
}

// create a button for getting Pepe's age
const buttonTask1 = document.createElement('button');
buttonTask1.innerText = "Task 1 (Pepe's age)";
buttonTask1.setAttribute('id', 'task-1');
buttonTask1.addEventListener('click', () => {
  getPepesAge();
});
const tasks = document.querySelector('#tasks');
tasks.appendChild(buttonTask1);

// function to convert Celsius to Fahrenheiht
const convertCelciusToFahrenheiht = () => {
    let temperatureCelsius = 20;
    let temperatureFahrenheihtFromCelsius = temperatureCelsius * 9 / 5 + 32;
    console.log(`${temperatureCelsius}°C = ${temperatureFahrenheihtFromCelsius}°F`)
}

// function to convert Fahrenheiht to Celsius
const convertFahrenheihtToCelcius = () => {
    let temperatureFahrenheiht = 68
    let temperatureCelsiusFromFahrenheiht = (temperatureFahrenheiht - 32) * 5 / 9;
    console.log(`${temperatureFahrenheiht}°F = ${temperatureCelsiusFromFahrenheiht}°C`)
}

// create a button for converting Celsius to Fahrenheiht
const buttonTask2CtoF = document.createElement('button');
buttonTask2CtoF.innerText = "Task 2 (Celsius to Fahrenheiht)";
buttonTask2CtoF.setAttribute('id', 'task-2-1');
buttonTask2CtoF.addEventListener('click', () => {
  convertCelciusToFahrenheiht();
});
tasks.appendChild(buttonTask2CtoF);

// create a button for converting Fahrenheiht to Celsius
const buttonTask2FtoC = document.createElement('button');
buttonTask2FtoC.innerText = "Task 2 (Fahrenheiht to Celsius)";
buttonTask2FtoC.setAttribute('id', 'task-2-2');
buttonTask2FtoC.addEventListener('click', () => {
    convertFahrenheihtToCelcius();
});
tasks.appendChild(buttonTask2FtoC);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
const divideNumbersPercentage = (a, b) => {
    if (b == 0) {
        return "Division by 0!";
    }
    var result = (a / b) * 100;
    return result.toFixed(2) + '%';
}

// create a button for dividing 2 numbers
const buttonTask4 = document.createElement('button');
buttonTask4.innerText = "Task 4 (Division of 2 numbers)";
buttonTask4.setAttribute('id', 'task-4');
buttonTask4.addEventListener('click', () => {
    document.getElementById('results').textContent = divideNumbersPercentage(3, 10);
});
tasks.appendChild(buttonTask4);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
const compareNumbers = (a, b) => {
    if (a > b) {
        return a;
    }
    else if (b > a) {
        return b;
    }
    else {
        return "Numbers are equal!";
    }
}
const buttonTask5 = document.createElement('button');
buttonTask5.innerText = "Task 5 (Comparison of 2 numbers)";
buttonTask5.setAttribute('id', 'task-5');
buttonTask5.addEventListener('click', () => {
    document.getElementById('results').textContent = compareNumbers(10, 10);
});
tasks.appendChild(buttonTask5);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
const printMultiplications = () => {
    let vystup = '';
    for (let i = 0; i <= 730; i += 13) {
        vystup += i + ' ';
    }
    return vystup;
};
const buttonTask6 = document.createElement('button');
buttonTask6.innerText = "Task 6 (I can cleary see the pattern)";
buttonTask6.setAttribute('id', 'task-6');
buttonTask6.addEventListener('click', () => {
    document.getElementById('results').textContent = printMultiplications();
});
tasks.appendChild(buttonTask6);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
const calculateCircumference = (radius) => {
    return Math.PI * radius^2;
};
const buttonTask7 = document.createElement('button');
buttonTask7.innerText = "Task 7 (Around and about)";
buttonTask7.setAttribute('id', 'task-7');
buttonTask7.addEventListener('click', () => {
    document.getElementById('results').textContent = calculateCircumference(3);
});
tasks.appendChild(buttonTask7);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
const calculateConeVolume = (height, radius) => {
    return (1/3) * Math.PI * radius^2 * height;
};
const buttonTask8 = document.createElement('button');
buttonTask8.innerText = "Task 8 (Another dimension)";
buttonTask8.setAttribute('id', 'task-8');
buttonTask8.addEventListener('click', () => {
    document.getElementById('results').textContent = calculateConeVolume(3, 2);
});
tasks.appendChild(buttonTask8);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
const isTriangle = (a, b, c) => {
    if (a + b > c && a + c > b && b + c > a) {
        return true;
    } else {
        return false;
    }
};
const buttonTask9 = document.createElement('button');
buttonTask9.innerText = "Task 9 (Not sure if triangle)";
buttonTask9.setAttribute('id', 'task-9');
buttonTask9.addEventListener('click', () => {
    document.getElementById('results').textContent = isTriangle(3, 2, 2);
});
tasks.appendChild(buttonTask9);



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
const calculateCircumHeron = (a, b, c) => {
    const resultsContainer = document.getElementById('results');
    if (!isTriangle(a, b, c)) {
        return "Its not a triangle!";
    }
    const s = (a + b + c) / 2;
    const circumference = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return "Circumference: " + circumference.toFixed(2);
};
const buttonTask10 = document.createElement('button');
buttonTask10.innerText = "Task 10 (Heroic performance)";
buttonTask10.setAttribute('id', 'task-10');
buttonTask10.addEventListener('click', () => {
    document.getElementById('results').textContent = calculateCircumHeron(3, 2, 1);
});
tasks.appendChild(buttonTask10);

