import fs from "node:fs";

import { combinations } from "../../_shared/shims/combinatorial-generators.mjs";

function f(boxes, total, part) {
  let rest = (all, sub) => all.filter(x => sub.indexOf(x) === -1);
  let product = x => x.reduce((p, x) => p * x);

  for (let i = 1; i <= boxes.length; i++) {
    let options = [...combinations(boxes, i)].filter(
      a => a.reduce((s, x) => s + x) === total,
    );
    if (options.length) {
      if (part === 1) {
        return true;
      } else {
        let good = options
          .sort((a, b) => product(a) - product(b))
          .find(x => f(rest(boxes, x), total, part - 1));
        return product(good);
      }
    }
  }
}

function solve(input, x) {
  let boxes = input.split("\n").map(Number);
  let total = boxes.reduce((sum, x) => sum + x);
  return f(boxes, total / x, x);
}

export function part1(input) {
  return solve(input, 3);
}

export function part2(input) {
  return solve(input, 4);
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
