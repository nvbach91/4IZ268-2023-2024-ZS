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

const results = document.querySelector('#results');
const output = document.createElement('p');
results.append(output);

console.log('Ahoj světe');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */

const birthYear = 1995;
const currentYear = new Date().getFullYear();
console.log('Pepovi je ' + (currentYear - birthYear));

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */

const celsius = 30;
const fahrenheit = 122;
console.log(celsius + '°C = ' + (((celsius * 9) / 5) + 32) + '°F');
console.log(fahrenheit + '°F = ' + (((fahrenheit - 32) * 5) / 9) + '°C');

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

const sayHello = () => {
    console.log('Ahoj světe');
    results.firstChild.innerText = 'Ahoj světe';
}

const calculateAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    console.log('Pepovi je ' + (currentYear - birthYear));
    results.firstChild.innerText = 'Pepovi je ' + (currentYear - birthYear);
}

const convertToFahrenheit = (celsius) => {
    console.log(celsius + '°C = ' + (((celsius * 9) / 5) + 32) + '°F');
    results.firstChild.innerText = celsius + '°C = ' + (((celsius * 9) / 5) + 32) + '°F';
}

const convertToCelsius = (fahrenheit) => {
    console.log(fahrenheit + '°F = ' + (((fahrenheit - 32) * 5) / 9) + '°C');
    results.firstChild.innerText = fahrenheit + '°F = ' + (((fahrenheit - 32) * 5) / 9) + '°C';
}

sayHello();

calculateAge(1950);
calculateAge(1850);
calculateAge(2020);

convertToFahrenheit(50);
convertToFahrenheit(60);
convertToFahrenheit(70);

convertToCelsius(122);
convertToCelsius(140);
convertToCelsius(158);

const tasks = document.querySelector('#tasks');

const buttonSayHello = document.createElement('button');
buttonSayHello.innerText = 'Say Hello';
buttonSayHello.setAttribute('id', 'task-0');
buttonSayHello.addEventListener('click', () => { sayHello(); });
tasks.appendChild(buttonSayHello);

const buttonCalculateAge = document.createElement('button');
buttonCalculateAge.innerText = 'Calculate Age';
buttonCalculateAge.setAttribute('id', 'task-1');
buttonCalculateAge.addEventListener('click', () => { calculateAge(1950); });
tasks.appendChild(buttonCalculateAge);

const buttonConvertToFahrenheit = document.createElement('button');
buttonConvertToFahrenheit.innerText = 'Convert To Fahrenheit';
buttonConvertToFahrenheit.setAttribute('id', 'task-2');
buttonConvertToFahrenheit.addEventListener('click', () => { convertToFahrenheit(50); });
tasks.appendChild(buttonConvertToFahrenheit);

const buttonConvertToCelsius = document.createElement('button');
buttonConvertToCelsius.innerText = 'Convert To Celsius';
buttonConvertToCelsius.setAttribute('id', 'task-2');
buttonConvertToCelsius.addEventListener('click', () => { convertToCelsius(122); });
tasks.appendChild(buttonConvertToCelsius);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */

const toPercentage = (a, b) => {
    if (b === 0) {
        console.log('Nulou nelze dělit!');
        results.firstChild.innerText = 'Nulou nelze dělit!';
    } else {
        let result = a / b;
        result = result.toFixed(2);
        console.log(result * 100 + '%');
        results.firstChild.innerText = result * 100 + '%';
    }
}

toPercentage(33, 100);
toPercentage(75, 100);
toPercentage(0, 20);
toPercentage(20, 0);

const buttonToPercentage = document.createElement('button');
buttonToPercentage.innerText = 'To Percentage';
buttonToPercentage.setAttribute('id', 'task-4');
buttonToPercentage.addEventListener('click', () => { toPercentage(33, 100); });
tasks.appendChild(buttonToPercentage);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */

const tellHigher = (a, b) => {
    if (a === b) {
        console.log('Čísla se rovnají!');
        results.firstChild.innerText = 'Čísla se rovnají!';
    } else {
        if (a > b) {
            console.log(a + ' je větší než ' + b + '!');
            results.firstChild.innerText = a + ' je větší než ' + b + '!';
        } else {
            console.log(b + ' je větší než ' + a + '!');
            results.firstChild.innerText = b + ' je větší než ' + a + '!';
        }
    }
}

tellHigher(2, 5);
tellHigher(0, 0);
tellHigher(5, -8);
tellHigher(2.332, 2.333);

const buttonTellHigher = document.createElement('button');
buttonTellHigher.innerText = 'Tell Higher';
buttonTellHigher.setAttribute('id', 'task-5');
buttonTellHigher.addEventListener('click', () => {
    tellHigher(2, 5);
    tellHigher(2 / 3, 5 / 7);
    tellHigher(2.125, 2.754);
    tellHigher(2 / 7, 5.23);
    tellHigher(-5 / 3, 7);
});
tasks.appendChild(buttonTellHigher);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */

