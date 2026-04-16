import fs from "node:fs";

// function solve(time, distance) {
//   let result = 0;
//   for (let i = 0; i <= time; i++) {
//     if ((time - i) * i > distance) result++;
//   }
//   return result;
// }

function solve(time, distance) {
  for (let i = Math.floor(distance / time); i <= time; i++) {
    if ((time - i) * i > distance) {
      return time - i * 2 + 1;
    }
  }
}

export function part1(input) {
  let [time, distance] = input.split("\n");
  time = time.split(/\s+/).slice(1).map(Number);
  distance = distance.split(/\s+/).slice(1).map(Number);
  let races = time.map((time, i) => ({ time, distance: distance[i] }));
  let options = races.map(({ time, distance }) => solve(time, distance));
  return options.reduce((a, b) => a * b, 1);
}

export function part2(input) {
  let [time, distance] = input.replaceAll(" ", "").split("\n");
  time = +time.split(":")[1];
  distance = +distance.split(":")[1];
  return solve(time, distance);
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
