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
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const shiftChar = (c, shift) => {
  // a helper function to shift one character inside the
  // alphabet based on the shift value and return the result
  if (!alphabet.includes(c)) return c;
  return alphabet.indexOf(c) - shift >= 0
    ? alphabet[alphabet.indexOf(c) - shift]
    : alphabet[alphabet.length - (shift - alphabet.indexOf(c))];
};
const shiftString = (str, shift) => {
  // a helper function to shift one entire string inside the
  // alphabet based on the shift value and return the result
  return str
    .split("")
    .map((char) => shiftChar(char, shift))
    .join("");
};
const caesarDecipher = (cipherText, usedKey) => {
  // your implementation goes here
  // good to know:
  //    str.indexOf(c) - returns the index of the specified character in the string
  //    str.charAt(i) - returns the character at the specified index in the string
  //    when the shifted character is out of bound, it goes back to the beginning and count on from there
  return cipherText
    .split(" ")
    .map((word) => shiftString(word, usedKey))
    .join(" ");
};

// albert einstein
console.log(
  caesarDecipher(
    "MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG",
    19,
  ),
);

// john archibald wheeler
console.log(
  caesarDecipher(
    "YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW",
    5,
  ),
);

// charles darwin
console.log(
  caesarDecipher(
    "M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ",
    12,
  ),
);

const text = document.getElementById("text");
const key = document.getElementById("key");
const submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  text.value = caesarDecipher(text.value, key.value);
});

//uhh guess I need to finally get my hands on regex

//did you know that the human brain finishes developing and maturing in the mid-to-late 20s?
