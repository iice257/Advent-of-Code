import fs from "node:fs";

function topad(str) {
  let result = {};
  let pad = str.split("\n").map(row => row.split(""));
  pad.map((row, y) => row.map((c, x) => (result[c] = { x, y })));
  return result;
}

let memory = {};
let keypad = topad("789\n456\n123\nX0A");
let arrowpad = topad("X^A\n<v>");
function type(code, robots, human = false) {
  if (robots === 0) return code.length;
  if (memory[`${code},${robots}`]) return memory[`${code},${robots}`];
  let pad = human ? keypad : arrowpad;
  let from = pad["A"];
  let pushes = 0;
  for (let button of code) {
    let to = pad[button];
    let queue = [{ ...from, push: "" }];
    let min = Infinity;
    while (queue.length) {
      let { x, y, push } = queue.shift();
      if (x === pad["X"].x && y === pad["X"].y) continue;
      if (x === to.x && y === to.y) {
        min = Math.min(min, type(`${push}A`, human ? robots : robots - 1));
      }
      if (to.x > x) queue.push({ x: x + 1, y, push: `${push}>` });
      if (to.x < x) queue.push({ x: x - 1, y, push: `${push}<` });
      if (to.y > y) queue.push({ x, y: y + 1, push: `${push}v` });
      if (to.y < y) queue.push({ x, y: y - 1, push: `${push}^` });
    }
    pushes += min;
    from = to;
  }
  memory[`${code},${robots}`] = pushes;
  return pushes;
}

function solve(input, robots) {
  return input
    .split("\n")
    .map(code => parseInt(code) * type(code, robots, true))
    .reduce((a, b) => a + b, 0);
}

export function part1(input) {
  return solve(input, 2);
}

export function part2(input) {
  return solve(input, 25);
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
