import Ship from "./ship";

class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = new Array(size).fill(null).map(() => new Array(size).fill(null));
  }

  isValidPosition(x, y){
    return x >=0 && x < this.size && y >= 0 && y < this.size;
  }

  isValidPlacement(coordinates) {
    if(!coordinates.every(([x, y]) => this.isValidPosition(x, y))) {
      throw new Error("Not a valid placement for this ship");
    }
  }

  placeShip(ship, initialCoords, orientation) {
    const [x, y] = initialCoords;

    const coordinates = [];

    for (let i = 0; i < ship.length; i++) {
      coordinates.push(orientation === "horizontal" ? [x+i, y] : [x, y+i]);
    }

    this.isValidPlacement(coordinates);
    coordinates.forEach(([x, y]) => this.board[x][y] = ship);
  }

  receiveAttack(x, y) {
    if (this.board[x][y] instanceof Ship){
      this.board[x][y].hit();
    } else {
      this.board[x][y] = "missed";
    }
  }

  #getShipsOnBoard() {
    const visited = new Set();
    const queue = [[0,0]];
    const ships = new Set();

    while(queue.length > 0) {
      const [x,y] = queue.shift();
      const key = `${x}${y}`;
      if(visited.has(key) || !this.isValidPosition(x,y)) continue;
      if(this.board[x][y] instanceof Ship) {
        ships.add(this.board[x][y]);
      }
      visited.add(key);
      queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    return ships;
  }

  areAllShipsSunk() {
    return [...this.#getShipsOnBoard()].every(ship => ship.isSunk());
  }
}

export default Gameboard;