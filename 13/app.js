const fs = require("fs")
const { join } = require("path")
const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")

const { isArray } = Array

function check(left, right, result) {
  if (!isArray(left) && !isArray(right)) {
    if (left < right) result.value = true
    if (left > right) result.value = false

    return
  } else if (isArray(left) && isArray(right)) {
    let p = 0

    while (true) {
      if (p > left.length - 1 && p <= right.length - 1) {
        result.value = true
        return
      } else if (p <= left.length - 1 && p > right.length - 1) {
        result.value = false
        return
      } else if (p > left.length - 1 && p > right.length - 1) {
        return
      }

      check(left[p], right[p], result)

      if (result.value !== undefined) return

      p++
    }
  } else {
    if (!isArray(left)) check([left], right, result)
    else if (!isArray(right)) check(left, [right], result)
  }
}

// Part 1.
{
  const indices = []

  const input = file.trim().split("\n\n")

  for (let i = 0; i < input.length; i++) {
    const [left, right] = input[i].split("\n").map((x) => JSON.parse(x))
    let result = {}

    check(left, right, result)

    if (result.value === true) indices.push(i + 1)
  }

  const sum = indices.reduce((acc, curr) => acc + curr, 0)

  console.log("Sum of indices in right order:", sum)
}

// Part 2.
{
  const dividerPackets = [[[2]], [[6]]]

  const sorted = file
    .trim()
    .replace(/\n\n/g, "\n")
    .split("\n")
    .map((line) => JSON.parse(line))
    .concat(dividerPackets)
    .sort((a, b) => {
      let result = {}
      check(a, b, result)
      return result.value ? -1 : 1
    })
    .map((packet) => JSON.stringify(packet))

  const decoderIndices = dividerPackets.map(
    (divider) => sorted.indexOf(JSON.stringify(divider)) + 1
  )
  const decoderKey = decoderIndices.reduce((acc, curr) => acc * curr, 1)

  console.log("Decoder key:", decoderKey)
}
