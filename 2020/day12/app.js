import { data, testData } from './input.js'

console.log(data)
console.log(testData)

class Ship {
  directionPairs = {
    N: [1, 0],
    E: [0, 1],
    S: [-1, 0],
    W: [0, -1],
  }
  direction = 'E'
  directions = ['N', 'E', 'S', 'W']
  loc = [0, 0]

  movement(instructions) {
    const [action, dist] = instructions
    if (action === 'F') {
      this.move(this.direction, dist)
    } else if (action === 'R' || action === 'L') {
      this.rotate(action, dist)
    } else {
      this.move(action, dist)
    }
  }

  move(dir, dist) {
    this.loc = this.loc.map(
      (coord, i) => coord + this.directionPairs[dir][i] * dist
    )
    console.log(this.loc)
  }

  rotate(action, dist) {
    const amount = (dist / 90) * (action === 'R' ? 1 : -1)
    let newDir = this.directions.indexOf(this.direction) + amount
    if (newDir > 3) {
      newDir -= 4
    } else if (newDir < 0) {
      newDir += 4
    }
    this.direction = this.directions[newDir]
    console.log(this.direction)
  }
}

const cruiseShip = new Ship()

data.forEach((d) => {
  cruiseShip.movement(d)
})

console.log(cruiseShip.loc)
console.log(1068 + 1811)
