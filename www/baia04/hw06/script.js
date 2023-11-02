console.log("hello, world!")

/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu s věkem Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů nebo interpolaci. Pro názvy proměnných 
 * používejte smysluplnou angličtinu.
 */
// Solution here
const getAge = () => {
	const yearOfBirth = 1999
	const date = new Date()
	const yearNow = date.getYear() + 1900
	const age = yearNow - yearOfBirth
	const answer = `Pepe je ${age} let`
	console.log(answer)
}
getAge()

/**
 * 2) WTF (wow, that's fun). Vypište na konzoli teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Opět používejte proměnné. Výpočet probíhá takto:
 *     z C na F: vynásobit 9, vydělit 5 a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit 5 a vydělit 9. 
 */
// Solution here
const getTemperature = () => {
	const tempCelsius = 20

	const getFahrenheiht = (temp) => {
		return temp * 9 / 5 + 32
	}
	const getCelsius = (temp) => {
		return (temp - 32) * 5 / 9
	}

	const tempFahrenheiht = getFahrenheiht(tempCelsius)
	const celsiusByFahrenheit = getCelsius(tempFahrenheiht)

	const answer = `${tempCelsius}°C = ${tempFahrenheiht}°F resp. ${tempFahrenheiht}°F = ${celsiusByFahrenheit} °C.`
	console.log(answer)
}
getTemperature()

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
// Solution here
const tasks = document.querySelector('#tasks')
const results = document.querySelector('#results')

const getAgeByYear = (year) => {
	const date = new Date()
	const yearNow = date.getYear() + 1900
	const age = yearNow - year
	const answer = `Pepe je ${age} let`
	return answer
}
const buttonGetAge = document.createElement('button')
const resultGetAge = document.createElement('div')
const resultGetAgeAElem = document.createElement('a')
resultGetAge.setAttribute('id', 'task-3')
buttonGetAge.innerText = 'Task 3. Get Age'
buttonGetAge.setAttribute('id', 'task-3')
buttonGetAge.addEventListener('click', () => {
	const year = 1990
	resultGetAgeAElem.innerText = getAgeByYear(year)
	resultGetAge.appendChild(resultGetAgeAElem)
})
results.appendChild(resultGetAge)
tasks.appendChild(buttonGetAge)

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla. 
 * Výsledek vypište v procentech do předem vytvořeného místa na stránce pro výsledky, např. 21 je 50% z 42. Pro 
 * zkrácení / zaokrouhlení desetinných míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); 
 * Pozor na dělení nulou! 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3
 */
// Solution here

const getPercent = (num1, num2) => {
	if (num2 === 0) return
	const division = num1 / num2
	const perc = division * 100
	return perc
}
const buttonGetPercent = document.createElement('button')
const resultGetPercent = document.createElement('div')
const resultGetPercentAElem = document.createElement('a')
resultGetPercent.setAttribute('id', 'task-4')
buttonGetPercent.innerText = 'Task 4. Get Percent'
buttonGetPercent.setAttribute('id', 'task-4')
buttonGetPercent.addEventListener('click', () => {
	let answer
	const num1 = 5
	const num2 = 10
	if (num2 == 0 || !num1 || !num2) {
		answer = "Error"
	} else {
		const perc = getPercent(num1, num2)
		answer = `${num1} je ${perc.toFixed(2)}% z ${num2}`
	}
	resultGetPercentAElem.innerText = answer
	resultGetPercent.appendChild(resultGetPercentAElem)
})
results.appendChild(resultGetPercent)
tasks.appendChild(buttonGetPercent)



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vypíše, který z nich je větší, do předem vytvořeného
 * místa na strácne. Pokud se čísla rovnají, vypište, že se rovnají.
 *
 * Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky, atd., tj. vytvoříte tlačítko s událostí pro každou
 * kombinaci argumentů a zkuste ji párkrát zavolat kliknutím na toto tlačítko. Tlačítka vytvářejte podle pokynu v
 * úloze č. 3. Argumenty pro volání funkce zadávejte staticky.
 */
// Solution here
const getBigger = (num1, num2) => {
	if (num1 === num2) return "Jsou si rovny"
	return `Větší je ` + (num1 > num2 ? num1 : num2)
}
const buttonGetBigger = document.createElement('button')
const resultGetBigger = document.createElement('div')
const resultGetBiggerAElem = document.createElement('a')
resultGetBigger.setAttribute('id', 'task-5')
buttonGetBigger.innerText = 'Task 5. Get Bigger'
buttonGetBigger.setAttribute('id', 'task-5')
buttonGetBigger.addEventListener('click', () => {
	let answer
	const num1 = 1
	const num2 = 10
	answer = !num1 || !num2 ? 'Error' : getBigger(num1, num2)
	resultGetBiggerAElem.innerText = answer
	resultGetBigger.appendChild(resultGetBiggerAElem)
})
results.appendChild(resultGetBigger)
tasks.appendChild(buttonGetBigger)



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for cyklus. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3.
 */
