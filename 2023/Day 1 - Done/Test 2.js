import fs from "node:fs";

export function part1(input) {
  let lines = input.split("\n");
  let numbers = lines.map(line => {
    let first = +line.match(/[0-9]/g).at(0);
    let last = +line.match(/[0-9]/g).at(-1);
    return first * 10 + last;
  });
  return numbers.reduce((a, b) => a + b, 0);
}

export function part2(input) {
  let letters = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  let regex = new RegExp(`(?=(?<digit>[0-9]|${letters.join("|")}))`, "g");
  let lines = input.split("\n");
  let numbers = lines.map(line => {
    let first = [...line.matchAll(regex)].at(0).groups.digit;
    let last = [...line.matchAll(regex)].at(-1).groups.digit;
    let a = Number.isNaN(+first) ? letters.indexOf(first) : +first;
    let b = Number.isNaN(+last) ? letters.indexOf(last) : +last;
    return a * 10 + b;
  });
  return numbers.reduce((a, b) => a + b, 0);
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
