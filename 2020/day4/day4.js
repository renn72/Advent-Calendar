// You arrive at the airport only to realize that you grabbed your North Pole Credentials instead of your passport. While these documents are extremely similar, North Pole Credentials aren't issued by a country and therefore aren't actually valid documentation for travel in most of the world.

// It seems like you're not the only one having problems, though; a very long line has formed for the automatic passport scanners, and the delay could upset your travel itinerary.

// Due to some questionable network security, you realize you might be able to solve both of these problems at the same time.

// The automatic passport scanners are slow because they're having trouble detecting which passports have all required fields. The expected fields are as follows:

// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)
// cid (Country ID)
// Passport data is validated in batch files (your puzzle input). Each passport is represented as a sequence of key:value pairs separated by spaces or newlines. Passports are separated by blank lines.

// Here is an example batch file containing four passports:

// ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
// byr:1937 iyr:2017 cid:147 hgt:183cm

// iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
// hcl:#cfa07d byr:1929

// hcl:#ae17e1 iyr:2013
// eyr:2024
// ecl:brn pid:760753108 byr:1931
// hgt:179cm

// hcl:#cfa07d eyr:2025 pid:166559648
// iyr:2011 ecl:brn hgt:59in
// The first passport is valid - all eight fields are present. The second passport is invalid - it is missing hgt (the Height field).

// The third passport is interesting; the only missing field is cid, so it looks like data from North Pole Credentials, not a passport at all! Surely, nobody would mind if you made the system temporarily ignore missing cid fields. Treat this "passport" as valid.

// The fourth passport is missing two fields, cid and byr. Missing cid is fine, but missing any other field is not, so this passport is invalid.

// According to the above rules, your improved system would report 2 valid passports.

// Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?

import fs from 'fs'
import { isContext } from 'vm'

let data = fs.readFileSync('day4.txt')

const validatePassport = (data) => {
  const requiredAttributes = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  return data
    .toString()
    .split('\n\n')
    .map((passport) =>
      passport
        .replace(/\n/g, ' ')
        .split(' ')
        .map((attribute) => attribute.split(':'))
    )
    .map((passport) => {
      for (const att of requiredAttributes) {
        if (!passport.map((pass) => pass[0]).includes(att)) {
          return 0
        }
      }
      return passport
    })
    .filter((passport) => passport !== 0)
}

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

const validatePID = (data) => {
  if (data.match(/[0-9]{9}\b/)) {
    return 0
  }
  return -1
}

const validateECL = (ecl) => {
  if (ecl.match(/(amb|blu|brn|gry|grn|hzl|oth)\b/)) {
    return 0
  }
  return -1
}

const validateHCL = (hcl) => {
  if (hcl.match(/#[a-f0-9]{6}/)) {
    return 0
  }
  return -1
}

const validateHGT = (hgt) => {
  if (hgt.match(/((59|6[0-9]|7[0-6])in|(1[5-8][0-9]|19[0-3])cm\b)/)) {
    return 0
  }
  return -1
}

const validateEYR = (eyr) => {
  if (eyr.match(/(202[0-9]|2030)\b/)) {
    return 0
  }
  return -1
}

const validateIYR = (iyr) => {
  if (iyr.match(/(201[0-9]|2020)/)) {
    return 0
  }
  return -1
}

const validateBYR = (byr) => {
  console.log(byr)
  if (byr.match(/(19[2-9][0-9]|200[0-2])/)) {
    return 0
  }
  return -1
}

const validatePassportData = (data) => {
  return validatePassport(data).map((passport) => {
    let isValid = 1
    passport.forEach((attribute) => {
      switch (attribute[0]) {
        case 'byr':
          isValid += validateBYR(attribute[1])
          break
        case 'iyr':
          isValid += validateIYR(attribute[1])
          break
        case 'eyr':
          isValid += validateEYR(attribute[1])
          break
        case 'hgt':
          isValid += validateHGT(attribute[1])
          break
        case 'hcl':
          isValid += validateHCL(attribute[1])
          break
        case 'ecl':
          isValid += validateECL(attribute[1])
          break
        case 'pid':
          isValid += validatePID(attribute[1])
          break
        default:
      }
    })

    if (isValid < 0) {
      isValid = 0
    }

    return isValid
  })
}

const validatePassportAtt = (data, att) => {
  const requiredAttributes = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

  return data
    .toString()
    .split('\n\n')
    .map((passport) =>
      passport
        .replace(/\n/g, ' ')
        .split(' ')
        .map((attribute) => attribute.split(':'))
    )
    .slice(0, 25)
    .map((passport) => {
      for (const att of requiredAttributes) {
        if (!passport.map((pass) => pass[0]).includes(att)) {
          return 0
        }
      }
      return passport
    })
    .filter((passport) => passport !== 0)
    .map((passport) => passport.filter((i) => i[0] == att))
}

console.table(validatePassportAtt(data, 'pid'))
console.table(validatePassportData(data).reduce((acc, idx) => acc + idx, 0))
