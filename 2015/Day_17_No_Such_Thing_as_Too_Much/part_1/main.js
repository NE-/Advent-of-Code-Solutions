/**
 * Author: @NE- https://github.com/NE-
 * 
 * **** INCOMPLETE ****
 * 
 * Solution for Advent of Code 2015 Day 17.1
 */

/*
  DOES NOT WORK! only works for the example.

  TODO:
    Make a tree and remove duplicate combinations
*/

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let ctr = 0;

  const calc = (base, index) => {
    if (index >= input.length) return;

    let current = base - +input[index];

    if (current == 0) {
      ++ctr;
      calc(base, index + 1); // Return and check against the next liter
    }
    else if (current < 0) {
      calc(base, index + 1); // Return and check against the next liter
    }
    else {
      calc(current, index + 1); // Check against the next liter
    }
  };

  for (let i = 0; i < input.length-1; ++i)
    calc(150, i);

  console.log(ctr);
}
else console.error("Failed to read input.txt");