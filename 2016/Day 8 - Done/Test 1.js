import fs from "node:fs";

import { ocr } from "../../.cache/upstream/shahata/src/utils/ocr.js";

function init(width, height) {
  return new Array(height).fill().map(() => new Array(width).fill(false));
}

function rect(state, x, y) {
  for (let j = 0; j < y; j++) {
    for (let i = 0; i < x; i++) {
      state[j][i] = true;
    }
  }
  return state;
}

function rotateRow(state, x, y) {
  let moved = state[y].splice(-x, x);
  state[y] = moved.concat(state[y]);
  return state;
}

function flip(state) {
  return state[0].map((x, i) => state.map(row => row[i]));
}

function rotateColumn(state, x, y) {
  return flip(rotateRow(flip(state), y, x));
}

function flatten(screen) {
  return screen.reduce((all, row) => all.concat(row), []);
}

function parseCommand(command) {
  if (command.startsWith("rect")) {
    let [, x, y] = command.match(/^rect (\d+)x(\d+)$/);
    return state => rect(state, +x, +y);
  } else if (command.startsWith("rotate row")) {
    let [, y, x] = command.match(/^rotate row y=(\d+) by (\d+)$/);
    return state => rotateRow(state, +x, +y);
  } else if (command.startsWith("rotate column")) {
    let [, x, y] = command.match(/^rotate column x=(\d+) by (\d+)$/);
    return state => rotateColumn(state, +x, +y);
  }
}

function solve(input, width, height) {
  let screen = init(width, height);
  return input
    .split("\n")
    .map(parseCommand)
    .reduce((state, fn) => fn(state), screen);
}

export function part1(input, width = 50, height = 6) {
  let final = solve(input, width, height);
  return flatten(final).filter(x => x).length;
}

export function part2(input, width = 50, height = 6) {
  let final = solve(input, width, height);
  return ocr(
    final.map(row => `${row.map(x => (x ? "#" : ".")).join("")}`).join("\n"),
  );
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
