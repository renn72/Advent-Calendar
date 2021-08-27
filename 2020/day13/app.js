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
        return [...idx, +idx[0] * idx[1]]
      } else {
        if (bestTime[1] > idx[1]) {
          return [...idx, +idx[0] * idx[1]]
        }
      }
      return bestTime
    }, [])
}

const LCM = (pair1, pair2, interval, t) => {
  const [t1, id1] = pair1
  const [t2, id2] = pair2

  let time = t + interval

  while (true) {
    // console.log(time)
    if ((time + t1) % id1 === 0 && (time + t2) % id2 === 0) {
      console.log('first match ' + time)
      let mark = time
      while (true) {
        time += interval
        if ((time + t1) % id1 === 0 && (time + t2) % id2 === 0) {
          return [mark, time - mark]
        }
      }
    }
    time += interval
  }
}

const timeTable = (times) => {
  times = times
    .map((time, i) => [i, time])
    .filter((time) => time[1] !== 'x')
    .map((time) => [time[0], +time[1]])

  let index = 0
  let interval = 1
  let time = 0
  let i = 0
  while (true && index < times.length - 1) {
    i++

    let res = LCM(times[index], times[index + 1], interval, time)
    time = res[0]
    interval = res[1]
    console.log(`time:${time} Int:${interval} res:${time + interval}`)
    index++
  }

  return times
}

console.log(timeTable([17, 'x', 13, 19]))
console.log(timeTable([67, 7, 59, 61]))
console.log(timeTable([67, 'x', 7, 59, 61]))
console.log(timeTable([67, 7, 'x', 59, 61]))
console.log(timeTable([1789, 37, 47, 1889]))
console.log(timeTable(testData[1]))
console.log(timeTable(data[1]))
