import fs from "node:fs";

function decodeLength(s, v2) {
  let [, prefix, lengthStr, timesStr, rest] = s.match(
    /^([^(]*)(?:\((\d+)x(\d+)\))?(.*)$/,
  );
  if (lengthStr) {
    let length = +lengthStr;
    let times = +timesStr;
    let repeat =
      times * (v2 ? decodeLength(rest.slice(0, length), v2) : length);
    return prefix.length + repeat + decodeLength(rest.slice(length), v2);
  } else {
    return prefix.length;
  }
}

export function part1(input) {
  return decodeLength(input);
}

export function part2(input) {
  return decodeLength(input, true);
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
