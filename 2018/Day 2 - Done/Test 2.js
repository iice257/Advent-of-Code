import fs from "node:fs";

export function part1(input) {
  let ids = input.split("\n");
  let counts = { double: 0, triple: 0 };
  ids.forEach(id => {
    let s = id.split("").sort().join("");
    if (s.match(/([a-z])\1\1\1+/)) {
      s = s.replace(/([a-z])\1\1\1+/g, "");
    }
    if (s.match(/([a-z])\1\1+/)) {
      counts.triple++;
      s = s.replace(/([a-z])\1\1+/g, "");
    }
    if (s.match(/([a-z])\1/)) {
      counts.double++;
    }
  });
  return counts.triple * counts.double;
}

export function part2(input) {
  let ids = input.split("\n");
  let memory = new Set();
  for (let id of ids) {
    let arr = id.split("");
    for (let i = 0; i < arr.length; i++) {
      let without = arr.map((x, index) => (index === i ? "*" : x)).join("");
      if (memory.has(without)) {
        return without.replace("*", "");
      } else {
        memory.add(without);
      }
    }
  }
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
