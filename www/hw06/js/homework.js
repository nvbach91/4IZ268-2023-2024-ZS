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

const birthYear = 2000;
const currentYear = 2023;
const age = currentYear - birthYear;
console.log(`Pepe is ${age} years old.`);



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
// Celsius to Fahrenheit

const celsius_1 = 20;
const fahrenheit_1 = (celsius_1 * 9 / 5) + 32;
console.log(`${celsius_1}°C = ${fahrenheit_1}°F`);


const fahrenheit_2 = 68;
const celsius_2 = (fahrenheit_2 - 32) * 5 / 9;
console.log(`${fahrenheit_2}°F = ${celsius_2}°C`);




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


function calculateAge(a) {
    const currentYear = 2023;
    const age = currentYear - a;
    return `Pepe is ${age} years old.`;
  }

  function createAgeButton(a) {
    taskName = `Calculate Pepe's age if he's born in ${a}`;
    createButton_1a(taskName, calculateAge, a)
  }

  function createButton_1a(taskName, func, a) {
    const button = document.createElement('button');
    button.innerText = taskName;
    const tasks = document.querySelector('#tasks');
    tasks.appendChild(button);
  
    button.addEventListener('click', () => {
      const result = func(a);
      displayResult_1a(result);
    });
  }
  
createAgeButton(2000); 

  function displayResult_1a(result) {
    const results = document.querySelector('#results');
    results.innerText = result;
  }
  
  function celsiusToFahrenheit(celsius) {
    const fahrenheit = (celsius * 9 / 5) + 32;
    return`${celsius}°C = ${fahrenheit}°F`;
  }
  function createCelsiusButton(celsius) {
    taskName = `Convert ${celsius}°C to F`;
    createButton_1b(taskName, celsiusToFahrenheit, celsius)
  }

  function createButton_1b(taskName, func, celsius) {
    const button = document.createElement('button');
    button.innerText = taskName;
    const tasks = document.querySelector('#tasks');
    tasks.appendChild(button);
  
    button.addEventListener('click', () => {
      const result = func(celsius);
      displayResult_1b(result);
    });
  }
  
createCelsiusButton(27); 

  function displayResult_1b(result) {
    const results = document.querySelector('#results');
    results.innerText = result;
  }

  function fahrenheitToCelsius(farenheit) {
    const celsius_2 = (farenheit - 32) * 5 / 9;
    return`${farenheit}°F = ${celsius_2}°C`;
  }

  function createFarenheitButton(farenheit) {
    taskName = `Convert ${farenheit}F to °C`;
    createButton_1c(taskName, celsiusToFahrenheit, farenheit)
  }

  function createButton_1c(taskName, func, farenheit) {
    const button = document.createElement('button');
    button.innerText = taskName;
    const tasks = document.querySelector('#tasks');
    tasks.appendChild(button);
  
    button.addEventListener('click', () => {
      const result = func(farenheit);
      displayResult_1c(result);
    });
  }
  
createFarenheitButton(90); 

  function displayResult_1c(result) {
    const results = document.querySelector('#results');
    results.innerText = result;
  }
  

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

function calculatePercentage(a, b) {
  if (b === 0) {
    return "Cannot divide by zero!";
  }
  const percentage = ((a / b) * 100).toFixed(2);
  return `${a} is ${percentage}% of ${b}`;
}

function createButton_2(taskName, func, argument1, argument2) {
  const button = document.createElement('button');
  button.innerText = taskName;
  const tasks = document.querySelector('#tasks');
  tasks.appendChild(button);

  button.addEventListener('click', () => {
    const result = func(argument1, argument2);
    displayResult_2(result);
  });
}

createButton_2("Calculate Percentage", calculatePercentage, 21, 42);

function displayResult_2(result) {
  const results = document.querySelector('#results');
  results.innerText = result;
}

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here

function compareNumbers(a, b) {
  if (a > b) {
    return `${a} is greater than ${b}`;
  } else if (b > a) {
    return `${b} is greater than ${a}`;
  } else {
    return `${a} and ${b} are equal`;
  }
}
function createComparisonButton(a, b) {
  const taskName = `${a} vs. ${b}`;
  createButton_3(taskName, compareNumbers, a, b);
}

function createButton_3(taskName, func, a, b) {
  const button = document.createElement('button');
  button.innerText = taskName;
  const tasks = document.querySelector('#tasks');
  tasks.appendChild(button);

  button.addEventListener('click', () => {
    const result = func(a, b);
    displayResult_3(result);
  });
}

