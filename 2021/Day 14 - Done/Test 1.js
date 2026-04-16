import fs from "node:fs";

export function part1(input, times = 10) {
  let map = {};
  let [polymer, pairs] = input.split("\n\n");
  pairs.split("\n").forEach(line => {
    map[line.split(" -> ")[0]] = line.split(" -> ")[1];
  });
  let pairsMap = {};
  for (let i = 0; i < polymer.length - 1; i++) {
    let key = polymer[i] + polymer[i + 1];
    pairsMap[key] = (pairsMap[key] || 0) + 1;
  }
  for (let i = 0; i < times; i++) {
    let next = {};
    for (let key in pairsMap) {
      let insert = map[key];
      next[key[0] + insert] = (next[key[0] + insert] || 0) + pairsMap[key];
      next[insert + key[1]] = (next[insert + key[1]] || 0) + pairsMap[key];
    }
    pairsMap = next;
  }
  let charMap = { [polymer[0]]: 1, [polymer.at(-1)]: 1 };
  for (let key in pairsMap) {
    charMap[key[0]] = (charMap[key[0]] || 0) + pairsMap[key];
    charMap[key[1]] = (charMap[key[1]] || 0) + pairsMap[key];
  }
  let max = Math.max(...Object.values(charMap));
  let min = Math.min(...Object.values(charMap));
  return (max - min) / 2;
}

export function part2(input) {
  return part1(input, 40);
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
