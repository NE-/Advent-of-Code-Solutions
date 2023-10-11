/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2018 Day 5.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  while(1) {
    let destroyed = false; // Done when no destruction has taken place

    for (let i = 0; i < input.length-1; ++i) {
      // Check if only 5th bit is set (uppercase equivalent has this bit set)
      if ((input.charCodeAt(i) ^ input.charCodeAt(i+1)) == 0x20) {
        destroyed = true;

        // Remove adjacent units
        let split = input.split('');
        split.splice(i, 2);
        input = split.join('');
      }
    }

    // If no destruction took place, we found the solution
    if (!destroyed) break;
  }

  console.log(input.length);
}
else console.error("Failed to read input.txt");