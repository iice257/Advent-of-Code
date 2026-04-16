import fs from "node:fs";

export function part1(input) {
  let count = 0;
  let pairs = input
    .split("\n")
    .map(pair => pair.split(",").map(x => x.split("-").map(x => +x)));
  for (let pair of pairs) {
    let [a, b] = pair;
    if (a[0] >= b[0] && a[1] <= b[1]) {
      count++;
    } else if (b[0] >= a[0] && b[1] <= a[1]) {
      count++;
    }
  }
  return count;
}

export function part2(input) {
  let count = 0;
  let pairs = input
    .split("\n")
    .map(pair => pair.split(",").map(x => x.split("-").map(x => +x)));
  for (let pair of pairs) {
    let [a, b] = pair;
    if (a[0] >= b[0] && a[0] <= b[1]) {
      count++;
    } else if (b[0] >= a[0] && b[0] <= a[1]) {
      count++;
    }
  }
  return count;
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
