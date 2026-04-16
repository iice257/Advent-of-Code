import fs from "node:fs";

const directions = {
  D: { y: 1, x: 0 },
  R: { y: 0, x: 1 },
  U: { y: -1, x: 0 },
  L: { y: 0, x: -1 },
};

function move(keypad, position, step) {
  let next = { x: position.x + step.x, y: position.y + step.y };
  return keypad[next.y] && keypad[next.y][next.x] ? next : position;
}

function solve(input, keypad, start) {
  return input
    .split("\n")
    .map(line => line.split(""))
    .reduce((code, line) => {
      return code.concat(
        line.reduce(
          (position, step) => {
            return move(keypad, position, directions[step]);
          },
          code.at(-1) || start,
        ),
      );
    }, [])
    .map(key => keypad[key.y][key.x])
    .join("");
}

const keypad1 = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];

export function part1(input) {
  return solve(input, keypad1, { x: 1, y: 1 });
}

const keypad2 = [
  [NaN, NaN, "1", NaN, NaN],
  [NaN, "2", "3", "4", NaN],
  ["5", "6", "7", "8", "9"],
  [NaN, "A", "B", "C", NaN],
  [NaN, NaN, "D", NaN, NaN],
];

export function part2(input) {
  return solve(input, keypad2, { x: 0, y: 2 });
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
