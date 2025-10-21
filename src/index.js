// index.js

import "./styles.css";
import { Gameboard, Player, Ship } from "./modules";

class App {
  constructor (){
    this.startBtn = document.querySelector("#start-btn");

    this.boardOne = document.querySelector("#board-one");
    this.boardOneBlocker = document.querySelector("#board-one .blocker")
    this.gameBoardOne = new Gameboard();
    this.boardTwo = document.querySelector("#board-two");
    this.boardTwoBlocker = document.querySelector("#board-two .blocker")
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

      this.boardTwo.querySelectorAll("td").forEach(td => {
        td.addEventListener("click", () => {
          this.handleCellClick(td, this.playerTwo, this.boardTwo);
          
          let shot = false;
          while(!shot) {
            let [x, y] = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
            const boardOneTd = this.boardOne.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
            if(boardOneTd.classList.contains("shot")){
              continue;
            } else {
              this.handleCellClick(boardOneTd, this.playerOne, this.boardOne);
              shot = true;
            }
          }
        }, {once: true});
      });
    }, {once:true});
  }

  removeAllEventListenersFromTd(td) {
    const clone = td.cloneNode(true);
    td.parentNode.replaceChild(clone, td);
  }

  markCornerNeigh(gameboard, boardEle, x, y) {
    [[x-1, y-1], [x-1, y+1], [x+1, y-1], [x+1, y+1]].forEach(([x,y]) => {
      if (gameboard.isWithinBounds(x, y)) {
        const td = boardEle.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
        td.classList.add("shot", "miss");
        this.removeAllEventListenersFromTd(td);
      }
    });
  }

  markAllShipMooreNeigh(gameboard, boardEle, ship) {
    const coordinates = gameboard.getCoordinatesStatus(ship, ship.startCoords, ship.orientation);
    coordinates.forEach(([x,y]) => {
      [ [x-1, y-1], [x, y-1], [x+1, y-1],
        [x-1, y],             [x+1, y],
        [x-1, y+1], [x, y+1], [x+1, y+1]
      ].forEach(([x, y]) => {
        if (gameboard.isWithinBounds(x, y) && !(gameboard.board[x][y] instanceof Ship)) {
          const td = boardEle.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
          if (td) {
            td.classList.add("shot", "miss");
            this.removeAllEventListenersFromTd(td);
          }
        }
      });
    });
  }

  handleCellClick(td, player, boardEle) {
    const x = Number(td.dataset.x);
    const y = Number(td.dataset.y);
    const entity = player.gameboard.board[x][y];
    td.classList.add("shot");
    if (entity instanceof Ship) {
      td.classList.add("hit");
      entity.hit();
      if(!entity.isSunk()) {
        this.markCornerNeigh(player.gameboard, boardEle, x, y);
      } else {
        this.markAllShipMooreNeigh(player.gameboard, boardEle, entity);
      }
    } else {
      td.classList.add("miss")
    }
    const tdOne = this.boardOneBlocker.querySelector("td");
    const tdTwo = this.boardTwoBlocker.querySelector("td");
    if (this.playerOne.gameboard.areAllShipsSunk() || this.playerTwo.gameboard.areAllShipsSunk()) {
      if (this.playerOne.gameboard.areAllShipsSunk()){
        tdOne.textContent = "You lose.";
        tdTwo.textContent = "You win!";
      } else if (this.playerTwo.gameboard.areAllShipsSunk()) {
        tdOne.textContent = "You win!";
        tdTwo.textContent = "You lose.";
      }
      this.boardOneBlocker.classList.add("active");
      this.boardTwoBlocker.classList.add("active");
    }
    
  }

  renderBoardCells(boardElement) {
    for (let i = 0; i < 10; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("td");
        cell.dataset.x = i;
        cell.dataset.y = j;
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
          const cell = boardElement.querySelector(`td[data-x="${i}"][data-y="${j}"]`);
          cell.classList.add("ship-cell");
          
          if (ship.startCoords[0] === i && ship.startCoords[1] === j){
            const shipContainer = document.createElement("div");
            shipContainer.classList.add("ship")
            shipContainer.style.position = "relative";
            shipContainer.style.zIndex = "1"
            if (ship.orientation === "vertical") {
              cell.dataset.orientation = "v";
              shipContainer.style.width = `${102 * ship.length}%`;
              shipContainer.style.height = '100%';
            } else if (ship.orientation === "horizontal") {
              cell.dataset.orientation = "h";
              shipContainer.style.width = '100%';
              shipContainer.style.height = `${102 * ship.length}%`;
            }
            cell.appendChild(shipContainer);
          }
        }
      }
    }
  }
}

const app = new App();

console.table(app.gameBoardOne.board);
console.table(app.gameBoardTwo.board);