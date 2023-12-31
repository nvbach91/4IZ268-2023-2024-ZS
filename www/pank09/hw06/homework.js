/* HOMEWORK */

const results = document.querySelector('#results');

/**
 * 0) Pre-preparacion.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!" 
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou "tasks" - <div id="tasks"></div>). 
 * - Na stránce vytvořte místo pro výpis výsledků úkolů (div, který má id s hodnotou "result" - <div id="results"></div>).
 * 
 * - Připojte tento homework.js soubor k vytvořené HTML stránce pomocí tagu <script> (viz LAB) a vyzkoušejte
 * return 'Ahoj světe');
 */

console.log('Ahoj světe');

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const pepesBday = 2005;
const pepesAge = new Date().getFullYear() - pepesBday;

console.log(`Pepe is ${pepesAge} years old.`);


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here


const celsius = 10;
const fahrenheiht = 50;

const celsiusInFahrenheiht = celsius * 9 / 5 + 32;
const fahrenheihtInCelsius = (fahrenheiht - 32) * 5 / 9;


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
 *   return 'Hello');
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

const createButton = (id, label, action) => {
    const button = document.createElement('button');
    button.innerText = label;
    button.setAttribute('id', id);
    button.addEventListener('click', function() {
        const actionResults = action();
        results.innerHTML = actionResults;
        console.log(actionResults);
    });

    document.querySelector('#tasks').appendChild(button);
    return button;
};

const getAge = (bday) => {
    return new Date().getFullYear() - bday;
};

const celsiusToFahrenheiht = (celsius) => {
    return celsius * 9 / 5 + 32;
};

const fahrenheihtToCelsius = (fahrenheiht) => {
    return (fahrenheiht - 32) * 5 / 9;
};

createButton(
    'task-1',
    'Pepe\'s age',
    () => { return getAge(pepesAge); }
);
createButton(
    'task-2',
    `${celsius} celsius in fahrenheiht`,
    () => { return celsiusToFahrenheiht(celsius); }
);
createButton(
    'task-3',
    `${fahrenheiht} fahrenheiht in celsius`,
    () => { return fahrenheihtToCelsius(fahrenheiht); }
);

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
    if (!Number.isFinite(a/b))
        return "Division by zero error."
    return(`${a} je ${a / b * 100}% z ${b}.`);
};

createButton(
    'task-4',
    `Get percent`,
    () => { return getPercentage(5, 20); }
);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const returnGreater = (a, b) => {
    if (a > b)
        return a;

    if (b > a)
        return b;

    return 'a = b';
}

createButton(
    'task-5',
    `1 <=> 2?`,
    () => { return returnGreater(1, 2); }
);

createButton(
    'task-6',
    `1 <=> 2.0?`,
    () => { return returnGreater(1, 2.0); }
);

createButton(
    'task-7',
    `1 <=> 10/5?`,
    () => { return returnGreater(1, 10/5); }
);

createButton(
    'task-8',
    `1 <=> 1?`,
    () => { return returnGreater(1, 10/10); }
);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here


function* printMultipliesGenerator (m = 13, until = 730) {
    for (let i = 0; i <= until; i+=13) {
        yield `${i}`;
    }
}

createButton(
    'task-9',
    `Print multiplies of 13 until 730`,
    () => {
        const generator = printMultipliesGenerator(13, 730);

        let html = '';

        for (const value of generator) {
            html += value + '<br>';
        }

        return html;
    }
);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const getCircleArea = (r) => {
    return Math.PI * Math.pow(r, 2);
}

createButton(
    'task-10',
    `Get area of circle with radius 5`,
    () => { return getCircleArea(5); }
);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here


const getConeVolume = (height, radius) => {
    return Math.PI * Math.pow(radius, 2) * height / 3;
};

createButton(
    'task-11',
    `Get volume of cone with height 7 and radius 5`,
    () => { return getConeVolume(7, 5); }
);


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
    return a + b > c && a + c > b && b + c > a;
};

createButton(
    'task-12',
    `If (3 4 5) is triangle`,
    () => { return isTriangle(3, 4, 5); }
);


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
    if (!isTriangle(a, b, c))
        return `(${a} ${b} ${c}) is not triangle.`;
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return `Triangle area of (${a} ${b} ${c}) is ${area}.`;
};

createButton(
    'task-13',
    `Area of (3 4 5) triangle.`,
    () => { return getTriangleArea(3, 4, 5); }
);

createButton(
    'task-13',
    `Area of (3 4 7) triangle.`,
    () => { return getTriangleArea(3, 4, 7); }
);