import fs from "node:fs";

export function part1(input) {
  return input
    .split("")
    .map(Number)
    .filter((x, i, arr) => x === arr[(i + 1) % arr.length])
    .reduce((sum, x) => sum + x, 0);
}

export function part2(input) {
  return input
    .split("")
    .map(Number)
    .filter((x, i, arr) => x === arr[(i + arr.length / 2) % arr.length])
    .reduce((sum, x) => sum + x, 0);
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
