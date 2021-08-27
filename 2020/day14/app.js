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

const maskBinary2 = (num, mask) => {
  return mask
    .split('')
    .map((n, i) => (n === 'X' ? n : n === '1' ? '1' : num[i]))
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

const getAddresses = (code) => {
  let addresses = []
  addresses.push(code.split(''))
  for (let i = 0; i < 36; i++) {
    const newAddresses = []
    addresses.forEach((address) => {
      if (address[i] === 'X') {
        let newAdd = address.join('').split('')
        newAdd[i] = '1'
        address[i] = '0'
        newAddresses.push(newAdd)
      }
    })
    addresses = addresses.concat(newAddresses)
  }
  return addresses.map((a) => binaryToDec(a.join('')).toString())
}
const buildMemory2 = (data) => {
  const memory = {}
  let mask = ''
  data.forEach((d) => {
    const [action, value] = d
    if (action === 'mask') {
      mask = value
    } else {
      const addressCode = maskBinary2(to36Bit(getMemIdx(action)), mask)
      const addressArr = getAddresses(addressCode)
      addressArr.forEach((a) => {
        memory[a] = +value
      })
    }
  })
  console.log(memory)
  const mem = Object.values(memory)
  console.log(mem.reduce((acc, idx) => acc + idx, 0))
}

// console.log(getAddresses('000000000000000000000000000000X1101X'))
buildMemory2(testData)
buildMemory2(data)
