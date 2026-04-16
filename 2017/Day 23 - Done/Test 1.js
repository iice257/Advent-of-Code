import fs from "node:fs";

import { parse, getter } from "../../.cache/upstream/shahata/src/2017/day18.js";

function parseDebug(input, debug) {
  return parse(
    input,
    {
      sub: (p1, p2) => state =>
        (state[p1] = getter(state, p1) - getter(state, p2)),
      jnz: (p1, p2) => state =>
        getter(state, p1) !== 0
          ? (state.instruction += getter(state, p2) - 1)
          : null,
    },
    debug,
  );
}

export function part1(input) {
  let debug = {};
  let commands = parseDebug(input, x => (debug[x] = (debug[x] || 0) + 1));
  let state = { instruction: 0 };
  while (state.instruction < commands.length) {
    commands[state.instruction](state);
    state.instruction++;
  }
  return debug.mul;
}

function isPrime(num) {
  let sqrt = Math.floor(Math.sqrt(num));
  for (let i = 2; i < sqrt + 1; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

export function part2(input) {
  let num = +input.split("\n").shift().split(" ").pop() * 100 + 1e5;
  let count = 0;
  for (let i = 0; i <= 17000; i += 17) {
    if (!isPrime(num + i)) {
      count++;
    }
  }
  return count;
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
