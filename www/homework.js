console.log('Ahoj světe');


const birthYear = 2000;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;
console.log("Pepe's age is " + age + " years old.");

document.getElementById("task-1").addEventListener("click", function () {
    const currentYear = new Date().getFullYear();
    const birthYear = 2000;
    const age = calculatePepeAge(currentYear, birthYear);
    const resultContainer = document.getElementById('results');
    resultContainer.textContent = "Pepe's age is " + age + " years.";
});

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
const celsiusTemp = 20;
const fahrenheitTemp = (celsiusTemp * 9 / 5) + 32;
console.log(`${celsiusTemp}°C = ${fahrenheitTemp}°F`);


const fahrenheitTemp2 = 70;
const celsiusTemp2 = (fahrenheitTemp2 - 32) * 5 / 9;
console.log(`${fahrenheitTemp2}°F = ${celsiusTemp2}°C`);



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
 */
function calculatePepeAge(currentYear, birthYear) {
    return currentYear - birthYear;
}

function greetPepe(name, age) {
    return "Hello, my name is " + name + " and I am " + age + " years old.";
}

function calculateAreaOfRectangle(width, height) {
    return width * height;
}

document.getElementById("task-1").addEventListener("click", function () {
    const currentYear = new Date().getFullYear();
    const birthYear = 2000;
    const age = calculatePepeAge(currentYear, birthYear);
    console.log("Pepe's age is " + age + " years.");
});

document.getElementById("task-2").addEventListener("click", function () {
    const name = "Pepe"; 
    const age = 23;
    const greeting = greetPepe(name, age);
    console.log(greeting);
});

document.getElementById("task-3").addEventListener("click", function () {
    const width = 15;
    const height = 25;
    const area = calculateAreaOfRectangle(width, height);
    console.log("The area of the rectangle is " + area);
});

document.getElementById("task-2").addEventListener("click", function () {
    const name = "Pepe"; 
    const age = 23;
    const greeting = greetPepe(name, age);
    document.getElementById("results").textContent = greeting;
});

document.getElementById("task-3").addEventListener("click", function () {
    const width = 15;
    const height = 25;
    const area = calculateAreaOfRectangle(width, height);
    document.getElementById("results").textContent = "The area of the rectangle is " + area;
});


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */

function divideAndFormatPercentage(number1, number2) {
    if (number2 === 0) {
        return "Nelze dělit nulou";
    }

    const result = (number1 / number2 * 100).toFixed(2);
    const resultContainer = document.getElementById('results');
    resultContainer.textContent = `${number1} je ${result}% z ${number2}.`;
}
document.getElementById("calculate-button").addEventListener('click', function () {
    const number1 = 52;
    const number2 = 87;
    divideAndFormatPercentage(number1, number2);
});


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */



function compareNumbers(num1, num2) {
    if (num1 > num2) {
        return num1 + " is greater than " + num2;
    } else if (num1 < num2) {
        return num2 + " is greater than " + num1;
    } else {
        return num1 + " and " + num2 + " are equal";
    }
}
document.getElementById("button1").addEventListener('click', function () {
    const resultContainer = document.getElementById('results');
    const result = compareNumbers(5, 10);
    resultContainer.textContent = result;
});

document.getElementById("button2").addEventListener('click', function () {
    const resultContainer = document.getElementById('results');
    const result = compareNumbers(7.5, 7.5);
    resultContainer.textContent = result;
});

document.getElementById("button3").addEventListener('click', function () {
    const resultContainer = document.getElementById('results');
    const result = compareNumbers(3/4, 1/2);
    resultContainer.textContent = result;
});


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
function printMultiplesOf13(resultContainer) {
    let result = "";
    for (let i = 0; i <= 730; i += 13) {
        result += i + "<br>";
    }
    resultContainer.innerHTML = result;
}
document.getElementById("button4").addEventListener('click', function () {
    const resultContainer = document.getElementById('results');
    printMultiplesOf13(resultContainer);
});
/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
function calculateCircleArea(radius) {
    const pi = 3.14159;
    const area = pi * Math.pow(radius, 2);

    const resultContainer = document.getElementById('results');
    resultContainer.textContent = "The area of the circle with radius " + radius + " is: " + area;
}
document.getElementById("button5").addEventListener('click', function () {
    const radius = 5; // Replace with the desired radius
    calculateCircleArea(radius);
});

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("button6").addEventListener('click', function () {
        const resultContainer = document.getElementById('results');
        calculateConeVolume(5, 10, resultContainer);
    });

    function calculateConeVolume(radius, height, resultContainer) {
        const pi = 3.14159;
        const volume = (1 / 3) * pi * Math.pow(radius, 2) * height;
        resultContainer.textContent = "The volume of the cone with radius " + radius + " and height " + height + " is: " + volume;
    }
});


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("button7").addEventListener('click', function () {
        checkTriangle(3, 4, 5);
    });

    function checkTriangle(a, b, c) {
        const result = isTrianglePossible(a, b, c);
        const resultContainer = document.getElementById('results');
        if (result) {
            resultContainer.textContent = "Triangle is possible with sides " + a + ", " + b + ", and " + c + ".";
        } else {
            resultContainer.textContent = "No triangle can be formed with sides " + a + ", " + b + ", and " + c + ".";
        }
    }

    function isTrianglePossible(a, b, c) {
        return a + b > c && a + c > b && b + c > a;
    }
});



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
function calculateTriangleArea(a, b, c) {
    const resultContainer = document.getElementById('results');

    if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || a + c <= b || b + c <= a) {
        resultContainer.textContent = "Invalid triangle side lengths.";
        return;
    }

    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    resultContainer.textContent = `The area of the triangle is ${area}`;
}

const calculateButton = document.getElementById('calculate-button');

calculateButton.addEventListener('click', function () {
    calculateTriangleArea(3, 4, 5);
});