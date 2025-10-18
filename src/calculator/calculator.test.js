import { Calculator } from "./calculator";

test('add', () => {
  expect(Calculator.add(5, 4)).toBe(9);
});

test('substract', () => {
  expect(Calculator.substract(5, 3)).toBe(2);
});

test('divide', () => {
  expect(Calculator.divide(10, 2)).toBe(5);
});

test('multiply', () => {
  expect(Calculator.multiply(10, 2)).toBe(20);
});