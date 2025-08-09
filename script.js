const gridDiv = document.querySelector("#grid");
const maxValueInput = document.querySelector("#max-value");
const cells = document.querySelectorAll(".cell");

console.log(window.getComputedStyle(gridDiv).backgroundColor);

function createGrid(maxVal) {
  for (let c = 0; c < maxVal; c++){
  const row = document.createElement("div");
  row.classList = "row";

  for (let i = 0; i < maxVal; i++){
  const cell = document.createElement("div");
  cell.classList = "cell";
  cell.addEventListener("mouseover", () => changeColor(cell));
  row.appendChild(cell);
  };

  gridDiv.appendChild(row);
};
}

maxValueInput.addEventListener("keydown", (e) =>{
  const gridSize = maxValueInput.value;
  if (e.key === "Enter") {
    while(gridDiv.hasChildNodes()){
      gridDiv.removeChild(gridDiv.firstChild);
    };
    if (gridSize <= 100) {
      createGrid(gridSize);
    }
    maxValueInput.value = "";
  };
});

function changeColor(element) {
  const currentColor = window.getComputedStyle(element).backgroundColor;
  
  if (currentColor === "rgba(0, 0, 0, 0)"){
    const firstColor = randomColor();
    const secondColor = randomColor();
    const thirdColor = randomColor();
    element.style.cssText = `background-color: rgb(${firstColor}, ${secondColor}, ${thirdColor}); opacity: 0.1`;
  };

  const currentOpacity = window.getComputedStyle(element).opacity;
  const newOpacity = parseFloat(currentOpacity) + 0.1;
  element.style.opacity = newOpacity;
};

function randomColor() {
  return Math.floor(Math.random() * 256);
}

createGrid(16);