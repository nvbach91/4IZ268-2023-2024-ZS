/*jshint esversion: 7 */ 
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
const pepesBirthYear = 1997;
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

console.log(`Pepa is ${currentYear - pepesBirthYear} years old.`);




/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const temperatureC = 20;
const temperatureF = 68;

console.log(`Temperature ${temperatureC}°C is equal to ${temperatureC * 9 / 5 + 32}°F.`);
console.log(`Temperature ${temperatureF}°F is equal to ${(temperatureF - 32) * 5 / 9}°C.`);


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


//Místo pro prvky a další příprava 
const taskSpace = document.querySelector('#tasks');
const resultSpace = document.querySelector('#results');

const firstTaskRow = document.createElement('div');
firstTaskRow.classList.add('task-row');
taskSpace.appendChild(firstTaskRow);

const secondTaskRow = document.createElement('div');
secondTaskRow.classList.add('task-row');
taskSpace.appendChild(secondTaskRow);

const thirdTaskRow = document.createElement('div');
thirdTaskRow.classList.add('task-row');
taskSpace.appendChild(thirdTaskRow);

//Místo pro výpis textu do HTML
const output = document.createElement('div');
output.classList.add('output');
resultSpace.appendChild(output);

//Výpočet věku funkcí
const getPepeAge = (birthDate) => {
    if (!birthDate) {
        return ('Please provide a date of Pepes birth.');
    }
    else if (birthDate.getTime() > currentDate.getTime()) {
        return ('Is Pepe a time traveler?');
    }
    return (`Pepe\'s ${Math.floor((currentDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365))} years old.`);
};

//Funkce pro vypsaní výstupu do HTML a do Console
const displayResult = (outputContent) => {
    output.innerHTML = outputContent;
    console.log(outputContent);
    return true;
};

//Převod stupňů funkcí
const fahrenheihtToCelsius = (fahrenheihtTemperature) => {

    if (isNaN(fahrenheihtTemperature)) {
        return ("Value has to be number!");
    }
    return (`Temperature ${fahrenheihtTemperature}°F is equal to ${(fahrenheihtTemperature - 32) * 5 / 9}°C.`);
};


//Převod stupňů funkcí
const celsiusToFahrenheiht = (celsiusTemperature) => {
    if (isNaN(celsiusTemperature)) {
        return ("Value has to be number!");
    }
    return (`Temperature ${celsiusTemperature}°C is equal to ${celsiusTemperature * 9 / 5 + 32}°F.`);
};


//Button pro task 1 - výpočet věku
const buttonTask1 = document.createElement('button');
buttonTask1.innerHTML = 'Task 1 (Pepe\'s age)';
buttonTask1.setAttribute('id', 'task-1');
buttonTask1.addEventListener('click', () => {
    displayResult(getPepeAge(inputTask1.valueAsDate));
});
firstTaskRow.appendChild(buttonTask1);

//Input pro task 1 
const inputTask1 = document.createElement('input');
inputTask1.setAttribute('id', 'input-task1');
inputTask1.setAttribute('type', 'date');
firstTaskRow.appendChild(inputTask1);



//Button pro task 2 - převod °C -> °F
const buttonTask2 = document.createElement('button');
buttonTask2.innerHTML = 'Task 2 (°C => °F)';
buttonTask2.setAttribute('id', 'task-2');
buttonTask2.addEventListener('click', () => {
    displayResult(celsiusToFahrenheiht(inputTask2.valueAsNumber));
});
secondTaskRow.appendChild(buttonTask2);

//Input pro task 2
const inputTask2 = document.createElement('input');
inputTask2.setAttribute('id', 'input-task2');
inputTask2.setAttribute('type', 'number');
inputTask2.setAttribute('placeholder', 'Temperature in °C');
secondTaskRow.appendChild(inputTask2);



