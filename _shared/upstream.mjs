import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
export const UPSTREAM_SOURCE = {
  id: "shahata/adventofcode-solver",
  repoUrl: "https://github.com/shahata/adventofcode-solver",
  rawBase: "https://raw.githubusercontent.com/shahata/adventofcode-solver/main/src",
  inputMode: "public-mirror"
};

const FETCH_HEADERS = {
  "User-Agent": "codex-aoc-simulated",
  "Accept": "text/plain,application/javascript,text/javascript,*/*"
};

const SHIM_TARGETS = {
  "@datastructures-js/priority-queue": path.join(ROOT_DIR, "_shared", "shims", "priority-queue.mjs"),
  "@graph-algorithm/minimum-cut": path.join(ROOT_DIR, "_shared", "shims", "minimum-cut.mjs"),
  "combinatorial-generators": path.join(ROOT_DIR, "_shared", "shims", "combinatorial-generators.mjs"),
  "regenerator-runtime": path.join(ROOT_DIR, "_shared", "shims", "regenerator-runtime.mjs"),
  "z3-solver": path.join(ROOT_DIR, "_shared", "shims", "z3-solver.mjs")
};

export function padDay(day) {
  return String(day).padStart(2, "0");
}

export function normalizeInput(text) {
  return text.replace(/\uFEFF/g, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trimEnd();
}

export function getDayFolder(year, day, done = true) {
  const suffix = done ? " - Done" : "";
  return path.join(ROOT_DIR, String(year), `Day ${day}${suffix}`);
}

export async function ensureFileContents(filePath, contents) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    const current = await fs.readFile(filePath, "utf8");
    if (current === contents) {
      return false;
    }
  } catch {
    // Missing file is fine.
  }

  await fs.writeFile(filePath, contents, "utf8");
  return true;
}

async function fetchText(url, { allow404 = false, retries = 3 } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, { headers: FETCH_HEADERS });

      if (response.status === 404 && allow404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status} for ${url}`);
      }

      return await response.text();
    } catch (error) {
      lastError = error;

      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, attempt * 500));
      }
    }
  }

  throw lastError;
}

export async function fetchUpstreamInput(year, day, options = {}) {
  return fetchText(`${UPSTREAM_SOURCE.rawBase}/${year}/day${padDay(day)}.txt`, options);
}

function getRepoModulePath(year, day) {
  return `src/${year}/day${padDay(day)}.js`;
}

function getRawModuleUrl(repoPath) {
  return `${UPSTREAM_SOURCE.rawBase}/${repoPath.replace(/^src\//, "")}`;
}

function getCachedModulePath(repoPath) {
  return path.join(ROOT_DIR, ".cache", "upstream", "shahata", repoPath);
}

function resolveRepoPath(repoPath, specifier) {
  return path.posix.normalize(path.posix.join(path.posix.dirname(repoPath), specifier));
}

function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

function listRelativeImports(source) {
  const specifiers = new Set();
  const strippedSource = stripComments(source);
  const patterns = [
    /(?:import|export)\s+(?:[^"'`]*?\s+from\s+)?["']([^"'`]+)["']/g,
    /import\(\s*["']([^"'`]+)["']\s*\)/g
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(strippedSource)) !== null) {
      if (match[1].startsWith(".")) {
        specifiers.add(match[1]);
      }
    }
  }

  return [...specifiers];
}

function toImportPath(fromFilePath, targetPath) {
  let relativePath = path.relative(path.dirname(fromFilePath), targetPath).replace(/\\/g, "/");
  if (!relativePath.startsWith(".")) {
    relativePath = `./${relativePath}`;
  }
  return relativePath;
}

function rewriteImports(source, repoPath) {
  const cachedModulePath = getCachedModulePath(repoPath);
  const replaceSpecifier = specifier => {
    if (specifier.startsWith(".") || specifier.startsWith("node:")) {
      return specifier;
    }

    const shimTarget = SHIM_TARGETS[specifier];
    if (!shimTarget) {
      throw new Error(`Unsupported bare import "${specifier}" in ${repoPath}`);
    }

    return toImportPath(cachedModulePath, shimTarget);
  };

  return source
    .replace(
      /((?:import|export)\s+(?:[^"'`]*?\s+from\s+)?)["']([^"'`]+)["']/g,
      (fullMatch, prefix, specifier) => `${prefix}"${replaceSpecifier(specifier)}"`
    )
    .replace(
      /(import\(\s*)["']([^"'`]+)["'](\s*\))/g,
      (fullMatch, prefix, specifier, suffix) => `${prefix}"${replaceSpecifier(specifier)}"${suffix}`
    );
}

export async function ensureCachedModule(repoPath, seen = new Set()) {
  if (seen.has(repoPath)) {
    return getCachedModulePath(repoPath);
  }

  seen.add(repoPath);

  const cachedModulePath = getCachedModulePath(repoPath);
  let source;

  try {
    source = await fs.readFile(cachedModulePath, "utf8");
    return cachedModulePath;
  } catch {
    source = await fetchText(getRawModuleUrl(repoPath));
  }

  for (const specifier of listRelativeImports(source)) {
    const dependencyRepoPath = resolveRepoPath(repoPath, specifier);
    await ensureCachedModule(dependencyRepoPath, seen);
  }

  await ensureFileContents(cachedModulePath, rewriteImports(source, repoPath));
  return cachedModulePath;
}

export async function loadSolver(year, day) {
  const repoPath = getRepoModulePath(year, day);
  const cachedModulePath = await ensureCachedModule(repoPath);
  return import(`${pathToFileURL(cachedModulePath).href}?mtime=${Date.now()}`);
}

export async function solveWithUpstream(year, day, input) {
  const solver = await loadSolver(year, day);
  const normalizedInput = normalizeInput(input);
  const part1 = typeof solver.part1 === "function" ? await solver.part1(normalizedInput) : undefined;
  const part2 = typeof solver.part2 === "function" ? await solver.part2(normalizedInput) : undefined;
  return { part1, part2 };
}

export async function readDayInput(year, day) {
  return normalizeInput(await fs.readFile(path.join(getDayFolder(year, day), "input.txt"), "utf8"));
}

export function latestCoveredDay(year) {
  return year === 2025 ? 12 : 25;
}

export function listCoveredDays() {
  const entries = [];
  for (let year = 2015; year <= 2025; year += 1) {
    for (let day = 1; day <= latestCoveredDay(year); day += 1) {
      entries.push({ year, day });
    }
  }
  return entries;
}

export async function listGeneratedDays() {
  const entries = [];
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

      entries.push({ year, day: Number(match[1]), dir: path.join(yearPath, dayEntry.name) });
    }
  }

  return entries.sort((left, right) => left.year - right.year || left.day - right.day);
}

