const fs = require("fs")
const { join } = require("path")
const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")
const input = file.trim().split("\n")

function getMap(input) {
  let map = [...Array(input.length)].map((_) => Array(input[0].length))
  let start, end

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const cell = input[i][j]
      if (cell === "S") {
        start = `${i}:${j}`
        map[i][j] = 0
      } else if (cell === "E") {
        end = `${i}:${j}`
        map[i][j] = 25
      } else {
        map[i][j] = cell.charCodeAt(0) - "a".charCodeAt(0)
      }
    }
  }

  return { map, start, end }
}

// Part 1.
{
  function getNeighbors(map, id) {
    const res = []
    const [i, j] = id.split(":").map(Number)
    const current = map[i][j]

    if (i - 1 >= 0 && map[i - 1][j] <= current + 1) {
      res.push(`${i - 1}:${j}`)
    }

    if (i + 1 < map.length && map[i + 1][j] <= current + 1) {
      res.push(`${i + 1}:${j}`)
    }

    if (j - 1 >= 0 && map[i][j - 1] <= current + 1) {
      res.push(`${i}:${j - 1}`)
    }

    if (j + 1 < map[i].length && map[i][j + 1] <= current + 1) {
      res.push(`${i}:${j + 1}`)
    }

    return res
  }

  function findPath(map, start, end) {
    const dist = {}
    let q = []

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const id = `${i}:${j}`
        dist[id] = Infinity
        q.push(id)
      }
    }

    dist[start] = 0

    while (q.length) {
      const min = q.reduce(
        (min, curr) => (min === null || dist[curr] < dist[min] ? curr : min),
        null
      )

      if (min === end) break

      q = q.filter((point) => point !== min)

      const neighbors = getNeighbors(map, min).filter((n) => q.includes(n))

      for (const neighbor of neighbors) {
        const alt = dist[min] + 1
        if (alt < dist[neighbor]) dist[neighbor] = alt
      }
    }

    return dist
  }

  const { map, start, end } = getMap(input)
  const dist = findPath(map, start, end)
  console.log("Fewer steps required:", dist[end])
}

// Part 2.
{
  function getNeighbors(map, id) {
    const res = []
    const [i, j] = id.split(":").map(Number)
    const current = map[i][j]

    if (i - 1 >= 0 && map[i - 1][j] >= current - 1) {
      res.push(`${i - 1}:${j}`)
    }

    if (i + 1 < map.length && map[i + 1][j] >= current - 1) {
      res.push(`${i + 1}:${j}`)
    }

    if (j - 1 >= 0 && map[i][j - 1] >= current - 1) {
      res.push(`${i}:${j - 1}`)
    }

    if (j + 1 < map[i].length && map[i][j + 1] >= current - 1) {
      res.push(`${i}:${j + 1}`)
    }

    return res
  }

  function isBasePoint(map, p) {
    const [i, j] = p.split(":").map(Number)
    return map[i][j] === 0
  }

  function findPathToBase(map, start) {
    const dist = {}
    let q = []

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const id = `${i}:${j}`
        dist[id] = Infinity
        q.push(id)
      }
    }

    dist[start] = 0

    while (q.length) {
      const min = q.reduce(
        (min, curr) => (min === null || dist[curr] < dist[min] ? curr : min),
        null
      )

      if (isBasePoint(map, min)) return dist[min]

      q = q.filter((point) => point !== min)

      const neighbors = getNeighbors(map, min).filter((n) => q.includes(n))

      for (const neighbor of neighbors) {
        const alt = dist[min] + 1
        if (alt < dist[neighbor]) dist[neighbor] = alt
      }
    }

    return Infinity
  }

  const { map, end } = getMap(input)
  const dist = findPathToBase(map, end)
  console.log("Fewer steps required starting form any 'a':", dist)
}
