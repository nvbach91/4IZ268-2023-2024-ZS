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

const shiftChar = (character, shift) => {
    const index = alphabet.indexOf(character);
    if (index === -1) return character;

    let shiftedIndex = (index - shift) % alphabet.length;
    if (shiftedIndex < 0) shiftedIndex += alphabet.length;
    return alphabet[shiftedIndex];
};

const shiftString = (inputString, shift) => {
    return inputString.split('').map(char => shiftChar(char, shift)).join('');
};

const caesarDecipher = (cipherText, usedKey) => {
    return shiftString(cipherText, usedKey);
};

const decipherButton = document.getElementById('cipherButton');
decipherButton.addEventListener('click', () => {

    const cipherTextElement = document.getElementById('cipherText');
    const cipherKeyElement = document.getElementById('cipherKey');
    const decipherTextElement = document.getElementById('decipherText');

    decipherTextElement.classList.add('decipher');
    decipherTextElement.textContent = caesarDecipher(cipherTextElement.value, cipherKeyElement.value);
});


// TWO THINGS ARE INFINITE: THE UNIVERSE AND HUMAN STUPIDITY; AND I'M NOT SURE ABOUT THE UNIVERSE. - ALBERT EINSTEIN
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// THERE IS NO LAW EXCEPT THE LAW THAT THERE IS NO LAW. - JOHN ARCHIBALD WHEELER
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// A MAN WHO DARES TO WASTE ONE HOUR OF TIME HAS NOT DISCOVERED THE VALUE OF LIFE. ― CHARLES DARWIN
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);