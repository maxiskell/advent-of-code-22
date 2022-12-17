const fs = require("fs")
const { join } = require("path")
const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")
const input = file.trim().split("\n")

const moves = { U: [0, 1], D: [0, -1], L: [-1, 0], R: [1, 0] }

// Part 1.
{
  let head = [0, 0]
  let tail = [0, 0]

  let visited = new Set()

  for (let line of input) {
    const [dir, qty] = line.split(" ")
    const move = moves[dir]

    for (let i = 0; i < qty; i++) {
      head = [head[0] + move[0], head[1] + move[1]]

      const [xDistance, yDistance] = [head[0] - tail[0], head[1] - tail[1]]
      const distance = Math.max(Math.abs(xDistance), Math.abs(yDistance))

      if (distance > 1) {
        tail[0] += Math.abs(xDistance) === 2 ? xDistance / 2 : xDistance
        tail[1] += Math.abs(yDistance) === 2 ? yDistance / 2 : yDistance
      }

      visited.add(tail.join(","))
    }
  }

  console.log("# Visited by tail:", visited.size)
}

// Part 2.
{
  let knots = new Array(10).fill(null).map((_) => [0, 0])

  let visited = new Set()

  for (let line of input) {
    const [dir, qty] = line.split(" ")
    const move = moves[dir]

    for (let i = 0; i < qty; i++) {
      knots[0] = [knots[0][0] + move[0], knots[0][1] + move[1]]

      for (let k = 1; k < knots.length; k++) {
        const xDistance = knots[k - 1][0] - knots[k][0]
        const yDistance = knots[k - 1][1] - knots[k][1]
        const distance = Math.max(Math.abs(xDistance), Math.abs(yDistance))

        if (distance > 1) {
          knots[k][0] += Math.abs(xDistance) === 2 ? xDistance / 2 : xDistance
          knots[k][1] += Math.abs(yDistance) === 2 ? yDistance / 2 : yDistance
        }
      }

      visited.add(knots[9].join(","))
    }
  }

  console.log("# Visited by last knot:", visited.size)
}
