import fs from "node:fs";

export function part1(input) {
  let [start, end] = input.split("-").map(Number);
  let options = 0;
  for (let i = start; i <= end; i++) {
    let digits = `${i}`.split("").sort();
    if (digits.join("") === `${i}` && `${i}`.match(/(.)\1/)) {
      options++;
    }
  }
  return options;
}

export function part2(input) {
  let [start, end] = input.split("-").map(Number);
  let options = 0;
  for (let i = start; i <= end; i++) {
    let digits = `${i}`.split("").sort();
    if (
      digits.join("") === `${i}` &&
      digits.some((x, i, a) => {
        return x === a[i + 1] && x !== a[i + 2] && x !== a[i - 1];
      })
    ) {
      options++;
    }
  }
  return options;
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
