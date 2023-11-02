console.log('Ahoj světe');

// task-1
let birthYear = 2002;
let currentYear = new Date().getFullYear();
let pepesAge = currentYear - birthYear;
console.log(`Pepe is ${pepesAge} years old.`);

// task-2
var celDegree = 35;
var farDegree = ((celDegree * 9) / 5) + 32;
console.log(`${celDegree} in celsius equals ${farDegree} in farenheit`);

var farDegree = 68;
var celDegree = ((farDegree - 32) * 5) / 9
console.log(`${farDegree} in farenheit equals ${celDegree} in celsius`);

// task-3

const sayHello = () => {
  console.log('Hello');
};

const buttonSayHello = document.createElement('button');
buttonSayHello.innerText = 'Say Hello';
buttonSayHello.setAttribute('id', 'task-0');
buttonSayHello.addEventListener('click', () => {
  sayHello();
});
const tasks = document.querySelector('#tasks');


const countAge = () => {
  const inputElement = document.getElementById('birth-year');
  const birthYear = parseInt(inputElement.value);

  if (!isNaN(birthYear)) {
    var currentYear = new Date().getFullYear();
    var pepesAge = currentYear - birthYear;
    const ageCount = document.getElementById('pepesage');
    ageCount.innerText = `Pepe is ${pepesAge} years old.`;
  } else {
    alert('Enter birth year.');
  }
};

const inputBirthYear = document.createElement('input');
inputBirthYear.setAttribute('type', 'text');
inputBirthYear.setAttribute('placeholder', 'Enter birth year');
inputBirthYear.setAttribute('id', 'birth-year');

const ageCount = document.createElement('div');
ageCount.setAttribute('id', 'pepesage');
const ageCountLabel = document.createElement('div');
ageCountLabel.innerText = 'Current age';

tasks.appendChild(inputBirthYear);
tasks.appendChild(ageCount);

const buttonCountAge = document.createElement('button');
buttonCountAge.innerText = 'Current age is...';
buttonCountAge.setAttribute('id', 'task-3.1');
buttonCountAge.addEventListener('click', countAge);

tasks.appendChild(buttonCountAge)
const resultTask1 = document.createElement('div');
tasks.appendChild(resultTask1);

buttonCountAge.addEventListener('click', countAge);

// task 3.1

const convertCelToFar = (celsius) => {
  var farenheit = ((celsius * 9) / 5) + 32;
  const celToFarCount = document.getElementById('cel-to-far');
  celToFarCount.innerText = (`${celsius} Celsius equals ${farenheit} Fahrenheit`);
};

const buttonCelToFar = document.createElement('button');
buttonCelToFar.innerText = 'Convert Celsius to Farenheit';
buttonCelToFar.setAttribute('id', 'task-3.1');
buttonCelToFar.addEventListener('click', () => {
  const inputCelValue = parseFloat(inputCel.value);
  if (!isNaN(inputCelValue)) {
    convertCelToFar(inputCelValue);
  } else {
    alert('You need to enter number');
  }
});
const inputCel = document.createElement('input');
inputCel.setAttribute('type', 'text');
inputCel.setAttribute('placeholder', 'Value in celsius');

const celToFarCount = document.createElement('div');
celToFarCount.setAttribute('id', 'cel-to-far');
const tempResultLabel = document.createElement('div');
tempResultLabel.innerText = 'Temp result';

tasks.appendChild(inputCel);
tasks.appendChild(celToFarCount);

tasks.appendChild(buttonCelToFar);

const convertFarToCel = (farenheit) => {
  const celsius = ((farenheit - 32) * 5) / 9;
  const farToCelCount = document.getElementById('far-to-cel');
  farToCelCount.innerText = (`${farenheit} Farenheit equals ${celsius} Celsius`);
};

const buttonCovertFarToCel = document.createElement('button');
buttonCovertFarToCel.innerText = 'Convert Farenheit to Celsius';
buttonCovertFarToCel.setAttribute('id', 'task-3.1-1');
buttonCovertFarToCel.addEventListener('click', () => {
  const inputFarValue = parseFloat(inputFar.value);
  if (!isNaN(inputFarValue)) {
    convertFarToCel(inputFarValue);
  } else {
    alert('You need to enter number');
  }
});

const inputFar = document.createElement('input');
inputFar.setAttribute('type', 'text');
inputFar.setAttribute('placeholder', 'Enter value in F');

const farToCelCount = document.createElement('div');
farToCelCount.setAttribute('id', 'far-to-cel');
const tempResultLabelC = document.createElement('div');
tempResultLabelC.innerText = 'Temperature Conversion Result';

tasks.appendChild(inputFar);
tasks.appendChild(farToCelCount);
tasks.appendChild(buttonCovertFarToCel)


// task-4

const divideNumbers = (a, b) => {
  const comparison = document.getElementById('compare');
  if (b === 0) {
    return "You cannot divied by zero";
  } else {
    var fraction = (a / b) * 100;
    return a + " is " + fraction.toFixed(2) + "% from " + b;
  }
}

