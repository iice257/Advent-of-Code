import fs from "node:fs";

export function part1(input, count = 2020) {
  let start = input.split(",").map(Number);
  let map = new Map(start.map((x, i) => [x, i]));

  let curr;
  let next = 0;
  for (let i = start.length; i < count; i++) {
    curr = next;
    next = map.has(curr) ? i - map.get(curr) : 0;
    map.set(curr, i);
  }
  return curr;
}

export function part2(input) {
  return part1(input, 30000000);
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
