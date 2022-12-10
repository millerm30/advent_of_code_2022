const fs = require("fs");

const END_DATA = " 1   2   3   4   5   6   7   8   9 ";
const chunkExpr = new RegExp(/.{1,4}/g);
const itemExpr = new RegExp(/[^A-Z]/g);
const instructionExpr = new RegExp(/\d+/g);

function loadData() {
  const stacks = [];
  const instructions = [];
  let parsedData = false;

  fs.readFileSync("input.txt")
    .toString()
    .split("\n")
    .forEach((line) => {
      if (!line) return;
      if (!parsedData && line === END_DATA) {
        parsedData = true;
        return;
      }

      if (!parsedData) {
        const items = line
          .match(chunkExpr)
          .map((item) => item.replace(itemExpr, ""));

        items.forEach((item, i) => {
          if (!item) return;

          if (!stacks[i]) {
            stacks[i] = [];
          }

          stacks[i].push(item);
        });
      } else {
        instructions.push(
          line.match(instructionExpr).map((n) => parseInt(n, 10))
        );
      }
    });

  return { stacks, instructions };
}

const { stacks, instructions } = loadData();

instructions.forEach(([amount, sourceStackNumber, targetStackNumber]) => {
  const sourceStack = stacks[sourceStackNumber - 1];
  const targetStack = stacks[targetStackNumber - 1];
  const movedItems = sourceStack.splice(0, amount);

  targetStack.unshift(...movedItems);
});

const getTheNewStacks = () => {
  const getStackTwo = stacks.map((stack) => stack[0]).join("");
  return getStackTwo;
}

console.log(getTheNewStacks());