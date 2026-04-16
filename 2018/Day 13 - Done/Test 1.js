import fs from "node:fs";

const position = cart => `${cart.x},${cart.y}`;
const onSlash = { ">": "^", "<": "v", "^": ">", "v": "<" };
const onBackSlash = { ">": "v", "<": "^", "^": "<", "v": ">" };
const nextTurn = { left: "straight", straight: "right", right: "left" };
const onTurn = {
  left: { ">": "^", "<": "v", "^": "<", "v": ">" },
  right: { ">": "v", "<": "^", "^": ">", "v": "<" },
  straight: { ">": ">", "<": "<", "^": "^", "v": "v" },
};
const onMove = {
  ">": c => c.x++,
  "<": c => c.x--,
  "^": c => c.y--,
  "v": c => c.y++,
};

function tick(map, carts) {
  let collisions = [];
  carts.sort((a, b) => a.y - b.y || a.x - b.x);
  carts.forEach(cart => {
    onMove[cart.direction](cart);
    if (map[cart.y][cart.x] === "/") {
      cart.direction = onSlash[cart.direction];
    } else if (map[cart.y][cart.x] === "\\") {
      cart.direction = onBackSlash[cart.direction];
    } else if (map[cart.y][cart.x] === "+") {
      cart.direction = onTurn[cart.nextTurn][cart.direction];
      cart.nextTurn = nextTurn[cart.nextTurn];
    }
    let other = carts.find(x => x !== cart && position(x) === position(cart));
    if (other) {
      collisions.push(cart, other);
    }
  });
  return collisions;
}

function parse(input) {
  let carts = [];
  let map = input.replace(/[v^]/g, "|").replace(/[<>]/g, "-").split("\n");
  input.split("\n").forEach((row, y) =>
    row.split("").forEach((cell, x) => {
      if ("v^<>".includes(cell)) {
        carts.push({ direction: cell, nextTurn: "left", x, y });
      }
    }),
  );
  return { map, carts };
}

export function part1(input) {
  let { map, carts } = parse(input);
  let collisions = [];
  while (collisions.length === 0) {
    collisions = tick(map, carts);
  }
  return position(collisions[0]);
}

export function part2(input) {
  let { map, carts } = parse(input);
  while (carts.length > 1) {
    let collisions = tick(map, carts);
    collisions.forEach(cart => carts.splice(carts.indexOf(cart), 1));
  }
  return position(carts[0]);
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
