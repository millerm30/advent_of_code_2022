import { readFileSync } from "fs";

const inputs = readFileSync("./input.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .trim()
    .split("\n");

const assigmentPairs: string[][] = inputs.map(line => line.split(","));

const partOneSolution = () => {
    let totalOverlaps = 0;

    const checkForOverlaps = (scopeX: any, scopeY: any): number => {
        let [minX, maxX] = scopeX.split("-");
        let [minY, maxY] = scopeY.split("-");
        minX = parseInt(minX);
        maxX = parseInt(maxX);
        minY = parseInt(minY);
        maxY = parseInt(maxY);

        if (minX < minY && maxX > maxY) { return 1; }
        else if (minX === minY && maxX > maxY) { return 1; }
        else if (minX < minY && maxX === maxY) { return 1; }
        else if (minX === minY && maxX === maxY) { return 1; }
        else if (minX > minY && maxX < maxY) { return 1; }
        else if (minX === minY && maxX < maxY) { return 1; }
        else if (minX > minY && maxX === maxY) { return 1; }
        else return 0;
    };

    assigmentPairs.forEach(pair => {
        const [assigmentsX, assigmentsY] = pair;
        totalOverlaps += checkForOverlaps(assigmentsX, assigmentsY);
    });
    console.log(totalOverlaps)
}

const partTwoSolution = () => {
  let totalOverlaps = 0;

  const checkForOverlaps = (scopeX: any, scopeY: any): number => {
    let [minX, maxX] = scopeX.split("-");
    let [minY, maxY] = scopeY.split("-");
    minX = parseInt(minX);
    maxX = parseInt(maxX);
    minY = parseInt(minY);
    maxY = parseInt(maxY);

    if (minY <= minX && minX <= maxY) return 1;
    else if (minY <= maxX && maxX <= maxY) return 1;
    else if (minX <= minY && minY <= maxX) return 1;
    else if (minX <= maxY && maxY <= maxX) return 1;
    return 0;
  };

  assigmentPairs.forEach((pair) => {
    const [assigmentsX, assigmentsY] = pair;
    totalOverlaps += checkForOverlaps(assigmentsX, assigmentsY);
  });
  console.log(totalOverlaps);
};

partOneSolution();
partTwoSolution();
