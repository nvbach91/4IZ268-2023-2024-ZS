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
console.log('Ahoj svete!')

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const thisYear = new Date().getFullYear();
const pepeYear = 2002;
console.log( "Pepe is " + (thisYear - pepeYear) + " years old")

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const celsius = 20;
const fahrenheihtCount = ((celsius*9)/5)+32;
console.log(fahrenheihtCount + ' -> tolik je stupnu F');

const fahrenheit = 68;
const celsiusCount = ((fahrenheit-32)*5)/9;
console.log(celsiusCount + ' -> tolik je stupnu C');





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

 // deklarace a implementace funkce
 const pepeAge = () => {
    console.log( "Pepe is " + (thisYear - inputPepeAge.value) + " years old")
    const result1 = document.createElement('p');
    result1.innerText = "Pepe is " + (thisYear - inputPepeAge.value) + " years old";
    // výběr existujícího elementu na stránce s id="tasks"
    const results = document.querySelector('#results');
    // vložení vytvořeného tlačítka do vybraného elementu na stránce
    results.appendChild(result1);
 };
 
 // vytvoření tlačítka
 const buttonPepeAge = document.createElement('button');
 // vytvoření tlačítka
 const inputPepeAge = document.createElement('input');
 // nastavení atributu id tlačítka
 inputPepeAge.setAttribute('id', 'task-1');
  // nastavení textu tlačítka
  buttonPepeAge.innerText = 'Count age of Pepe';
 // nastavení atributu id tlačítka
 buttonPepeAge.setAttribute('id', 'task-1');
 // nabindování funkce na událost click tlačítka
 buttonPepeAge.addEventListener('click', () => {
   pepeAge();
 });
 
 // výběr existujícího elementu na stránce s id="tasks"
 const tasks = document.querySelector('#tasks');
 // vložení vytvořeného tlačítka do vybraného elementu na stránce
 tasks.appendChild(inputPepeAge);
 tasks.appendChild(buttonPepeAge);


 const convertCelsiusToFahrenheit = (celsiusInput) => {
    return celsiusInput * 9 / 5 + 32;
};
const convertFahrenheitToCelsius = (fahrenheihtInput) => {
    return (fahrenheihtInput - 32) * 5 / 9;
};

const fahrenheihtInput = document.createElement('input');
// nastavení atributu id tlačítka
fahrenheihtInput.setAttribute('id', 'task-32');
// nastavení textu tlačítka
tasks.appendChild(fahrenheihtInput);

const buttonToCelsius = document.createElement('button');
buttonToCelsius.innerText = "fahrenheit" + ' to Celsius';
buttonToCelsius.setAttribute('id', 'task-32');
buttonToCelsius.addEventListener('click', () => {
    const text32 = document.createElement('p');
    text32.innerText = convertFahrenheitToCelsius(fahrenheihtInput.value);
    results.appendChild(text32);
});

tasks.appendChild(buttonToCelsius);

const celsiusInput = document.createElement('input');
// nastavení atributu id tlačítka
celsiusInput.setAttribute('id', 'task-33');
// nastavení textu tlačítka
tasks.appendChild(celsiusInput);

