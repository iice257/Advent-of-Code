import fs from "node:fs";

function generate(input, size) {
  input = input.split("");
  while (input.length < size) {
    input = dragonCurve(input);
  }
  return input.slice(0, size).join("");
}

function dragonCurve(a) {
  let b = a.map(x => (x === "0" ? "1" : "0")).reverse();
  return a.concat("0", b);
}

function checksum(data) {
  while (data.length % 2 === 0) {
    data = data.replace(/../g, x => (x === "00" || x === "11" ? "1" : "0"));
  }
  return data;
}

export function part1(input, size = 272) {
  return checksum(generate(input, size));
}

export function part2(input, size = 35651584) {
  return checksum(generate(input, size));
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
