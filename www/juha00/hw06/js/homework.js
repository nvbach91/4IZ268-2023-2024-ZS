/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
const pepesAge = 2000;
const thisYear = new Date().getFullYear();

console.log(`Pepovi je ${thisYear - pepesAge} let.`);

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */

const temperatureCelsius = 20;
const temperatureFahrenheit = 68;

const convertedToFahrenheiht = (temperatureCelsius * 9 / 5) + 32;
const convertedToCelsius = (temperatureFahrenheit - 32) * 5 / 9;

//výpis
console.log(temperatureCelsius + "°C = " + convertedToFahrenheiht +  "°F");
console.log(temperatureFahrenheit + "°F = " + convertedToCelsius + "°C");


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
 *  * const buttonSayHello = document.createElement('button');
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

/**Pepeho věk */
const calculatePepeAge = (birthYear) => {
    return new Date().getFullYear() - birthYear;
    };

const buttonCalculatePepeAge = document.createElement('button');
buttonCalculatePepeAge.innerText = 'Úloha 1 (Pepes\'s age)';
buttonCalculatePepeAge.setAttribute('id', 'task-1');


buttonCalculatePepeAge.addEventListener('click', () => {
    const pepeBirthYear = 2000;
    const age = calculatePepeAge(pepeBirthYear);
    const result = "Pepovi je " + age + ".";
    console.log(result);

    const resultDiv = document.createElement('div');
    resultDiv.innerText = result;
    
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultDiv);
});

const tasks = document.querySelector('#tasks');
tasks.appendChild(buttonCalculatePepeAge);

/**Převod teploty */
const temperatureConversion = (temperature, unit) => {
    if (unit === "C") {
        const temperatureFahrenheit = (temperature * 9/5) + 32;
        return temperature + "°C = " + temperatureFahrenheit + "°F";
    } else if (unit === "F") {
        const temperatureCelsius = (temperature - 32) * 5/9;
        return temperature + "°F = " + temperatureCelsius + "°C";
    } else {
        return "Neznámá jednotka teploty. Použijte 'C' nebo 'F'.";
    }
}

//tlačítko
const buttonTemperatureConversion = document.createElement('button');
buttonTemperatureConversion.innerText = 'Úloha 2 (Funkce function fonction funktio)';
buttonTemperatureConversion.setAttribute('id', 'task-2');

buttonTemperatureConversion.addEventListener('click', () => {
    const temperatureCelsius = 26;
    const result = temperatureConversion(temperatureCelsius, "C");

    console.log(result);

    const resultDiv = document.createElement('div');
    resultDiv.innerText = result;
    
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultDiv);
});

tasks.appendChild(buttonTemperatureConversion);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
const calculatePercentage = (number, total) => {
    if (total === 0) {
        return "Nelze dělit nulou!";
    }
    const percentage = (number / total) * 100;
    return `${number} je ${percentage.toFixed(2)}% z ${total}.`;
}

//tlačítko
const buttonCalculatePercentage = document.createElement('button');
buttonCalculatePercentage.innerText = 'Úloha 4 (%CENSORED%)';
buttonCalculatePercentage.setAttribute('id', 'task-4');

//posluchač události a výpis výsledku
buttonCalculatePercentage.addEventListener('click', () => {
    const number = 25;
    const total = 50;

    const result = calculatePercentage(number, total);
    console.log(result);
    
    const resultDiv = document.createElement('div');
    resultDiv.innerText = result;
    
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultDiv);
});

tasks.appendChild(buttonCalculatePercentage);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
//funkce
const compareNumbers = (number1, number2) => {
    if (number1 === number2) {
        return "Čísla se rovnají.";
    } else if (number1 > number2) {
        return `${number1} je větší než ${number2}.`;
    } else {
        return `${number2} je větší než ${number1}.`;
    }
}

//tlačítka
const buttonCompare1 = createButton(5, 10);
const buttonCompare2 = createButton(10.5, 10.5);
const buttonCompare3 = createButton(3.5, 1.75);

function createButton(number1, number2) {
    const button = document.createElement('button');
    button.innerText = `Úloha 5 (Kdo s koho: ${number1} a ${number2})`;
    button.setAttribute('id', `compare-${number1}-${number2}`);

    //posluchač události a výpis výsledku
    button.addEventListener('click', () => {
        const result = compareNumbers(number1, number2);
        console.log(result);

        const resultDiv = document.createElement('div');
        resultDiv.innerText = result;

        const resultsContainer = document.querySelector('#results');
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(resultDiv);
    });

    return button;
}

//vložení tlačítek
tasks.appendChild(buttonCompare1);
tasks.appendChild(buttonCompare2);
tasks.appendChild(buttonCompare3);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */

