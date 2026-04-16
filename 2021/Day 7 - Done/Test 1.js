import fs from "node:fs";

export function part1(input, cost = (a, b) => Math.abs(a - b)) {
  let positions = input.split(",").map(Number);
  let min = Math.min(...positions);
  let max = Math.max(...positions);
  let distances = [];
  for (let i = min; i <= max; i++) {
    distances.push(positions.reduce((prev, x) => prev + cost(x, i), 0));
  }
  return Math.min(...distances);
}

export function part2(input) {
  return part1(input, (a, b) => (Math.abs(a - b) * (Math.abs(a - b) + 1)) / 2);
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