createComparisonButton(5, 10);
createComparisonButton(3.5, 2.7);
createComparisonButton(1/3, 2/6);
createComparisonButton(-5, -10);

function displayResult_3(result) {
  const results = document.querySelector('#results');
  results.innerText = result;
}

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
function multiplesOf13ToPage() {
  let result = "";
  for (let i = 0; i <= 730; i += 13) {
    result += `${i}, `;
  }
  return result;
}


function createButton_4(taskName, func) {
  const button = document.createElement('button');
  button.innerText = taskName;
  const tasks = document.querySelector('#tasks');
  tasks.appendChild(button);

  button.addEventListener('click', () => {
    const result = func();
    displayResult_4(result);
  });
  
}

createMultiplesButton();

function displayResult_4(result) {
  const results = document.querySelector('#results');
  results.innerText = result;
}

function createMultiplesButton() {
  const taskName = "Multiples of 13";
  createButton_4(taskName, multiplesOf13ToPage);
}

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

function calculateCircleArea(radius) {
  const area = Math.PI * Math.pow(radius, 2);
  return `The area of the circle with a radius of ${radius} is ${area.toFixed(2)}`;
}

function createCircleAreaButton(radius) {
  const taskName = `Calculate area of the circle with radius of ${radius}`;
  createButton_5(taskName, calculateCircleArea, radius);
}

function createButton_5(taskName, func, radius) {
  const button = document.createElement('button');
  button.innerText = taskName;
  const tasks = document.querySelector('#tasks');
  tasks.appendChild(button);

  button.addEventListener('click', () => {
    const result = func(radius);
    displayResult_5(result);
  });
}

createCircleAreaButton(5);

function displayResult_5(result) {
  const results = document.querySelector('#results');
  results.innerText = result;
}


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

function calculateCone(radius, height) {
  const volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
  return `The volume of the cone with a radius of ${radius} and height of ${height} is ${volume.toFixed(2)}`;
}

function createConeButton(radius, height) {
  const taskName = `Calculate volume of the cone with radius of ${radius} and height of ${height}`;
  createButton_6(taskName, calculateCone, radius, height);
}

function createButton_6(taskName, func, radius, height) {
  const button = document.createElement('button');
  button.innerText = taskName;
  const tasks = document.querySelector('#tasks');
  tasks.appendChild(button);

  button.addEventListener('click', () => {
    const result = func(radius, height);
    displayResult_6(result);
  });
}


createConeButton(5, 10);

function displayResult_6(result) {
  const results = document.querySelector('#results');
  results.innerText = result;
}



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

function isTriangle(a, b, c) {
  if (a + b > c && a + c > b && b + c > a) {
    return `Yes, it can form a triangle.`;
  } else {
    return `No, it cannot form a triangle.`;
  }
}

function createTriangleButton(a, b, c) {
  const taskName = `Is it possible to form triangle with ${a}, ${b}, ${c}`;
  createButton_7(taskName, isTriangle, a, b, c);
}

function createButton_7(taskName, func, a, b, c) {
  const button = document.createElement('button');
  button.innerText = taskName;
  const tasks = document.querySelector('#tasks');
  tasks.appendChild(button);

  button.addEventListener('click', () => {
    const result = func(a, b, c);
    displayResult_7(result);
  });
}

createTriangleButton(5, 10, 8);

function displayResult_7(result) {
  const results = document.querySelector('#results');
  results.innerText = result;
}

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


function calculateHeron(a, b, c) {

  if (isTriangle(a, b, c)) {
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return `The area of the triangle is ${area.toFixed(2)}`;
  } else {
    return 'These sides cannot form a triangle.';
  }
}

function createHeronButton(a, b, c) {
  const taskName = `Calculate triangle's area with sides ${a}, ${b}, ${c} using Heron's formula`;
  createButton_8(taskName, isTriangle, a, b, c);
}

function createButton_8(taskName, func, a, b, c) {
  const button = document.createElement('button');
  button.innerText = taskName;
  const tasks = document.querySelector('#tasks');
  tasks.appendChild(button);

  button.addEventListener('click', () => {
    const result = func(a, b, c);
    displayResult_8(result);
  });
}

createHeronButton(5, 10, 8);

function displayResult_8(result) {
  const results = document.querySelector('#results');
  results.innerText = result;
}







