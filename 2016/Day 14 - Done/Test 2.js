import fs from "node:fs";

import md5 from "../../.cache/upstream/shahata/src/utils/md5.js";

function findRepeatingCharacters(str, num) {
  return (str.match(new RegExp(`(.)\\1{${num - 1}}`, "g")) || []).map(
    x => x[0],
  );
}

function generateKeys(input, hashFn) {
  let keys = [],
    window = [],
    characters = {};
  for (let i = 0; keys.length < 64; i++) {
    let str = hashFn(`${input}${i}`);
    findRepeatingCharacters(str, 5).forEach(
      x => (characters[x] = (characters[x] || []).concat([i])),
    );
    if (i >= 1000) {
      let digit = findRepeatingCharacters(window.shift(), 3).shift();
      let index =
        digit !== undefined &&
        characters[digit] &&
        characters[digit].find(x => x > i - 1000);
      if (index) {
        keys.push(i - 1000);
      }
    }
    window.push(str);
  }
  return keys;
}

function md5times(str, count) {
  while (count > 0) {
    str = md5(str);
    count--;
  }
  return str;
}

export function part1(input) {
  return generateKeys(input, x => md5times(x, 1)).pop();
}

export function part2(input) {
  return generateKeys(input, x => md5times(x, 2017)).pop();
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
