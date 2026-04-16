import fs from "node:fs";

export function part1(input) {
  let commands = input.split("\n").map(cmd => cmd.split(" = "));
  let map = {};
  let orMask, andMask;
  commands.forEach(([address, value]) => {
    if (address === "mask") {
      orMask = BigInt(parseInt(value.replaceAll("X", "0"), 2));
      andMask = BigInt(parseInt(value.replaceAll("X", "1"), 2));
    } else {
      map[address] = Number((BigInt(+value) | orMask) & andMask);
    }
  });
  return Object.values(map).reduce((a, b) => a + b, 0);
}

export function part2(input) {
  let commands = input.split("\n").map(cmd => cmd.split(" = "));
  let map = {};
  let masks;
  commands.forEach(([address, value]) => {
    if (address === "mask") {
      let floating = [...value.matchAll("X")].map(m => 35n - BigInt(m.index));
      let orMask = BigInt(parseInt(value.replaceAll("X", "0"), 2));
      masks = new Array(2 ** floating.length)
        .fill({ orMask, andMask: 0n })
        .map((x, i) => {
          return floating.reduce(({ orMask, andMask }, position, bit) => {
            if ((i >> bit) & 1) {
              return { orMask: orMask | (1n << position), andMask };
            } else {
              return { orMask, andMask: andMask | (1n << position) };
            }
          }, x);
        });
    } else {
      address = BigInt(+address.match(/\d+/).pop());
      masks.forEach(x => (map[(address | x.orMask) & ~x.andMask] = +value));
    }
  });
  return Object.values(map).reduce((a, b) => a + b, 0);
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
