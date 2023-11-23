        // Decipher button activation
        document.addEventListener('DOMContentLoaded', function () {
            const decipherButton = document.getElementById('decipherButton');
            decipherButton.addEventListener('click', decipher);

            // a helper function to shift one character inside the 
            // alphabet based on the shift value and return the result
            function shiftChar(c, shift) {
                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                const index = alphabet.indexOf(c);
                //changes are not applied if character is not in const alphabet
                if (index === -1) {
                    return c;
                }
                //returns the character on the position of calculated shifted index (in case it is <0)
                let shiftedIndex = (index - shift) % alphabet.length;
                if (shiftedIndex < 0) {
                    shiftedIndex = alphabet.length + shiftedIndex;
                }
                return alphabet.charAt(shiftedIndex);
            }

            // a helper function to shift one entire string inside the 
            // alphabet based on the shift value and return the result
            function shiftString(str, shift) {
                //split the string into an array of charachters according to the shift value
                return str.split('').map((char) => shiftChar(char, shift)).join('');
            }
            
            //uses encrypted text and the key value to return deshifered text
            function caesarDecipher(cipherText, usedKey) {
                return shiftString(cipherText, usedKey);
            }

            //it starts working after buttin clicking. it displays encrypted method or an error message
            function decipher() {
                try {
                    const cipherText = document.getElementById('cipherText').value;
                    const usedKey = document.getElementById('key').value;

                    if (!cipherText || usedKey === '') {
                        throw new Error("Error: Please enter both encrypted text and used key.");
                    }

                    const result = caesarDecipher(cipherText, parseInt(usedKey, 10));
                    document.getElementById('result').innerText = "Deciphered text: " + result;
                } catch (error) {
                    document.getElementById('result').innerText = error.message;
                }
            }
        });
