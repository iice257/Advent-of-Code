import fs from "node:fs";

import md5 from "../../.cache/upstream/shahata/src/utils/md5.js";

export function day(input) {
  let hash,
    count = 0;
  let password1 = "";
  let password2 = [];
  let index = -1;
  while (count < 8) {
    do {
      index++;
      hash = md5(input + index);
    } while (!hash.startsWith("00000"));

    let i = +hash[5];
    password1 += hash[5];
    if (i >= 0 && i <= 7 && !password2[i]) {
      password2[i] = hash[6];
      count++;
    }
  }

  return {
    part1: password1.slice(0, 8),
    part2: password2.join(""),
  };
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
