import { readFileSync } from 'fs';

const getOperationFunction = (input) => {
  return function (old) {
    const string = input.replace(/old/, old);
    // Warning: do not use in prod
    return eval(string);
  };
};

const getMonkeys = () => {
  const monkeys = readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n\n")
    .map((lines, monkeyId) => {
      const items = lines
        .match(/Starting items(?:[:,] (\d+))+/g)[0]
        .split(": ")[1]
        .split(", ")
        .map(Number);
      const operation = lines.match(/= ([^\n]+)/)[1];

      const divisibleBy = parseInt(lines.match(/divisible by (\d+)/)[1]);
      const whenTrueSendTo = parseInt(
        lines.match(/If true: throw to monkey (\d)/)[1]
      );
      const whenFalseSendTo = parseInt(
        lines.match(/If false: throw to monkey (\d)/)[1]
      );
      return {
        id: monkeyId,
        totalInspectedObjects: 0,
        items,
        divisibleBy,
        operation: getOperationFunction(operation),
        sendTo: (item) =>
          item % divisibleBy === 0 ? whenTrueSendTo : whenFalseSendTo,
      };
    });
    //console.log(monkeys);
  return monkeys;
};

const partOne = () => {
  const monkeys = getMonkeys();
  for (let i = 0; i < 20; i++) {
    monkeys.forEach((monkey) => {
      let items = monkey.items;
      while (items.length) {
        let item = items.shift();
        monkey.totalInspectedObjects++;
        
        item = monkey.operation(item);
        item = Math.floor(item / 3);
        const destination = monkey.sendTo(item);

        monkeys[destination].items.push(item);
      }
    });
  }
  const ids = monkeys.map((m) => m.id);
  const activity = monkeys.map((m) => m.totalInspectedObjects);
  const combined = ids.map((id, index) => ({ id, activity: activity[index] }));
  combined.sort((a, b) => b.activity - a.activity);
  const topTwo = combined.slice(0, 2);
  console.log(
    `Monkey ${topTwo[0].id} inspected ${topTwo[0].activity} objects and Monkey ${topTwo[1].id} inspected ${topTwo[1].activity} objects. The multiplied answer is ${topTwo[0].activity * topTwo[1].activity}`
  );
};


const partTwo = () => {
  const monkeys = getMonkeys();
  const divider = monkeys.map((m) => m.divisibleBy).reduce((a, b) => a * b, 1);
  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      let items = monkey.items;
      while (items.length) {
        let item = items.shift();
        monkey.totalInspectedObjects++;

        item = monkey.operation(item);
        item = item % divider;
        const destination = monkey.sendTo(item);

        monkeys[destination].items.push(item);
      }
    }
  }
  const ids = monkeys.map((m) => m.id);
  const activity = monkeys.map((m) => m.totalInspectedObjects);
  const combined = ids.map((id, index) => ({ id, activity: activity[index] }));
  combined.sort((a, b) => b.activity - a.activity);
  const topTwo = combined.slice(0, 2);
  activity.sort((a, b) => b - a);
  console.log(
    `Monkey ${topTwo[0].id} inspected ${topTwo[0].activity} objects and Monkey ${topTwo[1].id} inspected ${topTwo[1].activity} objects. The multiplied answer is ${topTwo[0].activity * topTwo[1].activity}`
  );
};

partOne();
partTwo();


