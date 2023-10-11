/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2018 Day 2.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  /**
   * @brief Checks if two strings differ by exactly one character
   * 
   * @param {String} str1 - first string to compare
   * @param {String} str2 - second string to compare against
   * 
   * @returns {Boolean}   - true if the strings differ by 1 character
   *                      - false otherwise
   */
  const diffBy1 = (str1, str2) => {
    if (str1.length !== str2.length) return false;

    let nDiff = 0; // Number of different characters

    for (let i = 0; i < str1.length; ++i)
      if (str1[i] != str2[i]) ++nDiff;

    return nDiff == 1;
  };

  /**
   * @brief Extracts all the different characters of two strings
   * 
   * @param {String} str1 - first string to compare
   * @param {String} str2 - second string to compare against
   * 
   * @returns {String}    - final string without the different characters
   */
  const extractDiffChar = (str1, str2) => {
    if (str1.length !== str2.length) return "";

    let output = "";

    for (let i = 0; i < str1.length; ++i)
      output += str1[i] == str2[i] ? str1[i] : "";

    return output;
  };

  for (let i = 0; i < input.length-1; ++i) {
    for (let j = i + 1; j < input.length; ++j) {
      if(diffBy1(input[i], input[j])) {
        console.log(extractDiffChar(input[i], input[j]));
        break;
      }
    }
  }
}
else console.error("Failed to read input.txt");
