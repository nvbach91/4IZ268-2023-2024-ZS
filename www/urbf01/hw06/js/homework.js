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

console.log("---------")
console.log("1) Pepe's age")

const pepe = {
  name: "Pepe",
  surname: "Sailor",
  dateOfBirth: 1998,
  favouriteFood: "spinach",
}

const currentYear = new Date().getFullYear()
const age = currentYear - pepe.dateOfBirth

console.log("Pepe's age is " + age + " years.")

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
 */

console.log("---------")
console.log("2) WTF (wow, that's fun)")

const celsius = 20
const fahrenheit = 68

console.log(celsius + "°C = " + Number((celsius * 9) / 5 + 32) + "°F")
console.log(fahrenheit + "°F = " + Number(((fahrenheit - 32) * 5) / 9) + "°C")

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

console.log("---------")
console.log("3) Function fonction funktio")

const printPepesAge = (pepe) => {
  const currentYear = new Date().getFullYear()
  const age = currentYear - pepe.dateOfBirth

  console.log("Pepe's age is " + age + " years.")
}

const printTemperature = (celsius, fahrenheit) => {
  console.log(celsius + "°C = " + (celsius * 9) / 5 + 32 + "°F")
  console.log(fahrenheit + "°F = " + ((fahrenheit - 32) * 5) / 9 + "°C")
}

const pepe1 = {
  name: "Pepe",
  surname: "Swimmer",
  dateOfBirth: 2001,
  favouriteFood: "pizza",
}

const pepe2 = {
  name: "Pepe",
  surname: "Cook",
  dateOfBirth: 1974,
  favouriteFood: "goulash",
}

const fahrenheit1 = 32
const fahrenheit2 = 79
const celsius1 = 0
const celsius2 = -17

printPepesAge(pepe)
printPepesAge(pepe1)
printPepesAge(pepe2)

printTemperature(celsius, fahrenheit)
printTemperature(celsius1, fahrenheit1)
printTemperature(celsius2, fahrenheit2)

const buttonPepesAge = document.createElement("button")
buttonPepesAge.innerText = "Úloha 1 (Pepe's age)"
buttonPepesAge.setAttribute("id", "task-1")
buttonPepesAge.addEventListener("click", () => {
  printPepesAge(pepe)
})

const buttonWTF = document.createElement("button")
buttonWTF.innerText = "Úloha 2 (WTF (wow, that's fun)"
buttonWTF.setAttribute("id", "task-2")
buttonWTF.addEventListener("click", () => {
  printTemperature(celsius, fahrenheit)
})

const tasks = document.querySelector("#tasks")
const results = document.querySelector("#results")

tasks.appendChild(buttonPepesAge)
tasks.appendChild(buttonWTF)

console.log("---------")

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */

function calculatePercentage(a, b) {
  if (b === 0) {
    return "Nelze dělit nulou"
  }

  const percentage = (a / b) * 100
  return `${a} je ${percentage.toFixed(2)}% z ${b}`
}

const buttonCalculatePercentage = document.createElement("button")
buttonCalculatePercentage.innerText = "Úloha 4 (Calculate percentage)"
buttonCalculatePercentage.setAttribute("id", "task-4")
buttonCalculatePercentage.addEventListener("click", () => {
  results.innerHTML = calculatePercentage(580, 9428)
})

tasks.appendChild(buttonCalculatePercentage)

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */

function compareNumbers(a, b) {
  if (a === b) {
    return "Čísla se rovnají"
  }

  if (a > b) {
    return `${a} je větší než ${b}`
  }

  return `${b} je větší než ${a}`
}

const buttonCompareNumbers = document.createElement("button")
buttonCompareNumbers.innerText = "Úloha 5 (Kdo z koho)"
buttonCompareNumbers.setAttribute("id", "task-5")
buttonCompareNumbers.addEventListener("click", () => {
  results.innerHTML = compareNumbers(5902, 4528)
})

const buttonCompareNumbers2 = document.createElement("button")
buttonCompareNumbers2.innerText = "Úloha 5-2 (Kdo z koho)"
buttonCompareNumbers2.setAttribute("id", "task-5-2")
buttonCompareNumbers2.addEventListener("click", () => {
  results.innerHTML = compareNumbers(42.2, 42.2)
})

