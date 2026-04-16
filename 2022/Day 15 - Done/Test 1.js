import fs from "node:fs";

function parse(input) {
  return input.split("\n").map(line => {
    let [, sx, sy, bx, by] = line.match(
      /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/,
    );
    return { sx: +sx, sy: +sy, bx: +bx, by: +by };
  });
}

export function part1(input, y = 2000000) {
  let sensors = parse(input);
  let options = new Set();
  for (let { sx, sy, bx, by } of sensors) {
    let distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y);
    for (let x = sx - distance; x <= sx + distance; x++) {
      if (bx !== x || by !== y) options.add(x);
    }
  }
  return options.size;
}

export function part2(input, size = 4000000) {
  let sensors = parse(input);
  for (let y = 0; y <= size; y++) {
    let ranges = [];
    for (let { sx, sy, bx, by } of sensors) {
      let distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y);
      if (distance >= 0) ranges.push([sx - distance, sx + distance]);
      if (by === y) ranges.push([bx, bx]);
    }
    ranges = ranges.sort((a, b) => a[0] - b[0]);

    let guess = 0;
    for (let range of ranges) {
      if (guess >= range[0] && guess <= range[1]) guess = range[1] + 1;
    }
    if (guess <= size) return guess * 4000000 + y;
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
