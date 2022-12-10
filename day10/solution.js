// Day 10: Cathode-Ray Tibe //
const fs = require("fs");

const inputs = fs.readFileSync("smallTest.txt", "utf-8")
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((line) => {
    const input = line.split(" ");
    const response = [];
    response.op = input[0];
    if (response.op === "add") {
      response.value = parseInt(input[1]);
  }
  return response;
});

console.log(inputs);

const partOne = () => {
  console.log("This is part one!")
};

const partTwo = () => {
  console.log("This is part two!")
};

partOne();
partTwo();