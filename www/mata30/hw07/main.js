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
  let numIndex = alphabet.indexOf(c);
  if (numIndex < 0) {
    return (c);
  }
  numIndex = (numIndex - shift) % alphabet.length;
  return (numIndex < 0) ? alphabet.charAt(numIndex + alphabet.length) : alphabet.charAt(numIndex);
  // a helper function to shift one character inside the 
  // alphabet based on the shift value and return the result
};
const shiftString = (str, shift) => {
  const char = str.split('');
  const ans = char.map(c => {
    return (shiftChar(c, shift));
  });
  return (ans.join(''));
  // a helper function to shift one entire string inside the 
  // alphabet based on the shift value and return the result
};
const caesarDecipher = (cipherText, usedKey) => {
  const strings = cipherText.split(' ');
  const ans = strings.map(str => {
    return (shiftString(str, usedKey));
  });
  return (ans.join(' '));
  // your implementation goes here
  // good to know: 
  //    str.indexOf(c) - returns the index of the specified character in the string
  //    str.charAt(i) - returns the character at the specified index in the string
  //    when the shifted character is out of bound, it goes back to the beginning and count on from there
};

document.querySelector('#submit-button').addEventListener('click', () => {
  const inputText = document.querySelector('#text-input').value;
  const inputKey = parseInt(document.querySelector('#number-input').value);
  const upperCaseText = inputText.toUpperCase(); // Convert to uppercase
  document.querySelector('#result').textContent = caesarDecipher(upperCaseText, inputKey);
});

document.querySelector('#text-input').addEventListener('input', function () {
  this.value = this.value.toUpperCase();
});


// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);