// --- Day 11: Seating System ---
// Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

// By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

// The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

// L.LL.LL.LL
// LLLLLLL.LL
// L.L.L..L..
// LLLL.LL.LL
// L.LL.LL.LL
// L.LLLLL.LL
// ..L.L.....
// LLLLLLLLLL
// L.LLLLLL.L
// L.LLLLL.LL
// Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

// If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
// If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
// Otherwise, the seat's state does not change.
// Floor (.) never changes; seats don't move, and nobody sits on the floor.

// After one round of these rules, every seat in the example layout becomes occupied:

// #.##.##.##
// #######.##
// #.#.#..#..
// ####.##.##
// #.##.##.##
// #.#####.##
// ..#.#.....
// ##########
// #.######.#
// #.#####.##
// After a second round, the seats with four or more occupied adjacent seats become empty again:

// #.LL.L#.##
// #LLLLLL.L#
// L.L.L..L..
// #LLL.LL.L#
// #.LL.LL.LL
// #.LLLL#.##
// ..L.L.....
// #LLLLLLLL#
// #.LLLLLL.L
// #.#LLLL.##
// This process continues for three more rounds:

// #.##.L#.##
// #L###LL.L#
// L.#.#..#..
// #L##.##.L#
// #.##.LL.LL
// #.###L#.##
// ..#.#.....
// #L######L#
// #.LL###L.L
// #.#L###.##
// #.#L.L#.##
// #LLL#LL.L#
// L.L.L..#..
// #LLL.##.L#
// #.LL.LL.LL
// #.LL#L#.##
// ..L.L.....
// #L#LLLL#L#
// #.LLLLLL.L
// #.#L#L#.##
// #.#L.L#.##
// #LLL#LL.L#
// L.#.L..#..
// #L##.##.L#
// #.#L.LL.LL
// #.#L#L#.##
// ..L.L.....
// #L#L##L#L#
// #.LLLLLL.L
// #.#L#L#.##
// At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

// // Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?
import fs from 'fs'

const data = fs.readFileSync('day11.txt')
const testData = fs.readFileSync('day11_test.txt')

const seatMap = data
  .toString()
  .split('\n')
  .map((row) => row.split(''))

const testSeatMap = testData
  .toString()
  .split('\n')
  .map((row) => row.split(''))

console.log(seatMap)
console.table(testSeatMap)

const isInMap = (x, y, map) => {
  if (x < 0 || x >= map.length || y < 0 || y >= map[0].length) {
    return false
  }
  return true
}

const checkSeat = (seatMap, x, y) => {
  const edges = [
    [0, 1],
    [0, -1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1],
  ]
  let adjacent = 0
  edges.forEach((edge) => {
    let [xi, yi] = edge
    xi += x
    yi += y
    if (isInMap(xi, yi, seatMap)) {
      if (seatMap[xi][yi] === '#') {
        adjacent++
      }
    }
  })

  if (adjacent === 0) {
    return 0
  } else if (adjacent < 4) {
    return 1
  } else {
    return 2
  }
}

const checkMap = (seatMap) => {
  const newMap = []

  seatMap.forEach((row, x) => {
    const newRow = []
    newMap.push(newRow)
    row.forEach((seat, y) => {
      let newSeat = seat
      if (seat === '.') {
        newSeat = '.'
      } else {
        const res = checkSeat(seatMap, x, y)

        if (seat === 'L' && res === 0) {
          newSeat = '#'
        }

        if (seat === '#' && res === 2) {
          newSeat = 'L'
        }
      }
      newRow.push(newSeat)
    })
  })

  return newMap
}

const compareMaps = (map1, map2) => {
  let res = true
  map1.forEach((row, x) => {
    row.forEach((seat, y) => {
      if (seat !== map2[x][y]) {
        res = false
      }
    })
  })
  return res
}

const countSeats = (seatMap) => {
  let count = 0
  seatMap.forEach((row) => {
    row.forEach((seat) => {
      if (seat === '#') {
        count++
      }
    })
  })
  return count
}

const checkSeatMap = (seatMap) => {
  let map = seatMap
  let i = 0
  while (true) {
    i++
    console.log(i)
    let newMap = checkMap(map)
    if (compareMaps(newMap, map)) {
      console.table(map)
      console.log(countSeats(map))
      return
    }
    map = newMap
  }
}

checkSeatMap(seatMap)
