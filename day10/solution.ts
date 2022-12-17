import { readFileSync } from "fs";

const dataInput: { output: string, value?: number }[] = readFileSync("input.txt", "utf-8")
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((line) => {
    const input = line.split(" ");
    const response: { output: string, value?: number } = { output: input[0] };
    if (response.output === "addx") {
      response.value = parseInt(input[1]);
  }
  return response;
});

class CPU {
  program: { output: string, value?: number }[];
  currentLine: number;
  cycle: number;
  wait: number;
  registers: { X: number };

  constructor(program: { output: string, value?: number }[]) {
    this.program = program;
    this.currentLine = 0;
    this.cycle = 1;
    this.wait = 0;
    this.registers = {
      X: 1,
    };
  }

  runCycle(): boolean {
    if (this.currentLine >= this.program.length) {
      return false;
    }
    this.cycle++;

    const line = this.program[this.currentLine];

    // Define the dispatch table
    const dispatch = {
      noop: () => this.currentLine++,
      addx: () => this.wait === 0 ? this.wait = 1 : (this.wait--, this.registers.X += line.value, this.currentLine++)
    };

    // Call the appropriate function from the dispatch table
    const handler = dispatch[line.output];
    if (!handler) {
      throw new Error("unknown output: " + line.output);
    }
    handler();
    return true;
  }
};

const partOne = () => {
  const cpu = new CPU(dataInput);
  let sum = 0;
  // while statement that will check if the cpu is running and if it is, it will run the cycle if not it will return false.
  while (cpu.runCycle()) {
    sum += cpu.cycle % 40 === 20 ? cpu.cycle * cpu.registers.X : 0;
  }
  console.log(sum);
}

class CRT {
  width: number;
  height: number;
  currentIndex: number;
  content: string[][];

  constructor(width: number = 40, height: number = 6) {
    this.width = width;
    this.height = height;
    this.currentIndex = 0;
    this.content = Array.from({ length: this.height }, () => new Array(this.width).fill(" ")
    );
  }

  runCycle(spritePosition: number) {
    const x = this.currentIndex % this.width;
    const y = Math.floor(this.currentIndex / this.width);

    if (y >= this.height) {
      return;
    }
    this.content[y][x] = Math.abs(x - spritePosition) < 2 ? "#" : " ";

    this.currentIndex++;
  }
  printScreen() {
    console.log(this.content.map((line) => line.join("")).join("\n"));
  }
};

const partTwo = () => {
  const cpu = new CPU(dataInput);
  const crt = new CRT();
  while (true) {
    crt.runCycle(cpu.registers.X);
    if (!cpu.runCycle()) {
      break;
    }
  }
  crt.printScreen();
};

partOne();
partTwo();