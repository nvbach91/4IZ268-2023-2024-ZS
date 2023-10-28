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

console.log('Hello world!, script loaded successfully.');


/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

let pepesDOB = new Date (1999,9,27);
const currentDate = new Date();

console.log('Pepe is currently ' + Math.floor((currentDate - pepesDOB) / (1000 * 60 * 60 * 24 * 365))  + ' years old!');



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const tempInCConsole = -17.77777777777778;
const tempInFConsole = 0;

console.log(tempInCConsole + ' degrees of Celsius work out to ' + ((tempInCConsole*9)/5+32) + ' degrees of Farenheit!');
console.log(tempInFConsole + ' degrees of Farenheit work out to' + ((tempInFConsole-32)*5/9) + ' degrees of Celsius');



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

// Create button for clearing output on demand
const taskArea = document.querySelector('#tasks');
const resultArea = document.querySelector('#results');

const divRowFirst = document.createElement('div');
divRowFirst.classList.add('task-row');
taskArea.appendChild(divRowFirst);

const clearResults = () => {
     resultArea.textContent = '';
}

const clearButton = document.createElement('button');
clearButton.innerText = 'clear output';
clearButton.setAttribute('id','auxBtnClr');
clearButton.addEventListener('click', () => {
   clearResults(); 
});

divRowFirst.appendChild(clearButton)

// implement hello function
const printHello = () => {
    console.log('Hello there!');
    resultArea.textContent = 'Hello there!';
}

const helloButton = document.createElement('button');
helloButton.innerText = 'Say hello!';
helloButton.setAttribute('id','task-0');
helloButton.addEventListener('click', () => {
   printHello(); 
});

const divRowSecond = document.createElement('div');
divRowSecond.classList.add('task-row');
taskArea.appendChild(divRowSecond);

divRowSecond.appendChild(helloButton)

// implement pepesAge function
const printPepesAge = () => {
    console.debug('Today is ' + currentDate);
    if (pepeDOBInput.value) {

        if (new Date(pepeDOBInput.value) > currentDate) {
            resultArea.textContent = 'Invalid input';
            console.debug('Input contains date which is yet to come!');
            return;
        }

        pepesDOB = new Date(pepeDOBInput.value);
        console.debug('Set new DOB for Pepe');
    } else {
        console.debug('Empty imput field, using default');
    }
    console.debug('Argument saved into variable is  ' + pepesDOB);
    console.debug('Value in the field is ' + pepeDOBInput.value );
    resultArea.textContent = 'Pepe is currently ' + Math.floor((currentDate - pepesDOB) / (1000 * 60 * 60 * 24 * 365))  + ' years old!';
}

const pepeButton = document.createElement('button');
pepeButton.innerText = 'Uloha 1 (Pepes age)';
pepeButton.setAttribute('id','task-1');
pepeButton.addEventListener('click', () => {
   printPepesAge(); 
});

const divRowThird = document.createElement('div');
divRowThird.classList.add('task-row');
taskArea.appendChild(divRowThird);

const pepeDOBInput = document.createElement('input');
pepeDOBInput.setAttribute('id','task-1-input');
pepeDOBInput.setAttribute('type','date');

divRowThird.appendChild(pepeButton);
divRowThird.appendChild(pepeDOBInput);

//implement tempConvert functions
const convertCtoF = (tempInC) => {

    if (isNaN(tempInC)) {
        resultArea.textContent = 'Please use numerical arguments';
        return;
    }

    resultArea.textContent = tempInC + ' degrees of Celsius work out to ' + ((tempInC*9)/5+32) + ' degrees of Farenheit!';
}

const convertFtoC = (tempInF) => {
    
    if (isNaN(tempInF)) {
        resultArea.textContent = 'Please use numerical arguments';
        return;
    }

    resultArea.textContent = tempInF + ' degrees of Farenheit work out to ' + ((tempInF-32)*5/9) + ' degrees of Celsius';
}

const divRowFourth = document.createElement('div');
divRowFourth.classList.add('task-row');
taskArea.appendChild(divRowFourth);

