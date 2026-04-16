import fs from "node:fs";

import { divisors } from "../../.cache/upstream/shahata/src/utils/divisors.js";

export function day(input, part1Only = false) {
  input = +input;
  let part1, part2;
  for (let i = 1; part1Only ? !part1 : !part1 || !part2; i++) {
    let numbers = divisors(i);
    let sum = numbers.reduce((sum, x) => sum + x, 0);
    let sub = numbers
      .filter(x => x < Math.ceil(i / 50))
      .reduce((sum, x) => sum + x, 0);
    if (!part1 && sum * 10 >= input) {
      part1 = i;
    }
    if (!part2 && (sum - sub) * 11 >= input) {
      part2 = i;
    }
  }
  return { part1, part2 };
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
