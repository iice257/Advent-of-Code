import fs from "node:fs/promises";
import path from "node:path";

import { ROOT_DIR, UPSTREAM_SOURCE, latestCoveredDay } from "../_shared/upstream.mjs";

function padDay(day) {
  return String(day).padStart(2, "0");
}

async function main() {
  const provenance = {
    generatedAt: new Date().toISOString(),
    source: UPSTREAM_SOURCE.id,
    acquisitionMode: UPSTREAM_SOURCE.inputMode,
    days: {}
  };

  for (let year = 2015; year <= 2025; year += 1) {
    provenance.days[year] = {};
    for (let day = 1; day <= latestCoveredDay(year); day += 1) {
      provenance.days[year][day] = {
        inputUrl: `${UPSTREAM_SOURCE.rawBase}/${year}/day${padDay(day)}.txt`,
        solverUrl: `${UPSTREAM_SOURCE.rawBase}/${year}/day${padDay(day)}.js`,
        acquisitionMode: UPSTREAM_SOURCE.inputMode
      };
    }
  }

  await fs.writeFile(
    path.join(ROOT_DIR, "provenance.json"),
    `${JSON.stringify(provenance, null, 2)}\n`,
    "utf8"
  );

  console.log("Wrote provenance.json.");
}

await main();

