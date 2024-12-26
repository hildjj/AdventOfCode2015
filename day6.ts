import { Point, PointMap, PointSet } from './lib/rect.ts';
import { type MainArgs, parseFile } from './lib/utils.ts';

type XY = [x: number, y: number];
type Command = [dir: boolean | null, s: XY, e: XY];
type Parsed = Command[];

function part1(inp: Parsed): number {
  const m = new PointSet();
  for (const [dir, [minX, minY], [maxX, maxY]] of inp) {
    for (let i = minX; i <= maxX; i++) {
      for (let j = minY; j <= maxY; j++) {
        const p = new Point(i, j);
        switch (dir) {
          case null:
            if (m.has(p)) {
              m.delete(p);
            } else {
              m.add(p);
            }
            break;
          case true:
            m.add(p);
            break;
          case false:
            m.delete(p);
            break;
        }
      }
    }
  }
  return m.size;
}

function part2(inp: Parsed): number {
  const m = new PointMap<number>();
  let tot = 0;
  const p = new Point(0, 0);
  for (const [dir, [minX, minY], [maxX, maxY]] of inp) {
    for (let i = minX; i <= maxX; i++) {
      p.x = i;
      for (let j = minY; j <= maxY; j++) {
        p.y = j;
        const old = m.get(p) ?? 0;
        switch (dir) {
          case null:
            m.set(p, old + 2);
            tot += 2;
            break;
          case true:
            m.set(p, old + 1);
            tot++;
            break;
          case false: {
            const minus = old - 1;
            if (minus > 0) {
              tot--;
              m.set(p, minus);
            } else if (minus === 0) {
              tot--;
              m.delete(p);
            } // Else point was already not in map
          }
        }
      }
    }
  }
  return tot;
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
