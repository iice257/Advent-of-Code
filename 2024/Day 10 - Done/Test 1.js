import fs from "node:fs";

export function part1(input, part2 = false) {
  let sum = 0;
  let map = input.split("\n").map(line => line.split(""));
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "0") {
        let queue = [{ x, y }];
        let visited = new Set();
        while (queue.length > 0) {
          let { x, y } = queue.shift();
          if (map[y][x] === "9") {
            sum++;
            continue;
          }
          let neighbors = [
            { x: x - 1, y },
            { x: x + 1, y },
            { x, y: y - 1 },
            { x, y: y + 1 },
          ].filter(p => +map[p.y]?.[p.x] === +map[y][x] + 1);
          neighbors.forEach(p => {
            if (!visited.has(`${p.x},${p.y}`) || part2) {
              visited.add(`${p.x},${p.y}`);
              queue.push(p);
            }
          });
        }
      }
    }
  }
  return sum;
}

export function part2(input) {
  return part1(input, true);
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
