import fs from "node:fs";

import { ocr } from "../../.cache/upstream/shahata/src/utils/ocr.js";

export function part1(input, wide = 25, tall = 6) {
  let bits = input.split("");
  let layers = [];
  bits.forEach((bit, index) => {
    let layer = Math.floor(index / (wide * tall));
    layers[layer] = (layers[layer] || []).concat(bit);
  });
  let counts = layers.map(x => ({
    zeros: x.filter(bit => bit === "0").length,
    result:
      x.filter(bit => bit === "1").length * x.filter(bit => bit === "2").length,
  }));
  return counts.sort((a, b) => a.zeros - b.zeros).shift().result;
}

export function part2(input, wide = 25, tall = 6) {
  let bits = input.split("");
  let layers = [];
  bits.forEach((bit, index) => {
    let layer = Math.floor(index / (wide * tall));
    layers[layer] = (layers[layer] || []).concat(bit);
  });
  let result = new Array(wide * tall).fill("2");
  layers.forEach(layer => {
    layer.forEach((bit, index) => {
      result[index] = result[index] === "2" ? bit : result[index];
    });
  });
  let rows = [];
  result.forEach((bit, index) => {
    let row = Math.floor(index / wide);
    rows[row] = (rows[row] || "") + bit;
  });
  return ocr(
    rows.map(row => `${row.replace(/0/g, ".").replace(/1/g, "#")}`).join("\n"),
  );
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
