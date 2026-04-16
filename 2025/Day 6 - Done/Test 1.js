import fs from "node:fs";

const reducers = {
  "+": arr => arr.reduce((a, b) => a + b, 0),
  "*": arr => arr.reduce((a, b) => a * b, 1),
};

export function part1(input) {
  let lines = input.split("\n").map(x => x.trim().split(/\s+/));
  let ops = lines.pop();
  let sum = 0;
  for (let i = 0; i < lines[0].length; i++) {
    let arr = lines.map(x => +x[i]);
    sum += reducers[ops[i]](arr);
  }
  return sum;
}

export function part2(input) {
  let lines = input.split("\n");
  let ops = lines.pop();
  let arr = [];
  let sum = 0;
  let reduce;
  for (let i = 0; i <= lines[0].length; i++) {
    let digits = lines.map(x => x[i]).join("");
    digits = digits.trim();
    reduce = reducers[ops[i]] || reduce;
    if (digits) arr.push(+digits);
    else sum += reduce(arr.splice(0));
  }
  return sum;
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
