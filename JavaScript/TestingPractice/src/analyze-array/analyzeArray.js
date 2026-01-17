
/**
 * Analyzes an array of integers and returns an object with the following properties:
 * - average: the average of the array elements
 * - min: the minimum value in the array 
 * - max: the maximum value in the array
 * - length: the length of the array
 * @param {number[]} arr - The array of integers to analyze
 * @returns {Object} - An object containing the average, min, max and length of the array
 */
export function analyzeArray(arr) {
  if (!Array.isArray(arr)) throw new TypeError("Input must be an Array");

  arr.forEach(ele => {
    if (!Number.isInteger(ele)) throw new TypeError("Array elements must be integers");
  });
  const average = arr.reduce((sum, value) => sum + value) / arr.length;

  return {
    average: average,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  }
}