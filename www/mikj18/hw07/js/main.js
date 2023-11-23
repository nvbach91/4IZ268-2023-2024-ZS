const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shiftChar = (c, shift) => {
    const index = alphabet.indexOf(c);
    if (index === -1) {
        if (shift > alphabet.length) {
            const error = 'Error: Invalid key value.';
            return error;
        }
        return c;
    }
    const shiftedIndex = (index - shift + alphabet.length) % alphabet.length;
    return alphabet.charAt(shiftedIndex);
};

const shiftString = (str, shift) => {
    return Array.from(str)
        .map((c) => shiftChar(c, shift))
        .join('');
};

const caesarDecipher = (cipherText, usedKey) => {
    return shiftString(cipherText, usedKey);
};

document.getElementById("decipherButton").addEventListener("click", function () {
    const cipherText = document.getElementById("cipherText").value;
    const usedKey = parseInt(document.getElementById("key").value, 10);

    const result = caesarDecipher(cipherText, usedKey);
    document.getElementById("answear").innerText = result;
});

console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));