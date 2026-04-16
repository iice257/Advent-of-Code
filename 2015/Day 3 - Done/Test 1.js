import fs from "node:fs";

function step(x, y) {
  return pos => ({ x: pos.x + x, y: pos.y + y });
}

const steps = {
  "<": step(-1, 0),
  ">": step(1, 0),
  "^": step(0, -1),
  "v": step(0, 1),
};

function parse(input) {
  return input.split("").map(x => steps[x]);
}

export function part1(input) {
  return parse(input).reduce(
    (state, next) => {
      let pos = (state.pos = next(state.pos));
      state.visited.add(`${pos.x}-${pos.y}`);
      return state;
    },
    { visited: new Set().add("0-0"), pos: { x: 0, y: 0 } },
  ).visited.size;
}

export function part2(input) {
  return parse(input).reduce(
    (state, next, index) => {
      let turn = index % 2 === 0 ? "santa" : "robot";
      let pos = (state.pos[turn] = next(state.pos[turn]));
      state.visited.add(`${pos.x}-${pos.y}`);
      return state;
    },
    {
      visited: new Set().add("0-0"),
      pos: { santa: { x: 0, y: 0 }, robot: { x: 0, y: 0 } },
    },
  ).visited.size;
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
