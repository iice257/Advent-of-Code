import fs from "node:fs";

import { execute } from "../../.cache/upstream/shahata/src/2019/day09.js";

function check(input, { x, y }) {
  let output;
  let current = 0;
  function read() {
    current++;
    return current % 2 === 1 ? x : y;
  }

  let user = { input: read, output: x => (output = x), base: 0 };
  let ops = input.split(",").map(Number);
  let ip = 0;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }
  return output === 1;
}

export function part1(input) {
  let count = 0;
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      if (check(input, { x, y })) {
        count++;
      }
    }
  }
  return count;
}

export function part2(input) {
  let point = { x: 0, y: 5 };
  while (point) {
    while (!check(input, point)) {
      point.x++;
    }

    let next = { x: point.x, y: point.y + 1 };
    while (check(input, point)) {
      point.x++;
    }
    if (point.x >= 100 && check(input, { x: point.x - 100, y: point.y + 99 })) {
      return (point.x - 100) * 10000 + point.y;
    }
    point = next;
  }
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
