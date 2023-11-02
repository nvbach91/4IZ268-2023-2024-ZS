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
console.log('Ahoj světe')

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here
const birthYear = 2003
console.log(`Pepe's age is ${new Date().getFullYear() - birthYear}`)

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const temprCels = 23
console.log(`Transalating ${temprCels}°C to ${Math.round(temprCels * 9 / 5 + 32)}°F`)

const temprFahr = 55
console.log(`Transalating ${temprFahr}°F to ${Math.round((temprFahr - 32) * 5 / 9)}°C`)


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
const tasks = document.querySelector('#tasks');

const printPepeAge = (birthYear) => {
    console.log(`Pepe's age is ${new Date().getFullYear() - birthYear}`)
}

const celsToFahr = (temprCels) => {
    console.log(`Transalating ${temprCels}°C to ${Math.round(temprCels * 9 / 5 + 32)}°F`)
}

const fahrToCels = (temprFahr) => {
    console.log(`Transalating ${temprFahr}°F to ${Math.round((temprFahr - 32) * 5 / 9)}°C`)
}

const buttonPepeAge = document.createElement('button')
buttonPepeAge.innerText = 'Display Pepes age'
buttonPepeAge.setAttribute('id', 'task-3.1')
buttonPepeAge.addEventListener('click', () => {
   printPepeAge(birthYear)
});

const buttonCelsToFahr = document.createElement('button')
buttonCelsToFahr.innerText = 'Celsium To Fahrenheiht'
buttonCelsToFahr.setAttribute('id', 'task-3.2')
buttonCelsToFahr.addEventListener('click', () => {
    celsToFahr(temprCels)
});

const buttonFahrToCels = document.createElement('button')
buttonFahrToCels.innerText = 'Fahrenheiht to Celsium'
buttonFahrToCels.setAttribute('id', 'task-3.3')
buttonFahrToCels.addEventListener('click', () => {
    fahrToCels(temprFahr)
});

tasks.appendChild(buttonCelsToFahr)
tasks.appendChild(buttonFahrToCels)
tasks.appendChild(buttonPepeAge)


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
const results = document.getElementById('results')

const getPercentage = (a, b) => {
    if (b == 0) { return "Division by 0" }
    const res = (a / b) * 100
    return `${res.toFixed(2)}%`
}

const buttonDevide = document.createElement('button')
buttonDevide.innerText = "Devide two numbers"
buttonDevide.setAttribute('id', 'task-4.1')
buttonDevide.addEventListener('click', () => {
    results.textContent = getPercentage(21, 40)
})
tasks.appendChild(buttonDevide)

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
const compareNumbers = (a, b) => {
    if (a === b) {
        return `${a} is equal to ${b}`
    }
    return a > b ? `${a} is greater than ${b}` : `${b} is greater than ${a}`
}

const buttonGreater = document.createElement('button')
buttonGreater.innerText = "Compare Cela Cisla"
buttonGreater.setAttribute('id', 'task-5.1')
buttonGreater.addEventListener('click', () => {
    results.textContent = compareNumbers(14, 44)
})

const buttonGreaterDouble = document.createElement('button')
buttonGreaterDouble.innerText = "Compare Desetinna Cisla"
buttonGreaterDouble.setAttribute('id', 'task-5.2')
buttonGreaterDouble.addEventListener('click', () => {
    results.textContent = compareNumbers(14.1111111111111112222, 14.111111111111111)
})

const buttonZlomky = document.createElement('button')
buttonZlomky.innerText = "Compare Zlomky Cisla"
buttonZlomky.setAttribute('id', 'task-5.3')
buttonZlomky.addEventListener('click', () => {
    results.textContent = compareNumbers(5/3, 3/5)
})

tasks.appendChild(buttonGreater)
tasks.appendChild(buttonGreaterDouble)
tasks.appendChild(buttonZlomky)

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
const printNasobky = () => {
    let res = ''
    for (let i = 0; i <= 730; i += 13) {
        res += `${i} `
    }
    return res
}

const buttonPattern = document.createElement('button')
buttonPattern.innerText = "Nasobky 13"
buttonPattern.setAttribute('id', 'task-6')
buttonPattern.addEventListener('click', () => {
    results.textContent = printNasobky()
});
tasks.appendChild(buttonPattern)


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const computeLenght = (radius) => Math.PI * Math.pow(radius, 2)

const buttonCircle = document.createElement('button')
buttonCircle.innerText = "Compute lenght of circle"
buttonCircle.setAttribute('id', 'task-7')
buttonCircle.addEventListener('click', () => {
    results.textContent = computeLenght(10)
});
tasks.appendChild(buttonCircle)

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const computeObjem = (height, radius) => Math.PI * Math.pow(radius, 2) * height * (1/3)

const buttonCircle2 = document.createElement('button')
buttonCircle2.innerText = "Compute objem of circle"
buttonCircle2.setAttribute('id', 'task-8')
buttonCircle2.addEventListener('click', () => {
    results.textContent = computeObjem(10, 10)
});
tasks.appendChild(buttonCircle2);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const isTriangle = (a, b, c) => a + b > c && a + c > b && c + b > a

const buttonTriangle = document.createElement('button')
buttonTriangle.innerText = "Is triangle?"
buttonTriangle.setAttribute('id', 'task-9')
buttonTriangle.addEventListener('click', () => {
   results.textContent = isTriangle(4, 2, 5)
});
tasks.appendChild(buttonTriangle)

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
const computeHeron = (a, b, c) => {
    if (!isTriangle(a, b, c)) {
        return "Not a triangle"
    }
    const temp = (a + b + c) / 2
    const obsah = Math.sqrt(temp * (temp - a) * (temp - b) * (temp - c))
    return `Obsah: ${obsah.toFixed(2)}`
}

const buttonHeron = document.createElement('button')
buttonHeron.innerText = "Heronov vzorec"
buttonHeron.setAttribute('id', 'task-10')
buttonHeron.addEventListener('click', () => {
    results.textContent = computeHeron(3, 2, 2)
})
tasks.appendChild(buttonHeron)


