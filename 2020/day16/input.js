import fs from 'fs'

const data = fs
  .readFileSync('data.txt', 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((d) => d.split(','))

const rules = fs
  .readFileSync('rules.txt', 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((rule) => rule.split(':'))

const ticketRules = new Map()

rules.forEach((r) => {
  ticketRules.set(
    r[0].replace(' ', ''),
    r[1]
      .trim()
      .split(' or ')
      .map((range) => range.split('-'))
  )
})

const testRules = fs
  .readFileSync('test_rules.txt', 'utf8')
  .toString()
  .trim()
  .split('\n')
  .map((rule) => rule.split(':'))

const testTicketRules = new Map()

testRules.forEach((r) => {
  testTicketRules.set(
    r[0].replace(' ', ''),
    r[1]
      .trim()
      .split(' or ')
      .map((range) => range.split('-'))
  )
})

export { data, ticketRules, testTicketRules }
