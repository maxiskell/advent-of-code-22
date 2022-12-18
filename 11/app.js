const fs = require("fs")
const { join } = require("path")
const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")
const entries = file.trim().split("\n\n")

function getMonkeysFromEntries(entries) {
  const monkeys = []

  for (let entry of entries) {
    const parsed = entry.split("\n").map((l) => l.trim())

    monkeys.push({
      items: parsed[1].match(/[0-9]+/g).map(Number),
      operation: parsed[2].match(/old.+/).pop(),
      test: Number(
        parsed[3]
          .match(/(?<=by).+/)
          .pop()
          .trim()
      ),
      ifTestTrue: Number(parsed[4].match(/[0-9]+/).pop()),
      ifTestFalse: Number(parsed[5].match(/[0-9]+/).pop()),
      itemsInspected: 0,
    })
  }

  return monkeys
}

// Part 1.
{
  let worryLevel = 0
  const monkeys = getMonkeysFromEntries(entries)

  for (let round = 0; round < 20; round++) {
    for (let monkey of monkeys) {
      const { items, operation, test, ifTestTrue, ifTestFalse } = monkey

      monkey.itemsInspected += items.length

      while (items.length > 0) {
        worryLevel = items.shift()
        op = operation.replaceAll("old", worryLevel)
        worryLevel = Math.floor(eval(op) / 3)

        const newIndex = worryLevel % test === 0 ? ifTestTrue : ifTestFalse

        monkeys[newIndex].items.push(worryLevel)
      }
    }
  }

  const monkeyBusinessLevel = monkeys
    .map(({ itemsInspected }) => itemsInspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, curr) => acc * curr, 1)

  console.log(`Monkey business level 1: ${monkeyBusinessLevel}`)
}

// Part 2.
{
  let worryLevel = 0
  const monkeys = getMonkeysFromEntries(entries)
  const divider = monkeys
    .map(({ test }) => test)
    .reduce((acc, curr) => acc * curr, 1)

  for (let round = 0; round < 10_000; round++) {
    for (let monkey of monkeys) {
      const { items, operation, test, ifTestTrue, ifTestFalse } = monkey

      monkey.itemsInspected += items.length

      while (items.length > 0) {
        worryLevel = items.shift()
        op = operation.replaceAll("old", worryLevel)
        worryLevel = eval(op)
        worryLevel = worryLevel % divider

        const newIndex = worryLevel % test === 0 ? ifTestTrue : ifTestFalse

        monkeys[newIndex].items.push(worryLevel)
      }
    }
  }

  const monkeyBusinessLevel = monkeys
    .map(({ itemsInspected }) => itemsInspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, curr) => acc * curr, 1)

  console.log(`Monkey business level 2: ${monkeyBusinessLevel}`)
}
