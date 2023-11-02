//1
const bornIn = 1990;
const year = new Date().getFullYear();

console.log(`Pepovi je ${year - bornIn} let`);


//2
const celsius = 20;
const fahrenheiht = 68;

const convertedCelsiusToFahrenheiht = celsius * 9 / 5 + 32;
const convertedFahrenheihtToCelsius = (fahrenheiht - 32) * 5 / 9;

convertCelsiusToFahrenheit(20); 
convertFahrenheitToCelsius(68); 
  

//3
function getAge(yearOfBirth) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearOfBirth;
    console.log(`Pepovi je ${age} let.`);
}

function convertCelsiusToFahrenheit(celsius) {
    const fahrenheit = (celsius * 9/5) + 32;
    console.log(`${celsius}°C = ${fahrenheit}°F`);
}
  
  function convertFahrenheitToCelsius(fahrenheit) {
    const celsius = (fahrenheit - 32) * 5/9;
    console.log(`${fahrenheit}°F = ${celsius}°C`);
}

const buttonTask1 = document.createElement('button');
buttonTask1.innerText = "Pepe's age";
buttonTask1.setAttribute('id', 'task-1');
buttonTask1.addEventListener('click', () => {
  getAge(1990); 
});

const task2 = document.querySelector('#tasks');
task2.appendChild(buttonTask1);

const buttonTask2 = document.createElement('button');
buttonTask2.innerText = "Převeď teplotu";
buttonTask2.setAttribute('id', 'task-2');
buttonTask2.addEventListener('click', () => {
  convertCelsiusToFahrenheit(20);
});

const task3 = document.querySelector('#tasks');
task3.appendChild(buttonTask1);
task3.appendChild(buttonTask2);


//4
const getPercentage = (a, b) => {
    if (b === 0) {
        return 'Nelze delit nulou';
    }
    return `Podil cisla ${a} z cisla ${b} je ${(a / b * 100).toFixed(2)}%`;
};
  
const buttonTask4 = document.createElement('button');
buttonTask4.innerText = "Vypočítej procenta";
buttonTask4.setAttribute('id', 'task-4');

buttonTask4.addEventListener('click', () => {
  const result = getPercentage(29, 93);
  const resultElement = document.createElement('p');
  resultElement.innerText = result;

  const resultsContainer = document.querySelector('#results');
  resultsContainer.innerHTML = ''; 
  resultsContainer.appendChild(resultElement);
});

const task4 = document.querySelector('#tasks');
task4.appendChild(buttonTask4);


//5
const compare = (a, b) => {
    if (a > b) {
        return "První číslo je větší.";
      } else if (b > a) {
        return "Druhé číslo je větší.";
      } else if (b = a){
        return "Čísla se rovnají.";
      }
    }

const buttonTest1 = document.createElement('button');
  buttonTest1.innerText = "Test 1 (100, 100)";
  buttonTest1.setAttribute('id', 'test-1');
  buttonTest1.addEventListener('click', () => {
    const result = compare(100, 100);

    const resultElement = document.createElement('div');
    resultElement.textContent = result;
    
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultElement);
});

const buttonTest2 = document.createElement('button');
  buttonTest2.innerText = "Test 2 (29, 47)";
  buttonTest2.setAttribute('id', 'test-2');
  buttonTest2.addEventListener('click', () => {
    const result = compare(29, 47);

    const resultElement = document.createElement('div');
    resultElement.textContent = result;
    
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultElement);
});

const buttonTest3 = document.createElement('button');
  buttonTest3.innerText = "Test 3 (62.4, 0.6)";
  buttonTest3.setAttribute('id', 'test-3');
  buttonTest3.addEventListener('click', () => {
    const result = compare(62.4, 0.6);

    const resultElement = document.createElement('div');
    resultElement.textContent = result;
    
    const resultsContainer = document.querySelector('#results');
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(resultElement);
});

const task5 = document.querySelector('#tasks');
task5.appendChild(buttonTest1);
task5.appendChild(buttonTest2);
task5.appendChild(buttonTest3);


//6
function printMultiplesOf13() {
    for (let i = 0; i <= 730; i += 13) {
      console.log(i);
    }
}
  
const buttonTask6 = document.createElement('button');
  buttonTask6.innerText = "Násobky 13";
  buttonTask6.setAttribute('id', 'task-6');
  buttonTask6.addEventListener('click', () => {
    printMultiplesOf13();
});
  
const task6 = document.querySelector('#tasks');
task6.appendChild(buttonTask6);


//7
const getCircleArea = (radius) => {
    return Math.PI * radius ** 2;
};

const buttonTask7 = document.createElement('button');
  buttonTask7.innerText = "Vypočítej plochu kruhu";
  buttonTask7.setAttribute('id', 'task-7');
  buttonTask7.addEventListener('click', () => {
    const radius = 16; 
    const area = getCircleArea(radius);
    console.log(`Plocha kruhu o poloměru ${radius} je ${area}`);
});
  
const task7 = document.querySelector('#tasks');
task7.appendChild(buttonTask7);


//8
const getConeVolume = (height, radius) => {
    return Math.PI * radius ** 2 * height / 3;
};

const buttonTask8 = document.createElement('button');
  buttonTask8.innerText = "Vypočítejte objem kužele";
  buttonTask8.setAttribute('id', 'task-8');
  buttonTask8.addEventListener('click', () => {
    const height = 10; 
    const radius = 5; 
    const volume = getConeVolume(height, radius);
    console.log(`Objem kužele s výškou ${height} a poloměrem ${radius} je ${volume}`);
});
  
const task8 = document.querySelector('#tasks');
task8.appendChild(buttonTask8);


//9
const isTriangle = (a, b, c) => {
    if (a + b > c && a + c > b && b + c > a)
        return "Trojúhelník lze sestrojit"
    else {
        return "Trojúhelník nelze sestrojit"
      }
};

const buttonTask9 = document.createElement('button');
buttonTask9.innerText = "Zkontroluj trojúhelník";
buttonTask9.setAttribute('id', 'task-9');
buttonTask9.addEventListener('click', () => {
  const a = 5; 
  const b = 6;
  const c = 10;
  const result = isTriangle(a, b, c);
  console.log(result);
});

const task9 = document.querySelector('#tasks');
task9.appendChild(buttonTask9);


//10
const getTriangleArea = (a, b, c) => {
    if (!isTriangle(a, b, c)) {
        return `Neni to validni trojuhelnik`;
    }
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return area;
};
  
const buttonTask10 = document.createElement('button');
buttonTask10.innerText = "Vypočítej plochu trojúhelníku (Heronův vzorec)";
buttonTask10.setAttribute('id', 'task-10');
buttonTask10.addEventListener('click', () => {
  const a = 7; 
  const b = 24;
  const c = 25;
  const result = getTriangleArea(a, b, c);
  console.log(`Výsledek: ${result}`);
});

const task10 = document.querySelector('#tasks');
task10.appendChild(buttonTask10);