/* HOMEWORK */
/**
 * 0) Pre-preparacion.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!" 
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou "tasks" - <div id="tasks"></div>). 
 * - Na stránce vytvořte místo pro výpis výsledků úkolů (div, který má id s hodnotou "result" - <div id="results"></div>).
 * 
 * - Připojte tento homework.js soubor k vytvořené HTML stránce pomocí tagu <script> (viz LAB) a vyzkoušejte
 * console.log('Ahoj světe');
 * 
 * 
 * DONE
 */


/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here
const pepesBirthYear = 2000;
const thisYear = new Date().getFullYear();

//console.log(`Pepa ma ${thisYear - pepesBirthYear} let`);



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const celsiusValue = 18;
const fahrenheihtValue = 70;

const convertedCelsiusToFahrenheiht = celsiusValue * 9 / 5 + 32;
const convertedFahrenheihtToCelsius = (fahrenheihtValue - 32) * 5 / 9;

//console.log(`${celsiusValue} stupnu Celsia je ${convertedCelsiusToFahrenheiht} stupnu Fahrenheihta`);
//console.log(`${fahrenheihtValue} stupnu Fahrenheihta je ${convertedFahrenheihtToCelsius} stupnu Celsia`);





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





// Create a button for Pepe's age
const buttonPepeAge = document.createElement('button');
buttonPepeAge.innerText = 'Pepe\'s Age';
buttonPepeAge.setAttribute('id', 'task-1');
buttonPepeAge.addEventListener('click', () => {
    console.log(`Pepe is ${getAge(pepesBirthYear)} years old.`);
});
const tasks = document.querySelector('#tasks');
tasks.appendChild(buttonPepeAge);

// Create a button for converting Celsius to Fahrenheit
const buttonCelsiusToFahrenheit = document.createElement('button');
buttonCelsiusToFahrenheit.innerText = 'Celsius to Fahrenheit';
buttonCelsiusToFahrenheit.setAttribute('id', 'task-2');
buttonCelsiusToFahrenheit.addEventListener('click', () => {
    console.log(`${celsiusValue} degrees Celsius is ${convertCelsiusToFahrenheit(celsiusValue)} degrees Fahrenheit.`);
});
tasks.appendChild(buttonCelsiusToFahrenheit);


// Create a button for converting Fahrenheit to Celsius 
const buttonFahrenheitToCelsius = document.createElement('button');
buttonFahrenheitToCelsius.innerText = 'Fahrenheit to Celsius';
buttonFahrenheitToCelsius.setAttribute('id', 'task-3');
buttonFahrenheitToCelsius.addEventListener('click', () => {
    console.log(`${fahrenheihtValue} degrees Fahrenheit is ${convertFahrenheitToCelsius(fahrenheihtValue)} degrees Celsius.`);
});
tasks.appendChild(buttonCelsiusToFahrenheit);



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const a = 11;
const b = 22;

const getRatio = (a, b) => {
    if (b === 0) {
        return 'Cannot be divided by zero';
    }
    return `The ratio of number ${a} to number ${b} is ${(a / b * 100).toFixed(2)}%`;
};

const result = getRatio(a, b);
//console.log(result);


// Create a button for comparing numbers
const buttonRatio = document.createElement('button');
buttonRatio.innerText = 'The ratio %';
buttonRatio.setAttribute('id', 'task-4');
buttonRatio.addEventListener('click', () => {
    const result = getRatio(a, b);
    console.log(result);

});
tasks.appendChild(buttonRatio);



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
        return 'Bigger number is: ' + b;
    }
    if (a > b) {
        return 'Bigger number is: ' + a;
    }
    return 'Numbers are equal';
};

const result1 = compare(10, 10);
const result2 = compare(10, 12);
const result3 = compare(100, 12);

/*
console.log(result1);
console.log(result2);
console.log(result3);
*/

const x = 13;
const y = 11;



