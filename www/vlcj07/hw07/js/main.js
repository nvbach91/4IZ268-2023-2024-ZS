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

const shiftChar = (c, shift) => {
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result

    c = c.toUpperCase();

    const index = alphabet.indexOf(c);

    if (index < 0) {
        return c;
    }

    const shiftedIndex = (index - shift + alphabet.length) % alphabet.length;
    
    return alphabet.charAt(shiftedIndex);
};
const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result

    let chars = str.split('');
    let newStr = [];

    chars.forEach(c => {
        newStr.push(shiftChar(c, shift));
    })

    return newStr.join('');
};
const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    return shiftString(cipherText, usedKey);
};

// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);

const container = document.body.appendChild(document.createElement('div'));
container.classList.add('container');

const result = document.body.appendChild(document.createElement('div'));
result.classList.add('result');

const heading = container.appendChild(document.createElement('h1'));
heading.classList.add('heading');
heading.innerText = 'Long Live Sparta!';

const textArea = container.appendChild(document.createElement('textarea'));
textArea.classList.add('text-area');
textArea.setAttribute('placeholder', 'Your text to decipher');

const input = container.appendChild(document.createElement('input'));
input.classList.add('shift-input');
input.setAttribute('placeholder', 'Shift');

const btn = container.appendChild(document.createElement('button'));
btn.classList.add('submit')
btn.innerHTML = 'Decipher!';
btn.addEventListener('click', () => {result.innerText = caesarDecipher(textArea.value, input.value)})

