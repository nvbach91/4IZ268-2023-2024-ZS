console.log('Hello world!')

const pepeAge = 2003
const year = new Date().getFullYear()

const celsius = 32
const farenheit = 70

const celsiusToFarenheitConverted = (celsius * 9) / 5 + 32
const farenheitToCelsiusConverted = ((farenheit - 32) * 5) / 9

const getAge = birthYear => {
	return new Date().getFullYear() - birthYear
}

const celsiusToFarenheit = celsius => {
	return (celsius * 9) / 5 + 32
}

const farenheitToCelsius = fahrenheit => {
	return ((fahrenheit - 32) * 5) / 9
}

const getPercentage = (a, b) => {
	if (b === 0) {
		return 'Nelze delit nulou'
	}
	return `Podil cisla ${a} z cisla ${b} je ${((a / b) * 100).toFixed(2)}%`
}

const compare = (a, b) => {
	if (a < b) {
		return b
	}
	if (a > b) {
		return a
	}
	return 'Cisla se rovnaji'
}

const getCircleArea = radius => {
	return Math.PI * radius ** 2
}

const getConeVolume = (height, radius) => {
	return (Math.PI * radius ** 2 * height) / 3
}

const isTriangle = (a, b, c) => {
	return a + b > c && a + c > b && b + c > a
}

const getTriangleArea = (a, b, c) => {
	if (!isTriangle(a, b, c)) {
		return `Neni to validni trojuhelnik`
	}
	const s = (a + b + c) / 2
	const area = Math.sqrt(s * (s - a) * (s - b) * (s - c))
	return area
}

// Selects div elements

const tasks = document.querySelector('#tasks')
const results = document.querySelector('#results')

// Creates an HTML element
const createElement = (elementId, attr) => {
	let element = document.createElement(elementId)
	element.setAttribute('id', attr)
	return element
}

//TASK 1

const buttonTask1 = createElement('button', 'button task-1')
buttonTask1.innerText = 'Pepa age'
let pepaAge
let resultField1 = createElement(('h1', 'task-1'))
results.appendChild(resultField1)

buttonTask1.addEventListener('click', () => {
	pepaAge = input1.value
	resultField1.innerHTML = `Pepa's age = ${getAge(pepaAge)}`
})

const input1 = createElement('input', 'input-1')
input1.setAttribute('type', 'text')
let input1Value = input1.value

tasks.appendChild(buttonTask1)
tasks.appendChild(input1)

//TASK 2

//Celsius

const buttonTask2 = createElement('button', 'button task-2')
buttonTask2.innerText = 'farenheitToCelsius'

buttonTask2.addEventListener('click', () => {
	let input2Value = input2.value

	resultField2.innerHTML = `Celsius = ${farenheitToCelsius(input2Value)}`
})

//Farenheit
const buttonTask3 = createElement('button', 'button task-3')
buttonTask3.innerText = 'celsiusToFarenheit'

buttonTask3.addEventListener('click', () => {
	let input2Value = input2.value

	resultField2.innerHTML = `Farenheit = ${celsiusToFarenheit(input2Value)}`
})

const input2 = createElement('input', 'input-2')
input2.setAttribute('type', 'text')

let resultField2 = createElement(('h1', 'task-2'))

results.appendChild(resultField2)
tasks.appendChild(buttonTask3)
tasks.appendChild(buttonTask2)
tasks.appendChild(input2)

// Task 4

let resultField4 = createElement(('h1', 'task-4'))

const buttonTask4 = createElement('button', 'button task-4')
buttonTask4.innerText = 'Get Percentage'

buttonTask4.addEventListener('click', () => {
	let input3Value = input3.value
	let input4Value = input4.value

	resultField4.innerHTML = `Percentage = ${getPercentage(
		input3Value,
		input4Value
	)}`
})

const input3 = createElement('input', 'input-3')
input3.setAttribute('type', 'text')
let input3Value = input3.value

const input4 = createElement('input', 'input-4')
input4.setAttribute('type', 'text')
let input4Value = input4.value

tasks.appendChild(buttonTask4)
tasks.appendChild(input3)
tasks.appendChild(input4)
results.appendChild(resultField4)

// Task 5

let resultField5 = createElement(('h1', 'task-5'))

