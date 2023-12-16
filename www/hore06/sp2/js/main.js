const appContainer = $('#app');

const weightDesc = $('<h4>');
weightDesc.text('Weight:');
const weightInput = $('<input>');
const heightDesc = $('<h4>');
heightDesc.text('Height:');
const heightInput = $('<input>');
const ageDesc = $('<h4>');
ageDesc.text('Age:');
const ageInput = $('<input>');
const BMIsubmitButton = $('<button>');
BMIsubmitButton.text('Submit data');

const desc = $('<div class="description">');
const inputs = $('<div class="inputs">');

desc.append(
    weightDesc,heightDesc,ageDesc
);
inputs.append(
    weightInput,heightInput,ageInput,BMIsubmitButton
);

const leftContainer = $('<div class="leftPart">');
leftContainer.append(desc, inputs);

appContainer.append(leftContainer);
appContainer.addClass('left-container');
