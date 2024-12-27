import { type MainArgs, parseFile } from './lib/utils.ts';
import { Graph } from './lib/graph.ts';
import { Sequence } from './lib/sequence.ts';

interface Happy {
  subject: string;
  num: number;
  object: string;
}
type Parsed = Happy[];

function maxHappy(g: Graph<undefined, number, string>): number {
  let max = -Infinity;
  for (
    const nodes of new Sequence(g.nodes().map((n) => n.id))
      .permutations(g.nodeCount)
  ) {
    let tot = 0;
    for (const [a, b] of new Sequence(nodes).windows(2)) {
      tot += g.getLink(a, b)?.data ?? 0;
      tot += g.getLink(b, a)?.data ?? 0;
    }
    // Wrap around
    tot += g.getLink(nodes[0], nodes[nodes.length - 1])?.data ?? 0;
    tot += g.getLink(nodes[nodes.length - 1], nodes[0])?.data ?? 0;
    max = Math.max(max, tot);
  }
  return max;
}

function part1(inp: Parsed): number {
  const g = new Graph<undefined, number, string>();
  for (const { subject, object, num } of inp) {
    g.addLink(subject, object, num);
  }
  return maxHappy(g);
}

function part2(inp: Parsed): number {
  const g = new Graph<undefined, number, string>();
  for (const { subject, object, num } of inp) {
    g.addLink(subject, object, num);
  }
  g.addNode('ME');
  return maxHappy(g);
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
