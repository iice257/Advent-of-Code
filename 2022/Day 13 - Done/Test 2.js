import fs from "node:fs";

function check(a, b) {
  for (let i = 0; i < a.length && i < b.length; i++) {
    if (Number.isInteger(a[i]) && Number.isInteger(b[i])) {
      if (a[i] !== b[i]) return a[i] - b[i];
    } else {
      let result = check(
        Number.isInteger(a[i]) ? [a[i]] : a[i],
        Number.isInteger(b[i]) ? [b[i]] : b[i],
      );
      if (result !== 0) return result;
    }
  }
  return a.length - b.length;
}

export function part1(input) {
  return input
    .split("\n\n")
    .map(pair => pair.split("\n").map(x => JSON.parse(x)))
    .map((pair, i) => (check(...pair) < 0 ? i + 1 : 0))
    .reduce((a, b) => a + b);
}

export function part2(input) {
  let divider = [[[2]], [[6]]];
  let list = input
    .replaceAll("\n\n", "\n")
    .split("\n")
    .map(x => JSON.parse(x))
    .concat(divider)
    .sort((a, b) => check(a, b));
  return divider.map(x => list.indexOf(x) + 1).reduce((a, b) => a * b);
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
