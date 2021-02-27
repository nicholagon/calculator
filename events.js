import {operate, add, subtract, multiply, divide} from './calculator.js';

const allOperators = /[+*\/-]/g;
const inputScreen = document.querySelector('#input-display');
const resultScreen = document.querySelector('#result-display');
const numBtn = document.querySelectorAll('.num-btn');
const opBtn = document.querySelectorAll('.op-btn');
const eraseBtn = document.querySelectorAll('.erase-btn');
const equalBtn = document.querySelector('#key-equal');


numBtn.forEach(btn => btn.addEventListener('click', processNumbers));
opBtn.forEach(btn => btn.addEventListener('click', processOperator));
equalBtn.addEventListener('click', operationHandling);
eraseBtn.forEach(btn => btn.addEventListener('click', selectEraseType))


function processNumbers(e) {
    let input = e.target.id.substr(4);

    if(inputScreen.textContent !== '0' || resultScreen.textContent) {
        inputScreen.textContent += input;
    }

    if(inputScreen.textContent === '0' && +input > 0) {
        inputScreen.textContent = '';
        inputScreen.textContent += input;
    }

    // if(resultScreen.textContent) {
    //     // clearScreens();
    //     inputScreen.textContent += input;
    // }

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
        checkValidOperator(inputScreen.textContent) === -1){
        // !(inputScreen.textContent.match(allOperators))) {
        inputScreen.textContent += input;
    }
    else if(isExpressionValid(inputScreen.textContent) &&
            inputScreen.textContent !== '') {
            operationHandling();
    }
    else if(!isExpressionValid(inputScreen.textContent)) {
        const exp = inputScreen.textContent;
        const opeIndex = checkValidOperator(exp);
        inputScreen.textContent = exp.substr(0, opeIndex) + input;
    }

    if(resultScreen.textContent) {
        inputScreen.textContent = resultScreen.textContent + input;
        // resultScreen.textContent = '';
    }    
}

function operationHandling(e) {
    const exp = inputScreen.textContent;
    const index = checkValidOperator(exp);
    // console.log('index: ' + index + " match " + checkValidOperator(exp));
    let inputs = [
        +exp.substr(0, index),
        exp.charAt(index),
        +exp.substr(index + 1),
    ];
    // console.log(inputs);
    // console.log(operate(inputs));
    let result = operate(inputs);
    resultScreen.textContent = result;
}

function selectEraseType(e) {
    console.log(e.target.id);    
    if(e.target.id === 'btn-clr') {
        clearScreens();
    }
    else if (e.target.id === 'btn-del') {

    }
}

function clearScreens() {
    inputScreen.textContent = "";
    resultScreen.textContent = "";
}

function isExpressionValid(exp) {
    const opeIndex = checkValidOperator(exp);
    // console.log(opeIndex)
    // console.log(isNaN(parseFloat(exp.substr(0, opeIndex))));
    // console.log(exp.charAt(opeIndex));
    // console.log(isNaN(parseFloat(exp.substr(opeIndex + 1))));
    // console.log(exp.substr(opeIndex + 1));

    return (opeIndex && !isNaN(parseFloat(exp.substr(0, opeIndex)))) &&
        !isNaN(parseFloat(exp.substr(opeIndex + 1)));
}

function checkValidOperator(exp) {
    let op = exp.match(allOperators);
    // console.log(op);
    if(op === null) {
        return -1;
    }

    if(op.length === 1) {
        // console.log("exp " + exp + ",op " + op[0])
        // console.log("exp.indexOf "+exp.indexOf(op[0]))
        return exp.indexOf(op[0]);
    }
    else if(op.length === 2) {
        // console.log("exp " + exp)
        // console.log("exp.indexOf "+exp.indexOf(op[1]))
        return exp.indexOf(op[1]);
    }
    else if(op.length === 3) {
        // console.log("exp " + exp)
        // console.log("exp.indexOf "+exp.indexOf(op[2]))
        return exp.indexOf(op[2]);
    }
    else {
        return -1;
    }
}