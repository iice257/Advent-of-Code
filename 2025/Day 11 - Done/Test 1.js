import fs from "node:fs";

import { memoize } from "../../.cache/upstream/shahata/src/utils/memoize.js";

let solve = memoize((devices, curr, dac = true, fft = true) => {
  if (curr === "out") return dac && fft ? 1 : 0;
  return devices[curr].reduce(
    (sum, next) =>
      sum + solve(devices, next, dac || curr === "dac", fft || curr === "fft"),
    0,
  );
});

function parse(input) {
  return Object.fromEntries(
    input.split("\n").map(line => {
      let [name, rest] = line.split(": ");
      return [name, rest.split(" ")];
    }),
  );
}

export function part1(input) {
  return solve(parse(input), "you");
}

export function part2(input) {
  return solve(parse(input), "svr", false, false);
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
