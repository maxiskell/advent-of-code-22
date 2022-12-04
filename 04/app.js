const fs = require("fs")
const { join } = require("path")

const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")
const input = file.split("\n").slice(0, -1)

// Part 1.
{
  const fullyContained = input.reduce((total, segments) => {
    const [first, second] = segments
      .split(",")
      .map((segment) => segment.split("-"))
      .map((xs) => xs.map((s) => parseInt(s, 10)))

    if (
      (first[0] <= second[0] && first[1] >= second[1]) ||
      (second[0] <= first[0] && second[1] >= first[1])
    ) {
      return total + 1
    }

    return total
  }, 0)

  console.log("# Contained assignments:", fullyContained)
}

// Part 2.
{
  const overlapping = input.reduce((total, segments) => {
    const [first, second] = segments
      .split(",")
      .map((segment) => segment.split("-"))
      .map((xs) => xs.map((s) => parseInt(s, 10)))

    if (
      (first[0] >= second[0] && first[0] <= second[1]) ||
      (second[0] >= first[0] && second[0] <= first[1])
    ) {
      return total + 1
    }

    return total
  }, 0)

  console.log("# Overlapping assignments:", overlapping)
}
