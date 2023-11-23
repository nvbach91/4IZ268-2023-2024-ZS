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

    let initialPosition = "";

    if(/[a-z]/g.test(c)) {
        initialPosition = alphabet.indexOf(c.toUpperCase());
    } else if (/[A-Z]/g.test(c)) {
        initialPosition = alphabet.indexOf(c);
    } else {
        return c;
    }

    if((initialPosition - shift) < 0) {
        result = alphabet[initialPosition - shift + alphabet.length];
    } else {
        result = alphabet[initialPosition - shift];
    }
    return result;
};


const shiftString = (str, shift) => {
    const result = Array.from(str);
    for(let i = 0; i < result.length; i++) {
        result[i] = shiftChar(result[i], shift);
    }
    return result.join("");
};
const caesarDecipher = (cipherText, usedKey) => {
    
    if(cipherText.length == 0) {
        alert("Cipher text is empty!");
        return "";
    } 

    if(usedKey < 0) {
        alert("Cipher key is negative!");
        return "";
    }

    const result = shiftString(cipherText, usedKey);

    return result;
};

const inputForm = document.querySelector(".input")

const inputText = document.createElement("input");
inputText.setAttribute("type", "text");
inputText.setAttribute("id", "cipherText");
inputText.setAttribute("name", "cipherText");
const inputTextLabel = document.createElement("label")
inputTextLabel.setAttribute("for", "cipherText");
inputTextLabel.textContent = "Input cipher text";
inputForm.appendChild(inputTextLabel);
inputForm.appendChild(inputText);

const inputKey = document.createElement("input");
inputKey.setAttribute("type", "number");
inputKey.setAttribute("id", "cipherKey");
inputKey.setAttribute("name", "cipherKey");
const inputKeyLabel = document.createElement("label")
inputKeyLabel.setAttribute("for", "cipherKey");
inputKeyLabel.textContent = "Input cipher key";
inputForm.appendChild(inputKey);
inputForm.appendChild(inputKeyLabel);

const resultField = document.querySelector(".result");
const container = document.querySelector(".container");


const submitButton = document.createElement("button");
submitButton.innerText = "Decipher text";
submitButton.setAttribute("id", "submitButton");
submitButton.addEventListener("click", () => {
    resultField.innerText = caesarDecipher(inputText.value, inputKey.value);
});
container.appendChild(submitButton);

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));