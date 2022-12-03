const fs = require("fs")
const { join } = require("path")

const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")
const input = file.split("\n").slice(0, -1)

const lcLetters = Array.from(Array(26))
  .map((_, i) => i + 97)
  .map((x) => String.fromCharCode(x))
const ucLetters = Array.from(Array(26))
  .map((_, i) => i + 65)
  .map((x) => String.fromCharCode(x))
const letters = [...lcLetters, ...ucLetters]

// Part 1.
{
  const total = input.reduce((acc, line) => {
    const firstHalf = line.substring(0, line.length / 2)
    const secondHalf = line.substring(line.length / 2, line.length)

    const common = [
      ...new Set(
        secondHalf.split("").filter((char) => firstHalf.includes(char))
      ),
    ][0]

    return acc + letters.indexOf(common) + 1
  }, 0)

  console.log("Sum of individual priorities:", total)
}

// Part 2.
{
  let group = []
  let total = 0

  for (let line of input) {
    group.push(line)

    if (group.length === 3) {
      const common = [
        ...new Set(
          group[0]
            .split("")
            .filter(
              (char) => group[1].includes(char) && group[2].includes(char)
            )
        ),
      ][0]

      total += letters.indexOf(common) + 1
      group = []
    }
  }

  console.log("Sum of group priorities:", total)
}
