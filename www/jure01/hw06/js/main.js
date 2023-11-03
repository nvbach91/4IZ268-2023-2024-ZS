// task0
console.log('Ahoj světe');

// task1
var birthYear = 1990;
var currentYear = new Date().getFullYear();
var pepeAge = currentYear - birthYear;
console.log(`Pepe is ${pepeAge} years old.`);

// task2
var celsius = 20;
var farenheit = ((celsius * 9) / 5) + 32;
console.log(`${celsius} Celsius equals ${farenheit} Farenheit`);

var farenheit = 68;
var celsius = ((farenheit - 32) * 5) / 9
console.log(`${farenheit} Farenheit equals ${celsius} Celsius`);

// task3

// task 3.0

// deklarace a implementace funkce
const sayHello = () => {
    console.log('Hello');
};

// vytvoření tlačítka
const buttonSayHello = document.createElement('button');
// nastavení textu tlačítka
buttonSayHello.innerText = 'Say Hello';
// nastavení atributu id tlačítka
buttonSayHello.setAttribute('id', 'task-0');
// nabindování funkce na událost click tlačítka
buttonSayHello.addEventListener('click', () => {
    sayHello();
});

// výběr existujícího elementu na stránce s id="tasks"
const tasks = document.querySelector('#tasks');

// task 3.1
// deklarace a implementace funkce
const countAge = () => {
    const inputElement = document.getElementById('birth-year');
    const birthYear = parseInt(inputElement.value);

    if (!isNaN(birthYear)) {
        var currentYear = new Date().getFullYear();
        var pepeAge = currentYear - birthYear;
        const ageCount = document.getElementById('pepeage');
        ageCount.innerText = `Pepe is ${pepeAge} years old.`;
    } else {
        alert('Isert valid birth year.');
    }
};

// Vytvoření textového vstupu
const inputBirthYear = document.createElement('input');
inputBirthYear.setAttribute('type', 'text');
inputBirthYear.setAttribute('placeholder', 'Enter year of birth');
inputBirthYear.setAttribute('id', 'birth-year');

// Vytvoření místa pro zobrazení výsledku
const ageCount = document.createElement('div');
ageCount.setAttribute('id', 'pepeage');
const ageCountLabel = document.createElement('div');
ageCountLabel.innerText = 'Age of Pepe';


// Vložení textového vstupu a místa pro výsledek na stránku
tasks.appendChild(inputBirthYear);

tasks.appendChild(ageCount);

// vytvoření tlačítka
const buttonCountAge = document.createElement('button');
// nastavení textu tlačítka
buttonCountAge.innerText = 'Count age';
// nastavení atributu id tlačítka
buttonCountAge.setAttribute('id', 'task-3.1');
// nabindování funkce na událost click tlačítka
buttonCountAge.addEventListener('click', countAge);

// vložení vytvořeného tlačítka do vybraného elementu na stránce
tasks.appendChild(buttonCountAge)

const resultTask1 = document.createElement('div'); // Create a div element for the result of task 1
tasks.appendChild(resultTask1); // Append it to the tasks container

buttonCountAge.addEventListener('click', countAge);


// task 3.2.a
// deklarace a implementace funkce
const convertCelToFar = (celsius) => {
    var farenheit = ((celsius * 9) / 5) + 32;
    const celToFarCount = document.getElementById('c2f');
    celToFarCount.innerText = (`${celsius} Celsius equals ${farenheit} Fahrenheit`);
};

// vytvoření tlačítka
const buttonCovertCelToFar = document.createElement('button');
// nastavení textu tlačítka
buttonCovertCelToFar.innerText = 'Convert Celsius to Farenheit';
// nastavení atributu id tlačítka
buttonCovertCelToFar.setAttribute('id', 'task-3.2.a');
// nabindování funkce na událost click tlačítka
buttonCovertCelToFar.addEventListener('click', () => {
    const inputCelValue = parseFloat(inputCel.value);
    if (!isNaN(inputCelValue)) {
        convertCelToFar(inputCelValue);
    } else {
        alert('Please enter a valid temperature in Celsius.');
    }
});

// Vytvoření textového vstupu
const inputCel = document.createElement('input');
inputCel.setAttribute('type', 'text');
inputCel.setAttribute('placeholder', 'Enter value in C');


// Vytvoření místa pro zobrazení výsledku
const celToFarCount = document.createElement('div');
celToFarCount.setAttribute('id', 'c2f');
const tempResultLabel = document.createElement('div');
tempResultLabel.innerText = 'Temperature Conversion Result';

// Vložení textového vstupu a místa pro výsledek na stránku
tasks.appendChild(inputCel);
tasks.appendChild(celToFarCount);


// vložení vytvořeného tlačítka do vybraného elementu na stránce
tasks.appendChild(buttonCovertCelToFar)