const perc = document.getElementById('percent');

const input4a = document.createElement('input');
input4a.setAttribute('type', 'text');
input4a.setAttribute('placeholder', 'Enter value');

const input4b = document.createElement('input');
input4b.setAttribute('type', 'text');
input4b.setAttribute('placeholder', 'Enter value');

const percentage = document.createElement('div');
percentage.setAttribute('id', 'percent');

const ButtonCountPercentage = document.createElement('button');
ButtonCountPercentage.innerText = 'Percentage';
ButtonCountPercentage.setAttribute('id', 'task-4');
ButtonCountPercentage.addEventListener('click', () => {
  const input4a_value = parseFloat(input4a.value);
  const input4b_value = parseFloat(input4b.value);
  if (!isNaN(input4a_value) && !isNaN(input4b_value)) {
    const result = divideNumbers(input4a_value, input4b_value);
    percentage.innerText = result;
  } else {
    alert('You need to enter numbers');
  }
});

tasks.appendChild(input4a);
tasks.appendChild(input4b);
tasks.appendChild(ButtonCountPercentage);
tasks.appendChild(percentage);


// task-5

const compareNumbers = (number1, number2) => {
  const comparison = document.getElementById('compare');
  if (number1 > number2) {
    comparison.innerText = (`${number1} is greater than ${number2}`);
  } else if (number1 < number2) {
    comparison.innerText = (`${number1} is less than ${number2}`);
  } else {
    comparison.innerText = (`${number1} and ${number2} are equal`);
  }
}

const input5a = document.createElement('input');
input5a.setAttribute('type', 'text');
input5a.setAttribute('placeholder', 'Enter value');

const input5b = document.createElement('input');
input5b.setAttribute('type', 'text');
input5b.setAttribute('placeholder', 'Enter value');

const comparasion = document.createElement('div');
comparasion.setAttribute('id', 'compare');

const ButtonCompareTwoNumbers = document.createElement('button');
ButtonCompareTwoNumbers.innerText = 'Compare numbers';
ButtonCompareTwoNumbers.setAttribute('id', 'task-5');
ButtonCompareTwoNumbers.addEventListener('click', () => {
  const input5a_value = parseFloat(input5a.value);
  const input5b_value = parseFloat(input5b.value);
  if (!isNaN(input5a_value) && !isNaN(input5b_value)) {
    compareNumbers(input5a_value, input5b_value);
  } else {
    alert('You need to enter numbers');
  }
});

tasks.appendChild(input5a);
tasks.appendChild(input5b);
tasks.appendChild(ButtonCompareTwoNumbers);
tasks.appendChild(comparasion);

// task-6 

function multipleBy13() {
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
};

const multiplies = document.createElement('div');
multiplies.setAttribute('id', 'multiplication');

const buttonMultiply = document.createElement('button');
buttonMultiply.innerText = 'Multuply by 13';
buttonMultiply.setAttribute('id', 'task-6');
buttonMultiply.addEventListener('click', () => {
  multipleBy13();
});

tasks.appendChild(buttonMultiply);
tasks.appendChild(multiplies);

// task-7
function countArea(radius) {
  const calculatearea = document.getElementById('t-7');
  var area = Math.PI * Math.pow(radius, 2)
  calculatearea.innerText = (`Area is equal to ${area}`);
};

const buttonCalculateArea = document.createElement('button');
buttonCalculateArea.innerText = 'Calculate area';
buttonCalculateArea.setAttribute('id', 'task-7');
buttonCalculateArea.addEventListener('click', () => {
  const inputRadiusValue = parseFloat(inputRadius.value);
  if (!isNaN(inputRadiusValue)) {
    countArea(inputRadiusValue);
  } else {
    alert('You need to enter value');
  }
});

const inputRadius = document.createElement('input');
inputRadius.setAttribute('type', 'text');
inputRadius.setAttribute('placeholder', 'Enter radius');

const raddArea = document.createElement('div');
raddArea.setAttribute('id', 't-7');

tasks.appendChild(inputRadius);
tasks.appendChild(raddArea);
tasks.appendChild(buttonCalculateArea);

// task-8

const calculateVolume = (height, radius) => {
  const volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
  return volume;
};

const displayConeVolume = (volume) => {
  const coneVolumeResult = document.getElementById('volume-result');
  coneVolumeResult.innerText = `Volume equals ${volume}`;
};

const buttonCalculateConeVolume = document.createElement('button');
buttonCalculateConeVolume.innerText = 'Count volume';
buttonCalculateConeVolume.setAttribute('id', 'task-8');

buttonCalculateConeVolume.addEventListener('click', () => {
  const inputHeightValue = parseFloat(inputHeightT8.value);
  const inputRadiusValue = parseFloat(inputRadiusT8.value);

  if (!isNaN(inputHeightValue) && !isNaN(inputRadiusValue)) {
    const coneVolume = calculateVolume(inputHeightValue, inputRadiusValue);
    displayConeVolume(coneVolume);
  } else {
    alert('You need to enter height and raduis');
  }
});

