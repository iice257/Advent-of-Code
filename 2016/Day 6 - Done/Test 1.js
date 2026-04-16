import fs from "node:fs";

function solve(input) {
  return input
    .split("\n")
    .map(x => x.split(""))
    .reduce((commons, word) => {
      return word.map((c, i) => {
        commons[i] = commons[i] || {};
        commons[i] = { ...commons[i], [c]: (commons[i][c] || 0) + 1 };
        return commons[i];
      });
    }, [])
    .map(occurrences => {
      return Object.keys(occurrences)
        .map(x => ({ letter: x, times: occurrences[x] }))
        .sort((a, b) => b.times - a.times)
        .map(x => x.letter);
    });
}

export function part1(input) {
  return solve(input)
    .map(x => x.shift())
    .join("");
}

export function part2(input) {
  return solve(input)
    .map(x => x.pop())
    .join("");
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
