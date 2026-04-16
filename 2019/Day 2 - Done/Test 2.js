import fs from "node:fs";

export function part1(input, noun = 12, verb = 2) {
  let ops = input.split(",").map(Number);
  let ip = 0;
  ops[1] = noun;
  ops[2] = verb;

  while (ops[ip] !== 99) {
    if (ops[ip] === 1) {
      ops[ops[ip + 3]] = ops[ops[ip + 1]] + ops[ops[ip + 2]];
    } else if (ops[ip] === 2) {
      ops[ops[ip + 3]] = ops[ops[ip + 1]] * ops[ops[ip + 2]];
    }
    ip += 4;
  }
  return ops[0];
}

export function part2(input) {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      if (part1(input, noun, verb) === 19690720) {
        return noun * 100 + verb;
      }
    }
  }
  return 0;
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
