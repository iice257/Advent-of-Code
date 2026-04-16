import fs from "node:fs";

function ssl(ip) {
  return (
    ip.match(/(?:^|\])[^[\]]*(.)(?!\1)(.)\1.*\[[^\]]*\2\1\2/) ||
    ip.match(/\[[^\]]*(.)(?!\1)(.)\1.*\][^[]*\2\1\2/)
  );
}

function tls(ip) {
  return ip.match(/(.)(?!\1)(.)\2\1/) && !ip.match(/\[[^\]]*(.)(?!\1)(.)\2\1/);
}

export function part1(input) {
  return input.split("\n").filter(tls).length;
}

export function part2(input) {
  return input.split("\n").filter(ssl).length;
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
