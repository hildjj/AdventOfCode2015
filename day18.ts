import { Point, Rect } from './lib/rect.ts';
import { type MainArgs, parseFile } from './lib/utils.ts';

type Parsed = boolean[][];

function part1(inp: Parsed): number {
  let r = new Rect(inp);
  for (let i = 0; i < 100; i++) {
    r = r.map((v, x, y) => {
      const p = new Point(x, y);
      const neighbors = p.box(r).reduce(
        (t, [p2]) => t + (r.get(p2)! ? 1 : 0),
        0,
      );
      if (v) {
        return (neighbors === 2) || (neighbors === 3);
      }
      return neighbors === 3;
    });
  }

  return r.reduce((t, v) => t + (v ? 1 : 0), 0);
}

function part2(inp: Parsed): number {
  let r = new Rect(inp);
  for (let i = 0; i < 100; i++) {
    r.set(0, 0, true);
    r.set(99, 99, true);
    r.set(0, 99, true);
    r.set(99, 0, true);
    r = r.map((v, x, y) => {
      const p = new Point(x, y);
      const neighbors = p.box(r).reduce(
        (t, [p2]) => t + (r.get(p2)! ? 1 : 0),
        0,
      );
      if (v) {
        return (neighbors === 2) || (neighbors === 3);
      }
      return neighbors === 3;
    });
  }
  r.set(0, 0, true);
  r.set(99, 99, true);
  r.set(0, 99, true);
  r.set(99, 0, true);

  return r.reduce((t, v) => t + (v ? 1 : 0), 0);
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
