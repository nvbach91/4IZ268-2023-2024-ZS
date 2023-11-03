/* HOMEWORK */
/**
 * 0) Pre-preparacion.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!" 
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou "tasks" - <div id="tasks"></div>). 
 * - Na stránce vytvořte místo pro výpis výsledků úkolů (div, který má id s hodnotou "result" - <div id="results"></div>).
 * 
 * - Připojte tento homework.js soubor k vytvořené HTML stránce pomocí tagu <script> (viz LAB) a vyzkoušejte
 * console.log("Ahoj světe");
 */
console.log("Ahoj světe");

/**
 * 1) Pepe"s age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here
let pepasAge = 25;
console.log("Pepa je " + pepasAge + " let starý.");




/**
 * 2) WTF (wow, that"s fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const celsiusTemp = 15;
const fahrenheitTemp = 68;

const fahrenheitConversion = (celsiusTemp * 9)/5 + 32;
const celsiusConversion = ((fahrenheitTemp - 32)*5)/9

console.log(celsiusTemp + "°C = " + fahrenheitConversion + "°F.");
console.log(fahrenheitTemp + "°F = " + celsiusConversion + "°C.");


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvoříte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 * 
 * Pro testování funkce:
 * - Pouze pomocí JavaScriptu (bez knihoven) vytvořte HTML tlačítko s názvem této úlohy, resp. co funkce dělá, a 
 * id s číslem úlohy <button id="task-1">Uloha 1 (Pepe"s age)</button>, umístěte ho na stránku do předem vytvořeného 
 * místa <div id="tasks"></div> a pomocí posluchače události "click" nabindujte implementovanou funkci na toto tlačítko.
 * 
 * Výsledkem má být tlačítko, na které když kliknete, tak se provede to, co je implementováno ve funkci.
 *
 * Příklad vytvoření tlačítka s funkcí:
 * 
 * // deklarace a implementace funkce
 * const sayHello = () => {
 *   console.log("Hello");
 * };
 * 
 * // vytvoření tlačítka
 * const buttonSayHello = document.createElement("button");
 * // nastavení textu tlačítka
 * buttonSayHello.innerText = "Say Hello";
 * // nastavení atributu id tlačítka
 * buttonSayHello.setAttribute("id", "task-0");
 * // nabindování funkce na událost click tlačítka
 * buttonSayHello.addEventListener("click", () => {
 *   sayHello();
 * });
 * 
 * // výběr existujícího elementu na stránce s id="tasks"
 * const tasks = document.querySelector("#tasks");
 * // vložení vytvořeného tlačítka do vybraného elementu na stránce
 * tasks.appendChild(buttonSayHello);
 */
// Solution here
const getPepasAge = (age) => {
    const result = "Pepa je " + age + " let starý."
    return result;
}


const celsiusToFahrenheit = (C) => {
    const result = (C * 9)/5 + 32;
    return C + "°C = " + result + "°F."
} 

const fahrenheitToCelsius = (F) => {
    const result = ((fahrenheitTemp - 32)*5)/9;
    return F + "°F = " + result + "°C."
} 

// °C °F
const buttonSayAge = document.createElement("button");
buttonSayAge.innerText = "Vypiš věk";
buttonSayAge.setAttribute("id", "task1")
buttonSayAge.addEventListener("click", () => {
    console.log(getPepasAge(pepasAge));
});
const tasks = document.querySelector("#tasks");
tasks.appendChild(buttonSayAge);

const buttonCelsiusConversion = document.createElement("button");
buttonCelsiusConversion.innerText = "Převod z °C na °F.";
buttonCelsiusConversion.setAttribute("id", "task2")
buttonCelsiusConversion.addEventListener("click", () => {
    console.log(celsiusToFahrenheit(celsiusTemp));
});
tasks.appendChild(buttonCelsiusConversion);

const buttonFahrenheitConversion = document.createElement("button");
buttonFahrenheitConversion.innerText = "Převod z °F na °C.";
buttonFahrenheitConversion.setAttribute("id", "task3");
buttonFahrenheitConversion.addEventListener("click", () => {
    console.log(fahrenheitToCelsius(fahrenheitTemp));
});
tasks.appendChild(buttonFahrenheitConversion);
/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

