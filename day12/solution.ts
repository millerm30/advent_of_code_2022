// Day 12 Hill Climbing Algorithm //

// import readFileSync
import { readFileSync } from "fs";

// get the input file and parse the data
const getInput = (): {
  start: { y: number, x: number },
  end: { y: number, x: number },
  map: number[][],
} => {
  const input = readFileSync("./input.txt", "utf-8")
    .replace(/\r/g, "")
    .trim()
    .split("\n");
  // create the response object
  const response = {
    start: { y: 0, x: 0 },
    end: { y: 0, x: 0 },
    map: [],
  };
  // convert the input into a 2d array of numbers
  response.map = input.map((line, y) =>
    [...line].map((value, x) => {
      if (value === "S") {
        response.start = { y, x };
      } else if (value === "E") {
        response.end = { y, x };
      }
      return value === "S" || value === "E"
        ? 25
        : value.charCodeAt(0) - "a".charCodeAt(0);
    })
  );
  //console.log(response);
  return response;
};

// convert the x and y coordinates into a single integer
const pointToInterger = (x: number, y: number): number => {
  return y * 1e3 + x;
};
//console.log(pointToInterger(1, 1));

// convert the integer into an object with x and y coordinates
const intergerToPoint = (int: number): { y: number, x: number } => {
  return {
    y: Math.floor(int / 1e3),
    x: int % 1e3,
  };
};
//console.log(intergerToPoint(1000));

// get the neighbors of the current point
const getNeighbors = (x: number, y: number, map: number[][]): number[] => {
  const neighbors: number[] = [];
  // array of possible directions
  const directions: number[][] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  // loop through each direction
  for (const [dx, dy] of directions) {
    // check if the new coordinates are within the bounds of the map
    // and if the new point has a value less than or equal to the current point + 1
    if (
      y + dy >= 0 &&
      y + dy < map.length &&
      x + dx >= 0 &&
      x + dx < map[y].length &&
      map[y + dy][x + dx] <= map[y][x] + 1
    ) {
      neighbors.push(pointToInterger(x + dx, y + dy)); // add the neighbor to the array
    }
  }
  return neighbors;
};

const travelMeter = (map: number[][], start: { x: number, y: number}, end: { x: number, y: number}): {dist: Record<number, number>, prev: Record<number, number> } => {
  // create the distance and previous objects
  const dist: Record<number, number> = {};
  const prev: Record<number, number> = {};
  // create the queue
  let queue: number[] = [];
  // loop through the map and add each point to the queue
  map.forEach((line, y) => {
    line.forEach((value, x) => {
      const id = pointToInterger(x, y);
      dist[id] = Infinity;
      queue.push(id);
    });
  });
  // set the distance of the start point to 0
  dist[pointToInterger(start.x, start.y)] = 0;
  // loop through the queue
  while (queue.length) {
    let u: number | null = null;
    queue.forEach((current) => {
      if (u === null || dist[current] < dist[u]) {
        u = current;
      }
    });
    if (u === pointToInterger(end.x, end.y)) {
      break;
    }
    queue = queue.filter((x) => x !== u);
    // get the neighbors of the current point
    const point = intergerToPoint(u);
    const neighbors = getNeighbors(point.x, point.y, map);
    neighbors
      .filter((v) => queue.includes(v))
      .forEach((v) => {
        const alt = dist[u] + 1;
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
        }
      });
  }
  return {
    dist,
    prev,
  };
};

const partOne = (): void => {
  const input = getInput();
  //console.log(input);
  const data = travelMeter(input.map, input.start, input.end);
  //console.log(data);
  const distance = data.dist[pointToInterger(input.end.x, input.end.y)];
  console.log(
    `The fewest number of steps is ${distance} to get the best signal!`
  );
};


partOne();

// Part Two //

// Find a better starting point //
// find the shortest path from any square at eleveation a to the square marked E //
// find the fewest steps required to move starting from any square with elevation a to the location that should get the best signal? //

const getNeighborsTwo = (x: number, y: number, map: number[][]) => {
  const response: number[] = [];
  const directions: Array<[number, number]> = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  for (const [dx, dy] of directions) {
    const neighborX = x + dx;
    const neighborY = y + dy;

    if (neighborY < 0 || neighborY >= map.length || neighborX < 0 || neighborX >= map[y].length) {
      continue;
    }

    if (map[neighborY][neighborX] >= map[y][x] - 1) {
      response.push(pointToInterger(neighborX, neighborY));
    }
  }
  return response;
};


const TravelMeterTwo = (map: number[][], start: { x: number, y: number } ) => {
  const dist: Record<number, number> = {};
  const prev: Record<number, number> = {};
  let queue: number[] = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const id = pointToInterger(x, y);
      dist[id] = Infinity;
      queue.push(id);
    }
  }
  dist[pointToInterger(start.x, start.y)] = 0;

  while (queue.length) {
    let u: number | null = null;
    for (const current of queue) {
      if (u === null || dist[current] < dist[u]) {
        u = current;
      }
    }
    const point = intergerToPoint(u);
    if (map[point.y][point.x] === 0) {
      return dist[u];
    }
    queue = queue.filter((x) => x !== u);

    const neighbors = getNeighborsTwo(point.x, point.y, map);
    for (const v of neighbors) {
      if (queue.includes(v)) {
        const alt = dist[u] + 1;
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
        }
      }
    }
  }
  return null;
};

const partTwo = (): void => {
  const input = getInput();
  const distance = TravelMeterTwo(input.map, input.end);
  console.log(
    `The fewest number of steps is ${distance} to get the best signal!`
  );
};

partTwo();