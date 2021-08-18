// Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?

import fs from 'fs'

let slope = fs.readFileSync('day3.txt')

slope = slope
  .toString()
  .split('\n')
  .map((line) => line.split(''))

let width = slope[0].length - 1

const findTrees = (x, y) => {
  let trees = 0
  let xCoord = x
  let yCoord = y

  for (let i = yCoord; i < slope.length; i += yCoord) {
    if (slope[i][xCoord] === '#') {
      trees++
    }

    xCoord += x
    if (xCoord > width) {
      xCoord -= width + 1
    }
  }
  return trees
}

// console.log(trees)
// Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.

// Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

// Right 1, down 1.
// Right 3, down 1. (This is the slope you already checked.)
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.
// In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

// What do you get if you multiply together the number of trees encountered on each of the listed slopes?

const paths = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
]

console.log(
  paths
    .map((path) => findTrees(path[0], path[1]))
    .reduce((acc, idx) => acc * idx, 1)
)
