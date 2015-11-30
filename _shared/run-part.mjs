import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { normalizeInput, solveWithUpstream } from "./upstream.mjs";

export function parseDayContext(scriptUrl) {
  const scriptPath = fileURLToPath(scriptUrl);
  const dayDir = path.dirname(scriptPath);
  const yearDir = path.dirname(dayDir);
  const year = Number(path.basename(yearDir));
  const dayMatch = path.basename(dayDir).match(/^Day (\d+)(?: - Done)?$/);

  if (!Number.isInteger(year) || !dayMatch) {
    throw new Error(`Unable to infer year/day from ${scriptPath}`);
  }

  return {
    year,
    day: Number(dayMatch[1]),
    dayDir
  };
}

export async function solvePartFromCurrentDay(scriptUrl, part) {
  const { year, day, dayDir } = parseDayContext(scriptUrl);
  const input = normalizeInput(await fs.readFile(path.join(dayDir, "input.txt"), "utf8"));
  const result = await solveWithUpstream(year, day, input);
  return part === 1 ? result.part1 : result.part2;
}

export async function runPartFromCurrentDay(scriptUrl, part) {
  const value = await solvePartFromCurrentDay(scriptUrl, part);
  if (value !== undefined && value !== null) {
    console.log(value);
  }
  return value;
}

