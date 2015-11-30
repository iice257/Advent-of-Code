import { readDayInput, solveWithUpstream } from "../_shared/upstream.mjs";

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

  const input = await readDayInput(year, day);
  const result = await solveWithUpstream(year, day, input);

  if (partArg === "1") {
    console.log(result.part1 ?? "");
    return;
  }

  if (partArg === "2") {
    console.log(result.part2 ?? "");
    return;
  }

  console.log(`part1=${result.part1 ?? ""}`);
  console.log(`part2=${result.part2 ?? ""}`);
}

await main();

