/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2015 Day 8.1
 */

let input = null;

// Read input
try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split("\n");
} catch (err) {
  console.error(err);
}

if (input !== null) {
  let ctr = 0;

  input.forEach(str => {
    //     Literal    - code representation
    ctr += str.length - eval(str).length;
  });

  console.log(ctr);
}
else console.error("Failed to read input.txt");