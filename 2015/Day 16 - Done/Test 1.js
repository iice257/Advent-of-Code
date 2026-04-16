import fs from "node:fs";

const expect1 = {
  id: () => true,
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

const expect2 = {
  ...expect1,
  cats: x => x > expect1.cats,
  trees: x => x > expect1.trees,
  pomeranians: x => x < expect1.pomeranians,
  goldfish: x => x < expect1.goldfish,
};

function parseMap(s, p1, p2) {
  return s
    .split(p1)
    .map(x => x.split(p2))
    .reduce((obj, pair) => ({ ...obj, [pair[0]]: +pair[1] }), {});
}

function matches(x, expect) {
  return Object.keys(x).every(key => {
    return typeof expect[key] === "function"
      ? expect[key](x[key])
      : expect[key] === x[key];
  });
}

function parse(input) {
  return input
    .split("\n")
    .map(x => x.match(/^Sue ([^:]*): (.*)/))
    .map(([, id, s]) => ({ id: +id, ...parseMap(s, ", ", ": ") }));
}

export function part1(input) {
  return parse(input)
    .filter(x => matches(x, expect1))
    .map(x => x.id)
    .shift();
}

export function part2(input) {
  return parse(input)
    .filter(x => matches(x, expect2))
    .map(x => x.id)
    .shift();
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
