import { Dir } from './lib/rect.ts';
import { Point, PointSet } from './lib/rect.ts';
import { type MainArgs, parseFile } from './lib/utils.ts';

type SantaDir = '<' | '>' | '^' | 'v';
type Parsed = SantaDir[];
type DirMap = {
  [d in SantaDir]: Dir;
}
const dirMap: DirMap = {
  '^': Dir.N,
  '>': Dir.E,
  'v': Dir.S,
  '<': Dir.W,
};

function part1(inp: Parsed): number {
  let prev = new Point(0, 0);
  const ps = new PointSet([prev]);

  for (const d of inp) {
    const next = prev.inDir(dirMap[d]);
    ps.add(next);
    prev = next;
  }
  return ps.size;
}

function part2(inp: Parsed): number {
  let santa = new Point(0, 0);
  let robo = new Point(0, 0);
  const ps = new PointSet([santa, robo]);
  let sr = false;
  for (const d of inp) {
    const prev = sr ? santa : robo;
    const next = prev.inDir(dirMap[d]);
    ps.add(next);
    if (sr) {
      santa = next;
    } else {
      robo = next;
    }
    sr = !sr;
  }
  return ps.size;
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
