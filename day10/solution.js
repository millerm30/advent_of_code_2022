// Day 10: Cathode-Ray Tibe //
import { readFileSync } from "fs";

const inputs = readFileSync("testData.txt", "utf-8")
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
  console.log("Part One");
};

const partTwo = () => {
  console.log("Part Two");
};

partOne();
partTwo();