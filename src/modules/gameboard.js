import Ship from "./ship";

class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = new Array(size).fill(null).map(() => new Array(size).fill(null));
  }

  /**
   * Check if the given coordinates are within the bounds of the board.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @returns {boolean} - True if the coordinates are within bounds, false otherwise.
   */
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

  /**
   * Check if the given coordinates are valid for placing a ship.
   * @param {Array} coordinates - The coordinates to check.
   * @returns {boolean} - True if the placement is valid, false otherwise.
   */
  isValidPlacement(coordinates) {
    if (!coordinates.every(([x, y]) => this.isWithinBounds(x, y))) {
      return false;
    }
    return this.checkOverlapAndAdjacency(coordinates);
  }

  /**
   * Get the coordinates occupied by a ship based on its initial position and orientation.
   * @param {Ship} ship - The ship to get coordinates for.
   * @param {Array} initialCoords - The initial coordinates of the ship.
   * @param {"horizontal"|"vertical"} orientation - The orientation of the ship ("horizontal" or "vertical").
   * @returns {Array} - An array of coordinates occupied by the ship.
   */
  getCoordinatesStatus(ship, initialCoords, orientation) {
    const [x, y] = initialCoords;
    const coordinates = [];
    for (let i = 0; i < ship.length; i++) coordinates.push(orientation === "horizontal" ? [x+i, y] : [x, y+i]);
    return coordinates;
  }

  /**
   * Place a ship on the game board.
   * @param {Ship} ship - The ship to place.
   * @param {Array} initialCoords - The initial coordinates of the ship.
   * @param {"horizontal"|"vertical"} orientation - The orientation of the ship ("horizontal" or "vertical").
   */
  placeShip(ship, initialCoords, orientation) {
    ship.orientation = orientation;
    ship.startCoords = initialCoords;
    const coordinates = this.getCoordinatesStatus(ship, initialCoords, orientation);
    coordinates.forEach(([x, y]) => this.board[x][y] = ship);
  }

  /**
   * Receive an attack at the given coordinates.
   * @param {number} x - The x-coordinate of the attack.
   * @param {number} y - The y-coordinate of the attack.
   */
  receiveAttack(x, y) {
    if (this.board[x][y] instanceof Ship){
      this.board[x][y].hit();
    } else {
      this.board[x][y] = "missed";
    }
  }

  /**
   * Get all ships currently on the board.
   * @returns {Set<Ship>} - A set of ships on the board.
   */
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

  /**
   * Check if all ships on the board are sunk.
   * @returns {boolean} - True if all ships are sunk, false otherwise.
   */
  areAllShipsSunk() {
    return [...this.#getShipsOnBoard()].every(ship => ship.isSunk());
  }

  /**
   * Create a standard set of ships for the game.
   * @returns {Array<Ship>} - An array of ships.
   */
  createShipsSet() {
    const ships = [];
    for (let i = 0; i < 4; i++) ships.push(new Ship(1));
    for (let i = 0; i < 3; i++) ships.push(new Ship(2));
    for (let i = 0; i < 2; i++) ships.push(new Ship(3));
    ships.push(new Ship(4));
    return ships;
  }

  /**
   * Place ships on the game board.
   */
  placeShips() {
    const ships = this.createShipsSet();
    let orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (ships.length > 0) {
      const ship = ships.pop();
      const coordinates = this.getCoordinatesStatus(ship, [x, y], orientation);
      if (!this.isValidPlacement(coordinates)) {
        ships.push(ship);
        orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        continue;
      }
      this.placeShip(ship, [x, y], orientation);
    }
  }
}

export default Gameboard;