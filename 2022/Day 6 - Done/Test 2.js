import fs from "node:fs";

export function part1(input, len = 4) {
  for (let i = 0; i < input.length; i++) {
    let slice = input.slice(i, i + len);
    if (new Set(slice.split("")).size === len) {
      return i + len;
    }
  }
}

export function part2(input) {
  return part1(input, 14);
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
