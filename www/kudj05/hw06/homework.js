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
console.log("Ahoj světe");

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here

const person1 = {
    name: 'Pepa',
    birthYear: 2002
};

person1.age = new Date().getFullYear() - person1.birthYear;

console.log(person1.name + " is " + person1.age + " years old");




/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here

temperatureCelsius1 = 20;
temperatureFarenheit1 = (temperatureCelsius1 * 9)/5 + 32;

temperatureFarenheit2 = 68;
temperatureCelsius2 = ((temperatureFarenheit2 - 32)* 5)/9;

console.log(temperatureCelsius1 + "°C = " + temperatureFarenheit1 + "°F");
console.log(temperatureFarenheit2 + "°F = " + temperatureCelsius2 + "°C");


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
const excercise3 = document.createElement('h3');
excercise3.textContent = "3) Funkce function fonction funktio";
document.body.appendChild(excercise3);


const getPepesAge = (yearOfBirth) => {
    yearOfBirth = parseInt(yearOfBirth);
    return "Pepa is " + (new Date().getFullYear() - yearOfBirth) + " years old";
};

const getFarenheit = (celsius) => {
    celsius = parseFloat(celsius);
    return ((celsius * 9)/5 + 32).toFixed(2);
};

const getCelsius = (farenheit) => {
    farenheit = parseFloat(farenheit);
    return (((farenheit - 32)* 5)/9).toFixed(2);
};

const ageInput = document.createElement('input');
ageInput.type = "text";
ageInput.placeholder = "Enter year of birth";

const buttonPepesAge = document.createElement('button');
buttonPepesAge.innerText = "How old is Pepa?";
buttonPepesAge.setAttribute('id', 'pepe-age');

const ageResult = document.createElement('h2');

buttonPepesAge.addEventListener('click', () => {
    ageResult.textContent = getPepesAge(ageInput.value);
});

document.body.appendChild(ageInput);
document.body.appendChild(buttonPepesAge);
document.body.appendChild(ageResult);


const temperatureInput = document.createElement('input');
temperatureInput.type = "text";
temperatureInput.placeholder = "Enter"

const getCelsiusButton = document.createElement('button');
getCelsiusButton.innerText = "Convert to °C";
getCelsiusButton.setAttribute('id', 'celsius-btn');


const getFarenheitButton = document.createElement('button');
getFarenheitButton.innerText = "Convert to °F";
getFarenheitButton.setAttribute('id', 'farenheit-btn');


const temperatureResult = document.createElement('h2');

getCelsiusButton.addEventListener('click', () => {
    temperatureResult.textContent = getCelsius(temperatureInput.value);
});

getFarenheitButton.addEventListener('click', () => {
    temperatureResult.textContent = getFarenheit(temperatureInput.value);
});

document.body.appendChild(temperatureInput);
document.body.appendChild(getCelsiusButton);
document.body.appendChild(getFarenheitButton);
document.body.appendChild(temperatureResult);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
const excercise4 = document.createElement('h3');
excercise4.textContent = "4) %CENSORED%";
document.body.appendChild(excercise4);


const getDivision = (num1, num2) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (num2 === 0) {
        return "Nelze dělit nulou!";
      } else {
        let result = (num1 / num2) * 100;
        return num1 + " je " + result.toFixed(2) + "% z " + num2 + ".";
      }
};

const num1Input4 = document.createElement('input');
num1Input4.type = "text";
num1Input4.placeholder = "Number 1"

const num2Input4 = document.createElement('input');
num2Input4.type = "text";
num2Input4.placeholder = "Number 2"

const getDivisionButton = document.createElement('button');
getDivisionButton.innerText = "Divide";
getDivisionButton.setAttribute('id', 'division-btn');

const divisionResult = document.createElement('h2');

getDivisionButton.addEventListener('click', () => {
    divisionResult.textContent = getDivision(num1Input4.value, num2Input4.value);
});

document.body.appendChild(num1Input4);
document.body.appendChild(num2Input4);
document.body.appendChild(getDivisionButton);
document.body.appendChild(divisionResult);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného 
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají. 
 * 
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v 
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
const excercise5 = document.createElement('h3');
excercise5.textContent = "5) Kdo s koho";
document.body.appendChild(excercise5);

const getGreater = (num1, num2) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (num1 > num2) {
      return num1 + " is greater than " + num2;
    } else if (num1 < num2) {
      return num2 + " is greater than " + num1;
    } else {
      return "Numbers are equal";
    }
  };

  const num1Input5 = document.createElement('input');
  num1Input5.type = "text";
  num1Input5.placeholder = "Number 1"
  
  const num2Input5 = document.createElement('input');
  num2Input5.type = "text";
  num2Input5.placeholder = "Number 2"
  
  const getGreaterButton = document.createElement('button');
  getGreaterButton.innerText = "Get greater number";
  getGreaterButton.setAttribute('id', 'greater-btn');
  
  const greaterResult = document.createElement('h2');
  
  getGreaterButton.addEventListener('click', () => {
    greaterResult.textContent = getGreater(num1Input5.value, num2Input5.value);
  });

document.body.appendChild(num1Input5);
document.body.appendChild(num2Input5);
document.body.appendChild(getGreaterButton);
document.body.appendChild(greaterResult);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here

