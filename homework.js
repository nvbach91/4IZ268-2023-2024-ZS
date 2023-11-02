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

const pepesAge = 1603;
const thisYear = new Date().getFullYear();

console.log(`Pepovi je ${thisYear - pepesAge}`);


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const celsiusInput = 30;
const fahrenheihtInput = 70;

const celsiusToFahrenheiht = celsiusInput * 9 / 5 + 32;
const fahrenheihtToCelsius = (fahrenheihtInput - 32) * 5 / 9;


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
const tasks = document.getElementById('tasks');
const results = document.getElementById('results');


const getAge = (birthYear) => {
    return new Date().getFullYear() - birthYear;
};

const buttonGetAge = document.createElement('button');
buttonGetAge.innerText = 'Zjistit';
buttonGetAge.setAttribute('id', 'task-31');
buttonGetAge.addEventListener('click', () => {
    const text31 = document.createElement('p');
    text31.innerText = getAge(pepesAge);
    results.appendChild(text31);
});

tasks.appendChild(buttonGetAge);

const convertCelsiusToFahrenheit = (celsiusInput) => {
    return celsiusInput * 9 / 5 + 32;
};
const convertFahrenheitToCelsius = (fahrenheihtInput) => {
    return (fahrenheihtInput - 32) * 5 / 9;
};

const buttonToCelsius = document.createElement('button');
buttonToCelsius.innerText = fahrenheihtInput + ' to Celsius';
buttonToCelsius.setAttribute('id', 'task-32');
buttonToCelsius.addEventListener('click', () => {
    const text32 = document.createElement('p');
    text32.innerText = convertFahrenheitToCelsius(celsiusInput);
    results.appendChild(text32);
});

tasks.appendChild(buttonToCelsius);

const buttonToFahreheit = document.createElement('button');
buttonToFahreheit.innerText = celsiusInput + ' to Fahrenheit';
buttonToFahreheit.setAttribute('id', 'task-33');
buttonToFahreheit.addEventListener('click', () => {
    const text33 = document.createElement('p');
    text33.innerText = convertCelsiusToFahrenheit(fahrenheihtInput);
    results.appendChild(text33);
});

tasks.appendChild(buttonToFahreheit);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const getPercentage = (a, b) => {
    if (b == 0) {
        return 'Nelze dělit nulou';
    }
    else{
        return (a / b * 100).toFixed(2)+' %'
    }
};

const buttonPerc_a = document.createElement('input');
const buttonPerc_b = document.createElement('input');
const buttonGetPercentage = document.createElement('button');
buttonPerc_a.placeholder="First input for percentage";
buttonPerc_b.placeholder="Second input for percentage";
buttonGetPercentage.innerText = 'Get Percentage';
buttonGetPercentage.setAttribute('id', 'task-4');
buttonGetPercentage.addEventListener('click', () => {
    const text4 = document.createElement('p');
    text4.innerText = getPercentage(buttonPerc_a.value, buttonPerc_b.value);
    results.appendChild(text4);
});

tasks.appendChild(buttonPerc_a);
tasks.appendChild(buttonPerc_b);
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

const compare = (a, b) => {
    if (a < b) {
        return b;
    }
    if (a > b) {
        return a;
    }
    return 'Čísla se rovnají.';
};

const result1 = compare(1124, 947);

const buttonCompare1 = document.createElement('button');
buttonCompare1.innerText = 'Compare 1124 and 947';
buttonCompare1.setAttribute('id', 'task-51');
buttonCompare1.addEventListener('click', () => {
    const text51 = document.createElement('p');
    text51.innerText = compare(1124, 947);
    results.appendChild(text51);
});
tasks.appendChild(buttonCompare1);

const buttonCompare2 = document.createElement('button');
buttonCompare2.innerText = 'Compare 420 and 420';
buttonCompare2.setAttribute('id', 'task-52');
buttonCompare2.addEventListener('click', () => {
    const text52 = document.createElement('p');
    text52.innerText = compare(420, 420);
    results.appendChild(text52);
});
tasks.appendChild(buttonCompare2);

const buttonCompare3 = document.createElement('button');
buttonCompare3.innerText = 'Compare 1124 and 947';
buttonCompare3.setAttribute('id', 'task-53');
buttonCompare3.addEventListener('click', () => {
    const text53 = document.createElement('p');
    text53.innerText = compare(367, 390);
    results.appendChild(text53);
});
tasks.appendChild(buttonCompare3);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

for (let i = 0; i < 730; i += 13) {
    console.log(i);
}

const buttonPattern = document.createElement('button');
buttonPattern.innerText = 'Úkol 6';
buttonPattern.setAttribute('id', 'task-6');
buttonPattern.addEventListener('click', () => {
    for (let i = 0; i < 730; i += 13) {
        const text6 = document.createElement('p');
        text6.innerText = i;
        console.log(i);
        results.appendChild(text6);
    }
});
tasks.appendChild(buttonPattern);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const getCircleArea = (radius) => {
    return Math.PI * radius ** 2;
};

const buttonGetCircleArea = document.createElement('button');
buttonGetCircleArea.innerText = 'Get circle area of 4';
buttonGetCircleArea.setAttribute('id', 'task-7');
buttonGetCircleArea.addEventListener('click', () => {
    const text7 = document.createElement('p');
    text7.innerText = getCircleArea(4);
    results.appendChild(text7);
});
tasks.appendChild(buttonGetCircleArea);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const getConeVolume = (height, radius) => {
    return Math.PI * radius ** 2 * height / 3;
};

const buttonGetVolume = document.createElement('button');
buttonGetVolume.innerText = 'Get volume of H:5 R:7';
buttonGetVolume.setAttribute('id', 'task-7');
buttonGetVolume.addEventListener('click', () => {
    const text8 = document.createElement('p');
    text8.innerText = getConeVolume(5, 7);
    results.appendChild(text8);
});
tasks.appendChild(buttonGetVolume);


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const triangle = (a, b, c) => {
    return (a + b > c && a + c > b && b + c > a);
};

const buttonTriangle = document.createElement('button');
buttonTriangle.innerText = 'Triangle? 5 5 0';
buttonTriangle.setAttribute('id', 'task-7');
buttonTriangle.addEventListener('click', () => {
    const text9 = document.createElement('p');
    text9.innerText = triangle(5, 5, 1);
    results.appendChild(text9);
});
tasks.appendChild(buttonTriangle);

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

const getTriangleArea = (a, b, c) => {
    if (!triangle(a, b, c)) {
        return 'Není to trojuhelník.';
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return area;
};

const buttonTriangleArea = document.createElement('button');
buttonTriangleArea.innerText = 'Area of previous triangle';
buttonTriangleArea.setAttribute('id', 'task-7');
buttonTriangleArea.addEventListener('click', () => {
    const text10 = document.createElement('p');
    text10.innerText = getTriangleArea(5, 5, 1);
    results.appendChild(text10);
});
tasks.appendChild(buttonTriangleArea);