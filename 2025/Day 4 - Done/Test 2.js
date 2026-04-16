import fs from "node:fs";

function countRoles(map, clear = false) {
  let result = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      let count = [
        map[i - 1]?.[j - 1],
        map[i - 1]?.[j],
        map[i - 1]?.[j + 1],
        map[i]?.[j - 1],
        map[i]?.[j + 1],
        map[i + 1]?.[j - 1],
        map[i + 1]?.[j],
        map[i + 1]?.[j + 1],
      ].filter(x => x === "@").length;
      if (count < 4 && map[i][j] === "@") {
        if (clear) map[i][j] = ".";
        result++;
      }
    }
  }
  return result;
}

export function part1(input) {
  let map = input.split("\n").map(x => x.split(""));
  return countRoles(map);
}

export function part2(input) {
  let result;
  let sum = 0;
  let map = input.split("\n").map(x => x.split(""));
  while (result !== 0) {
    result = countRoles(map, true);
    sum += result;
  }
  return sum;
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
