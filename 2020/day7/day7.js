// --- Day 7: Handy Haversacks ---
// You land at the regional airport in time for your next flight. In fact, it looks like you'll even have time to grab some food: all flights are currently delayed due to issues in luggage processing.

// Due to recent aviation regulations, many rules (your puzzle input) are being enforced about bags and their contents; bags must be color-coded and must contain specific quantities of other color-coded bags. Apparently, nobody responsible for these regulations considered how long they would take to enforce!

// For example, consider the following rules:

// light red bags contain 1 bright white bag, 2 muted yellow bags.
// dark orange bags contain 3 bright white bags, 4 muted yellow bags.
// bright white bags contain 1 shiny gold bag.
// muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
// shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
// dark olive bags contain 3 faded blue bags, 4 dotted black bags.
// vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
// faded blue bags contain no other bags.
// dotted black bags contain no other bags.
// These rules specify the required contents for 9 bag types. In this example, every faded blue bag is empty, every vibrant plum bag contains 11 bags (5 faded blue and 6 dotted black), and so on.

// You have a shiny gold bag. If you wanted to carry it in at least one other bag, how many different bag colors would be valid for the outermost bag? (In other words: how many colors can, eventually, contain at least one shiny gold bag?)

// In the above rules, the following options would be available to you:

// A bright white bag, which can hold your shiny gold bag directly.
// A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
// A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
// A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
// So, in this example, the number of bag colors that can eventually contain at least one shiny gold bag is 4.

// How many bag colors can eventually contain at least one shiny gold bag? (The list of rules is quite long; make sure you get all of it.)

import fs from 'fs'

const data = fs.readFileSync('day7.txt')

const rules = data
  .toString()
  .split('\n')
  .map((rule) => {
    let rulePairs = [rule.split(' ').slice(0, 2).join(' ')]
    rulePairs.push(
      rule
        .split(' ')
        .slice(4, -1)
        .filter((color) => !/bags/.test(color) && !/bag/.test(color))
        .map((rule, idx, array) =>
          idx % 3 === 0 ? [rule, array[idx + 1] + ' ' + array[idx + 2]] : ''
        )
        .filter((color) => color !== '')
    )
    return rulePairs
  })

const findGoldenBags = (rules) => {
  let numBags = 0

  for (const [ruleKey, ruleValue] of rules) {
    numBags += dfs(ruleKey, rules)
    console.log(ruleKey)
  }
  return numBags
}

const dfs = (rule, rules, visited = new Set()) => {
  const goldenBag = 'shiny gold'
  let isGolden = 0
  visited.add(rule)

  if (!rules.get(rule)) {
    return 0
  }

  const colors = rules.get(rule)

  for (const color of colors) {
    if (color === goldenBag) {
      return 1
    }
    if (!visited.has(color)) {
      isGolden += dfs(color, rules, visited)
    }
  }
  return isGolden >= 1 ? 1 : 0
}

const rulesMap = new Map([...rules])

const dfsGolden = (rules, bag) => {
  let bagCount = 0
  const bags = rules.get(bag)
  for (const bag of bags) {
    if (bag[0] !== 'no') {
      console.log(bagCount)
      bagCount += +bag[0]
      console.log(bag)
      console.log(bagCount)
      bagCount += +bag[0] * dfsGolden(rules, bag[1])
    }
  }
  return bagCount
}

const howManyGoldBags = (rules) => {
  return dfsGolden(rules, 'shiny gold')
}

console.log(rulesMap)
console.log(howManyGoldBags(rulesMap))
// const testMap = new Map()
// testMap.set('a', ['b', 'c'])
// testMap.set('b', ['d', 'c'])
// testMap.set('c', ['d', 'shiny gold'])
// testMap.set('d', [])
// testMap.set('shiny gold', [])

// console.table(rulesMap)
// console.log(findGoldenBags(rulesMap))
// console.table(testMap)
// console.log(findGoldenBags(testMap))
// -------------------------------------------------
// --- Part Two ---
// It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!

// Consider again your shiny gold bag and the rules from the above example:

// faded blue bags contain 0 other bags.
// dotted black bags contain 0 other bags.
// vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
// dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.
// So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!

// Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!

// Here's another example:

// shiny gold bags contain 2 dark red bags.
// dark red bags contain 2 dark orange bags.
// dark orange bags contain 2 dark yellow bags.
// dark yellow bags contain 2 dark green bags.
// dark green bags contain 2 dark blue bags.
// dark blue bags contain 2 dark violet bags.
// dark violet bags contain no other bags.
// In this example, a single shiny gold bag must contain 126 other bags.

// How many individual bags are required inside your single shiny gold bag?
