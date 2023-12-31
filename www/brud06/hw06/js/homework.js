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
console.log('Ahoj světe')

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const birthYear = 2001;
const currentYear = 2023
const age = currentYear - birthYear;
console.log(`Pepe is ${age} years old.`);



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const celsiusTemperature = 20;
const fahrenheitTemperature = 68;

const celsiusToFahrenheit = (celsiusTemperature * 9 / 5) + 32;
const fahrenheitToCelsius = (fahrenheitTemperature - 32) * 5 / 9;

console.log(`${celsiusTemperature}°C = ${celsiusToFahrenheit}°F`);
console.log(`${fahrenheitTemperature}°F = ${fahrenheitToCelsius}°C`);



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

// deklarace a implementace funkce
const pepeAge = () => {
    const birthYear = 2001;
    const currentYear = 2023;
    const age = currentYear - birthYear;
    console.log(`Pepe is ${age} years old.`);
};
const buttonPepeAge = document.createElement('button');
buttonPepeAge.innerText = 'PepesAge';
buttonPepeAge.setAttribute('id', 'task-1');
// nabindování funkce na událost click tlačítka
buttonPepeAge.addEventListener('click', () => {
    pepeAge();
});
const tasks = document.querySelector('#tasks');
tasks.appendChild(buttonPepeAge);

const wtf = () => {
    const celsiusTemperature = 20;
    const fahrenheitTemperature = 68;

    const celsiusToFahrenheit = (celsiusTemperature * 9 / 5) + 32;
    const fahrenheitToCelsius = (fahrenheitTemperature - 32) * 5 / 9;

    console.log(`${celsiusTemperature}°C = ${celsiusToFahrenheit}°F`);
    console.log(`${fahrenheitTemperature}°F = ${fahrenheitToCelsius}°C`);
};
const buttonWtf = document.createElement('button');
buttonWtf.innerText = 'WTF';
buttonWtf.setAttribute('id', 'task-2');
// nabindování funkce na událost click tlačítka
buttonWtf.addEventListener('click', () => {
    wtf();
});
tasks.appendChild(buttonWtf);



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
const calculatePercentage = (a, b) => {
    const resultDiv = document.getElementById("results");
    if (b === 0) {
        console.log("Cannot divide by zero!");
        resultDiv.innerText = "Cannot divide by zero!"
    }
    const result = (a / b) * 100;
    console.log(`${a} je ${result.toFixed(2)}% z ${b}.`);
    resultDiv.innerText = `${a} je ${result.toFixed(2)}% z ${b}.`;
};

const buttonCensored = document.createElement('button');
buttonCensored.innerText = 'Censored';
buttonCensored.setAttribute('id', 'task-3');
buttonCensored.addEventListener('click', () => {
    calculatePercentage(21, 42);
});
document.getElementById("tasks").appendChild(buttonCensored);




/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const compareNumbers = (number1, number2) => {
    const resultDiv = document.getElementById("results");
    if (number1 > number2) {
        resultDiv.innerText = `${number1} is bigger than ${number2}.`;
    } else if (number2 > number1) {
        resultDiv.innerText = `${number2} is bigger than ${number1}.`;
    } else {
        resultDiv.innerText = `${number1} and ${number2} are equal`;
    }
}
const buttonCompare = document.createElement('button');
buttonCompare.innerText = 'Compare 5 and 10';
buttonCompare.addEventListener('click', () => {
    compareNumbers(5, 10);
});
document.getElementById("tasks").appendChild(buttonCompare);

const buttonCompareTwo = document.createElement('button');
buttonCompareTwo.innerText = 'Compare 7.5 and 3.5';
buttonCompareTwo.addEventListener('click', () => {
    compareNumbers(7.5, 3.5);
});
document.getElementById("tasks").appendChild(buttonCompareTwo);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
const pattern = () => {
    const resultDiv = document.getElementById("results");
    resultDiv.innerText = '';

    for (let i = 0; i <= 730; i += 13) {
        resultDiv.innerText += `${i}, `;
    }
};
const button13 = document.createElement('button');
button13.innerText = 'Multiples of 13';
button13.addEventListener('click', () => {
    pattern();
});
document.getElementById("tasks").appendChild(button13);




/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const calculateCircleArea = (radius) => {
    const resultDiv = document.getElementById("results");

    if (radius >= 0) {
        const area = Math.PI * radius * radius;
        resultDiv.innerText = `Area is ${area.toFixed(2)}.`;
    } else {
        resultDiv.innerText = "Radius needs to be bigger than 0";
    }
}
const buttonArea = document.createElement('button');
buttonArea.innerText = 'Calculate area with radius 5';
buttonArea.addEventListener('click', () => {
    calculateCircleArea(5);
});

document.getElementById("tasks").appendChild(buttonArea);




/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const calculateConeVolume = (radius, height) => {
    const resultDiv = document.getElementById("results");

    if (radius >= 0 && height >= 0) {
        const volume = (1 / 3) * Math.PI * radius * radius * height;
        resultDiv.innerText = `Volume is ${volume.toFixed(2)}.`;
    } else {
        resultDiv.innerText = "Radius and height can't be negative.";
    }
}
const buttonVolume = document.createElement('button');
buttonVolume.innerText = 'Cone volume';
buttonVolume.addEventListener('click', () => {
    calculateConeVolume(5, 10);
});

document.getElementById("tasks").appendChild(buttonVolume);


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
    const resultDiv = document.getElementById("results");

    if (a > 0 && b > 0 && c > 0) {
        if (a + b > c && a + c > b && b + c > a) {
            //Progtest flashbacks
            resultDiv.innerText = "Is a triangle";
            return true;
        } else {
            resultDiv.innerText = "Isn't a triangle";
            return false;
        }
    } else {
        resultDiv.innerText = "Lengths need to be > 0";
        return false;
    }
}
const buttonTriangle = document.createElement('button');
buttonTriangle.innerText = 'Is 5,12,13 a Triangle?';
buttonTriangle.addEventListener('click', () => {
    isTriangle(5, 12, 13); //setting values
});

document.getElementById("tasks").appendChild(buttonTriangle);




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

const calculateTriangleArea = (a, b, c) => {
    const resultDiv = document.getElementById("results");

    if (isTriangle(a, b, c)) {
        const s = (a + b + c) / 2; //calculate the s = half the perimiter
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); //Heron's formula

        resultDiv.innerText = `Area is ${area.toFixed(2)}.`;
        return area;
    } else {
        resultDiv.innerText = "Isn't a triangle.";
        return null;
    }
}
const buttonTriangleArea = document.createElement('button');
buttonTriangleArea.innerText = 'Calculate triangle area';
buttonTriangleArea.addEventListener('click', () => {
    calculateTriangleArea(5, 12, 13);
});

document.getElementById("tasks").appendChild(buttonTriangleArea);



