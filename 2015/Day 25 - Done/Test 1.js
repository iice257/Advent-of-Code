import fs from "node:fs";

export function part1(input) {
  function calcIndex(row, column) {
    let index = 0;
    for (let i = 1; i <= column; i++) {
      index += i;
    }
    for (let j = 1; j <= row - 1; j++) {
      index += j + column - 1;
    }
    return index;
  }

  function calcPosition(n) {
    let x = 20151125;
    for (; n > 1; n--) {
      x = (x * 252533) % 33554393;
    }
    return x;
  }

  let [, row, col] = input.match(/row (\d+), column (\d+).$/).map(Number);
  return calcPosition(calcIndex(row, col));
}

export function part2() {
  return undefined;
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