const convertCtoFButton = document.createElement('button');
convertCtoFButton.innerText = 'Uloha 2 (C => F)';
convertCtoFButton.setAttribute('id','task-2-C');
convertCtoFButton.addEventListener('click', () => {
   convertCtoF(tempInputC.valueAsNumber); 
});

const tempInputC = document.createElement('input');
tempInputC.setAttribute('id','task-2-C-input');
tempInputC.setAttribute('type','number');

divRowFourth.appendChild(convertCtoFButton);
divRowFourth.appendChild(tempInputC);

const divRowFifth = document.createElement('div');
divRowFifth.classList.add('task-row');
taskArea.appendChild(divRowFifth);

const convertFtoCButton = document.createElement('button');
convertFtoCButton.innerText = 'Uloha 2 (F => C)';
convertFtoCButton.setAttribute('id','task-2-F');
convertFtoCButton.addEventListener('click', () => {
   convertFtoC(tempInputF.valueAsNumber); 
});


const tempInputF = document.createElement('input');
tempInputF.setAttribute('id','task-2-F-input');
tempInputF.setAttribute('type','number');

divRowFifth.appendChild(convertFtoCButton);
divRowFifth.appendChild(tempInputF);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
const expressPercentage = (arg, divider) => {
    console.debug(arg);
    console.debug(typeof(arg));
    console.debug(divider);
    console.debug(typeof(divider));

    if (isNaN(divider) || isNaN(arg)) {
        resultArea.textContent = 'Please use numerical arguments';
        return;
    }

    if (divider <= 0 || arg <= 0) {
        resultArea.textContent = 'Please use non-negative arguments';
        return;
    }

    if (divider <= 0 || arg <= 0) {
        resultArea.textContent = 'Please use non-negative arguments';
        return;
    }

    const result = arg/divider;
    resultArea.textContent = arg + ' represents ratio ' + result.toFixed(2) + ' of ' + divider;


}

const divRowSixth = document.createElement('div');
divRowSixth.classList.add('task-row');
taskArea.appendChild(divRowSixth);

const expressPercentageButton = document.createElement('button');
expressPercentageButton.innerText = 'Uloha 4 (%CENSORED%)';
expressPercentageButton.setAttribute('id','task-3');
expressPercentageButton.addEventListener('click', () => {
   expressPercentage(expressPercentageArgInput.valueAsNumber,expressPercentageDividerInput.valueAsNumber);
});

divRowSixth.appendChild(expressPercentageButton);

const expressPercentageArgInput = document.createElement('input');
expressPercentageArgInput.setAttribute('id','task-3-arg-input');
expressPercentageArgInput.setAttribute('placeholder','Measured number');
expressPercentageArgInput.setAttribute('type','number');

const expressPercentageDividerInput = document.createElement('input');
expressPercentageDividerInput.setAttribute('id','task-3-div-input');
expressPercentageDividerInput.setAttribute('placeholder','Dividing number');
expressPercentageDividerInput.setAttribute('type','number');

divRowSixth.appendChild(expressPercentageArgInput);
divRowSixth.appendChild(expressPercentageDividerInput);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const compareArgs = (argA, argB) => {


    if (isNaN(argA) || isNaN(argB)) {
        resultArea.textContent = 'Please use numerical arguments';
        return;
    }


    if (argA > argB) {
        resultArea.textContent = argA + ' Is greater! ';
        return;
    } else if ( argB > argA) {
        resultArea.textContent = argB + ' Is greater! ';
        return;
    } else {
        resultArea.textContent = 'Numbers are equal';
        return;
    }



}

const divRowSeventh = document.createElement('div');
divRowSeventh.classList.add('task-row');
taskArea.appendChild(divRowSeventh);

const compareArgsButton = document.createElement('button');
compareArgsButton.innerText = 'Uloha 5 (Kdo z koho?)';
compareArgsButton.setAttribute('id','task-3');
compareArgsButton.addEventListener('click', () => {
   compareArgs(compareArgsAInput.valueAsNumber,compareArgsBInput.valueAsNumber);
});

