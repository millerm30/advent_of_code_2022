import { readFileSync } from "fs";

const input = readFileSync("testData.txt", "utf-8")
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  


console.log(input);
