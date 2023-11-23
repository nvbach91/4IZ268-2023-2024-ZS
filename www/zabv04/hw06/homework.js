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
let birthYear = 2000;
let currentYear = 2023;
let pepesAge = currentYear - birthYear;
console.log("Pepe is " + pepesAge + " years old.");


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
let tempCelsius = 13;
let tempFahrenheit = (tempCelsius * 9) / 5 + 32;
console.log(tempCelsius + "°C = " + tempFahrenheit + "°F");

let tempFahrenheit2 = 80;
let tempCelsius2 = (tempFahrenheit2 - 32) * 5 / 9;
console.log(tempFahrenheit2 + "°F = " + tempCelsius2 + "°C");

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

//--------------------------------------------------------------------------
// Pepe's Age
//--------------------------------------------------------------------------

const getPepesAge = (birthYear) => {
    let currentYear = 2023;
    let pepesAge = currentYear - birthYear;
    console.log("Pepe is " + pepesAge + " years old.");
};

const buttonGetPepesAge = document.createElement('button');
buttonGetPepesAge.innerText = "Task 1 (Pepe's age)";
buttonGetPepesAge.setAttribute('id', 'task-1');
buttonGetPepesAge.addEventListener('click', () => {
    const birthYear = prompt('In which year was Pepe born?');
    if (birthYear != null) {
        getPepesAge(birthYear);
    }
});

const tasks = document.querySelector('#tasks');
tasks.appendChild(buttonGetPepesAge);

//--------------------------------------------------------------------------
// Temperature in Fahrenheit
//--------------------------------------------------------------------------

const getTemperatureInFahrenheit = (tempCelsius) => {
    const tempFahrenheit = (tempCelsius * 9) / 5 + 32;
    console.log(tempCelsius + "°C = " + tempFahrenheit + "°F");
};

const buttonTemperatureInFahrenheit = document.createElement('button');
buttonTemperatureInFahrenheit.innerText = "Task 2 (WTF) - Celsius to Fahrenheit";
buttonTemperatureInFahrenheit.setAttribute('id', 'task-2');

buttonTemperatureInFahrenheit.addEventListener('click', () => {
    const tempCelsius = prompt('Enter the temperature in Celsius: ');
    if (tempCelsius != null && !isNaN(tempCelsius)) {
        getTemperatureInFahrenheit(tempCelsius);
    } else {
        alert('Please enter a number!');
    }
});

tasks.appendChild(buttonTemperatureInFahrenheit);

//--------------------------------------------------------------------------
// Temperature in Celsius
//--------------------------------------------------------------------------

const getTemperatureInCelsius = (tempFahrenheit2) => {
    const tempCelsius2 = (tempFahrenheit2 - 32) * 5 / 9;
    console.log(tempFahrenheit2 + "°F = " + tempCelsius2 + "°C");
};

const buttonTemperatureInCelsius = document.createElement('button');
buttonTemperatureInCelsius.innerText = "Task 2 (WTF) - Fahrenheit to Celsius";
buttonTemperatureInCelsius.setAttribute('id', 'task-2');

buttonTemperatureInCelsius.addEventListener('click', () => {
    const tempCelsius2 = prompt('Enter the temperature in Fahrenheit: ');
    if (tempCelsius2 != null && !isNaN(tempCelsius2)) {
        getTemperatureInCelsius(tempCelsius2);
    } else {
        alert('Please enter a number!');
    }
});

tasks.appendChild(buttonTemperatureInCelsius);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const resultsDiv = document.querySelector('#results');

const getPercentage = (a, b) => {
    if (b == 0) {
        alert('Division by zero is not allowed!');
        return;
    }
    const result = (a / b) * 100;
    return a + ' is ' + result.toFixed(0) + '%' + ' of ' + b + '.';
};

const buttonGetPercentage = document.createElement('button');
buttonGetPercentage.innerText = "Task 4 (Calculate Percentage)";
buttonGetPercentage.setAttribute('id', 'task-4');

buttonGetPercentage.addEventListener('click', () => {
    const firstNumber = prompt('Enter the first number: ');
    const secondNumber = prompt('Enter the second number: ');

    if (firstNumber != null && secondNumber != null &&
        !isNaN(firstNumber) && !isNaN(secondNumber)) {
        const result = getPercentage(firstNumber, secondNumber);
        resultsDiv.textContent = result;
    }
});