// task 3.2.b

// deklarace a implementace funkce
const convertFarToCel = (farenheit) => {
    const celsius = ((farenheit - 32) * 5) / 9;
    const farToCelCount = document.getElementById('f2c');
    farToCelCount.innerText = (`${farenheit} Farenheit equals ${celsius} Celsius`);
};

// vytvoření tlačítka
const buttonCovertFarToCel = document.createElement('button');
// nastavení textu tlačítka
buttonCovertFarToCel.innerText = 'Convert Farenheit to Celsius';
// nastavení atributu id tlačítka
buttonCovertFarToCel.setAttribute('id', 'task-3.2.b');
// nabindování funkce na událost click tlačítka
buttonCovertFarToCel.addEventListener('click', () => {
    const inputFarValue = parseFloat(inputFar.value);
    if (!isNaN(inputFarValue)) {
        convertFarToCel(inputFarValue);
    } else {
        alert('Please enter a valid temperature in Fahrenheit.');
    }
});


// Vytvoření textového vstupu
const inputFar = document.createElement('input');
inputFar.setAttribute('type', 'text');
inputFar.setAttribute('placeholder', 'Enter value in F');


// Vytvoření místa pro zobrazení výsledku
const farToCelCount = document.createElement('div');
farToCelCount.setAttribute('id', 'f2c');
const tempResultLabelC = document.createElement('div');
tempResultLabelC.innerText = 'Temperature Conversion Result';

// Vložení textového vstupu a místa pro výsledek na stránku
tasks.appendChild(inputFar);
tasks.appendChild(farToCelCount);


// vložení vytvořeného tlačítka do vybraného elementu na stránce
tasks.appendChild(buttonCovertFarToCel)


// task 4

const divideNumbers = (a, b) => {
    const comparison = document.getElementById('comp');
    if (b === 0) {
        return "Chyba: Dělení nulou!";
    } else {
        var fraction = (a / b) * 100;
        return a + " is " + fraction.toFixed(2) + "% from " + b;
    }
}

const perc = document.getElementById('perc');

const input4a = document.createElement('input');
input4a.setAttribute('type', 'text');
input4a.setAttribute('placeholder', 'Enter value');

const input4b = document.createElement('input');
input4b.setAttribute('type', 'text');
input4b.setAttribute('placeholder', 'Enter value');

const percentage = document.createElement('div');
percentage.setAttribute('id', 'perc');

const ButtonCountPercentage = document.createElement('button');
ButtonCountPercentage.innerText = 'Count Percentage';
ButtonCountPercentage.setAttribute('id', 'task-4');
ButtonCountPercentage.addEventListener('click', () => {
    const input4a_value = parseFloat(input4a.value);
    const input4b_value = parseFloat(input4b.value);
    if (!isNaN(input4a_value) && !isNaN(input4b_value)) {
        const result = divideNumbers(input4a_value, input4b_value);
        percentage.innerText = result;
    } else {
        alert('Please enter valid numbers.');
    }
});

tasks.appendChild(input4a);
tasks.appendChild(input4b);
tasks.appendChild(ButtonCountPercentage);
tasks.appendChild(percentage);

// task 5

const compareNumbers = (cislo1, cislo2) => {
    const comparison = document.getElementById('comp');
    if (cislo1 > cislo2) {
        comparison.innerText = (`${cislo1} is grater than ${cislo2}`);
    } else if (cislo1 < cislo2) {
        comparison.innerText = (`${cislo1} je lesser than ${cislo2}`);
    } else {
        comparison.innerText = (`${cislo1} equals ${cislo2}`);
    }
}

// Vytvoření textového vstupu
const input5a = document.createElement('input');
input5a.setAttribute('type', 'text');
input5a.setAttribute('placeholder', 'Enter value');

const input5b = document.createElement('input');
input5b.setAttribute('type', 'text');
input5b.setAttribute('placeholder', 'Enter value');

// Vytvoření místa pro zobrazení výsledku
const comparasion = document.createElement('div');
comparasion.setAttribute('id', 'comp');

// vytvoření tlačítka
const ButtonCompareTwoNumbers = document.createElement('button');
// nastavení textu tlačítka
ButtonCompareTwoNumbers.innerText = 'Compare numbers';
// nastavení atributu id tlačítka
ButtonCompareTwoNumbers.setAttribute('id', 'task-5');
// nabindování funkce na událost click tlačítka
ButtonCompareTwoNumbers.addEventListener('click', () => {
    const input5a_value = parseFloat(input5a.value);
    const input5b_value = parseFloat(input5b.value);
    if (!isNaN(input5a_value) && !isNaN(input5b_value)) {
        compareNumbers(input5a_value, input5b_value);
    } else {
        alert('Please enter valid numbers.');
    }
});

