import fs from "node:fs";

function isMirror(rows, i, smudges) {
  if (i + 1 >= rows.length) return false;
  for (let j = 0; i - j >= 0 && i + j + 1 < rows.length; j++) {
    let x = rows[i - j].split("").filter((x, k) => x !== rows[i + j + 1][k]);
    if (x.length > smudges) return false;
    else smudges -= x.length;
  }
  return smudges === 0;
}

function getRowMirror(rows, smudges) {
  return rows.findIndex((row, i) => isMirror(rows, i, smudges)) + 1;
}

function rotate(patch) {
  let result = new Array(patch[0].length).fill();
  return result.map((x, i) => patch.map(row => row[i]).join(""));
}

export function part1(input, smudges = 0) {
  let patches = input.split("\n\n").map(patch => patch.split("\n"));
  let result = 0;
  for (let patch of patches) {
    let row = getRowMirror(patch, smudges);
    if (row) result += row * 100;
    else result += getRowMirror(rotate(patch), smudges);
  }
  return result;
}

export function part2(input) {
  return part1(input, 1);
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