const buttonToFahreheit = document.createElement('button');
buttonToFahreheit.innerText = "celsius" + ' to Fahrenheit';
buttonToFahreheit.setAttribute('id', 'task-33');
buttonToFahreheit.addEventListener('click', () => {
    const text33 = document.createElement('p');
    text33.innerText = convertCelsiusToFahrenheit(celsiusInput.value);
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

const magicPercantageCount = (a, b) => {
    
    if (b == 0) {
        return 'Nelze dělit nulou';
    }
    else{
        const result = a / b;
        result.toFixed(2);
        return result * 100 + "%";
    }
};
const number1 = document.createElement('input');
// nastavení atributu id tlačítka
number1.setAttribute('id', 'task-41');
// nastavení textu tlačítka
tasks.appendChild(number1);

const number2 = document.createElement('input');
// nastavení atributu id tlačítka
number2.setAttribute('id', 'task-42');
// nastavení textu tlačítka
tasks.appendChild(number2);

const buttonToPercents = document.createElement('button');
buttonToPercents.innerText = " Magic percents out of numbers ";
buttonToPercents.setAttribute('id', 'task-4');
buttonToPercents.addEventListener('click', () => {
    const text4 = document.createElement('p');
    text4.innerText = magicPercantageCount(number1.value, number2.value);
    results.appendChild(text4);
});
tasks.appendChild(buttonToPercents);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
const greater = (a, b) => {
    
    if (b > a) {
        return  (b + ' je vetsi');
    }
    else{
        return  (a + ' je vetsi');
    }
};
const number3 = document.createElement('input');
// nastavení atributu id tlačítka
number3.setAttribute('id', 'task-51');
// nastavení textu tlačítka
tasks.appendChild(number3);

const number4 = document.createElement('input');
// nastavení atributu id tlačítka
number4.setAttribute('id', 'task-52');
// nastavení textu tlačítka
tasks.appendChild(number4);

const buttonGreater = document.createElement('button');
buttonGreater.innerText = " Which is greater ";
buttonGreater.setAttribute('id', 'task-5');
buttonGreater.addEventListener('click', () => {
    const text4 = document.createElement('p');
    text4.innerText = greater(number3.value, number4.value);
    results.appendChild(text4);
});
tasks.appendChild(buttonGreater);





/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const lotsOfNumbers = () => {
    for (let index = 0; index <= 730; index+=13) {
        const text5 = document.createElement('p');
        text5.innerText = index;
        results.appendChild(text5);
    }
    
};

const buttonlotsOfNumbers = document.createElement('button');
buttonlotsOfNumbers.innerText = " Pattern of 13 ";
buttonlotsOfNumbers.setAttribute('id', 'task-6');
buttonlotsOfNumbers.addEventListener('click', () => {
    lotsOfNumbers()
});
tasks.appendChild(buttonlotsOfNumbers);



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here


const around = (a) => {
    return Math.PI * a ** 2 + "  je vysledek kruznicovani";
};
const number7 = document.createElement('input');
// nastavení atributu id tlačítka
number7.setAttribute('id', 'task-7');
// nastavení textu tlačítka
tasks.appendChild(number7);


const buttonRound = document.createElement('button');
buttonRound.innerText = " Round about ";
buttonRound.setAttribute('id', 'task-5');
buttonRound.addEventListener('click', () => {
    const text7 = document.createElement('p');
    text7.innerText = around(number7.value);
    results.appendChild(text7);
});
tasks.appendChild(buttonRound);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here


const task8 = (a,b) => {
    return Math.PI * a ** 2 * b / 3 + ' je vysledek s dalsim rozmerem';
};
const number8a = document.createElement('input');
// nastavení atributu id tlačítka
number8a.setAttribute('id', 'task-8a');
// nastavení textu tlačítka
number8a.innerText = "polomer"
tasks.appendChild(number8a);

const number8b = document.createElement('input');
// nastavení atributu id tlačítka
number8b.setAttribute('id', 'task-8b');
// nastavení textu tlačítka
number8a.innerText = "vyska"
tasks.appendChild(number8b);


const buttonTask8 = document.createElement('button');
buttonTask8.innerText = " Kuzel objem ukol ";
buttonTask8.setAttribute('id', 'task-8');
buttonTask8.addEventListener('click', () => {
    const text8 = document.createElement('p');
    text8.innerText = task8(number8a.value, number8b.value);
    results.appendChild(text8);
});
tasks.appendChild(buttonTask8);




/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const task9 = (a,b,c) => {
    a =  parseFloat(a)
    b =  parseFloat(b)
    c =  parseFloat(c)
    if (a <= 0 || b <= 0 || c <= 0) {
        return false; // Trojúhelník musí mít kladné délky stran
      }

    if ( (a + b > c ) && (a + c > b) && (b + c > a)) {
        return true; // Splňuje trojúhelníkovou nerovnost
    } else {
        return false;
    }
    
};
const number9a = document.createElement('input');
// nastavení atributu id tlačítka
number9a.setAttribute('id', 'task-9a');
// nastavení textu tlačítka
number8a.innerText = "strana A"
tasks.appendChild(number9a);

const number9b = document.createElement('input');
// nastavení atributu id tlačítka
number9b.setAttribute('id', 'task-9b');
// nastavení textu tlačítka
number9b.innerText = "strana B"
tasks.appendChild(number9b);

const number9c = document.createElement('input');
// nastavení atributu id tlačítka
number9c.setAttribute('id', 'task-9c');
// nastavení textu tlačítka
number9c.innerText = "strana C"
tasks.appendChild(number9c);


const buttonTask9 = document.createElement('button');
buttonTask9.innerText = " Je to trojuhelnik? ";
buttonTask9.setAttribute('id', 'task-9');
buttonTask9.addEventListener('click', () => {
    const text9 = document.createElement('p');
    text9.innerText = task9(number9a.value, number9b.value,number9c.value);
    results.appendChild(text9);
});
tasks.appendChild(buttonTask9);





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

const task10 = (a, b, c) => {
    a =  parseFloat(a)
    b =  parseFloat(b)
    c =  parseFloat(c)
    if (!task9(a, b, c)) {
        return "Neni to trojuhelnik";
    }
    const s = (a + b + c) / 2;
    const result = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return "Obsah trojuhelniku je " + result;
};

const number10a = document.createElement('input');
// nastavení atributu id tlačítka
number10a.setAttribute('id', 'task-10a');
// nastavení textu tlačítka
number10a.innerText = "strana A"
tasks.appendChild(number10a);

const number10b = document.createElement('input');
// nastavení atributu id tlačítka
number10b.setAttribute('id', 'task-10b');
// nastavení textu tlačítka
number10b.innerText = "strana B"
tasks.appendChild(number10b);

const number10c = document.createElement('input');
// nastavení atributu id tlačítka
number10c.setAttribute('id', 'task-10c');
// nastavení textu tlačítka
number10c.innerText = "strana C"
tasks.appendChild(number10c);


const buttonTask10 = document.createElement('button');
buttonTask10.innerText = " Jaky je obsah trojuelnika? ";
buttonTask10.setAttribute('id', 'task-10');
buttonTask10.addEventListener('click', () => {
    const text10 = document.createElement('p');
    text10.innerText = task10(number10a.value, number10b.value,number10c.value);
    results.appendChild(text10);
});
tasks.appendChild(buttonTask10);
