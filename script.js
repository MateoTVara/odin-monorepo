// script.js

const divDisplay = document.querySelector("#display");
const divMenu = document.querySelector("#menu");

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

for (let i = 0; i < 7; i++){
  let rowDiv = document.createElement("div");
  rowDiv.classList = "row";

  for (let j = 0; j < 4; j++){
    let optionDiv = document.createElement("button");
    optionDiv.classList = "option";
    optionDiv.textContent = options[i][j];
    optionDiv.style.backgroundColor = backgrounds[i][j];
    rowDiv.append(optionDiv);
  };

  divMenu.append(rowDiv);
}