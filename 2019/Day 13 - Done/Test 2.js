import fs from "node:fs";

import { execute } from "../../.cache/upstream/shahata/src/2019/day09.js";

export function part1(input) {
  let output = [];
  let user = { input: [], output: x => output.push(x), base: 0 };
  let ops = input.split(",").map(Number);
  let ip = 0;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }
  return output.filter((x, i) => i % 3 === 2).filter(x => x === 2).length;
}

export function part2(input) {
  let output = [];
  let board = [];
  let score = 0;

  function move() {
    while (output.length) {
      let [x, y, id] = output.splice(0, 3);
      if (x === -1 && y === 0) {
        score = id;
      } else {
        board[y] = board[y] || [];
        board[y][x] = id;
      }
    }
    let paddle = Math.max(...board.map(row => row.indexOf(3)));
    let ball = Math.max(...board.map(row => row.indexOf(4)));
    return (ball - paddle) / Math.abs(ball - paddle);
  }

  let user = { input: move, output: x => output.push(x), base: 0 };
  let ops = input.split(",").map(Number);
  let ip = 0;
  ops[0] = 2;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }
  move();

  return score;
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
