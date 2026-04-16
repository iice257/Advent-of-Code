import fs from "node:fs";

import "../../_shared/shims/regenerator-runtime.mjs";
import { mincut } from "../../_shared/shims/minimum-cut.mjs";

function graphSize(graph, ignored, visited = new Set()) {
  let queue = [Object.keys(graph)[0]];
  while (queue.length > 0) {
    let component = queue.shift();
    visited.add(component);
    graph[component].forEach(c => {
      if (!visited.has(c) && !ignored[component]?.includes(c)) queue.push(c);
    });
  }
  return visited.size;
}

function toGraph(edges) {
  let graph = {};
  edges.forEach(([a, b]) => {
    graph[a] = (graph[a] || []).concat(b);
    graph[b] = (graph[b] || []).concat(a);
  });
  return graph;
}

export function part1(input) {
  let edges = [];
  input.split("\n").forEach(line => {
    let [component, connections] = line.split(": ");
    connections = connections.split(" ");
    connections.forEach(connection => edges.push([component, connection]));
  });
  let graph = toGraph(edges);
  let ignored = toGraph([...mincut(edges)]);
  let size = graphSize(graph, {});
  let x = graphSize(graph, ignored);
  return x * (size - x);
}

export function part2() {
  return undefined;
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
