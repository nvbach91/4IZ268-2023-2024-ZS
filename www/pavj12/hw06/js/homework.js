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

let birthYear = 2000;
const currentYear = new Date().getFullYear();

let age = currentYear - birthYear;

console.log("Pepe is " + age + " years old.");

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

let C  = 40;
let F = 122;
let FCalculated;
let CCalculated;


FCalculated = (C) => ((C*(9/5))+32).toFixed(1);
CCalculated = (F) => ((F-32)*5/9).toFixed(1);

console.log(C + '°C' + ' = ' + FCalculated(C) + '°F');
console.log(F + '°F' + ' = ' + CCalculated(F) + '°C');



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

const tasks = document.querySelector('#tasks')


//Task zero
function getHelloWorld() {
    console.log('Ahoj světe');
}

const buttonTaskZero = document.createElement('button');
buttonTaskZero.setAttribute('id', 'task-0');
buttonTaskZero.innerText = 'Say Hello World';
buttonTaskZero.addEventListener('click', () => { getHelloWorld() });


tasks.appendChild(buttonTaskZero);

//Task one
function getPepesAge() {
    console.log("Pepe is " + age + " years old.");
}

const buttonTaskOne = document.createElement('button');
buttonTaskOne.setAttribute('id', 'task-1');
buttonTaskOne.innerText = "Pepe's age";
buttonTaskOne.addEventListener('click', () => { getPepesAge() });

tasks.appendChild(buttonTaskOne);

//Task two

function getTempCalc (value) {
    console.log(value + '°C' + ' = ' + FCalculated(value) + '°F');
    console.log(value + '°F' + ' = ' + CCalculated(value) + '°C');
}

const buttonTaskTwo = document.createElement('button');
buttonTaskTwo.setAttribute('id', 'task-2');
buttonTaskTwo.innerText = "WTF";
buttonTaskTwo.addEventListener('click', () => { getTempCalc(80) });

tasks.appendChild(buttonTaskTwo);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */

function getcalc (a,b) {
    if (b === 0) {
    return "You can't divide zero";
}
return `${a} from number ${b} is ${(a / b * 100).toFixed(2)}%`;
};

const buttonTaskFour = document.createElement('button');
buttonTaskFour.setAttribute('id','task-04');
buttonTaskFour.innerText = "%CENSORED%";

const vysledek = document.createElement('p');
vysledek.setAttribute('id', 'task-04-vysledek');

buttonTaskFour.addEventListener('click', () => {
    const result = getcalc(50,180)
    document.getElementById('task-04-vysledek').textContent = result;
    
});

tasks.appendChild(buttonTaskFour);
tasks.appendChild(vysledek);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */

function getCompare(a,b){
    if (a>b) {
        result = `Number ${a} is greater than ${b}`;
    }
    if (a<b) {
        result = `Number ${b} is greater than ${a}`;
    }
    if (a==b){
        result = `Number ${a} is as large as ${b}`;
    }
    document.getElementById('results').textContent = result;
};


const buttonTaskFive01 = document.createElement('button');
buttonTaskFive01.setAttribute('id', 'task-5-1');
buttonTaskFive01.innerText = `Kdo z koho (28,36)`;

const buttonTaskFive02 = document.createElement('button');
buttonTaskFive02.setAttribute('id', 'task-5-2');
buttonTaskFive02.innerText = `Kdo z koho (180,180)`;

const buttonTaskFive03 = document.createElement('button');
buttonTaskFive03.setAttribute('id', 'task-5-3');
buttonTaskFive03.innerText = `Kdo z koho (45,44)`;


buttonTaskFive01.addEventListener('click', () => getCompare(28,36));
buttonTaskFive02.addEventListener('click', () => getCompare(180,180));
buttonTaskFive03.addEventListener('click', () => getCompare(45,44));

tasks.appendChild(buttonTaskFive01);
tasks.appendChild(buttonTaskFive02);
tasks.appendChild(buttonTaskFive03);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */

function getNasobky(){
    let arr = [];
    for (let i=0; i<=730;i += 13) {
        arr.push(i);
    }
    document.getElementById('results').textContent = arr;
}

const buttonTaskSix = document.createElement('button');
buttonTaskSix.setAttribute('id', 'task-6');
buttonTaskSix.innerText = `I can cleary see the pattern`;
buttonTaskSix.addEventListener('click', getNasobky);

tasks.appendChild(buttonTaskSix);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */


function getFindArea(r){
     document.getElementById('results').textContent = Math.PI * r * r ;
}

const buttonTaskSeven = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskSeven.setAttribute('id', 'task-7');
buttonTaskSeven.innerText = `Around and about`;
buttonTaskSeven.addEventListener('click', () => getFindArea(4));

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

function getConeVolume(height,radius){
    document.getElementById('results').textContent = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
}

const buttonTaskEight = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskEight.setAttribute('id', 'task-8');
buttonTaskEight.innerText = `Another dimension`;
buttonTaskEight.addEventListener('click', () => getFindArea(8,3));


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */

function getTriangle(a,b,c){
    if ((a + b) > c && (a + c) > b && (b + c) > a) {
        result = 'true';
    } else {
        result = 'false';
    }
    document.getElementById('results').textContent = result;
}


const buttonTaskNine = document.getElementById('tasks').appendChild(document.createElement('button'));
buttonTaskNine.setAttribute('id', 'task-9');
buttonTaskNine.innerText = `Not sure if triangle`;
buttonTaskNine.addEventListener('click', () => getTriangle(7,9,15));


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


function getTriangleArea(a,b,c){
    const results = document.querySelector('#results');
    if (getTriangle(a, b, c)) {
        const s = (a + b + c) / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2);
        results.innerHTML = `Area of a triangle of walls ${a}, ${b}, ${c} is ${area}`;
    } 
    else  results.innerHTML = `Not Possible`;
}
const buttonTaskTen = document.createElement('button');
buttonTaskTen.setAttribute('id', 'task-10');
buttonTaskTen.innerText = `Heroic performance`;
buttonTaskTen.addEventListener('click', () => getTriangleArea(8,9,10));

tasks.appendChild(buttonTaskTen);
