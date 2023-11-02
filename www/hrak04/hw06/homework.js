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

const pepesAge = 2000;
const thisYear = new Date().getFullYear();

console.log(`Pepa má ${thisYear - pepesAge} let`);



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

const celsiusValue = 30;
const fahrenheitValue = 70;

const convertedCelsiusToFahrenheit = celsiusValue * 9 / 5 + 32;
const convertedFahrenheitToCelsius = (fahrenheitValue - 32) * 5 / 9;

console.log(`${celsiusValue}°C = ${convertedCelsiusToFahrenheit.toFixed(2)}°F`);
console.log(`${fahrenheitValue}°F = ${convertedFahrenheitToCelsius.toFixed(2)}°C`);


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


//get age
const getAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    console.log(`Věk: ${age} let`);
};

const buttonCalculateAge = document.createElement('button');
buttonCalculateAge.innerText = 'Vypočítej věk';
buttonCalculateAge.setAttribute('id', 'task-1');
buttonCalculateAge.addEventListener('click', () => {
  const birthYear = prompt('Zadejte rok narození:');
  if (birthYear !== null) {
    getAge(Number(birthYear));
  }
});

const tasks = document.querySelector('#tasks');
tasks.appendChild(buttonCalculateAge);


//celsius to fahreheit
const convertCelsiusToFahrenheit = (celsius) => {
    const fahrenheit = (celsius * 9) / 5 + 32;
    console.log(`${celsius}°C je ${fahrenheit}°F`);
};

const buttonConvertCelsiusToFahrenheit = document.createElement('button');
buttonConvertCelsiusToFahrenheit.innerText = 'Převeď C na F';
buttonConvertCelsiusToFahrenheit.setAttribute('id', 'task-2');
buttonConvertCelsiusToFahrenheit.addEventListener('click', () => {
    const celsius = prompt('Zadejte teplotu v Celsiu:');
    if (celsius !== null) {
    convertCelsiusToFahrenheit(Number(celsius));
    }
});

tasks.appendChild(buttonConvertCelsiusToFahrenheit);


//fahrenheit to celsius
const convertFahrenheitToCelsius = (fahrenheit) => {
const celsius = ((fahrenheit - 32) * 5) / 9;
console.log(`${fahrenheit}°F je ${celsius}°C`);
};

const buttonConvertFahrenheitToCelsius = document.createElement('button');
buttonConvertFahrenheitToCelsius.innerText = 'Převeď F na C';
buttonConvertFahrenheitToCelsius.setAttribute('id', 'task-3');
buttonConvertFahrenheitToCelsius.addEventListener('click', () => {
const fahrenheit = prompt('Zadejte teplotu ve Fahrenheit:');
if (fahrenheit !== null) {
    convertFahrenheitToCelsius(Number(fahrenheit));
}
});

tasks.appendChild(buttonConvertFahrenheitToCelsius);


getAge(1980);
getAge(2008);

convertCelsiusToFahrenheit(25);
convertCelsiusToFahrenheit(37);

convertFahrenheitToCelsius(77);
convertFahrenheitToCelsius(50);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const resultsDiv = document.getElementById('results');

const calculatePercentage = (a, b) => {
    if (b === 0) {
      return 'Chyba: Dělení nulou!';
    }
    const percentage = (a / b) * 100;
    return `Podil cisla ${a} z cisla ${b} je ${(a / b * 100).toFixed(2)}%`;
  };

const buttonCalculatePercentage = document.createElement('button');
buttonCalculatePercentage.innerText = 'Vypočítej procentuální podíl';
buttonCalculatePercentage.setAttribute('id', 'task-4');
buttonCalculatePercentage.addEventListener('click', () => {
  const numerator = prompt('Zadejte čitatel:');
  const denominator = prompt('Zadejte jmenovatel:');
  if (numerator !== null && denominator !== null) {
    const result = calculatePercentage(Number(numerator), Number(denominator));
    resultsDiv.textContent = result;
  }
});

tasks.appendChild(buttonCalculatePercentage);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
const tasksDiv = document.getElementById('tasks');


