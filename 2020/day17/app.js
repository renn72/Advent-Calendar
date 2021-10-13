import * as R from 'ramda'
import { data, testData } from './input.js'

const formGalaxy = (data, size) => {
  const dim = data.length
  const galaxy = new Map()

  for (let i = 0; i < data.length; i++) {
    data[i].unshift('.')
    data[i].push('.')
  }
  data.push(new Array(dim + 2).fill('.'))
  data.unshift(new Array(dim + 2).fill('.'))

  for (let i = -size; i <= size; i++) {
    const x = new Array(dim + 2).fill('.')
    const y = new Array(dim + 2).fill(x)
    if (i === 0) {
      galaxy.set(i, data)
    } else {
      galaxy.set(i, y)
    }
  }
  return galaxy
}

const isValid = (z, x, y, galaxy) => {
  if (!galaxy.get(z)) {
    return false
  }
  if (x < 0 || x > galaxy.get(z).length - 1) {
    return false
  }
  if (y < 0 || y > galaxy.get(z)[x].length - 1) {
    return false
  }
  return true
}

const checkCube = (z, x, y, galaxy) => {
  // console.log(z + ' ' + x + ' ' + y)
  let neighborCount = 0
  let isAlive = false
  for (let zi = -1; zi < 2; zi++) {
    for (let xi = -1; xi < 2; xi++) {
      for (let yi = -1; yi < 2; yi++) {
        let newZ = z + zi
        let newX = x + xi
        let newY = y + yi
        if (isValid(newZ, newX, newY, galaxy)) {
          // console.log('valid ' + newZ + ' ' + newX + ' ' + newY)
          if (galaxy.get(newZ)[newX][newY] === '#') {
            // console.log('active ' + newZ + ' ' + newX + ' ' + newY)
            if (zi === 0 && xi === 0 && yi === 0) {
              isAlive = true
              // console.log('alive')
            } else {
              neighborCount++
            }
          }
        }
      }
    }
  }
  if (neighborCount === 3) {
    return true
  } else {
    if (isAlive && neighborCount === 2) {
      return true
    }
  }

  return false
}

const checkGalaxy = (galaxy) => {
  const newGalaxy = new Map()
  for (const [zi, z] of galaxy) {
    const newZ = []
    newZ.push(new Array(galaxy.get(0)[0].length + 2).fill('.'))
    z.forEach((x, xi) => {
      const newX = []
      newX.push('.')
      x.forEach((y, yi) => {
        if (checkCube(zi, xi, yi, galaxy)) {
          // console.log(newZ)
          // console.log(newX)
          newX.push('#')
        } else {
          newX.push('.')
        }
      })

      newX.push('.')
      newZ.push(newX)
    })

    newZ.push(new Array(galaxy.get(0)[0].length + 2).fill('.'))
    newGalaxy.set(zi, newZ)
  }
  return newGalaxy
}

const incrementGalaxy = (galaxy, time) => {
  let newGalaxy = galaxy
  console.log(newGalaxy)
  for (let i = 0; i < time; i++) {
    newGalaxy = checkGalaxy(newGalaxy)
    console.log(newGalaxy)
  }
  return newGalaxy
}

const countGalaxy = (galaxy) => {
  let count = Array.from(galaxy).reduce((acc, idx) => {
    acc += idx[1].reduce((acc, idx) => {
      acc += idx.reduce((acc, idx) => {
        acc += idx === '#' ? 1 : 0
        return acc
      }, 0)
      return acc
    }, 0)
    return acc
  }, 0)
  console.log(count)
}

const galaxy = formGalaxy(data, 6)
const testGalaxy = formGalaxy(testData, 6)

countGalaxy(incrementGalaxy(testGalaxy, 6))
countGalaxy(incrementGalaxy(galaxy, 6))
// console.log(testData)
// console.log(testGalaxy)