//Button pro task 3 - převod °F -> °C
const buttonTask3 = document.createElement('button');
buttonTask3.innerHTML = 'Task 3 (°F => °C)';
buttonTask3.setAttribute('id', 'task-3');
buttonTask3.addEventListener('click', () => {
    displayResult(fahrenheihtToCelsius(inputTask3.valueAsNumber));
});
thirdTaskRow.appendChild(buttonTask3);

//Input pro task 3
const inputTask3 = document.createElement('input');
inputTask3.setAttribute('id', 'input-task3');
inputTask3.setAttribute('type', 'number');
inputTask3.setAttribute('placeholder', 'Temperature in °F');
thirdTaskRow.appendChild(inputTask3);



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

//Místo pro prvky
const fourthTaskRow = document.createElement('div');
fourthTaskRow.classList.add('task-row');
taskSpace.appendChild(fourthTaskRow);



//Výpočet kvocientu
const getQuotient = (dividend, divisor) => {

    if (isNaN(dividend) || isNaN(divisor)) {
        return ("Values have to be number!");
    }
    else if (divisor == 0) {
        return ('Divisor cannot be 0.');
    }
    return (`The number ${dividend} is ${(dividend / divisor).toFixed(4) * 100}% of the numer ${divisor}.`);
};


//Button pro task 4 - kvocient
const buttonTask4 = document.createElement('button');
buttonTask4.innerHTML = 'Task 4 (quotient)';
buttonTask4.setAttribute('id', 'task-4');
buttonTask4.addEventListener('click', () => {
    displayResult(getQuotient(firstInputTask4.valueAsNumber, secondInputTask4.valueAsNumber));
});
fourthTaskRow.appendChild(buttonTask4);

//První input pro task 4
const firstInputTask4 = document.createElement('input');
firstInputTask4.setAttribute('id', 'first-input-task4');
firstInputTask4.setAttribute('type', 'number');
firstInputTask4.setAttribute('placeholder', 'Dividend');
fourthTaskRow.appendChild(firstInputTask4);

//Druhý input pro task 4
const secondInputTask4 = document.createElement('input');
secondInputTask4.setAttribute('id', 'second-input-task4');
secondInputTask4.setAttribute('type', 'number');
secondInputTask4.setAttribute('placeholder', 'Divisor');
fourthTaskRow.appendChild(secondInputTask4);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

//Místo pro prvky
const fifthTaskRow = document.createElement('div');
fifthTaskRow.classList.add('task-row');
taskSpace.appendChild(fifthTaskRow);


const compareTwoNumbers = (firstNumber, secondNumber) => {
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        return ("Values have to be number!");
    }

    const comparisonResult = (firstNumber > secondNumber) ? `The number ${firstNumber} is bigger.` : (firstNumber < secondNumber) ? `The number ${secondNumber} is bigger.` : `The numbers ${firstNumber} and ${secondNumber} are equal.`;
    return (comparisonResult);
};


//Button pro task 5 - porovnání čísel
const buttonTask5 = document.createElement('button');
buttonTask5.innerHTML = 'Task 5 (compare numbers)';
buttonTask5.setAttribute('id', 'task-5');
buttonTask5.addEventListener('click', () => {
    displayResult(compareTwoNumbers(firstInputTask5.valueAsNumber, secondInputTask5.valueAsNumber));
});
fifthTaskRow.appendChild(buttonTask5);

//První input pro task 5
const firstInputTask5 = document.createElement('input');
firstInputTask5.setAttribute('id', 'first-input-task5');
firstInputTask5.setAttribute('type', 'number');
firstInputTask5.setAttribute('placeholder', 'First number');
fifthTaskRow.appendChild(firstInputTask5);

//Druhý input pro task 5
const secondInputTask5 = document.createElement('input');
secondInputTask5.setAttribute('id', 'second-input-task5');
secondInputTask5.setAttribute('type', 'number');
secondInputTask5.setAttribute('placeholder', 'Second number');
fifthTaskRow.appendChild(secondInputTask5);




