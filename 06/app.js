const fs = require("fs")
const { join } = require("path")

const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")
const input = file.trim()

// Part 1.
{
  let start = 0
  let end = 3
  let found = false

  while (!found && end < input.length) {
    let seen = new Set()

    for (let i = start; i <= end; i++) seen.add(input[i])

    found = seen.size === 4

    end += 1
    start += 1
  }

  console.log("First start-of-packet marker after character", end)
}

// Part 2.
{
  let start = 0
  let end = 13
  let found = false

  while (!found && end < input.length) {
    let seen = new Set()

    for (let i = start; i <= end; i++) seen.add(input[i])

    found = seen.size === 14

    end += 1
    start += 1
  }

  console.log("First start-of-message marker after character", end)
}