tasks.appendChild(buttonGetPercentage);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const getTwoNumbersComparison = (a, b) => {
    if (a == b) {
        return ("Numbers are equal.");
    } else if (a > b) {
        return (a + " is greater than " + b + ".");
    } else {
        return (b + " is greater than " + a + ".");
    }
};

const getTwoNumbersComparisonButton = (a, b) => {
    const button = document.createElement('button');
    button.innerText = `Task 5 (Who against whom) - Compare ${a} and ${b}`;

    button.addEventListener('click', () => {
        const result = getTwoNumbersComparison(a, b);
        resultsDiv.textContent = result;
    });
    tasks.appendChild(button);
};

getTwoNumbersComparisonButton(5, 5);
getTwoNumbersComparisonButton(5.5, 4.5);
getTwoNumbersComparisonButton(3 / 12, 4 / 7);
getTwoNumbersComparisonButton(15, 12);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const getMultiplesOfThirteen = () => {
    let resultText = 'Multiples of 13 that are less than or equal to 730: ';
    for (let i = 0; i <= 730; i += 13) {
        resultText += `${i} `;
    }
    return resultText;
}

const getMultiplesOfThirteenButton = document.createElement('button');
getMultiplesOfThirteenButton.innerText = 'Task 6 (I can clearly see the pattern)';
getMultiplesOfThirteenButton.setAttribute('id', 'task-6');

getMultiplesOfThirteenButton.addEventListener('click', () => {
    const result = getMultiplesOfThirteen();
    resultsDiv.textContent = result;
});

tasks.appendChild(getMultiplesOfThirteenButton);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const getCircleArea = (radius) => {
    const area = Math.PI * radius * radius;
    return ("Area of a circle with a radius of " + radius + " is: " + area + ".");
};

const getCircleAreaButton = (radius) => {
    const button = document.createElement('button');
    button.innerText = 'Task 7 (Around and about)';
    button.addEventListener('click', () => {
        const result = getCircleArea(radius);
        resultsDiv.textContent = result;
    });
    tasks.appendChild(button);
};

getCircleAreaButton(10);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here


const getConeVolume = (height, radius) => {
    const coneVolume = (1 / 3) * Math.PI * height * radius * radius;
    return ("Volume of a cone with a height of " + height + " and a radius of " + radius + " is " + coneVolume + ".");
};

const getConeVolumeButton = (height, radius) => {
    const button = document.createElement('button');
    button.innerText = 'Task 8 (Another dimension)';
    button.addEventListener('click', () => {
        const result = getConeVolume(height, radius);
        resultsDiv.textContent = result;
    });
    tasks.appendChild(button);
};

getConeVolumeButton(8, 3);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const isATriangle = (a, b, c) => {
    if (a + b > c && a + c > b && b + c > a) {
        console.log('Yes, with sides ' + a + ', ' + b + ', and ' + c + ' a triangle can be formed.');
        return true;
    } else {
        console.log('No, with sides ' + a + ', ' + b + ', and ' + c + ' a triangle cannot be formed.');
        return false;
    }
};

const isATriangleButton = (a, b, c) => {
    const button = document.createElement('button');
    button.innerText = 'Task 9 (Not sure if triangle, or just some random values)';
    button.addEventListener('click', () => {
        const result = isATriangle(a, b, c);
        resultsDiv.textContent = `${result ? 'Yes' : 'No'}, with sides ${a}, ${b}, and ${c} ${result ? 'a triangle can' : 'cannot'} be formed.`;
    });
    tasks.appendChild(button);
};

isATriangleButton(3, 4, 6);
isATriangleButton(2, 10, 13);


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

const getTriangleAreaHeron = (a, b, c) => {
    if (!isATriangle(a, b, c)) {
        alert('The given sides do not form a triangle');
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return ("Area of a triangle with sides " + a + ', ' + b + ', and ' + c + " is " + area + ".");
};

const getTriangleAreaHeronButton = (a, b, c) => {
    const button = document.createElement('button');
    button.innerText = 'Task 10 (Heroic performance)';
    button.addEventListener('click', () => {
        const result = getTriangleAreaHeron(a, b, c);
        resultsDiv.textContent = result;
    });
    tasks.appendChild(button);
};

getTriangleAreaHeronButton(9, 10, 11);

