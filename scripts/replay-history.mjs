import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const TEMP_BRANCH = "codex/test-solutions-rebuild";
const ROOT_SOURCE_PATHS = [
  ".gitignore",
  "README.md",
  "package.json",
  "_shared",
  "scripts"
];
const FINAL_MANIFEST_PATHS = [
  "answers.json",
  "provenance.json",
  path.join("history", "commit-schedule.json")
];
const PART_1_WIP = `// Day in progress.\nthrow new Error("Part 1 in progress");\n`;
const PART_2_WIP = `// Part 2 in progress.\nthrow new Error("Part 2 in progress");\n`;

function runGit(args, { cwd = ROOT_DIR, env = {} } = {}) {
  const result = spawnSync("git", args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, ...env }
  });

  if (result.status !== 0) {
    const details = [result.stdout?.trim(), result.stderr?.trim()].filter(Boolean).join("\n");
    throw new Error(`git ${args.join(" ")} failed${details ? `\n${details}` : ""}`);
  }

  return result;
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function removePath(targetPath) {
  await fs.rm(targetPath, { recursive: true, force: true });
}

async function ensureParent(targetPath) {
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
}

async function copyPath(sourcePath, destinationPath) {
  await ensureParent(destinationPath);
  await fs.cp(sourcePath, destinationPath, { force: true, recursive: true });
}

async function writeText(targetPath, contents) {
  await ensureParent(targetPath);
  await fs.writeFile(targetPath, contents, "utf8");
}

function dayDoneDir(baseDir, year, day) {
  return path.join(baseDir, String(year), `Day ${day} - Done`);
}

function dayWipDir(baseDir, year, day) {
  return path.join(baseDir, String(year), `Day ${day}`);
}

function pathWithinDay(baseDir, year, day, done, relativePath) {
  return path.join(done ? dayDoneDir(baseDir, year, day) : dayWipDir(baseDir, year, day), relativePath);
}

function loadSchedule(snapshotDir) {
  const schedulePath = path.join(snapshotDir, "history", "commit-schedule.json");
  return fs.readFile(schedulePath, "utf8").then(text => JSON.parse(text));
}

async function createSourceSnapshot() {
  const snapshotDir = await fs.mkdtemp(path.join(os.tmpdir(), "aoc-test-solutions-"));
  const seenDays = new Set();
  const schedule = JSON.parse(await fs.readFile(path.join(ROOT_DIR, "history", "commit-schedule.json"), "utf8"));

  for (const relativePath of ROOT_SOURCE_PATHS) {
    await copyPath(path.join(ROOT_DIR, relativePath), path.join(snapshotDir, relativePath));
  }

  for (const relativePath of FINAL_MANIFEST_PATHS) {
    await copyPath(path.join(ROOT_DIR, relativePath), path.join(snapshotDir, relativePath));
  }

  for (const commit of schedule.commits) {
    if (!commit.year || !commit.day) {
      continue;
    }

    const key = `${commit.year}-${commit.day}`;
    if (seenDays.has(key)) {
      continue;
    }

    seenDays.add(key);
    await copyPath(
      dayDoneDir(ROOT_DIR, commit.year, commit.day),
      dayDoneDir(snapshotDir, commit.year, commit.day)
    );
  }

  return snapshotDir;
}

async function clearRepoRoot() {
  const entries = await fs.readdir(ROOT_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".git") {
      continue;
    }

    await removePath(path.join(ROOT_DIR, entry.name));
  }
}

async function ensureCleanOrphanBranch() {
  if (runGit(["branch", "--list", TEMP_BRANCH]).stdout.trim()) {
    runGit(["branch", "-D", TEMP_BRANCH]);
  }
  runGit(["checkout", "--orphan", TEMP_BRANCH]);
  runGit(["rm", "-r", "-f", "--ignore-unmatch", "."]);
  await clearRepoRoot();
}

async function restoreSetup(snapshotDir) {
  for (const relativePath of ROOT_SOURCE_PATHS) {
    await copyPath(path.join(snapshotDir, relativePath), path.join(ROOT_DIR, relativePath));
  }
}

async function applyDayStarted(snapshotDir, year, day) {
  await copyPath(
    pathWithinDay(snapshotDir, year, day, true, "input.txt"),
    pathWithinDay(ROOT_DIR, year, day, false, "input.txt")
  );
  await writeText(pathWithinDay(ROOT_DIR, year, day, false, "Test 1.js"), PART_1_WIP);
}

