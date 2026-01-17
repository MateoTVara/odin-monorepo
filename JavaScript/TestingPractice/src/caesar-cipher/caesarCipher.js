/**
 * Caesar Cipher
 * @param {string} str - The string to encrypt
 * @param {number} shift - The number of places to shift each letter
 * @returns {string} - The encrypted string
 */
export function caesarCipher(str, shift) {
  if (typeof str !== "string") return new TypeError("str must be a string");
  if (!Number.isInteger(shift)) return new TypeError("shift must be an interger");
  
  const alpha = "abcdefghijklmnopqrstuvwxyz"
  const cipher = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    let ai = [...alpha].indexOf(char);
    if (ai === -1) ai = [...alpha.toUpperCase()].indexOf(char);
    let ci = ai + shift;
    if (ci >= alpha.length) ci = ci % alpha.length;

    if (alpha.includes(char)) {
      cipher.push(alpha[ci]);
    } else if (alpha.toUpperCase().includes(char)) {
      cipher.push(alpha[ci].toUpperCase())
    } else cipher.push(char);
  }

  return cipher.join("");
}