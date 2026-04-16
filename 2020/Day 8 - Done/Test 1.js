import fs from "node:fs";

function parse(input) {
  return input.split("\n").map(x => {
    let [op, param] = x.split(" ");
    return { op, param };
  });
}

function run(ops) {
  let ip = 0;
  let acc = 0;
  let visited = new Set();

  while (!visited.has(ip) && ip < ops.length) {
    visited.add(ip);
    if (ops[ip].op === "acc") {
      acc += +ops[ip].param;
    } else if (ops[ip].op === "jmp") {
      ip += +ops[ip].param - 1;
    }
    ip++;
  }
  return { ip, acc };
}

export function part1(input) {
  let { acc } = run(parse(input));
  return acc;
}

export function part2(input) {
  let bad = parse(input);

  for (let toggle = 0; toggle < bad.length; toggle++) {
    let ops = bad.map(({ op, param }, index) => {
      if (index === toggle && op !== "acc") {
        return { op: op === "jmp" ? "nop" : "jmp", param };
      } else {
        return { op, param };
      }
    });

    let { ip, acc } = run(ops);
    if (ip === ops.length) {
      return acc;
    }
  }
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
