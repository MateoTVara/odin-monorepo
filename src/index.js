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
    this.renderBoardCells();
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

  renderBoardCells() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cellOne = document.createElement("button");
        cellOne.dataset.x = j;
        cellOne.dataset.y = i;
        this.boardOne.appendChild(cellOne);

        const cellTwo = document.createElement("button");
        cellTwo.dataset.x = j;
        cellTwo.dataset.y = i;
        this.boardTwo.appendChild(cellTwo);
      }
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
        if (gameBoard.board[i][j] instanceof Ship) {
          boardElement.querySelector(`button[data-x="${j}"][data-y="${i}"]`).classList.add("ship-cell");
        }
      }
    }
  }
}

const app = new App();