const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

let firstNum = '';
let operator = '';
let secondNum = '';
let isResult = false;

function updateDisplay(value) {
    display.textContent = value.length > 12 ? Number(value).toExponential(5) : value;
}

function resetCalculator() {
    firstNum = '';
    operator = '';
    secondNum = '';
    isResult = false;
    updateDisplay('0');
}

function inputNumber(num) {
    if (isResult) {
        resetCalculator();
    }
    if (!operator) {
        if (num === '.' && firstNum.includes('.')) return;
        if (num === '.' && firstNum === '') firstNum = '0';
        if (firstNum.length >= 12) return;
        firstNum += num;
        updateDisplay(firstNum);
    } else {
        if (num === '.' && secondNum.includes('.')) return;
        if (num === '.' && secondNum === '') secondNum = '0';
        if (secondNum.length >= 12) return;
        secondNum += num;
        updateDisplay(secondNum);
    }
}

function pickOperator(op) {
    if (firstNum === '') firstNum = '0';
    if (operator && secondNum) {
        operate();
        operator = op;
    } else {
        operator = op;
        isResult = false;
    }
}

function operate() {
    let a = parseFloat(firstNum), b = parseFloat(secondNum);
    let res = 0;
    if (operator === '+') res = a + b;
    else if (operator === '-') res = a - b;
    else if (operator === '*') res = a * b;
    else if (operator === '/') {
        if (b === 0) {
            updateDisplay('Error');
            firstNum = '';
            secondNum = '';
            operator = '';
            isResult = true;
            return;
        }
        res = a / b;
    }
    res = +parseFloat(res.toFixed(10));
    firstNum = res + '';
    secondNum = '';
    operator = '';
    isResult = true;
    updateDisplay(firstNum);
}

function plusMinus() {
    if (!operator) {
        firstNum = firstNum ? (parseFloat(firstNum) * -1).toString() : '-0';
        updateDisplay(firstNum);
    } else {
        secondNum = secondNum ? (parseFloat(secondNum) * -1).toString() : '-0';
        updateDisplay(secondNum);
    }
}

function percent() {
    if (!operator) {
        firstNum = firstNum ? (parseFloat(firstNum) / 100).toString() : '0';
        updateDisplay(firstNum);
    } else {
        secondNum = secondNum ? (parseFloat(secondNum) / 100).toString() : '0';
        updateDisplay(secondNum);
    }
}

buttons.addEventListener('click', function(e) {
    const target = e.target;
    if (!target.classList.contains('btn')) return;

    if (target.classList.contains('number')) {
        inputNumber(target.getAttribute('data-number'));
    }
    if (target.classList.contains('operator') && !target.classList.contains('equal')) {
        let opKey = target.getAttribute('data-action');
        if (opKey === 'plus') pickOperator('+');
        else if (opKey === 'minus') pickOperator('-');
        else if (opKey === 'multiply') pickOperator('*');
        else if (opKey === 'divide') pickOperator('/');
    }
    if (target.classList.contains('operator') && target.classList.contains('equal')) {
        if (operator && secondNum) operate();
    }
    if (target.classList.contains('control')) {
        const action = target.getAttribute('data-action');
        if (action === 'ac') resetCalculator();
        else if (action === 'plus-minus') plusMinus();
        else if (action === 'percent') percent();
    }
});

// Initialize display
resetCalculator();