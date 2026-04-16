import fs from "node:fs";

function transform(yard, x, y) {
  let current = yard[y][x];
  let neighbors = [
    yard[y - 1] && yard[y - 1][x - 1],
    yard[y - 1] && yard[y - 1][x + 0],
    yard[y - 1] && yard[y - 1][x + 1],
    yard[y + 0] && yard[y + 0][x - 1],
    yard[y + 0] && yard[y + 0][x + 1],
    yard[y + 1] && yard[y + 1][x - 1],
    yard[y + 1] && yard[y + 1][x + 0],
    yard[y + 1] && yard[y + 1][x + 1],
  ];
  let total = cell => neighbors.filter(x => x === cell).length;
  if (current === "." && total("|") >= 3) {
    return "|";
  } else if (current === "|" && total("#") >= 3) {
    return "#";
  } else if (current === "#" && (total("#") === 0 || total("|") === 0)) {
    return ".";
  } else {
    return current;
  }
}

let memo = {};
function next(yard, minute) {
  let hash = yard.map(x => x.join("")).join("\n");
  if (!memo[hash]) {
    let result = yard.map((line, y) =>
      line.map((cell, x) => transform(yard, x, y)),
    );
    memo[hash] = { result, minute };
  }
  return memo[hash];
}

export function part1(input, minutes = 10) {
  let yard = input.split("\n").map(x => x.split(""));
  for (let i = 0; i < minutes; i++) {
    let { result, minute } = next(yard, i);
    let diff = i - minute;
    yard = result;
    if (diff > 0) {
      i += diff * Math.floor((minutes - i - 1) / diff);
    }
  }
  let total = yard.reduce(
    (sum, line) => ({
      trees: sum.trees + line.filter(x => x === "|").length,
      lumberyards: sum.lumberyards + line.filter(x => x === "#").length,
    }),
    { trees: 0, lumberyards: 0 },
  );
  return total.trees * total.lumberyards;
}

export function part2(input) {
  return part1(input, 1000000000);
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
