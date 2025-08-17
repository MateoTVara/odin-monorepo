// script.js

///////////////////////////////////
//        DOM REFERENCES         //
///////////////////////////////////

const divDisplay = document.querySelector("#display");
const divMenu = document.querySelector("#menu");
const divLeft = document.querySelector("#left");
const divRight = document.querySelector("#right");
const divOperator = document.querySelector("#operator");


///////////////////////////////////
//       BUTTON CONFIGS          //
///////////////////////////////////


const ids = [
  ["mc", "mr", "m-minus", "m-plus"],
  ["ac", "percent", "sqrt-x", "divide"],   // AC, %, √, ÷
  ["seven", "eight", "nine", "multiply"],  // 7 8 9 ×
  ["four", "five", "six", "subtract"],     // 4 5 6 −
  ["one", "two", "three", "add"],          // 1 2 3 +
  ["zero", "decimal", "power", "equals"]   // 0 . ^ =
];

const classes = [
  ["",            "",            "",            ""           ],   // mc, mr, m-, m+
  ["",            "displayable", "displayable", "displayable"],   // AC, √X, %, ÷
  ["displayable", "displayable", "displayable", "displayable"],   // 7, 8, 9, x
  ["displayable", "displayable", "displayable", "displayable"],   // 4, 5, 6, -
  ["displayable", "displayable", "displayable", "displayable"],   // 1, 2, 3, +
  ["displayable", "displayable", "displayable", "displayable"]    // 0, ., ^, =
];

const altClasses = [
  ["operator", "operator", "operator", "operator"],       // mc, mr, m-, m+
  ["operator", "operator", "operator", "operator"],       // AC, √X, %, ÷
  ["number",   "number",   "number",   "operator"],       // 7, 8, 9, x
  ["number",   "number",   "number",   "operator"],       // 4, 5, 6, -
  ["number",   "number",   "number",   "operator"],       // 1, 2, 3, +
  ["number",   "number",   "operator", "operator"]        // 0, ., ^, =
];

const options = [
  ["mc", "mr", "m-", "m+"],
  ["AC", "%", "√", "÷"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "^", "="]
];

const backgrounds = [
  ["smoke", "smoke", "smoke", "smoke"],
  ["smoke", "smoke", "smoke", "yellow"],
  ["white", "white", "white", "yellow"],
  ["white", "white", "white", "yellow"],
  ["white", "white", "white", "yellow"],
  ["white", "white", "white", "yellow"]
];


///////////////////////////////////
//         APP STATE             //
///////////////////////////////////


let aNum;
let bNum;
let operator;


///////////////////////////////////
//           RENDERING           //
///////////////////////////////////


for (let i = 0; i < 6; i++){
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


//////////////////////////////////
//        EVENT HANDLING        //
//////////////////////////////////


divMenu.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("displayable")) {
    if (target.classList.contains("number")){
      if (divRight.textContent === "0"){
        divRight.textContent = target.textContent;
      } 
      else {
        if (divRight.textContent.includes(".") && target.id === "decimal"){} 
        else {
          divRight.textContent += target.textContent;
        };
      };
    }
    else if (target.classList.contains("operator") && !(divRight.textContent) && !(divLeft.textContent)) return;
    else if (target.classList.contains("operator") && divRight.textContent && divLeft.textContent){
      if (target.textContent === "=") {
        divRight.textContent = operate(divOperator.textContent, parseFloat(divLeft.textContent), parseFloat(divRight.textContent));
        divLeft.textContent = "";
        divOperator.textContent = "";
      }
      else {
        divLeft.textContent = operate(divOperator.textContent, parseFloat(divLeft.textContent), parseFloat(divRight.textContent));
        divRight.textContent = "";
        divOperator.textContent = target.textContent;
      };
    } 
    else if(target.classList.contains("operator") && !(divRight.textContent)){
      if (target.id == "equals") return;
      divOperator.textContent = target.textContent;
    }
    else {
      if (target.id == "equals") return;
      divOperator.textContent = target.textContent;
      divLeft.textContent = divRight.textContent;
      divRight.textContent = "";
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
  };
  return a / b;
};

function power(a, b){
  if (b === 0) {
    return 1;
  }
  return a ** b;
};

function root(a, b){
  return b ** (1 / a);
};

function percent(a, b){
  return (a / 100) * b;
};

function operate(ope, a, b){
  switch (ope){
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "*":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    case "^":
      return power(a, b);
    case "√":
      return root(a, b);
    case "%":
      return percent(a, b);
  };
};