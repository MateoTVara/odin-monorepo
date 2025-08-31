const board = document.querySelector(".board");

for (let i = 0; i < 3; i++) {
  const row = document.createElement("div");
  for (let j = 0; j < 3; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    row.appendChild(cell);
  }
  board.appendChild(row);
}