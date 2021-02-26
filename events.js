import {operate, add, subtract, multiply, divide} from './calculator.js';

const allOperators = /[+*\/-]/g;
const inputScreen = document.querySelector('#input-display');
const resultScreen = document.querySelector('#result-display');
const numBtn = document.querySelectorAll('.num-btn');
const opBtn = document.querySelectorAll('.op-btn');
const eraseBtn = document.querySelectorAll('.erase-btn');
const equalBtn = document.querySelector('#key-equal');


numBtn.forEach(btn => btn.addEventListener('click', processNumber));
opBtn.forEach(btn => btn.addEventListener('click', processOperator));
equalBtn.addEventListener('click', operationHandling);
eraseBtn.forEach(btn => btn.addEventListener('click', selectEraseType))


function processNumber(e) {
    let input = e.target.id.substr(4);
    if(inputScreen.textContent !== '0') {
        inputScreen.textContent += input;
    }

    if(inputScreen.textContent === '0' && +input > 0) {
        inputScreen.textContent = '';
        inputScreen.textContent += input;
    }
}

function processOperator(e) {
    let input = e.target.id.substr(4);
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

    if(inputScreen.textContent !== '' &&
        !(inputScreen.textContent.match(allOperators))) {
        inputScreen.textContent += input;
    }
}

function operationHandling(e) {
    const exp = inputScreen.textContent;
    const index = exp.indexOf(exp.match(allOperators));
    let inputs = [
        exp.substr(0, index),
        exp.charAt(index),
        exp.substr(index + 1),
    ];
    console.log(inputs);
    console.log(operate(inputs));
    let result = operate(inputs);
    resultScreen.textContent = result;
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

