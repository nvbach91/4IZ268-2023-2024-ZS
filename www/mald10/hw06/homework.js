/* HOMEWORK */
/**
 * 0) Pre-preparacion.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!"
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou "tasks" - <div id="tasks"></div>). 
 * - Na stránce vytvořte místo pro výpis výsledků úkolů (div, který má id s hodnotou "result" - <div id="results"></div>).
 *
 * - Připojte tento homework.js soubor k vytvořené HTML stránce pomocí tagu <script>(viz LAB) a vyzkoušejte
 * console.log('Ahoj světe');
 */

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const pepeBorn = 2000;
let year =  new Date().getFullYear();
const pepeAge = year - pepeBorn;


console.log("Pepe was born in " + pepeBorn + " so he is " + pepeAge + " years old." );



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
let tempCel1 = 30;
let tempFar1 = (tempCel1*9/5)+32;
let tempFar2 = 50;
let tempCel2 = (tempFar2-32)*5/9;

console.log(tempCel1 +"°C = " + tempFar1 + "°F");
console.log(tempFar2 +"°F = " + tempCel2 + "°C");



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

const PepesAge = (born) => {
let year =  new Date().getFullYear();
const age = year - born;
const result = "Pepe was born in " + born + " so he is " + age + " years old.";
    return result;
  };

const CelsiusToF = (c) => {
    const f = (c*9/5)+32;
    const result = c +"°C = " + f + "°F";
    return result;
  };

  const FToCelsius = (f) => {
    const c = (f-32)*5/9;
    const result = f +"°F = " + c + "°C";
    return result;
  };

  const tasksDiv = document.querySelector("#tasks");
  //Tlacitko pepesAge a input area

  const inputPepe = document.createElement('input');
  inputPepe.setAttribute('id', 'pepeInput');
  inputPepe.setAttribute('type', 'number');
  tasksDiv.appendChild(inputPepe);

  const buttonPepeAge = document.createElement('button');
  buttonPepeAge.innerText = 'PepesAge';
  buttonPepeAge.setAttribute('id', 'task-1');
  buttonPepeAge.addEventListener('click', () => {
  resultsLabel.textContent = PepesAge(inputPepe.value);
  });
tasksDiv.appendChild(buttonPepeAge);
tasksDiv.appendChild(document.createElement('br'));

  //Label s vysledkem
  const resultsLabel = document.createElement('label');
  resultsLabel.textContent = "Result will be displayed here";
  resultsLabel.setAttribute("id", "result-label");
  document.querySelector("#results").appendChild(resultsLabel);

  //zmena jednotek

const inputCF = document.createElement('input');
  inputCF.setAttribute('id', 'CF-input');
  inputCF.setAttribute('type', 'number');
  tasksDiv.appendChild(inputCF);

  const buttonCF = document.createElement('button');
  buttonCF.innerText = 'Celsius to F';
  buttonCF.setAttribute('id', 'task-2-1');
  buttonCF.addEventListener('click', () => {
  resultsLabel.textContent = CelsiusToF(inputCF.value);
  });
tasksDiv.appendChild(buttonCF);
tasksDiv.appendChild(document.createElement('br'));

const inputFC = document.createElement('input');
  inputFC.setAttribute('id', 'FC-input');
  inputFC.setAttribute('type', 'number');
  tasksDiv.appendChild(inputFC);

const buttonFC = document.createElement('button');
  buttonFC.innerText = 'Celsius to F';
  buttonFC.setAttribute('id', 'task-2-2');
  buttonFC.addEventListener('click', () => {
  resultsLabel.textContent = CelsiusToF(inputFC.value);
  });
  
  tasksDiv.appendChild(buttonFC);
tasksDiv.appendChild(document.createElement('br'));

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
const divide = (a, b) => {
    if(b == 0){
        const result = "You cant divide by 0";
        return result;
    }

    const percRes = (a / b * 100).toFixed(2);
    const result = a + " is " + percRes + "% of number " + b;
    return result;
}

const input4_1 = document.createElement('input');
  input4_1.setAttribute('id', '4-1-input');
  input4_1.setAttribute('type', 'number');
  tasksDiv.appendChild(input4_1);

  const input4_2 = document.createElement('input');
  input4_2.setAttribute('id', '4-2-input');
  input4_2.setAttribute('type', 'number');
  tasksDiv.appendChild(input4_2);

  const buttonDivide = document.createElement('button');
  buttonDivide.innerText = 'Divide';
  buttonDivide.setAttribute('id', 'task-4');
  buttonDivide.addEventListener('click', () => {
  resultsLabel.textContent = divide(input4_1.value, input4_2.value);
  });