//Varianta pro zlomky - příprava layoutu pro prvky
//Asi bych volil kratší názvy prvků, ale takto je to alespoň exaktně pojmenované ... 
const fifthTaskRowFractions = document.createElement('div');
fifthTaskRowFractions.classList.add('task-row');
fifthTaskRowFractions.classList.add('multi-column-row');
taskSpace.appendChild(fifthTaskRowFractions);

const fifthTaskFractionsFirstColumn = document.createElement('div');
fifthTaskFractionsFirstColumn.classList.add('task-column');
fifthTaskRowFractions.appendChild(fifthTaskFractionsFirstColumn);

const fifthTaskFractionsSecondColumn = document.createElement('div');
fifthTaskFractionsSecondColumn.classList.add('task-column');
fifthTaskRowFractions.appendChild(fifthTaskFractionsSecondColumn);

const fifthTaskFractionsFirstInputRow = document.createElement('div');
fifthTaskFractionsFirstInputRow.classList.add('column-row');
fifthTaskFractionsSecondColumn.appendChild(fifthTaskFractionsFirstInputRow);

const fifthTaskFractionsSecondInputRow = document.createElement('div');
fifthTaskFractionsSecondInputRow.classList.add('column-row');
fifthTaskFractionsSecondColumn.appendChild(fifthTaskFractionsSecondInputRow);

const compareTwoFractions = (firstNumerator, secondNumerator, firstDenominator, secondDenominator) => {

    if (isNaN(firstNumerator) || isNaN(secondNumerator) || isNaN(firstDenominator) || isNaN(secondDenominator)) {
        return ("Values have to be number!");
    }
    else if (!firstDenominator || !secondDenominator) {
        return ('Denominators cannot be zero.');
    }
    const firstNumber = firstNumerator / firstDenominator;
    const secondNumber = secondNumerator / secondDenominator;

    const comparisonResult = (firstNumber > secondNumber) ? `The fraction ${firstNumerator}/${firstDenominator} is bigger.` : (firstNumber < secondNumber) ? `The fraction ${secondNumerator}/${secondDenominator} is bigger.` : `The fractions ${firstNumerator}/${firstDenominator} and ${secondNumerator}/${secondDenominator} are equal.`;
    return (comparisonResult);
};

//Button pro task 5 - porovnání čísel (zlomky)
const buttonTask5Fractions = document.createElement('button');
buttonTask5Fractions.innerHTML = 'Task 5B (compare numbers - fractions)';
buttonTask5Fractions.setAttribute('id', 'task-5B');
buttonTask5Fractions.addEventListener('click', () => {
    displayResult(compareTwoFractions(firstInputTask5Numerator.valueAsNumber, secondInputTask5Numerator.valueAsNumber, firstInputTask5Denominator.valueAsNumber, secondInputTask5Denominator.valueAsNumber));
});
fifthTaskFractionsFirstColumn.appendChild(buttonTask5Fractions);

//První input pro task 5 - jmenovatel 
const firstInputTask5Numerator = document.createElement('input');
firstInputTask5Numerator.setAttribute('id', 'first-input-task5-numerator');
firstInputTask5Numerator.setAttribute('type', 'number');
firstInputTask5Numerator.setAttribute('placeholder', 'First numerator');
fifthTaskFractionsFirstInputRow.appendChild(firstInputTask5Numerator);

//Druhý input pro task 5 - jmenovatel 
const secondInputTask5Numerator = document.createElement('input');
secondInputTask5Numerator.setAttribute('id', 'second-input-task5-numerator');
secondInputTask5Numerator.setAttribute('type', 'number');
secondInputTask5Numerator.setAttribute('placeholder', 'Second numerator');
fifthTaskFractionsFirstInputRow.appendChild(secondInputTask5Numerator);

//První input pro task 5 - čitatel
const firstInputTask5Denominator = document.createElement('input');
firstInputTask5Denominator.setAttribute('id', 'first-input-task5-denominator');
firstInputTask5Denominator.setAttribute('type', 'number');
firstInputTask5Denominator.setAttribute('placeholder', 'First denominator');
fifthTaskFractionsSecondInputRow.appendChild(firstInputTask5Denominator);

