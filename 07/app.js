const fs = require("fs")
const { join } = require("path")

const file = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")
const input = file.split("\n")

function getPath(history) {
  const p = history.join("/").slice(1)
  return p.length ? p : "/"
}

const totalSizes = {}

// Part 1.
{
  const threshold = 100_000
  const history = []

  let total = 0
  let path = "/"

  for (let line of input) {
    if (line.startsWith("$ cd")) {
      const dir = line.split(" ")[2]
      path = getPath(history)

      totalSizes[path] = (totalSizes[path] ?? 0) + total

      if (dir === "..") {
        total = totalSizes[path]
        history.pop()
        path = getPath(history)
      } else {
        history.push(dir)
        path = getPath(history)
        total = 0
      }
    } else if (!line.startsWith("dir") && !line.startsWith("$ ls")) {
      total += Number(line.split(" ")[0])
    }
  }

  while (history.length) {
    totalSizes[path] = (totalSizes[path] ?? 0) + total
    total = totalSizes[path]
    history.pop()
    path = getPath(history)
  }

  const sumOfSizes = Object.values(totalSizes).reduce(
    (acc, curr) => (curr > threshold ? acc : acc + curr),
    0
  )

  console.log(`Sum of sizes under threshold: ${sumOfSizes}`)
}

// Part 2.
{
  const totalDiskSpace = 70_000_000
  const diskSpaceNeeded = 30_000_000
  const diskSpaceUsed = totalDiskSpace - totalSizes["/"]
  const diskSpaceRequired = diskSpaceNeeded - diskSpaceUsed
  const sizeOfBestCandidate = Math.min(
    ...Object.values(totalSizes).filter((v) => v >= diskSpaceRequired)
  )
  console.log(`Size of best candidate: ${sizeOfBestCandidate}`)
}
