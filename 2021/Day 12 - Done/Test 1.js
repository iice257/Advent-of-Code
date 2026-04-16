import fs from "node:fs";

export function part1(input, twice = false) {
  let connections = {};
  input.split("\n").forEach(x => {
    let [src, dest] = x.split("-");
    connections[src] = (connections[src] || []).concat(dest);
    connections[dest] = (connections[dest] || []).concat(src);
  });
  let paths = 0;
  let queue = [{ point: "start", path: ["start"], twice: !twice }];
  while (queue.length > 0) {
    let next = queue.shift();
    if (next.point === "end") {
      paths++;
    } else {
      let neighbors = connections[next.point].filter(p => p !== "start");
      neighbors.forEach(point => {
        if (point.toLowerCase() !== point || !next.path.includes(point)) {
          queue.push({ point, path: [...next.path, point], twice: next.twice });
        } else if (!next.twice) {
          queue.push({ point, path: [...next.path, point], twice: true });
        }
      });
    }
  }
  return paths;
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
