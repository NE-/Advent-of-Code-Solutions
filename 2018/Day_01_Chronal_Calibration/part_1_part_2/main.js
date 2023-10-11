/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2018 Day 1.1 and 1.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  // Part 1
  console.log(
    input.reduce((acc, curr) => acc + +curr, 0)
  );

  // Part 2
  const freqs = { 0: true }; // Holds frequencies hit. Starts at 0
  let result = 0;            // Result of input addition

  for (let i = 0; ; ++i) {
    result += +input[i % input.length];

    // We've hit a duplicate frequency; problem solved
    if (freqs[result] != undefined) break;

    // Set current frequency as hit
    freqs[result] = true;
  }

  console.log(result);
}
else console.error("Failed to read input.txt");