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

const results = document.querySelector("#results");
const output = document.createElement("p");
results.append(output);

console.log('ahoj světe');
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const birth = 2005;
console.log('Pepe se narodil v roce ' + birth + '. Je mladý.')



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const temperatureC = 10;
const temperatureF = 45;

const celsius = (temperatureF - 32) * 5 / 9 + '°C';
const far = temperatureC * 9 / 5 + 32 + '°F';

console.log(temperatureF + '°F = ' + celsius);
console.log(temperatureC + '°C = ' + far);



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

const sayHello = () => {
    console.log("Ahoj světe");
    results.firstChild.innerText = "Ahoj světe";
};

const sayPepeAge = () => {
    const pepeAge = 'Pepe se narodil v roce ' + birth + '. Je mladý.';
    results.firstChild.innerText = pepeAge;
};

const giveCelsius = () => {
    console.log(temperatureF + '°F = ' + celsius);
    results.firstChild.innerText = temperatureF + '°F = ' + celsius;
};

const giveFar = () => {
    console.log(temperatureC + '°C = ' + far);
    results.firstChild.innerText = temperatureC + '°C = ' + far;
};

const buttonSayHello = document.createElement('button');
buttonSayHello.innerText = 'say hello';
buttonSayHello.setAttribute('id', 'task-0');
buttonSayHello.addEventListener('click', () => {
    sayHello();
});

const task_0 = document.querySelector('#tasks');
task_0.appendChild(buttonSayHello);

const buttonSayPepeAge = document.createElement('button');
buttonSayPepeAge.innerText = 'Pepe Age';
buttonSayPepeAge.setAttribute('id', 'task-1');
buttonSayPepeAge.addEventListener('click', () => {
    sayPepeAge();
});

const tasks = document.querySelector('#tasks');
tasks.appendChild(buttonSayPepeAge);


const buttonGetC = document.createElement('button');
buttonGetC.innerText = 'Celsius';
buttonGetC.setAttribute('id', 'task-2');
buttonGetC.addEventListener('click', () => {
    giveCelsius();
});

const tasks_2 = document.querySelector('#tasks');
tasks_2.appendChild(buttonGetC);


const buttonGetF = document.createElement('button');
buttonGetF.innerText = 'Fahrenheiht';
buttonGetF.setAttribute('id', 'task-3');
buttonGetF.addEventListener('click', () => {
    giveFar();
});

const tasks_3 = document.querySelector('#tasks');
tasks_3.appendChild(buttonGetF);
/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here


const rateOfTwoNumbers = () => {
    const cislo_1 = 50;
    const cislo_2 = 100;

    const rate = ((cislo_1 / cislo_2) * 100).toFixed(2);
    console.log(cislo_1 + " je " + rate + "% z " + cislo_2);
    results.firstChild.innerText = cislo_1 + " je " + rate + "% z " + cislo_2;
};

const buttonGetRate = document.createElement('button');
buttonGetRate.innerText = 'Rate of two nubmers';
buttonGetRate.setAttribute('id', 'task-4');
buttonGetRate.addEventListener('click', () => {
    rateOfTwoNumbers();
});

const tasks_4 = document.querySelector('#tasks');
tasks_4.appendChild(buttonGetRate);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const giveBiggerWhole = () => {
    const cele_1 = 20;
    const cele_2 = 40;
    let biggerWhole = null;

    if (cele_1 > cele_2) {
        biggerWhole = cele_1;
    } else {
        biggerWhole = cele_2;
    };
    console.log(biggerWhole);
    results.firstChild.innerText = biggerWhole;
};

const giveBiggerDecimal = () => {
    const deset_1 = 10.50;
    const deset_2 = 10.55;
    let biggerDecimals = null;
    if (deset_1 > deset_2) {
        biggerDecimals = deset_1;
    } else {
        biggerDecimals = deset_2;
    };
    console.log(biggerDecimals);
    results.firstChild.innerText = biggerDecimals;
};

const giveBiggerFraction = () => {
    const zlomek_1 = 1 / 5;
    const zlomek_2 = 3 / 10;
    let biggerFraction = null;

    if (zlomek_1 > zlomek_2) {
        biggerFraction = zlomek_1;
    } else {
        biggerFraction = zlomek_2;
    };
    console.log(biggerFraction);
    results.firstChild.innerText = biggerFraction;
};

