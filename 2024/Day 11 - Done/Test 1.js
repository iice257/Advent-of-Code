import fs from "node:fs";

function next(stone) {
  if (stone === 0) return [1];
  if (`${stone}`.length % 2 === 0) {
    let s = `${stone}`;
    return [
      parseInt(s.slice(0, s.length / 2)),
      parseInt(s.slice(s.length / 2)),
    ];
  }
  return [stone * 2024];
}

let memory = new Map();
function doit(stone, times) {
  let key = `${stone},${times}`;
  if (memory.has(key)) return memory.get(key);
  let sum = 0;
  let stones = next(stone);
  if (times === 1) sum = stones.length;
  else stones.forEach(stone => (sum += doit(stone, times - 1)));
  memory.set(key, sum);
  return sum;
}

export function part1(input) {
  let stones = input.split(" ").map(Number);
  return stones.reduce((sum, stone) => sum + doit(stone, 25), 0);
}

export function part2(input) {
  let stones = input.split(" ").map(Number);
  return stones.reduce((sum, stone) => sum + doit(stone, 75), 0);
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
