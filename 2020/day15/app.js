import { data, testData } from './input.js'

// console.log(data)
// console.log(testData)

const removeValue = (arr, idx) => {
  return arr.slice(0, idx).concat(arr.slice(idx + 1))
}

const memoryGame = (data, turn = 30000000) => {
  const arr = Array(turn)

  for (let i = 0; i < data.length - 1; i++) {
    let num = data[i]
    arr[num] = i + 1
  }

  let lastNum = data[data.length - 1]

  for (let round = data.length; round < turn; round++) {
    if (!arr[lastNum]) {
      arr[lastNum] = round

      lastNum = 0
    } else {
      let lastRound = arr[lastNum]

      arr[lastNum] = round
      lastNum = round - lastRound
    }
  }
  console.log(lastNum)
}

memoryGame([0, 3, 6])
memoryGame([15, 5, 1, 4, 7, 0])