const inputHeightT8 = document.createElement('input');
inputHeightT8.setAttribute('type', 'text');
inputHeightT8.setAttribute('id', 'inputHeight');
inputHeightT8.setAttribute('placeholder', 'Height');

const inputRadiusT8 = document.createElement('input');
inputRadiusT8.setAttribute('type', 'text');
inputRadiusT8.setAttribute('id', 'inputRadius');
inputRadiusT8.setAttribute('placeholder', 'Radius');

const coneVolumeResult = document.createElement('div');
coneVolumeResult.setAttribute('id', 'volume-result');

tasks.appendChild(inputHeightT8);
tasks.appendChild(inputRadiusT8);
tasks.appendChild(coneVolumeResult);
tasks.appendChild(buttonCalculateConeVolume);

// task-9
const canFormTriangle = (a, b, c) => {
  return a + b > c && a + c > b && b + c > a;
};

const displayTriangleResult = (a, b, c) => {
  const resultAreaT9 = document.getElementById('resultAreaT9');

  if (canFormTriangle(a, b, c)) {
    resultAreaT9.innerText = `You can make a triangle with these numbers: ${a}, ${b}, ${c}`;
    return true;
  } else {
    resultAreaT9.innerText = `You cannot make triangle with these numbers: ${a}, ${b}, ${c}`;
    return false;
  }
};

const buttonDetectTriangle = document.createElement('button');
buttonDetectTriangle.innerText = 'Make triangle';
buttonDetectTriangle.setAttribute('id', 'task-9');

buttonDetectTriangle.addEventListener('click', () => {
  const inputAValue = parseFloat(inputA.value);
  const inputBValue = parseFloat(inputB.value);
  const inputCValue = parseFloat(inputC.value);

  if (!isNaN(inputAValue) && !isNaN(inputBValue) && !isNaN(inputCValue)) {
    const isTriangle = displayTriangleResult(inputAValue, inputBValue, inputCValue);

  } else {
    alert('You need to enter numbers.');
  }
});

const inputA = document.createElement('input');
inputA.setAttribute('type', 'text');
inputA.setAttribute('id', 'inputA');
inputA.setAttribute('placeholder', 'Enter a');

const inputB = document.createElement('input');
inputB.setAttribute('type', 'text');
inputB.setAttribute('id', 'inputB');
inputB.setAttribute('placeholder', 'Enter b');

const inputC = document.createElement('input');
inputC.setAttribute('type', 'text');
inputC.setAttribute('id', 'inputC');
inputC.setAttribute('placeholder', 'Enter c');

const resultAreaT9 = document.createElement('div');
resultAreaT9.setAttribute('id', 'resultAreaT9');

tasks.appendChild(inputA);
tasks.appendChild(inputB);
tasks.appendChild(inputC);
tasks.appendChild(buttonDetectTriangle);
tasks.appendChild(resultAreaT9);


// task-10
const calculateTriangleArea = (a, b, c) => {

  const resultContainer = document.getElementById('resultAreaT10');
  const isValidTriangle = displayTriangleResult(a, b, c);

  if (!isValidTriangle) {
    resultContainer.innerText = "Immposible to make calculations";
    return;
  }

  const s = (a + b + c) / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  resultContainer.innerText = `The triangle equals ${area.toFixed(2)}`;
};

const inputSideA = document.createElement('input');
inputSideA.setAttribute('type', 'text');
inputSideA.setAttribute('id', 'inputSideA');
inputSideA.setAttribute('placeholder', 'Enter side a');

const inputSideB = document.createElement('input');
inputSideB.setAttribute('type', 'text');
inputSideB.setAttribute('id', 'inputSideB');
inputSideB.setAttribute('placeholder', 'Enter side b');

const inputSideC = document.createElement('input');
inputSideC.setAttribute('type', 'text');
inputSideC.setAttribute('id', 'inputSideC');
inputSideC.setAttribute('placeholder', 'Enter side c');

const buttonCalculateTriangleArea = document.createElement('button');
buttonCalculateTriangleArea.innerText = 'Calculate triangle area';
buttonCalculateTriangleArea.setAttribute('id', 'task-10');

buttonCalculateTriangleArea.addEventListener('click', () => {
  const inputAValue = parseFloat(inputSideA.value);
  const inputBValue = parseFloat(inputSideB.value);
  const inputCValue = parseFloat(inputSideC.value);

  if (!isNaN(inputAValue) && !isNaN(inputBValue) && !isNaN(inputCValue)) {
    calculateTriangleArea(inputAValue, inputBValue, inputCValue);
  } else {
    alert('You need to enter numbers');
  }
});

tasks.appendChild(inputSideA);
tasks.appendChild(inputSideB);
tasks.appendChild(inputSideC);
tasks.appendChild(buttonCalculateTriangleArea);

const resultAreaT10 = document.createElement('div');
resultAreaT10.setAttribute('id', 'resultAreaT10');
tasks.appendChild(resultAreaT10);
