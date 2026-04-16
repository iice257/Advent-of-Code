import fs from "node:fs";

const ops = {
  cpy: (src, register) => state =>
    (state[register] = state[src] === undefined ? +src : state[src]),
  inc: register => state => state[register]++,
  dec: register => state => state[register]--,
  jnz: (register, distance) => state => {
    if (
      (state[register] !== undefined && state[register] !== 0) ||
      (state[register] === undefined && register !== "0")
    ) {
      distance = state[distance] === undefined ? +distance : state[distance];
      state.index += distance - 1;
    }
  },
  out: register => state => (state.out += state[register]),
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
  while (commands.length > state.index && state.out.length < 100) {
    commands[state.index](state);
  }
  return state;
}

export function part1(input) {
  let commands = input.split("\n").map(toReducer);
  let a = 0;
  while (
    run(commands, { a, b: 0, c: 0, d: 0, index: 0, out: "" }).out !==
    "0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101"
  ) {
    a++;
  }
  return a;
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
