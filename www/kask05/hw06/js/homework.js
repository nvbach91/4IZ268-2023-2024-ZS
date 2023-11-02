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


/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const task1Button = document.getElementById("task1Button");
const task1Result = document.querySelector(".task1 #result");


function getAge(birthYear) {
    const age = new Date().getFullYear() - birthYear;
    return age;
}
task1Button.addEventListener("click", function() {
    const pepeBirthYear = parseInt(document.getElementById("birthYear").value); 
    const pepesAge = getAge(pepeBirthYear);
    const sentence = `Pepe is ${pepesAge} years old.`;
    console.log(sentence); // Výpis na konzoli
    task1Result.textContent = sentence; // Zobrazení na stránce
  })




  
/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const celsiusInput = document.getElementById("celsiusInput");
const celsiusOutput = document.getElementById("celsiusOutput");
const fahrenheitOutput = document.getElementById("fahrenheitOutput");
const fahrenheitInput = document.getElementById("fahrenheitInput");
const task2ButtonFahrenheit = document.getElementById("task2ButtonFahrenheit");
const task2ButtonCelsius = document.getElementById("task2ButtonCelsius");



function convertCelsiusToFahrenheit(celsiusTemperature) {
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32
    return fahrenheitTemperature;
}
function convertFahrenheitToCelsius(fahrenheitTemperature){
    let celsiusTemperature = ((fahrenheitTemperature - 32)* 5) / 9;
    return celsiusTemperature;
}

task2ButtonFahrenheit.addEventListener("click", function() {
    const celsius = parseFloat(celsiusInput.value);
    const fahrenheit = convertCelsiusToFahrenheit(celsius);
    const sentence = `${celsius}°C = ${fahrenheit}°F`;
    console.log(sentence); // Výpis na konzoli
    fahrenheitOutput.textContent = sentence; // Zobrazení na stránce
});

task2ButtonCelsius.addEventListener("click", function() {
    const fahrenheit = parseFloat(fahrenheitInput.value);
    const celsius = convertFahrenheitToCelsius(fahrenheit);
    const sentence = `${fahrenheit}°F = ${celsius}°C`;
    console.log(sentence); // Výpis na konzoli
    celsiusOutput.textContent = sentence; // Zobrazení na stránce
});





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





// tlačítka už jsem dala do task 1 a task 2, nechapu tedy co mam udelat tady jineho?





/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const number1Div = document.querySelector(".task4 #number1");
const number2Div = document.querySelector(".task4 #number2");
const resultDiv = document.querySelector(".task4 #result");

function divideNumbers() {
    let num1 = Number(number1Div.value);
    let num2 = Number(number2Div.value);
    if (num2 === 0) {
        resultDiv.innerHTML = "Nelze dělit nulou.";
    } else {
        let result = (num1 / num2 * 100).toFixed(2);
        resultDiv.innerHTML = `${num1} je ${result}% z ${num2}.`;
        };
}

const numberButtonDiv = document.querySelector(".task4 #numberButton");
numberButtonDiv.addEventListener("click", divideNumbers);







/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const number1Com = document.querySelector(".task5 #number1");
const number2Com = document.querySelector(".task5 #number2");
const resultCom = document.querySelector(".task5 #result");

function compareNumbers() {
    let num1 = Number(number1Com.value);
    let num2 = Number(number2Com.value);
    if (num2 > num1) {
        resultCom.innerHTML = `${num2} je vetší než ${num1}.`;
    } else if (num1 > num2) {
        resultCom.innerHTML = `${num1} je vetší než ${num2}.`;
    } else {
        resultCom.innerHTML = `Čísla se rovnají.`;
        };
}

const numberButtonCom = document.querySelector(".task5 #numberButton");
numberButtonCom.addEventListener("click", compareNumbers);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const multiplesButton = document.querySelector(".task6 #multiplesButton");
const resultMultiples = document.querySelector(".task6 #result");

multiplesButton.addEventListener("click", function () {
    resultMultiples.textContent = "";
    for (let i = 0; i <= 730; i+= 13) {
        resultMultiples.textContent += i + ", ";
    }
}
);




/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const areaButton = document.querySelector(".task7 #areaButton");
const resultArea = document.querySelector(".task7 #result");

areaButton.addEventListener("click", function () {
const radiusInput = document.querySelector(".task7 #radiusInput");
    if(radiusInput.value <= 0){
        resultArea.innerHTML = "Vložená neplatná hodnota.";
    }else{
        const pi = Math.PI;
        let r = parseInt(radiusInput.value);
        let areaCircle = pi * r * r;
        resultArea.innerHTML = `Obsah kružnice je ${areaCircle}.`;
        }
});



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const volumeButton = document.querySelector(".task8 #volumeButton");
const resultVolume = document.querySelector(".task8 #result");

volumeButton.addEventListener("click", function () {
const radiusInput = document.querySelector(".task8 #radiusInput");
const heightInput = document.querySelector(".task8 #heightInput");
    if(radiusInput.value <= 0){
        resultVolume.innerHTML = "Vložená neplatná hodnota.";
    } else if (heightInput.value <= 0){
        resultVolume.innerHTML = "Vložená neplatná hodnota.";
    }else{
        const pi = Math.PI;
        let r = parseInt(radiusInput.value);
        let v = parseInt(heightInput.value);
        let volumeCone = 1/3 *pi * r * r * v;
        resultVolume.innerHTML = `Objem kužele je ${volumeCone}.`;
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
// Solution here

const triangleButton = document.querySelector(".task9 #triangleButton");
const resultTriangle = document.querySelector(".task9 #result");

triangleButton.addEventListener("click", function () {
const A = parseFloat(document.querySelector(".task9 #sideA").value);
const B = parseFloat(document.querySelector(".task9 #sideB").value);
const C = parseFloat(document.querySelector(".task9 #sideC").value);
    if(A + B > C && B + C > A && A + C > B){
        resultTriangle.innerHTML = "Jedná se o trojúhelník.";
    } else{
        resultTriangle.innerHTML = "Nejedná se o trojúhelník.";
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
const resultHeron = document.querySelector(".task10 #result");

function heronFunction(A, B, C){
    if (A + B > C && B + C > A && A + C > B) {
        const s = (A + B + C) / 2
        const area = Math.sqrt(s * (s - A) * (s - B) * (s - C))
        resultHeron.innerHTML = `Obsah trojúhelníku je ${area}.`;
    } else {
        resultHeron.innerHTML = "Nejedná se o trojúhelník.";
    }};

const heronButton = document.querySelector(".task10 #heronButton");

heronButton.addEventListener("click", function () {
    const A = parseFloat(document.querySelector(".task10 #sideA").value);
    const B = parseFloat(document.querySelector(".task10 #sideB").value);
    const C = parseFloat(document.querySelector(".task10 #sideC").value);

    heronFunction(A, B, C);
});