const fs = require("fs")
const { join } = require("path")
const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")

function getMap(file) {
  const map = new Set()
  const input = file
    .trim()
    .split("\n")
    .map((line) =>
      line.split(" -> ").map((point) => point.split(",").map(Number))
    )

  for (let line of input) {
    let curr = line.shift()
    map.add(curr.join(","))
    while (line.length) {
      const next = line.shift()

      if (next[0] < curr[0]) {
        for (let i = curr[0] - 1; i >= next[0]; i--) {
          map.add(`${i},${curr[1]}`)
        }
      } else if (next[0] > curr[0]) {
        for (let i = curr[0] + 1; i <= next[0]; i++) {
          map.add(`${i},${curr[1]}`)
        }
      } else if (next[1] < curr[1]) {
        for (let i = curr[1] - 1; i >= next[1]; i--) {
          map.add(`${curr[0]},${i}`)
        }
      } else if (next[1] > curr[1]) {
        for (let i = curr[1] + 1; i <= next[1]; i++) {
          map.add(`${curr[0]},${i}`)
        }
      }

      curr = next
    }
  }

  return map
}

function hasPoint(map) {
  return function(point) {
    return map.has(point.join(","))
  }
}

function move(point, direction) {
  const dirs = { D: [0, 1], DL: [-1, 1], DR: [1, 1] }

  return [point[0] + dirs[direction][0], point[1] + dirs[direction][1]]
}

// Part 1.
{
  const map = getMap(file)
  const mapHasPoint = hasPoint(map)
  const maxY = Array.from(map).reduce(
    (max, position) => Math.max(position.split(",").map(Number)[1], max),
    Number.MIN_SAFE_INTEGER
  )
  let count = 0
  let passedMaxY = false

  while (!passedMaxY) {
    let currentGrainPosition = [500, 0]
    count += 1

    while (!passedMaxY) {
      if (!mapHasPoint(move(currentGrainPosition, "D"))) {
        currentGrainPosition = move(currentGrainPosition, "D")
      } else if (!mapHasPoint(move(currentGrainPosition, "DL"))) {
        currentGrainPosition = move(currentGrainPosition, "DL")
      } else if (!mapHasPoint(move(currentGrainPosition, "DR"))) {
        currentGrainPosition = move(currentGrainPosition, "DR")
      } else {
        map.add(currentGrainPosition.join(","))
        break
      }

      if (currentGrainPosition[1] >= maxY) {
        passedMaxY = true
        count -= 1
      }
    }
  }

  console.log("# Units of sand 1:", count)
}

// Part 2.
{
  const map = getMap(file)
  const mapHasPoint = hasPoint(map)
  const maxY = Array.from(map).reduce(
    (max, position) => Math.max(position.split(",").map(Number)[1], max),
    Number.MIN_SAFE_INTEGER
  )

  let count = 0

  while (true) {
    if (map.has(`500,0`)) break

    let currentGrainPosition = [500, 0]
    count += 1

    while (true) {
      if (currentGrainPosition[1] == maxY + 1) {
        map.add(currentGrainPosition.join(","))
        break
      } else if (!mapHasPoint(move(currentGrainPosition, "D"))) {
        currentGrainPosition = move(currentGrainPosition, "D")
      } else if (!mapHasPoint(move(currentGrainPosition, "DL"))) {
        currentGrainPosition = move(currentGrainPosition, "DL")
      } else if (!mapHasPoint(move(currentGrainPosition, "DR"))) {
        currentGrainPosition = move(currentGrainPosition, "DR")
      } else {
        map.add(currentGrainPosition.join(","))
        break
      }
    }
  }

  console.log("# Units of sand 2:", count)
}
