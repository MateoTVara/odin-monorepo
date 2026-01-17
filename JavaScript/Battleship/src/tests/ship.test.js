import Ship from "../modules/ship";

const ship = new Ship(5);

test("ship.hit()", () => {
  for (let i = 0; i < 5; i++) ship.hit();
  expect(ship.timesHit).toBe(4);
});

test("ship.isSunk()", () => {
  expect(ship.isSunk()).toBe(true);
});