import fs from "node:fs";

const u = x => x.toUpperCase();
const abc = "abcdefghijklmnopqrstuvwxyz".split("");
const kill = abc.reduce((arr, x) => arr.concat([x + u(x), u(x) + x]), []);

export function part1(input) {
  let len;
  let remove = x => (input = input.replace(x, ""));
  while (input.length !== len) {
    len = input.length;
    kill.forEach(remove);
  }
  return input.length;
}

export function part2(input) {
  let options = abc.map(x => new RegExp(x, "ig"));
  return Math.min(...options.map(x => part1(input.replace(x, ""))));
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
