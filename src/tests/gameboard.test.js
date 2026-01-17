import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

test("places a ship horizontally on the board", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  board.placeShip(ship, [0, 0], "horizontal");
  expect(board.board[0][0]).toBe(ship);
  expect(board.board[1][0]).toBe(ship);
  expect(board.board[2][0]).toBe(ship);
});

test("receiveAttack hits a ship and marks misses", () => {
  const board = new Gameboard();
  const ship = new Ship(2);
  board.placeShip(ship, [1, 1], "horizontal");

  // should hit the ship
  board.receiveAttack(1, 1);
  expect(ship.timesHit).toBe(1);

  // should be a miss
  board.receiveAttack(3, 3);
  expect(board.board[3][3]).toBe("missed");
});

test("areAllShipsSunk returns true only when all ships are sunk", () => {
  const board = new Gameboard();
  const ship1 = new Ship(2);
  const ship2 = new Ship(3);

  board.placeShip(ship1, [0, 0], "horizontal");
  board.placeShip(ship2, [2, 2], "vertical");

  // Hit all positions of ship1
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);

  // Hit only part of ship2
  board.receiveAttack(2, 2);
  board.receiveAttack(2, 3);

  expect(board.areAllShipsSunk()).toBe(false);

  // Sink ship2
  board.receiveAttack(2, 4);

  expect(board.areAllShipsSunk()).toBe(true);
});