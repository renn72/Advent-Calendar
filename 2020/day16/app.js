import * as R from 'ramda'
import { data, ticketRules, testTicketRules } from './input.js'

const myTicket = [
  157, 59, 163, 149, 83, 131, 107, 89, 109, 113, 151, 53, 127, 97, 79, 103, 101,
  173, 167, 61,
]

const test = [
  [3, 9, 18],
  [15, 1, 5],
  [5, 14, 9],
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
  const invalidTickets = []
  tickets.forEach((ticket, i) => {
    ticket.forEach((field) => {
      if (!isNumInRules(field)) {
        invalidFields.push(field)
        invalidTickets.push(i)
      }
    })
  })

  console.log(invalidFields)
  console.log(invalidFields.length)
  console.log(invalidFields.reduce((acc, idx) => acc + +idx, 0))
  console.log(tickets.filter((t, i) => !invalidTickets.includes(i)))
}

const validateTicket = (ticket) => {
  let isValid = true
  ticket.forEach((field) => {
    if (!isNumInRules(field)) {
      isValid = false
    }
  })
  return isValid
}

const validateTickets = (tickets) => {
  const validTickets = []
  tickets.forEach((ticket) => {
    if (validateTicket(ticket)) {
      validTickets.push(ticket)
    }
  })
  return validTickets
}

const findFieldIndex = (tickets, ruleRanges) => {
  const [lowRange, highRange] = ruleRanges
  const ticketSize = tickets[0].length

  for (let idx = ticketSize; idx > 0; idx--) {
    let isValid = true

    tickets.forEach((ticket) => {
      const field = +ticket[idx]

      if (field < +lowRange[0]) {
        isValid = false
      } else if (field > +lowRange[1] && field < +highRange[0]) {
        isValid = false
      } else if (field > +highRange[1]) {
        isValid = false
      }
    })

    if (isValid) {
      return idx
    }
  }
}

const findTicketFields = (tickets, rules) => {
  tickets = validateTickets(tickets)
  let a = 0
  // tickets.forEach((ticket) =>
  //   +ticket[1] > 940 ? console.log(+ticket[1]) : (a = 1)
  // )

  const ticketMap = []

  for (const [name, ranges] of rules) {
    const fieldIndex = findFieldIndex(tickets, ranges)
    console.log(name, ranges, fieldIndex)

    ticketMap.push([name, fieldIndex])
  }
  console.log(ticketMap)
}