//Druhý input pro task 5 - čitatel 
const secondInputTask5Denominator = document.createElement('input');
secondInputTask5Denominator.setAttribute('id', 'second-input-task5-denominator');
secondInputTask5Denominator.setAttribute('type', 'number');
secondInputTask5Denominator.setAttribute('placeholder', 'Second denominator');
fifthTaskFractionsSecondInputRow.appendChild(secondInputTask5Denominator);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
const sixthTaskRow = document.createElement('div');
sixthTaskRow.classList.add('task-row');
taskSpace.appendChild(sixthTaskRow);


const multiplesOfThirteen = () => {
    const numbers = [];
    for (let i = 0; i <= 730; i += 13) {
        numbers.push(i);
    }
    return (numbers.toString());
};


//Button pro task 6 - násobky 13
const buttonTask6 = document.createElement('button');
buttonTask6.innerHTML = 'Task 6 (mutiples of 13)';
buttonTask6.setAttribute('id', 'task-6');
buttonTask6.addEventListener('click', () => {
    displayResult(multiplesOfThirteen());
});
sixthTaskRow.appendChild(buttonTask6);





/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const seventhTaskRow = document.createElement('div');
seventhTaskRow.classList.add('task-row');
taskSpace.appendChild(seventhTaskRow);


const getCircleArea = (radius) => {
    if (isNaN(radius) || radius <= 0) {
        return ('Radius has to be positive number.');
    }
    return (`The area of the circle is: ${(Math.PI * radius ** 2).toFixed(5)}.`);
};


const buttonTask7 = document.createElement('button');
buttonTask7.innerHTML = 'Task 7 (circle area)';
buttonTask7.setAttribute('id', 'task-7');
buttonTask7.addEventListener('click', () => {
    displayResult(getCircleArea(inputTask7.valueAsNumber));
});
seventhTaskRow.appendChild(buttonTask7);

const inputTask7 = document.createElement('input');
inputTask7.setAttribute('id', 'input-task7');
inputTask7.setAttribute('type', 'number');
inputTask7.setAttribute('placeholder', 'Radius');
seventhTaskRow.appendChild(inputTask7);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const eightTaskRow = document.createElement('div');
eightTaskRow.classList.add('task-row');
taskSpace.appendChild(eightTaskRow);


const getConeVolume = (height, radius) => {

    if (isNaN(radius) || radius <= 0 || isNaN(height) || height <= 0) {
        return ('Radius and height have to be positive numbers.');
    }

    return (`The volume of the cone is: ${(Math.PI * radius ** 2 * height / 3).toFixed(5)}.`);
};


const buttonTask8 = document.createElement('button');
buttonTask8.innerHTML = 'Task 8 (cone volume)';
buttonTask8.setAttribute('id', 'task-8');
buttonTask8.addEventListener('click', () => {
    displayResult(getConeVolume(inputTask8Height.valueAsNumber, inputTask8Radius.valueAsNumber));
});
eightTaskRow.appendChild(buttonTask8);

const inputTask8Height = document.createElement('input');
inputTask8Height.setAttribute('id', 'input-task8-height');
inputTask8Height.setAttribute('type', 'number');
inputTask8Height.setAttribute('placeholder', 'Height');
eightTaskRow.appendChild(inputTask8Height);

const inputTask8Radius = document.createElement('input');
inputTask8Radius.setAttribute('id', 'input-task8-radius');
inputTask8Radius.setAttribute('type', 'number');
inputTask8Radius.setAttribute('placeholder', 'Radius');
eightTaskRow.appendChild(inputTask8Radius);



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const ninthTaskRow = document.createElement('div');
ninthTaskRow.classList.add('task-row');
taskSpace.appendChild(ninthTaskRow);


