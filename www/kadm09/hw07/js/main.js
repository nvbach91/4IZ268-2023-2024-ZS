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
const lowercaseAlphabet = 'abcdefghijklmnopqrstuvwxyz';
const confirmButton = document.querySelector("#cipher-confirm-input");
let outputArea = document.querySelector("#cipher-output");

/*
*   Checks if char belongs to the alphabet given, if so, reverts the application
*   of a given key,uses maintain case strategy.
*/
const shiftChar = (c, shift) => {
    if (alphabet.includes(c)) {
        const index = alphabet.indexOf(c);
        const shiftedIndex = (index - shift + 26) % 26; 
        return alphabet.charAt(shiftedIndex);
    } else if (lowercaseAlphabet.includes(c)) {
        const index = lowercaseAlphabet.indexOf(c);
        const shiftedIndex = (index - shift + 26) % 26; 
        return lowercaseAlphabet.charAt(shiftedIndex);
    }
    return c;
};

/*
*   Converts the str (expected iterable type) to a char array,
*   map the elements of the array to a new value and return the value back to the
*   caller function
*/
const shiftString = (str, shift) => {

    // modification of methods from https://www.samanthaming.com/tidbits/83-4-ways-to-convert-string-to-character-array/
    // .map call applies the function call to each element (individual char in this case)
    // .join then ensures that the result is a continuous string
    return Array.from(str)
        .map(c => shiftChar(c, shift))
        .join('');
};

/* 
*   Take the input in the fields, perform rudimentary controls,
*   Call the auxiliary function, returns the shifted string
*   as return value. 
*/
const caesarDecipher = (cipherText, usedKey) => {


    if (cipherText === '') {
        return 'Empty cipher!!';
    }

    if (typeof(usedKey) === 'undefined') {
        return 'Please specify shift value';
    }
    
    if (isNaN(usedKey) || usedKey < 0) {
        return 'Please use non-negative, numerical arguments for shift value';
    }

    usedKey = usedKey % 26; //prevents higher shift values from breaking the code

    return shiftString(cipherText,usedKey);
};


confirmButton.addEventListener('click',() => {
    const textInput = document.querySelector("#cipher-text-input").value;
    const shiftInput = document.querySelector("#cipher-shift-input").valueAsNumber;
    outputArea.textContent = caesarDecipher(textInput,shiftInput);
});


//redirected the test prints to console
// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));


//add test cases to test maintaining of case
console.log(caesarDecipher('Kh jg jcf cpavjkpi eqphkfgpvkcn vq uca, jg ytqvg kv kp ekrjgt, vjcv ku, da uq ejcpikpi vjg qtfgt qh vjg ngvvgtu qh vjg cnrjcdgv, vjcv pqv c yqtf eqwnf dg ocfg qwv.',2));

console.log(caesarDecipher('Mkxsgty sgjk znkox rgyz yzgtj hkluxk znk Xnotk gz Norr 400. Znke ckxk hkgzkt he AY Gxse Xgtmkxy ot Sgxin ul 1945.',6));