import fs from "node:fs";

function solve(lines) {
  let pos = { x: 0, y: 0 };
  let outline = 0;
  let area = 0;

  for (let { direction, count } of lines) {
    let next;
    if (direction === "L") next = { x: pos.x - count, y: pos.y };
    if (direction === "R") next = { x: pos.x + count, y: pos.y };
    if (direction === "U") next = { x: pos.x, y: pos.y - count };
    if (direction === "D") next = { x: pos.x, y: pos.y + count };
    area += (pos.x * next.y - pos.y * next.x) / 2; //shoelace formula
    outline += count;
    pos = next;
  }
  let innerArea = Math.abs(area) - (outline / 2 - 1); //pick's theorem
  return innerArea + outline;
}

export function part1(input) {
  let lines = input.split("\n").map(line => {
    let [direction, count] = line.split(" ");
    return { direction, count: +count };
  });
  return solve(lines);
}

export function part2(input) {
  let lines = input.split("\n").map(line => {
    let [, , color] = line.split(" ");
    let count = parseInt(color.slice(2, -2), 16);
    let direction = "RDLU".at(color.slice(-2, -1));
    return { direction, count };
  });
  return solve(lines);
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
