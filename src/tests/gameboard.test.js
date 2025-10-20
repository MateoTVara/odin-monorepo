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