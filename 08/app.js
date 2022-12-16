const fs = require("fs")
const { join } = require("path")

const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")
const input = file.split("\n").slice(0, -1)

function isVisible(map) {
  return function (i, j) {
    let leftVisible = true
    let rightVisible = true
    let topVisible = true
    let bottomVisible = true

    for (let x = 0; x < j; x++) {
      if (map[i][x] >= map[i][j]) {
        leftVisible = false
      }
    }

    for (let x = j + 1; x < map[i].length; x++) {
      if (map[i][x] >= map[i][j]) {
        rightVisible = false
      }
    }

    for (let y = 0; y < i; y++) {
      if (map[y][j] >= map[i][j]) {
        topVisible = false
      }
    }

    for (let y = i + 1; y < map.length; y++) {
      if (map[y][j] >= map[i][j]) {
        bottomVisible = false
      }
    }

    return leftVisible || rightVisible || topVisible || bottomVisible
  }
}

function getScenicScore(map) {
  return function (i, j) {
    const viewingDistances = [0, 0, 0, 0]

    for (let x = j - 1; x >= 0; x--) {
      viewingDistances[0] += 1
      if (map[i][x] >= map[i][j]) break
    }

    for (let x = j + 1; x < map[i].length; x++) {
      viewingDistances[1] += 1
      if (map[i][x] >= map[i][j]) break
    }

    for (let y = i - 1; y >= 0; y--) {
      viewingDistances[2] += 1
      if (map[y][j] >= map[i][j]) break
    }

    for (let y = i + 1; y < map.length; y++) {
      viewingDistances[3] += 1
      if (map[y][j] >= map[i][j]) break
    }

    return viewingDistances.reduce((acc, curr) => acc * curr, 1)
  }
}

function countEdges(map) {
  return 2 * map.length + 2 * map[0].length - 4
}

// Part 1.
{
  const map = input
  const isVisibleOnMap = isVisible(map)

  let count = countEdges(map)

  for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[i].length - 1; j++) {
      count += isVisibleOnMap(i, j)
    }
  }

  console.log(`# Visible trees: ${count}`)
}

// Part 2.
{
  const map = input
  const getTreeScenicScore = getScenicScore(map)

  let maxScore = -Infinity

  for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[i].length - 1; j++) {
      maxScore = Math.max(maxScore, getTreeScenicScore(i, j))
    }
  }

  console.log(`Highest scenic sore: ${maxScore}`)
}
