import fs from "node:fs/promises";
import path from "node:path";

import { ROOT_DIR, exists, listGeneratedDays, normalizeValue, runNodeScript } from "../_shared/day-files.mjs";

async function main() {
  const manifest = JSON.parse(await fs.readFile(path.join(ROOT_DIR, "answers.json"), "utf8"));
  const failures = [];
  let checked = 0;

  for (const { year, day, part1Path, part2Path } of await listGeneratedDays()) {
    const expected = manifest.days[String(year)][String(day)];
    if (!expected) {
      failures.push(`${year} Day ${day} missing expected answers entry`);
      continue;
    }

    const expectedPart1 = normalizeValue(expected.part1);
    const expectedPart2 = normalizeValue(expected.part2);

    const part1 = runNodeScript(part1Path);
    if (part1.status !== 0) {
      failures.push(`${year} Day ${day} part 1 exited with ${part1.status}: ${part1.stderr.trim() || part1.stdout.trim()}`);
    } else if (part1.value !== expectedPart1) {
      failures.push(`${year} Day ${day} part 1 expected ${expectedPart1} got ${part1.value}`);
    }

    const hasPart2 = await exists(part2Path);
    if (!hasPart2 && expectedPart2 !== null) {
      failures.push(`${year} Day ${day} missing Test 2.js but answers.json expects ${expectedPart2}`);
    } else {
      if (hasPart2) {
        const part2 = runNodeScript(part2Path);
        if (part2.status !== 0) {
          failures.push(`${year} Day ${day} part 2 exited with ${part2.status}: ${part2.stderr.trim() || part2.stdout.trim()}`);
        } else if (part2.value !== expectedPart2) {
          failures.push(`${year} Day ${day} part 2 expected ${expectedPart2} got ${part2.value}`);
        }
      } else if (expectedPart2 !== null) {
        failures.push(`${year} Day ${day} part 2 expected ${expectedPart2} got <missing file>`);
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

  console.log(`Verified ${checked} days against answers.json.`);
}

await main();
