// Day 1: Calorie Counting //
let fs = require("fs");

const inputs = fs.readFileSync("input.txt", "utf-8").toString().split(/\n\n/gi);

let caloriesPerElfCombinedArray = [];

for (let i in inputs) {
  let currentElfsCaloriesArray = inputs[i].split(/\n/gi);
  let currentElfsCaloriesCombined = 0;

  currentElfsCaloriesArray.forEach((index) => {
    currentElfsCaloriesCombined += +index;
  });

  caloriesPerElfCombinedArray.push(currentElfsCaloriesCombined);
}

caloriesPerElfCombinedArray.sort((a, b) => b - a);

// Answer for part 1 - Calories amount for elf with most calories

console.log(caloriesPerElfCombinedArray[0]);

// Answer for part 2 - Top 3 Elves calories

console.log(
  caloriesPerElfCombinedArray[0] +
    caloriesPerElfCombinedArray[1] +
    caloriesPerElfCombinedArray[2]
);
