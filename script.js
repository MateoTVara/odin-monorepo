const Gameboard = (function(){
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  return {
    getBoard,
  }
})();

function Cell(valueInput="unknown") {
  const sign = valueInput;

  return{
    sign,
  }
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
  const board = Gameboard.getBoard();
  const playerOne = Player("Emar", "X");
  const playerTwo = Player("Alpha", "O");

  let playerInTurn = playerOne;
  // 0: ongoing; 1: over
  let gameState = 0;

  const getPlayerOne = () => playerOne;
  const getPlayerTwo = () => playerTwo;
  const getPlayerInTurn = () => playerInTurn;
  const getGameState = () => gameState;

  const switchPlayerTurn = () => {
    playerInTurn = (playerInTurn === playerOne) ? playerTwo : playerOne;
  }

  const checkRoundOver = (rowInput, columnInput, signInput) => {
    const row = parseInt(rowInput);
    const col = parseInt(columnInput);
    
    if (board[row].every(cell => cell.sign === signInput)) return true;
    if (board.every(boardRow => boardRow[col].sign === signInput)) return true;
    if (row === col && board.every((boardRow, i) => boardRow[i].sign === signInput)) return true;
    if (row + col === board.length - 1 && board.every((boardRow, i) => boardRow[2-i].sign === signInput)) return true;
    
    return false;
  }

  const playRound = (row, column) => {
    if (gameState) return;

    if (checkRoundOver(row, column, playerInTurn.getSign())) {
      gameState = 1;
      return playerInTurn;
    }

    switchPlayerTurn();

    return null;
  }

  const resetGame = () => {
    gameState = 0;
    board.forEach((row) => {
      row.forEach(cell => {
        cell.sign = "unknown";
      })
    })
  }

  return {
    switchPlayerTurn,
    getPlayerInTurn,
    getPlayerOne,
    getPlayerTwo,
    getGameState,
    playRound,
    resetGame,
  }
})();

const GameRender = (function() {
  const boardDiv = document.querySelector(".board");
  const startGameButton = document.querySelector(".start");
  const playerRightDiv = document.querySelector(".players>div:first-child");
  const playerLeftDiv = document.querySelector(".players>div:last-child");
  const winnerH1 = document.querySelector(".winner-msg");
  const dialog = document.querySelector("dialog");

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

  const resetBoard = (board) => {
    [...board.children].forEach((cell) => cell.textContent = "");
  }

  startGameButton.addEventListener("click", () => {
    playerRightDiv.textContent = GameController.getPlayerOne().getName();
    playerLeftDiv.textContent = GameController.getPlayerTwo().getName();

    boardDiv.addEventListener("click", (e) => {
      if (!(GameController.getGameState())){
        const target = e.target;
        const row = target.dataset.row;
        const column = target.dataset.column;

        if (target.textContent === "") {
          const playerSign = GameController.getPlayerInTurn().getSign();
          const cell = board[row][column];
          console.log(target);
          target.textContent = playerSign;
          cell.sign = playerSign;
          const result = GameController.playRound(row, column);
          console.log(cell.sign);

          if(result) {
            winnerH1.textContent += ` ${result.getName()}!`;
            dialog.style.display = "flex";
          }
        }
      }
    })
  })

  dialog.addEventListener("click", () => {
    winnerH1.textContent = "Winner: "
    dialog.style.display = "none";
    resetBoard(boardDiv);
    GameController.resetGame();
  })

  renderBoard(board);

  return {
    renderBoard,
  }
})();