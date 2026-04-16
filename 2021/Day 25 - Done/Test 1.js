import fs from "node:fs";

export function part1(input) {
  let sea = input.split("\n").map(line => line.split("").map(c => c));
  let next, i;
  for (i = 0; JSON.stringify(sea) !== JSON.stringify(next); i++) {
    sea = next || sea;
    next = sea.map(line => line.map(() => "."));
    sea.forEach((line, y) => {
      line.forEach((c, x) => {
        if (c === ">") {
          let n = (x + 1) % line.length;
          if (sea[y][n] === ".") {
            next[y][n] = c;
          } else {
            next[y][x] = c;
          }
        }
      });
    });
    sea.forEach((line, y) => {
      line.forEach((c, x) => {
        if (c === "v") {
          let n = (y + 1) % sea.length;
          if (sea[n][x] !== c && next[n][x] === ".") {
            next[n][x] = c;
          } else {
            next[y][x] = c;
          }
        }
      });
    });
  }
  return i;
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
