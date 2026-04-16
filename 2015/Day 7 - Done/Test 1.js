import fs from "node:fs";

const ops = {
  AND: (p1, p2) => (2 ** 16 + (p1 & p2)) % 2 ** 16,
  OR: (p1, p2) => (2 ** 16 + (p1 | p2)) % 2 ** 16,
  NOT: (p1, p2) => (2 ** 16 + ~p2) % 2 ** 16,
  LSHIFT: (p1, p2) => (2 ** 16 + (p1 << p2)) % 2 ** 16,
  RSHIFT: (p1, p2) => (2 ** 16 + (p1 >> p2)) % 2 ** 16,
  undefined: p1 => (2 ** 16 + p1) % 2 ** 16,
};

function getter(id) {
  return id && id.match(/^[a-z]+$/) ? circuit => circuit[id]() : () => +id;
}

function makeCircuit(input) {
  return input
    .map(x =>
      x.match(/^(?:(\w+) )?(?:(AND|OR|NOT|LSHIFT|RSHIFT) (\w+) )?-> (\w+)$/),
    )
    .map(x => ({
      op: ops[`${x[2]}`],
      p1: getter(x[1]),
      p2: getter(x[3]),
      result: x[4],
    }))
    .reduce((circuit, gate) => {
      circuit[gate.result] = () => {
        let memo = gate.op(gate.p1(circuit), gate.p2(circuit));
        circuit[gate.result] = () => memo;
        return memo;
      };
      return circuit;
    }, {});
}

export function part1(input) {
  return makeCircuit(input.split("\n")).a();
}

export function part2(input) {
  return makeCircuit(input.split("\n").concat(`${part1(input)} -> b`)).a();
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
