import fs from "node:fs";

export function part1(input) {
  return input
    .split("\n")
    .map(x => Math.floor(+x / 3) - 2)
    .reduce((a, b) => a + b);
}

export function part2(input) {
  return input
    .split("\n")
    .map(x => {
      let fuel = Math.floor(+x / 3) - 2;
      let extra = fuel;
      while (extra > 0) {
        extra = Math.max(Math.floor(extra / 3) - 2, 0);
        fuel += extra;
      }
      return fuel;
    })
    .reduce((a, b) => a + b);
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
