import fs from "node:fs";

import { combinations } from "../../_shared/shims/combinatorial-generators.mjs";

export function part1(input, preamble = 25) {
  let numbers = input.split("\n").map(Number);
  let stack = [];
  for (let i = 0; i < numbers.length; i++) {
    if (stack.length === preamble) {
      let sums = [...combinations(stack, 2)].map(x => x[0] + x[1]);
      if (!sums.includes(numbers[i])) {
        return numbers[i];
      }
      stack.pop();
    }
    stack.unshift(numbers[i]);
  }
}

export function part2(input, preamble = 25) {
  let target = part1(input, preamble);
  let numbers = input.split("\n").map(Number);
  for (let i = 0; i < numbers.length; i++) {
    let sum, j;
    for (j = i, sum = 0; sum < target; j++) {
      sum += numbers[j];
    }
    if (sum === target) {
      let slice = numbers.slice(i, j);
      return Math.min(...slice) + Math.max(...slice);
    }
  }
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