divRowSeventh.appendChild(compareArgsButton);

const compareArgsAInput = document.createElement('input');
compareArgsAInput.setAttribute('id','task-5-arg-input');
compareArgsAInput.setAttribute('placeholder','Arg 1');
compareArgsAInput.setAttribute('type','number');

const compareArgsBInput = document.createElement('input');
compareArgsBInput.setAttribute('id','task-5-div-input');
compareArgsBInput.setAttribute('placeholder','Arg 2');
compareArgsBInput.setAttribute('type','number');

divRowSeventh.appendChild(compareArgsAInput);
divRowSeventh.appendChild(compareArgsBInput);




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const printThePattern = () => {
    let counter = 0;
    let output = 0;
    const pattern = [];

    while (output < 730) {
        pattern.push(output);
        counter++;
        output = counter * 13;
    }

    resultArea.textContent = pattern;
}

const divRowEighth = document.createElement('div');
divRowEighth.classList.add('task-row');
taskArea.appendChild(divRowEighth);

const getPatternButton = document.createElement('button');
getPatternButton.innerText = 'Uloha 6 (I can see)';
getPatternButton.setAttribute('id','task-6');
getPatternButton.addEventListener('click', () => {
   printThePattern();
});

divRowEighth.appendChild(getPatternButton);




/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const getCircleArea = (radius) => {
    if (isNaN(radius)) {
        resultArea.textContent = 'Please use numerical arguments';
        return;
    }

    if (radius <= 0) {
        resultArea.textContent = 'Please use non-negative arguments';
        return;
    }


    resultArea.textContent = 'Area of a circle for a given radius is: ' + (radius**2 * 3.14159);

}

const divRowNinth = document.createElement('div');
divRowNinth.classList.add('task-row');
taskArea.appendChild(divRowNinth);

const getCircleAreaButton = document.createElement('button');
getCircleAreaButton.innerText = 'Uloha 7 (Around and about)';
getCircleAreaButton.setAttribute('id','task-7');
getCircleAreaButton.addEventListener('click', () => {
   getCircleArea(radiusInput.valueAsNumber);
});

divRowNinth.appendChild(getCircleAreaButton);

const radiusInput = document.createElement('input');
radiusInput.setAttribute('id','task-7-input');
radiusInput.setAttribute('placeholder','Radius');
radiusInput.setAttribute('type','number');


divRowNinth.appendChild(radiusInput);






/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const getConeVolume = (radius,height) => {
    if (isNaN(radius) || isNaN(height)) {
        resultArea.textContent = 'Please use numerical arguments';
        return;
    }

    if (radius <= 0 || height <= 0) {
        resultArea.textContent = 'Please use non-negative arguments';
        return;
    }


    resultArea.textContent = 'Volume of a cone for a given radius and height is: ' + ((1/3)*radius**2 * 3.14159* height);

}

const divRowTenth = document.createElement('div');
divRowTenth.classList.add('task-row');
taskArea.appendChild(divRowTenth);

const getConeVolumeButton = document.createElement('button');
getConeVolumeButton.innerText = 'Uloha 8 (Another dimension)';
getConeVolumeButton.setAttribute('id','task-8');
getConeVolumeButton.addEventListener('click', () => {
   getConeVolume(radiusInputCone.valueAsNumber, heightInputCone.valueAsNumber);
});

divRowTenth.appendChild(getConeVolumeButton);

const radiusInputCone = document.createElement('input');
radiusInputCone.setAttribute('id','task-8-radius-input');
radiusInputCone.setAttribute('placeholder','Radius');
radiusInputCone.setAttribute('type','number');


divRowTenth.appendChild(radiusInputCone);

const heightInputCone = document.createElement('input');
heightInputCone.setAttribute('id','task-8-height-input');
heightInputCone.setAttribute('placeholder','height');
heightInputCone.setAttribute('type','number');