const buttonTask5 = createElement('button', 'button task-5')
buttonTask5.innerText = 'Compare!'

buttonTask5.addEventListener('click', () => {
	let input5Value = input5.value
	let input6Value = input6.value

	resultField5.innerHTML = `The biggest is = ${compare(
		input5Value,
		input6Value
	)}`
})

const input5 = createElement('input', 'input-5')
input5.setAttribute('type', 'text')
let input5Value = input5.value

const input6 = createElement('input', 'input-6')
input6.setAttribute('type', 'text')
let input6Value = input6.value

tasks.appendChild(buttonTask5)
tasks.appendChild(input5)
tasks.appendChild(input6)
results.appendChild(resultField5)

//Task 6

let resultField6 = createElement(('h1', 'task-6'))

const buttonTask6 = createElement('button', 'button task-6')
buttonTask6.innerText = 'Count!'

buttonTask6.addEventListener('click', () => {
	const count = () => {
		for (let i = 0; i < 730; i += 13) {
			return i
		}
	}
	let result6 = count()
	resultField6.innerHTML = result6
})

tasks.appendChild(buttonTask6)
tasks.appendChild(resultField6)

//Task 7

let resultField7 = createElement(('h1', 'task-7'))

const buttonTask7 = createElement('button', 'button task-7')
buttonTask7.innerText = 'Radius!'

buttonTask7.addEventListener('click', () => {
	let input7Value = input7.value

	resultField7.innerHTML = `The radius is = ${getCircleArea(input7Value)}`
})

const input7 = createElement('input', 'input-7')
input7.setAttribute('type', 'text')

tasks.appendChild(buttonTask7)
tasks.appendChild(input7)
results.appendChild(resultField7)

// Task 8

let resultField8 = createElement(('h1', 'task-8'))

const buttonTask8 = createElement('button', 'button task-8')
buttonTask8.innerText = 'Cone volume!'

buttonTask8.addEventListener('click', () => {
	let input8Value = input8.value
	let input9Value = input9.value

	resultField8.innerHTML = `The cone volume is = ${getConeVolume(
		input8Value,
		input9Value
	)}`
})

const input8 = createElement('input', 'input-8')
input8.setAttribute('type', 'text')
const input9 = createElement('input', 'input-9')
input8.setAttribute('type', 'text')

tasks.appendChild(buttonTask8)
tasks.appendChild(input8)
tasks.appendChild(input9)
results.appendChild(resultField8)

// Task 9

let resultField9 = createElement(('h1', 'task-9'))

const buttonTask9 = createElement('button', 'button task-9')
buttonTask9.innerText = 'Triangle?'

buttonTask9.addEventListener('click', () => {
	let input10Value = input10.value
	let input11Value = input11.value
	let input12Value = input12.value
	let triangle
	if (isTriangle(input10Value, input11Value, input12Value)) {
		triangle = 'true'
	} else triangle = 'false'
	resultField9.innerHTML = `Is triangle ${triangle}`
})

const input10 = createElement('input', 'input-10')
input10.setAttribute('type', 'text')
const input11 = createElement('input', 'input-11')
input11.setAttribute('type', 'text')
const input12 = createElement('input', 'input-12')
input12.setAttribute('type', 'text')

tasks.appendChild(buttonTask9)
tasks.appendChild(input10)
tasks.appendChild(input11)
tasks.appendChild(input12)
results.appendChild(resultField9)

// Task 10

let resultField10 = createElement(('h1', 'task-10'))

const buttonTask10 = createElement('button', 'button task-10')
buttonTask10.innerText = 'Triangle area'

buttonTask10.addEventListener('click', () => {
	let input13Value = input13.value
	let input14Value = input14.value
	let input15Value = input15.value

	resultField10.innerHTML = `Triangle area = ${getTriangleArea(
		input13Value,
		input14Value,
		input15Value
	)}`
})

const input13 = createElement('input', 'input-13')
input13.setAttribute('type', 'text')
const input14 = createElement('input', 'input-14')
input14.setAttribute('type', 'text')
const input15 = createElement('input', 'input-15')
input15.setAttribute('type', 'text')

tasks.appendChild(buttonTask10)
tasks.appendChild(input13)
tasks.appendChild(input14)
tasks.appendChild(input15)
results.appendChild(resultField10)
