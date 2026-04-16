import fs from "node:fs";

function countLights(input, operations) {
  return input
    .split("\n")
    .map(x => x.match(/^(.*) (\d+),(\d+) through (\d+),(\d+)$/))
    .map(x => ({
      op: operations[x[1]],
      start: { x: +x[2], y: +x[3] },
      end: { x: +x[4], y: +x[5] },
    }))
    .reduce(
      (state, next) => {
        for (let x = next.start.x; x <= next.end.x; x++) {
          for (let y = next.start.y; y <= next.end.y; y++) {
            state[y][x] = next.op(state[y][x]);
          }
        }
        return state;
      },
      new Array(1000).fill().map(() => new Array(1000).fill(0)),
    )
    .reduce((sum, row) => sum + row.reduce((sum, x) => sum + x), 0);
}

export function part1(input) {
  return countLights(input, {
    "turn on": () => 1,
    "turn off": () => 0,
    "toggle": val => (val === 0 ? 1 : 0),
  });
}

export function part2(input) {
  return countLights(input, {
    "turn on": val => val + 1,
    "turn off": val => Math.max(val - 1, 0),
    "toggle": val => val + 2,
  });
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
