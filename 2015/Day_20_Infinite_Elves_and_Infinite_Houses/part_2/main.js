/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2015 Day 20.2
 */

const input = 29000000;

const houses = new Array(input).fill(0);

for (let elf = 2; elf < input; ++elf) {
  let limit = 0; // Counter for the imposed limit (50)

  // We can jump to form common factors e.g. 2+2+2+2...
  for (let house = elf-1; house < input; house += elf) {
    houses[house] += elf * 11; // Couldn't easily divide by 11, so it's automated
    ++limit;
    if (limit >= 50) break;
  }
  if (houses[elf-1] >= input) {
    console.log(elf);
    break;
  }
}