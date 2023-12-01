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
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const mod = (n, m) => {     //  right mod
    return ((n % m) + m) % m;
}

const shiftChar = (c, shift) => {
    if (c.match(/[A-Z]/)) {
        const index =  mod((alphabet.indexOf(c) - shift), 26);
        return alphabet[index];
    } else {
        return c;
    }
};
const shiftString = (str, shift) => {
    return str
        .split('')
        .map(char => shiftChar(char, shift))
        .join('');
};
const caesarDecipher = (cipherText, usedKey) => {
    const key = (usedKey % 26 + 26) % 26;
    return !!cipherText || !!usedKey ? shiftString(cipherText, key) : null
};

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));


const main = () => {
    const decryptor = document.createElement('decryptor')
    decryptor.classList.add('decryptor')

    const decryptorContent = document.createElement('div')
    decryptorContent.classList.add('decryptorContent')
    
    const label = document.createElement('h2')
	label.innerText = "Long live Sparta!"
    
	const textArea = document.createElement('textarea')
    textArea.placeholder = "Input your cipher"
    textArea.type = "text"
	textArea.classList.add('cipherInput')
    
	const keyInput = document.createElement("input")
    keyInput.classList.add('keyInput')
    keyInput.type = "number"
    keyInput.placeholder = "Input decryptor key"
    
	const button = document.createElement("input")
    button.type = "button"
    button.classList.add("saveBtn")
    button.value = "Decipher"
    
	const answer = document.createElement("div")
    answer.innerHTML = "Your answer will appear here"
    answer.classList.add("answer")
    
    // inserting all childs
    decryptorContent.appendChild(label)
    decryptorContent.appendChild(textArea)
    decryptorContent.appendChild(keyInput)
    decryptorContent.appendChild(button)

    const body = document.querySelector("body")
    body.appendChild(decryptor)
    body.appendChild(answer)
    decryptor.appendChild(decryptorContent)

	button.addEventListener('click', () => {
		answer.innerHTML = caesarDecipher(textArea.value.toUpperCase(), keyInput.value)
	})

}

main()