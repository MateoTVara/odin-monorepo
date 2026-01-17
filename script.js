const gridDiv = document.querySelector("#grid");
const maxValueInput = document.querySelector("#max-value");
const resetBtn = document.querySelector("#reset");
const darkenBtn = document.querySelector("#darken");
const coloredBtn = document.querySelector("#colored");
let currentMode = "darken";

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
  if (currentMode === "colored"){
    const currentRgba = window.getComputedStyle(element).backgroundColor.slice(5, -1).split(", ");
    let currentAlphaChannel = currentRgba[3];
    const firstColor = randomColor();
    const secondColor = randomColor();
    const thirdColor = randomColor();
    const newAlphaChannel = parseFloat(currentAlphaChannel) + 0.1;
    element.style.backgroundColor = `rgba(${firstColor}, ${secondColor}, ${thirdColor}, ${newAlphaChannel})`;
  } else if (currentMode === "darken"){
    const currentRgba = window.getComputedStyle(element).backgroundColor.slice(5, -1).split(", ");
    const currentAlphaChannel = currentRgba[3];
    const newAlphaChannel = parseFloat(currentAlphaChannel) + 0.1;
    element.style.backgroundColor = `rgba(0, 0, 0, ${newAlphaChannel})`;
  };
};

function randomColor() {
  return Math.floor(Math.random() * 256);
};

resetBtn.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell");
  for (const cell of Array.from(cells)){
    cell.style.backgroundColor = "rgba(0, 0, 0, 0)";
    cell.style.opacity = 1;
  };
});

darkenBtn.addEventListener("click", () => currentMode = "darken");
coloredBtn.addEventListener("click", () => currentMode = "colored");

createGrid(16);