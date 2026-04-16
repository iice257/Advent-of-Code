import fs from "node:fs";

const ops = {
  cpy: (src, register) => state =>
    (state[register] = src.match(/^\d+$/) ? +src : state[src]),
  inc: register => state => state[register]++,
  dec: register => state => state[register]--,
  jnz: (register, distance) => state =>
    (state.index += state[register] === 0 ? 0 : +distance - 1),
};

function toReducer(str) {
  let params = str.split(/\s+/);
  let cmd = ops[params.shift()](...params);
  return state => {
    cmd(state);
    state.index++;
  };
}

function run(commands, state) {
  while (commands.length > state.index) {
    commands[state.index](state);
  }
  return state;
}

export function part1(input) {
  let state = { a: 0, b: 0, c: 0, d: 0, index: 0 };
  return run(input.split("\n").map(toReducer), state).a;
}

export function part2(input) {
  let state = { a: 0, b: 0, c: 1, d: 0, index: 0 };
  return run(input.split("\n").map(toReducer), state).a;
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
