import fs from "node:fs";

export function part1(input) {
  return input.split("\n").reduce((prev, x) => prev + +x, 0);
}

export function part2(input) {
  let numbers = input.split("\n").map(Number);
  let visited = new Set();
  let current = 0;
  let frequency = 0;
  while (!visited.has(frequency)) {
    visited.add(frequency);
    frequency += numbers[current % numbers.length];
    current++;
  }
  return frequency;
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
