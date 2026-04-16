import fs from "node:fs";

function buffer(image, c) {
  image = image.map(line => [c, c, ...line, c, c]);
  let e = new Array(image[0].length).fill(c);
  return [e, e, ...image, e, e];
}

function enhance(image, algorithm) {
  let next = new Array(image.length).fill().map(() => []);
  let get = (i, j) => (image[i] && image[i][j]) || image[0][0];
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[0].length; j++) {
      let area = [
        get(i - 1, j - 1),
        get(i - 1, j + 0),
        get(i - 1, j + 1),
        get(i + 0, j - 1),
        get(i + 0, j + 0),
        get(i + 0, j + 1),
        get(i + 1, j - 1),
        get(i + 1, j + 0),
        get(i + 1, j + 1),
      ].join("");
      let pixel = area.replaceAll("#", "1").replaceAll(".", "0");
      next[i][j] = algorithm[parseInt(pixel, 2)];
    }
  }
  return next;
}
export function part1(input, times = 2) {
  let [algorithm, image] = input.split("\n\n");
  image = image.split("\n").map(line => line.split(""));
  for (let i = 0; i < times; i++) {
    image = buffer(image, i === 0 ? "." : image[0][0]);
    image = enhance(image, algorithm);
  }
  return image.flat().filter(x => x === "#").length;
}

export function part2(input) {
  return part1(input, 50);
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
