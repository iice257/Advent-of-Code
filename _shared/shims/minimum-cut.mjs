function buildGraph(edges) {
  const graph = new Map();

  const ensureNode = node => {
    if (!graph.has(node)) {
      graph.set(node, new Map());
    }
  };

  for (const [left, right] of edges) {
    ensureNode(left);
    ensureNode(right);
    graph.get(left).set(right, (graph.get(left).get(right) || 0) + 1);
    graph.get(right).set(left, (graph.get(right).get(left) || 0) + 1);
  }

  return graph;
}

function stoerWagner(inputGraph) {
  const graph = new Map();
  for (const [node, neighbors] of inputGraph.entries()) {
    graph.set(node, new Map(neighbors));
  }

  const groups = new Map([...graph.keys()].map(node => [node, new Set([node])]));
  let bestWeight = Infinity;
  let bestPartition = new Set();

  while (graph.size > 1) {
    const used = new Set();
    const weights = new Map([...graph.keys()].map(node => [node, 0]));
    let previous = null;
    let selected = null;

    for (let step = 0; step < graph.size; step += 1) {
      selected = [...graph.keys()]
        .filter(node => !used.has(node))
        .sort((left, right) => weights.get(right) - weights.get(left))[0];

      used.add(selected);

      if (used.size === graph.size) {
        const cutWeight = weights.get(selected);
        if (cutWeight < bestWeight) {
          bestWeight = cutWeight;
          bestPartition = new Set(groups.get(selected));
        }

        if (previous === null) {
          break;
        }

        for (const [neighbor, weight] of graph.get(selected).entries()) {
          if (neighbor === previous) {
            continue;
          }

          graph.get(previous).set(neighbor, (graph.get(previous).get(neighbor) || 0) + weight);
          graph.get(neighbor).set(previous, (graph.get(neighbor).get(previous) || 0) + weight);
          graph.get(neighbor).delete(selected);
        }

        graph.get(previous).delete(selected);
        graph.delete(selected);

        for (const member of groups.get(selected)) {
          groups.get(previous).add(member);
        }
        groups.delete(selected);
        break;
      }

      for (const [neighbor, weight] of graph.get(selected).entries()) {
        if (!used.has(neighbor)) {
          weights.set(neighbor, weights.get(neighbor) + weight);
        }
      }

      previous = selected;
    }
  }

  return { weight: bestWeight, partition: bestPartition };
}

export function mincut(edges) {
  const { partition } = stoerWagner(buildGraph(edges));
  return edges.filter(([left, right]) => partition.has(left) !== partition.has(right));
}

