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


//this is the way i think
const shiftChar = (c, shift) => {
    var index = alphabet.indexOf(c);
    if (shift > 0)
    {
        if ((index+shift)>=alphabet.length)
        {
            return alphabet.charAt((index+shift)-alphabet.length);
        }
        else
        {
            return alphabet.charAt(index + shift);
        }
    }
    else if (shift < 0)
    {
        if ((index+shift)<0)
        {
            return alphabet.charAt(alphabet.length+(index+shift));
        }
        else
        {
            return alphabet.charAt(index + shift);
        }
    }
    
};
const shiftString = (str, shift) => {
    ar = str.split("");
    for (let i = 0; i < ar.length; i++) {
        if (ar[i].charCodeAt(0) >= 65 && ar[i].charCodeAt(0) <= 90)
        {
            ar[i] = shiftChar(ar[i], shift);
        }
    }
    return ar.join("");
};
const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    return shiftString(cipherText,-usedKey)

};

const button = document.getElementById("button");
const textInput = document.getElementById("inputText");
const shiftInput = document.getElementById("inputShift");
button.addEventListener("click", () => {
    textInput.value = caesarDecipher(textInput.value, shiftInput.value);
    });