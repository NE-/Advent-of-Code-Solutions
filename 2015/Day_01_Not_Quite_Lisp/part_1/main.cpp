/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2015 Day 1.1
 */

#include <fstream>
#include <iostream>
#include <sstream>

int main(int argc, char const *argv[]) {
  // Read input
  std::ifstream ifile("../input.txt");

  if (!ifile) {
    std::cout << "Failed to read input.txt\n";
    return 1;
  }
  else {
    std::stringstream input;
    input << ifile.rdbuf();
    ifile.close(); // End read input

    int floor{0}; // Start at floor 0

    for (const char c : input.str())
      /* 
        '(' = ascend floor
        ')' = descend floor
      */
      floor = c == '(' ? floor + 1 : floor - 1;

    std::cout << floor << '\n';
  }
  

  return 0;
}
