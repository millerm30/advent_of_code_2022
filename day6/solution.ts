// Day 6: Tunning Trouble //
import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8");

const getLastCharacters = (amount: number, characters: string): string[] => {
  characters = characters.slice(characters.length - amount, characters.length);
  let lastCharacters: string[] = [];
  for (let character of characters) {
    lastCharacters.push(character);
  }
  return lastCharacters;
};

const findStartPoints = (markerLength: number, input: string) => {
  let letters: string[] = [];
  let counter = 0;
  for (const letter of input) {
    counter++;
    letters.push(letter);
    let lastCharacters = getLastCharacters(markerLength, letters.join(""));
    let isUnique = [...new Set(lastCharacters)];
    if (isUnique.length === markerLength && !isUnique.includes(undefined)) {
      console.log(counter);
      return;
    }
  }
};

findStartPoints(4, input);
findStartPoints(14, input);
