console.log('Ahoj světe');

// 1)

const birthYear = 2000;

var yearToday = new Date().getFullYear();

console.log("Pepe is " + ( yearToday - birthYear ) + " years old!");

// 2)

let C = 20;
let F = 50;

console.log(`${C}°C = ${C*9/5+32}°F`);
console.log(`${F}°F = ${(F-32)*5/9}°C`);

// 3)

const pepeIsYearsOld = (birthYear) =>{
    var yearToday = new Date().getFullYear();
    console.log("Pepe is " + ( yearToday - birthYear ) + " years old!");
};

const cToF = (C) => {
    const F = C*9/5+32;
    console.log(`${C}°C = ${F}°F`);
};

const fToC = (F) => {
    const C = (F-32)*5/9;
    console.log(`${F}°F = ${C}°C`);
};

const button1 = document.createElement('button');
const button2_1 = document.createElement('button');
const button2_2 = document.createElement('button');

button1.innerText = 'Log Pepes age';
button2_1.innerText = 'Log C to F';
button2_2.innerText = 'Log F to C';

button1.setAttribute('id', 'task-1');
button2_1.setAttribute('id', 'task-2_1');
button2_2.setAttribute('id', 'task-2_2');

button1.addEventListener('click', () => {
    pepeIsYearsOld(2000);
});

button2_1.addEventListener('click', () => {
    cToF(30);
});

button2_2.addEventListener('click', () => {
    fToC(50);
});

const tasks = document.querySelector('#tasks');
tasks.appendChild(button1);
tasks.appendChild(button2_1);
tasks.appendChild(button2_2);

// 4)

const getPercentage = (a, b) => {
    if (b === 0) {
        return 'Cant devide by 0';
    }
    return `${a} is ${(a / b * 100).toFixed(2)}% from ${b}`;
};


const button4 = document.createElement('button');

button4.addEventListener('click', () => {
    let res = getPercentage(50, 100);
    const results = document.querySelector('#results');
    results.innerHTML = "<p>" + res +"</p>";
});

button4.innerText = 'Percentage';
button4.setAttribute('id', 'task-4');
tasks.appendChild(button4);

const compare = (a, b) => {
    if (a < b) {
        return b;
    }
    if (a > b) {
        return a;
    }
    return `${a} = ${b}`;
};

const button5 = document.createElement('button');

button4.addEventListener('click', () => {
    let res = compare(50, 100);
    const results = document.querySelector('#results');
    results.innerHTML = "<p>" + res +"</p>";
});

button5.innerText = 'Compare';
button5.setAttribute('id', 'task-5');
tasks.appendChild(button5);

const thirteen = () => {
    for (let i = 0; i < 730; i += 13) {
        console.log(i);
    }
};

const circleArea = (r) => {
    return Math.PI * r ** 2;
};

const coneVolume = (h, r) => {
    return Math.PI * r ** 2 * h / 3;
};

const couldBeATriangle = (a, b, c) => {
    return (a + b > c && a + c > b && b + c > a);
};

const getTriangleArea = (a, b, c) => {
    if (!isTriangle(a, b, c)) {
        return 'Triangle with those parameters is not exists';
    }
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
};