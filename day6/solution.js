const fs = require('fs');

const input = fs.readFileSync("input.txt", "utf-8")

const getLastCharacters = (amount, characters) => {
  characters = characters.slice(characters.length - amount, characters.length);
  let lastCharacters = [];
  for (let character of characters) {
    lastCharacters.push(character);
  }
  return lastCharacters;
};

const findStartPoints = ( markerLength, input ) => {
  let letters = [];
  let counter = 0;
  for (const letter of input) {
    counter++;
    letters.push(letter);
    let lastCharacters = getLastCharacters(markerLength, letters);
    let isUnique = [...new Set(lastCharacters)];
    if (isUnique.length === markerLength && !isUnique.includes(undefined)) {
      console.log(counter);
      return;
    }
  }
};

findStartPoints(4, input);
findStartPoints(14, input);


