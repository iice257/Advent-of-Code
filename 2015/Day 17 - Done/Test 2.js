import fs from "node:fs";

export function day(input, fill = 150) {
  let boxes = input.split("\n").map(Number);
  let result = new Array(boxes.length).fill(0);
  let pad = result.join("");

  for (let i = 2 ** boxes.length - 1; i > 0; i--) {
    let select = (pad + i.toString(2))
      .slice(-boxes.length)
      .split("")
      .map(Number);
    if (
      select.map((x, index) => x * boxes[index]).reduce((sum, x) => sum + x) ===
      fill
    ) {
      result[select.filter(x => x).length - 1]++;
    }
  }

  return {
    part1: result.reduce((sum, x) => sum + x),
    part2: result.filter(x => x).shift(),
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
