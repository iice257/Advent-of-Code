import fs from "node:fs";

export function part1(input) {
  let numbers = input
    .split("\n")
    .map(Number)
    .concat(0)
    .sort((a, b) => a - b);
  let map = new Map([
    [1, 0],
    [2, 0],
    [3, 1],
  ]);
  for (let i = 1; i < numbers.length; i++) {
    let diff = numbers[i] - numbers[i - 1];
    map.set(diff, map.get(diff) + 1);
  }
  return map.get(1) * map.get(3);
}

export function part2(input) {
  let numbers = input
    .split("\n")
    .map(Number)
    .concat(0)
    .sort((a, b) => a - b);
  let map = new Map([[0, 1]]);
  for (let i = 1; i < numbers.length; i++) {
    let ways =
      (map.get(numbers[i] - 1) || 0) +
      (map.get(numbers[i] - 2) || 0) +
      (map.get(numbers[i] - 3) || 0);
    map.set(numbers[i], ways);
  }
  return map.get(numbers.pop());
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
