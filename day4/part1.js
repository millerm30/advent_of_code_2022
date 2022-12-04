let fs = require("fs");
const data = fs.readFileSync("./input.txt", { encoding: "utf-8" })
    .replace(/\r/g, "")
    .trim()
    .split("\n");

const assigmentPairs = data.map(line => line.split(","));

const partOneSolution = () => {
    let totalOverlaps = 0;

    const checkForOverlaps = (scopeX, scopeY) => {
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

    return totalOverlaps;
}

console.log(partOneSolution());
