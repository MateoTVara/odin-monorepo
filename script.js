// script.js

const divDisplay = document.querySelector("#display");
const divMenu = document.querySelector("#menu");
const divLeft = document.querySelector("#left");
const divRight = document.querySelector("#right");
const divOperator = document.querySelector("#operator");

const ids = [
  ["mc", "mr", "m-minus", "m-plus"],
  ["ac", "sqrt-x", "percent", "divide"],
  ["seven", "eight", "nine", "multiply"],
  ["four", "five", "six", "subtract"],
  ["one", "two", "three", "add"],
  ["zero", "decimal", "plus-minus", "equals"],
  ["pi", "power", "round-2", "round-0"]
];

const classes = [
  ["", "", "", ""],
  ["", "", "", "displayable"],
  ["displayable", "displayable", "displayable", "displayable"],
  ["displayable", "displayable", "displayable", "displayable"],
  ["displayable", "displayable", "displayable", "displayable"],
  ["displayable", "", "displayable", "displayable"],
  ["", "displayable", "", ""]
];

const altClasses = [
  ["operator", "operator", "operator", "operator"],       // mc, mr, m-, m+
  ["operator", "operator", "operator", "operator"],       // AC, √X, %, ÷
  ["number",   "number",   "number",   "operator"],       // 7, 8, 9, x
  ["number",   "number",   "number",   "operator"],       // 4, 5, 6, -
  ["number",   "number",   "number",   "operator"],       // 1, 2, 3, +
  ["number",   "operator", "operator", "operator"],       // 0, ., +/-, =
  ["operator", "operator", "operator", "operator"]        // π, xy, R2, R0
];

const options = [
  ["mc", "mr", "m-", "m+"],
  ["AC", "√X", "%", "÷"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "+/-", "="],
  ["π", "xy", "R2", "R0"]
];

const backgrounds = [
  ["smoke", "smoke", "smoke", "smoke"],
  ["smoke", "smoke", "smoke", "yellow"],
  ["white", "white", "white", "yellow"],
  ["white", "white", "white", "yellow"],
  ["white", "white", "white", "yellow"],
  ["white", "white", "white", "yellow"],
  ["smoke", "smoke", "smoke", "smoke"]
];

let aNum;
let bNum;
let operator;


///////////////////////////////////
//           RENDERING           //
///////////////////////////////////


for (let i = 0; i < 7; i++){
  let rowDiv = document.createElement("div");
  rowDiv.classList = "row";

  for (let j = 0; j < 4; j++){
    let optionDiv = document.createElement("button");
    optionDiv.id = ids[i][j];
    optionDiv.classList = `${classes[i][j]} ${altClasses[i][j]}`;
    optionDiv.textContent = options[i][j];
    optionDiv.style.backgroundColor = backgrounds[i][j];
    rowDiv.append(optionDiv);
  };

  divMenu.append(rowDiv);
};


///////////////////////////////////
//          PLACEHOLDER          //
///////////////////////////////////


divMenu.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("displayable")) {
    if (target.classList.contains("number")){
      if (divRight.textContent && divLeft.textContent && divOperator.textContent) {
        divLeft.text
      } else {
        if (divRight.textContent) {
          divLeft.textContent = divRight.textContent;
          divRight.textContent = target.textContent;
        } else {
          divRight.textContent = target.textContent;
        };
      };
    } else {
      divOperator.textContent = target.textContent;
    };
  };
});


///////////////////////////////////
//           UTILITIES           //
///////////////////////////////////

function add(a, b){
  return a + b;
};

function substract(a, b){
  return a - b;
};

function multiply(a, b){
  return a * b;
};

function divide(a, b){
  if (b === 0) {
    return "Can't divide by 0";
  }
  return a / b;
};

function operate(ope, a, b){
  switch (ope){
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  };
};