const buttonBiggerNumber = document.createElement('button');
buttonBiggerNumber.innerText = 'Bigger whole number';
buttonBiggerNumber.setAttribute('id', 'task-5');
buttonBiggerNumber.addEventListener('click', () => {
    giveBiggerWhole();
});

const tasks_5 = document.querySelector('#tasks');
tasks_5.appendChild(buttonBiggerNumber);

const buttonBiggerDecimal = document.createElement('button');
buttonBiggerDecimal.innerText = 'Bigger decimal number';
buttonBiggerDecimal.setAttribute('id', 'task-6');
buttonBiggerDecimal.addEventListener('click', () => {
    giveBiggerDecimal();
});

const tasks_6 = document.querySelector('#tasks');
tasks_6.appendChild(buttonBiggerDecimal);

const buttonBiggerFraction = document.createElement('button');
buttonBiggerFraction.innerText = 'Bigger fraction number';
buttonBiggerFraction.setAttribute('id', 'task-7');
buttonBiggerFraction.addEventListener('click', () => {
    giveBiggerFraction();
});

const tasks_7 = document.querySelector('#tasks');
tasks_7.appendChild(buttonBiggerFraction);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const giveNasobky = () => {
    const nasobky = [];
    let int = 0;

    for (let i = 0; i <= 56; i++) {
        nasobky[i] = int;
        int = int + 13;
    };
    console.log(nasobky);
    results.firstChild.innerText = nasobky;
}

const buttonNasobky = document.createElement('button');
buttonNasobky.innerText = 'Násobky';
buttonNasobky.setAttribute('id', 'task-8');
buttonNasobky.addEventListener('click', () => {
    giveNasobky();
});

const tasks_8 = document.querySelector('#tasks');
tasks_8.appendChild(buttonNasobky);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const circleArea = () => {
    const r = 5;
    const area = Math.PI * r ** (2);
    console.log(area);
    results.firstChild.innerText = area;
};

const buttonCircleArea = document.createElement('button');
buttonCircleArea.innerText = 'Plocha kruhu';
buttonCircleArea.setAttribute('id', 'task-9');
buttonCircleArea.addEventListener('click', () => {
    circleArea();
});

const tasks_9 = document.querySelector('#tasks');
tasks_9.appendChild(buttonCircleArea);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const height = 10;

const volumeOfCone = () => {
    const volume = 1 / 3 * Math.PI * r ** (2) * height;
    console.log(volume);
    results.firstChild.innerText = volume;
};

const buttonVolumeCone = document.createElement('button');
buttonVolumeCone.innerText = 'Objem kuželu';
buttonVolumeCone.setAttribute('id', 'task-10');
buttonVolumeCone.addEventListener('click', () => {
    volumeOfCone();
});

const tasks_10 = document.querySelector('#tasks');
tasks_10.appendChild(buttonVolumeCone);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const a = 5;
const b = 5;
const c = 5;

const isTriangleDoable = () => {
    if (a + b > c && a + c > b && c + b > a) {
        console.log(true);
        results.firstChild.innerText = true;
        return true;
    } else {
        console.log(false);
        results.firstChild.innerText = false;
        return false
    }
};

const buttonTriangleDoability = document.createElement('button');
buttonTriangleDoability.innerText = 'Jde trojúhelník narýsovat?';
buttonTriangleDoability.setAttribute('id', 'task-11');
buttonTriangleDoability.addEventListener('click', () => {
    isTriangleDoable();
});

const tasks_11 = document.querySelector('#tasks');
tasks_11.appendChild(buttonTriangleDoability);

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

const heronModel = () => {
    let results = document.querySelector('#results');
    const error = 'Trojúhelník se s danými délkami nedá sestrojit';
    if (isTriangleDoable === false) {
        results.firstChild.innerText = error;
        throw new Error(error);
    };
    const s = (a + b + c) / 2;
    const heronResult = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    results.firstChild.innerText = heronResult;
};

const buttonHeronModel = document.createElement('button');
buttonHeronModel.innerText = 'Heronův vzorec';
buttonHeronModel.setAttribute('id', 'task-12');
buttonHeronModel.addEventListener('click', () => {
    heronModel();
});

const tasks_12 = document.querySelector('#tasks');
tasks_12.appendChild(buttonHeronModel);

