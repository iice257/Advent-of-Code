import fs from "node:fs";

function parse(input) {
  return input.split("\n").map(line => {
    let [color, content] = line.split(" contain ");
    color = color.replace(/ bags?\.?/, "");
    content = content.split(", ").map(x => x.replace(/ bags?\.?/, ""));
    content = content
      .filter(x => x !== "no other")
      .map(x => {
        let [, count, color] = x.match(/^(\d+) (.*)$/);
        return { color, count: +count };
      });
    return { color, content };
  });
}

function walk1(graph, color, total = []) {
  graph[color]?.forEach(c => {
    total.push(c);
    walk1(graph, c, total);
  });
  return total;
}

export function part1(input) {
  let bags = parse(input);
  let graph = {};
  bags.forEach(bag => {
    bag.content.forEach(({ color }) => {
      graph[color] = (graph[color] || []).concat(bag.color);
    });
  });
  return new Set(walk1(graph, "shiny gold")).size;
}

function walk2(graph, color) {
  return graph[color].reduce((sum, bag) => {
    return sum + bag.count * walk2(graph, bag.color);
  }, 1);
}

export function part2(input) {
  let bags = parse(input);
  let graph = {};
  bags.forEach(bag => (graph[bag.color] = bag.content));
  return walk2(graph, "shiny gold") - 1;
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
