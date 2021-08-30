import { data, ticketRules } from './input.js'

const myTicket = [
  157, 59, 163, 149, 83, 131, 107, 89, 109, 113, 151, 53, 127, 97, 79, 103, 101,
  173, 167, 61,
]

const test = [
  [7, 3, 47],
  [40, 4, 50],
  [55, 2, 20],
  [38, 6, 12],
]

const isNumInRules = (num) => {
  let isValid = false
  for (const [name, rule] of ticketRules) {
    if (num >= +rule[0][0] && num <= +rule[0][1]) {
      isValid = true
    } else if (num >= +rule[1][0] && num <= +rule[1][1]) {
      isValid = true
    }
  }
  return isValid
}

const checkTickets = (tickets) => {
  const invalidFields = []
  tickets.forEach((ticket) => {
    ticket.forEach((field) => {
      if (!isNumInRules(field)) {
        invalidFields.push(field)
      }
    })
  })
  console.log(invalidFields)
  console.log(invalidFields.length)
  console.log(invalidFields.reduce((acc, idx) => acc + +idx, 0))
}
console.log(data)
console.log(ticketRules)
checkTickets(data)
