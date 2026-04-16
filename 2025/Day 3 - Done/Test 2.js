import fs from "node:fs";

export function part1(input, batteries = 2) {
  let lines = input.split("\n").map(line => line.split("").map(Number));
  let voltage = lines.map(line => {
    let result = 0;
    for (let i = batteries - 1; i >= 0; i--) {
      let max = Math.max(...line.slice(0, line.length - i));
      let index = line.findIndex(x => x === max);
      line = line.slice(index + 1);
      result = result * 10 + max;
    }
    return result;
  });
  return voltage.reduce((a, b) => a + b);
}

export function part2(input) {
  return part1(input, 12);
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
