/**
 * 0) Pre-preparacion.
 * - Vytvořte HTML stránku s nadpisem h1 "JavaScript is awesome!"
 * - Na stránce vytvořte místo pro umístění jednotlivých spouštěčů úkolů - tlačítek (tj. div, který má id s hodnotou "tasks" - <div id="tasks"></div>).
 * - Na stránce vytvořte místo pro výpis výsledků úkolů (div, který má id s hodnotou "result" - <div id="results"></div>).
 *
 * - Připojte tento homework.js soubor k vytvořené HTML stránce pomocí tagu <script> (viz LAB) a vyzkoušejte
 * console.log('Ahoj světe');
 */

    console.log("Why did the JavaScript developer go broke?\nBcs he lost his 'keys'. Get it?"); // :-)

    const resetAll = () => {
        const inputs = divTasks.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = '';
        });
        divResults.innerHTML = 'Results will be displayed here.';

        return alert('RESETED!');
    };


    var divTasks = document.getElementById('tasks');
    var divResults = document.getElementById('results');



/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných
 * používejte smysluplnou angličtinu.
 */
// Solution here
    const pepesAge = 2002;
    const thisYear = new Date().getFullYear();

    console.log(`Pepe is ${thisYear - pepesAge} years old`);



/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32.
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9.
 */
// Solution here
    const celsius = 20;
    const fahrenheit = 50;

    const convertedCelToFah = celsius * 9 / 5 + 32;
    const convertedFahToCel = (fahrenheit - 32) * 5 / 9;

    console.log(`${celsius}°C = ${convertedCelToFah}°F`);
    console.log(`${fahrenheit}°F = ${convertedFahToCel}°C`);



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
//Solution here
    const getAge = (birthYear) => {
        if(birthYear > new Date().getFullYear() || birthYear < 0 || birthYear === "") {
            return alert("Enter valid year!");
        }else{
            return new Date().getFullYear() - birthYear;
        }
    };
    const convertCelToFah = (celsius) => {
        if(celsius === "") {
            return alert("Enter valid temperature!");
        }else{
            return `${celsius}°C = ${convertedCelToFah}°F`;
        }
    };
    const convertFahToCel = (fahrenheit) => {
        if(fahrenheit === "") {
            return alert("Enter valid temperature!");
        }else {
            return `${fahrenheit}°F = ${convertedFahToCel}°C`;
        }
    };

    const resetDiv = document.createElement('div');
    resetDiv.setAttribute('id', 'reset-div');
    resetDiv.style.padding = '1rem';
    const resetBtn = document.createElement('button');
    resetBtn.innerText = "Reset";
    resetBtn.setAttribute('id', 'reset-btn');
    resetBtn.addEventListener('click', resetAll);



    const ageInput = document.createElement('input');
    ageInput.type = "text";
    ageInput.placeholder = "Insert year of birth";

    const buttonPepesAge = document.createElement('button');
    buttonPepesAge.innerText = "Calculate Pepe's age";
    buttonPepesAge.setAttribute('id', 'pepe-age');

    buttonPepesAge.addEventListener('click', () => {
        divResults.textContent = getAge(ageInput.value);
    });

    const breakLine1 = document.createElement('h4');

    const tempInput = document.createElement('input');
    tempInput.type = "text";
    tempInput.placeholder = "Insert temperature";

    const getCelBtn = document.createElement('button');
    getCelBtn.innerText = "Convert to °C";
    getCelBtn.setAttribute('id', 'cel-btn');


    const getFahBtn = document.createElement('button');
    getFahBtn.innerText = "Convert to °F";
    getFahBtn.setAttribute('id', 'fah-btn');


    getCelBtn.addEventListener('click', () => {
        divResults.textContent = convertFahToCel(tempInput.value);
    });

    getFahBtn.addEventListener('click', () => {
        divResults.textContent = convertCelToFah(tempInput.value);
    });

    const breakLine2 = document.createElement('h4');


    divTasks.appendChild(resetDiv);
    resetDiv.appendChild(resetBtn);

    divTasks.appendChild(ageInput);
    divTasks.appendChild(buttonPepesAge);
    divTasks.appendChild(breakLine1);

    divTasks.appendChild(tempInput);
    divTasks.appendChild(getCelBtn);
    divTasks.appendChild(getFahBtn);
    divTasks.appendChild(breakLine2);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla.
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2);
 * Pozor na dělení nulou!
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here
    const getPerc = (a, b) => {
        if (b === 0 || b === "" || a === "" || (a === "" && b === "")) {
            return alert("Insert valid numbers!");
        } else {
        return "Divison of " + a + " by " + b + " is " + (a / b * 100).toFixed(2) + "%";
        }
    };

    const firstPercInput = document.createElement('input');
    firstPercInput.type = "text";
    firstPercInput.placeholder = "Insert first number";

    const secondPercInput = document.createElement('input');
    secondPercInput.type = "text";
    secondPercInput.placeholder = "Insert second number";

    const getPercBtn = document.createElement('button');
    getPercBtn.innerText = "Get percent";
    getPercBtn.setAttribute('id', 'get-percent-btn');

    const percOutcome = document.createElement('h3');

    getPercBtn.addEventListener('click', () => {
        divResults.textContent = getPerc(firstPercInput.value, secondPercInput.value);
    }
    );

    const breakLine3 = document.createElement('h4');

    divTasks.appendChild(firstPercInput);
    divTasks.appendChild(secondPercInput);
    divTasks.appendChild(getPercBtn);
    divTasks.appendChild(breakLine3);




