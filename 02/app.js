const fs = require("fs")
const { join } = require("path")

const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")
const input = file.split("\n").slice(0, -1)

const chosenScore = ["X", "Y", "Z"]

// Part 1.
{
  const rules = new Map([
    ["A", ["X", "Y", "Z"]],
    ["B", ["Y", "Z", "X"]],
    ["C", ["Z", "X", "Y"]],
  ])

  let score = 0

  for (let round of input) {
    const [elf, me] = round.split(" ")
    score += chosenScore.indexOf(me) + 1

    if (rules.get(elf)[0] === me) {
      score += 3
    } else if (rules.get(elf)[1] === me) {
      score += 6
    }
  }

  console.log("Total Score 1:", score)
}

// Part 2.
{
  const rules = new Map([
    ["A", { X: "Z", Y: "X", Z: "Y" }],
    ["B", { X: "X", Y: "Y", Z: "Z" }],
    ["C", { X: "Y", Y: "Z", Z: "X" }],
  ])

  let score = 0

  for (let round of input) {
    const [elf, outcome] = round.split(" ")
    const me = rules.get(elf)[outcome]

    score += chosenScore.indexOf(me) + 1

    if (outcome === "Y") {
      score += 3
    } else if (outcome === "Z") {
      score += 6
    }
  }

  console.log("Total Score 2:", score)
}
