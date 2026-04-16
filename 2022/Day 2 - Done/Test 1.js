import fs from "node:fs";

export function part1(input, getShape = (e, x) => x) {
  let turns = input.split("\n").map(x => x.split(" "));
  let value = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 };
  let score = 0;
  turns.forEach(([a, b]) => {
    let shapeA = value[a];
    let shapeB = getShape(shapeA, value[b]);
    if (shapeB - shapeA === 1 || shapeB - shapeA === -2) score += 6;
    else if (shapeA === shapeB) score += 3;
    score += shapeB;
  });
  return score;
}

export function part2(input) {
  return part1(input, (elf, outcome) => {
    if (outcome === 1) return elf - 1 === 0 ? 3 : elf - 1;
    if (outcome === 2) return elf;
    if (outcome === 3) return elf + 1 === 4 ? 1 : elf + 1;
  });
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
