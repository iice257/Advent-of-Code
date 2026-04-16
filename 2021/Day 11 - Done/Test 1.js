import fs from "node:fs";

function inc(octopai, i, j) {
  if (octopai[i] !== undefined && octopai[i][j] !== undefined) {
    octopai[i][j]++;
    if (octopai[i][j] === 10) {
      inc(octopai, i - 1, j - 1);
      inc(octopai, i - 1, j + 0);
      inc(octopai, i - 1, j + 1);
      inc(octopai, i + 0, j - 1);
      inc(octopai, i + 0, j + 1);
      inc(octopai, i + 1, j - 1);
      inc(octopai, i + 1, j + 0);
      inc(octopai, i + 1, j + 1);
    }
  }
}

function run(input, steps) {
  let octopai = input.split("\n").map(line => line.split("").map(Number));
  let flashes = 0;
  for (let n = 0; n < steps; n++) {
    if (octopai.every(line => line.every(octopus => octopus === 0))) {
      return n;
    }
    octopai.forEach((l, i) => l.forEach((o, j) => inc(octopai, i, j)));
    octopai.forEach((l, i) =>
      l.forEach((o, j) => o > 9 && ++flashes && (octopai[i][j] = 0)),
    );
  }
  return flashes;
}

export function part1(input) {
  return run(input, 100);
}

export function part2(input) {
  return run(input, Infinity);
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
