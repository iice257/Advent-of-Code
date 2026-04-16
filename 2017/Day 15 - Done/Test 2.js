import fs from "node:fs";

function next(x, factor, validator) {
  do {
    x = (x * factor) % 2147483647;
  } while (x % validator !== 0);
  return x;
}

function judge(a, b, validators, times) {
  let count = 0;
  for (let i = 0; i < times; i++) {
    a = next(a, 16807, validators[0]);
    b = next(b, 48271, validators[1]);
    if (a % 65536 === b % 65536) {
      count++;
    }
  }
  return count;
}

function parse(input) {
  return input.split("\n").map(x => +x.match(/\d+$/).pop());
}

export function part1(input, times = 4e7) {
  return judge(...parse(input), [1, 1], times);
}

export function part2(input, times = 5e6) {
  return judge(...parse(input), [4, 8], times);
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
