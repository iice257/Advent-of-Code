import fs from "node:fs";

function isSafe(line) {
  let result = line.map((num, i) => i > 0 && num - line[i - 1]).slice(1);
  return (
    result.every(num => num >= 1 && num <= 3) ||
    result.every(num => num <= -1 && num >= -3)
  );
}

export function part1(input) {
  let lines = input.split("\n").map(line => line.split(" ").map(Number));
  return lines.filter(isSafe).length;
}

export function part2(input) {
  let lines = input.split("\n").map(line => line.split(" ").map(Number));
  return lines.filter(line => {
    return line.map((x, i) => line.toSpliced(i, 1)).find(isSafe);
  }).length;
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
