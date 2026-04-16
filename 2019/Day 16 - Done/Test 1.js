import fs from "node:fs";

function fft(digits) {
  let pattern = [0, 1, 0, -1];
  let result = [];
  for (let i = 0; i < digits.length; i++) {
    let calc = 0;
    for (let j = 0; j < digits.length; j++) {
      calc += digits[j] * pattern[Math.floor((j + 1) / (i + 1)) % 4];
    }
    result.push(Math.abs(calc) % 10);
  }
  return result;
}

function fft2(digits) {
  let result = new Array(digits.length);
  for (let i = digits.length - 1; i >= 0; i--) {
    let prev = result[i + 1] || 0;
    result[i] = Math.abs(prev + digits[i]) % 10;
  }
  return result;
}

export function part1(input, phases = 100) {
  let digits = input.split("").map(Number);
  for (let i = 0; i < phases; i++) {
    digits = fft(digits);
  }
  return digits.slice(0, 8).join("");
}

export function part2(input) {
  input = input.repeat(10000).slice(+input.slice(0, 7));
  let digits = input.split("").map(Number);

  for (let i = 0; i < 100; i++) {
    digits = fft2(digits);
  }

  return digits.slice(0, 8).join("");
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