const buttonCompareNumbers3 = document.createElement("button")
buttonCompareNumbers3.innerText = "Úloha 5-3 (Kdo z koho)"
buttonCompareNumbers3.setAttribute("id", "task-5-3")
buttonCompareNumbers3.addEventListener("click", () => {
  results.innerHTML = compareNumbers(3 / 2, 1 / 2)
})

const buttonCompareNumbers4 = document.createElement("button")
buttonCompareNumbers4.innerText = "Úloha 5-4 (Kdo z koho)"
buttonCompareNumbers4.setAttribute("id", "task-5-4")
buttonCompareNumbers4.addEventListener("click", () => {
  results.innerHTML = compareNumbers(50 / 3, -13)
})

const buttonCompareNumbers5 = document.createElement("button")
buttonCompareNumbers5.innerText = "Úloha 5-5 (Kdo z koho)"
buttonCompareNumbers5.setAttribute("id", "task-5-5")
buttonCompareNumbers5.addEventListener("click", () => {
  results.innerHTML = compareNumbers(-9, -13)
})

tasks.appendChild(buttonCompareNumbers)
tasks.appendChild(buttonCompareNumbers2)
tasks.appendChild(buttonCompareNumbers3)
tasks.appendChild(buttonCompareNumbers4)
tasks.appendChild(buttonCompareNumbers5)

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for cyklus.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */

function printMultiplesOf13() {
  for (let i = 0; i <= 730; i = i + 13) {
    if (i === 0) results.innerHTML = i
    else results.innerHTML += " " + i
  }
}

const buttonMultiplesOf13 = document.createElement("button")
buttonMultiplesOf13.innerText = "Úloha 6 (I can cleary see the pattern)"
buttonMultiplesOf13.setAttribute("id", "task-6")
buttonMultiplesOf13.addEventListener("click", () => {
  printMultiplesOf13()
})

tasks.appendChild(buttonMultiplesOf13)

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

function calculateCircleArea(radius) {
  return Math.PI * radius ** 2
}

const buttonCircleArea = document.createElement("button")
buttonCircleArea.innerText = "Úloha 7 (Around and about)"
buttonCircleArea.setAttribute("id", "task-7")
buttonCircleArea.addEventListener("click", () => {
  results.innerHTML = calculateCircleArea(25)
})

tasks.appendChild(buttonCircleArea)

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

function calculateConeVolume(height, radius) {
  return (Math.PI * radius ** 2 * height) / 3
}

const buttonConeVolume = document.createElement("button")
buttonConeVolume.innerText = "Úloha 8 (Another dimension)"
buttonConeVolume.setAttribute("id", "task-8")
buttonConeVolume.addEventListener("click", () => {
  results.innerHTML = calculateConeVolume(14, 8)
})

tasks.appendChild(buttonConeVolume)

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek na argumentu funkce dá postavit trojúhelník, tj. vypíše tyto 3 délky stran a, b, a c
 * a výsledek buď ano/ne, true/yes nebo false/no. Z funkce vraťte hodnotu true/false
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

function isTriangle(a, b, c) {
  if (a + b > c && a + c > b && b + c > a) {
    return true
  }

  return false
}

const buttonIsTriangle = document.createElement("button")
buttonIsTriangle.innerText = "Úloha 9 (Not sure if triangle)"
buttonIsTriangle.setAttribute("id", "task-9")
buttonIsTriangle.addEventListener("click", () => {
  results.innerHTML = isTriangle(14, 12, 9)
    ? "Yes, it is a triangle!"
    : "No, it's not a triangle!"
})

tasks.appendChild(buttonIsTriangle)

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte a vypíše obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci v úloze č. 9, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt().
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */

// - krok 1 - vytvořte funkci
function calculateTriangleArea(a, b, c) {
  if (!isTriangle(a, b, c)) return "You cannot calculate area of this triangle."

  const s = (a + b + c) / 2
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c))

  return "Are of this triangle is " + area.toFixed(2) + " cm<sup>2</sup>."
}

const buttonTriangleArea = document.createElement("button")
buttonTriangleArea.innerText = "Úloha 10 (Heroic performance)"
buttonTriangleArea.setAttribute("id", "task-10")
buttonTriangleArea.addEventListener("click", () => {
  results.innerHTML = calculateTriangleArea(18, 12, 9)
})

tasks.appendChild(buttonTriangleArea)
