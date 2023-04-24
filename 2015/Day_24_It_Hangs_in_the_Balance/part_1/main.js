/**
 * Author: @NE- https://github.com/NE-
 * 
 * **** INCOMPLETE ****
 * 
 * Solution for Advent of Code 2015 Day 24.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const wtPerGroup = input.reduce((a, b) => +a + +b) / 3;

  // Find all combinations equal to weight per group
  
}
else console.error("Failed to read input.txt");