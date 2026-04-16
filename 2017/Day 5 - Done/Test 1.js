import fs from "node:fs";

function solve(maze, mutate) {
  let current = 0;
  let steps = 0;
  while (maze[current] !== undefined) {
    let prev = maze[current];
    maze[current] = mutate(maze[current]);
    current += prev;
    steps++;
  }
  return steps;
}

function parse(input) {
  return input.split("\n").map(Number);
}

export function part1(input) {
  return solve(parse(input), x => x + 1);
}

export function part2(input) {
  return solve(parse(input), x => (x >= 3 ? x - 1 : x + 1));
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
