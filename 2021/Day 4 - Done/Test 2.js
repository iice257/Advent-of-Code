import fs from "node:fs";

function mark(board, number) {
  board.forEach(row =>
    row.forEach(slot => slot.number === number && (slot.marked = true)),
  );
}

function winner(board) {
  let winnerRow = board.some(row => row.every(slot => slot.marked));
  let winnerCol = board[0].some((s, i) => board.every(row => row[i].marked));
  return winnerRow || winnerCol;
}

function calc(board) {
  let sum = 0;
  board.forEach(row =>
    row.forEach(slot => !slot.marked && (sum += slot.number)),
  );
  return sum;
}

export function part1(input, win = true) {
  let [numbers, ...boards] = input.split("\n\n");
  numbers = numbers.split(",").map(n => +n);
  boards = boards.map(board =>
    board.split("\n").map(row =>
      row
        .trim()
        .split(/\s+/)
        .map(n => ({ marked: false, number: +n })),
    ),
  );
  for (let number of numbers) {
    for (let board of boards) {
      mark(board, number);
      if (winner(board)) {
        if (win || boards.length === 1) {
          return number * calc(board);
        } else {
          boards = boards.filter(b => b !== board);
        }
      }
    }
  }
}

export function part2(input) {
  return part1(input, false);
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
