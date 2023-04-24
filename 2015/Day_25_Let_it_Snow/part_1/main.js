/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2015 Day 25.1
 */

let row = 1;
let col = 1;
let prevCode = 20151125;

// Coordinates based on input
while(row != 2947 || col != 3029) {
  prevCode = (prevCode * 252533) % 33554393;

  if (row == 1) {
    row = col + 1; // Go down
    col = 1;       // Stay on column 1
  }
  else {
    ++col; // Go right
    --row; // Go up
  }
}

console.log(prevCode);