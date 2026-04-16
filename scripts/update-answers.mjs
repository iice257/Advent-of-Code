import fs from "node:fs/promises";
import path from "node:path";

import { ROOT_DIR, exists, listGeneratedDays, runNodeScript } from "../_shared/day-files.mjs";

const manifestPath = path.join(ROOT_DIR, "answers.json");

async function main() {
  const manifest = {
    generatedAt: new Date().toISOString(),
    source: "local-cached-js-files",
    days: {}
  };

  for (const { year, day, part1Path, part2Path } of await listGeneratedDays()) {
    const part1 = runNodeScript(part1Path);
    if (part1.status !== 0) {
      throw new Error(`${year} Day ${day} part 1 failed: ${part1.stderr.trim() || part1.stdout.trim()}`);
    }

    let part2Value = null;
    if (await exists(part2Path)) {
      const part2 = runNodeScript(part2Path);
      if (part2.status !== 0) {
        throw new Error(`${year} Day ${day} part 2 failed: ${part2.stderr.trim() || part2.stdout.trim()}`);
      }
      part2Value = part2.value;
    }

    if (!manifest.days[year]) {
      manifest.days[year] = {};
    }

    manifest.days[year][day] = {
      part1: part1.value,
      part2: part2Value
    };
  }

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  const count = Object.values(manifest.days).reduce(
    (sum, days) => sum + Object.keys(days).length,
    0
  );

  console.log(`Wrote answers.json for ${count} days.`);
}

await main();