const excercise6 = document.createElement('h3');
excercise6.textContent = "6) I can cleary see the pattern";
document.body.appendChild(excercise6);

const getMultiples = () => {
    let res = "";
    for (var i = 0; i <= 730; i += 13) {
      res += i + " ";
    }
    return res;
  };

  const getMultiplesButton = document.createElement('button');
  getMultiplesButton.innerText = "Get multiples of 13 <= 730";
  getMultiplesButton.setAttribute('id', 'multiples-btn');
  
  const multiplesResult = document.createElement('h2');
  
  getMultiplesButton.addEventListener('click', () => {
    multiplesResult.textContent = getMultiples();
  });

  document.body.appendChild(getMultiplesButton);
  document.body.appendChild(multiplesResult);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const excercise7 = document.createElement('h3');
excercise7.textContent = "7) Around and about";
document.body.appendChild(excercise7);

const getCircleArea = (radius) => {
    radius = parseFloat(radius);
    return (Math.PI * radius**2).toFixed(2);
};

const circleRadiusInput = document.createElement('input');
circleRadiusInput.type = "text";
circleRadiusInput.placeholder = "Enter radius";

const getCircleAreaBtn = document.createElement('button');
getCircleAreaBtn.innerText = "Get Circle Area";
getCircleAreaBtn.setAttribute('id', 'area-btn');

const circleAreaResult = document.createElement('h2');

getCircleAreaBtn.addEventListener('click', () => {
    circleAreaResult.textContent = getCircleArea(circleRadiusInput.value);
});

document.body.appendChild(circleRadiusInput);
document.body.appendChild(getCircleAreaBtn);
document.body.appendChild(circleAreaResult);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const excercise8 = document.createElement('h3');
excercise8.textContent = "8) Another dimension";
document.body.appendChild(excercise8);

const getConeVolume = (height, radius) => {
    height = parseFloat(height);
    radius = parseFloat(radius);
    return (Math.PI * radius**2)*height / 3;
};

const coneRadiusInput = document.createElement('input');
coneRadiusInput.type = "text";
coneRadiusInput.placeholder = "Enter radius";

const coneHeightInput = document.createElement('input');
coneHeightInput.type = "text";
coneHeightInput.placeholder = "Enter height";

const getConeVolumeBtn = document.createElement('button');
getConeVolumeBtn.innerText = "Get Cone Volume";
getConeVolumeBtn.setAttribute('id', 'volume-btn');

const coneVolumeResult = document.createElement('h2');

getConeVolumeBtn.addEventListener('click', () => {
    coneVolumeResult.textContent = getConeVolume(coneRadiusInput.value, coneHeightInput.value);
});

document.body.appendChild(coneRadiusInput);
document.body.appendChild(coneHeightInput);
document.body.appendChild(getConeVolumeBtn);
document.body.appendChild(coneVolumeResult);


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const excercise9 = document.createElement('h3');
excercise9.textContent = "9) Not sure if triangle, or just some random values";
document.body.appendChild(excercise9);

const isTriangle = (a, b, c) => {
    a = parseFloat(a);
    b = parseFloat(b);
    c = parseFloat(c);

    if (a + b > c && a + c > b && b + c > a) {
        return true;
      } else {
        return false;
      }
};

const triangleASideInput = document.createElement('input');
triangleASideInput.type = "text";
triangleASideInput.placeholder = "Enter a";

const triangleBSideInput = document.createElement('input');
triangleBSideInput.type = "text";
triangleBSideInput.placeholder = "Enter b";

const triangleCSideInput = document.createElement('input');
triangleCSideInput.type = "text";
triangleCSideInput.placeholder = "Enter c";

const isTriangleBtn = document.createElement('button');
isTriangleBtn.innerText = "Is it a triangle?";
isTriangleBtn.setAttribute('id', 'triangle-btn');

const triangleResult = document.createElement('h2');

isTriangleBtn.addEventListener('click', () => {
    triangleResult.textContent = isTriangle(triangleASideInput.value, triangleBSideInput.value, triangleCSideInput.value);
});

document.body.appendChild(triangleASideInput);
document.body.appendChild(triangleBSideInput);
document.body.appendChild(triangleCSideInput);
document.body.appendChild(isTriangleBtn);
document.body.appendChild(triangleResult);


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

const excercise10 = document.createElement('h3');
excercise10.textContent = "10) Heroic performance";
document.body.appendChild(excercise10);

const getTriangleArea = (a, b, c) => {
    let s = a + b + c;
    return Math.sqrt(s*(s-a) * (s-b) * (s-c)).toFixed(2);
};

const triangleAreaBtn = document.createElement('button');
triangleAreaBtn.innerText = "Get Triangle's Area";
triangleAreaBtn.setAttribute('id', 'triangle2-btn');

const triangleAreaResult = document.createElement('h2');

triangleAreaBtn.addEventListener('click', () => {
    if(!isTriangle(triangleASideInput.value, triangleBSideInput.value, triangleCSideInput.value)){
        console.error("Not a triangle");
    }else{
        triangleAreaResult.textContent = getTriangleArea(triangleASideInput.value, triangleBSideInput.value, triangleCSideInput.value);
    }
});

document.body.appendChild(triangleAreaBtn);
document.body.appendChild(triangleAreaResult);
