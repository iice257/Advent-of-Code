import fs from "node:fs";

function getResultIfPossible(result, numbers, op) {
  let all = [numbers[0]];
  for (let n of numbers.slice(1)) {
    all = all.flatMap(x => [+`${x}${n}`, x + n, x * n].slice(op ? 0 : 1));
  }
  return all.includes(result) ? result : 0;
}

export function part1(input, op = false) {
  let results = input.split("\n").map(line => {
    let [result, numbers] = line.split(": ");
    numbers = numbers.split(" ").map(Number);
    return getResultIfPossible(+result, numbers, op);
  });
  return results.reduce((a, b) => a + b);
}

export function part2(input) {
  return part1(input, true);
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
