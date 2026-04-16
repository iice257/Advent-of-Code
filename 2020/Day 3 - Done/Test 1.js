import fs from "node:fs";

export function part1(input, right = 3, down = 1) {
  let map = input
    .split("\n")
    .map(line => line.split("").map(x => (x === "#" ? 1 : 0)));
  let point = { x: 0, y: 0 };
  let trees = 0;
  while (point.y < map.length) {
    trees += map[point.y][point.x];
    point = { x: (point.x + right) % map[0].length, y: point.y + down };
  }
  return trees;
}

export function part2(input) {
  return (
    part1(input, 1, 1) *
    part1(input, 3, 1) *
    part1(input, 5, 1) *
    part1(input, 7, 1) *
    part1(input, 1, 2)
  );
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
