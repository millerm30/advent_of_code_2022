let fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8").toString();

const playsArray = input.split("\n");

let myPoints = 0;

for (let play of playsArray) {
  let opponentPick = play.split(" ")[0];
  let myPlan = play.split(" ")[1];

  // The plan is to lose

  if (myPlan == "X") {
    console.log("Plan is to lose!");

    if (opponentPick == "A") {
      console.log(
        "Opponent picks rock and plan is to lose. So, you pick scissors."
      );
      myPoints = myPoints + 3 + 0;
    }
    if (opponentPick == "B") {
      console.log(
        "Opponent picks paper and plan is to lose. So, you pick rock."
      );
      myPoints = myPoints + 1 + 0;
    }
    if (opponentPick == "C") {
      console.log(
        "Opponent picks scissors and plan is to lose. So, you pick paper."
      );
      myPoints = myPoints + 2 + 0;
    }
  }

  // The plan is to draw

  if (myPlan == "Y") {
    console.log("Plan is to draw!");

    if (opponentPick == "A") {
      console.log(
        "Opponent picks rock and plan is to draw. So, you pick rock."
      );
      myPoints = myPoints + 1 + 3;
    }
    if (opponentPick == "B") {
      console.log(
        "Opponent picks paper and plan is to draw. So, you pick paper."
      );
      myPoints = myPoints + 2 + 3;
    }
    if (opponentPick == "C") {
      console.log(
        "Opponent picks scissors and plan is to draw. So, you pick scissors."
      );
      myPoints = myPoints + 3 + 3;
    }
  }

  // The plan is to win

  if (myPlan == "Z") {
    console.log("Plan is to win!");

    if (opponentPick == "A") {
      console.log(
        "Opponent picks rock and plan is to win. So, you pick paper."
      );
      myPoints = myPoints + 2 + 6;
    }
    if (opponentPick == "B") {
      console.log(
        "Opponent picks paper and plan is to win. So, you pick scissors."
      );
      myPoints = myPoints + 3 + 6;
    }
    if (opponentPick == "C") {
      console.log(
        "Opponent picks scissors and plan is to win. So, you pick rock."
      );
      myPoints = myPoints + 1 + 6;
    }
  }
}

console.log(myPoints);
