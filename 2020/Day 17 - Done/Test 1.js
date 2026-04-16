import fs from "node:fs";

import { gol } from "../../.cache/upstream/shahata/src/utils/game-of-life.js";

let cache = [];
function offsets(dimensions) {
  if (dimensions === 0) {
    return [[]];
  } else if (!cache[dimensions]) {
    let rest = offsets(dimensions - 1);
    cache[dimensions] = rest.flatMap(x => [-1, 0, 1].map(n => [n, ...x]));
  }
  return cache[dimensions];
}

function neighbors(key) {
  let coordinates = key.split(",").map(Number);
  return offsets(coordinates.length)
    .map(x => x.map((c, i) => coordinates[i] + c).join(","))
    .filter(x => x !== key);
}

export function part1(input, dimensions = 3) {
  let map = new Map();
  input.split("\n").forEach((line, y) => {
    line.split("").forEach((char, x) => {
      let coordinates = new Array(dimensions - 2).fill(0);
      map.set([x, y, ...coordinates].join(","), char === "#");
    });
  });

  return gol(
    map,
    neighbors,
    (current, active) => (current && active === 2) || active === 3,
    6,
  ).count;
}

export function part2(input) {
  return part1(input, 4);
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
