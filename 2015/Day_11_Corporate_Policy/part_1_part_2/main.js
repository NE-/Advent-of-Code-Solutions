/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2015 Day 11
 */

const input = "hepxcrrq";

// Checks for 3 consecutive letters
const hasStraight = passw => {
  for (let i = 0; i < passw.length-2; ++i) {
    if (passw[i].charCodeAt(0)   == passw[i+1].charCodeAt(0)-1 && 
        passw[i+1].charCodeAt(0) == passw[i+2].charCodeAt(0)-1) 
      return true;
  }

  return false;
};

const isValid = passwd => {
  return hasStraight(passwd) &&          // At least 3 consecutive letters
    !(/[iol]/.test(passwd))  &&          // Does not contain 'i', 'o', or 'l'
    passwd.match(/(.)\1/g)?.length >= 2; // Two different, non-overlapping pairs of letters
};

const incChar = passwd => {
  const currentChar = passwd.slice(-1); // Get last character

  // If the character is 'z', "overflow" to 'a' and carry then check carry
  if (currentChar == 'z') return incChar(passwd.slice(0,-1)) + 'a';
  
  // Otherwise, return the string without the last character + incremented last character
  return passwd.slice(0,-1) + (String.fromCharCode(currentChar.charCodeAt(0) + 1));
};

let solution = input;

// Part 1
while(!isValid(solution))
  solution = incChar(solution);

console.log(solution);

// Part 2
solution = incChar(solution);

while(!isValid(solution))
  solution = incChar(solution);

console.log(solution);