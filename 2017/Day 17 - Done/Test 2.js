import fs from "node:fs";

function add1({ steps, current, state }, number) {
  current = ((current + steps) % number) + 1;
  state.splice(current, 0, number);
  return { steps, current, state };
}

export function part1(input, lookFor = 2017) {
  let spinner = {
    steps: +input,
    current: 0,
    state: [0],
  };
  for (let i = 1; i <= 2017; i++) {
    spinner = add1(spinner, i);
  }
  return spinner.state[
    (spinner.state.indexOf(lookFor) + 1) % spinner.state.length
  ];
}

function add2({ steps, current, zeroPosition, result }, number) {
  current = ((current + steps) % number) + 1;
  if (current === zeroPosition + 1) {
    result = number;
  } else if (current <= zeroPosition) {
    zeroPosition++;
  }
  return { steps, current, zeroPosition, result };
}

export function part2(input, times = 5e7) {
  let spinner = {
    steps: +input,
    current: 0,
    zeroPosition: 0,
    result: undefined,
  };
  for (let i = 1; i <= times; i++) {
    spinner = add2(spinner, i);
  }
  return spinner.result;
}

const input = fs
  .readFileSync(new URL("input.txt", import.meta.url), "utf8")
  .replace(/\uFEFF/g, "")
  .replace(/\r\n/g, "\n")
  .replace(/\r/g, "\n")
  .trimEnd();

const solution = typeof day === "function" ? await day(input) : undefined;
const answer = (typeof part2 === "function" ? await part2(input) : solution?.part2);

if (answer !== undefined && answer !== null) {
  console.log(typeof answer === "bigint" ? answer.toString() : answer);
}
