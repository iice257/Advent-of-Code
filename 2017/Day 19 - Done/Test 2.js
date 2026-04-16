import fs from "node:fs";

function parse(input) {
  return input.split("\n").map(line => line.split(""));
}

function findEntryPoint(route) {
  return { x: route[0].indexOf("|"), y: 0 };
}

const next = {
  down: ({ x, y }) => ({ x, y: y + 1 }),
  up: ({ x, y }) => ({ x, y: y - 1 }),
  left: ({ x, y }) => ({ x: x - 1, y }),
  right: ({ x, y }) => ({ x: x + 1, y }),
};

function valueAt(route, { x, y }) {
  return route[y] && route[y][x];
}

function road(value, direction) {
  let roads = { right: "|", left: "|", up: "-", down: "-" };
  return ![".", " ", undefined, roads[direction]].includes(value);
}

function walk(route) {
  let state = {
    point: findEntryPoint(route),
    direction: "down",
    message: "",
    steps: 0,
  };
  while (state.direction !== "done") {
    if (valueAt(route, state.point) === "+") {
      if (state.direction === "down" || state.direction === "up") {
        if (road(valueAt(route, next.right(state.point)), "right")) {
          state.direction = "right";
        } else {
          state.direction = "left";
        }
      } else {
        if (road(valueAt(route, next.up(state.point)), "up")) {
          state.direction = "up";
        } else {
          state.direction = "down";
        }
      }
    }
    if (valueAt(route, state.point).match(/[A-Z]/)) {
      state.message += valueAt(route, state.point);
    }
    if (!road(valueAt(route, next[state.direction](state.point)))) {
      state.direction = "done";
    } else {
      state.point = next[state.direction](state.point);
    }
    state.steps++;
  }
  return state;
}

export function part1(input) {
  return walk(parse(input)).message;
}

export function part2(input) {
  return walk(parse(input)).steps;
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
