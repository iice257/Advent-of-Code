import fs from "node:fs";

function calc(subject, loop) {
  let value = 1;
  for (let j = 0; j < loop; j++) {
    value = value * subject;
    value = value % 20201227;
  }
  return value;
}

export function part1(input) {
  let keys = input.split("\n").map(Number);
  let value = 1;
  for (let loop = 1; loop < Infinity; loop++) {
    value = value * 7;
    value = value % 20201227;
    if (value === keys[0]) {
      return calc(keys[1], loop);
    }
    if (value === keys[1]) {
      return calc(keys[0], loop);
    }
  }
}

export function part2() {
  return undefined;
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
