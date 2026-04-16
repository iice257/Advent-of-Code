import fs from "node:fs";

function hash(word) {
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash += word.charCodeAt(i);
    hash *= 17;
    hash %= 256;
  }
  return hash;
}
export function part1(input) {
  let words = input.split(",");
  return words.map(hash).reduce((sum, hash) => sum + hash, 0);
}

export function part2(input) {
  let operations = input.split(",").map(x => {
    let [label, focal] = x.split(/[-=]/);
    return focal ? { op: "=", label, focal: +focal } : { op: "-", label };
  });
  let hashmap = new Array(256).fill().map(() => []);
  for (let operation of operations) {
    let box = hash(operation.label);
    let i = hashmap[box].findIndex(x => x.label === operation.label);
    if (operation.op === "-") {
      if (i !== -1) hashmap[box].splice(i, 1);
    } else {
      if (i === -1) hashmap[box].push(operation);
      else hashmap[box][i] = operation;
    }
  }
  return hashmap
    .flatMap((box, i) => box.map(({ focal }, j) => (i + 1) * (j + 1) * focal))
    .reduce((sum, power) => sum + power, 0);
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
