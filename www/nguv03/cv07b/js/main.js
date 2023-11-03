let text = 'Barrack Obamá is Awesome';

console.log(text.length);

console.log(text.indexOf('a'));
console.log(text.lastIndexOf('a'));

// non-destructive methods
console.log(text.slice(5, 13));
console.log(text.slice(5));
console.log(text.slice(-5));
console.log(text.replace('B', 'X'));
console.log(text.replaceAll('a', 'X'));
console.log(text.replace(/a/g, 'X'));

console.log(text);

console.log(text.toUpperCase());
console.log(text.toLowerCase());


const tokens = text.split(' ');
console.log(tokens);

const tokens2 = ['This', 'is', 'another', 'awesome', 'content'];
const sentence = tokens2.join('-');
console.log(sentence);

const text3 = ' abc def    ';
console.log(text3);
const cleanText = text3.trim();
console.log(cleanText);

