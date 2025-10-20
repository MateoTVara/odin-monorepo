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
}

export default Gameboard;