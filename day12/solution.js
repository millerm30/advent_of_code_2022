// Day 12 Hill Climbing Algorithm //

// import readFileSync
import { readFileSync } from "fs";

// get the input file and parse the data
const getInput = () => {
  const input = readFileSync("testData.txt", "utf-8")
    .replace(/\r/g, "")
    .trim()
    .split("\n");
  // create the response object
  const response = {
    start: {},
    end: {},
    map: [],
  };
  // convert the input into a 2d array of numbers
  response.map = input.map((line, y) => [...line].map((value, x) => {
    response.start = value === "S" ? { y, x } : response.start;
    response.end = value === "E" ? { y, x } : response.end;
    return value === "S" || value === "E" ? 25 : value.charCodeAt(0) - "a".charCodeAt(0);
  }));
  //console.log(response);
  return response;
};

// convert the x and y coordinates into a single integer
const pointToInterger = (x, y) => {
  return y * 1e3 + x;
}
//console.log(pointToInterger(1, 1));

// convert the integer into an object with x and y coordinates
const intergerToPoint = (int) => {
  return {
    y: Math.floor(int / 1e3),
    x: int % 1e3,
  };
}
//console.log(intergerToPoint(1000));

// get the neighbors of the current point
const getNeighbors = (x, y, map) => {
  const neighbors = [];
  // array of possible directions
  const directions = [
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

const travelMeter = (map, start, end) => {
  // create the distance and previous objects
  const dist = {};
  const prev = {};
  // create the queue
  let queue = [];
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
    let u = null;
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

const partOne = () => {
  const input = getInput();
  //console.log(input);
  const data = travelMeter(input.map, input.start, input.end);
  //console.log(data);
  const distance = data.dist[pointToInterger(input.end.x, input.end.y)];
  console.log(`The fewest number of steps is ${distance} to get the best signal!`);
}

// Part Two //

// Find a better starting point //
// find the shortest path from any square at eleveation a to the square marked E //
// find the fewest steps required to move starting from any square with elevation a to the location that should get the best signal? //

const getTheNewNeighbors = (x, y, map) => {
  const newNeighbors = [];
  // array of possible directions
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  // loop through each direction
  for (const [dx, dy] of directions) {
    // check if the new coordinates are within the bounds of the map
    // and if the new point has a value less than or equal to the current point - 1
    if (
      y + dy >= 0 &&
      y + dy < map.length &&
      x + dx >= -1 &&
      x + dx < map[y].length &&
      map[y + dy][x + dx] <= map[y][x] - 1
    ) {
      newNeighbors.push(pointToInterger(x + dx, y + dy)); // add the neighbor to the array
    }
    
  }
  return newNeighbors;
};

const travelMeterTwo = (map, start, end) => {
  const dist = {};
  const prev = {};
  let queue = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const id = pointToInterger(x, y);
      dist[id] = Infinity;
      // prev[pointToInt(x, y)] = ;
      queue.push(id);
    }
  }
  dist[pointToInterger(start.x, start.y)] = 0;

  while (queue.length) {
    let u = null;
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

    const neighbors = getTheNewNeighbors(point.x, point.y, map);
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
}

const partTwo = () => {
  const input = getInput();
  const distance = travelMeterTwo(input.map, input.end);
  console.log(`The fewest number of steps is ${distance} to get the best signal!`);
};

partOne();
partTwo();
