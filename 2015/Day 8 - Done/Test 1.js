import fs from "node:fs";

export function part1(input) {
  return input
    .split("\n")
    .map(x => x.length - eval(x).length)
    .reduce((sum, x) => sum + x);
}

export function part2(input) {
  return input
    .split("\n")
    .map(x => JSON.stringify(x).length - x.length)
    .reduce((sum, x) => sum + x);
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
