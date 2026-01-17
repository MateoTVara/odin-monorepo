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

const GameController = (function() {
  const board = Gameboard.getBoard();
  const playerOne = Player("Emar", "X");
  const playerTwo = Player("Alpha", "O");

  let playerInTurn = playerOne;
  // 0: ongoing; 1: over
  let gameState = 0;
  
  let roundCounter = 0;

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
    
    if (board[row].every(cell => cell.sign === signInput)) return "win";
    if (board.every(boardRow => boardRow[col].sign === signInput)) return "win";
    if (row === col && board.every((boardRow, i) => boardRow[i].sign === signInput)) return "win";
    if (row + col === board.length - 1 && board.every((boardRow, i) => boardRow[2-i].sign === signInput)) return "win";
    if (board.every(r => r.every(c => c.sign !== "unknown"))) return "tie";
    
    return false;
  }

  const playGame = (rounds, row, column) => {
    if (gameState) return;

    const result = checkRoundOver(row, column, playerInTurn.getSign());

    if (result === "win") {
      roundCounter++;
      playerInTurn.increaseScore();
      if (roundCounter >= rounds){
        gameState = 1;
        return playerOne.getScore() > playerTwo.getScore() ? playerOne.getName() :
               playerTwo.getScore() > playerOne.getScore() ? playerTwo.getName() : "tie";
      }
      return playerInTurn.getName();
    } else if (result === "tie") {
      roundCounter++;
      if (roundCounter >= rounds){
        gameState = 1;
        return playerOne.getScore() > playerTwo.getScore() ? playerOne.getName() :
               playerTwo.getScore() > playerOne.getScore() ? playerTwo.getName() : "tie";
      }
      return "tie";
    }

    switchPlayerTurn();

    return null;
  }

  const newRound = () => {
    board.forEach((row) => {
      row.forEach(cell => {
        cell.sign = "unknown";
      })
    })
  }

  const resetGame = () => {
    gameState = 0;
    roundCounter = 0;
    playerOne.resetScore();
    playerTwo.resetScore();
  }

  return {
    switchPlayerTurn,
    getPlayerInTurn,
    getPlayerOne,
    getPlayerTwo,
    getGameState,
    playGame,
    newRound,
    resetGame,
  }
})();

const GameRender = (function() {
  const boardDiv = document.querySelector(".board");
  const startGameButton = document.querySelector(".start");
  const playerLeftDiv = document.querySelector(".players>div:first-child");
  const playerRightDiv = document.querySelector(".players>div:last-child");
  const winnerH1 = document.querySelector(".winner-msg");
  const dialog = document.querySelector("dialog");
  const playerOneInput = document.querySelector("#player1");
  const playerTwoInput = document.querySelector("#player2");

  const board = Gameboard.getBoard();

  let gameStart = false;
  
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
    if (GameController.getGameState()){
      GameController.resetGame();
    }
    let playerOneName = GameController.getPlayerOne().getName();
    let playerTwoName = GameController.getPlayerTwo().getName();
    if(!(gameStart)){
      playerOneName = playerOneInput.value === "" ? GameController.getPlayerOne().getName() : GameController.getPlayerOne().setName(playerOneInput.value);
      playerTwoName = playerTwoInput.value === "" ? GameController.getPlayerTwo().getName() : GameController.getPlayerTwo().setName(playerTwoInput.value);
      playerOneInput.value = "";
      playerTwoInput.value = "";
    }
    gameStart = true;
    playerLeftDiv.textContent = `${playerOneName}: ${GameController.getPlayerOne().getScore()}`;
    playerLeftDiv.setAttribute("title", playerOneName);
    playerRightDiv.textContent = `${playerTwoName}: ${GameController.getPlayerTwo().getScore()}`;
    playerRightDiv.setAttribute("title", playerTwoName);
  })

  boardDiv.addEventListener("click", (e) => {
    if (!(GameController.getGameState()) && gameStart){
      const target = e.target;
      const row = target.dataset.row;
      const column = target.dataset.column;

      if (target.textContent === "") {
        const playerSign = GameController.getPlayerInTurn().getSign();
        const cell = board[row][column];
        console.log(target);
        target.textContent = playerSign;
        cell.sign = playerSign;
        const result = GameController.playGame(3, row, column);
        console.log(cell.sign);

        if(result) {
          winnerH1.textContent += ` ${result}!`;
          dialog.style.display = "flex";
        }
      }
    }
  })

  dialog.addEventListener("click", () => {
    winnerH1.textContent = "Winner: "
    dialog.style.display = "none";
    resetBoard(boardDiv);
    playerLeftDiv.textContent = `${GameController.getPlayerOne().getName()}: ${GameController.getPlayerOne().getScore()}`;
    playerRightDiv.textContent = `${GameController.getPlayerTwo().getName()}: ${GameController.getPlayerTwo().getScore()}`;
    GameController.newRound();
  })

  renderBoard(board);

  return {
    renderBoard,
  }
})();

function Cell(valueInput="unknown") {
  let sign = valueInput;

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
    return name;
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
  const resetScore = () => {
    score = 0;
  };

  return {
    getName,
    setName,
    getSign,
    setSign,
    getScore,
    increaseScore,
    resetScore,
  }
}