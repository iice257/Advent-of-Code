import fs from "node:fs";

export function part1(input) {
  return input.split("\n").filter(x => {
    let words = x.split(/\s+/).sort();
    return (
      words.length === words.filter((x, i, arr) => x !== arr[i + 1]).length
    );
  }).length;
}

export function part2(input) {
  return input.split("\n").filter(x => {
    let words = x
      .split(/\s+/)
      .map(x => x.split("").sort().join(""))
      .sort();
    return (
      words.length === words.filter((x, i, arr) => x !== arr[i + 1]).length
    );
  }).length;
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
