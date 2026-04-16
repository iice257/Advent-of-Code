import fs from "node:fs";

function parse(input) {
  let indexMap = { ore: 0, clay: 1, obsidian: 2, geode: 3 };
  return input.split("\n").map(line => {
    let [, plans] = line.split(": ");
    plans = plans.split(". ").map(line => {
      let [, cost] = line.match(/^Each [^\s]+ robot costs ([^.]*)\.?$/);
      let requirements = [0, 0, 0, 0];
      cost.split(" and ").forEach(s => {
        let [resourceCount, resourceType] = s.split(" ");
        requirements[indexMap[resourceType]] = +resourceCount;
      });
      return requirements;
    });
    return plans;
  });
}

function best(blueprint, timeAvailable) {
  let queue = [
    {
      resources: [0, 0, 0, 0],
      robots: [1, 0, 0, 0],
      time: timeAvailable,
    },
  ];
  let max = 0;
  let maxNeeded = [
    //completely bogus heuristic
    Math.max(...blueprint.map(cost => cost[0])) * 1.5,
    Math.max(...blueprint.map(cost => cost[1])) * 1.5,
    Math.max(...blueprint.map(cost => cost[2])) * 1.5,
    Infinity,
  ];
  while (queue.length > 0) {
    let next = queue.pop();
    let { resources, robots, time } = next;
    max = Math.max(max, resources[3] + robots[3] * time);

    blueprint.forEach((requirements, robotType) => {
      let buildTime = 1;
      requirements.forEach((cost, r) => {
        let timeForResource = Math.ceil((cost - resources[r]) / robots[r]);
        if (cost > 0) buildTime = Math.max(buildTime, timeForResource + 1);
      });
      if (buildTime < time && resources[robotType] <= maxNeeded[robotType]) {
        let nextResources = [...resources];
        let nextRobots = [...robots];
        requirements.forEach((cost, r) => {
          nextResources[r] += robots[r] * buildTime - cost;
        });
        nextRobots[robotType]++;
        queue.push({
          resources: nextResources,
          robots: nextRobots,
          time: time - buildTime,
        });
      }
    });
  }
  return max;
}

export function part1(input) {
  let blueprints = parse(input);
  let score = 0;
  blueprints.forEach((blueprint, i) => {
    score += (i + 1) * best(blueprint, 24);
  });
  return score;
}

export function part2(input) {
  let blueprints = parse(input);
  let score = 1;
  blueprints.slice(0, 3).forEach(blueprint => {
    score *= best(blueprint, 32);
  });
  return score;
}

const input = fs
  .readFileSync(new URL("input.txt", import.meta.url), "utf8")
  .replace(/\uFEFF/g, "")
  .replace(/\r\n/g, "\n")
  .replace(/\r/g, "\n")
  .trimEnd();

const solution = typeof day === "function" ? await day(input) : undefined;
const answer = (typeof part1 === "function" ? await part1(input) : solution?.part1);

if (answer !== undefined && answer !== null) {
  console.log(typeof answer === "bigint" ? answer.toString() : answer);
}
