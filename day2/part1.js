// Day 2: Rock Paper Scissors Part: One //
let fs = require("fs");

const inputs = fs.readFileSync("input.txt", "utf-8")
  .toString()
  .split("\n");

let myPoints = 0;

const partOne = () => {
  for (let input of inputs) {
    let opponentPick = input.split(" ")[0];
    let myPick = input.split(" ")[1];

    switch (opponentPick) {
      case "A":
        switch (myPick) {
          case "Z":
            console.log("Opponent picks rock and you pick scissors, you lost.");
            myPoints = myPoints + 3 + 0;
            break;
          case "X":
            console.log("Opponent picks rock and you pick rock, it's a draw.");
            myPoints = myPoints + 1 + 3;
            break;
          case "Y":
            console.log("Opponent picks rock and you pick paper, you win.");
            myPoints = myPoints + 2 + 6;
            break;
        }
        break;
      case "B":
        switch (myPick) {
          case "Z":
            console.log("Opponent picks paper and you pick scissors, you win.");
            myPoints = myPoints + 3 + 6;
            break;
          case "X":
            console.log("Opponent picks paper and you pick rock, you lose.");
            myPoints = myPoints + 1 + 0;
            break;
          case "Y":
            console.log("Opponent picks paper and you pick paper, its a draw.");
            myPoints = myPoints + 2 + 3;
            break;
        }
        break;
      case "C":
        switch (myPick) {
          case "Z":
            console.log("Opponent picks scissors and you pick scissors, its a draw.");
            myPoints = myPoints + 3 + 3;
            break;
          case "X":
            console.log("Opponent picks scissors and you pick rock, you win.");
            myPoints = myPoints + 1 + 6;
            break;
          case "Y":
            console.log("Opponent picks scissors and you pick paper, you lose.");
            myPoints = myPoints + 2 + 0;
            break;
        }
        break;
    }
  }
  console.log("Your total points are: " + myPoints);
};

partOne();
