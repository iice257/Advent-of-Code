import fs from "node:fs";

export function part1(input) {
  let numbers = input.split("\n");
  let sum = 0;
  for (let num of numbers) {
    let result = 0;
    let fives = 1;
    for (let i = num.length - 1; i >= 0; i--) {
      result += fives * (num[i] === "=" ? -2 : num[i] === "-" ? -1 : +num[i]);
      fives *= 5;
    }
    sum += result;
  }

  let arr = sum.toString(5).split("");
  let answer = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    if (+arr[i] < 3) answer.unshift(arr[i]);
    else {
      let next = +arr[i] - 5;
      answer.unshift(next === -2 ? "=" : next === -1 ? "-" : `${next}`);
      arr[i - 1] = `${+arr[i - 1] + 1}`;
    }
  }
  return answer.join("");
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