// Vložení textového vstupu a místa pro výsledek na stránku
tasks.appendChild(input5a);
tasks.appendChild(input5b);
tasks.appendChild(ButtonCompareTwoNumbers);
tasks.appendChild(comparasion);

//task 6 

function printMultiplesOf13() {
    const multiplies = document.getElementById('multiplication');
    multiplies.innerText = '';

    for (let i = 0; i <= 730; i += 13) {
        const multiple = document.createElement('span');
        if (i > 0) {
            multiple.innerText = ', ' + i;
        } else {
            multiple.innerText = i.toString();
        }
        multiplies.appendChild(multiple);
    }
}

// Vytvoření místa pro zobrazení výsledku
const multiplies = document.createElement('div');
multiplies.setAttribute('id', 'multiplication');

// vytvoření tlačítka
const ButtonMultiply = document.createElement('button');
// nastavení textu tlačítka
ButtonMultiply.innerText = 'Print multiples of 13';
// nastavení atributu id tlačítka
ButtonMultiply.setAttribute('id', 'task-6');
// nabindování funkce na událost click tlačítka
ButtonMultiply.addEventListener('click', () => {
    printMultiplesOf13();
});

// Vložení textového vstupu a místa pro výsledek na stránku
tasks.appendChild(ButtonMultiply);
tasks.appendChild(multiplies);

//task 7 
// deklarace a implementace funkce
function countArea(radius) {
    const calculatearea = document.getElementById('a7');
    var area = Math.PI * Math.pow(radius, 2)
    calculatearea.innerText = (`The area is ${area}`);
}

// vytvoření tlačítka
const buttonCalculateArea = document.createElement('button');
// nastavení textu tlačítka
buttonCalculateArea.innerText = 'Calculate area';
// nastavení atributu id tlačítka
buttonCalculateArea.setAttribute('id', 'task-7');
// nabindování funkce na událost click tlačítka
buttonCalculateArea.addEventListener('click', () => {
    const inputRadiusValue = parseFloat(inputRadius.value);
    if (!isNaN(inputRadiusValue)) {
        countArea(inputRadiusValue);
    } else {
        alert('Please enter a valid value.');
    }
});
// Vytvoření textového vstupu
const inputRadius = document.createElement('input');
inputRadius.setAttribute('type', 'text');
inputRadius.setAttribute('placeholder', 'Enter radius');


// Vytvoření místa pro zobrazení výsledku
const resArea = document.createElement('div');
resArea.setAttribute('id', 'a7');

// Vložení textového vstupu a místa pro výsledek na stránku
tasks.appendChild(inputRadius);
tasks.appendChild(resArea);


// vložení vytvořeného tlačítka do vybraného elementu na stránce
tasks.appendChild(buttonCalculateArea)

//task 8

// Funkce pro výpočet objemu kuželu
const calculateConeVolume = (height, radius) => {
    const volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
    return volume;
};

// Funkce pro zobrazení výsledku
const displayConeVolume = (volume) => {
    const coneVolumeResult = document.getElementById('cone-volume-result');
    coneVolumeResult.innerText = `The cone volume equals ${volume} square units.`;
};

// Vytvoření tlačítka pro výpočet objemu kuželu
const buttonCalculateConeVolume = document.createElement('button');
buttonCalculateConeVolume.innerText = 'Count cone volume';
buttonCalculateConeVolume.setAttribute('id', 'task-8');

buttonCalculateConeVolume.addEventListener('click', () => {
    const inputHeightValue = parseFloat(inputHeightT8.value);
    const inputRadiusValue = parseFloat(inputRadiusT8.value);

    if (!isNaN(inputHeightValue) && !isNaN(inputRadiusValue)) {
        const coneVolume = calculateConeVolume(inputHeightValue, inputRadiusValue);
        displayConeVolume(coneVolume);
    } else {
        alert('Please enter valid numeric values for height and radius.');
    }
});

// Vytvoření textových vstupů pro výšku a poloměr
const inputHeightT8 = document.createElement('input');
inputHeightT8.setAttribute('type', 'text');
inputHeightT8.setAttribute('id', 'inputHeight');
inputHeightT8.setAttribute('placeholder', 'Cone height');

const inputRadiusT8 = document.createElement('input');
inputRadiusT8.setAttribute('type', 'text');
inputRadiusT8.setAttribute('id', 'inputRadius');
inputRadiusT8.setAttribute('placeholder', 'Cone radius');

// Vytvoření místa pro zobrazení výsledku
const coneVolumeResult = document.createElement('div');
coneVolumeResult.setAttribute('id', 'cone-volume-result');

// Přidání textových vstupů a výsledku na stránku
tasks.appendChild(inputHeightT8);
tasks.appendChild(inputRadiusT8);
tasks.appendChild(coneVolumeResult);

