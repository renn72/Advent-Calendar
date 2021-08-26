import { data, testData } from './input.js'

console.log(data)
console.log(testData)

const findBus = (timetable) => {
  const [time, _buses] = timetable
  const buses = _buses.filter((bus) => bus != 'x')

  return buses
    .map((bus) => [bus, Math.ceil(time / bus) * bus - time])
    .reduce((bestTime, idx, i) => {
      if (i === 0) {
        return idx
      } else {
        if (bestTime[1] > idx[1]) {
          return idx
        }
      }
      return bestTime
    }, [])
    .map((res) => [...res, +res[0] * res[1]])
}

console.log(findBus(testData))
