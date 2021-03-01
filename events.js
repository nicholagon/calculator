import {operate, add, subtract, multiply, divide} from './calculator.js';

const allOperators = /[+*\/-]/g;
const inputScreen = document.querySelector('#input-display');
const resultScreen = document.querySelector('#result-display');
const numBtn = document.querySelectorAll('.num-btn');
const opBtn = document.querySelectorAll('.op-btn');
const eraseBtn = document.querySelectorAll('.erase-btn');
const equalBtn = document.querySelector('#key-equal');
const pointBtn = document.querySelector('#key-point');
const toggleSignBtn = document.querySelector('#btn-sign');

let decimalPoint = false;
let allowNegative = true;

numBtn.forEach(btn => btn.addEventListener('click', processNumbers));
opBtn.forEach(btn => btn.addEventListener('click', processOperator));
pointBtn.addEventListener('click', processDecimalPoint);
equalBtn.addEventListener('click', operationHandling);
eraseBtn.forEach(btn => btn.addEventListener('click', selectEraseType));
toggleSignBtn.addEventListener('click', toggleSign);

function processNumbers(e) {
    let input = e.target.id.substr(4);
    
    if(inputScreen.textContent !== '0' || resultScreen.textContent) {
        inputScreen.textContent += input;
    }

    if(inputScreen.textContent === '0' && +input > 0) {
        inputScreen.textContent = '';
        inputScreen.textContent += input;
    }
}

function processDecimalPoint(e) {
    let input = e.target.id.substr(4);

    if(input === 'point'  && decimalPoint === false &&
            inputScreen.textContent !== '') {
        input = '.';
        inputScreen.textContent += input;
        decimalPoint = true;
    }
}

function toggleSign(e) {
    const negativeSign = '-'
    
    if(allowNegative === true && inputScreen.textContent !== '') {
        // Case when only 1st number is entered and sign is toggled
        if(checkValidOperator(inputScreen.textContent) === -1){
            inputScreen.textContent = negativeSign + inputScreen.textContent;
            // inputScreen.textContent = `(${negativeSign}${inputScreen.textContent})`;
        }
        // Case when 2nd number is entered and sign is toggled
        else if(isExpressionValid(inputScreen.textContent)) {
            let opIndex = checkValidOperator(inputScreen.textContent);
            let exp = inputScreen.textContent.split("");
            exp.splice(opIndex + 1, 0, negativeSign);
            // exp.splice(opIndex + 1, 0, `(${negativeSign}`);
            // exp.push(')')
            inputScreen.textContent = exp.join("");
        }
        allowNegative = false;
    }
    else if(allowNegative === false && inputScreen.textContent !== '') {
        if(checkValidOperator(inputScreen.textContent) === -1) {
            let exp = inputScreen.textContent.split("");
            exp.shift();
            inputScreen.textContent = exp.join("");
        }
        else if(isExpressionValid(inputScreen.textContent)) {
            let opIndex = checkValidOperator(inputScreen.textContent);
            let exp = inputScreen.textContent.split("");
            console.log(exp);
            exp.splice(opIndex + 1, 1);
            console.log(exp);
            inputScreen.textContent = exp.join("");
        }
        allowNegative = true;
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

    // Allow operation input if the first number has been entered
    if(inputScreen.textContent !== '' &&
        checkValidOperator(inputScreen.textContent) === -1){
        inputScreen.textContent += input;
        allowNegative = true;
    }
    // Do the intended operation if the expression on inputScreen is complete/valid
    else if(isExpressionValid(inputScreen.textContent) &&
            inputScreen.textContent !== '') {
            operationHandling();
    }
    // Allows changing of operator input
    else if(inputScreen.textContent !== '' && 
            !isExpressionValid(inputScreen.textContent)) {
        const exp = inputScreen.textContent;
        const opeIndex = checkValidOperator(exp);
        inputScreen.textContent = exp.substr(0, opeIndex) + input;
    }

    // Clear resultScreen when its content is copied to inputScreen
    if(resultScreen.textContent && 
        isDisplayableInExp(resultScreen.textContent)) {
        resultScreen.textContent = '';
    }
    // Copy resultScreen text to inputScreen and append the entered operator
    else if(resultScreen.textContent) {
        inputScreen.textContent = resultScreen.textContent + input;
        // allowNegative = true;
    }

    decimalPoint = false;
}

function operationHandling(e) {
    const exp = inputScreen.textContent;
    const index = checkValidOperator(exp);
    // console.log('index: ' + index + " match " + checkValidOperator(exp));

    if(isExpressionValid(exp)) {        
        let inputs = [
            +exp.substr(0, index),
            exp.charAt(index),
            +exp.substr(index + 1),
        ];
        console.log(inputs);
        console.log(operate(inputs));
        let result = operate(inputs);
        if(result === Infinity) {
            resultScreen.textContent = 'dividing by 0!';
        }
        else {
            resultScreen.textContent = result;
        }
    }
}

function selectEraseType(e) {
    console.log(e.target.id);    
    if(e.target.id === 'btn-clr') {
        clearScreens();
    }
    else if (e.target.id === 'btn-del') {
        let exp = inputScreen.textContent.split("");
        console.log(exp);
        exp.pop();
        console.log(exp.join(""))
        inputScreen.textContent = exp.join("");
    }
}

function clearScreens() {
    inputScreen.textContent = "";
    resultScreen.textContent = "";
    decimalPoint = false;
    allowNegative = true;
}

function isExpressionValid(exp) {
    const opeIndex = checkValidOperator(exp);

    return (opeIndex && !isNaN(parseFloat(exp.substr(0, opeIndex)))) &&
        !isNaN(parseFloat(exp.substr(opeIndex + 1)));
}

function checkValidOperator(exp) {
    let op = exp.match(allOperators);

    if(op === null) {
        return -1;
    }

    if(op.length === 1 && exp.charAt(0) !== '-') {
        // console.log("exp " + exp + ",op " + op[0])
        // console.log("exp.indexOf "+exp.indexOf(op[0]))
        return exp.indexOf(op[0]);
    }
    else if(op.length === 2) {
        // console.log("exp " + exp)
        // console.log("exp.indexOf "+exp.indexOf(op[1]))

        // Case when one # is negative and operation is subtraction.
        if((op[0] === '-') && (op[1] === '-')){
            if(exp.charAt(0) === '-') {
                return exp.lastIndexOf(op[1]);
            }
            else {
                return exp.indexOf(op[0]);
            }
        }
        // Case when one # is negative and operation is other than subtraction.
        else if(op[0] !== '-'){
            return exp.indexOf(op[0]);
        }
        else {
            return exp.indexOf(op[1]);
        }
    }
    else if(op.length === 3) {
        // console.log(op);
        // console.log("exp " + exp)
        // console.log("exp.indexOf "+exp.indexOf(op[2]))

        // Case when operation is subtraction of 2 negative #s.
        // Removes the last '-' then return the index of the 2nd '-'.
        if(op[0] === op[1] && op[1] === op[2]) {
            const temp = exp.split("");
            console.log(temp)
            for(let i = temp.length - 1; i >= 0; i--){
                if(temp[i] != '-') {
                    console.log(temp[i])
                    temp.pop();
                }
                else {
                    temp.pop();
                    break;
                }
            }
            exp = temp.join("");
            console.log(exp);
            return exp.lastIndexOf(op[2]);
        }
        // Case of any other operation bet. 2 negative #s.
        else {
            return exp.indexOf(op[1]);
        }
    }
    else {
        return -1;
    }
}

function isDisplayableInExp(str) {
    return str.includes('NaN') || str.includes('0!');
}