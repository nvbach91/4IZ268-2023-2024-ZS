/**
 * Long live Sparta! Vytvořte funkci, která vyřeší Caesarovu širfu. Funkce dostane 
 * na vstup zašifrovaný text a také hodnotu, která byla použita při šifrování, a pak 
 * vrátí dešifrovaný text. Předpokládejte pouze anglickou abecedu s velkými 
 * písmeny, ostatní znaky ignorujte. Poté v konzoli dešifrujte/dešiftujte následující texty.
 * 
 * key used - encrypted text
 *       19 - MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG
 *        5 - YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW
 *       12 - M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ
 * 
 * Následně vytvořte uživatelské rozhraní, ve kterém bude možné zadat zmíněné dvě 
 * vstupní hodnoty (zašifrovaný text a použitý klíč) a po kliknutí na tlačítko 
 * "Decipher!" se na určeném místě zobrazí dešifrovaný text. Rozhraní také vhodně
 * nastylujte.
 */
//              0123456789...
// const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const shiftChar = (charCode, shift) => {
	let newCharCode = charCode - shift
	newCharCode = newCharCode < 65 ? 90 - (64 - newCharCode) : newCharCode

	return String.fromCharCode(newCharCode)
}

const shiftString = (str, shift) => {
	let newLine = ""
	for (let i = 0; i < str.length; i++) {
		const charCode = str.charCodeAt(i)
		if (charCode < 65 || charCode > 90) {
			newLine += str.charAt(i)
			continue
		}
		newLine += shiftChar(charCode, shift)
	}
	return newLine
}

const caesarDecipher = (cipherText, usedKeyStr) => {
	const usedKey = parseInt(usedKeyStr)
	return (!cipherText || !usedKey || !Number.isInteger(usedKey)) ? "Error" : shiftString(cipherText, usedKey)
}

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19))

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5))

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12))


// rozhrání
const init = () => {
	const main = document.createElement('main')

	const header = document.createElement('h2')
	header.innerText = "Long live Sparta!"
	main.appendChild(header)

	const textArea = document.createElement('textarea')
	textArea.setAttribute("class", "cipher")
	textArea.setAttribute("type", "text")
	textArea.setAttribute("placeholder", "Input your cipher")
	main.appendChild(textArea)

	const keyInput = document.createElement("input")
	keyInput.setAttribute("class", "key")
	keyInput.setAttribute("type", "number")
	keyInput.setAttribute("placeholder", "Input used key")
	main.appendChild(keyInput)

	const button = document.createElement("input")
	button.setAttribute("type", "button")
	button.setAttribute("class", "button")
	button.setAttribute("value", "Decipher")
	main.appendChild(button)

	const answerField = document.createElement("div")
	answerField.setAttribute("class", "answer")
	main.appendChild(answerField)

	button.addEventListener('click', () => {
		const cipher = textArea.value.toUpperCase()
		const usedKey = keyInput.value

		answerField.innerHTML = caesarDecipher(cipher, usedKey)
	})

	body = document.querySelector("body")
	body.appendChild(main)
}

init()