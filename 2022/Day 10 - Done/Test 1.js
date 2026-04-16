import fs from "node:fs";

import { ocr } from "../../.cache/upstream/shahata/src/utils/ocr.js";

export function part1(input) {
  let lines = input.split("\n");
  let sum = 0;
  let cycle = 0;
  let x = 1;
  function progress() {
    cycle++;
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      sum += x * cycle;
    }
  }
  for (let line of lines) {
    if (line === "noop") progress();
    else {
      progress();
      progress();
      x += +line.split(" ").pop();
    }
  }
  return sum;
}

export function part2(input) {
  let lines = input.split("\n");
  let result = "";
  let cycle = 0;
  let x = 1;
  function progress() {
    if (cycle % 40 === 0) result += "\n";
    result += Math.abs((cycle % 40) - x) <= 1 ? "#" : ".";
    cycle++;
  }
  for (let line of lines) {
    if (line === "noop") progress();
    else {
      progress();
      progress();
      x += +line.split(" ").pop();
    }
  }
  return ocr(result);
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
