console.log('Ahoj světe');
/**
 * 1) Pepe's age. 
 */
// Solution here

const birthYear = 2000;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;
console.log(`Pepe is ${age} years old.`);

/**
 * 2) WTF (wow, that's fun). 
 */
// Solution here

const celsius = 20; 
const fahrenheit = 68; 

const celsiusToFahrenheit = (celsius * 9) / 5 + 32;
console.log(`${celsius}°C = ${celsiusToFahrenheit.toFixed(1)}°F`);

const fahrenheitToCelsius = ((fahrenheit - 32) * 5) / 9;
console.log(`${fahrenheit}°F = ${fahrenheitToCelsius.toFixed(1)}°C`);

/**
 * 3) Funkce function fonction funktio. 
 */
// Solution here

const calculateAge = () => {
    const birthYearInput = document.getElementById('pepeBirthYear');
    const birthYear = Number(birthYearInput.value);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    console.log(`Pepe is ${age} years old.`);
};

const convertTemperature = () => {
    const celsiusInput = document.getElementById('celsiusInput');
    const fahrenheitInput = document.getElementById('fahrenheitInput');
    const celsius = Number(celsiusInput.value);
    const fahrenheit = Number(fahrenheitInput.value);

    const celsiusToFahrenheit = (celsius * 9) / 5 + 32;
    console.log(`${celsius}°C = ${celsiusToFahrenheit.toFixed(1)}°F`);

    const fahrenheitToCelsius = ((fahrenheit - 32) * 5) / 9;
    console.log(`${fahrenheit}°F = ${fahrenheitToCelsius.toFixed(1)}°C`);
};

const buttonCalculateAge = document.createElement('button');
buttonCalculateAge.innerText = 'Calculate Age';
buttonCalculateAge.setAttribute('id', 'task-1');
buttonCalculateAge.addEventListener('click', calculateAge);
const tasks = document.querySelector('#tasks');
tasks.appendChild(buttonCalculateAge);

const buttonConvertTemperature = document.createElement('button');
buttonConvertTemperature.innerText = 'Convert Temperature';
buttonConvertTemperature.setAttribute('id', 'task-2')
buttonConvertTemperature.addEventListener('click', convertTemperature);
tasks.appendChild(buttonConvertTemperature);

/**
 * 4) %CENSORED%. 
 */
// Solution here

const calculatePercentage = () => {
    const numeratorInput = document.getElementById ('numerator');
    const denominatorInput = document.getElementById ('denominator');
    
    const numerator = Number(numeratorInput.value);
    const denominator = Number(denominatorInput.value);

    if(denominator === 0) {
        console.log (`Error!`);
        return;
    }

    const percentage = (numerator/denominator) * 100;
    console.log(`${numerator} is ${percentage.toFixed(2)}% of ${denominator}`)
};

const buttonCalculatePercentage = document.createElement('button');
buttonCalculatePercentage.innerText = 'Calculate Percentage';
buttonCalculatePercentage.setAttribute('id', 'task-3')
buttonCalculatePercentage.addEventListener('click', calculatePercentage);
tasks.appendChild(buttonCalculatePercentage);

/**
 * 5) Kdo s koho.
 */
// Solution here

const compareNumbers = () => {
    const num1Input = document.getElementById ('num1');
    const num2Input = document.getElementById ('num2');

    const num1= Number (num1Input.value);
    const num2= Number (num2Input.value);
    
    if (num1>num2) {
        console.log(`First number is bigger!`);
    } else if (num1 < num2){
        console.log(`Second number is bigger!`);
    } else{
        console.log(`Numbers are equal.`);
    }
    };

const buttonCompareNumbers = document.createElement('button');
buttonCompareNumbers.innerText = 'Compare Numbers';
buttonCompareNumbers.setAttribute('id', 'task-4')
buttonCompareNumbers.addEventListener('click', compareNumbers);
tasks.appendChild(buttonCompareNumbers);

/**
 * 6) I can clearly see the pattern.
 */
// Solution here
const printMultiplesOf13 = () => {
    for (let i=0; i<=730;i += 13){
        console.log(`${i}`);
    }
};

const buttonPrintMultiplesOf13 = document.createElement('button');
buttonPrintMultiplesOf13.innerText = 'Print Multiples of 13';
buttonPrintMultiplesOf13.setAttribute('id', 'task-5')
buttonPrintMultiplesOf13.addEventListener('click', printMultiplesOf13);
tasks.appendChild(buttonPrintMultiplesOf13);

/**
 * 7) Around and about.
 */
// Solution here

const calculateCircleArea = () => {
    const radiusInput = document.getElementById ('radius');

    const radius= Number (radiusInput.value);

    if (radius<0){
        console.log(`Radius cannot be negative`)
    }

    const area= Math.PI*radius*radius;
    console.log(`Circle area with radius ${radius} is ${area.toFixed(2)}.`);
};

const buttonCalculateCircleArea = document.createElement('button');
buttonCalculateCircleArea.innerText = 'Calculate Circle Area';
buttonCalculateCircleArea.setAttribute('id', 'task-6')
buttonCalculateCircleArea.addEventListener('click', calculateCircleArea);
tasks.appendChild(buttonCalculateCircleArea);

/**
 * 8) Another dimension.
 */
// Solution here

const calculateConeVolume = () => {
    const radius2Input = document.getElementById ('radius2');
    const heightInput = document.getElementById ('height');

    const radius2= Number (radius2Input.value);
    const height= Number (heightInput.value);

    if (radius<0 || height < 0){
        console.log(`Radius and height cannot be negative`)
    }

    const volume= (1/3) * Math.PI*radius2*radius2*height;
    console.log(`Volume of the cone with radius ${radius2} and height ${height} is ${volume.toFixed(2)}.`);
};

const buttonCalculateConeVolume = document.createElement('button');
buttonCalculateConeVolume.innerText = 'Calculate Cone Volume';
buttonCalculateConeVolume.setAttribute('id', 'task-7')
buttonCalculateConeVolume.addEventListener('click', calculateConeVolume);
tasks.appendChild(buttonCalculateConeVolume);

/**
 * 9) Not Sure if triangle, or just some random values. 
 */
// Solution here

const isTriangle = () => {
    const aInput = document.getElementById ('a');
    const bInput = document.getElementById ('b');
    const cInput = document.getElementById ('c');

    const a= Number (aInput.value);
    const b= Number (bInput.value);
    const c= Number (cInput.value);

    if (a + b > c && a + c > b && b + c > a){
        console.log(`Sides ${a}, ${b}, and ${c} can form a triangle: Yes`);
        return true;
    }else{
        console.log(`Sides ${a}, ${b}, and ${c} can form a triangle: No`);
        return false;
    }
}
const buttonIsTriangle = document.createElement('button');
buttonIsTriangle.innerText = 'Is it triangular?';
buttonIsTriangle.setAttribute('id', 'task-8')
buttonIsTriangle.addEventListener('click', isTriangle);
tasks.appendChild(buttonIsTriangle);

/**
 * 9) Heroic performance. 
 */
// Solution here

const calculateTriangleArea = (a, b, c) => {
    const resultsDiv = document.getElementById('results');
  
    if (!isTriangle(a, b, c)) {
      resultsDiv.innerHTML = 'Entered sides do not form a triangle!';
      return;
    }
  
    const s = (a + b + c) / 2;
    const area2 = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    resultsDiv.innerHTML = `Triangle area is: ${area2.toFixed(2)}`;
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('task-9').addEventListener('click', () => {
      calculateTriangleArea(3, 4, 5);
    });
  });
  
  