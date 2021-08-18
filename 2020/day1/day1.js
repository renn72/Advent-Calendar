// --- Day 1: Report Repair ---
// After saving Christmas five years in a row, you've decided to take a vacation at a nice resort on a tropical island. Surely, Christmas will go on without you.

// The tropical island has its own currency and is entirely cash-only. The gold coins used there have a little picture of a starfish; the locals just call them stars. None of the currency exchanges seem to have heard of them, but somehow, you'll need to find fifty of these coins by the time you arrive so you can pay the deposit on your room.

// To save your vacation, you need to get all fifty stars by December 25th.

// Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

// Before you leave, the Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.

// Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

// For example, suppose your expense report contained the following:

// 1721
// 979
// 366
// 299
// 675
// 1456
// In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.

// Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?

const entries = [
  1757, 1890, 1750, 1440, 1822, 1957, 2005, 1979, 1405, 2003, 1997, 1741, 1494,
  1780, 1774, 1813, 447, 1429, 1990, 1767, 1969, 1787, 1944, 1863, 1778, 2004,
  1991, 1754, 1748, 1756, 1977, 611, 1934, 1818, 1924, 528, 1753, 1867, 1865,
  1799, 1743, 1955, 1993, 1972, 1987, 1960, 1817, 1837, 1900, 1839, 1946, 1786,
  1857, 1840, 1985, 1850, 1801, 1926, 1523, 1886, 1492, 1737, 1909, 1766, 1986,
  1773, 1749, 1781, 1760, 1849, 1833, 1854, 1814, 1820, 2000, 1834, 1851, 1779,
  1825, 1885, 1882, 1912, 962, 1988, 302, 1965, 1751, 1764, 1844, 1949, 1984,
  1933, 958, 1746, 1999, 1914, 1989, 1879, 1954, 1827, 1816, 1918, 633, 1797,
  1811, 1936, 1961, 1937, 1829, 1788, 1772, 1505, 1905, 1304, 1404, 1868, 1978,
  1872, 2006, 1256, 1883, 1966, 1931, 1796, 1793, 714, 1904, 1841, 1824, 1962,
  1739, 1897, 1906, 1735, 1876, 873, 1959, 1963, 1917, 1804, 1789, 1782, 1848,
  1828, 1826, 1929, 1525, 1862, 1952, 1878, 1775, 1776, 1430, 1943, 1938, 1941,
  1594, 1928, 1856, 1903, 1871, 1836, 1847, 1956, 1915, 1870, 1875, 1892, 276,
  1896, 1945, 1821, 1947, 1898, 1802, 1853, 1895, 1790, 1819, 1980, 1832, 1673,
  1964, 1800, 1971, 1842, 2002, 1921, 1940, 1845, 1527, 1428, 1932, 1893, 1908,
  1889, 1974, 1981, 1791, 1975,
]

const findDoubleAddition = (entries) => {
  entries.forEach((entry1) => {
    entries.forEach((entry2) => {
      if (entry1 + entry2 === 2020) {
        console.log(entry1 * entry2)
      }
    })
  })
}

// The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

// Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

// In your expense report, what is the product of the three entries that sum to 2020?

const findTripleAddition = (entries) => {
  let result = 0
  entries.forEach((entry1) => {
    entries.forEach((entry2) => {
      entries.forEach((entry3) => {
        if (entry1 + entry2 + entry3 === 2020) {
          result = entry1 * entry2 * entry3
        }
      })
    })
  })
  return result
}

console.log(findTripleAddition(entries))
