import fs from "node:fs";

import { execute } from "../../.cache/upstream/shahata/src/2019/day09.js";

function run(input, commands) {
  let chars = [...commands, ""]
    .join("\n")
    .split("")
    .map(x => x.charCodeAt(0));
  let output = [];

  let user = {
    input: () => chars.shift(),
    output: x => output.push(x),
    base: 0,
  };
  let ops = input.split(",").map(Number);
  let ip = 0;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }

  //console.log(output.map(x => String.fromCharCode(x)).join(''));
  return output.at(-1);
}

export function part1(input) {
  let damage = run(input, [
    "NOT A J",
    "NOT B T",
    "OR J T",
    "NOT C J",
    "OR J T",
    "NOT D J",
    "NOT J J",
    "AND T J",
    "WALK",
  ]);
  return damage;
}

export function part2(input) {
  let damage = run(input, [
    "NOT A J",
    "NOT B T",
    "OR J T",
    "NOT C J",
    "OR J T",
    "NOT D J",
    "NOT J J",
    "AND T J",
    "AND E T",
    "OR H T",
    "AND T J",
    "RUN",
  ]);
  return damage;
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