// Create a button for comparing numbers
const buttonCompareNumbers = document.createElement('button');
buttonCompareNumbers.innerText = 'Compare Numbers';
buttonCompareNumbers.setAttribute('id', 'task-5');
buttonCompareNumbers.addEventListener('click', () => {
    const result = compare(x, y);
    displayResult(result); 

});
tasks.appendChild(buttonCompareNumbers);


function displayResult(result) {
    const resultsDiv = document.querySelector('#results');
    const resultParagraph = document.createElement('p');
    resultParagraph.innerText = result;
    resultsDiv.appendChild(resultParagraph);
}

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */

function allThe13() {
    for (let i = 0; i < 730; i += 13) {
        console.log(i);
    }
}

const buttonLogNumbers = document.createElement('button');
buttonLogNumbers.innerText = '13 in Pattern';
buttonLogNumbers.setAttribute('id', 'task-6');
buttonLogNumbers.addEventListener('click', () => {
    allThe13(); // Call the function to log numbers
});

tasks.appendChild(buttonLogNumbers);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const getCircleArea = (radius) => {
    const area = Math.PI * radius ** 2;
    console.log(`Kruznice s polomerem ${radius} ma obsah ${area}`);
};

const radius = 5; // Radius of the circle

const buttonCalculateCircleArea = document.createElement('button');
buttonCalculateCircleArea.innerText = 'Calculate Circle Area';
buttonCalculateCircleArea.setAttribute('id', 'task-7');
buttonCalculateCircleArea.addEventListener('click', () => {
    getCircleArea(radius);
});

tasks.appendChild(buttonCalculateCircleArea);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const getConeVolume = (height, radius) => {
    const volume = Math.PI * radius ** 2 * height / 3;
    console.log(`Kuzel s vyskou ${height} a polomerem ${radius} ma objem ${volume}`);
};

const height = 10; // Replace with the desired height of the cone
const radiusKuzel = 5; // Replace with the desired radius of the cone

const buttonCalculateConeVolume = document.createElement('button');
buttonCalculateConeVolume.innerText = 'Calculate Cone Volume';
buttonCalculateConeVolume.setAttribute('id', 'task-8');
buttonCalculateConeVolume.addEventListener('click', () => {
    getConeVolume(height, radius); // Call the function to calculate and display the volume
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


//returns true or false for task 10
const checkIfTriangleIsBuildable = (a, b, c) => {
    return (a + b > c && a + c > b && b + c > a);
};


//return a full sentence for the console log
const checkIfTriangleIsBuildableLOG = (a, b, c) => {
    const canBuildTriangle = (a + b > c && a + c > b && b + c > a);
    console.log(`Can you build a triangle with sides of length ${side1}, ${side2}, and ${side3}? ${canBuildTriangle}`);

};

const side1 = 3; // Replace with the length of the first side
const side2 = 4; // Replace with the length of the second side
const side3 = 5; // Replace with the length of the third side

const buttonCheckTriangleBuildability = document.createElement('button');
buttonCheckTriangleBuildability.innerText = 'Check Triangle Buildability';
buttonCheckTriangleBuildability.setAttribute('id', 'task-9');
buttonCheckTriangleBuildability.addEventListener('click', () => {
    checkIfTriangleIsBuildableLOG(side1, side2, side3); // Call the function to check if a triangle can be built
});

tasks.appendChild(buttonCheckTriangleBuildability);




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
// Solution here

const getTriangleArea = (a, b, c) => {
    if (!checkIfTriangleIsBuildable(a, b, c)) {
        return `The triangle is not possible`;
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return `The area of the triangle with sides of length ${a}, ${b}, and ${c} is ${area}`;
};

side4 = 1; //for cheking

// Create a button for comparing numbers
const buttonTriangleArea = document.createElement('button');
buttonTriangleArea.innerText = 'Triangle area';
buttonTriangleArea.setAttribute('id', 'task-10');
buttonTriangleArea.addEventListener('click', () => {
    const result = getTriangleArea(side1, side2, side3);
    displayResult(result); 

});
tasks.appendChild(buttonTriangleArea);

