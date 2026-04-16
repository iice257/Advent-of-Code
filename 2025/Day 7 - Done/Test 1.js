import fs from "node:fs";

function solve(input) {
  let map = input.split("\n");
  let curr = map.findIndex(x => x.includes("S"));
  let beams = new Map([[map[curr].indexOf("S"), 1]]);
  let splits = 0;
  let timelines = 1;
  while (map[curr]) {
    let next = new Map();
    let add = (x, count) => next.set(x, (next.get(x) || 0) + count);
    beams.forEach((count, x) => {
      if (map[curr][x] === ".") add(x, count);
      else {
        add(x - 1, count);
        add(x + 1, count);
        splits++;
        timelines += count;
      }
    });
    beams = next;
    curr++;
  }
  return { splits, timelines };
}

export function part1(input) {
  return solve(input).splits;
}

export function part2(input) {
  return solve(input).timelines;
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
