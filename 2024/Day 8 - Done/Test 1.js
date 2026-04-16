import fs from "node:fs";

function parse(input) {
  let map = input.split("\n").map(line => line.split(""));
  let dic = new Map();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] !== ".") {
        let key = map[y][x];
        dic.set(key, (dic.get(key) || []).concat({ x, y }));
      }
    }
  }
  return { map, dic };
}

function pairs(dic, fn) {
  for (let points of dic.values()) {
    for (let point of points) {
      for (let other of points) {
        if (point !== other) {
          fn(point, point.x - other.x, point.y - other.y);
        }
      }
    }
  }
}
export function part1(input) {
  let { map, dic } = parse(input);
  pairs(dic, ({ x, y }, dx, dy) => {
    if (map[y - dy * 2]?.[x - dx * 2]) map[y - dy * 2][x - dx * 2] = "#";
  });
  return map.reduce((sum, line) => sum + line.filter(c => c === "#").length, 0);
}

export function part2(input) {
  let { map, dic } = parse(input);
  pairs(dic, ({ x, y }, dx, dy) => {
    while (map[y - dy]?.[x - dx]) map[(y -= dy)][(x -= dx)] = "#";
  });
  return map.reduce((sum, line) => sum + line.filter(c => c === "#").length, 0);
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