// Solution here
const getPattern = (value) => {
	const answer = []
	for (let i = 0; i < value; i += 13) {
		answer.push(i)
	}
	return answer
}
const buttonGetPattern = document.createElement('button')
const resultGetPattern = document.createElement('div')
const resultGetPatternAElem = document.createElement('a')
resultGetPattern.setAttribute('id', 'task-6')
buttonGetPattern.innerText = 'Task 6. Get Pattern'
buttonGetPattern.setAttribute('id', 'task-6')
buttonGetPattern.addEventListener('click', () => {
	let value = 730
	resultGetPatternAElem.innerText = getPattern(value)
	resultGetPattern.appendChild(resultGetPatternAElem)
})
results.appendChild(resultGetPattern)
tasks.appendChild(buttonGetPattern)



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 *
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const getCircleArea = (radius) => {
	const pi = Math.PI
	return (pi * Math.pow(radius, 2)).toFixed(2)
}
const buttonGetCircleArea = document.createElement('button')
const resultGetCircleArea = document.createElement('div')
const resultGetCircleAreaAElem = document.createElement('a')
resultGetCircleArea.setAttribute('id', 'task-7')
buttonGetCircleArea.innerText = 'Task 7. Get Circle Area'
buttonGetCircleArea.setAttribute('id', 'task-7')
buttonGetCircleArea.addEventListener('click', () => {
	let radius = 3
	resultGetCircleAreaAElem.innerText = `Obsah kružnice s radiusem ${radius} je ${getCircleArea(radius)}`
	resultGetCircleArea.appendChild(resultGetCircleAreaAElem)
})
results.appendChild(resultGetCircleArea)
tasks.appendChild(buttonGetCircleArea)



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 * 
 * Pro testování vytvořte tlačítko s touto funkcí podle pokynu v úloze č. 3. Argumenty pro volání funkce zadávejte 
 * staticky.
 */
// Solution here
const getConeVolume = (radius, height) => {
	// V = 1/3 * pi * r**2 * h
	return (1 / 3 * Math.PI * Math.pow(radius, 2) * height).toFixed(2)
}
const buttonGetConeVolume = document.createElement('button')
const resultGetConeVolume = document.createElement('div')
const resultGetConeVolumeAElem = document.createElement('a')
resultGetConeVolume.setAttribute('id', 'task-8')
buttonGetConeVolume.innerText = 'Task 8. Get Cone Volume'
buttonGetConeVolume.setAttribute('id', 'task-8')
buttonGetConeVolume.addEventListener('click', () => {
	let radius = 3
	let height = 5
	resultGetConeVolumeAElem.innerText = `Objem kuželu s radiusem ${radius} a výškou ${height} je ${getConeVolume(radius, height)}`
	resultGetConeVolume.appendChild(resultGetConeVolumeAElem)
})
results.appendChild(resultGetConeVolume)
tasks.appendChild(buttonGetConeVolume)

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
	return a + b >= c && a + c >= b && b + c >= a
}
const buttonCheckTriangle = document.createElement('button')
const resultCheckTriangle = document.createElement('div')
const resultCheckTriangleAElem = document.createElement('a')
resultCheckTriangle.setAttribute('id', 'task-9')
buttonCheckTriangle.innerText = 'Task 9. Check if triangle'
buttonCheckTriangle.setAttribute('id', 'task-9')
buttonCheckTriangle.addEventListener('click', () => {
	let firstTriangle = [3, 4, 5]
	let secondTriangle = [3, 4, 8]
	resultCheckTriangleAElem.innerText = `Trojúhelník se stránami ${firstTriangle[0]} ${firstTriangle[1]} ${firstTriangle[2]} ${isTriangle(...firstTriangle) ? "JE troúhelníkem" : "NENI trojúhelníkem"}. `
	resultCheckTriangleAElem.innerText += `Trojúhelník se stránami ${secondTriangle[0]} ${secondTriangle[1]} ${secondTriangle[2]} ${isTriangle(...secondTriangle) ? "JE troúhelníkem" : "NENI trojúhelníkem"}`
	resultCheckTriangle.appendChild(resultCheckTriangleAElem)
})
results.appendChild(resultCheckTriangle)
tasks.appendChild(buttonCheckTriangle)


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
const getTriangleAreaByHeron = (a, b, c) => {
	// S = (p*(p-a)*(p-b)*(p-c))**(1/2), kde p = 1/2*P = 1/2(a+b+c)
	if (!isTriangle(a, b, c)) return
	const perimeter = a + b + c
	const p = 1 / 2 * perimeter
	return Math.sqrt(p * (p - a) * (p - b) * (p - c))
}
const buttonGetTriangleAreaByHeron = document.createElement('button')
const resultGetTriangleAreaByHeron = document.createElement('div')
const resultGetTriangleAreaByHeronAElem = document.createElement('a')
resultGetTriangleAreaByHeron.setAttribute('id', 'task-10')
buttonGetTriangleAreaByHeron.innerText = 'Task 10. Get triangle Area By Heron'
buttonGetTriangleAreaByHeron.setAttribute('id', 'task-10')
buttonGetTriangleAreaByHeron.addEventListener('click', () => {
	let firstTriangle = [3, 4, 5]
	answer = isTriangle(...firstTriangle) ? `má obsah ${getTriangleAreaByHeron(...firstTriangle)}` : "není troúhelníkem"
	resultGetTriangleAreaByHeronAElem.innerText = `Trojúhelník se stránami ${firstTriangle[0]} ${firstTriangle[1]} ${firstTriangle[2]} ${answer}`
	resultGetTriangleAreaByHeron.appendChild(resultGetTriangleAreaByHeronAElem)
})
results.appendChild(resultGetTriangleAreaByHeron)
tasks.appendChild(buttonGetTriangleAreaByHeron)



let i = 2
results.childNodes.forEach((element) => {
	i++
	const aElem = document.createElement("a")
	aElem.innerText = `Task ${i} answer:`
	element.appendChild(aElem)
})
