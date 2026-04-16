import fs from "node:fs";

function distance(a, b) {
  return a.reduce((sum, x, i) => sum + Math.abs(x - b[i]), 0);
}

export function part1(input) {
  let constellations = 0;
  let lines = input.split("\n");
  let points = lines.map(line => line.split(",").map(Number));
  points.forEach(p => {
    p.near = points.filter(q => distance(p, q) <= 3);
  });
  while (points.length > 0) {
    let queue = [points.shift()];
    while (queue.length > 0) {
      queue.shift().near.forEach(p => {
        let idx = points.indexOf(p);
        if (idx !== -1) {
          queue.push(p);
          points.splice(idx, 1);
        }
      });
    }
    constellations++;
  }
  return constellations;
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
