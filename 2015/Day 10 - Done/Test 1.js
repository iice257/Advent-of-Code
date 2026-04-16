import fs from "node:fs";

function transform(s) {
  return s
    .match(/(.)\1*/g)
    .map(x => `${x.length}${x[0]}`)
    .join("");
}

export function part1(input, times = 40) {
  return new Array(times).fill().reduce(prev => transform(prev), input).length;
}

export function part2(input, times = 50) {
  return new Array(times).fill().reduce(prev => transform(prev), input).length;
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
