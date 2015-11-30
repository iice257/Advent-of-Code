# Advent of Code

This branch is a simulated progression run of my Advent of Code work.

## Layout

Each completed JavaScript day lives in one folder:

```text
YYYY/Day N - Done/
  input.txt
  Test 1.js
  Test 2.js
  python/main.py
```

- `Test 1.js` prints the part 1 answer.
- `Test 2.js` prints the part 2 answer.
- `python/main.py` prints both answers for the same day.

## Coverage

- JavaScript is available from `2015 Day 1` through `2025 Day 12`.
- Python wrappers are available for the same range.
- Go, Rust, and C++ are intentionally deferred on this branch.

## Commands

```bash
npm run solve -- 2015 1
npm run solve -- 2015 1 2
npm run answers
npm run provenance
npm run verify
npm run history:plan
npm run history:replay
```

## Source Notes

- Official Advent of Code session access is not configured in this environment.
- Inputs are mirrored from a public source and tracked in `provenance.json`.
- Solver logic is executed through local authored wrappers and a shared public-source loader; no mirrored upstream solver files are committed into the branch.
- `npm run history:replay` rewrites the current branch from the deterministic schedule in `history/commit-schedule.json`.
