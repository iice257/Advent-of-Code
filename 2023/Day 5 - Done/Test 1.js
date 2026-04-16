import fs from "node:fs";

function parse(input) {
  let [seeds, ...maps] = input.split("\n\n");
  seeds = seeds.split(": ")[1].split(" ").map(Number);
  maps = maps.map(m =>
    m
      .split("\n")
      .slice(1)
      .map(r => r.split(" ").map(Number)),
  );
  return { seeds, maps };
}

function translate(map, seed) {
  let next = map.find(x => seed >= x[1] && seed < x[1] + x[2]);
  return { seed: next ? next[0] + (seed - next[1]) : seed, next };
}

export function part1(input) {
  let { seeds, maps } = parse(input);
  for (let map of maps) {
    seeds = seeds.map(seed => translate(map, seed).seed);
  }
  return Math.min(...seeds);
}

export function part2(input) {
  let { seeds, maps } = parse(input);
  let seeds2 = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seeds2.push({ start: seeds[i], length: seeds[i + 1] });
  }
  for (let map of maps) {
    seeds2 = seeds2.flatMap(range => {
      let result = [];
      while (range.length > 0) {
        let { seed, next } = translate(map, range.start);
        let remaining = next ? next[2] - (range.start - next[1]) : Infinity;
        let length = Math.min(range.length, remaining);
        result.push({ start: seed, length });
        range.start += length;
        range.length -= length;
      }
      return result;
    });
  }
  return Math.min(...seeds2.map(x => x.start));
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
