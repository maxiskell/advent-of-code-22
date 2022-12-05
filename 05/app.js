const fs = require("fs")
const { join } = require("path")

const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")
const input = file.split("\n").slice(0, -1)

function getStacks(input) {
  const stacks = []

  let lineNr = 0

  while (!input[lineNr + 1].includes("move")) {
    const line = input[lineNr]

    let charCount = 0
    let slot = ""
    let stackNr = 0

    for (let c = 0; c < input[lineNr].length; c++) {
      slot += line[c]

      charCount += 1

      if (charCount === 4 || c === line.length - 1) {
        if (slot.trim().length) {
          stacks[stackNr] = [
            slot.trim().replace(/[\[\]]/g, ""),
            ...(stacks[stackNr] ?? []),
          ]
        }

        slot = ""
        charCount = 0
        stackNr += 1
      }
    }

    lineNr++
  }

  return [stacks, lineNr + 1]
}

function getOps(input, lineNr) {
  const ops = []

  for (let i = lineNr; i < input.length; i++) {
    ops.push(
      input[i]
        .replace("move ", "")
        .replace(" from ", "-")
        .replace(" to ", "-")
        .split("-")
        .map(Number)
    )
  }

  return ops
}

// Part 1.
{
  const [stacks, lineNr] = getStacks(input)
  const ops = getOps(input, lineNr)

  for (let [amount, from, to] of ops) {
    for (let i = amount; i > 0; i--) {
      stacks[to - 1].push(stacks[from - 1].pop())
    }
  }

  const topCrates = stacks.map((stack) => stack.pop()).join("")

  console.log("Top Crates with 9000:", topCrates)
}

// Part 2.
{
  const [stacks, lineNr] = getStacks(input)
  const ops = getOps(input, lineNr)

  for (let [amount, from, to] of ops) {
    let tmp = []
    for (let i = amount; i > 0; i--) {
      tmp.push(stacks[from - 1].pop())
    }
    stacks[to - 1].push(...tmp.reverse())
  }

  const topCrates = stacks.map((stack) => stack.pop()).join("")

  console.log("Top Crates with 9001:", topCrates)
}
