import fs from "node:fs";

function hash(n) {
  n = (n ^ (n * 64n)) % 16777216n;
  n = (n ^ (n / 32n)) % 16777216n;
  n = (n ^ (n * 2048n)) % 16777216n;
  return n;
}

export function part1(input) {
  let numbers = input.split("\n").map(BigInt);
  for (let i = 0; i < 2000; i++) numbers = numbers.map(hash);
  return numbers.reduce((a, b) => a + b, 0n);
}

export function part2(input) {
  let numbers = input.split("\n").map(BigInt);
  let cache = new Map();
  let max = 0;
  for (let prev of numbers) {
    let visited = new Set();
    let diffs = [];
    for (let i = 0; i < 2000; i++) {
      let next = hash(prev);
      diffs.push(Number((next % 10n) - (prev % 10n)));
      prev = next;
      if (diffs.length < 4) continue;

      let key = diffs.join(",");
      diffs.shift();
      if (visited.has(key)) continue;

      let sum = (cache.get(key) || 0) + Number(next % 10n);
      max = Math.max(max, sum);
      cache.set(key, sum);
      visited.add(key);
    }
  }
  return max;
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
