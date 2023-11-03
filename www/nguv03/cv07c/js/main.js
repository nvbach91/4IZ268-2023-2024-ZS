const textInput = document.querySelector('[name="text"]');
const submitButton = document.querySelector('#submit-button');
submitButton.addEventListener('click', () => {
    const text = textInput.value;
    console.log(text.length);
    for (let i = 0; i < text.length; i++) {
        // console.log(text.charAt(i));
    }
    console.log(text.charAt(1));
    console.log(text.indexOf('a'));
    console.log(text.lastIndexOf('a'));
    // non-desctructive
    console.log(text.slice(3, 8));
    console.log(text.slice(3));
    console.log(text.slice(-3));
    console.log(text.replace('B', 'X'));
    console.log(text.replaceAll('a', 'X'));
    console.log(text.replace(/a/g, 'X'));
    console.log(text);
    console.log(text.toUpperCase());
    console.log(text.toLowerCase());
    const textWithWhiteSpaces = '   áldkjask ';
    const cleanText = textWithWhiteSpaces.trim();
    console.log(textWithWhiteSpaces);
    console.log(cleanText);
    const words = text.split(' ');
    console.log(words);
    const tokens = ['This', 'is', 'another', 'sentence'];
    const sentence = tokens.join(' - ');
    console.log(sentence);
});