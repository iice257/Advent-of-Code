import fs from "node:fs";

export function part1(input) {
  let count = 0;
  let m = input.split("\n");
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      let lookups = [
        [m[i][j], m[i + 1]?.[j], m[i + 2]?.[j], m[i + 3]?.[j]],
        [m[i][j], m[i]?.[j + 1], m[i]?.[j + 2], m[i]?.[j + 3]],
        [m[i][j], m[i + 1]?.[j + 1], m[i + 2]?.[j + 2], m[i + 3]?.[j + 3]],
        [m[i][j], m[i - 1]?.[j + 1], m[i - 2]?.[j + 2], m[i - 3]?.[j + 3]],
      ].map(lookup => lookup.join(""));
      count += lookups.filter(x => x === "XMAS" || x === "SAMX").length;
    }
  }
  return count;
}

export function part2(input) {
  let count = 0;
  let m = input.split("\n");
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      let lookups = [
        [m[i][j], m[i + 1]?.[j + 1], m[i + 2]?.[j + 2]],
        [m[i][j + 2], m[i + 1]?.[j + 1], m[i + 2]?.[j]],
      ].map(lookup => lookup.join(""));
      if (lookups.every(x => x === "MAS" || x === "SAM")) count++;
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
