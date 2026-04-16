import fs from "node:fs";

function invalidSum(input, regex) {
  let ranges = input.split(",").map(range => range.split("-").map(Number));
  let sum = 0;
  for (let range of ranges) {
    for (let i = range[0]; i <= range[1]; i++) {
      if (`${i}`.match(regex)) sum += i;
    }
  }
  return sum;
}

export function part1(input) {
  return invalidSum(input, /^(\d+)\1$/);
}

export function part2(input) {
  return invalidSum(input, /^(\d+)\1+$/);
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
