const display = document.getElementById("display");

const intbtn = document.querySelectorAll(".number");

const logicbtn = document.querySelectorAll(".opbtn");

const erasebtn = document.querySelector(".erasebtn");
const deletebtn = document.querySelector(".deletbtn");
const equalbtn = document.getElementById("eqlitybtn");

const allbtn = document.getElementsByTagName("button");

let currentNum = "";
let previousNum = null;
let operator = null;
function updateDisplay() {
  display.textContent = currentNum;
}

function getNum(num) {
  currentNum += num;
  display.textContent = currentNum;
}

function getOperate(num1, num2, op) {
  switch (op) {
    case "+":
      return add(num1, num2);
    case "-":
      return sub(num1, num2);
    case "*":
      return mul(num1, num2);
    case "/":
      return div(num1, num2);
    case "√":
      return squareRoot(num1);
    default:
      return "Error";
  }
}

function getOp(op) {
  if (operator == null) {
    previousNum = parseFloat(currentNum);
    operator = op;
    currentNum = "";
  } else if (previousNum != null) {
    previousNum = getOperate(previousNum, parseFloat(currentNum), operator);
    operator = op;
    currentNum = "";
    display.textContent = previousNum + " " + op;
  }
}

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, c) {
  return a * c;
}

function div(a, b) {
  if (b === 0) {
    return "undefined";
  } else {
    return a / b;
  }
}

function squareRoot(a) {
  if (a >= 0) {
    return Math.sqrt(a);
  } else {
    return "Not a number";
  }
}

intbtn.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    currentNum += value;
    display.value = currentNum;
    updateDisplay();
  });
});
deletebtn.addEventListener("click", () => {
  currentNum = " ";
  display.value = "";
  previousNum = null;
  operator = null;
});
erasebtn.addEventListener("click", () => {
  currentNum = "";
  previousNum = null;
  operator = null;
  display.value = display.value.slice(0, display.value.length - 1);
  updateDisplay();
});

logicbtn.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentNum === "" && operator === null) return; // Ignore if no number entered
    if (operator !== null) {
      // Calculate the result if an operator was already set
      previousNum = getOperate(previousNum, parseFloat(currentNum), operator);
      updateDisplay();
    } else {
      // Set the current number as the previous number
      previousNum = parseFloat(currentNum);
    }
    operator = button.getAttribute("data-value");
    display.value = previousNum + " " + operator;
    currentNum = ""; // Clear current number for next input
  });
});
equalbtn.addEventListener("click", () => {
  if (operator === null || currentNum === "" || previousNum === null) return;
  const result = getOperate(previousNum, parseFloat(currentNum), operator);
  display.value = result;
  currentNum = result; // Set the result as the current number
  previousNum = null;
  operator = null;
});
