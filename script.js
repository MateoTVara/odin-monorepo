const Gameboard = (function(){
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push({});
    }
  }

  const getBoard = () => board;

  return {
    getBoard,
  }
})();

function Cell() {
  
}

function Player(nameInput, signInput) {
  const SIGNS = ["X", "O"];

  let name = typeof nameInput === "string" && nameInput.trim() !== "" ? nameInput : null;
  let sign = SIGNS.includes(signInput) ? signInput : null;
  let score = 0;

  const getName = () => name;
  const setName = (newName) => {
    if (typeof newName === "string" && newName.trim() !== ""){
      name = newName;
    } else {
      console.log("Not instance of String")
    }
  }

  const getSign = () => sign;
  const setSign = (newSign) => {
    if (SIGNS.includes(newSign)) {
      sign = newSign;
    } else {
      console.log("Not a valid sign");
    }
  }

  const getScore = () => score;
  const increaseScore = () => ++score;

  return {
    getName,
    setName,
    getSign,
    setSign,
    getScore,
    increaseScore,
  }
}

const GameController = (function() {
  const playerOne = Player("Emar", "X");
  const playerTwo = Player("Alpha", "O");

  let playerInTurn = playerOne;

  const getPlayerInTurn = () => playerInTurn;

  const switchPlayerTurn = () => {
    playerInTurn = (playerInTurn === playerOne) ? playerTwo : playerOne;
  }

  return {
    switchPlayerTurn,
    getPlayerInTurn,
  }
})();

const GameRender = (function() {
  const boardDiv = document.querySelector(".board");
  const startGameButton = document.querySelector(".start");

  const board = Gameboard.getBoard();
  
  const renderBoard = (board) => {
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        const cellButton = document.createElement("div");
        cellButton.classList.add("cell");
        cellButton.dataset.row = i;
        cellButton.dataset.column = j;
        boardDiv.appendChild(cellButton);
      })
    })
  }

  startGameButton.addEventListener("click", () => {
    boardDiv.addEventListener("click", (e) => {
      const target = e.target;

      if (target.textContent === "") {
        console.log(target);
        target.textContent = GameController.getPlayerInTurn().getSign();
        GameController.switchPlayerTurn();
      }
    })
  })

  renderBoard(board);

  return {
    renderBoard,
  }
})();