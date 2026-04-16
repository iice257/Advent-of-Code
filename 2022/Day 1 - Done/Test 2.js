import fs from "node:fs";

export function part1(input, top = 1) {
  let elves = input
    .split("\n\n")
    .map(x =>
      x
        .split("\n")
        .map(x => +x)
        .reduce((a, b) => a + b),
    )
    .sort((a, b) => b - a);
  return elves.slice(0, top).reduce((a, b) => a + b);
}

export function part2(input) {
  return part1(input, 3);
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