const isTriangle = (a, b, c) => {
    if (isNaN(a) || a <= 0 || isNaN(b) || b <= 0 || isNaN(c) || c <= 0) {
        return ('All values have to be positive number.');
    }
    return (`You ${(a + b > c && a + c > b && b + c > a) ? 'can' : 'cannot'} construct a triangle with sides: ${a}, ${b} and ${c}.`);
};


const buttonTask9 = document.createElement('button');
buttonTask9.innerHTML = 'Task 9 (is triangle?)';
buttonTask9.setAttribute('id', 'task-9');
buttonTask9.addEventListener('click', () => {
    displayResult(isTriangle(inputTask9FirstNumber.valueAsNumber, inputTask9SecondNumber.valueAsNumber, inputTask9ThirdNumber.valueAsNumber));
});
ninthTaskRow.appendChild(buttonTask9);

const inputTask9FirstNumber = document.createElement('input');
inputTask9FirstNumber.setAttribute('id', 'first-input-task9');
inputTask9FirstNumber.setAttribute('type', 'number');
inputTask9FirstNumber.setAttribute('placeholder', 'First side');
ninthTaskRow.appendChild(inputTask9FirstNumber);

const inputTask9SecondNumber = document.createElement('input');
inputTask9SecondNumber.setAttribute('id', 'second-input-task9');
inputTask9SecondNumber.setAttribute('type', 'number');
inputTask9SecondNumber.setAttribute('placeholder', 'Second side');
ninthTaskRow.appendChild(inputTask9SecondNumber);

const inputTask9ThirdNumber = document.createElement('input');
inputTask9ThirdNumber.setAttribute('id', 'third-input-task9');
inputTask9ThirdNumber.setAttribute('type', 'number');
inputTask9ThirdNumber.setAttribute('placeholder', 'Third side');
ninthTaskRow.appendChild(inputTask9ThirdNumber);


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

const tenthTaskRow = document.createElement('div');
tenthTaskRow.classList.add('task-row');
taskSpace.appendChild(tenthTaskRow);


const getTriangleArea = (a, b, c) => {
    const isValid = isTriangle(a, b, c);  //Bylo by mnohem lepší, kdyby funkce vracela pouze boolean, ale vzhledem k tomu, jak jsem na začátku udělal výpis řešeno ošklivě regexem. Definitivně by se to takto dělat nemělo.
    if (!/can /.test(isValid)) {
        return (isValid);
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(5);
    return (`The area of triangle with sides: ${a}, ${b} and ${c} is ${area}.`);
};


const buttonTask10 = document.createElement('button');
buttonTask10.innerHTML = 'Task 10 (triangle area)';
buttonTask10.setAttribute('id', 'task-10');
buttonTask10.addEventListener('click', () => {
    displayResult(getTriangleArea(inputTask10FirstNumber.valueAsNumber, inputTask10SecondNumber.valueAsNumber, inputTask10ThirdNumber.valueAsNumber));
});
ninthTaskRow.appendChild(buttonTask10);

const inputTask10FirstNumber = document.createElement('input');
inputTask10FirstNumber.setAttribute('id', 'first-input-task10');
inputTask10FirstNumber.setAttribute('type', 'number');
inputTask10FirstNumber.setAttribute('placeholder', 'First side');
ninthTaskRow.appendChild(inputTask10FirstNumber);

const inputTask10SecondNumber = document.createElement('input');
inputTask10SecondNumber.setAttribute('id', 'second-input-task10');
inputTask10SecondNumber.setAttribute('type', 'number');
inputTask10SecondNumber.setAttribute('placeholder', 'Second side');
ninthTaskRow.appendChild(inputTask10SecondNumber);

const inputTask10ThirdNumber = document.createElement('input');
inputTask10ThirdNumber.setAttribute('id', 'third-input-task10');
inputTask10ThirdNumber.setAttribute('type', 'number');
inputTask10ThirdNumber.setAttribute('placeholder', 'Third side');
ninthTaskRow.appendChild(inputTask10ThirdNumber);