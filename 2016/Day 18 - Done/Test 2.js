import fs from "node:fs";

function calcRow(row) {
  return row
    .split("")
    .map((x, i) => {
      let [l, c, r] = [row[i - 1] || ".", row[i], row[i + 1] || "."];
      return (l !== c && l !== r) || (r !== c && r !== l) ? "^" : ".";
    })
    .join("");
}

function solve(input, rows) {
  let row,
    count = 0;
  for (let i = 0; i < rows; i++) {
    row = i === 0 ? input : calcRow(row);
    count += row.match(/\./g).length;
  }
  return count;
}

export function part1(input, rows = 40) {
  return solve(input, rows);
}

export function part2(input, rows = 4e5) {
  return solve(input, rows);
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
