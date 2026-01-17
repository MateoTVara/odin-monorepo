export class Calculator {
  constructor() {}

  static add(a, b) {
    if (typeof a !== "number" && typeof b !== "number") {
      throw new TypeError("Input must be a number")
    }

    return a + b;
  }

  static substract(a, b) {
    if (typeof a !== "number" && typeof b !== "number") {
      throw new TypeError("Input must be a number")
    }

    return a - b;
  }

  static divide(a, b) {
    if (typeof a !== "number" && typeof b !== "number") {
      throw new TypeError("Input must be a number")
    }

    if (b === 0) return new Error("Division by zero is not allowed");

    return a / b;
  }

  static multiply(a, b) {
    if (typeof a !== "number" && typeof b !== "number") {
      throw new TypeError("Input must be a number")
    }

    return a * b;
  }
}