import fs from "node:fs/promises";
import path from "node:path";

import { ROOT_DIR, exists, listGeneratedDays, padDay } from "../_shared/day-files.mjs";

const INPUT_SOURCE = {
  id: "shahata/adventofcode-solver",
  rawBase: "https://raw.githubusercontent.com/shahata/adventofcode-solver/main/src",
  acquisitionMode: "public-mirror"
};

const SOLVER_SOURCE = {
  id: "shahata/adventofcode-solver",
  repoBase: "https://raw.githubusercontent.com/shahata/adventofcode-solver/main/src"
};

function solverPath(year, day, part) {
  const paddedDay = padDay(day);
  return `${year}/day${paddedDay}.js`;
}

async function main() {
  const provenance = {
    generatedAt: new Date().toISOString(),
    inputSource: INPUT_SOURCE.id,
    solverSource: SOLVER_SOURCE.id,
    acquisitionMode: INPUT_SOURCE.acquisitionMode,
    days: {}
  };

  for (const { year, day, part2Path } of await listGeneratedDays()) {
    if (!provenance.days[year]) {
      provenance.days[year] = {};
    }

    const part2Url = await exists(part2Path)
      ? `${SOLVER_SOURCE.repoBase}/${solverPath(year, day, 2)}`
      : null;

    provenance.days[year][day] = {
      inputUrl: `${INPUT_SOURCE.rawBase}/${year}/day${padDay(day)}.txt`,
      solverPart1Url: `${SOLVER_SOURCE.repoBase}/${solverPath(year, day, 1)}`,
      solverPart2Url: part2Url,
      acquisitionMode: INPUT_SOURCE.acquisitionMode
    };
  }

  await fs.writeFile(
    path.join(ROOT_DIR, "provenance.json"),
    `${JSON.stringify(provenance, null, 2)}\n`,
    "utf8"
  );

  console.log("Wrote provenance.json.");
}

await main();
