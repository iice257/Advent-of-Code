import fs from "node:fs";

import { ocr } from "../../.cache/upstream/shahata/src/utils/ocr.js";

function fold(input, total = Infinity) {
  let [paper, folds] = input.split("\n\n");
  paper = paper.split("\n").map(line => line.split(",").map(Number));
  folds = folds.split("\n").map(line => {
    let [axis, number] = line.replace("fold along ", "").split("=");
    return { axis, number: +number };
  });
  let maxX = Math.max(...paper.map(l => l[0])) + 1;
  let maxY = Math.max(...paper.map(l => l[1])) + 1;
  let board = new Array(maxY).fill().map(() => new Array(maxX).fill("."));
  paper.forEach(([x, y]) => (board[y][x] = "#"));
  for (let i = 0; i < total && i < folds.length; i++) {
    if (folds[i].axis === "x") {
      let rest = board.map(line => line.slice(folds[i].number + 1));
      board = board.map(line => line.slice(0, folds[i].number));
      rest.forEach((line, y) =>
        line.forEach((value, x) => {
          if (value === "#") board[y][folds[i].number - x - 1] = value;
        }),
      );
    } else if (folds[i].axis === "y") {
      let rest = board.slice(folds[i].number + 1);
      board = board.slice(0, folds[i].number);
      rest.forEach((line, y) =>
        line.forEach((value, x) => {
          if (value === "#") board[folds[i].number - y - 1][x] = value;
        }),
      );
    }
  }
  return board;
}

export function part1(input) {
  let paper = fold(input, 1);
  let count = 0;
  paper.forEach(line => line.forEach(value => value === "#" && count++));
  return count;
}

export function part2(input) {
  let paper = fold(input);
  return ocr(paper.map(line => line.join("")).join("\n"));
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
