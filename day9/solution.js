const fs = require('fs');

const inputs = fs.readFileSync("input.txt", "utf-8" )
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map(line => { const [letter, number] = line.split(" ")
    return {
      direction: letter,
      totalMoves: parseInt(number)
    }
});

const moveDefinitions = {
  R: {
    x: 1,
    y: 0,
  },
  L: {
    x: -1,
    y: 0,
  },
  U: {
    x: 0,
    y: -1,
  },
  D: {
    x: 0,
    y: 1,
  },
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  move(direction) {
    const data = moveDefinitions[direction];
    this.x += data.x;
    this.y += data.y;
  }
  follow(point) {
    const distance = Math.max(
      Math.abs(this.x - point.x),
      Math.abs(this.y - point.y)
    );
    if (distance > 1) {
      const directionX = point.x - this.x;
      this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
      const directionY = point.y - this.y;
      this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
    }
  }
};

const visitedNodes = (x, y, visited) => {
  visited.add(`${x}-${y}`);
};

const PartOne = () => {
  const ropeHead = new Point(0, 0);
  const ropeTail = new Point(0, 0);
  const visited = new Set();
  visitedNodes(0, 0, visited);

  for (const input of inputs) {
    for (let i = 0; i < input.totalMoves; i++) {
      ropeHead.move(input.direction);
      ropeTail.follow(ropeHead);
      visitedNodes(ropeTail.x, ropeTail.y, visited);
    }
  }
  console.log(visited.size);
};

const PartTwo = () => {
  const knots = new Array(10).fill(0).map((_) => new Point(0, 0));
  const visited = new Set();
  visitedNodes(0, 0, visited);
  
  for (const input of inputs) {
    for (let i = 0; i < input.totalMoves; i++) {
      knots[0].move(input.direction);
      for (let knot = 1; knot < knots.length; knot++) {
        const point = knots[knot];
        point.follow(knots[knot - 1]);
      }
      const ropeTail = knots[knots.length - 1];
      visitedNodes(ropeTail.x, ropeTail.y, visited);
    }
  }
  console.log(visited.size);
};

PartOne();
PartTwo();
