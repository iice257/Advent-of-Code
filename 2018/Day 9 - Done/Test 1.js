import fs from "node:fs";

function add(value, position) {
  let newItem = { value };
  newItem.next = position ? position.next : newItem;
  newItem.prev = position || newItem;
  if (position) {
    position.next.prev = newItem;
    position.next = newItem;
  }
  return newItem;
}

function remove(position) {
  position.prev.next = position.next;
  position.next.prev = position.prev;
  return position;
}

export function part1(input) {
  let [, players, lastMarble] = input
    .match(/(\d+) players; last marble is worth (\d+)/)
    .map(Number);

  let score = new Map();
  let player = 0;
  let marble = 1;
  let pointer = add(0);

  while (marble <= lastMarble) {
    if (marble % 23 === 0) {
      pointer = remove(pointer.prev.prev.prev.prev.prev.prev.prev);
      score.set(player, (score.get(player) || 0) + marble + pointer.value);
      pointer = pointer.next;
    } else {
      pointer = add(marble, pointer.next);
    }
    marble++;
    player = (player + 1) % players;
  }
  return Math.max(...Array.from(score.values()));
}

export function part2(input) {
  let [, players, lastMarble] = input
    .match(/(\d+) players; last marble is worth (\d+)/)
    .map(Number);
  return part1(`${players} players; last marble is worth ${lastMarble * 100}`);
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
