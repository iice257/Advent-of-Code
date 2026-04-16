import fs from "node:fs";

export function part1(input) {
  let result = input.matchAll(/mul\((\d+),(\d+)\)/g).map(x => x[1] * x[2]);
  return result.reduce((a, b) => a + b, 0);
}

export function part2(input) {
  let result = input.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g);
  let enabled = true;
  let sum = 0;
  for (let x of result) {
    if (x[0] === "do()") enabled = true;
    if (x[0] === "don't()") enabled = false;
    if (enabled && x[0].startsWith("mul(")) sum += x[1] * x[2];
  }
  return sum;
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
