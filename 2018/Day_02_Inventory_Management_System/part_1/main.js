/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2018 Day 2.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const CHARCODE_a = 'a'.charCodeAt();

  /**
   * @brief Checks a string if it contains exactly two or three of any letter
   * 
   * @param {String} str       - string to check
   * @param {Boolean} checkTwo - determines if it checks for exactly two or
   *                             three letters
   * 
   * @returns {Boolean}        - true if the string has exactly two or three
   *                             of any letter
   *                           - false otherwise
   */
  const hasTwoOrThree = (str, checkTwo) => {
    const freq = new Array(26).fill(0);

    for (const c of str)
      ++freq[c.charCodeAt() - CHARCODE_a];

    return freq.find(v => checkTwo ? v == 2 : v == 3) !== undefined;
  };

  let ttlTwos   = 0;
  let ttlThrees = 0;

  for (const str of input) {
    ttlTwos   += hasTwoOrThree(str, true);
    ttlThrees += hasTwoOrThree(str, false);
  }

  console.log(ttlTwos * ttlThrees);
}
else console.error("Failed to read input.txt");