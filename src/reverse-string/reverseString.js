/**
 * Reverses the given string
 * @param {string} str - The string to reverse
 * @returns {string} - The reversed string
 */
export function reverseString(str) {
  if (typeof str !== "string") {
    throw new TypeError("Input must be a string");
  }

  let reversed = [];

  [...str].forEach(char => {
    reversed.unshift(char);
  });

  reversed = reversed.join("");

  return reversed;
}