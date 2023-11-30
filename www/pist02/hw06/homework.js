// Declaration and implementation of the function
const calculatePepesAge = () => {
    const input1Value = document.querySelector('#input1').value;
    const pepesBirthYear = input1Value && !isNaN(input1Value) ? (new Date().getFullYear() - parseInt(input1Value)) : 2000;
    const thisYear = new Date().getFullYear();
    const age = thisYear - pepesBirthYear;

    // Display the result in the "results" div
    const resultDiv = document.querySelector('#results');
    resultDiv.innerText = `Pepa is ${age} years old`;
};

// Creating the button
const buttonPepesAge = document.createElement('button');
// Setting the button's text
buttonPepesAge.innerText = "Task 1 (Pepe's age)";
// Setting the button's id attribute
buttonPepesAge.setAttribute('id', 'task-1');
// Binding the function to the button's click event
buttonPepesAge.addEventListener('click', calculatePepesAge);

// Selecting the existing element on the page with id="tasks"
const tasksDiv = document.querySelector('#tasks');
tasksDiv.appendChild(buttonPepesAge);

  
/////////////////////////////////////////////////////////////

// Function to calculate percentage
function calculatePercentage(num1, num2) {
    if (num2 === 0) {
        return "Division by zero is not allowed!";
    }
    let percentage = (num1 / num2) * 100;
    return `${num1} is ${percentage.toFixed(2)}% of ${num2}`;
}

// Code to create the button dynamically
const buttonCalculatePercentage = document.createElement('button');
buttonCalculatePercentage.innerText = "Calculate Percentage";
buttonCalculatePercentage.setAttribute('id', 'task-2');

// Binding the function to the button's click event
buttonCalculatePercentage.addEventListener('click', function() {
    const input1Value = parseFloat(document.querySelector('#input1').value);
    const input2Value = parseFloat(document.querySelector('#input2').value);
    
    const result = calculatePercentage(input1Value, input2Value);
    
    // Displaying the result in the 'results' div
    const resultsDiv = document.querySelector('#results');
    resultsDiv.textContent = result;
});

// Appending the button to the "tasks" div
tasksDiv.appendChild(buttonCalculatePercentage);


////////////////////////////////////////////////

function compareNumbers(num1, num2) {
    if (num1 > num2) {
        return `${num1} is greater than ${num2}.`;
    } else if (num1 < num2) {
        return `${num2} is greater than ${num1}.`;
    } else {
        return `${num1} and ${num2} are equal.`;
    }
}

// Code to create the button dynamically
const buttonCompareNumbers = document.createElement('button');
buttonCompareNumbers.innerText = "Compare Numbers";
buttonCompareNumbers.setAttribute('id', 'task-compare');

// Binding the function to the button's click event
buttonCompareNumbers.addEventListener('click', function() {
    const input1Value = parseFloat(document.querySelector('#input1').value);
    const input2Value = parseFloat(document.querySelector('#input2').value);
    
    const result = compareNumbers(input1Value, input2Value);
    
    // Displaying the result in the 'results' div
    const resultsDiv = document.querySelector('#results');
    resultsDiv.textContent = result;
});

// Appending the button to the "tasks" div
tasksDiv.appendChild(buttonCompareNumbers);



///////////////////////////////////////////////
//06
function listMultiplesOfThirteen() {
    let result = "Multiples of 13 less than or equal to 730: ";
    
    for(let i = 0; i <= 730; i += 13) {
        result += i + ", ";
    }

    // Removing the trailing comma and space at the end
    result = result.slice(0, -2);
    
    // Displaying the result in the 'results' div
    const resultsDiv = document.querySelector('#results');
    resultsDiv.textContent = result;
}

// Code to create the button dynamically
const buttonListMultiples = document.createElement('button');
buttonListMultiples.innerText = "List Multiples of 13";
buttonListMultiples.setAttribute('id', 'task-multiples');

// Binding the function to the button's click event
buttonListMultiples.addEventListener('click', listMultiplesOfThirteen);

// Appending the button to the "tasks" div
tasksDiv.appendChild(buttonListMultiples);

//////////////////////////////////////////
//07
function calculateCircleArea(radius) {
    const PI = 3.141592653589793;
    return PI * radius * radius;
}

// Code to create the button dynamically
const buttonCalculateArea = document.createElement('button');
buttonCalculateArea.innerText = "Calculate Circle Area";
buttonCalculateArea.setAttribute('id', 'task-circle-area');

// Binding the function to the button's click event with a static radius value (e.g., 5)
buttonCalculateArea.addEventListener('click', function() {
    const radius = 5; // You can change this value as needed
    const area = calculateCircleArea(radius);
    
    // Displaying the result in the 'results' div
    const resultsDiv = document.querySelector('#results');
    resultsDiv.textContent = `The area of a circle with radius ${radius} is ${area.toFixed(2)}`;
});

// Appending the button to the "tasks" div
tasksDiv.appendChild(buttonCalculateArea);


///////////////////////////////////////////
//09
function calculateConeVolume(radius, height) {
    const PI = 3.141592653589793;
    return (1/3) * PI * radius * radius * height;
}

// Code to create the button dynamically
const buttonCalculateConeVolume = document.createElement('button');
buttonCalculateConeVolume.innerText = "Calculate Cone Volume";
buttonCalculateConeVolume.setAttribute('id', 'task-cone-volume');

// Binding the function to the button's click event with static radius and height values (e.g., 5 and 10)
buttonCalculateConeVolume.addEventListener('click', function() {
    const radius = 5; // You can change this value as needed
    const height = 10; // You can change this value as needed
    const volume = calculateConeVolume(radius, height);
    
    // Displaying the result in the 'results' div
    const resultsDiv = document.querySelector('#results');
    resultsDiv.textContent = `The volume of a cone with radius ${radius} and height ${height} is ${volume.toFixed(2)}`;
});

// Appending the button to the "tasks" div
tasksDiv.appendChild(buttonCalculateConeVolume);



////////////////////////////////////////////////////////
//09
function canFormTriangle(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        return true;
    }
    return false;
}

// Code to create the button dynamically
const buttonCanFormTriangle = document.createElement('button');
buttonCanFormTriangle.innerText = "Can Form Triangle?";
buttonCanFormTriangle.setAttribute('id', 'task-triangle');

// Binding the function to the button's click event with static side values (e.g., 3, 4, and 5)
buttonCanFormTriangle.addEventListener('click', function() {
    const sideA = 3; // You can change this value as needed
    const sideB = 4; // You can change this value as needed
    const sideC = 5; // You can change this value as needed
    const result = canFormTriangle(sideA, sideB, sideC);
    
    // Displaying the result in the 'results' div
    const resultsDiv = document.querySelector('#results');
    if (result) {
        resultsDiv.textContent = `The lengths ${sideA}, ${sideB}, and ${sideC} can form a triangle: Yes (true)`;
    } else {
        resultsDiv.textContent = `The lengths ${sideA}, ${sideB}, and ${sideC} can form a triangle: No (false)`;
    }
});

// Appending the button to the "tasks" div
tasksDiv.appendChild(buttonCanFormTriangle);
