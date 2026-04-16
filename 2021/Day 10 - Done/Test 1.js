import fs from "node:fs";

function clean(line) {
  for (let len = 0; line.length !== len; ) {
    len = line.length;
    line = line.replaceAll(/\(\)|\[\]|\{\}|<>/g, "");
  }
  return line;
}

function score(line) {
  let points = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
  return points[line.split("").find(c => ")]}>".includes(c))] || 0;
}

function score2(line) {
  let points = { "(": 1, "[": 2, "{": 3, "<": 4 };
  let chars = line.split("").reverse();
  return chars.reduce((total, c) => total * 5 + points[c], 0);
}

export function part1(input) {
  let scores = input.split("\n").map(x => score(clean(x)));
  return scores.reduce((a, b) => a + b);
}

export function part2(input) {
  let incomplete = input.split("\n").filter(x => score(clean(x)) === 0);
  let scores = incomplete.map(x => score2(clean(x))).sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
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
