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
const pepeBirth = 2002;
const thisYear = new Date().getFullYear();

console.log(`Pepovi je ${thisYear - pepeBirth} let`);





/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 * 
 * 
 * 
 */
// Solution here
const celsius = 20;
const fahrenheiht = 68;

const convertCelsiusToFahreinheiht = celsius*9/5+32;
const convertFahreinheihtToCelsius = (fahrenheiht-32)*5/9;

console.log(`${celsius}°C = ${convertCelsiusToFahreinheiht}°F`);
console.log(` ${fahrenheiht}°F  = ${convertFahreinheihtToCelsius}°C`);



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


const sayAge = (pepeBirth) => {
    const thisYear = new Date().getFullYear(); 
    const pepeAge = thisYear - pepeBirth;
    console.log(`Pepovi je ${pepeAge} let`);
};

const button1 = document.createElement('button');
button1.innerText = 'Uloha 1 (Pepes age)';
button1.setAttribute('id', 'task-1');
button1.addEventListener('click', () => {
    sayAge(2002);
});
document.querySelector('#tasks').appendChild(button1);

const button2 = document.createElement('button');
button2.innerText = 'Uloha 2 (WTF)';
button2.setAttribute('id', 'task-2');
button2.addEventListener('click', () => {
    console.log(`${celsius}°C = ${convertCelsiusToFahreinheiht}°F`);
    console.log(` ${fahrenheiht}°F  = ${convertFahreinheihtToCelsius}°C`);
});
document.querySelector('#tasks').appendChild(button2);



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const censored = (number1, number2) => {
    if (number2 === 0) {
        document.querySelector('#tasks').innerText = `${number2} is ${number2}% of ${number1}.`;
        return;
    }

    const result = (number2 / number1) * 100;

    document.querySelector('#tasks').innerText = `${number2} is ${result.toFixed(2)}% of ${number1}.`;
};

const button3 = document.createElement('button');
button3.innerText = 'Uloha 4 (%CENSORED%)';
button3.setAttribute('id', 'task-4');
button3.addEventListener('click', () => {
    censored(27, 19);
});
document.querySelector('#tasks').appendChild(button3);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const who = (a, b) => {
    if(a > b) {
        return a + " je větší než " + b + ".";
    } else if (a == b) {
        return a + " je rovno " + b + ".";
    } else {
        return a + " je menší než " + b + ".";
    }
};

const button4 = document.createElement("button");
button4.innerText = 'Uloha 5 (WHO)';
button4.setAttribute("id", "task-5");
button4.addEventListener("click", () => {
    results.innerText = who(a,b);
});
document.querySelector('#tasks').appendChild(button3);



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

const pattern = document.createElement('button');
button5.innerText = 'Uloha 6 (pattern)';
button5.setAttribute('id', 'task-6');

button5.addEventListener('click', () => {
    divResults.textContent = ''; 
    for (let i = 0; i <= 730; i += 13) {
        divResults.textContent += `${i} `;
    }
}
);
document.querySelector('#tasks').appendChild(button5);



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const aroundAbout = (r) => {
    return (Math.PI*r**2).toFixed(3)
};

const button6 = document.createElement("button");
button6.innerText = 'Uloha 6 (Around and about)';
button6.setAttribute("id", "task-7");
button6.addEventListener("click", () => {
    results.innerText = aroundAbout(1);
});
document.querySelector('#tasks').appendChild(button6);



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const cone = (r,h) => {
    const volumeCone = (3.14159*(r**2)*h)/3;
};

const button7 = document.createElement('button');
button7.innerText = 'Uloha 8 (Another dimension)';
button7.setAttribute('id', 'task-8');
button7.addEventListener('click', () => {
   const rInput = prompt('Zadejte poloměr podstavy kužele:');
   const r = parseInt(rInput); 
   const hInput = prompt('Zadejte výšku kužele:');
   const h = parseInt(hInput); 
   cone(r,h);
});
document.querySelector('#tasks').appendChild(button7);




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
    if (a + b > c && b + c > a && c + a > b) {
        document.getElementById('results').innerText = `Triangle of lengths ${a}, ${b}, and ${c} can be built.`;
        return true;
    } else {
        document.getElementById('results').innerText = `Triangle of lengths ${a}, ${b}, and ${c} cannot be built.`;
        return false;
    }
};

const button09 = document.createElement('button');
button09.innerText = 'Uloha 9 (Not sure if triangle can be built)';
button09.setAttribute('id', 'task-9');
button09.addEventListener('click', () => {
    triangle(1, 2, 3);
});
document.querySelector('#tasks').appendChild(button9);


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

const heron = (a, b, c) => {

    if (!triangle(a, b, c)) {
        document.getElementById('results').innerText = `Triangle of lengths ${a}, ${b}, and ${c} cannot be built.`;
        return;
    }

    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    document.getElementById('results').innerText = `The area of the triangle with side lengths ${a}, ${b}, and ${c} is ${area.toFixed(2)}`;
};

const button10 = document.createElement('button');
button10.innerText = 'Uloha 10 (Heroic performance)';
button10.setAttribute('id', 'task-10');
button10.addEventListener('click', () => {
    heron(27, 19, 10);
});
document.querySelector('#tasks').appendChild(button10);