//funkce
const printMultiplesOf13 = () => {
    const multiples = [];
    for (let i = 0; i <= 730; i += 13) {
        multiples.push(i);
    }
    return multiples;
}

//vypsání do results
const displayMultiplesInConsoleAndResults = () => {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';

    const multiples = printMultiplesOf13();
    const resultDiv = document.createElement('div');
    resultDiv.innerText = multiples.join("\n");
    resultsContainer.appendChild(resultDiv);

    for (const multiple of multiples) {
        console.log(multiple);
    }
}

//tlačítko
const buttonPrintMultiplesOf13 = document.createElement('button');
buttonPrintMultiplesOf13.innerText = 'Úloha 6 (I can cleary see the pattern)';
buttonPrintMultiplesOf13.setAttribute('id', 'task-6');

buttonPrintMultiplesOf13.addEventListener('click', displayMultiplesInConsoleAndResults);

tasks.appendChild(buttonPrintMultiplesOf13);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
//funkce
const calculateCircleArea = (radius) => {
    const area = Math.PI * radius ** 2;
    return area;
}

//tlačítko
const buttonCalculateCircleArea = document.createElement('button');
buttonCalculateCircleArea.innerText = 'Úloha 7 (Around and about)';
buttonCalculateCircleArea.setAttribute('id', 'task-7');

buttonCalculateCircleArea.addEventListener('click', calculateCircleArea);

//posluchač události a výpis výsledku
buttonCalculateCircleArea.addEventListener('click', () => {
    const radius = 5;
    const area = calculateCircleArea(radius);
    const result = `Obsah kružnice s poloměrem ${radius} je ${area.toFixed(2)}.`;

    console.log(result);

    const resultDiv = document.createElement('div');
    resultDiv.innerText = result;

    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultDiv);
});


tasks.appendChild(buttonCalculateCircleArea);



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
//funkce
const calculateConeVolume = (height, radius) => {
    const volume = (1/3) * Math.PI * radius ** 2 * height;
    return volume;
}

//tlačítko
const buttonCalculateConeVolume = document.createElement('button');
buttonCalculateConeVolume.innerText = 'Úloha 8 (Another dimension)';
buttonCalculateConeVolume.setAttribute('id', 'task-8');

//posluchač události a výpis výsledku
buttonCalculateConeVolume.addEventListener('click', () => {
    const height = 7;
    const radius = 5;
    const area = calculateCircleArea(radius);
    const result = `Objem kuželu s výškou ${height} a poloměrem ${radius} je ${area.toFixed(2)}.`;

    console.log(result);

    const resultDiv = document.createElement('div');
    resultDiv.innerText = result;

    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultDiv);
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

//funkce
const isTriangle = (a, b, c) => {
    if (a + b > c && a + c > b && b + c > a) {
        const message = `Lze postavit trojúhelník se stranami: a = ${a}, b = ${b}, c = ${c}.`;
        console.log(message);
        return { result: true, message };
    } else {
        const message = `Nelze postavit trojúhelník se stranami: a = ${a}, b = ${b}, c = ${c}.`;
        console.log(message);
        return { result: false, message };
    }
}

//tlačítko
const buttonIsTriangle = document.createElement('button');
buttonIsTriangle.innerText = 'Úloha 9 (Not sure if triangle, or just some random values)';
buttonIsTriangle.setAttribute('id', 'task-9');

//posluchač události a výpis výsledku
buttonIsTriangle.addEventListener('click', () => {
    const sideA = 3;
    const sideB = 4;
    const sideC = 5;
    const result = isTriangle(sideA, sideB, sideC);

    const resultDiv = document.createElement('div');
    resultDiv.innerText = `${result.message}, ${result.result}`;

    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultDiv);
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

//funkce
const calculateTriangleArea = (a, b, c) => {
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return area;
}

//tlačítko
const buttonCalculateArea = document.createElement('button');
buttonCalculateArea.innerText = 'Úloha 10 (Heroic performance)';
buttonCalculateArea.setAttribute('id', 'task-10');

//posluchač události a výpis výsledku
buttonCalculateArea.addEventListener('click', () => {
    const sideA = 5;
    const sideB = 6;
    const sideC = 7;

    if (isTriangle(sideA, sideB, sideC)) {
        const area = calculateTriangleArea(sideA, sideB, sideC);
        const resultDiv = document.createElement('div');
        resultDiv.innerText = `Obsah trojúhelníka je ${area.toFixed(2)}`;

        const resultsContainer = document.querySelector('#results');
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(resultDiv);
    } else {
        const resultDiv = document.createElement('div');
        resultDiv.innerText = 'Trojúhelník nelze sestavit s těmito délkami stran.';

        const resultsContainer = document.querySelector('#results');
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(resultDiv);
    }
});

tasks.appendChild(buttonCalculateArea);