import { Graph, type Link, type Node } from './lib/graph.ts';
import { Sequence } from './lib/sequence.ts';
import { type MainArgs, parseFile } from './lib/utils.ts';

type Parsed = [from: string, to: string, dist: number][];
type CityNode = Node<undefined, number, string>;
type CityLink = Link<number, string>;

function part12(inp: Parsed): [number, number] {
  const g = new Graph<undefined, number, string>();
  for (const [from, to, dist] of inp) {
    g.addLink(from, to, dist);
  }

  let min = Infinity;
  let max = -Infinity;
  for (const m of new Sequence(g.nodes().map((n) => n.id)).permutations(8)) {
    let tot = 0;
    for (const [a, b] of new Sequence(m).windows(2)) {
      tot += (g.getLink(a, b) ?? g.getLink(b, a))?.data ?? Infinity;
    }
    min = Math.min(min, tot);
    max = Math.max(max, tot);
  }
  return [min, max];
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return part12(inp);
}