let a = 6;
let b = 18;

const division = (a, b) => {
    const result = (a/b)*100;
    return  a + " je " + result.toFixed(2) + "% z " + b;
};

const results = document.querySelector("#results");

const buttonDivision = document.createElement("button");
buttonDivision.innerText = "Podíl " + a + " a " + b + ".";
buttonDivision.setAttribute("id", "task4");
buttonDivision.addEventListener("click", () => {
    results.innerText = division(a,b);
});
tasks.appendChild(buttonDivision);

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
    if(a > b) {
        return a + " je větší než " + b + ".";
    } else if (a == b) {
        return a + " je rovno " + b + ".";
    } else {
        return a + " je menší než " + b + ".";
    }
};

const buttonCompare = document.createElement("button");
buttonCompare.innerText = "Porovnání " + a + " a " + b + ".";
buttonCompare.setAttribute("id", "task5");
buttonCompare.addEventListener("click", () => {
    results.innerText = compare(a,b);
});
tasks.appendChild(buttonCompare);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const multiplication13 = () => {
    let temp = 13;
    let result = "";
    
    for(let i = 0; i <= 56; i++) {
        temp = i*13;
        result += temp + ", ";
    };
    return result;
}

const buttonMultiplication13 = document.createElement("button");
buttonMultiplication13.innerText = "Násobky 13 (do 730).";
buttonMultiplication13.setAttribute("id", "task6");
buttonMultiplication13.addEventListener("click", () => {
    results.innerText = multiplication13();
});
tasks.appendChild(buttonMultiplication13);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const circleArea = (r) => {
    return (Math.PI*r**2).toFixed(3)
};

const buttonCircleArea = document.createElement("button");
buttonCircleArea.innerText = "Obsah kružnice r = 6";
buttonCircleArea.setAttribute("id", "task7");
buttonCircleArea.addEventListener("click", () => {
    results.innerText = circleArea(6);
});
tasks.appendChild(buttonCircleArea);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const coneVolume = (v, r) => {
    const bottomArea = Math.PI*r**2;
    return ((1/3)*bottomArea*v).toFixed(3);
}

const buttonConeVolume = document.createElement("button");
buttonConeVolume.innerText = "Objem kužele r=7, v=10";
buttonConeVolume.setAttribute("id", "task8");
buttonConeVolume.addEventListener("click", () => {
    results.innerText = coneVolume(10, 7);
});
tasks.appendChild(buttonConeVolume);


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const triangleTest = (a, b, c) => {
    if( (a+b)>c && (a+c) > b && (c+b) > a) {
        return true;
    }
    else {
        return false;
    }
}

const buttonTriangleTest = document.createElement("button");
buttonTriangleTest.innerText = "Test platnosti trojůhelníku a=1, b=3, c=5";
buttonTriangleTest.setAttribute("id", "task9");
buttonTriangleTest.addEventListener("click", () => {
    let test = triangleTest(1, 3, 5);
    if(!test) {
        results.innerText = "Daný trojúhelník sestrojit nelze.";
    } else {
        results.innerText = "Daný trojuhelník lze sestrojit."
    } 
});
tasks.appendChild(buttonTriangleTest);

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

const heronFormula = (a, b, c) => {
    const test = triangleTest(a, b, c)

    if(!test) {
        results.innerText = "Daný trojúhelník sestrojit nelze";
    }  
    else {
        const s = (a + b + c)/2;
        const area = (Math.sqrt(s*(s-a)*(s-b)*(s-c))).toFixed(3);
        results.innerHTML = area;
    }
};

const buttonHeron = document.createElement("button");
buttonHeron.innerText = "Obsah trojuhelníku a=5, b=7, c=11";
buttonHeron.setAttribute("id", "task10");
buttonHeron.addEventListener("click", () => {
    heronFormula(5, 7, 11);
});
tasks.appendChild(buttonHeron);
