import { data, testData } from './input.js'

console.log(data)
console.log(testData)

const to36Bit = (num) => {
  let binary = Number(num).toString(2)
  let extend = 36 - binary.length
  for (let i = 0; i < extend; i++) {
    binary = '0' + binary
  }
  return binary
}

const binaryToDec = (num) => {
  return num
    .split('')
    .reverse()
    .map((num, i) => (num === '0' ? 0 : Math.pow(2, i)))
    .reduce((acc, idx) => acc + idx, 0)
}

const maskBinary = (num, mask) => {
  return mask
    .split('')
    .map((n, i) => (n === 'X' ? num[i] : n))
    .join('')
}

const getMemIdx = (str) => {
  return str.match(/[0-9]/g).join('')
}

const buildMemory = (data) => {
  const memory = {}
  let mask = ''
  data.forEach((d) => {
    const [action, value] = d
    if (action === 'mask') {
      mask = value
    } else {
      memory[getMemIdx(action)] = maskBinary(to36Bit(value), mask)
    }
  })
  console.log(memory)
  const mem = Object.values(memory)

  console.log(
    mem.map((m) => +binaryToDec(m)).reduce((acc, idx) => acc + idx, 0)
  )
}

console.log(to36Bit(101))
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')
buildMemory(testData)
buildMemory(data)
