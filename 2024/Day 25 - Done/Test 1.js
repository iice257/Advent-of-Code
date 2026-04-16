import fs from "node:fs";

function toColumns(thing) {
  thing = thing.split("\n");
  return new Array(thing[0].length).fill().map((_, i) => {
    return thing.map(row => row[i]).filter(x => x === "#").length;
  });
}

export function part1(input) {
  let keys = [];
  let locks = [];
  input.split("\n\n").forEach(thing => {
    if (thing.startsWith("#####")) locks.push(toColumns(thing));
    if (thing.endsWith("#####")) keys.push(toColumns(thing));
  });

  let count = 0;
  for (let lock of locks) {
    for (let key of keys) {
      if (lock.every((_, i) => lock[i] + key[i] <= 7)) count++;
    }
  }
  return count;
}

export function part2() {
  return undefined;
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
