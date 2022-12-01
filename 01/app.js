const fs = require("fs")
const { join } = require("path")

const input = fs.readFileSync(join(__dirname, "./input.txt"), "utf8")

const caloriesPerElf = input.split("\n\n").map((x) => x.split("\n"))

const accCaloriesPerElf = caloriesPerElf.map((calories) =>
  calories.reduce((acc, curr) => acc + parseInt(curr), 0)
)

// Part 1.
{
  const mostCalories = accCaloriesPerElf.reduce(
    (prev, curr) => (curr > prev ? curr : prev),
    -Infinity
  )

  console.log("Most Calories:", mostCalories)
}

// Part 2.
{
  const totalTopThree = accCaloriesPerElf
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr, 0)

  console.log("Total Top 3:", totalTopThree)
}
