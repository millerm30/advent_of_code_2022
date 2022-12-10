// Day 8: Treetop Tree House //
const fs = require("fs");

const inputs = fs
  .readFileSync("input.txt", "utf-8")
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((line) => [...line].map(Number));

const setVisible = (y, x, visible) => {
  visible.add(`${y}-${x}`);
};

const checkLine = (y, x, dy, dx, map, visible) => {
  setVisible(y, x, visible);
  let maximum = map[y][x];
  while (true) {
    y += dy;
    x += dx;
    if (y < 0 || y >= map.length || x < 0 || x >= map[y].length) {
      break;
    }
    if (map[y][x] > maximum) {
      maximum = map[y][x];
      setVisible(y, x, visible);
    }
  }
};

const checkLine2 = (y, x, dy, dx, map) => {
  let visible = 0;
  let maximum = map[y][x];
  while (true) {
    y += dy;
    x += dx;
    if (y < 0 || y >= map.length || x < 0 || x >= map[y].length) {
      break;
    }
    visible++;
    if (map[y][x] >= maximum) {
      break;
    }
  }
  return visible;
};

const partOne = () => {
  const visible = new Set();
  for (let i = 0; i < inputs[0].length; i++) {
    checkLine(0, i, 1, 0, inputs, visible);
    checkLine(inputs.length - 1, i, -1, 0, inputs, visible);
  }
  for (let i = 0; i < inputs.length; i++) {
    checkLine(i, 0, 0, 1, inputs, visible);
    checkLine(i, inputs[0].length - 1, 0, -1, inputs, visible);
  }

  console.log(visible.size);
};

const partTwo = () => {
  let max = 0;
  for (let y = 0; y < inputs.length; y++) {
    for (let x = 0; x < inputs[y].length; x++) {
      const score =
        checkLine2(y, x, -1, 0, inputs) *
        checkLine2(y, x, 1, 0, inputs) *
        checkLine2(y, x, 0, 1, inputs) *
        checkLine2(y, x, 0, -1, inputs);
      if (score > max) max = score;
    }
  }

  console.log(max);
};

partOne();
partTwo();
