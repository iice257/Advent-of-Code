import fs from "node:fs";

function parse(input) {
  return input.split("\n").map(x => x.split("x").map(Number));
}

export function part1(input) {
  return parse(input)
    .map(x => [x[0] * x[1], x[1] * x[2], x[0] * x[2]])
    .map(x => 2 * (x[0] + x[1] + x[2]) + Math.min(...x))
    .reduce((prev, item) => prev + item);
}

export function part2(input) {
  return parse(input)
    .map(x => 2 * (x[0] + x[1] + x[2] - Math.max(...x)) + x[0] * x[1] * x[2])
    .reduce((prev, item) => prev + item);
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
