/**
 * Author: @NE- https://github.com/NE-
 * 
 * Solution for Advent of Code 2018 Day 3.2
 */

let input = null;

try {
  input = require('fs').readFileSync("../input.txt", "utf-8").split('\n');
} catch (err) {
  console.error(err);
}

if (input !== null) {
  const rects = [];

  // Save data as rectangle objects
  for (const str of input) {
    const parsedInput = str.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
    rects.push({
      claim: +parsedInput[1],
      x: +parsedInput[2],
      y: +parsedInput[3],
      w: +parsedInput[4],
      h: +parsedInput[5]
    });
  }

  /**
   * @brief Checks if two rectangles overlap (AABB)
   * 
   * @param {Object} r1 - first rectangle to check for collision
   * @param {Object} r2 - second rectangle to check for cillision
   * 
   * @returns {Boolean} - true if rectangles collide
   *                    - false otherwise
   */
  const isColliding = (r1, r2) => (
    (r1.x < r2.x + r2.w) && 
    (r1.x + r1.w > r2.x) && 
    (r1.y < r2.y + r2.h) && 
    (r1.y + r1.h > r2.y)
  );

  for (let i = 0; i < rects.length; ++i) {
    let collided = false;

    for (let j = 0; j < rects.length; ++j) {
      if (rects[i] == rects[j]) continue; // Prevent self checks

      // If the first rectangle collides, we can skip future checks
      if (isColliding(rects[i], rects[j])) {
        collided = true;
        break;
      }
    }

    // If a rectangle hasn't collided, that's our answer
    if (!collided) {
      console.log(rects[i].claim);
      break;
    }
  }
}
else console.error("Failed to read input.txt");