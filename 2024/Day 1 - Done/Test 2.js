import fs from "node:fs";

export function part1(input) {
  let lists = input.split("\n").map(line => line.split(/\s+/).map(Number));
  let left = lists.map(a => a[0]).sort((a, b) => a - b);
  let right = lists.map(a => a[1]).sort((a, b) => a - b);
  let scores = left.map((x, i) => Math.abs(x - right[i]));
  return scores.reduce((a, b) => a + b);
}

export function part2(input) {
  let lists = input.split("\n").map(line => line.split(/\s+/).map(Number));
  let left = lists.map(a => a[0]).sort((a, b) => a - b);
  let right = lists.map(a => a[1]).sort((a, b) => a - b);
  let scores = left.map(x => x * right.filter(y => y === x).length);
  return scores.reduce((a, b) => a + b);
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
