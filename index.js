let firstOperand = "";
let secondOperand = "";
let operator = "";
let result = "";

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
  const output = document.querySelector('#output');

  if (operator === "") {
    firstOperand = appendDigit(firstOperand, digit);
    output.textContent = firstOperand;
  } else {
    secondOperand = appendDigit(secondOperand, digit);
    output.textContent = secondOperand;
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
  const output = document.querySelector('#output');

  if (firstOperand !== "") {
    doArithmetic();
    output.textContent = firstOperand;

    if (newOp === "equals") {
      operator = "";
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

    secondOperand = "";
  }
}

const main = document.querySelector('#main');
const opButtons = main.querySelectorAll('.operator');
opButtons.forEach(opButtonListener);
