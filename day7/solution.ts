// Day 7: No Space Left On Device //
import { readFileSync } from "fs";

const data = readFileSync("./input.txt", "utf-8").split("\n");

class TreeNode {
  key: string;
  value: number;
  parent: TreeNode;
  children: TreeNode[];

  constructor(key: string, parent: TreeNode | null = null) {
    this.key = key;
    this.value = 0;
    this.parent = parent;
    this.children = [];
  }
}

let tree = new TreeNode("/");
let pointer: TreeNode = tree;
let i = 0;
while (i < data.length) {
  let line = data[i];
  if (line == "$ ls") {
    i++;
    line = data[i];
    while (i < data.length && line.charAt(0) != "$") {
      let size = parseInt(line.split(" ")[0]);
      if (!isNaN(size)) {
        pointer.value += size;
      } else {
        let name = line.split(" ")[1];
        let node = new TreeNode(name, pointer);
        pointer.children.push(node);
      }
      i++;
      line = data[i];
    }
  } else if (line == "$ cd ..") {
    pointer = pointer.parent;
    i++;
  } else if (line == "$ cd /") {
    pointer = tree;
    i++;
  } else {
    let name = line.split(" ")[2];
    pointer = pointer.children.find((x) => x.key == name);
    i++;
  }
}

// Part 1
let acum = 0;
const recursiveOne = (node: TreeNode) => {
  let totalSum = getTotalSum(node);
  if (totalSum <= 100000) {
    acum += totalSum;
  }
  for (let i = 0; i < node.children.length; i++) {
    recursiveOne(node.children[i]);
  }
};

const getTotalSum = (node) => {
  let sum = node.value;
  for (let i = 0; i < node.children.length; i++) {
    sum += getTotalSum(node.children[i]);
  }
  return sum;
};

recursiveOne(tree);
console.log("Part 1: " + acum);

// Part 2
const partTwo = () => {
  let totalSpaceUsed = getTotalSum(tree);
  let totalSpace = 70000000;
  let spaceNeeded = 30000000;
  let currentSpace = totalSpace - totalSpaceUsed;
  let spaceToFree = spaceNeeded - currentSpace;
  findNodeBiggerThan(tree, spaceToFree);
  console.log("Part 2: " + best);
};

let best: number;
let dif = 70000000;
const findNodeBiggerThan = (node: TreeNode, spaceToFree: number) => {
  let totalSum = getTotalSum(node);
  if (totalSum > spaceToFree) {
    if (totalSum - spaceToFree < dif) {
      dif = totalSum - spaceToFree;
      best = getTotalSum(node);
    }
  }
  for (let i = 0; i < node.children.length; i++) {
    findNodeBiggerThan(node.children[i], spaceToFree);
  }
};

partTwo();
