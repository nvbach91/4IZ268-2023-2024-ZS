/*jshint esversion: 7 */
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

//Rozpadlé řešení dle zadání
const shiftChar = (c, shift) => {
    let index = alphabet.indexOf(c);
    if (index < 0) {
        return (c);
    }
    index = (index - shift) % alphabet.length;
    return (index < 0) ? alphabet.charAt(index + alphabet.length) : alphabet.charAt(index);
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
};

const shiftString = (str, shift) => {
    const chars = str.split('');
    const ans = chars.map(c => {
        return (shiftChar(c, shift));
    });
    return (ans.join(''));
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
};

const caesarDecipher = (cipherText, usedKey) => {
    const strs = cipherText.split(' ');
    const ans = strs.map(str => {
        return (shiftString(str, usedKey));
    });
    return (ans.join(' '));
};




//Kondenzovaná varianta
const caesarDecipherV2 = (cipherText, usedKey) => {
    const ans = [...cipherText].map(c => {
        let index = alphabet.indexOf(c);
        if (index < 0) {
            return (c);
        }
        else {
            index = (index - usedKey) % alphabet.length;
            return (index < 0 ? alphabet.charAt(index + alphabet.length) : alphabet.charAt(index));
        }
    });
    return (ans.join(''));
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
};
//Prvky se kterými se pracuje
const decipherButton = document.querySelector('#decipher');
const cipherTextInput = document.querySelector('#cipher-text');
const shiftAmountInput = document.querySelector('#cipher-key');
const outputArea = document.querySelector('#output-area');

decipherButton.addEventListener('click', () => {
    const cipherText = getCipherText();
    const cipherKey = getCipherKey();
    if (cipherKey[0] && cipherText[0]) {
        return (displayResult(caesarDecipherV2(cipherText[1], cipherKey[1])));
    }
    else {
        let output;
        //!cipherKey[0] ? !cipherText[0] ? output = `${cipherKey[1]}\n\n${cipherText[1]}` : output = cipherKey[1] : output = cipherText[1];
        if (!cipherKey[0]) {
            if (!cipherText[0]) {
                return (displayResult(output = `${cipherText[1]}\n\n${cipherKey[1]}`));
            }
            return (displayResult(output = cipherKey[1]));
        }
        return (displayResult(cipherText[1]));
    }
});

const getCipherText = () => {
    const inputText = cipherTextInput.value.trim();
    if (inputText.length < 1) {
        return ([false, 'Please enter ciphered text.']);
    }
    return ([true, inputText.toUpperCase()]);
};

const getCipherKey = () => {
    if (isNaN(shiftAmountInput.valueAsNumber)) {
        return ([false, 'Please enter the amount of letters that should be shifted as number.']);
    }
    return ([true, shiftAmountInput.valueAsNumber]);
};

const displayResult = (output) => {
    console.log(output);
    outputArea.innerHTML = output;
    return (true);
};

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));

// Testování vysoké hodnoty
console.log(caesarDecipher("NYMNODO NOBFY MLUHXO, DMYG TPYXUP WI NI JLIPYXY?", 46));

//Testování záporné hodnoty
console.log(caesarDecipher("DOCDETE DERVO CBKXNE, TCOW JFONKF MY DY ZBYFONO?", -16));
