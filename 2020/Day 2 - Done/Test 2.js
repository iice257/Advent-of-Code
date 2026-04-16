import fs from "node:fs";

export function part1(input) {
  let result = input.split("\n").filter(x => {
    let [, start, end, character, password] = x.match(
      /^(\d+)-(\d+) (.): (.*)$/,
    );
    let count = password.split("").filter(x => x === character).length;
    return count >= +start && count <= +end;
  }).length;
  return result;
}

export function part2(input) {
  let result = input.split("\n").filter(x => {
    let [, start, end, character, password] = x.match(
      /^(\d+)-(\d+) (.): (.*)$/,
    );
    let a = password[start - 1] === character ? 1 : 0;
    let b = password[end - 1] === character ? 1 : 0;
    return a + b === 1;
  }).length;
  return result;
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