const compareNumbers = (num1, num2) => {
    if (num1 > num2) {
        return `${num1} je větší než ${num2}`;
    } else if (num1 < num2) {
        return `${num1} je menší než ${num2}`;
    } else {
        return `${num1} a ${num2} se rovnají`;
    }
};

  
const createComparisonButton = (num1, num2) => {
const button = document.createElement('button');
button.innerText = `Porovnej ${num1} a ${num2}`;
button.addEventListener('click', () => {
        const result = compareNumbers(num1, num2);
        resultsDiv.textContent = result;
    });
    tasksDiv.appendChild(button);
};

createComparisonButton(5, 3);
createComparisonButton(2.5, 3.5);
createComparisonButton(1/3, 1/4);
createComparisonButton(7, 7);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const printMultiplesOf13 = () => {
    let result = '';
    for (let i = 0; i <= 730; i += 13) {
      result += i + ' ';
    }
    return result.trim();
};

const buttonPrintMultiplesOf13 = document.createElement('button');
buttonPrintMultiplesOf13.innerText = 'Vypiš násobky 13';
buttonPrintMultiplesOf13.setAttribute('id', 'task-6');
buttonPrintMultiplesOf13.addEventListener('click', () => {
  const result = printMultiplesOf13();
  resultsDiv.textContent = result;
});

tasksDiv.appendChild(buttonPrintMultiplesOf13);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here

const calculateCircleArea = (radius) => {
    const area = Math.PI * radius * radius;
    return `Obsah kruhu s poloměrem ${radius} je ${area.toFixed(2)}`;
};

const createCircleAreaButton = (radius) => {
    const button = document.createElement('button');
    button.innerText = `Vypočítej obsah kruhu s poloměrem ${radius}`;
    button.addEventListener('click', () => {
      const result = calculateCircleArea(radius);
      resultsDiv.textContent = result;
    });
    tasksDiv.appendChild(button);
  };
  
createCircleAreaButton(5);
createCircleAreaButton(10);
createCircleAreaButton(15);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here


const calculateConeVolume = (radius, height) => {
    const volume = (1/3) * Math.PI * radius * radius * height;
    return `Objem kuželu s poloměrem ${radius} a výškou ${height} je ${volume.toFixed(2)}`;
  };

const createConeVolumeButton = (radius, height) => {
const button = document.createElement('button');
button.innerText = `Vypočítej objem kuželu s poloměrem ${radius} a výškou ${height}`;
button.addEventListener('click', () => {
        const result = calculateConeVolume(radius, height);
        resultsDiv.textContent = result;
    });
    tasksDiv.appendChild(button);
};

createConeVolumeButton(5, 10);
createConeVolumeButton(7, 14);
createConeVolumeButton(3, 6);
  

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
    if (a + b > c && a + c > b && b + c > a) {
      console.log(`Ze stran ${a}, ${b} a ${c} lze postavit trojúhelník: Ano`);
      return true;
    } else {
      console.log(`Ze stran ${a}, ${b} a ${c} lze postavit trojúhelník: Ne`);
      return false;
    }
  };

  
const createTriangleButton = (a, b, c) => {
const button = document.createElement('button');
button.innerText = `Je trojúhelník ze stran ${a}, ${b} a ${c}?`;
button.addEventListener('click', () => {
        const result = isTriangle(a, b, c);
        resultsDiv.textContent = `Ze stran ${a}, ${b} a ${c} lze postavit trojúhelník: ${result ? 'Ano' : 'Ne'}`;
    });
    tasksDiv.appendChild(button);
};

createTriangleButton(3, 4, 5);
createTriangleButton(1, 10, 12);
createTriangleButton(5, 6, 7);
  

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

const calculateTriangleArea = (a, b, c) => {
    if (!isTriangle(a, b, c)) {
      return 'Zadané strany netvoří trojúhelník';
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return `Obsah trojúhelníka se stranami ${a}, ${b}, ${c} je ${area.toFixed(2)}`;
  };
  

const createTriangleAreaButton = (a, b, c) => {
    const button = document.createElement('button');
    button.innerText = `Vypočítej obsah trojúhelníka se stranami ${a}, ${b}, ${c}`;
    button.addEventListener('click', () => {
      const result = calculateTriangleArea(a, b, c);
      resultsDiv.textContent = result;
    });
    tasksDiv.appendChild(button);
};
  
  createTriangleAreaButton(3, 4, 5);
  createTriangleAreaButton(1, 10, 12);
  createTriangleAreaButton(5, 6, 7);
