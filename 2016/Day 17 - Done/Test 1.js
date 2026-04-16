import fs from "node:fs";

import md5 from "../../.cache/upstream/shahata/src/utils/md5.js";

function getNeighbors(point, [U, D, L, R]) {
  return [
    U && { x: point.x, y: point.y - 1, path: `${point.path}U` },
    D && { x: point.x, y: point.y + 1, path: `${point.path}D` },
    L && { x: point.x - 1, y: point.y, path: `${point.path}L` },
    R && { x: point.x + 1, y: point.y, path: `${point.path}R` },
  ].filter(p => p && p.x >= 0 && p.y >= 0 && p.x <= 3 && p.y <= 3);
}

function solve(input, shortest = true) {
  let queue = [{ x: 0, y: 0, path: "" }],
    max = -1;
  while (queue.length > 0) {
    let next = queue.shift();
    if (next.x === 3 && next.y === 3) {
      if (shortest) {
        return next.path;
      } else {
        max = Math.max(max, next.path.length);
      }
    } else {
      let doors = md5(input + next.path)
        .slice(0, 4)
        .split("")
        .map(x => "bcdef".includes(x));
      queue = queue.concat(
        getNeighbors(next, [doors[0], doors[1], doors[2], doors[3]]),
      );
    }
  }
  return max;
}

export function part1(input) {
  return solve(input, true);
}

export function part2(input) {
  return solve(input, false);
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
