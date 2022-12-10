// Day 2: Rock Paper Scissors: Part Two //
let fs = require("fs");

const inputs = fs.readFileSync("input.txt", "utf-8")
  .toString()
  .split("\n");

let myPoints = 0;

const partTwo = () => {
  for (let input of inputs) {
    let opponentPick = input.split(" ")[0];
    let myPlan = input.split(" ")[1];

    switch (opponentPick) {
      case "A":
        switch (myPlan) {
          case "X":
            console.log("Opponent picks rock and plan is to lose, you pick scissors.");
            myPoints = myPoints + 3 + 0;
            break;
          case "Y":
            console.log("Opponent picks rock and plan is to draw, you pick rock.");
            myPoints = myPoints + 1 + 3;
            break;
          case "Z":
            console.log("Opponent picks rock and plan is to win, you pick paper.");
            myPoints = myPoints + 2 + 6;
            break;
        }
        break;
      case "B":
        switch (myPlan) {
          case "X":
            console.log("Opponent picks paper and plan is to lose, you pick rock.");
            myPoints = myPoints + 1 + 0;
            break;
          case "Y":
            console.log("Opponent picks paper and plan is to draw, you pick paper.");
            myPoints = myPoints + 2 + 3;
            break;
          case "Z":
            console.log("Opponent picks paper and plan is to win, you pick scissors.");
            myPoints = myPoints + 3 + 6;
            break;
        }
        break;
      case "C":
        switch (myPlan) {
          case "X":
            console.log("Opponent picks scissors and plan is to lose, you pick paper.");
            myPoints = myPoints + 2 + 0;
            break;
          case "Y":
            console.log("Opponent picks scissors and plan is to draw, you pick scissors.");
            myPoints = myPoints + 3 + 3;
            break;
          case "Z":
            console.log("Opponent picks scissors and plan is to win, you pick rock.");
            myPoints = myPoints + 1 + 6;
            break;
        }
        break;
    }
  }
  console.log("My points: " + myPoints);
};

partTwo();