/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
    const comp = (a, b) => {
        if(a === "" || b === "" || (a === "" && b === "")) {
            return alert("Insert numbers!");
        }
        if (a < b) {
            return b + " is bigger";
        }
        if (a > b) {
            return a + " is bigger";
        }else {
        return "Numbers are equal";
        }
    };

    const res1 = comp(10, 10);
    const res2 = comp(10, 12);
    const res3 = comp(100, 12);

    const firstCompInput = document.createElement('input');
    firstCompInput.type = "text";
    firstCompInput.placeholder = "Insert first number";

    const secondCompInput = document.createElement('input');
    secondCompInput.type = "text";
    secondCompInput.placeholder = "Insert second number";

    const getCompBtn = document.createElement('button');
    getCompBtn.innerText = "Compare";
    getCompBtn.setAttribute('id', 'get-comp-btn');

    const compOutcome = document.createElement('h3');

    getCompBtn.addEventListener('click', () => {
        divResults.textContent = comp(firstCompInput.value, secondCompInput.value);
    }
    );

    const breakLine4 = document.createElement('h4');

    divTasks.appendChild(firstCompInput);
    divTasks.appendChild(secondCompInput);
    divTasks.appendChild(getCompBtn);
    divTasks.appendChild(breakLine4);



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

    const getMultBtn = document.createElement('button');
    getMultBtn.innerText = "Get multiples";
    getMultBtn.setAttribute('id', 'get-mult-btn');

    const multOutcome = document.createElement('h3');

    getMultBtn.addEventListener('click', () => {
        divResults.textContent = ''; // nejdriv smazu div
        for (let i = 0; i <= 730; i += 13) {
            divResults.textContent += `${i} `;
        }
    }
    );
    const breakLine5 = document.createElement('h4');

    divTasks.appendChild(getMultBtn);
    divTasks.appendChild(breakLine5);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
    const getCircleArea = (radius) => {
        return (Math.PI * radius ** 2).toFixed(2);
    };

    const circleInput = document.createElement('input');
    circleInput.type = "text";
    circleInput.placeholder = "Insert radius";

    const getCircleBtn = document.createElement('button');
    getCircleBtn.innerText = "Get circle area";
    getCircleBtn.setAttribute('id', 'get-circle-btn');

    const circleOutcome = document.createElement('h3');

    getCircleBtn.addEventListener('click', () => {
        if(circleInput.value === "" || circleInput.value < 0) {
            return alert("Insert radius!");
        } else {
            divResults.textContent = getCircleArea(circleInput.value);
        }
    }
    );

    const breakLine6 = document.createElement('h4');

    divTasks.appendChild(circleInput);
    divTasks.appendChild(getCircleBtn);
    divTasks.appendChild(breakLine6);



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte
 * staticky.
 */
