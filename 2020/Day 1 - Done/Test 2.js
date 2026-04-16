import fs from "node:fs";

import { combinations } from "../../_shared/shims/combinatorial-generators.mjs";

export function part1(input) {
  let items = input.split("\n").map(Number);
  for (let x of combinations(items, 2)) {
    if (x[0] + x[1] === 2020) return x[0] * x[1];
  }
}

export function part2(input) {
  let items = input.split("\n").map(Number);
  for (let x of combinations(items, 3)) {
    if (x[0] + x[1] + x[2] === 2020) return x[0] * x[1] * x[2];
  }
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
