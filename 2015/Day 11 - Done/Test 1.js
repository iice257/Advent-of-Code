import fs from "node:fs";

const abc = "abcdefghijklmnopqrstuvwxyz";
const subStrings = abc
  .split("")
  .map((x, i) => abc.substr(i, 3))
  .filter(x => x.length === 3);

function ok(s) {
  return (
    s.match(/^[a-z]*$/) &&
    s.match(/^[^iol]*$/) &&
    s.match(/(.)\1.*(.)\2/) &&
    subStrings.some(sub => s.indexOf(sub) > -1)
  );
}

function next(password) {
  let s = parseInt(password, 36);
  do {
    s++;
  } while (!ok(s.toString(36)));
  return s.toString(36);
}

export function part1(input) {
  return next(input);
}

export function part2(input) {
  return next(next(input));
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
