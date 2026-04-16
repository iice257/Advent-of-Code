import fs from "node:fs";

function parse(input) {
  return input.split("\n").map(x => {
    let matches = x.match(
      /^Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)\./,
    );
    let [, index, positions, initial] = matches.map(Number);
    return { index, positions, initial };
  });
}

function solve(discs) {
  let biggest = discs.slice(0).sort().shift();
  let time = biggest.positions - biggest.initial - biggest.index;
  let fit = disc => (time + disc.initial + disc.index) % disc.positions !== 0;
  while (discs.some(fit)) {
    time += biggest.positions;
  }
  return time;
}

export function part1(input) {
  return solve(parse(input));
}

export function part2(input) {
  let discs = parse(input);
  return solve(
    discs.concat([{ index: discs.length + 1, positions: 11, initial: 0 }]),
  );
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
