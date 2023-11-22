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
console.log("Ahoj světe")

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here
var years = -2
switch(true) {
    case years < 1:
        console.log("Pepa se ještě nenarodil :(")
        break;
    case years == 1:
        console.log("Pepa je " + years + " rok starý.")
        break;
    case years > 1 && years < 5:
        console.log("Pepa je " + years + " roky starý.")
        break;
    default:
        console.log("Pepa je " + years + " let starý.")
  }


/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
var type = "C"
var value = 20
var result = 0
if (type == "C")
{
    result = ((value * 9)/5) + 32
}
else
{
    result = ((value-32)*5)/9
}
console.log(result)




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

const hello = () => {
    var result = document.createElement('p');
    result.innerText = 'Ahoj světe';

    result.setAttribute('id', 'result-0');

    results.appendChild(result);
}

const age = (years) => {
    switch(true) {
        case years < 1:
            console.log("Pepa se ještě nenarodil :(")
            break;
        case years == 1:
            console.log("Pepa je " + years + " rok starý.")
            break;
        case years > 1 && years < 5:
            console.log("Pepa je " + years + " roky starý.")
            break;
        default:
            console.log("Pepa je " + years + " let starý.")
      }
  };

const hotstuff = (type, value) => {
    if (type == "C")
    {
        var result = ((value * 9)/5) + 32
    }
    else
    {
        var result = ((value-32)*5)/9
    }
    console.log(result)
    };

const results = document.querySelector('#results');
const tasks = document.querySelector('#tasks');

const buttonSayHello = document.createElement('button');
buttonSayHello.innerText = 'Ahoj světe';
buttonSayHello.setAttribute('id', 'task-0');
buttonSayHello.addEventListener('click', () => {
hello();
});
tasks.appendChild(buttonSayHello);



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const percentage = (num1, num2) => {
    if (num2 === 0) {
        return 0;
    }
    return `${num1} je ${(num1 / num2 * 100).toFixed(2)}% z ${num2}`;
}
const makeText=(value, id)=>{
    var result = document.createElement('p');
    result.innerText = value;
    result.setAttribute('id', id);
    results.appendChild(result);
 }
const buttonPercentage = document.createElement('button');
buttonPercentage.innerText = 'Procenta';
buttonPercentage.setAttribute('id', 'task-1');
buttonPercentage.addEventListener('click', () => {
makeText(percentage(10,20),"result-1");
});
tasks.appendChild(buttonPercentage);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const compare = (num1, num2) => {
    if (num1 < num2) {
        var value = num2;
    }
    else if (num1 > num2) {
        var value = num1;
    }
    else {
        var value= `${num1} = ${num2}`
    }
    var result = document.createElement('p');
    result.innerText = value;
    result.setAttribute('id', 'result-2');
    results.appendChild(result);
};

const buttonCompare = document.createElement('button');
buttonCompare.innerText = 'Porovnání 4 a 20000';
buttonCompare.setAttribute('id', 'task-2');
buttonCompare.addEventListener('click', () => {
compare(4,20000);
});
tasks.appendChild(buttonCompare);

const buttonCompare2 = document.createElement('button');
buttonCompare2.innerText = 'Porovnání 400 a 60';
buttonCompare2.setAttribute('id', 'task-2');
buttonCompare2.addEventListener('click', () => {
compare(400,60);
});
tasks.appendChild(buttonCompare2);

const buttonCompare3 = document.createElement('button');
buttonCompare3.innerText = 'Porovnání 5 a 5';
buttonCompare3.setAttribute('id', 'task-2');
buttonCompare3.addEventListener('click', () => {
compare(5,5);
});
tasks.appendChild(buttonCompare3);





/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const cycle = () => {
    i = 0
    while (i <= 730)
    {
        var result = document.createElement('p');
        result.innerText = i;
        result.setAttribute('id', 'result-3');
        results.appendChild(result);
        i += 13;
    }
}

const buttonCycle = document.createElement('button');
buttonCycle.innerText = 'Cyklon 13';
buttonCycle.setAttribute('id', 'task-3');
buttonCycle.addEventListener('click', () => {
cycle();
});
tasks.appendChild(buttonCycle);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const circle = (radius) => {
    var value = Math.PI * (radius * radius);
    var result = document.createElement('p');
        result.innerText = value;
        result.setAttribute('id', 'result-4');
        results.appendChild(result);
};

const buttonCircle = document.createElement('button');
buttonCircle.innerText = 'Cirkus';
buttonCircle.setAttribute('id', 'task-4');
buttonCircle.addEventListener('click', () => {
circle(10);
});
tasks.appendChild(buttonCircle);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const cone = (radius, height) => {
    return value = (Math.PI * (radius * radius) * height) / 3;
};

const buttonCone = document.createElement('button');
buttonCone.innerText = 'Cone';
buttonCone.setAttribute('id', 'task-5');
buttonCone.addEventListener('click', () => {
makeText(cone(10,70),"result-5");
});
tasks.appendChild(buttonCone);



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const buttonIsTriangle = document.createElement('button');
buttonIsTriangle.innerText = 'Is Triangle?';
buttonIsTriangle.setAttribute('id', 'task-6');
buttonIsTriangle.addEventListener('click', () => {
makeText(isTriangle(10,70,20), 'result-6');
});
tasks.appendChild(buttonIsTriangle);

const isTriangle = (a, b, c) => {
    return (a + b > c && a + c > b && b + c > a);
};



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

const justGiveMeSomethingForThePainAndLetMeDie = (a,b,c) =>{
    if (!isTriangle(a, b, c)) {
        return "Not a triangle my man";
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return area;
}
const buttonHeron = document.createElement('button');
buttonHeron.innerText = 'Heron time';
buttonHeron.setAttribute('id', 'task-7');
buttonHeron.addEventListener('click', () => {
makeText(justGiveMeSomethingForThePainAndLetMeDie(10,10,10), 'result-7');
});
tasks.appendChild(buttonHeron);

