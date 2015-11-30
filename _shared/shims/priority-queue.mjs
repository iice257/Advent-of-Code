export class PriorityQueue {
  constructor(compare, initialValues = []) {
    this.compare = compare;
    this.items = [...initialValues].sort(this.compare);
  }

  enqueue(value) {
    this.items.push(value);
    this.items.sort(this.compare);
  }

  dequeue() {
    return this.items.shift();
  }

  toArray() {
    return [...this.items];
  }

  remove(predicate) {
    const index = this.items.findIndex(predicate);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  size() {
    return this.items.length;
  }
}

