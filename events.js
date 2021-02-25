import {operate, add, subtract, multiply, divide} from './calculator.js';

const inputScreen = document.querySelector('#input-display');
const resultScreen = document.querySelector('#result-display');
const numBtn = document.querySelectorAll('.num-btn');
const opBtn = document.querySelectorAll('.op-btn');
const eraseBtn = document.querySelectorAll('.erase-btn');
const equalBtn = document.querySelector('#key-equal');
let input = [];

numBtn.forEach(btn => btn.addEventListener('click', displayAndStoreNum));
opBtn.forEach(btn => btn.addEventListener('click', displayAndStoreOpe));
eraseBtn.forEach(btn => btn.addEventListener('click', selectEraseType))
equalBtn.addEventListener('click', processOperation);

function displayAndStoreNum(e) {
    console.log(e.target.id.substr(4));
    displayNum(e.target.id.substr(4));
}

function displayAndStoreOpe(e) {
    console.log(e.target.id);
    displayOpe(e.target.id.substr(4))
}

function selectEraseType(e) {
    console.log(e.target.id);
    if(e.target.id === 'btn-clr') {
        inputScreen.textContent = "";
        resultScreen.textContent = "";
    }
    else if (e.target.id === 'btn-del') {

    }
}
 
function processOperation(e) {
    console.log(e.target.id);
}

function displayNum(input) {
    if(input === 'point') input = '.';
    inputScreen.textContent += input;
}

function displayOpe(input) {
    switch(input) {
        case 'add':
            input = '+';
            break;
        case 'sub':
            input = '-';
            break;
        case 'mul':
            input = '*';
            break;
        case 'div':
            input = '/';
            break;
    }
    inputScreen.textContent += input;
}