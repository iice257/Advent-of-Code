import fs from "node:fs";

export function part1(input) {
  let [timestamp, buses] = input.split("\n");
  timestamp = +timestamp;
  buses = buses
    .split(",")
    .filter(x => x !== "x")
    .map(Number);

  let next = buses.map(x => {
    let result = 0;
    while (result < timestamp) {
      result += x;
    }
    return result;
  });
  let time = Math.min(...next);
  return (time - timestamp) * buses[next.indexOf(time)];
}

export function part2(input) {
  let buses = input
    .split("\n")
    .pop()
    .split(",")
    .map((x, i) => ({ id: +x, offset: i }))
    .filter(({ id }) => !isNaN(id));

  let result = 0;
  let step = 1;
  buses.forEach(({ id, offset }) => {
    while ((result + offset) % id !== 0) {
      result += step;
    }
    step *= id; //assumes bus numbers do not have common divisors
  });
  return result;
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
