import fs from "node:fs";

function deepSum(obj, ignore) {
  if (Array.isArray(obj)) {
    return obj.reduce((sum, x) => sum + deepSum(x, ignore), 0);
  } else if (typeof obj === "object") {
    let values = Object.keys(obj).map(x => obj[x]);
    return ignore && values.indexOf(ignore) > -1 ? 0 : deepSum(values, ignore);
  } else {
    return typeof obj === "number" ? obj : 0;
  }
}

export function part1(input) {
  return deepSum(JSON.parse(input));
}

export function part2(input) {
  return deepSum(JSON.parse(input), "red");
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
