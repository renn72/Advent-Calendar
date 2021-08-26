import fs from 'fs'

const data = fs
  .readFileSync('data.txt', 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.split(','))

const testData = fs
  .readFileSync('test_data.txt', 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((row) => row.split(','))

export { data, testData }
