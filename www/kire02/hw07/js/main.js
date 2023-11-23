const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shiftChar = (c, shift) => {
    const index = alphabet.indexOf(c.toUpperCase());
    if (index === -1) return c; 

    const shiftedIndex = (index - shift + 26) % 26; 
    return alphabet.charAt(shiftedIndex);
};

const shiftString = (str, shift) => {
    return str.split('').map(c => shiftChar(c, shift)).join('');
};

const caesarDecipher = (cipherText, usedKey) => {
    return shiftString(cipherText, usedKey);
};

const displayDecipheredText = () => {
    const cipherText = document.getElementById('cipherText').value;
    const shiftKey = parseInt(document.getElementById('shiftKey').value);

    const decipheredText = caesarDecipher(cipherText, shiftKey);
    document.getElementById('result').textContent = decipheredText;
};