const xTimes13 = () => {
    let result;
    let output;
    for (let i = 0; i * 13 <= 730; i++) {
        result = 13 * i;
        output = output + ', ' + (13 * i);
        console.log(result);
        results.firstChild.innerText = output;
    }
}

const buttonXTimes13 = document.createElement('button');
buttonTellHigher.innerText = 'X Times 13';
buttonTellHigher.setAttribute('id', 'task-6');
buttonTellHigher.addEventListener('click', () => { xTimes13() });
tasks.appendChild(buttonTellHigher);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */

const calculateCircleArea = (radius) => {
    const content = Math.PI * radius * radius;
    console.log('Area of a circle with radius of ' + radius + ' cm is ' + content + ' cm^2!');
    results.firstChild.innerText = 'Area of a circle with radius of ' + radius + ' cm is ' + content + ' cm^2!';
}

const buttonCalculateCircleArea = document.createElement('button');
buttonCalculateCircleArea.innerText = 'Calculate Circle Area';
buttonCalculateCircleArea.setAttribute('id', 'task-7');
buttonCalculateCircleArea.addEventListener('click', () => {
    calculateCircleArea(10);
    calculateCircleArea(2);
    calculateCircleArea(4);
    calculateCircleArea(3.634);
});
tasks.appendChild(buttonCalculateCircleArea);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */

const calculateConeVolume = (radius, height) => {
    const volume = 1 / 3 * Math.PI * radius * radius * height;
    console.log('Volume of a cone with radius of ' + radius + ' cm and height of ' + height + 'cm is ' + volume + ' cm^3!');
    results.firstChild.innerText = 'Volume of a cone with radius of ' + radius + ' cm and height of ' + height + 'cm is ' + volume + ' cm^3!';
}

const buttonCalculateConeVolume = document.createElement('button');
buttonCalculateConeVolume.innerText = 'Calculate Cone Volume';
buttonCalculateConeVolume.setAttribute('id', 'task-8');
buttonCalculateConeVolume.addEventListener('click', () => {
    calculateConeVolume(10, 2);
    calculateConeVolume(2, 5);
    calculateConeVolume(4, 6);
    calculateConeVolume(3.634, 1);
});
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

const isTriangle = (a, b, c) => {
    let cond1 = false;
    let cond2 = false;
    let cond3 = false;
    if (a + b > c) { cond1 = true; }
    if (a + c > b) { cond2 = true; }
    if (c + b > a) { cond3 = true; }
    if (cond1 && cond2 && cond3) {
        console.log('Lengths: ' + a + ', ' + b + ', ' + c + ' can indeed make a triangle!');
        results.firstChild.innerText = 'Lengths: ' + a + ', ' + b + ', ' + c + ' can indeed make a triangle!';
        return true;
    } else {
        console.log('Lengths: ' + a + ', ' + b + ', ' + c + ' cannot make a triangle!');
        results.firstChild.innerText = 'Lengths: ' + a + ', ' + b + ', ' + c + ' cannot make a triangle!';
        return false;
    }
}

const buttonIsTriangle = document.createElement('button');
buttonIsTriangle.innerText = 'Can Make Triangle';
buttonIsTriangle.setAttribute('id', 'task-9');
buttonIsTriangle.addEventListener('click', () => {
    isTriangle(10, 2, 3);
    isTriangle(2, 5, 4);
    isTriangle(4, 6, 2);
    isTriangle(3.634, 1, 3);
});
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

const heronsFormula = (a, b, c) => {
    const makesTriangle = isTriangle(a, b, c);
    if (makesTriangle) {
        const s = (a + b + c) / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        console.log('Area of a triangle with lengths: ' + a + ', ' + b + ', ' + c + ' is ' + area + ' cm^2!');
        results.firstChild.innerText = 'Area of a triangle with Lengths: ' + a + ', ' + b + ', ' + c + ' is ' + area + ' cm^2!';
    } else {
        return false;
    }
}

const buttonHeronsFormula = document.createElement('button');
buttonHeronsFormula.innerText = 'Calculate Area Of Triangle';
buttonHeronsFormula.setAttribute('id', 'task-10');
buttonHeronsFormula.addEventListener('click', () => {
    heronsFormula(10, 2, 3);
    heronsFormula(2, 5, 4);
    heronsFormula(4, 6, 2);
    heronsFormula(3.634, 1, 3);
});
tasks.appendChild(buttonHeronsFormula);

results.firstChild.innerText = 'This is the output. Click any button to show the result!';