export function* combinations(items, size) {
  if (size < 0 || size > items.length) {
    return;
  }

  if (size === 0) {
    yield [];
    return;
  }

  for (let index = 0; index <= items.length - size; index += 1) {
    for (const tail of combinations(items.slice(index + 1), size - 1)) {
      yield [items[index], ...tail];
    }
  }
}

export function* permutations(items) {
  if (items.length === 0) {
    yield [];
    return;
  }

  for (let index = 0; index < items.length; index += 1) {
    const head = items[index];
    const remainder = items.slice(0, index).concat(items.slice(index + 1));
    for (const tail of permutations(remainder)) {
      yield [head, ...tail];
    }
  }
}

export function* powerSet(items, index = 0, selected = []) {
  if (index >= items.length) {
    yield [...selected];
    return;
  }

  yield* powerSet(items, index + 1, selected);
  selected.push(items[index]);
  yield* powerSet(items, index + 1, selected);
  selected.pop();
}

