import fs from "node:fs";

function parse(input) {
  return input.split("\n").reduce((obj, line) => {
    let [key, neighbors] = line.split(" <-> ");
    return { ...obj, [key]: neighbors.split(", ") };
  }, {});
}

function count(graph, key, visited = new Set()) {
  visited.add(key);
  graph[key]
    .filter(x => !visited.has(x))
    .forEach(x => count(graph, x, visited));
  return visited;
}

function countGroups(graph) {
  let groups = 0;
  let visited = new Set();
  Object.keys(graph).forEach(x => {
    if (!visited.has(x)) {
      groups++;
      count(graph, x, visited);
    }
  });
  return groups;
}

export function part1(input) {
  return count(parse(input), "0").size;
}

export function part2(input) {
  return countGroups(parse(input));
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
