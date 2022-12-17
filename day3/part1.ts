import { readFileSync } from "fs";

const inputs = readFileSync("./input.txt", "utf-8")
  .toString()
  .split("\n");

const splitStringFromHalf = (string: string, index: number): string[] => {
  const result = [string.slice(0, index), string.slice(index)];
  return result;
};

const findCommonCharacters = (s1: any, s2: any): any | boolean => {
  for (let i in s1) {
    let commonCharacter = s2.includes(s1[i]) ? s1[i] : false;
    if (commonCharacter) {
      return commonCharacter;
    }
  }
};

let countPoints = (letter: string): number => {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabetCapital = alpha.map((x) => String.fromCharCode(x));

  const alphabetLowercase = alphabetCapital.map((a) => a.toLocaleLowerCase());
  if (alphabetCapital.includes(letter)) {
    const points = alphabetCapital.indexOf(letter) + 27;
    return points;
  }
  if (alphabetLowercase.includes(letter)) {
    const points = alphabetLowercase.indexOf(letter) + 1;
    return points;
  }
};

let allPoints = 0;

for (const input of inputs) {
  let middle = Math.floor(input.length / 2);
  let [firstCompartment, secondCompartment] = splitStringFromHalf(
    input,
    middle
  );

  let commonCharacter = findCommonCharacters(
    firstCompartment,
    secondCompartment
  );

  let points = countPoints(commonCharacter);
  if (points > 0) {
    allPoints = allPoints + points;
  }
}

console.log(allPoints);
