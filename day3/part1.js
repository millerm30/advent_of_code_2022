const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").toString();

const backpackItemsList = input.split("\n");

const splitStringFromHalf = (string, index) => {
  const result = [string.slice(0, index), string.slice(index)];
  return result;
};

const findCommonCharacters = (s1, s2) => {
  for (let i in s1) {
    let commonCharacter = s2.includes(s1[i]) ? s1[i] : false;
    if (commonCharacter) {
      return commonCharacter;
    }
  }
};

let countPoints = (letter) => {
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

for (const backpack of backpackItemsList) {
  let middle = Math.floor(backpack.length / 2);
  let [firstCompartment, secondCompartment] = splitStringFromHalf(
    backpack,
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
