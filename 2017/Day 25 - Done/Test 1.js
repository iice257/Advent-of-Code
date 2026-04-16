import fs from "node:fs";

function parse(input) {
  let initial, diagnostic, currentState, currentValue;
  let lines = input.split("\n");
  let states = {};
  for (let line of lines) {
    let [word] = line.match(/\w+/) || [];
    let [, param] = line.match(/([^\s]*).$/) || [];
    if (word === "Begin") {
      initial = param;
    } else if (word === "Perform") {
      [, diagnostic] = line.match(/(\d+) steps.$/);
    } else if (word === "In") {
      currentState = param;
      states[currentState] = [];
    } else if (word === "If") {
      currentValue = param;
      states[currentState][currentValue] = {};
    } else if (word === "Write") {
      states[currentState][currentValue].write = param;
    } else if (word === "Move") {
      states[currentState][currentValue].move = param;
    } else if (word === "Continue") {
      states[currentState][currentValue].next = param;
    }
  }
  return { initial, diagnostic: +diagnostic, states };
}

export function part1(input) {
  let { initial, diagnostic, states } = parse(input);
  let tape = {};
  let position = 0,
    currentState = initial;
  for (let i = 0; i < diagnostic; i++) {
    let currentValue = tape[position] || "0";
    tape[position] = states[currentState][currentValue].write;
    position += states[currentState][currentValue].move === "left" ? -1 : 1;
    currentState = states[currentState][currentValue].next;
  }
  return Object.values(tape).filter(x => x === "1").length;
}

export function part2() {
  return undefined;
}

const input = fs
  .readFileSync(new URL("input.txt", import.meta.url), "utf8")
  .replace(/\uFEFF/g, "")
  .replace(/\r\n/g, "\n")
  .replace(/\r/g, "\n")
  .trimEnd();

const solution = typeof day === "function" ? await day(input) : undefined;
const answer = (typeof part1 === "function" ? await part1(input) : solution?.part1);

if (answer !== undefined && answer !== null) {
  console.log(typeof answer === "bigint" ? answer.toString() : answer);
}
