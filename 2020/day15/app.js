import { data, testData } from './input.js'

// console.log(data)
// console.log(testData)

const removeValue = (arr, idx) => {
  return arr.slice(0, idx).concat(arr.slice(idx + 1))
}

const memoryGame = (data, turn = 10) => {
  for (let i = data.length - 1; i < turn; i++) {
    const lastNum = data[data.length - 1]
    let res = 0
    for (let y = data.length - 2; y >= 0; y--) {
      if (data[y] === lastNum) {
        res = data.length - 1 - y
        console.log('num ' + lastNum + ' index ' + y)

        // console.log('res ' + res)
        break
      }
    }
    data.push(res)
  }
  console.log(data[data.length - 1])
}

memoryGame([0, 3, 6])
// memoryGame([15, 5, 1, 4, 7, 0])
