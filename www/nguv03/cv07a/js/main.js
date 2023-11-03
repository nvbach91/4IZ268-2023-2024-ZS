const text = 'Barráck Óbama';
console.log(text.length);

// hledani pozice retezce v retezci
const positionOfLetterR = text.indexOf('r');
console.log(positionOfLetterR);

const textPartFrom3To8 = text.slice(3, 9);
console.log(textPartFrom3To8);

console.log(text.slice(9));
console.log(text.slice(-9));

console.log(text.replace('rack', 'rock'));

console.log(text.toLowerCase());
console.log(text.toUpperCase());

const text2 = 'This is an awesome sentence';
const tokens = text2.split(' ');
console.log(tokens);

const tokens2 = ['I', 'love', 'JavaScript'];
const sentence = tokens2.join(' ');
console.log(tokens2);
console.log(sentence);

const phoneNumber = '+420 123456 789';
const correctPhoneNumber = phoneNumber.replace(/ /g, '');
console.log(correctPhoneNumber);

const name = '  Adam Levak ';
const correctName = name.trim();
console.log(correctName);





const list = document.querySelector('.items');
console.log(list);

const listItems = document.querySelectorAll('.item');
console.log(listItems);

const changeButton = document.querySelector('#change-button');
changeButton.addEventListener('mouseover', () => {
    listItems.forEach((listItem) => {
        listItem.textContent = 'Pikachu';
        listItem.classList.add('new-class');
        const newElement = document.createElement('img');
        // src + alt
        newElement.setAttribute('src', 'https://static.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png');
        newElement.setAttribute('alt', 'Pokeball');
        console.log(newElement);
        listItem.append(newElement);
    });
});