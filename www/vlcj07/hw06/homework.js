/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

let birthYear = 1973;
let currentYear = new Date().getFullYear();
let age = currentYear - birthYear;

console.log("My name is Pepa and I am " + age + " years old.");


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

let tempCelsius = 20;
let tempFahrenheit = 68;

const celsiusToFahrenheit = (tempCelsius) => ((tempCelsius * 9 / 5) + 32);
const fahrenheitToCelsius = (tempFahrenheit) => ((tempFahrenheit - 32) * 5 / 9)

console.log(tempCelsius + '°C' + ' = ' + celsiusToFahrenheit(tempCelsius) + '°F');
console.log(tempFahrenheit + '°F' + ' = ' + fahrenheitToCelsius(tempFahrenheit) + '°C')

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


const getPepeAge = () => {
    console.log("My name is Pepa and I am " + age + " years old.");
}
const buttonTaskOne = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskOne.setAttribute('id', 'task-1');
buttonTaskOne.innerText = `Get Pepe's age`;
buttonTaskOne.addEventListener('click', () => { getPepeAge() });


const buttonTaskTwo = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskTwo.setAttribute('id', 'task-2');
buttonTaskTwo.innerText = `Convert temperature`;

const convertTemp = (value) => {
    console.log(value + '°C' + ' = ' + celsiusToFahrenheit(value) + '°F');
    console.log(value + '°F' + ' = ' + fahrenheitToCelsius(value) + '°C')
}

buttonTaskTwo.addEventListener('click', () => { convertTemp(20) });



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here



const buttonTaskFour = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskFour.setAttribute('id', 'task-4');
buttonTaskFour.innerText = `calculate`;

const calculate = (num1, num2) => {
    document.getElementById('results').textContent = (num2 !== 0) ? ((num1 / num2) * 100).toFixed(2) + "%" : "NaN";
}

buttonTaskFour.addEventListener('click', () => { calculate(50, 0) })


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const buttonTaskFive1 = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskFive1.setAttribute('id', 'task-5-1');
buttonTaskFive1.innerText = `compare1`;

const buttonTaskFive2 = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskFive2.setAttribute('id', 'task-5-2');
buttonTaskFive2.innerText = `compare2`;

const buttonTaskFive3 = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskFive3.setAttribute('id', 'task-5-3');
buttonTaskFive3.innerText = `compare3`;

const compare = (num1, num2) => {
    if (num1 < num2) {
        result = num1 + " < " + num2
    } else if (num1 > num2) {
        result = num1 + " > " + num2
    } else if (num1 = num2) {
        result = num1 + " = " + num2
    }

    document.getElementById('results').textContent = result;
}

buttonTaskFive1.addEventListener('click', () => compare(1, 3))
buttonTaskFive2.addEventListener('click', () => compare(10, 3))
buttonTaskFive3.addEventListener('click', () => compare(3, 3))


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const buttonTaskSix = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskSix.setAttribute('id', 'task-6');
buttonTaskSix.innerText = `task 6`;

const taskSix = () => {
    let arr = [];
    for (let i = 0; i <= 730; i += 13) {
        arr.push(i)
    }
    document.getElementById('results').textContent = arr;
}

buttonTaskSix.addEventListener('click', taskSix);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here



const buttonTaskSeven = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskSeven.setAttribute('id', 'task-7');
buttonTaskSeven.innerText = `get area`;

const getArea = (r) => document.getElementById('results').textContent = Math.PI * r * r;


buttonTaskSeven.addEventListener('click', () => getArea(2))



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const getConeVolume = (h, r) => document.getElementById('results').textContent = 1 / 3 * Math.PI * r * r * h;

const buttonTaskEight = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskEight.setAttribute('id', 'task-8');
buttonTaskEight.innerText = `get volume of cone`;
buttonTaskEight.addEventListener('click', () => getConeVolume(5, 2))



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
    if (a <= 0 || b <= 0 || c <= 0) {
        result = 'no';
    }
    else if ((a + b) > c && (a + c) > b && (b + c) > a) {
        result = 'yes';
    } else {
        result = 'no';
    }
    document.getElementById('results').textContent = result;
}

const buttonTaskNine = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskNine.setAttribute('id', 'task-9');
buttonTaskNine.innerText = `is it a triangle?`;
buttonTaskNine.addEventListener('click', () => isTriangle(3, 5, 7))



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

const calculateTriangle = (a, b, c) => {
    if (a <= 0 || b <= 0 || c <= 0) {
        result = 'Not possible';
    }
    else if ((a + b) > c && (a + c) > b && (b + c) > a) {
        s = (a + b + c) / 2
        result = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    } else {
        result = 'Not Possible';
    }
    document.getElementById('results').textContent = result;
}

const buttonTaskTen = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskTen.setAttribute('id', 'task-10');
buttonTaskTen.innerText = `calculate area of triangle`;
buttonTaskTen.addEventListener('click', () => calculateTriangle(3, 5, 7))