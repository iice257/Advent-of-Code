import fs from "node:fs";

function get(ops, ip, offset) {
  let mode = Math.floor(ops[ip] / 10 ** (offset + 1)) % 10;
  return mode === 0 ? ops[ops[ip + offset]] : ops[ip + offset];
}

export function execute(ops, ip, user) {
  switch (ops[ip] % 100) {
    case 1:
      ops[ops[ip + 3]] = get(ops, ip, 1) + get(ops, ip, 2);
      return ip + 4;
    case 2:
      ops[ops[ip + 3]] = get(ops, ip, 1) * get(ops, ip, 2);
      return ip + 4;
    case 3:
      if (user.input.length === 0) {
        throw new Error("waiting for input");
      }
      ops[ops[ip + 1]] = user.input.shift();
      return ip + 2;
    case 4:
      user.output = get(ops, ip, 1);
      return ip + 2;
    case 5:
      return get(ops, ip, 1) !== 0 ? get(ops, ip, 2) : ip + 3;
    case 6:
      return get(ops, ip, 1) === 0 ? get(ops, ip, 2) : ip + 3;
    case 7:
      ops[ops[ip + 3]] = get(ops, ip, 1) < get(ops, ip, 2) ? 1 : 0;
      return ip + 4;
    case 8:
      ops[ops[ip + 3]] = get(ops, ip, 1) === get(ops, ip, 2) ? 1 : 0;
      return ip + 4;
  }
}

export function part1(input, inputValue = 1) {
  let user = { input: [inputValue], output: undefined };
  let ops = input.split(",").map(Number);
  let ip = 0;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }
  return user.output;
}

export function part2(input, inputValue = 5) {
  return part1(input, inputValue);
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
