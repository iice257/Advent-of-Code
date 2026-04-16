import fs from "node:fs";

function unique(networks) {
  networks = networks.map(x => x.sort().join(","));
  return [...new Set(networks)].map(x => x.split(","));
}

function addOneToNetworks(networks, map) {
  let result = networks.flatMap(computers => {
    let candidates = computers.map(c => map.get(c));
    let additions = candidates.reduce((a, b) => a.intersection(b));
    return [...additions].map(add => [...computers, add]);
  });
  return unique(result);
}

function parse(input) {
  let networks = input.split("\n").map(line => line.split("-"));
  let map = new Map();
  networks.forEach(pair => {
    map.set(pair[0], (map.get(pair[0]) || new Set()).add(pair[1]));
    map.set(pair[1], (map.get(pair[1]) || new Set()).add(pair[0]));
  });
  return { networks, map };
}

export function part1(input) {
  let { networks, map } = parse(input);
  networks = addOneToNetworks(networks, map);
  networks = networks.filter(c => c.some(x => x.startsWith("t")));
  return networks.length;
}

export function part2(input) {
  let { networks, map } = parse(input);
  while (networks.length > 1) networks = addOneToNetworks(networks, map);
  return networks[0].sort().join(",");
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
