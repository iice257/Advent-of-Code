import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

import { ROOT_DIR, listGeneratedDays, readDayInput, solveWithUpstream } from "../_shared/upstream.mjs";

function serializeValue(value) {
  if (value === undefined || value === null) {
    return null;
  }

  const normalized = String(value).trim();
  if (/^(?:none|null|undefined)$/i.test(normalized)) {
    return null;
  }

  return normalized;
}

function parseKeyValueOutput(text) {
  const result = {};
  for (const line of text.trim().split("\n").filter(Boolean)) {
    const [key, ...rest] = line.split("=");
    result[key.trim()] = rest.join("=").trim();
  }
  return result;
}

async function main() {
  const manifest = JSON.parse(await fs.readFile(path.join(ROOT_DIR, "answers.json"), "utf8"));
  const failures = [];
  let checked = 0;

  for (const { year, day, dir } of await listGeneratedDays()) {
    const input = await readDayInput(year, day);
    const actual = await solveWithUpstream(year, day, input);
    const expected = manifest.days[String(year)][String(day)];

    const actualPart1 = serializeValue(actual.part1);
    const actualPart2 = serializeValue(actual.part2);
    const expectedPart1 = serializeValue(expected.part1);
    const expectedPart2 = serializeValue(expected.part2);

    if (actualPart1 !== expectedPart1) {
      failures.push(`${year} Day ${day} part 1 expected ${expectedPart1} got ${actualPart1}`);
    }

    if (actualPart2 !== expectedPart2) {
      failures.push(`${year} Day ${day} part 2 expected ${expectedPart2} got ${actualPart2}`);
    }

    const pythonResult = spawnSync("python", [path.join(dir, "python", "main.py")], {
      cwd: ROOT_DIR,
      encoding: "utf8"
    });

    if (pythonResult.status !== 0) {
      failures.push(`${year} Day ${day} python exited with ${pythonResult.status}: ${pythonResult.stderr.trim()}`);
    } else {
      const parsed = parseKeyValueOutput(pythonResult.stdout);
      if (serializeValue(parsed.part1) !== expectedPart1) {
        failures.push(`${year} Day ${day} python part 1 expected ${expectedPart1} got ${serializeValue(parsed.part1)}`);
      }
      if (serializeValue(parsed.part2) !== expectedPart2) {
        failures.push(`${year} Day ${day} python part 2 expected ${expectedPart2} got ${serializeValue(parsed.part2)}`);
      }
    }

    checked += 1;
  }

  if (failures.length > 0) {
    console.error(`Verification failed for ${failures.length} checks.`);
    console.error(failures.join("\n"));
    process.exitCode = 1;
    return;
  }

  console.log(`Verified ${checked} days against answers.json and python ports.`);
}

await main();
