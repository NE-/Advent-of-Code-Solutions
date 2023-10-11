/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2018 Day 5.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const polymer = str => {
    while(1) {
      let destroyed = false; // Done when no destruction has taken place
  
      for (let i = 0; i < str.length-1; ++i) {
        // Check if only 5th bit is set (uppercase equivalent has this bit set)
        if ((str.charCodeAt(i) ^ str.charCodeAt(i+1)) == 0x20) {
          destroyed = true;
  
          // Remove adjacent units
          let split = str.split('');
          split.splice(i, 2);
          str = split.join('');
        }
      }
  
      // If no destruction took place, we found the solution
      if (!destroyed) return str.length;
    }
  };

  let min = Number.MAX_SAFE_INTEGER;

  // For every letter in the English alphabet
  for (let i = 0; i < 26; ++i) {
    // Remove upper and lowercase letter
    const filtered = input.split('')
      .filter(c => 
        c != String.fromCharCode(65 + i) && // Uppercase
        c != String.fromCharCode(97 + i)    // Lowercase
      );

    // Letter not in string
    if (filtered.length == input.length) continue;

    // Find smallest length
    const length = polymer(filtered.join(''));
    if (length < min) min = length;
  }

  console.log(min);
}
else console.error("Failed to read input.txt");