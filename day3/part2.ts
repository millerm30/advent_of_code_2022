import { readFileSync } from "fs";

const inputs = readFileSync("./input.txt", "utf-8")
  .toString()
  .split("\n");

function findCommonCharacters(s1: any, s2: any, s3: any): any | boolean {
  for (let i in s1) {
    let commonCharacter = s2.includes(s1[i]) && s3.includes(s1[i]) ? s1[i] : false;
    if (commonCharacter) {
      return commonCharacter;
    }
  }
};

let countPoints = (letter: string): number => {
  const alphabet = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabetCapital = alphabet.map(x => String.fromCharCode(x));

  const alphabetLowercase = alphabetCapital.map(a => a.toLocaleLowerCase());
  if (alphabetCapital.includes(letter)) {
    const points = alphabetCapital.indexOf(letter, 0) + 27;
    return points;
  }
  if (alphabetLowercase.includes(letter)) {
    const points = alphabetLowercase.indexOf(letter, 0) + 1;
    return points;
  }
};

const findSumOfAuthBadges = (input: string[]) => {
  let counter = 0;
  let points = 0;
  let group: string[] = [];
  for (const backpack of input) {
    group.push(backpack);

    if (group.length ===3) {
      let common = findCommonCharacters(group[0], group[1], group[2]);
      let pointsToAdd = countPoints(common);
      points += pointsToAdd;
      group = [];
    }
  }
  console.log(points);
};

findSumOfAuthBadges(inputs);
