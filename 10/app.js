const fs = require("fs")
const { join } = require("path")
const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")
const input = file.trim().split("\n")

// Part 1.
{
  let x = 1
  let cycle = 1
  let keyCycle = 20

  let pointer = 0
  let addValue = 0
  let isAdding = false

  let totalStrength = 0

  while (pointer < input.length) {
    if (cycle === keyCycle) {
      totalStrength += cycle * x
      keyCycle += 40
    }

    cycle += 1

    if (isAdding) {
      x += addValue
      addValue = 0
      pointer += 1
      isAdding = false
    } else {
      const [operation, value] = input[pointer].split(" ")

      if (operation === "noop") {
        pointer += 1
      } else if (operation === "addx") {
        isAdding = true
        addValue = Number(value)
      }
    }
  }

  console.log(`Sum of the signal strenghts ${totalStrength}`)
}

// Part 2.
{
  function getSpriteLine(center) {
    let line = new Array(40).fill(".")

    if (center > 0) {
      for (let i = -1; i <= 1; i++) line[center + i] = "#"
    } else if (center === 0) {
      line[0] = "#"
      line[1] = "#"
    } else if (center === -1) {
      line[0] = "#"
    }

    return line
  }

  let x = 1
  let cycle = 1
  let pointer = 0
  let currentVal = 0
  let isAdding = false

  const crt = []
  let row = []
  let rowPosition = 0

  let spriteLine = getSpriteLine(x)

  while (pointer < input.length) {
    row[rowPosition] = spriteLine[rowPosition]
    rowPosition += 1

    if (cycle % 40 === 0) {
      crt.push(row)
      row = []
      rowPosition = 0
    }

    cycle += 1

    if (isAdding) {
      x += currentVal
      spriteLine = getSpriteLine(x)
      pointer += 1
      isAdding = false
    } else {
      const [operation, val] = input[pointer].split(" ")

      if (operation === "noop") {
        pointer += 1
      } else if (operation === "addx") {
        isAdding = true
        currentVal = Number(val)
      }
    }
  }

  console.log(crt.map((row) => row.join("")).join("\n"))
}
