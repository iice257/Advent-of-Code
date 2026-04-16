import fs from "node:fs";

function parse(input) {
  return input.split("\n").map(line => {
    let [, numbers] = line.split(":");
    let [left, right] = numbers
      .split("|")
      .map(s => s.trim().split(/\s+/).map(Number));
    return right.filter(n => left.includes(n)).length;
  });
}

export function part1(input) {
  let cards = parse(input);
  return cards.map(x => (x > 0 ? 2 ** (x - 1) : 0)).reduce((a, b) => a + b, 0);
}

export function part2(input) {
  let cards = parse(input);
  let seen = {};
  for (let i = 0; i < cards.length; i++) {
    seen[i] = 1;
  }
  for (let i = 0; i < cards.length; i++) {
    for (let j = 1; j <= cards[i]; j++) {
      seen[i + j] += seen[i];
    }
  }
  return Object.values(seen).reduce((a, b) => a + b, 0);
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
