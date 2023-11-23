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

const shiftChar = (c, shift, isDeciphering = true) => {
    const isLetter = alphabet.includes(c.toUpperCase());
    if (!isLetter) return c;
    const position = alphabet.indexOf(c.toUpperCase());
    const direction = isDeciphering ? -1 : 1;
    const shiftedPosition = (position + direction * shift + 26) % 26;
    return c === c.toUpperCase() ? alphabet[shiftedPosition] : alphabet[shiftedPosition].toLowerCase();
};

const shiftString = (str, shift, isDeciphering = true) => {
    return str.split('').map(c => shiftChar(c, shift, isDeciphering)).join('');
};

const caesarDecipher = (cipherText, usedKey) => {
    return shiftString(cipherText, usedKey, true);
};

const caesarCipher = (plainText, shift) => {
    return shiftString(plainText, shift, false);
};

document.querySelector('#decipherButton').addEventListener('click', () => {
    const text = document.getElementById('cipherText').value;
    const shiftValue = parseInt(document.getElementById('shiftValue').value, 10);
    const decipheredText = caesarDecipher(text, shiftValue);
    document.getElementById('decipheredText').textContent = `${decipheredText}`;
});

document.querySelector('#cipherButton').addEventListener('click', () => {
    const text = document.getElementById('cipherText').value;
    const shiftValue = parseInt(document.getElementById('shiftValue').value, 10);
    const cipheredText = caesarCipher(text, shiftValue);
    document.getElementById('decipheredText').textContent = `${cipheredText}`;
});

document.querySelector('input[type="reset"]').addEventListener('click', () => {
    document.getElementById('cipherText').value = '';
    document.getElementById('shiftValue').value = '';
    document.getElementById('decipheredText').textContent = 'Output will appear here...';
});


// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);