import fs from 'fs'

const data = fs
  .readFileSync('data.txt', 'utf8')
  .toString()
  .trim()
  .split(',')
  .map((n) => +n)

const testData = fs
  .readFileSync('test_data.txt', 'utf8')
  .toString()
  .trim()
  .split(',')
  .map((n) => +n)

export { data, testData }
