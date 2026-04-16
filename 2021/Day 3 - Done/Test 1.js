import fs from "node:fs";

function findMostCommonBit(numbers, digit) {
  let counter = numbers.filter(number => number[digit] === "1").length;
  return counter >= numbers.length / 2 ? "1" : "0";
}

export function part1(input) {
  let numbers = input.split("\n");
  let mask = parseInt("1".repeat(numbers[0].length), 2);
  let mostCommon = "";
  for (let digit = 0; digit < numbers[0].length; digit++) {
    mostCommon += findMostCommonBit(numbers, digit);
  }
  return parseInt(mostCommon, 2) * (parseInt(mostCommon, 2) ^ mask);
}

export function part2(input) {
  let numbers = input.split("\n");
  let numbers2 = input.split("\n");
  for (let digit = 0; numbers.length > 1; digit++) {
    let bit = findMostCommonBit(numbers, digit);
    numbers = numbers.filter(number => number[digit] === bit);
  }
  for (let digit = 0; numbers2.length > 1; digit++) {
    let bit = findMostCommonBit(numbers2, digit);
    numbers2 = numbers2.filter(number => number[digit] !== bit);
  }
  return parseInt(numbers[0], 2) * parseInt(numbers2[0], 2);
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
