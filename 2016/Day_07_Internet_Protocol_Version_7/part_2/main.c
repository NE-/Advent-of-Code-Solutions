/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2016 Day 7.2
 * 
 * INCOMPLETE
 */

#include <stdbool.h>
#include <stdio.h>

int main(int argc, char const *argv[]) {
  FILE* ifile = fopen("../input.txt", "r");

  if (ifile) {
    char buf[0xFF];
    int supportCtr = 0;

    while (fgets(buf, sizeof buf, ifile)) {
      bool isABA = false;
      bool isBAB = false;
      bool isHyperNet = false;

    }

  }
  else {
    perror("Failed to read input.txt");
    return 1;
  }

  return 0;
}
