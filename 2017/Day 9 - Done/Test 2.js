import fs from "node:fs";

function parse({ score, level, removed, mode }, next) {
  if (mode === "read") {
    switch (next) {
      case "{":
        return { level: level + 1, score: score + level + 1, removed, mode };
      case "}":
        return { level: level - 1, score, removed, mode };
      case "<":
        return { level, score, removed, mode: "garbage" };
      case "!":
        return { level, score, removed, mode: "ignore-read" };
      default:
        return { level, score, removed, mode };
    }
  } else if (mode === "garbage") {
    switch (next) {
      case ">":
        return { level, score, removed, mode: "read" };
      case "!":
        return { level, score, removed, mode: "ignore-garbage" };
      default:
        return { level, score, removed: removed + 1, mode };
    }
  } else {
    return { level, score, removed, mode: mode.replace("ignore-", "") };
  }
}

function process(input) {
  return input
    .split("")
    .reduce(parse, { score: 0, level: 0, removed: 0, mode: "read" });
}

export function part1(input) {
  return process(input).score;
}

export function part2(input) {
  return process(input).removed;
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
