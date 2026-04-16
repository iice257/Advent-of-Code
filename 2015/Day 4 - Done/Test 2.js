import fs from "node:fs";

import md5 from "../../.cache/upstream/shahata/src/utils/md5.js";

function solve(input, prefix) {
  let result = 1;
  while (!md5(input + result).startsWith(prefix)) {
    result++;
  }
  return result;
}

export function part1(input) {
  return solve(input, "00000");
}

export function part2(input) {
  return solve(input, "000000");
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