async function applyDayTest1Complete(snapshotDir, year, day) {
  await copyPath(
    pathWithinDay(snapshotDir, year, day, true, "Test 1.js"),
    pathWithinDay(ROOT_DIR, year, day, false, "Test 1.js")
  );
}

async function applyDayTest2Started(year, day) {
  await writeText(pathWithinDay(ROOT_DIR, year, day, false, "Test 2.js"), PART_2_WIP);
}

async function applyDayComplete(snapshotDir, year, day) {
  const workingDir = dayWipDir(ROOT_DIR, year, day);
  const doneDir = dayDoneDir(ROOT_DIR, year, day);

  await ensureParent(doneDir);
  if (await exists(doneDir)) {
    await removePath(doneDir);
  }

  await fs.rename(workingDir, doneDir);
  await copyPath(
    pathWithinDay(snapshotDir, year, day, true, "Test 2.js"),
    pathWithinDay(ROOT_DIR, year, day, true, "Test 2.js")
  );
}

async function applyPythonPorts(snapshotDir, year, schedule) {
  const days = new Set();
  for (const commit of schedule.commits) {
    if (commit.year === year && commit.day) {
      days.add(commit.day);
    }
  }

  for (const day of [...days].sort((left, right) => left - right)) {
    await copyPath(
      pathWithinDay(snapshotDir, year, day, true, "python"),
      pathWithinDay(ROOT_DIR, year, day, true, "python")
    );
  }
}

async function applyFinalManifests(snapshotDir) {
  for (const relativePath of FINAL_MANIFEST_PATHS) {
    await copyPath(path.join(snapshotDir, relativePath), path.join(ROOT_DIR, relativePath));
  }
}

function hasChanges() {
  return runGit(["status", "--porcelain"]).stdout.trim().length > 0;
}

function commitAll(message, timestamp) {
  runGit(["add", "-A"]);

  if (!hasChanges()) {
    throw new Error(`No changes to commit for "${message}"`);
  }

  runGit(["commit", "-m", message], {
    env: {
      GIT_AUTHOR_DATE: timestamp,
      GIT_COMMITTER_DATE: timestamp
    }
  });
}

async function applyCommit(snapshotDir, schedule, commit) {
  if (!commit.year && !commit.day) {
    if (commit.message === "Set up node test layout") {
      await restoreSetup(snapshotDir);
      return;
    }

    if (commit.message === "Add answers and provenance manifests") {
      await applyFinalManifests(snapshotDir);
      return;
    }

    throw new Error(`Unsupported root commit message: ${commit.message}`);
  }

  if (/^Day \d+ started$/.test(commit.message)) {
    await applyDayStarted(snapshotDir, commit.year, commit.day);
    return;
  }

  if (/^Day \d+ test 1 complete$/.test(commit.message)) {
    await applyDayTest1Complete(snapshotDir, commit.year, commit.day);
    return;
  }

  if (commit.message === "continue tomorrow" || /^Day \d+ test 2 started$/.test(commit.message)) {
    await applyDayTest2Started(commit.year, commit.day);
    return;
  }

  if (/^Day \d+ tests complete$/.test(commit.message)) {
    await applyDayComplete(snapshotDir, commit.year, commit.day);
    return;
  }

  const pythonMatch = commit.message.match(/^Python (\d{4}) ports$/);
  if (pythonMatch) {
    await applyPythonPorts(snapshotDir, Number(pythonMatch[1]), schedule);
    return;
  }

  throw new Error(`Unsupported commit message: ${commit.message}`);
}

async function main() {
  const snapshotDir = await createSourceSnapshot();
  const schedule = await loadSchedule(snapshotDir);

  try {
    await ensureCleanOrphanBranch();

    const totalCommits = schedule.commits.length;
    for (let index = 0; index < totalCommits; index += 1) {
      const commit = schedule.commits[index];
      await applyCommit(snapshotDir, schedule, commit);
      commitAll(commit.message, commit.timestamp);

      if ((index + 1) % 50 === 0 || index + 1 === totalCommits) {
        console.log(`Committed ${index + 1}/${totalCommits}: ${commit.message}`);
      }
    }

    runGit(["branch", "-M", "test-solutions"]);
    console.log("History replay complete on test-solutions.");
  } finally {
    await removePath(snapshotDir);
  }
}

await main();
