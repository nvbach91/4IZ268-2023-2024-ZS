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
    const index = alphabet.indexOf(c);
    if (index === -1) {
        return c;
    }
    const newIndex = (index + shift + alphabet.length) % alphabet.length;
    return alphabet[newIndex];
};

const shiftString = (str, shift) => {
    return str.split('').map(c => shiftChar(c, shift)).join('');
};

const caesarDecipher = (cipherText, usedKey) => {
    return shiftString(cipherText, -usedKey);
};

const decipherText = () => {
    const encryptedText = document.getElementById('cipherText').value;
    const encryptionKey = document.getElementById('usedKey').value;

    if (encryptedText.trim() === '' || encryptionKey.trim() === '') {
        alert('Both values must be valid and filled in!');
        return;
    }

    const decryptedText = caesarDecipher(encryptedText, parseInt(encryptionKey, 10));
    document.getElementById('decryptedText').innerText = decryptedText;
};

const decipherButton = document.getElementById('decipherButton');
decipherButton.addEventListener('click', decipherText);


const test1 = caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
const test2 = caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
const test3 = caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);

//Vypsání testů v konzoli
console.log(test1);
console.log(test2);
console.log(test3);