tasksDiv.appendChild(buttonDivide);
tasksDiv.appendChild(document.createElement('br'));



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

const isEqual = (a, b) => {
    if(a == b){
        const result = a + " is equal to " + b;
        return result;
    }
    if(a > b){
        const result = a + " is larger than " + b;
        return result;
    }
   const result = a + " is smaller than " + b;
   return result;
    }

  const buttonEqual1 = document.createElement('button');
  buttonEqual1.innerText = '20 equal 15';
  buttonEqual1.setAttribute('id', 'task-5-1');
  buttonEqual1.addEventListener('click', () => {
  resultsLabel.textContent = isEqual(20, 15);
  });
tasksDiv.appendChild(buttonEqual1);

const buttonEqual2 = document.createElement('button');
  buttonEqual2.innerText = '1/5 equal 2/5';
  buttonEqual2.setAttribute('id', 'task-5-2');
  buttonEqual2.addEventListener('click', () => {
  resultsLabel.textContent = isEqual(1/5, 2/5);
  });
tasksDiv.appendChild(buttonEqual2);

const buttonEqual3 = document.createElement('button');
  buttonEqual3.innerText = '20.666 equal 20.666';
  buttonEqual3.setAttribute('id', 'task-5-3');
  buttonEqual3.addEventListener('click', () => {
  resultsLabel.textContent = isEqual(20.666, 20.666);
  });
tasksDiv.appendChild(buttonEqual3);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const m13 = () => {
    let result = "";
    for (let a = 0; a < 730;){
        result += a + " ";
        a = a + 13;
    }  
    return result;
}
 
const buttonm13 = document.createElement('button');
  buttonm13.innerText = 'multiples 13 up to 730';
  buttonm13.setAttribute('id', 'task-6');
  buttonm13.addEventListener('click', () => {
  resultsLabel.textContent = m13();
  });
tasksDiv.appendChild(buttonm13);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const circleContent = (r) => {
    const pi = 3.14;
    const result = "Obsah kružnice o poloměru " + r + " je " + (pi*r*r);
    return result;
}
 
const buttonCircle = document.createElement('button');
  buttonCircle.innerText = 'content of circle of 6 radius';
  buttonCircle.setAttribute('id', 'task-7');
  buttonCircle.addEventListener('click', () => {
  resultsLabel.textContent = circleContent(6);
  });
tasksDiv.appendChild(buttonCircle);



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const conVolume = (r, h) => {
    const pi = 3.14;
    const result = pi*r*r*h;
    return result;
}

const buttonCon = document.createElement('button');
  buttonCon.innerText = 'content of con of 6 radius and 5 height';
  buttonCon.setAttribute('id', 'task-8');
  buttonCon.addEventListener('click', () => {
  resultsLabel.textContent = conVolume(6, 5);
  });
tasksDiv.appendChild(buttonCon);



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const isTriangle = (a,b,c) => {
    if(a + b > c && a + c > b && b + c > a ){
        return true;
    }   
        return false;
}

const buttonTriangle = document.createElement('button');
  buttonTriangle.innerText = 'is 8 6 8 a triangle?';
  buttonTriangle.setAttribute('id', 'task-9');
  buttonTriangle.addEventListener('click', () => {
  resultsLabel.textContent = isTriangle(8,6,8);
  });
tasksDiv.appendChild(buttonTriangle);




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
const heron = (a,b,c) => {
    if(isTriangle(a,b,c) == false){
        return "Is not valid triangle";
    }
    const s = (a + b + c) / 2;
    const triangleContent = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return triangleContent;
}

const buttonTriangleContent = document.createElement('button');
  buttonTriangleContent.innerText = 'content of 8 6 8 triangle?';
  buttonTriangleContent.setAttribute('id', 'task-10');
  buttonTriangleContent.addEventListener('click', () => {
  resultsLabel.textContent = heron(8,6,8);
  });
tasksDiv.appendChild(buttonTriangleContent);
// - krok 2 - vytvořte tlačítko
// - krok 3 - nabindujte na toto tlačítko callback, ve kterém zavoláte implementovanou funkci pro výpočet a výpis výsledků
// - krok 4 - tlačítko umístěte na stránku
// - krok 5 - otestujte řešení klikáním na tlačítko




