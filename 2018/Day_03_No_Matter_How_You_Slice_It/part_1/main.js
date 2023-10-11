/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2018 Day 3.1
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const fabric = 
    new Array(1000)
      .fill('.')
      .map(() => Array(1000).fill('.'));

  /**
   * @brief Fills a rectangle at a given point by the given dimensions
   *        '#' if space is unclaimed
   *        'X' otherwise
   * 
   * @param {String} pt  - starting point as "x,y"
   * @param {String} dim - dimensions of rectangle as "w,h"
   */
  const fillRect = (pt, dim) => {
    const [x, y] = pt.split(",");
    const [w, h] = dim.split('x');

    for (let _x = +x; _x < +w + +x; ++_x) {
      for (let _y = +y; _y < +h + +y; ++_y)
        // If spot is empty, fill with '#' else 'X'
        fabric[_y][_x] = fabric[_y][_x] == '.' ? '#' : 'X';
    }
  };

  // Parse input
  for (const str of input) {
    const [claim, pt, dim] = str.split(/[^\d] /);
    fillRect(pt, dim);
  }

  // Calculate total number of 'X's
  let ttl = 0;
  fabric.filter(v =>
    ttl += v.filter(c => c == 'X').length
  );

  console.log(ttl);
}
else console.error("Failed to read input.txt");