import fs from 'fs'

let data = fs.readFileSync('day4.txt')

data = data
  .toString()
  .split('\n\n')
  .slice(0, 10)
  .map((line) => line.replace(/\n/g, ' ').split(' '))

console.table(data)
