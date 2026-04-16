import fs from "node:fs";

export function part1(input, add = 1) {
  let map = input.split("\n").map(line => line.split(""));
  let stars = map
    .flatMap((row, y) => row.map((cell, x) => ({ cell, x, y })))
    .filter(({ cell }) => cell === "#");
  let ydiff = 0;
  for (let y = 0; y < map.length; y++) {
    if (map[y].every(c => c === ".")) {
      stars = stars.map(c => ({ ...c, y: c.y > y + ydiff ? c.y + add : c.y }));
      ydiff += add;
    }
  }
  let xdiff = 0;
  for (let x = 0; x < map[0].length; x++) {
    if (map.every(row => row[x] === ".")) {
      stars = stars.map(c => ({ ...c, x: c.x > x + xdiff ? c.x + add : c.x }));
      xdiff += add;
    }
  }
  let distances = stars.map((a, i) =>
    stars
      .slice(i + 1)
      .reduce((acc, b) => acc + Math.abs(a.x - b.x) + Math.abs(a.y - b.y), 0),
  );
  return distances.reduce((a, b) => a + b);
}

export function part2(input) {
  return part1(input, 999999);
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
