import fs from 'fs'

const data = fs
  .readFileSync('data.txt', 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((row) => [row[0], +row.slice(1)])

const testData = fs
  .readFileSync('test_data.txt', 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((row) => [row[0], +row.slice(1)])

export { data, testData }
