let firstOperand = "";
let secondOperand = "";
let operator = "";
let resetFirstOperand = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, op) {
  switch (op) {
    case 'add':
      return add(a, b);
    case 'subtract':
      return subtract(a, b);
    case 'multiply':
      return multiply(a, b);
    case 'divide':
      return divide(a, b);
    default:
      return "ERROR";
  }
}


/* -- NUMBER BUTTON EVENT LISTENER -- */
const numberButtonListener = function(button) {
  button.addEventListener("click", () => {
    registerDigit(button.dataset.key);
  });
};

// If we have an operator to execute, then append digit to the second operand.
// Otherwise, append number to the first operand.
const registerDigit = function(digit) {
  if (operator === "") {
    if (resetFirstOperand) {
      resetFirstOperand = false;
      firstOperand = "";
    }

    firstOperand = appendDigit(firstOperand, digit);
    setOutput(firstOperand);
  } else {
    secondOperand = appendDigit(secondOperand, digit);
    setOutput(secondOperand);
  }
};

function appendDigit(operand, digit) {
  if (digit === ".") {
    if (operand.includes(".") === false) {
      operand += digit;
    }
  } else if (digit === "0") {
    if (operand !== "0") {
      operand += digit;
    }
  } else {
    operand += digit;
  }

  return operand
}

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(numberButtonListener);


/* -- OPERATOR BUTTON EVENT LISTENER -- */
const opButtonListener = function(button) {
  button.addEventListener("click", () => {
    registerOperator(button.dataset.key);
  });
};

const registerOperator = function(newOp) {
  if (firstOperand !== "") {
    doArithmetic();
    setOutput(formatNumber(firstOperand));

    if (newOp === "equals") {
      operator = "";
      resetFirstOperand = true;
    } else {
      operator = newOp;
    }
  }
};

// Perform the current operation if both operands and the operator exist, then
// set the firstOperand to be the result.
// Do nothing if the conditions are not met.
function doArithmetic() {
  if (operator !== "" && secondOperand !== "") {
    switch (operator) {
      case "plus":
        firstOperand = Number(firstOperand) + Number(secondOperand);
        break;
      case "minus":
        firstOperand = Number(firstOperand) - Number(secondOperand);
        break;
      case "times":
        firstOperand = Number(firstOperand) * Number(secondOperand);
        break;
      case "divide":
        firstOperand = Number(firstOperand) / Number(secondOperand);
        break;
    }

    firstOperand = firstOperand.toString();
    secondOperand = "";
  }
}

function formatNumber(number) {
  const formatted = (Number(number).toFixed(4) * 1).toString();

  if (formatted === "Infinity" || formatted === "NaN") {
    return "ERROR";
  } else {
    const [whole, decimal] = formatted.split(".");

    if (Number(decimal) === 0) {
      return whole;
    } else {
      return formatted;
    }
  }
}

const main = document.querySelector('#main');
const opButtons = main.querySelectorAll('.operator');
opButtons.forEach(opButtonListener);


/* CLEAR AND DEL */
const clear = document.querySelector('#clear');
clear.addEventListener('click', clearAll);
function clearAll() {
  firstOperand = "";
  secondOperand = "";
  operator = "";
  resetFirstOperand = false;
  setOutput("");
}

const del = document.querySelector('#del');
del.addEventListener('click', delOne);
function delOne() {
  if (secondOperand !== "") {
    secondOperand = secondOperand.slice(0, secondOperand.length - 1);
    setOutput(secondOperand);
  } else {
    if (resetFirstOperand === false) {
      firstOperand = firstOperand.slice(0, firstOperand.length - 1);
      setOutput(firstOperand);
    }
  }
}


/* Helpers */
function setOutput(value) {
  const output = document.querySelector('#output');
  output.textContent = value;
}
