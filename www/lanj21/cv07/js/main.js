const ceasarForm = document.querySelector('#cipher-form');
const decipherButton = document.querySelector('#decipher-button');
const cypherInput = document.querySelector('#cipher-str');
const cypherNumberInput = document.querySelector('#shift-number');
const cypherList = document.querySelector('#cypher-list');

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
    // Check if the character is a letter
    if (/[a-zA-Z]/.test(c)) {
        // Determine whether the letter is uppercase or lowercase
        const isUpperCase = c === c.toUpperCase();
        
        // Convert the letter to uppercase for easier manipulation
        c = c.toUpperCase();

        // Calculate the new ASCII code for the shifted letter
        let shiftedCode = c.charCodeAt(0) + shift;

        // Ensure the new code is within the range of uppercase letters (65 to 90 in ASCII)
        shiftedCode = ((shiftedCode - 65) % 26) + 65;

        // Convert the ASCII code back to the corresponding letter
        const shiftedChar = String.fromCharCode(shiftedCode);

        // Return the shifted character in the original case
        return isUpperCase ? shiftedChar : shiftedChar.toLowerCase();
    } else {
        // If the character is not a letter, return it unchanged
        return c;
    }
};
const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result

    // Check if shift is negative and adjust it to be within the range of 26
    shift = ((shift % 26) + 26) % 26;
    
    // Map each character in the string using the shiftChar function
    const shiftedString = str.split('').map((char) => shiftChar(char, shift)).join('');

    return shiftedString;
};
const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    return shiftString(cipherText, -usedKey);
};


// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);

decipherButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission, as we're handling it with JavaScript


    const temp = document.querySelectorAll('li').forEach((li) => li.remove())

    const cipherText = cypherInput.value;
    const shiftNumber = parseInt(cypherNumberInput.value, 10);

    // Add your Caesar cipher decryption logic here
    const decryptedText = shiftString(cipherText, -shiftNumber);

    // Display the decrypted text in a list item
    const listItem = document.createElement('li');
    listItem.textContent = decryptedText;
    cypherList.appendChild(listItem);
}); 
