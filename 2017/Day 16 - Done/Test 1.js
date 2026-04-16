import fs from "node:fs";

function parse(input, length) {
  let regexp = /^(s|x|p)([^/]*)\/?([^/]*)$/;
  let rebuild = arr => [arr[0], arr[3], arr[2], arr[1], arr[4]].join("");
  let swap = (a, b) => new RegExp(`^(.{${a}})(.)(.{${b - a - 1}})(.)(.*)$`);
  let ops = {
    x: (str, regexp) => rebuild(str.match(regexp).slice(1)),
    p: (str, [a, b]) => {
      let [i, j] = [str.indexOf(a), str.indexOf(b)].sort((a, b) => a - b);
      return rebuild(str.match(swap(i, j)).slice(1));
    },
    s: (str, regexp) => str.match(regexp).slice(1).reverse().join(""),
  };
  let params = {
    x: (a, b) => swap(...[+a, +b].sort((a, b) => a - b)),
    p: (a, b) => [a, b],
    s: a => new RegExp(`^(.*)(.{${+a % length}})$`),
  };
  return input
    .split(",")
    .map(x => x.match(regexp).slice(1))
    .map(cmd => {
      let op = ops[cmd[0]];
      let args = params[cmd[0]](cmd[1], cmd[2]);
      return { op, args };
    });
}

function dance(order, commands) {
  return commands.reduce((x, { op, args }) => op(x, args), order);
}

export function part1(input, order = "abcdefghijklmnop") {
  return dance(order, parse(input, order.length));
}

export function part2(input, order = "abcdefghijklmnop", times = 1e9) {
  let commands = parse(input, order.length);
  let memory = {};
  let i;
  for (i = 0; i < times; i++) {
    if (memory[order]) {
      let loop = i - memory[order];
      i += times - (times % loop);
      while (i > times - 1) {
        i -= loop;
      }
    } else {
      memory[order] = i;
    }
    order = dance(order, commands);
  }
  return order;
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
