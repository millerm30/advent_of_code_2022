import { readFileSync } from 'fs';

const getOperationFunction = (input: string) => {
  return function (old: any) {
    const string = input.replace(/old/, old);
    // Warning: do not use in prod
    return eval(string);
  };
};

interface Monkey {
  id: number;
  totalInspectedObjects: number;
  items: number[];
  divisibleBy: number;
  operation: (old: any) => any;
  sendTo: (item: number) => number;
}

const getMonkeys = (): Monkey[] => {
  const monkeys = readFileSync('./input.txt', { encoding: 'utf-8' })
    .split('\n\n') // split the input into monkeys
    // map the monkeys into an object
    .map((lines: string, monkeyId: number) => {
      const items = lines
        .match(/Starting items(?:[:,] (\d+))+/g)[0]
        .split(': ')[1]
        .split(', ')
        .map(Number);
      const operation = lines.match(/= ([^\n]+)/)[1];
      // 
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
        sendTo: (item: number) =>
          item % divisibleBy === 0 ? whenTrueSendTo : whenFalseSendTo,
      };
    });
    //console.log(monkeys);
  return monkeys;
};

const partOne = () => {
  // get the monkeys
  const monkeys = getMonkeys();
  // run the simulation for 20 rounds
  for (let i = 0; i < 20; i++) {
    // for each monkey
    monkeys.forEach((monkey) => {
      // get the items
      let items = monkey.items;
      // while there are items
      while (items.length) {
        // get the first item
        let item = items.shift();
        // increment the total inspected objects
        monkey.totalInspectedObjects++;

        // perform the operation
        item = monkey.operation(item);
        // send the item to the correct monkey
        item = Math.floor(item / 3);
        const destination = monkey.sendTo(item);

        monkeys[destination].items.push(item);
      }
    });
  }
  // get the id's of the monkeys
  const ids = monkeys.map((m) => m.id);
  // get the activity of the monkeys
  const activity = monkeys.map((m) => m.totalInspectedObjects);
  // combine the id's and activity
  const combined = ids.map((id, index) => ({ id, activity: activity[index] }));
  // sort the combined array by activity
  combined.sort((a, b) => b.activity - a.activity);
  // get the top two
  const topTwo = combined.slice(0, 2);
  // provide the answer
  console.log(
    `Monkey ${topTwo[0].id} inspected ${topTwo[0].activity} objects and Monkey ${topTwo[1].id} inspected ${topTwo[1].activity} objects. The multiplied answer is ${topTwo[0].activity * topTwo[1].activity}`
  );
};


const partTwo = () => {
  // get the monkeys
  const monkeys = getMonkeys();
  // get the divider
  const divider = monkeys.map((m) => m.divisibleBy).reduce((a, b) => a * b, 1);
  // run the simulation for 10000 rounds
  for (let i = 0; i < 10000; i++) {
    // for each monkey
    for (const monkey of monkeys) {
      // get the items
      let items = monkey.items;
      // while there are items
      while (items.length) {
        // get the first item
        let item = items.shift();
        // increment the total inspected objects
        monkey.totalInspectedObjects++;

        // perform the operation
        item = monkey.operation(item);
        // send the item to the correct monkey
        item = item % divider;
        const destination = monkey.sendTo(item);

        monkeys[destination].items.push(item);
      }
    }
  }
  // get the id's of the monkeys
  const ids = monkeys.map((m) => m.id);
  // get the activity of the monkeys
  const activity = monkeys.map((m) => m.totalInspectedObjects);
  // combine the id's and activity
  const combined = ids.map((id, index) => ({ id, activity: activity[index] }));
  // sort the combined array by activity
  combined.sort((a, b) => b.activity - a.activity);
  // get the top two
  const topTwo = combined.slice(0, 2);
  // provide the answer
  activity.sort((a, b) => b - a);
  console.log(
    `Monkey ${topTwo[0].id} inspected ${topTwo[0].activity} objects and Monkey ${topTwo[1].id} inspected ${topTwo[1].activity} objects. The multiplied answer is ${topTwo[0].activity * topTwo[1].activity}`
  );
};

partOne();
partTwo();


