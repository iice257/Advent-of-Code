import fs from "node:fs";

const directions = [
  { y: 1, x: 0 },
  { y: 0, x: 1 },
  { y: -1, x: 0 },
  { y: 0, x: -1 },
];

export function day(input) {
  let destination = input
    .split(", ")
    .map(x => {
      let [, turn, count] = x.match(/^(R|L)(\d+)$/);
      return { turn: turn === "R" ? 1 : -1, count: +count };
    })
    .reduce(
      (state, next) => {
        let direction =
          (state.direction + next.turn + directions.length) % directions.length;
        return new Array(next.count).fill().reduce(state => {
          let x = state.x + directions[direction].x;
          let y = state.y + directions[direction].y;
          if (state.history[`${x},${y}`]) {
            state.twice = state.twice || { x, y };
          } else {
            state.history[`${x},${y}`] = true;
          }
          return {
            direction,
            x,
            y,
            history: state.history,
            twice: state.twice,
          };
        }, state);
      },
      { direction: 0, x: 0, y: 0, history: { "0,0": true } },
    );
  destination.twice = destination.twice || { x: NaN, y: NaN };

  return {
    part1: Math.abs(destination.x) + Math.abs(destination.y),
    part2: Math.abs(destination.twice.x) + Math.abs(destination.twice.y),
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
