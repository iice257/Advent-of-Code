import fs from "node:fs";

function simple(formula) {
  let result = 0;
  let operation = "+";
  formula.split(" ").forEach(x => {
    if (x === "+" || x === "*") {
      operation = x;
    } else if (operation === "+") {
      result += +x;
    } else if (operation === "*") {
      result *= +x;
    }
  });
  return result;
}

function solve(formula, precedence) {
  while (
    formula.includes("(") ||
    (precedence && formula.includes("+") && formula.includes("*"))
  ) {
    if (precedence) {
      formula = formula.replace(/(\d+ \+ )+\d+/g, x => simple(x));
    }
    formula = formula.replace(/\(([^()]*)\)/g, (a, x) => simple(x));
  }
  return simple(formula);
}

export function part1(input) {
  let formulas = input.split("\n");
  return formulas.map(x => solve(x)).reduce((a, b) => a + b);
}

export function part2(input) {
  let formulas = input.split("\n");
  return formulas.map(x => solve(x, true)).reduce((a, b) => a + b);
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
