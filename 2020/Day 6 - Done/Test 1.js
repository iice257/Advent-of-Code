import fs from "node:fs";

export function part1(input) {
  return input
    .split("\n\n")
    .map(x => new Set(x.replace(/\n/g, "").split("")).size)
    .reduce((a, b) => a + b);
}

export function part2(input) {
  return input
    .split("\n\n")
    .map(x => {
      let merged = x.replace(/\n/g, "").split("").sort().join("");
      let count = x.split("\n").length;
      return merged.match(new RegExp(`(.)\\1{${count - 1}}`, "g"))?.length || 0;
    })
    .reduce((a, b) => a + b);
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
