// --- Day 5: Binary Boarding ---
// You board your plane only to discover a new problem: you dropped your boarding pass! You aren't sure which seat is yours, and all of the flight attendants are busy with the flood of people that suddenly made it through passport control.

// You write a quick program to use your phone's camera to scan all of the nearby boarding passes (your puzzle input); perhaps you can find your seat through process of elimination.

// Instead of zones or groups, this airline uses binary space partitioning to seat people. A seat might be specified like FBFBBFFRLR, where F means "front", B means "back", L means "left", and R means "right".

// The first 7 characters will either be F or B; these specify exactly one of the 128 rows on the plane (numbered 0 through 127). Each letter tells you which half of a region the given seat is in. Start with the whole list of rows; the first letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127). The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.

// For example, consider just the first seven characters of FBFBBFFRLR:

// Start by considering the whole range, rows 0 through 127.
// F means to take the lower half, keeping rows 0 through 63.
// B means to take the upper half, keeping rows 32 through 63.
// F means to take the lower half, keeping rows 32 through 47.
// B means to take the upper half, keeping rows 40 through 47.
// B keeps rows 44 through 47.
// F keeps rows 44 through 45.
// The final F keeps the lower of the two, row 44.
// The last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7). The same process as above proceeds again, this time with only three steps. L means to keep the lower half, while R means to keep the upper half.

// For example, consider just the last 3 characters of FBFBBFFRLR:

// Start by considering the whole range, columns 0 through 7.
// R means to take the upper half, keeping columns 4 through 7.
// L means to take the lower half, keeping columns 4 through 5.
// The final R keeps the upper of the two, column 5.
// So, decoding FBFBBFFRLR reveals that it is the seat at row 44, column 5.

// Every seat also has a unique seat ID: multiply the row by 8, then add the column. In this example, the seat has ID 44 * 8 + 5 = 357.

// Here are some other boarding passes:

// BFFFBBFRRR: row 70, column 7, seat ID 567.
// FFFBBBFRRR: row 14, column 7, seat ID 119.
// BBFFBBFRLL: row 102, column 4, seat ID 820.
// As a sanity check, look through your list of boarding passes. What is the highest seat ID on a boarding pass?

import fs from 'fs'

const data = fs.readFileSync('day5.txt')
const seats = data.toString().split('\n')

const getIndex = (id, size) => {
  let rows = [...Array(size).keys()]
  const data = id
  while (data.length !== 0) {
    if (data[0] === 'F' || data[0] === 'L') {
      rows = rows.slice(0, rows.length / 2)
    } else {
      rows = rows.slice(rows.length / 2, rows.length)
    }
    data.shift()
  }
  return rows[0]
}

const getRowCol = (id) => {
  const row = getIndex(id.slice(0, 7).split(''), 128)
  const column = getIndex(id.slice(7, 10).split(''), 8)
  return [row, column]
}

const getID = (id) => {
  const [row, column] = getRowCol(id)
  // console.log([row, column])
  return column + row * 8
}

const getMaxId = (seats) => {
  let max = 0
  seats.forEach((seat) => {
    const seatId = getID(seat)
    if (seatId > max) {
      max = seatId
    }
  })
  return max
}

const getMissingId = (seats) => {
  const seatMap = []
  for (let i = 0; i < 128; i++) {
    seatMap.push([...Array(8).keys()])
  }
  let allSeatIds = []
  seatMap.forEach((row, i) => {
    row.forEach((column, y) => {
      allSeatIds.push(i * 8 + y)
    })
  })
  // allSeatIds.pop()
  allSeatIds = allSeatIds.slice(7)
  allSeatIds = allSeatIds.slice(0, -7)
  const seatIds = []
  seats.forEach((seat) => {
    const seatId = getID(seat)
    seatIds.push(seatId)
  })
  let mySeat = 0
  console.log(
    seatIds
      .sort((a, b) => a - b)
      .filter((seat, i, array) => {
        if (seat != array[i + 1] - 1) {
          return seat
        }
      })
  )
  // console.table(seatIds.sort((a, b) => a - b))
  // console.log(allSeatIds)
  // allSeatIds.forEach((id) => {
  //   if (!seatIds.includes(id)) {
  //     mySeat = id
  //     console.log(id)
  //   }
  // })
  return mySeat
}

const id = 'BBFFBBFRLL'

console.log(getMissingId(seats))
// console.log(getID(id))
