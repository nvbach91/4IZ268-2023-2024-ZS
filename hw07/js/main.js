const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shiftChar = (c, shift) => {
    const index = alphabet.indexOf(c);
    const shiftedIndex = (index - shift + 26) % 26;
    return alphabet.charAt(shiftedIndex);
};
const shiftString = (str, shift) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        result += /[A-Z]/.test(char) ? shiftChar(char, shift) : char;
    }
    return result;
};
const caesarDecipher = (cipherText, usedKey) => {
    return shiftString(cipherText, usedKey);
};

const submitButton = document.querySelector(".submit-btn");
submitButton.addEventListener("click", () => {
    const cipherText = document.querySelector(".cipher-input").value.toUpperCase();
    const key = parseInt(document.querySelector(".key-input").value);
    const decryptedText = caesarDecipher(cipherText, key);
    document.querySelector(".result").innerText = decryptedText;
});