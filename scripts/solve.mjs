import { exists, partFile, runNodeScript } from "../_shared/day-files.mjs";

function usage() {
  console.log("Usage: npm run solve -- YEAR DAY [PART]");
}

async function main() {
  const [yearArg, dayArg, partArg] = process.argv.slice(2);
  if (!yearArg || !dayArg) {
    usage();
    process.exitCode = 1;
    return;
  }

  const year = Number(yearArg);
  const day = Number(dayArg);

  if (!Number.isInteger(year) || !Number.isInteger(day)) {
    usage();
    process.exitCode = 1;
    return;
  }

  const part1Path = partFile(year, day, 1);
  const part2Path = partFile(year, day, 2);
  const hasPart1 = await exists(part1Path);
  const hasPart2 = await exists(part2Path);

  if (!hasPart1) {
    console.error(`Missing solver file: ${part1Path}`);
    process.exitCode = 1;
    return;
  }

  if (partArg === "1") {
    const result = runNodeScript(part1Path);
    if (result.status !== 0) {
      console.error(result.stderr.trim() || `Solver exited with ${result.status}`);
      process.exitCode = result.status || 1;
      return;
    }
    console.log(result.value ?? "");
    return;
  }

  if (partArg === "2") {
    if (!hasPart2) {
      console.log("");
      return;
    }

    const result = runNodeScript(part2Path);
    if (result.status !== 0) {
      console.error(result.stderr.trim() || `Solver exited with ${result.status}`);
      process.exitCode = result.status || 1;
      return;
    }
    console.log(result.value ?? "");
    return;
  }

  const part1 = runNodeScript(part1Path);
  if (part1.status !== 0) {
    console.error(part1.stderr.trim() || `Part 1 exited with ${part1.status}`);
    process.exitCode = part1.status || 1;
    return;
  }

  let part2Value = "";
  if (hasPart2) {
    const part2 = runNodeScript(part2Path);
    if (part2.status !== 0) {
      console.error(part2.stderr.trim() || `Part 2 exited with ${part2.status}`);
      process.exitCode = part2.status || 1;
      return;
    }
    part2Value = part2.value ?? "";
  }

  console.log(`part1=${part1.value ?? ""}`);
  console.log(`part2=${part2Value}`);
}

await main();
