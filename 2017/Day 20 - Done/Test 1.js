import fs from "node:fs";

function positionAfter(p, v, a, t) {
  return p + (t * (2 * (v + a) + (t - 1) * a)) / 2;
}

export function particleAfter(particle, t) {
  let { i, p, v, a } = particle;
  let pAfter = p.map((x, i) => positionAfter(p[i], v[i], a[i], t));
  return { i, p: pAfter, v, a };
}

function byPosition(a, b) {
  if (a.p[0] < b.p[0]) {
    return -1;
  } else if (a.p[0] > b.p[0]) {
    return 1;
  } else if (a.p[1] < b.p[1]) {
    return -1;
  } else if (a.p[1] > b.p[1]) {
    return 1;
  } else if (a.p[2] < b.p[2]) {
    return -1;
  } else if (a.p[2] > b.p[2]) {
    return 1;
  } else {
    return 0;
  }
}

function findCollisions(particles) {
  let collide = (a, b) => b && a.p.every((x, i) => x === b.p[i]);
  return particles
    .sort(byPosition)
    .filter((x, i, a) => collide(x, a[i - 1]) || collide(x, a[i + 1]));
}

function parse(input) {
  return input.split("\n").map((line, i) => {
    let parser =
      /^p=<(-?\d+),(-?\d+),(-?\d+)>, v=<(-?\d+),(-?\d+),(-?\d+)>, a=<(-?\d+),(-?\d+),(-?\d+)>$/;
    let numbers = line.match(parser).slice(1).map(Number);
    return {
      i,
      p: numbers.slice(0, 3),
      v: numbers.slice(3, 6),
      a: numbers.slice(6, 9),
    };
  });
}

function closest(particles) {
  let distances = particles.map(
    x => Math.abs(x.p[0]) + Math.abs(x.p[1]) + Math.abs(x.p[2]),
  );
  let min = Math.min(...distances);
  return distances.indexOf(min);
}

function after(particles, t) {
  return particles.map(x => particleAfter(x, t));
}

export function part1(input) {
  let particles = after(parse(input), 1000);
  return closest(particles);
}

export function part2(input) {
  let particles = parse(input);
  for (let t = 0; t < 1000; t++) {
    let collisions = findCollisions(after(particles, t));
    collisions.forEach(x => delete particles[x.i]);
  }
  return particles.filter(x => x).length;
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
