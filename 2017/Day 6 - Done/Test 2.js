import fs from "node:fs";

export function day(input) {
  let banks = input.split(/\s+/).map(Number);
  let memory = {};
  let rounds = 0;
  while (memory[banks.join("-")] === undefined) {
    memory[banks.join("-")] = rounds;
    rounds++;

    let iterator = banks.reduce(
      (biggest, x, i, arr) => (x > arr[biggest] ? i : biggest),
      0,
    );
    let blocks = banks.splice(iterator, 1, 0).pop();
    for (let i = 0; i < banks.length; i++) {
      banks[i] += Math.floor(blocks / banks.length);
      if (
        (i - iterator + banks.length) % banks.length <= blocks % banks.length &&
        i !== iterator
      ) {
        banks[i]++;
      }
    }
  }

  return {
    part1: rounds,
    part2: rounds - memory[banks.join("-")],
  };
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
