import fs from "node:fs";

export function part1(input, days = 80) {
  let fish = input.split(",").map(Number);
  let map = {};
  for (let i = 0; i < fish.length; i++) {
    map[fish[i]] = (map[fish[i]] || 0) + 1;
  }
  for (let i = 0; i < days; i++) {
    let next = {};
    for (let key in map) {
      if (key === "0") {
        next[6] = (next[6] || 0) + map[key];
        next[8] = (next[8] || 0) + map[key];
      } else {
        next[+key - 1] = (next[+key - 1] || 0) + map[key];
      }
    }
    map = next;
  }
  return Object.values(map).reduce((a, b) => a + b, 0);
}

export function part2(input) {
  return part1(input, 256);
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
