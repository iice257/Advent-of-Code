import fs from "node:fs";

function value(arr, part1 = false) {
  let [childCount, metaCount] = arr.splice(0, 2);
  let children = new Array(childCount).fill().map(() => value(arr, part1));
  let result = arr.splice(0, metaCount);
  if (part1) {
    result = result.concat(children);
  } else if (childCount > 0) {
    result = result.map(x => children[x - 1] || 0);
  }
  return result.reduce((sum, x) => sum + x, 0);
}

export function part1(input) {
  return value(input.split(" ").map(Number), true);
}

export function part2(input) {
  return value(input.split(" ").map(Number));
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
