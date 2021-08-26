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

class Ship2 {
  directionPairs = {
    N: [1, 0],
    E: [0, 1],
    S: [-1, 0],
    W: [0, -1],
  }
  direction = 'E'
  directions = ['N', 'E', 'S', 'W']
  loc = [0, 0]
  waypoint = [1, 10]

  movement(instructions) {
    const [action, dist] = instructions
    if (action === 'F') {
      this.move(dist)
    } else if (action === 'R' || action === 'L') {
      this.rotateWaypoint(action, dist)
    } else {
      this.moveWaypoint(action, dist)
    }
  }

  moveWaypoint(dir, dist) {
    this.waypoint = this.waypoint.map(
      (coord, i) => coord + this.directionPairs[dir][i] * dist
    )
  }

  move(dist) {
    this.loc = this.loc.map((coord, i) => coord + this.waypoint[i] * dist)
    console.log(this.loc)
  }

  rotateWaypoint(action, dist) {
    const x = this.waypoint[0]
    const y = this.waypoint[1]
    const amount = (dist / 90) * (action === 'R' ? 1 : -1)
    switch (amount) {
      case 1:
        this.waypoint = [-y, x]
        break
      case 2:
        this.waypoint = [-x, -y]
        break
      case 3:
        this.waypoint = [y, -x]
        break
      case -1:
        this.waypoint = [y, -x]
        break
      case -2:
        this.waypoint = [-x, -y]
        break
      case -3:
        this.waypoint = [-y, x]
    }
  }
}

const cruiseShip = new Ship2()

// cruiseShip.movement(['F', 10])
// cruiseShip.movement(['N', 3])
// console.log(cruiseShip.waypoint)
data.forEach((d) => {
  cruiseShip.movement(d)
})

console.log(cruiseShip.loc)
console.log(Math.abs(cruiseShip.loc[0]) + Math.abs(cruiseShip.loc[1]))
