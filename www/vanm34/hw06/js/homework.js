
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
const birthYear = 2000;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;
console.log(`Pepe is ${age} years old.`);

//1
function GetPepeAge(pepeBirthYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}

//2
function convertTemperatureToFahrenheit(celsius) {
    const fahrenheit = (celsius * 9 / 5) + 32;
    return `${celsius}°C = ${fahrenheit}°F`;
}

function convertTemperatureToCelsius(fahrenheit) {
    const celsius = ((fahrenheit - 32) * 5) / 9;
    return `${fahrenheit}°F is ${celsius}°C`;
}
 
//4
function calculatePercentage(num1, num2) {
    if (num2 === 0) {
        return 'Division by zero is not allowed!';
    }
    const result = (num1 / num2 * 100).toFixed(2);
    return `${num1} is ${result}% of ${num2}`;
}

//5
function compareNumbers(num1, num2) {
    if (num1 > num2) {
        return `${num1} is greater than ${num2}`;
    } else if (num1 < num2) {
        return `${num1} is smaller than ${num2}`;
    } else {
        return `${num1} and ${num2} are equal`;
    }
}

//6
const printMultiples = () => {
    let result = '';
    for (let i = 0; i <= 730; i += 13) {
      result += i + ' ';
    }
    return result;
};


//7
function calculateCircleArea(radius) {
    const area = Math.PI * Math.pow(radius, 2);
    return `The area of the circle with radius ${radius} is ${area.toFixed(2)}`;
}

//8
function calculateConeVolume(height, radius) {
    const volume = (Math.PI * Math.pow(radius, 2) * height) / 3;
    return `The volume of the cone with height ${height} and radius ${radius} is ${volume.toFixed(2)}`;
}

//9
function isTriangle(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        return true;
    } else {
        return false;
    }
}

//10
function calculateTriangleArea(a, b, c) {
    if (isTriangle(a, b, c)) {
        const s = (a + b + c) / 2;
        const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        return`The area of the triangle with sides ${a}, ${b}, and ${c} is ${area.toFixed(2)}`;
    } else {
        return `Invalid triangle sides: ${a}, ${b}, and ${c}`;
    }
}

/* Buttons */


function createButton(taskNumber, taskFunction) {
    const button = document.createElement('button');
    button.innerText = `Task ${taskNumber}`;
    button.setAttribute('id', `task-${taskNumber}`);
    button.addEventListener('click', () => {
        const resultDiv = document.querySelector('#results');
        resultDiv.textContent = taskFunction();
    });
    const tasksDiv = document.querySelector('#tasks');
    tasksDiv.appendChild(button);
}


createButton(1, () => {
    return 'Pepe is ' + GetPepeAge(2000) + ' years old';
});

createButton('2 - °C to °F', () => {
    return convertTemperatureToFahrenheit(20);
});

createButton('2 - °F to °C', () => {
    return convertTemperatureToCelsius(68);
});

createButton(4, () => {
    const num1 = 21;
    const num2 = 42;
    return calculatePercentage(num1, num2);
});

//5
createButton('5- int !=', () => {
    const num1 = 15;
    const num2 = 20;
    return compareNumbers(num1, num2);
});

createButton('5- equal', () => {
    const num1 = 20;
    const num2 = 20;
    return compareNumbers(num1, num2);
});

createButton('5-zlomky', () => {
    const num1 = 20.2;
    const num2 = 20.1;
    return compareNumbers(num1, num2);
});

// 6 šesté tlačítko
const tasksDiv = document.getElementById('tasks');
const resultsDiv = document.getElementById('results');

const buttonPrintMultiples = document.createElement('button');
buttonPrintMultiples.innerText = '6- Násobky 13';
buttonPrintMultiples.setAttribute('id', 'task-6');
buttonPrintMultiples.addEventListener('click', () => {
  const result = printMultiples();
  resultsDiv.textContent = result;
});

tasksDiv.appendChild(buttonPrintMultiples);

createButton(7, () => {
    const radius = 5;
    
    return calculateCircleArea(radius);
});

createButton(8, () => {
    const height = 8;
    const radius = 4;
    calculateConeVolume(height, radius);
    return calculateConeVolume(height, radius);
});

createButton(9, () => {
    const a = 3;
    const b = 4;
    const c = 5;
    return `Can form a triangle with sides ${a}, ${b}, and ${c}: ${isTriangle(a, b, c)}`;
});

createButton('10- triangl_ok', () => {
    const a = 8;
    const b = 15;
    const c = 10;
    return calculateTriangleArea(a, b, c);
});

createButton('10- triangl_error', () => {
    const a = 1;
    const b = 50;
    const c = 10;
    return calculateTriangleArea(a, b, c);
});