// Solution here
    const getConeVolume = (height, radius) => {
        return (Math.PI * radius ** 2 * height / 3).toFixed(2);
    };

    const coneHeightInput = document.createElement('input');
    coneHeightInput.type = "text";
    coneHeightInput.placeholder = "Insert height";

    const coneRadiusInput = document.createElement('input');
    coneRadiusInput.type = "text";
    coneRadiusInput.placeholder = "Insert radius";

    const getConeBtn = document.createElement('button');
    getConeBtn.innerText = "Get cone volume";
    getConeBtn.setAttribute('id', 'get-cone-btn');

    const coneOutcome = document.createElement('h3');

    getConeBtn.addEventListener('click', () => {
        if(coneHeightInput.value === "" || coneRadiusInput.value === "" || (coneHeightInput.value === "" && coneRadiusInput.value === "")) {
            return alert("Insert height and radius!");
        } else {
            divResults.textContent = getConeVolume(coneHeightInput.value, coneRadiusInput.value);
        }
    }
    );
    const breakLine7 = document.createElement('h4');

    divTasks.appendChild(coneHeightInput);
    divTasks.appendChild(coneRadiusInput);
    divTasks.appendChild(getConeBtn);
    divTasks.appendChild(breakLine7);




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
        return (a + b > c && a + c > b && b + c > a);
    };

    const firstSideInput = document.createElement('input');
    firstSideInput.type = "text";
    firstSideInput.placeholder = "Insert first side";

    const secondSideInput = document.createElement('input');
    secondSideInput.type = "text";
    secondSideInput.placeholder = "Insert second side";

    const thirdSideInput = document.createElement('input');
    thirdSideInput.type = "text";
    thirdSideInput.placeholder = "Insert third side";

    const getTriangleBtn = document.createElement('button');
    getTriangleBtn.innerText = "Get triangle";
    getTriangleBtn.setAttribute('id', 'get-triangle-btn');

    const triangleOutcome = document.createElement('h3');

    getTriangleBtn.addEventListener('click', () => {
        if(firstSideInput.value === "" || secondSideInput.value === "" || thirdSideInput.value === "" || (firstSideInput.value === "" && secondSideInput.value === "" && thirdSideInput.value === "")) {
            return alert("Insert all sides!");
        } else if (firstSideInput.value <= 0 || secondSideInput.value <= 0 || thirdSideInput.value <= 0) {
            return alert("Insert non-negative numbers!");
        } else {
            divResults.textContent = isTriangle(firstSideInput.value, secondSideInput.value, thirdSideInput.value);
        }
    }
    );

    const breakLine8 = document.createElement('h4');

    divTasks.appendChild(firstSideInput);
    divTasks.appendChild(secondSideInput);
    divTasks.appendChild(thirdSideInput);
    divTasks.appendChild(getTriangleBtn);
    divTasks.appendChild(breakLine8);



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
    const getTriangleArea = (a, b, c) => {
        if (!isTriangle(a, b, c)) {
            return `Toto není trojuhelník`;
        }
        const s = (a + b + c) / 2;
        const area = (Math.sqrt(s * (s - a) * (s - b) * (s - c))).toFixed(2);
        return area;
    };

    const firstTriangleSideInput = document.createElement('input');
    firstTriangleSideInput.type = "text";
    firstTriangleSideInput.placeholder = "Insert first side";

    const secondTriangleSideInput = document.createElement('input');
    secondTriangleSideInput.type = "text";
    secondTriangleSideInput.placeholder = "Insert second side";

    const thirdTriangleSideInput = document.createElement('input');
    thirdTriangleSideInput.type = "text";
    thirdTriangleSideInput.placeholder = "Insert third side";

    const getTriangleAreaBtn = document.createElement('button');
    getTriangleAreaBtn.innerText = "Get triangle area";
    getTriangleAreaBtn.setAttribute('id', 'get-triangle-area-btn');

    const triangleAreaOutcome = document.createElement('h3');

    getTriangleAreaBtn.addEventListener('click', () => {
        if(firstTriangleSideInput.value === "" || secondTriangleSideInput.value === "" || thirdTriangleSideInput.value === "" || (firstTriangleSideInput.value === "" && secondTriangleSideInput.value === "" && thirdTriangleSideInput.value === "")) {
            return alert("Insert all sides!");
        } else if (firstTriangleSideInput.value <= 0 || secondTriangleSideInput.value <= 0 || thirdTriangleSideInput.value <= 0) {
            return alert("Insert non-negative numbers!");
        } else {
            divResults.textContent = getTriangleArea(firstTriangleSideInput.value, secondTriangleSideInput.value, thirdTriangleSideInput.value);
        }
    }
    );

    const breakLine9 = document.createElement('h4');

    divTasks.appendChild(firstTriangleSideInput);
    divTasks.appendChild(secondTriangleSideInput);
    divTasks.appendChild(thirdTriangleSideInput);
    divTasks.appendChild(getTriangleAreaBtn);
    divTasks.appendChild(breakLine9);
