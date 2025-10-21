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
    
    this.gameBoardOne.placeShips();
    this.renderShips(this.boardOne, this.gameBoardOne);

    this.gameBoardTwo.placeShips();
    
    this.computerTargets = [];
    
    this.initEventListeners();
  }

  /**
   * Initialize event listeners for the game.
   */
  initEventListeners() {
    this.startBtn.addEventListener("click", () => {
      this.playerOne = new Player("real", this.gameBoardOne);
      this.playerTwo = new Player("computer", this.gameBoardTwo);

      this.boardTwo.querySelectorAll("td").forEach(td => {
        td.addEventListener("click", () => {
          this.handleCellClick(td, this.playerTwo, this.boardTwo);
          this.boardTwoBlocker.classList.add("active");

          setTimeout(() => {
            this.computerAttack();
            if(this.playerTwo.gameboard.areAllShipsSunk() || this.playerOne.gameboard.areAllShipsSunk()) return;
            this.boardTwoBlocker.classList.remove("active");
          }, 500);
        }, {once: true});
      });
    }, {once:true});
  }

  /**
   * Remove all event listeners from a table cell.
   * @param {HTMLElement} td - The table cell element.
   */
  removeAllEventListenersFromTd(td) {
    const clone = td.cloneNode(true);
    td.parentNode.replaceChild(clone, td);
  }

  /**
   * Mark the corner neighbors of a hit cell.
   * @param {Gameboard} gameboard 
   * @param {HTMLElement} boardEle 
   * @param {number} x 
   * @param {number} y 
   */
  markCornerNeigh(gameboard, boardEle, x, y) {
    [[x-1, y-1], [x-1, y+1], [x+1, y-1], [x+1, y+1]].forEach(([x,y]) => {
      if (gameboard.isWithinBounds(x, y)) {
        const td = boardEle.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
        td.classList.add("shot", "miss");
        this.removeAllEventListenersFromTd(td);
      }
    });
  }

  /**
   * Mark all neighboring cells of a ship.
   * @param {Gameboard} gameboard 
   * @param {HTMLElement} boardEle 
   * @param {Ship} ship 
   */
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

  /**
   * Handle a cell click event.
   * @param {HTMLElement} td - The clicked table cell.
   * @param {Player} player - The player making the move.
   * @param {HTMLElement} boardEle - The board element.
   */
  handleCellClick(td, player, boardEle) {
    const x = Number(td.dataset.x);
    const y = Number(td.dataset.y);

    if (Number.isNaN(x) || Number.isNaN(y) || !player.gameboard.isWithinBounds(x, y)) {
      return;
    }

    const entity = player.gameboard.board[x][y];
    td.classList.add("shot");
    player.gameboard.receiveAttack(x, y);
    if (entity instanceof Ship) {
      td.classList.add("hit");
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

  /**
   * Render the board cells for a game board.
   * @param {HTMLElement} boardElement - The board element to render cells into.
   */
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

  /**
   * Render ships on the game board.
   * @param {HTMLElement} boardElement - The board element to render ships into.
   * @param {Gameboard} gameBoard - The game board containing ships.
   */
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

  /**
   * Computer makes an attack on the player's board.
   */
  computerAttack() {
    let shot = false;
    while (!shot) {
      let x, y;

      // Use smart targeting if available, otherwise pick random cell
      if (this.computerTargets.length > 0) {
        [x, y] = this.computerTargets.pop();
      } else {
        [x, y] = [
          Math.floor(Math.random() * this.playerOne.gameboard.size),
          Math.floor(Math.random() * this.playerOne.gameboard.size)
        ];
      }

      const tdOneCell = this.boardOne.querySelector(`td[data-x="${x}"][data-y="${y}"]`);

      // Skip if invalid or already shot
      if (!tdOneCell || tdOneCell.classList.contains("shot")) continue;

      this.handleCellClick(tdOneCell, this.playerOne, this.boardOne);
      shot = true;

      // If hit, add neighbors to targets
      if (this.playerOne.gameboard.board[x][y] instanceof Ship) {
        [
          [x-1, y],
          [x+1, y],
          [x, y-1],
          [x, y+1]
        ].forEach(([nx, ny]) => {
          if (
            this.playerOne.gameboard.isWithinBounds(nx, ny) &&
            !this.boardOne.querySelector(`td[data-x="${nx}"][data-y="${ny}"]`).classList.contains("shot") &&
            !this.computerTargets.some(([cx, cy]) => cx === nx && cy === ny)
          ) {
            this.computerTargets.push([nx, ny]);
          }
        });
      }
    }
  }
}

const app = new App();