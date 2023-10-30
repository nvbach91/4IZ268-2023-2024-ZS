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

document.querySelector('#submit-button').addEventListener('click', () => {
    const yearOfBirth = parseInt(document.querySelector('#text-input').value);
    const currentYear = 2023;
    const age = currentYear - yearOfBirth;

    document.querySelector('#result1').textContent = `Pepovi je ${age} let.`;
    console.log(`Pepovi je ${age} let.`)
});

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

document.querySelector('#submit-button2').addEventListener('click', () => {
    const celsia = parseInt(document.querySelector('#text-input2').value);
    const fahrenheit = celsia * 9 / 5 + 32;

    document.querySelector('#result2').textContent = `Teplota je ${fahrenheit}°F.`;
    console.log(`Teplota je ${fahrenheit}°F.`)
});

document.querySelector('#submit-button3').addEventListener('click', () => {
    const fahrenheit = parseInt(document.querySelector('#text-input3').value);
    const celsia = (fahrenheit - 32) * 5 / 9;

    document.querySelector('#result3').textContent = `Teplota je ${celsia}°C.`;
    console.log(`Teplota je ${celsia}°C.`)
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

const pepaAge = (year) => {
     age = 2023 - year;
     console.log(`Pepovi je ${age} let.`);};
const buttonPepaAge = document.createElement('button');
buttonPepaAge.innerText = 'Zadejte Pepův rok narození:';
buttonPepaAge.setAttribute('id', 'task-1');
buttonPepaAge.addEventListener('click', () => {
    const yearOfBirthInput = prompt('Zadejte Pepův rok narození:');
    const year = parseInt(yearOfBirthInput); 
    pepaAge(year);
});
const tasks = document.querySelector('#tasks3');
tasks.appendChild(buttonPepaAge);

const fToC = (F) => {
    const C = (F - 32) * 5 / 9;
    console.log(`Teplota je ${C}°C.`);};
const buttonFToC = document.createElement('button');
buttonFToC.innerText = 'Zadejte teplotu ve stupních Fahrenheita:';
buttonFToC.setAttribute('id', 'task-2');
buttonFToC.addEventListener('click', () => {
   const fInput = prompt('Zadejte teplotu ve stupních Fahrenheita:');
   const F = parseInt(fInput); 
   fToC(F);
});
tasks.appendChild(buttonFToC);

const cToF = (C) => {
    const F = C * 9 / 5 + 32;
    console.log(`Teplota je ${F}°F.`); };
const buttonCToF = document.createElement('button');
buttonCToF.innerText = 'Zadejte teplotu ve stupních Celsia:';
buttonCToF.setAttribute('id', 'task-3');
buttonCToF.addEventListener('click', () => {
   const cInput = prompt('Zadejte teplotu ve stupních Celsia:');
   const C = parseInt(cInput); 
   cToF(C);
});
tasks.appendChild(buttonCToF);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const division = (n1, n2) => {
    if (n2 === 0) {
        document.querySelector('#result4').textContent = `Nelze dělit nulou.`;
        console.log(`Nelze dělit nulou.`);
    } else {
    const divis = n1 / n2 * 100
    console.log(`${n1} je ${divis}% z ${n2}.`);
    document.querySelector('#result4').textContent = `${n1} je ${divis}% z ${n2}.` }
}
const buttonDivision = document.createElement('button');
buttonDivision.innerText = 'Zadejte dvě čísla:';
buttonDivision.setAttribute('id', 'task4');
buttonDivision.addEventListener('click', () => {
   const n1Input = prompt('Zadejte první číslo:');
   const n1 = parseInt(n1Input); 
   const n2Input = prompt('Zadejte druhé číslo:');
   const n2 = parseInt(n2Input); 
   division(n1, n2);
});
const tasks4 = document.querySelector('#tasks4');
tasks4.appendChild(buttonDivision);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const equality = (n1, n2) => {
    if (n1 === n2) {
        document.querySelector('#result5').textContent = `${n1} a ${n2} se rovnají.`;
    } else if (n1>n2) {
        document.querySelector('#result5').textContent = `${n1} je větší než ${n2}.`;
    } else {
        document.querySelector('#result5').textContent = `${n1} je menší než ${n2}.`;
    }}
const buttonEquality = document.createElement('button');
buttonEquality.innerText = 'Zadejte dvě čísla:';
buttonEquality.setAttribute('id', 'task5');
buttonEquality.addEventListener('click', () => {
   const n1Input = prompt('Zadejte první číslo:');
   const n1 = n1Input; 
   const n2Input = prompt('Zadejte druhé číslo:');
   const n2 = n2Input; 
   equality(n1, n2);
});
const tasks5 = document.querySelector('#tasks5');
tasks5.appendChild(buttonEquality);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const thirteen = () => {
    let divisible = [];
    for (let i = 0;i <= 730; i++) {
        if (i % 13 === 0) {
            divisible.push(i)
        }
    }
    document.querySelector('#result6').textContent = `${divisible}`;}
const buttonThirteen = document.createElement('button');
buttonThirteen.innerText = 'Klikněte zde:';
buttonThirteen.setAttribute('id', 'task6');
buttonThirteen.addEventListener('click', () => {
   thirteen();
});
const tasks6 = document.querySelector('#tasks6');
tasks6.appendChild(buttonThirteen);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const circle = (r) => {
    const area = 3.14159*(r**2);
    document.querySelector('#result7').textContent = `Obsah kružnice je ${area}.`;
};
const buttonCircle = document.createElement('button');
buttonCircle.innerText = 'Zadejte poloměr kružnice:';
buttonCircle.setAttribute('id', 'task7');
buttonCircle.addEventListener('click', () => {
   const rInput = prompt('Zadejte poloměr kružnice:');
   const r = parseInt(rInput); 
   circle(r);
});
const tasks7 = document.querySelector('#tasks7');
tasks7.appendChild(buttonCircle);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const cone = (r,h) => {
    const volume = (3.14159*(r**2)*h)/3;
    document.querySelector('#result8').textContent = `Objem kuželu je ${volume}.`;
};
const buttonCone = document.createElement('button');
buttonCone.innerText = 'Zadejte rozměry kuželu:';
buttonCone.setAttribute('id', 'task8');
buttonCone.addEventListener('click', () => {
   const rInput = prompt('Zadejte poloměr podstavy kužele:');
   const r = parseInt(rInput); 
   const hInput = prompt('Zadejte výšku kužele:');
   const h = parseInt(hInput); 
   cone(r,h);
});
const tasks8 = document.querySelector('#tasks8');
tasks8.appendChild(buttonCone);



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const triangle = (a,b,c) => {
    if (a+b>c & b+c>a & c+a>b) {
        document.querySelector('#result9').textContent = `Ano.`;
        return true;
    } else {
        document.querySelector('#result9').textContent = `Ne.`;
        return false;
    }
};
const buttonTriangle = document.createElement('button');
buttonTriangle.innerText = 'Zadejte velikosti stran trojúhelníku:';
buttonTriangle.setAttribute('id', 'task9');
buttonTriangle.addEventListener('click', () => {
   const aInput = prompt('Zadejte velikost strany a:');
   const a = parseInt(aInput); 
   const bInput = prompt('Zadejte velikost strany b:');
   const b = parseInt(bInput); 
   const cInput = prompt('Zadejte velikost strany c:');
   const c = parseInt(cInput); 
   triangle(a,b,c);
});
const tasks9 = document.querySelector('#tasks9');
tasks9.appendChild(buttonTriangle);

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

const heroicPerformance = (a,b,c) => {
    const valid = triangle(a,b,c);
    if (valid === false) {
        document.querySelector('#result10').textContent = `Trojúhelník neexistuje.`;
    } else {
        const s = (a+b+c)/2;
        const area = Math.sqrt(s*(s-a)*(s-b)*(s-c));
        document.querySelector('#result10').textContent = `Objem trojúhelníku je ${area}.`;
    }
};
const buttonHeroic = document.createElement('button');
buttonHeroic.innerText = 'Zadejte velikosti stran trojúhelníku:';
buttonHeroic.setAttribute('id', 'task10');
buttonHeroic.addEventListener('click', () => {
   const aHInput = prompt('Zadejte velikost strany a:');
   const aH = parseInt(aHInput); 
   const bHInput = prompt('Zadejte velikost strany b:');
   const bH = parseInt(bHInput); 
   const cHInput = prompt('Zadejte velikost strany c:');
   const cH = parseInt(cHInput); 
   heroicPerformance(aH,bH,cH);
});
const tasks10 = document.querySelector('#tasks10');
tasks10.appendChild(buttonHeroic);