// Přidání tlačítka na stránku
tasks.appendChild(buttonCalculateConeVolume);

//task 9

// Funkce kontrolujíci, jestli se dá sestavit trojúhelník
const canFormTriangle = (a, b, c) => {
    return a + b > c && a + c > b && b + c > a;
};

// Funkce vypisující výsledek
const displayTriangleResult = (a, b, c) => {
    const resultAreaT9 = document.getElementById('resultAreaT9');

    if (canFormTriangle(a, b, c)) {
        resultAreaT9.innerText = `Yes, it is possible to construct a triangle with sides: ${a}, ${b}, ${c}`;
        return true;
    } else {
        resultAreaT9.innerText = `No, it is not possible to construct a triangle with sides: ${a}, ${b}, ${c}`;
        return false;
    }
};

// Zde se vytváří tlačítko
const buttonDetectTriangle = document.createElement('button');
buttonDetectTriangle.innerText = 'Detect triangle';
buttonDetectTriangle.setAttribute('id', 'task-9');

buttonDetectTriangle.addEventListener('click', () => {
    const inputAValue = parseFloat(inputA.value);
    const inputBValue = parseFloat(inputB.value);
    const inputCValue = parseFloat(inputC.value);

    if (!isNaN(inputAValue) && !isNaN(inputBValue) && !isNaN(inputCValue)) {
        const isTriangle = displayTriangleResult(inputAValue, inputBValue, inputCValue);

    } else {
        alert('Please enter valid numeric values for side lengths.');
    }
});

// Zde se vytváří vstupní pole
const inputA = document.createElement('input');
inputA.setAttribute('type', 'text');
inputA.setAttribute('id', 'inputA');
inputA.setAttribute('placeholder', 'length of a');

const inputB = document.createElement('input');
inputB.setAttribute('type', 'text');
inputB.setAttribute('id', 'inputB');
inputB.setAttribute('placeholder', 'length of b');

const inputC = document.createElement('input');
inputC.setAttribute('type', 'text');
inputC.setAttribute('id', 'inputC');
inputC.setAttribute('placeholder', 'length of c');

// nastavení id u divu
const resultAreaT9 = document.createElement('div');
resultAreaT9.setAttribute('id', 'resultAreaT9');

// Appendy
tasks.appendChild(inputA);
tasks.appendChild(inputB);
tasks.appendChild(inputC);
tasks.appendChild(buttonDetectTriangle);
tasks.appendChild(resultAreaT9);

//task 10

// Funkce s H. vzorcem
const calculateTriangleArea = (a, b, c) => {

    const resultContainer = document.getElementById('resultAreaT10');
    const isValidTriangle = displayTriangleResult(a, b, c);

    if (!isValidTriangle) {
        resultContainer.innerText = "Nelze spočítat plochu trojúhelníka.";
        return;
    }

    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    resultContainer.innerText = `The triangle area equals ${area.toFixed(2)} square units.`;
};

// Tvorba vstupních polí
const inputSideA = document.createElement('input');
inputSideA.setAttribute('type', 'text');
inputSideA.setAttribute('id', 'inputSideA');
inputSideA.setAttribute('placeholder', 'length of a');

const inputSideB = document.createElement('input');
inputSideB.setAttribute('type', 'text');
inputSideB.setAttribute('id', 'inputSideB');
inputSideB.setAttribute('placeholder', 'length of b');

const inputSideC = document.createElement('input');
inputSideC.setAttribute('type', 'text');
inputSideC.setAttribute('id', 'inputSideC');
inputSideC.setAttribute('placeholder', 'length of c');

// Tvorba tlačítka
const buttonCalculateTriangleArea = document.createElement('button');
buttonCalculateTriangleArea.innerText = 'Calculate triangle area';
buttonCalculateTriangleArea.setAttribute('id', 'task-10');

// Bindování
buttonCalculateTriangleArea.addEventListener('click', () => {
    const inputAValue = parseFloat(inputSideA.value);
    const inputBValue = parseFloat(inputSideB.value);
    const inputCValue = parseFloat(inputSideC.value);

    if (!isNaN(inputAValue) && !isNaN(inputBValue) && !isNaN(inputCValue)) {
        calculateTriangleArea(inputAValue, inputBValue, inputCValue);
    } else {
        alert('Please enter valid numeric values for side lengths.');
    }
});

// Umístnění na stránku
tasks.appendChild(inputSideA);
tasks.appendChild(inputSideB);
tasks.appendChild(inputSideC);
tasks.appendChild(buttonCalculateTriangleArea);

// Zobrazení výsledku na stránce
const resultAreaT10 = document.createElement('div');
resultAreaT10.setAttribute('id', 'resultAreaT10');
tasks.appendChild(resultAreaT10);
