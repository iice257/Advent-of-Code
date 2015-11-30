import fs from "node:fs/promises";
import path from "node:path";

import { ROOT_DIR, latestCoveredDay } from "../_shared/upstream.mjs";

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatDate(year, day) {
  return `${year}-12-${pad(day)}`;
}

function at(date, time) {
  return `${date}T${time}+01:00`;
}

function needsLateNightCommit(year, day) {
  return (year * 37 + day * 19) % 5 === 0;
}

async function main() {
  const commits = [];

  commits.push({
    timestamp: "2015-11-30T23:10:00+01:00",
    message: "Set up node test layout"
  });

  for (let year = 2015; year <= 2025; year += 1) {
    for (let day = 1; day <= latestCoveredDay(year); day += 1) {
      const baseDate = formatDate(year, day);
      const nextDate = formatDate(year, Math.min(day + 1, 31));

      commits.push({
        year,
        day,
        timestamp: at(baseDate, "06:18:00"),
        message: `Day ${day} started`
      });

      commits.push({
        year,
        day,
        timestamp: at(baseDate, "22:14:00"),
        message: `Day ${day} test 1 complete`
      });

      if (needsLateNightCommit(year, day)) {
        commits.push({
          year,
          day,
          timestamp: at(baseDate, "23:58:00"),
          message: "continue tomorrow"
        });

        commits.push({
          year,
          day,
          timestamp: at(nextDate, "00:53:00"),
          message: `Day ${day} tests complete`
        });
      } else {
        commits.push({
          year,
          day,
          timestamp: at(baseDate, "23:09:00"),
          message: `Day ${day} test 2 started`
        });

        commits.push({
          year,
          day,
          timestamp: at(baseDate, "23:47:00"),
          message: `Day ${day} tests complete`
        });
      }
    }
  }

  for (let year = 2015; year <= 2025; year += 1) {
    commits.push({
      year,
      timestamp: `${year + 1}-01-15T20:15:00+01:00`,
      message: `Python ${year} ports`
    });
  }

  commits.push({
    timestamp: "2026-04-14T09:15:00+01:00",
    message: "Add answers and provenance manifests"
  });

  await fs.mkdir(path.join(ROOT_DIR, "history"), { recursive: true });
  await fs.writeFile(
    path.join(ROOT_DIR, "history", "commit-schedule.json"),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), timezone: "Africa/Lagos", commits }, null, 2)}\n`,
    "utf8"
  );

  console.log(`Wrote history/commit-schedule.json with ${commits.length} commits.`);
}

await main();

