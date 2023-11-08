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

const form = document.querySelector("#decipherForm");
const formCipherText = document.querySelector("#cipherText");
const formCipherKey = document.querySelector("#cipherKey");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (formCipherKey.value === "" || formCipherText.value === "") {
    alert("Please fill in both fields!");
    return;
  }

  const cipherText = formCipherText.value.toUpperCase();
  const usedKey = parseInt(formCipherKey.value);

  const decipheredText = caesarDecipher(cipherText, usedKey);

  const result = document.querySelector("#result");
  result.textContent = decipheredText;
});

//              0123456789...
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// a helper function to shift one character inside the
// alphabet based on the shift value and return the result
const shiftChar = (c, shift) => {
  if (!alphabet.includes(c)) return c;

  const newIndex = (alphabet.indexOf(c) + shift) % alphabet.length;

  return newIndex < 0 ? alphabet[alphabet.length + newIndex] : alphabet[newIndex];
};

// a helper function to shift one entire string inside the
// alphabet based on the shift value and return the result
const shiftString = (str, shift) => {
  return str
    .split("")
    .map((c) => shiftChar(c, shift))
    .join("");
};
const caesarDecipher = (cipherText, usedKey) => {
  // split the cipher text into words
  const words = cipherText.split(" ");

  // decipher each word
  const decipheredWords = words.map((word) => {
    // decipher the word
    const decipheredWord = shiftString(word, -usedKey);

    // return the deciphered word
    return decipheredWord;
  });

  // join the deciphered words back into a string
  const decipheredText = decipheredWords.join(" ");

  // log the cipher and deciphered text to the console
  console.log(decipheredText);

  // return the deciphered text
  return decipheredText;
};

caesarDecipher("MPSPW BYIHU", 7);

// albert einstein
caesarDecipher(
  "MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG",
  19
);

// john archibald wheeler
caesarDecipher(
  "YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW",
  5
);

// charles darwin
caesarDecipher(
  "M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ",
  12
);
