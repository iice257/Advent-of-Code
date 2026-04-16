import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

export function padDay(day) {
  return String(day).padStart(2, "0");
}

export function normalizeValue(value) {
  if (value === undefined || value === null) {
    return null;
  }

  const text = String(value).trim();
  if (text === "" || /^(?:none|null|undefined)$/i.test(text)) {
    return null;
  }

  return text;
}

export function dayDir(year, day) {
  return path.join(ROOT_DIR, String(year), `Day ${day} - Done`);
}

export function partFile(year, day, part) {
  return path.join(dayDir(year, day), `Test ${part}.js`);
}

export async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function listGeneratedDays() {
  const result = [];
  const rootEntries = await fs.readdir(ROOT_DIR, { withFileTypes: true });

  for (const yearEntry of rootEntries) {
    if (!yearEntry.isDirectory() || !/^\d{4}$/.test(yearEntry.name)) {
      continue;
    }

    const year = Number(yearEntry.name);
    const yearPath = path.join(ROOT_DIR, yearEntry.name);
    const dayEntries = await fs.readdir(yearPath, { withFileTypes: true });

    for (const dayEntry of dayEntries) {
      if (!dayEntry.isDirectory()) {
        continue;
      }

      const match = dayEntry.name.match(/^Day (\d+) - Done$/);
      if (!match) {
        continue;
      }

      const day = Number(match[1]);
      const dir = path.join(yearPath, dayEntry.name);
      result.push({
        year,
        day,
        dir,
        part1Path: path.join(dir, "Test 1.js"),
        part2Path: path.join(dir, "Test 2.js")
      });
    }
  }

  return result.sort((left, right) => left.year - right.year || left.day - right.day);
}

export function runNodeScript(filePath) {
  const result = spawnSync(process.execPath, [filePath], {
    cwd: ROOT_DIR,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024
  });

  const stdout = result.stdout ?? "";
  const stderr = result.stderr ?? "";
  const lines = stdout
    .split(/\r?\n/u)
    .map(line => line.trim())
    .filter(Boolean);

  return {
    status: result.status ?? 0,
    stdout,
    stderr,
    value: normalizeValue(lines.at(-1) ?? null)
  };
}
