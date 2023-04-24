/**
 * Author: @NE- https://github.com/NE-
 * 
 * **** INCOMPLETE ****
 * 
 * Solution for Advent of Code 2015 Day 15.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", 'utf-8').split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  console.log(input);

  let parsedInput = [];
  for (const str of input)
    parsedInput.push(str.match(/-?\d+/g)); // Get numbers from input

  console.log(parsedInput);
}
else console.error("Failed to read input.txt");