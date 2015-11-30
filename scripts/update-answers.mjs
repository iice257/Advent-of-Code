import fs from "node:fs/promises";
import path from "node:path";

import {
  ROOT_DIR,
  UPSTREAM_SOURCE,
  listGeneratedDays,
  readDayInput,
  solveWithUpstream
} from "../_shared/upstream.mjs";

const manifestPath = path.join(ROOT_DIR, "answers.json");

function serializeValue(value) {
  return value === undefined || value === null ? null : String(value);
}

async function main() {
  const manifest = {
    generatedAt: new Date().toISOString(),
    source: UPSTREAM_SOURCE.id,
    days: {}
  };

  for (const { year, day } of await listGeneratedDays()) {
    const input = await readDayInput(year, day);
    const result = await solveWithUpstream(year, day, input);

    if (!manifest.days[year]) {
      manifest.days[year] = {};
    }

    manifest.days[year][day] = {
      part1: serializeValue(result.part1),
      part2: serializeValue(result.part2)
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

