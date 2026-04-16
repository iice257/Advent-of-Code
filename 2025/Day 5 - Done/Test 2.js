import fs from "node:fs";

export function part1(input) {
  let [ranges, ids] = input.split("\n\n");
  ranges = ranges.split("\n").map(x => x.split("-").map(Number));
  ids = ids.split("\n").map(Number);
  return ids.filter(id => {
    return ranges.some(range => id >= range[0] && id <= range[1]);
  }).length;
}

export function part2(input) {
  let [ranges] = input.split("\n\n");
  ranges = ranges.split("\n").map(x => x.split("-").map(Number));
  ranges = ranges.sort((a, b) => a[0] - b[0]);
  let sum = 0;
  let range = ranges.shift();
  while (range) {
    let next = ranges.shift();
    while (next && next[0] >= range[0] && next[0] <= range[1]) {
      range[1] = Math.max(range[1], next[1]);
      next = ranges.shift();
    }
    sum += range[1] - range[0] + 1;
    range = next;
  }
  return sum;
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
