import fs from "node:fs";

export function part1(input, wh = 70, fallen = 1024) {
  let bytes = input.split("\n");
  let queue = [{ x: 0, y: 0, steps: 0 }];
  let visited = new Set(bytes.slice(0, fallen));
  while (queue.length) {
    let curr = queue.shift();
    if (curr.x === wh && curr.y === wh) return curr.steps;
    let neighbors = [
      { x: curr.x + 1, y: curr.y },
      { x: curr.x - 1, y: curr.y },
      { x: curr.x, y: curr.y + 1 },
      { x: curr.x, y: curr.y - 1 },
    ].filter(
      ({ x, y }) =>
        x >= 0 && x <= wh && y >= 0 && y <= wh && !visited.has(`${x},${y}`),
    );
    neighbors.forEach(neighbor => {
      visited.add(`${neighbor.x},${neighbor.y}`);
      queue.push({ ...neighbor, steps: curr.steps + 1 });
    });
  }
}

export function part2(input, wh = 70, fallen = 1024) {
  let bytes = input.split("\n");
  for (let i = fallen; i < bytes.length; i++) {
    if (!part1(input, wh, i)) return bytes[i - 1];
  }
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
