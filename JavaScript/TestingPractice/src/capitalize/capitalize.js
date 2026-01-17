/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
export function capitalize(str) {
  if (typeof str !== "string"){
    throw new TypeError("Input must be a string");
  }

  return str[0].toUpperCase() + str.slice(1);
}