// index.js

import "./styles.css";
import { Gameboard, Player, Ship } from "./modules";

class App {
  constructor (){
    this.startBtn = document.querySelector("#start-btn");
    this.boardOne = document.querySelector("#board-one");
    this.gameBoardOne = new Gameboard();
    this.boardTwo = document.querySelector("#board-two");
    this.gameBoardTwo = new Gameboard();
    this.renderBoardCells(this.boardOne);
    this.renderBoardCells(this.boardTwo);
    this.placeShips(this.gameBoardOne);
    this.renderShips(this.boardOne, this.gameBoardOne);
    this.placeShips(this.gameBoardTwo);
    this.initEventListeners();
  }

  initEventListeners() {
    this.startBtn.addEventListener("click", () => {
      this.playerOne = new Player("real", this.gameBoardOne);
      this.playerTwo = new Player("computer", this.gameBoardTwo);      
    }, {once:true});
  }

  renderBoardCells(boardElement) {
    for (let i = 0; i < 10; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("td");
        cell.dataset.x = j;
        cell.dataset.y = i;
        row.appendChild(cell);
      }
      boardElement.appendChild(row);
    }
  }

  createShipsSet() {
    const ships = [];
    for (let i = 0; i < 4; i++) ships.push(new Ship(1));
    for (let i = 0; i < 3; i++) ships.push(new Ship(2));
    for (let i = 0; i < 2; i++) ships.push(new Ship(3));
    ships.push(new Ship(4));
    return ships;
  }

  placeShips(gameboard) {
    const ships = this.createShipsSet();
    let orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (ships.length > 0) {
      const ship = ships.pop();
      const coordinates = gameboard.getCoordinatesStatus(ship, [x, y], orientation);
      if (!gameboard.isValidPlacement(coordinates)) {
        ships.push(ship);
        orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        continue;
      }
      gameboard.placeShip(ship, [x, y], orientation);
    }
  }

  renderShips(boardElement, gameBoard) {
    for (let i = 0; i < gameBoard.board.length; i++) {
      for (let j = 0; j < gameBoard.board[i].length; j++) {
        const ship = gameBoard.board[i][j];
        if (ship instanceof Ship) {
          const cell = boardElement.querySelector(`td[data-x="${j}"][data-y="${i}"]`);
          cell.classList.add("ship-cell");
          
          if (ship.startCoords[0] === i && ship.startCoords[1] === j){
            const shipContainer = document.createElement("div");
            shipContainer.style.position = "relative";
            shipContainer.style.zIndex = "-1"
            if (ship.orientation === "horizontal") {
              cell.dataset.orientation = "h";
              shipContainer.style.width = '100%';
              shipContainer.style.height = `${102 * ship.length}%`;
            } else if (ship.orientation === "vertical") {
              cell.dataset.orientation = "v";
              shipContainer.style.width = `${102 * ship.length}%`;
              shipContainer.style.height = '100%';
            }
            cell.appendChild(shipContainer);
          }
        }
      }
    }
  }
}

const app = new App();