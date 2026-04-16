import fs from "node:fs";

import { memoize } from "../../.cache/upstream/shahata/src/utils/memoize.js";

function advance(options, char) {
  let { len, groups, i, left } = options;
  let update = {};
  if (char === "#") update = { len: len + 1, left: left - 1 };
  else if (len > 0) update = { len: 0, groups: [...groups, len] };
  return { ...options, ...update, i: i + 1 };
}

let solve = memoize((pattern, counts, options) => {
  options = options || { groups: [], len: 0, i: 0 };
  options.left = options.left ?? counts.reduce((a, b) => a + b, 0);

  if (options.i >= pattern.length) {
    if (options.len > 0) options.groups = [...options.groups, options.len];
    if (options.groups.length !== counts.length) return 0;
    return options.groups.every((x, i) => x === counts[i]) ? 1 : 0;
  } else {
    if (options.groups.some((x, i) => x !== counts[i])) return 0;
    if (options.len > counts[options.groups.length]) return 0;
    if (options.left > pattern.length - options.i) return 0;
  }

  let result = 0;
  let c = pattern[options.i];
  if (c !== "#") result += solve(pattern, counts, advance(options, "."));
  if (c !== ".") result += solve(pattern, counts, advance(options, "#"));
  return result;
});

export function part1(input) {
  return input
    .split("\n")
    .map(line => {
      let [pattern, counts] = line.split(" ");
      counts = counts.split(",").map(Number);
      return solve(pattern, counts);
    })
    .reduce((a, b) => a + b);
}

export function part2(input) {
  let x = input
    .split("\n")
    .map(line => {
      let [pattern, counts] = line.split(" ");
      pattern = new Array(5).fill().map(() => pattern);
      counts = new Array(5).fill().map(() => counts);
      pattern = pattern.join("?");
      counts = counts.join(",").split(",").map(Number);
      return solve(pattern, counts);
    })
    .reduce((a, b) => a + b);
  return x;
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
