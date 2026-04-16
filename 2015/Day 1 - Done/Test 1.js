import fs from "node:fs";

function parse(input) {
  return input.split("").map(x => (x === "(" ? 1 : -1));
}

export function part1(input) {
  return parse(input).reduce((sum, x) => sum + x);
}

export function part2(input) {
  return parse(input).reduce(
    (state, x, index) => ({
      sum: state.sum + x,
      marker: state.marker || (state.sum + x === -1 ? index + 1 : undefined),
    }),
    { sum: 0, marker: undefined },
  ).marker;
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
