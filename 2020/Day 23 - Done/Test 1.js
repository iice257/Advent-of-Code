import fs from "node:fs";

function play(cups, moves) {
  let nextDestination = n => ((n - 2 + cups.length) % cups.length) + 1;
  let { list, map } = linkList(cups);
  let current = list;
  for (let i = 0; i < moves; i++) {
    let take = current.next;
    current.next = take.next.next.next;
    let destinationValue = nextDestination(current.value);
    let takeValues = [take.value, take.next.value, take.next.next.value];
    while (takeValues.includes(destinationValue)) {
      destinationValue = nextDestination(destinationValue);
    }
    let destination = map.get(destinationValue);
    take.next.next.next = destination.next;
    destination.next = take;
    current = current.next;
  }
  return map.get(1);
}

function linkList(cups) {
  let list = {};
  let current = list;
  let map = new Map();
  cups.forEach(n => {
    current.next = { value: n };
    current = current.next;
    map.set(n, current);
  });
  list = list.next;
  current.next = list;
  return { list, map };
}

function print(list) {
  let result = "";
  let current = list;
  do {
    result += current.value;
    current = current.next;
  } while (current !== list);
  return result;
}

export function part1(input, moves = 100) {
  let cups = input.split("").map(Number);
  let list = play(cups, moves);
  return print(list).slice(1);
}

export function part2(input) {
  let cups = input.split("").map(Number);
  let arr = new Array(1000000)
    .fill(0)
    .map((x, i) => i + 1)
    .slice(cups.length);

  let list = play(cups.concat(arr), 10000000);
  return list.next.value * list.next.next.value;
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
