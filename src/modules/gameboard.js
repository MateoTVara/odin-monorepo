import Ship from "./ship";

class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = new Array(size).fill(null).map(() => new Array(size).fill(null));
  }

  isWithinBounds(x, y){
    return x >=0 && x < this.size && y >= 0 && y < this.size;
  }

  checkOverlapAndAdjacency(coordinates) {
    for (const [x, y] of coordinates) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const ax = x + j;
          const ay = y + i;
          if(this.isWithinBounds(ax, ay) && this.board[ax][ay] instanceof Ship) return false
        }
      }
    }
    return true;
  }

  isValidPlacement(coordinates) {
    if (!coordinates.every(([x, y]) => this.isWithinBounds(x, y))) {
      return false;
    }
    return this.checkOverlapAndAdjacency(coordinates);
  }

  getCoordinatesStatus(ship, initialCoords, orientation) {
    const [x, y] = initialCoords;
    const coordinates = [];
    for (let i = 0; i < ship.length; i++) coordinates.push(orientation === "horizontal" ? [x+i, y] : [x, y+i]);
    return coordinates;
  }

  placeShip(ship, initialCoords, orientation) {
    ship.orientation = orientation;
    ship.startCoords = initialCoords;
    const coordinates = this.getCoordinatesStatus(ship, initialCoords, orientation);
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
      if(visited.has(key) || !this.isWithinBounds(x,y)) continue;
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