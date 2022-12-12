import { readFileSync } from "fs";

const input = readFileSync("testData.txt", "utf-8")
  .replace(/\r/g, "")
  .trim()
  // split the individual words in a line
  .split(" ")
  .map((word) => {
    // split the words into an array
    const words = word.split(/([0-9]+)/);
    return words;
  });


console.log(input);
