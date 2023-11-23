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
//const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/*const shiftChar = (c, shift) => {
     a helper function to shift one character inside the
     alphabet based on the shift value and return the result
};
const shiftString = (str, shift) => {
     a helper function to shift one entire string inside the
     alphabet based on the shift value and return the result
};*/
// Nedávalo mi smysl použít

const caesarDecipher = (cipherText, usedKey) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let decryptedText = '';
    let previousCharWasSpace = false;

    for (let i = 0; i < cipherText.length; i++) {
        const char = cipherText[i];
        const nextChar = i + 1 < cipherText.length ? cipherText[i + 1] : null;

        if (char === ' ' && nextChar !== '-') {
            if (!previousCharWasSpace) {
                decryptedText += ' ';
                previousCharWasSpace = true;
            }
        } else if (char === '-' && (cipherText[i - 1] === ' ' && cipherText[i + 1] === ' ')) {
            // Speciální případ pro " - " vzor
            continue; // Ignoruje znak '-'
            // NEŘEŠÍ SAMOZŘEJMĚ PRO VŠECHNY PŘÍPADY, ALE POUZE PRO TYTO UKÁZKOVÉ ABY SE NEVYPSALI DVĚ MEZERY ZA SEBOU
        } else {
            previousCharWasSpace = false;

            if (alphabet.includes(char)) {
                let currentIndex = alphabet.indexOf(char);
                let newIndex = (currentIndex - usedKey + 26) % 26;
                decryptedText += alphabet[newIndex];
            } else if (!isNaN(char) && char.trim() !== '') {
                decryptedText += char; // Přidává číslice
            }
            // Ignoruje ostatní znaky
        }
    }

    return decryptedText;
};

function decryptFormattedText(formattedText) {
    const parts = formattedText.split(' - ');
    if (parts.length !== 2) {
        return 'Nesprávný formát vstupu';
    }

    const key = parseInt(parts[0]);
    if (isNaN(key)) {
        return 'Nesprávný formát klíče';
    }
    const encryptedText = parts[1].trim();

    return caesarDecipher(encryptedText, key);
}

// Funkce pro dešifrování textu
function decryptText() {
    var encryptedText = document.getElementById('encryptedText').value;
    var key = parseInt(document.getElementById('key').value);
    var decrypted = caesarDecipher(encryptedText, key);
    document.getElementById('decryptedText').value = decrypted;
}

// Přidání event listeneru na tlačítko
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('decryptButton').addEventListener('click', decryptText);
});

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. - OTMDXQE PMDIUZ", 12));

// Použití funkce
console.log(decryptFormattedText('12 - M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. - OTMDXQE PMDIUZ'));  // Příklad použití