divRowTenth.appendChild(heightInputCone);


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const checkTriangleInequality = (a,b,c) => {
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        resultArea.textContent = 'Please use numerical arguments';
        return false;
    }

    if (a <= 0 || b <= 0 || c <= 0) {
        resultArea.textContent = 'Please use non-negative arguments';
        return false;
    }

    if (a + b > c && b + c > a && c + a > b) {
        resultArea.textContent = 'Triangle is valid for sides ' +' '+  a + ' ' + b  +' '+ c+'!';
        return true; 
    } else {
        resultArea.textContent = 'Triangle is NOT valid for sides ' +' '+  a + ' ' + b  +' '+ c+'!';
        return false; 
    }

}

const divRowEleventh = document.createElement('div');
divRowEleventh.classList.add('task-row');
taskArea.appendChild(divRowEleventh);

const checkTriangleInequalityButton = document.createElement('button');
checkTriangleInequalityButton.innerText = 'Uloha 9 (Is triangle?)';
checkTriangleInequalityButton.setAttribute('id','task-9');
checkTriangleInequalityButton.addEventListener('click', () => {
   checkTriangleInequality(triangleInputA.valueAsNumber, triangleInputB.valueAsNumber, triangleInputC.valueAsNumber);
});

divRowEleventh.appendChild(checkTriangleInequalityButton);

const triangleInputA = document.createElement('input');
triangleInputA.setAttribute('id','task-9-sideA-input');
triangleInputA.setAttribute('placeholder','side A');
triangleInputA.setAttribute('type','number');


divRowEleventh.appendChild(triangleInputA);

const triangleInputB = document.createElement('input');
triangleInputB.setAttribute('id','task-9-sideB-input');
triangleInputB.setAttribute('placeholder','side B');
triangleInputB.setAttribute('type','number');


divRowEleventh.appendChild(triangleInputB);

const triangleInputC = document.createElement('input');
triangleInputC.setAttribute('id','task-9-sideC-input');
triangleInputC.setAttribute('placeholder','side C');
triangleInputC.setAttribute('type','number');


divRowEleventh.appendChild(triangleInputC);





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

    if (checkTriangleInequality(a,b,c)) {
        const semiperimetr = (a + b + c) / 2;
        const area = Math.sqrt(semiperimetr * (semiperimetr - a) * (semiperimetr - b) * (semiperimetr - c));

        resultArea.textContent = 'Triangle has area of ' + area;
        return;
    } else {
        resultArea.textContent = 'Triangle is NOT valid for sides ' +' '+  a + ' ' + b  +' '+ c+'!';
        return; 
    }

}

const divRowTwelfth = document.createElement('div');
divRowTwelfth.classList.add('task-row');
taskArea.appendChild(divRowTwelfth);

const calculateTriangleAreaButton = document.createElement('button');
calculateTriangleAreaButton.innerText = 'Uloha 10 (Triangle area)';
calculateTriangleAreaButton.setAttribute('id','task-10');
calculateTriangleAreaButton.addEventListener('click', () => {
   calculateTriangleArea(triangleAreaInputA.valueAsNumber, triangleAreaInputB.valueAsNumber, triangleAreaInputC.valueAsNumber);
});

divRowTwelfth.appendChild(calculateTriangleAreaButton);

const triangleAreaInputA = document.createElement('input');
triangleAreaInputA.setAttribute('id','task-10-sideAarea-input');
triangleAreaInputA.setAttribute('placeholder','side A');
triangleAreaInputA.setAttribute('type','number');


divRowTwelfth.appendChild(triangleAreaInputA);

const triangleAreaInputB = document.createElement('input');
triangleAreaInputB.setAttribute('id','task-10-sideBarea-input');
triangleAreaInputB.setAttribute('placeholder','side B');
triangleAreaInputB.setAttribute('type','number');


divRowTwelfth.appendChild(triangleAreaInputB);

const triangleAreaInputC = document.createElement('input');
triangleAreaInputC.setAttribute('id','task-10-sideCarea-input');
triangleAreaInputC.setAttribute('placeholder','side C');
triangleAreaInputC.setAttribute('type','number');


divRowTwelfth.appendChild(triangleAreaInputC);