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


/* Number button event listener */
const numberButtonListener = function(button) {
  button.addEventListener("click", () => {
    registerNumber(button.dataset.key);
  });
};

// If we have an operator to execute, then start forming the second operand.
// Otherwise, append number to the first operand.
const registerNumber = function(number) {
  const output = document.querySelector('#output');

  if (operator === "") {
    firstOperand += number;
    output.textContent = firstOperand;
  } else { // we're on the second operand
    secondOperand += number;
    output.textContent = secondOperand;
  }
};


const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(numberButtonListener)


